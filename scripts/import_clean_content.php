<?php
declare(strict_types=1);

if (PHP_SAPI !== 'cli') {
    http_response_code(404);
    exit;
}

error_reporting(E_ALL);
ini_set('display_errors', '1');
date_default_timezone_set('Asia/Shanghai');
mb_internal_encoding('UTF-8');

function fail(string $message): void
{
    fwrite(STDERR, "ERROR: {$message}\n");
    exit(1);
}

function option(array $argv, string $name, ?string $default = null): ?string
{
    foreach ($argv as $arg) {
        if (strpos($arg, $name . '=') === 0) {
            return substr($arg, strlen($name) + 1);
        }
    }
    return $default;
}

function columns(PDO $pdo, string $table): array
{
    $statement = $pdo->query("SHOW COLUMNS FROM `{$table}`");
    $result = [];
    foreach ($statement->fetchAll(PDO::FETCH_ASSOC) as $row) {
        $result[(string)$row['Field']] = true;
    }
    return $result;
}

function table_exists(PDO $pdo, string $table): bool
{
    $statement = $pdo->prepare(
        'SELECT 1 FROM information_schema.TABLES WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME=:table_name LIMIT 1'
    );
    $statement->execute([':table_name' => $table]);
    return (bool)$statement->fetchColumn();
}

function insert_row(PDO $pdo, string $table, array $row, array $availableColumns, bool $ignore = false): void
{
    $row = array_intersect_key($row, $availableColumns);
    if ($row === []) {
        fail("No compatible columns for {$table}.");
    }
    $names = array_keys($row);
    $quoted = array_map(static function (string $name): string {
        return '`' . str_replace('`', '``', $name) . '`';
    }, $names);
    $placeholders = array_map(static function (string $name): string {
        return ':' . $name;
    }, $names);
    $sql = 'INSERT ' . ($ignore ? 'IGNORE ' : '') . 'INTO `' . $table . '` (' . implode(',', $quoted)
        . ') VALUES (' . implode(',', $placeholders) . ')';
    $statement = $pdo->prepare($sql);
    $parameters = [];
    foreach ($row as $name => $value) {
        $parameters[':' . $name] = $value;
    }
    $statement->execute($parameters);
}

function media_path(string $reference): string
{
    if (!preg_match('#^media/([a-f0-9]{64}\.(?:jpg|png|webp|gif))$#', $reference, $match)) {
        return '';
    }
    return '/uploads/open-source-nav/' . $match[1];
}

function content_with_media_base(string $html): string
{
    return str_replace('{{MEDIA_BASE}}', '/uploads/open-source-nav', $html);
}

function url_identity(string $url): string
{
    $parts = parse_url(trim(html_entity_decode($url, ENT_QUOTES | ENT_HTML5, 'UTF-8')));
    if (!is_array($parts) || !in_array(strtolower((string)($parts['scheme'] ?? '')), ['http', 'https'], true)) {
        return '';
    }
    $host = strtolower(rtrim((string)($parts['host'] ?? ''), '.'));
    if ($host === '') {
        return '';
    }
    $path = rawurldecode((string)($parts['path'] ?? '/'));
    $path = '/' . ltrim($path, '/');
    $path = $path === '/' ? '/' : rtrim($path, '/');
    return $host . $path;
}

function is_public_http_url(string $url): bool
{
    $parts = parse_url(trim($url));
    if (!is_array($parts)
        || !in_array(strtolower((string)($parts['scheme'] ?? '')), ['http', 'https'], true)
        || empty($parts['host'])
        || isset($parts['user'])
        || isset($parts['pass'])) {
        return false;
    }
    $host = strtolower(rtrim((string)$parts['host'], '.'));
    if ($host === 'localhost' || substr($host, -6) === '.local') {
        return false;
    }
    if (filter_var($host, FILTER_VALIDATE_IP)
        && filter_var($host, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) === false) {
        return false;
    }
    if (!empty($parts['query'])) {
        parse_str((string)$parts['query'], $query);
        foreach (array_keys($query) as $key) {
            if (preg_match('/^(?:utm_.+|ref|aff|affiliate|invite|token|key|secret|code|from|source|comefrom|jwt|sig|signature|auth|credential|apikey|api_key|access_token)$/i', (string)$key)) {
                return false;
            }
        }
    }
    return true;
}

function contains_dangerous_html(string $html): bool
{
    return (bool)preg_match(
        '#<(?:script|iframe|object|embed|form|input|button|textarea|select|base|meta)\b|\son[a-z]+\s*=|(?:javascript|vbscript|data)\s*:|<\?(?:php|=)|\{eyou:#iu',
        $html
    );
}

$apply = in_array('--apply', $argv ?? [], true);
$confirmation = option($argv ?? [], '--confirm', '');
if ($apply && $confirmation !== 'IMPORT_PUBLIC_DATA') {
    fail('Apply mode requires --confirm=IMPORT_PUBLIC_DATA. Run without --apply first.');
}

$cmsRoot = option($argv ?? [], '--cms-root', '');
$cmsRoot = $cmsRoot !== null && $cmsRoot !== '' ? realpath($cmsRoot) : false;
if ($cmsRoot === false || !is_file($cmsRoot . '/application/database.php')) {
    fail('Use --cms-root=PATH to point at a target EyouCMS installation.');
}

$packageRoot = dirname(__DIR__);
$dataPath = $packageRoot . '/data/navigation-content.v1.json';
if (!is_file($dataPath)) {
    fail('The sanitized data JSON is missing.');
}
$payload = json_decode((string)file_get_contents($dataPath), true);
if (!is_array($payload) || ($payload['format'] ?? '') !== 'eyoucms-navigation-content' || (int)($payload['format_version'] ?? 0) !== 1) {
    fail('Unsupported or damaged data format.');
}
$categories = is_array($payload['categories'] ?? null) ? $payload['categories'] : [];
$tools = is_array($payload['tools'] ?? null) ? $payload['tools'] : [];
if ($categories === [] || $tools === []) {
    fail('The data package is empty.');
}

$db = include $cmsRoot . '/application/database.php';
if (!is_array($db)) {
    fail('The target database configuration is not readable.');
}
$prefix = (string)($db['prefix'] ?? 'ey_');
if (!preg_match('/^[A-Za-z0-9_]+$/', $prefix)) {
    fail('Unsafe target database table prefix.');
}
$pdo = new PDO(
    sprintf('mysql:host=%s;port=%s;dbname=%s;charset=%s', $db['hostname'], $db['hostport'], $db['database'], $db['charset'] ?? 'utf8mb4'),
    $db['username'],
    $db['password'],
    [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]
);

$requiredTables = ['arctype', 'archives', 'product_content', 'tagindex', 'taglist'];
foreach ($requiredTables as $name) {
    if (!table_exists($pdo, $prefix . $name)) {
        fail("Target table {$prefix}{$name} is missing.");
    }
}

$productTable = $prefix . 'product_content';
$productColumns = columns($pdo, $productTable);
$customColumnDefinitions = [
    'site_region' => "VARCHAR(20) NOT NULL DEFAULT '国内'",
    'top_global' => 'TINYINT(1) NOT NULL DEFAULT 0',
    'top_home' => 'TINYINT(1) NOT NULL DEFAULT 0',
    'top_category' => 'TINYINT(1) NOT NULL DEFAULT 0',
    'platform_tier' => "VARCHAR(30) NOT NULL DEFAULT '普通'",
    'home_sort_order' => 'INT(10) NOT NULL DEFAULT 100',
    'category_sort_order' => 'INT(10) NOT NULL DEFAULT 100',
];
$missingColumns = [];
foreach ($customColumnDefinitions as $name => $definition) {
    if (!isset($productColumns[$name])) {
        $missingColumns[$name] = $definition;
    }
}

$categoryInsertCount = 0;
$categoryReuseCount = 0;
$existingCategoryIds = [];
$categoryLookup = $pdo->prepare("SELECT id,parent_id,channeltype,dirname FROM `{$prefix}arctype` WHERE id=:id LIMIT 1");
foreach ($categories as $category) {
    $legacyId = (int)($category['legacy_id'] ?? 0);
    $slug = (string)($category['slug'] ?? '');
    if ($legacyId <= 0 || !preg_match('/^[A-Za-z0-9_-]+$/', $slug)) {
        fail('A category identifier or slug is invalid.');
    }
    $categoryLookup->execute([':id' => $legacyId]);
    $existing = $categoryLookup->fetch();
    if ($existing) {
        if ((string)$existing['dirname'] !== $slug
            || (int)$existing['parent_id'] !== (int)($category['parent_legacy_id'] ?? 0)
            || (int)$existing['channeltype'] !== (int)($category['channel_type'] ?? 0)) {
            fail("Category ID conflict at legacy ID {$legacyId}. Use a clean EyouCMS installation.");
        }
        $categoryReuseCount++;
        $existingCategoryIds[$legacyId] = true;
    } else {
        $categoryInsertCount++;
    }
}

$toolInsertCount = 0;
$toolReuseCount = 0;
$existingToolIds = [];
$toolLookup = $pdo->prepare("SELECT a.aid,a.title,a.jumplinks,a.channel,a.typeid,pc.aid AS product_aid
    FROM `{$prefix}archives` a
    LEFT JOIN `{$prefix}product_content` pc ON pc.aid=a.aid
    WHERE a.aid=:aid LIMIT 1");
foreach ($tools as $tool) {
    $legacyAid = (int)($tool['legacy_aid'] ?? 0);
    $title = trim((string)($tool['title'] ?? ''));
    $officialUrl = (string)($tool['official_url'] ?? '');
    if ($legacyAid <= 0
        || $title === ''
        || !is_public_http_url($officialUrl)
        || trim((string)($tool['content_html'] ?? '')) === ''
        || contains_dangerous_html((string)($tool['content_html'] ?? ''))
        || contains_dangerous_html((string)($tool['mobile_content_html'] ?? ''))) {
        fail("Invalid public tool record at legacy AID {$legacyAid}.");
    }
    $toolLookup->execute([':aid' => $legacyAid]);
    $existing = $toolLookup->fetch();
    if ($existing) {
        if (trim((string)$existing['title']) !== $title
            || url_identity((string)($existing['jumplinks'] ?? '')) !== url_identity($officialUrl)
            || (int)$existing['channel'] !== 2
            || (int)$existing['typeid'] !== (int)($tool['category_legacy_id'] ?? 0)
            || (int)($existing['product_aid'] ?? 0) !== $legacyAid) {
            fail("Archive ID conflict at legacy AID {$legacyAid}. Use a clean EyouCMS installation.");
        }
        $toolReuseCount++;
        $existingToolIds[$legacyAid] = true;
    } else {
        $toolInsertCount++;
    }
}

$mediaNames = [];
foreach ($tools as $tool) {
    $references = [(string)($tool['thumbnail'] ?? '')];
    foreach (['content_html', 'mobile_content_html'] as $field) {
        if (preg_match_all('#\{\{MEDIA_BASE\}\}/([a-f0-9]{64}\.(?:jpg|png|webp|gif))#', (string)($tool[$field] ?? ''), $matches)) {
            foreach ($matches[1] as $name) {
                $references[] = 'media/' . $name;
            }
        }
    }
    foreach ($references as $reference) {
        if (preg_match('#^media/([a-f0-9]{64}\.(?:jpg|png|webp|gif))$#', $reference, $match)) {
            $mediaNames[$match[1]] = true;
        }
    }
}
foreach (array_keys($mediaNames) as $name) {
    if (!is_file($packageRoot . '/data/media/' . $name)) {
        fail("Referenced media file {$name} is missing.");
    }
}

fwrite(STDOUT, sprintf(
    "Mode=%s categories(insert=%d,reuse=%d) tools(insert=%d,reuse=%d) media=%d schema_additions=%d\n",
    $apply ? 'apply' : 'dry-run',
    $categoryInsertCount,
    $categoryReuseCount,
    $toolInsertCount,
    $toolReuseCount,
    count($mediaNames),
    count($missingColumns)
));
if (!$apply) {
    fwrite(STDOUT, "Dry run only. Back up the target database, then add --apply --confirm=IMPORT_PUBLIC_DATA.\n");
    exit(0);
}

foreach ($missingColumns as $name => $definition) {
    $pdo->exec("ALTER TABLE `{$productTable}` ADD COLUMN `{$name}` {$definition}");
}
$relationTable = $prefix . 'wogs_tool_category_rel';
if (!table_exists($pdo, $relationTable)) {
    $pdo->exec("CREATE TABLE `{$relationTable}` (
        `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
        `aid` INT(10) UNSIGNED NOT NULL,
        `typeid` INT(10) UNSIGNED NOT NULL,
        `role` VARCHAR(20) NOT NULL DEFAULT 'secondary',
        `sort_order` INT(10) NOT NULL DEFAULT 100,
        `source` VARCHAR(40) NOT NULL DEFAULT 'open-source-import',
        `status` TINYINT(1) NOT NULL DEFAULT 1,
        `remark` VARCHAR(255) NOT NULL DEFAULT '',
        `add_time` INT(10) UNSIGNED NOT NULL DEFAULT 0,
        `update_time` INT(10) UNSIGNED NOT NULL DEFAULT 0,
        PRIMARY KEY (`id`),
        UNIQUE KEY `uniq_aid_typeid` (`aid`,`typeid`),
        KEY `idx_typeid_status_sort` (`typeid`,`status`,`sort_order`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
}

$targetMediaDir = $cmsRoot . '/uploads/open-source-nav';
if (!is_dir($targetMediaDir) && !mkdir($targetMediaDir, 0775, true) && !is_dir($targetMediaDir)) {
    fail('Cannot create the target media directory.');
}
foreach (array_keys($mediaNames) as $name) {
    $source = $packageRoot . '/data/media/' . $name;
    $target = $targetMediaDir . '/' . $name;
    if (is_file($target) && !hash_equals((string)hash_file('sha256', $source), (string)hash_file('sha256', $target))) {
        fail("Existing target media differs from the package file {$name}.");
    }
    if (!is_file($target) && !copy($source, $target)) {
        fail("Cannot copy media file {$name}.");
    }
}

$categoryById = [];
foreach ($categories as $category) {
    $categoryById[(int)$category['legacy_id']] = $category;
}
$categoryPosition = static function (int $id) use ($categoryById): array {
    $grade = 0;
    $topId = $id;
    $seen = [];
    $current = $id;
    while (isset($categoryById[$current])) {
        if (isset($seen[$current])) {
            fail("Category cycle detected at legacy ID {$id}.");
        }
        $seen[$current] = true;
        $parent = (int)($categoryById[$current]['parent_legacy_id'] ?? 0);
        if ($parent <= 0) {
            $topId = $current;
            break;
        }
        $grade++;
        $current = $parent;
    }
    return ['topid' => $topId, 'grade' => min(9, $grade)];
};

$arctypeTable = $prefix . 'arctype';
$archivesTable = $prefix . 'archives';
$tagindexTable = $prefix . 'tagindex';
$taglistTable = $prefix . 'taglist';
$arctypeColumns = columns($pdo, $arctypeTable);
$archivesColumns = columns($pdo, $archivesTable);
$productColumns = columns($pdo, $productTable);
$tagindexColumns = columns($pdo, $tagindexTable);
$taglistColumns = columns($pdo, $taglistTable);
$relationColumns = columns($pdo, $relationTable);
$now = time();

$pdo->beginTransaction();
try {
    foreach ($categories as $category) {
        $id = (int)$category['legacy_id'];
        if (isset($existingCategoryIds[$id])) {
            continue;
        }
        $position = $categoryPosition($id);
        insert_row($pdo, $arctypeTable, [
            'id' => $id,
            'channeltype' => (int)$category['channel_type'],
            'current_channel' => (int)$category['channel_type'],
            'parent_id' => (int)$category['parent_legacy_id'],
            'topid' => $position['topid'],
            'typename' => (string)$category['name'],
            'dirname' => (string)$category['slug'],
            'dirpath' => (string)$category['dirpath'],
            'diy_dirpath' => (string)$category['diy_dirpath'],
            'rulelist' => (string)$category['rule_list'],
            'ruleview' => (string)$category['rule_view'],
            'englist_name' => (string)$category['slug'],
            'grade' => $position['grade'],
            'typelink' => (string)$category['type_link'],
            'litpic' => '',
            'templist' => (string)$category['template_list'],
            'tempview' => (string)$category['template_view'],
            'seo_title' => (string)$category['seo_title'],
            'seo_keywords' => (string)$category['seo_keywords'],
            'seo_description' => (string)$category['seo_description'],
            'sort_order' => (int)$category['sort_order'],
            'is_hidden' => (int)$category['is_hidden'],
            'is_part' => (int)$category['is_part'],
            'admin_id' => 0,
            'is_del' => 0,
            'status' => 1,
            'is_release' => 1,
            'lang' => (string)$category['lang'],
            'add_time' => $now,
            'update_time' => $now,
            'target' => (int)$category['target'],
            'nofollow' => (int)$category['nofollow'],
            'typearcrank' => (int)$category['type_rank'],
            'empty_logic' => 0,
            'page_limit' => '20',
            'total_arc' => 0,
        ], $arctypeColumns);
    }

    $findTag = $pdo->prepare("SELECT id FROM `{$tagindexTable}` WHERE tag=:tag AND lang=:lang LIMIT 1");
    foreach ($tools as $tool) {
        $aid = (int)$tool['legacy_aid'];
        if (isset($existingToolIds[$aid])) {
            continue;
        }
        $flags = (array)$tool['flags'];
        $ranking = (array)$tool['ranking'];
        $seo = (array)$tool['seo'];
        $thumbnail = media_path((string)$tool['thumbnail']);
        $lang = (string)$tool['lang'];
        insert_row($pdo, $archivesTable, [
            'aid' => $aid,
            'typeid' => (int)$tool['category_legacy_id'],
            'stypeid' => implode(',', array_map('intval', (array)$tool['secondary_category_legacy_ids'])),
            'channel' => 2,
            'is_b' => (int)$flags['bold'],
            'title' => (string)$tool['title'],
            'subtitle' => (string)$tool['subtitle'],
            'introduction' => (string)$tool['summary'],
            'litpic' => $thumbnail,
            'is_head' => (int)$flags['headline'],
            'is_special' => (int)$flags['special'],
            'is_top' => (int)$flags['top'],
            'is_recom' => (int)$flags['recommended'],
            'is_jump' => 1,
            'is_litpic' => $thumbnail !== '' ? 1 : 0,
            'origin' => '',
            'author' => '开源数据',
            'click' => (int)$ranking['clicks'],
            'arcrank' => 0,
            'jumplinks' => (string)$tool['official_url'],
            'ismake' => 0,
            'seo_title' => (string)$seo['title'],
            'seo_keywords' => (string)$seo['keywords'],
            'seo_description' => (string)$seo['description'],
            'status' => 1,
            'sort_order' => (int)$ranking['base_sort_order'],
            'lang' => $lang,
            'admin_id' => 0,
            'users_id' => 0,
            'is_del' => 0,
            'htmlfilename' => (string)$tool['html_filename'],
            'add_time' => (int)$tool['published_at'],
            'update_time' => (int)$tool['updated_at'],
        ], $archivesColumns);
        insert_row($pdo, $productTable, [
            'aid' => $aid,
            'content' => content_with_media_base((string)$tool['content_html']),
            'content_ey_m' => content_with_media_base((string)$tool['mobile_content_html']),
            'add_time' => (int)$tool['published_at'],
            'update_time' => (int)$tool['updated_at'],
            'site_region' => (string)$tool['site_region'],
            'top_global' => (int)$ranking['global_top'],
            'top_home' => (int)$ranking['home_top'],
            'top_category' => (int)$ranking['category_top'],
            'platform_tier' => (string)$ranking['platform_tier'],
            'home_sort_order' => (int)$ranking['home_sort_order'],
            'category_sort_order' => (int)$ranking['category_sort_order'],
        ], $productColumns);

        foreach ((array)$tool['category_relations'] as $relation) {
            insert_row($pdo, $relationTable, [
                'aid' => $aid,
                'typeid' => (int)$relation['category_legacy_id'],
                'role' => (string)$relation['role'],
                'sort_order' => (int)$relation['sort_order'],
                'source' => 'open-source-import',
                'status' => 1,
                'remark' => '',
                'add_time' => $now,
                'update_time' => $now,
            ], $relationColumns, true);
        }

        foreach (array_values(array_unique((array)$tool['tags'])) as $tag) {
            $tag = trim((string)$tag);
            if ($tag === '' || mb_strlen($tag, 'UTF-8') > 50) {
                continue;
            }
            $findTag->execute([':tag' => $tag, ':lang' => $lang]);
            $tagId = (int)$findTag->fetchColumn();
            if ($tagId <= 0) {
                insert_row($pdo, $tagindexTable, [
                    'tag' => $tag,
                    'typeid' => (int)$tool['category_legacy_id'],
                    'litpic' => '',
                    'seo_title' => '',
                    'seo_keywords' => '',
                    'seo_description' => '',
                    'count' => 0,
                    'total' => 0,
                    'weekcc' => 0,
                    'monthcc' => 0,
                    'weekup' => 0,
                    'monthup' => 0,
                    'is_common' => 0,
                    'sort_order' => 100,
                    'lang' => $lang,
                    'add_time' => $now,
                    'update_time' => $now,
                ], $tagindexColumns);
                $tagId = (int)$pdo->lastInsertId();
            }
            insert_row($pdo, $taglistTable, [
                'tid' => $tagId,
                'aid' => $aid,
                'typeid' => (int)$tool['category_legacy_id'],
                'tag' => $tag,
                'arcrank' => 0,
                'lang' => $lang,
                'add_time' => $now,
                'update_time' => $now,
            ], $taglistColumns, true);
        }
    }

    $pdo->exec("UPDATE `{$arctypeTable}` t SET t.total_arc=(
        SELECT COUNT(*) FROM `{$archivesTable}` a
        WHERE a.typeid=t.id AND a.status=1 AND a.is_del=0 AND a.arcrank>-1
    )");
    $pdo->exec("UPDATE `{$tagindexTable}` ti SET ti.count=(
        SELECT COUNT(*) FROM `{$taglistTable}` tl WHERE tl.tid=ti.id
    ),ti.total=(SELECT COUNT(*) FROM `{$taglistTable}` tl2 WHERE tl2.tid=ti.id)");
    $pdo->commit();
} catch (Throwable $error) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    fail('Import rolled back: ' . $error->getMessage());
}

fwrite(STDOUT, sprintf(
    "Import complete: categories_inserted=%d tools_inserted=%d media_copied=%d\n",
    $categoryInsertCount,
    $toolInsertCount,
    count($mediaNames)
));
