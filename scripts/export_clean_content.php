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

function clean_text(string $value, array $sourceHosts): string
{
    $value = str_replace(["\r\n", "\r"], "\n", $value);
    $value = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/', '', $value) ?? $value;
    $value = preg_replace('/<!--.*?-->/s', '', $value) ?? $value;
    $value = preg_replace('/[A-Z]:\\\\(?:[^\\\\\r\n]+\\\\)*[^\\\\\r\n]*/i', '[local-path-removed]', $value) ?? $value;
    $value = preg_replace('/\b(?:127\.0\.0\.1|localhost)(?::\d+)?\b/i', 'localhost', $value) ?? $value;
    $value = preg_replace('/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i', '[email-removed]', $value) ?? $value;
    $value = preg_replace('/(?<!\d)1[3-9]\d{9}(?!\d)/', '[phone-removed]', $value) ?? $value;
    $value = preg_replace('/\b(?:sk-[A-Za-z0-9_-]{20,}|gh[pousr]_[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{16}|xox[baprs]-[A-Za-z0-9-]{10,})\b/', '[secret-removed]', $value) ?? $value;
    $value = preg_replace('/-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----.*?-----END (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/s', '[private-key-removed]', $value) ?? $value;

    foreach ($sourceHosts as $host) {
        $quoted = preg_quote($host, '/');
        $value = preg_replace('#https?://' . $quoted . '(?=/|["\'\s<]|$)#i', '', $value) ?? $value;
        $value = preg_replace('/(?<![A-Za-z0-9.-])' . $quoted . '(?![A-Za-z0-9.-])/i', 'example.com', $value) ?? $value;
    }
    foreach ((array)($GLOBALS['sourceBrandTerms'] ?? []) as $brand) {
        $brand = trim((string)$brand);
        if ($brand !== '') {
            $value = str_ireplace($brand, 'AI导航站', $value);
        }
    }
    return trim($value);
}

function clean_url(string $url, array $sourceHosts): string
{
    $url = trim(html_entity_decode($url, ENT_QUOTES | ENT_HTML5, 'UTF-8'));
    if ($url === '') {
        return '';
    }
    $parts = parse_url($url);
    if (!is_array($parts) || !in_array(strtolower((string)($parts['scheme'] ?? '')), ['http', 'https'], true)) {
        return '';
    }
    $host = strtolower((string)($parts['host'] ?? ''));
    if ($host === '' || isset($parts['user']) || isset($parts['pass'])) {
        return '';
    }
    if ($host === 'localhost'
        || substr(rtrim($host, '.'), -6) === '.local'
        || (filter_var($host, FILTER_VALIDATE_IP)
            && filter_var($host, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) === false)) {
        return '';
    }
    $path = (string)($parts['path'] ?? '/');
    if (in_array($host, $sourceHosts, true)) {
        return $path !== '' ? $path : '/';
    }
    $query = [];
    if (!empty($parts['query'])) {
        parse_str((string)$parts['query'], $query);
        foreach (array_keys($query) as $key) {
            if (preg_match('/^(?:utm_.+|ref|aff|affiliate|invite|token|key|secret|code|from|source|comefrom|jwt|sig|signature|auth|credential|apikey|api_key|access_token)$/i', (string)$key)) {
                unset($query[$key]);
            }
        }
    }
    $port = isset($parts['port']) ? ':' . (int)$parts['port'] : '';
    return strtolower((string)$parts['scheme']) . '://' . $host . $port . ($path !== '' ? $path : '/')
        . ($query !== [] ? '?' . http_build_query($query, '', '&', PHP_QUERY_RFC3986) : '');
}

function media_reference(string $path, string $sourceRoot, string $mediaDir, string $imageMagick, array &$mediaMap): string
{
    $path = rawurldecode(trim(preg_replace('/[?#].*$/', '', $path) ?? $path));
    if (isset($mediaMap[$path])) {
        return 'media/' . $mediaMap[$path];
    }
    if (!preg_match('#^/?uploads/[A-Za-z0-9_./-]+$#', $path)) {
        return '';
    }
    $relative = ltrim(str_replace('/', DIRECTORY_SEPARATOR, $path), DIRECTORY_SEPARATOR);
    $candidate = realpath($sourceRoot . DIRECTORY_SEPARATOR . $relative);
    $uploadRoot = realpath($sourceRoot . DIRECTORY_SEPARATOR . 'uploads');
    if ($candidate === false || $uploadRoot === false || strpos($candidate, $uploadRoot . DIRECTORY_SEPARATOR) !== 0 || !is_file($candidate)) {
        return '';
    }
    $extension = strtolower(pathinfo($candidate, PATHINFO_EXTENSION));
    if (!in_array($extension, ['jpg', 'jpeg', 'png', 'webp', 'gif'], true)) {
        return '';
    }
    $extension = $extension === 'jpeg' ? 'jpg' : $extension;
    $temporary = tempnam($mediaDir, '.sanitize-');
    if ($temporary === false) {
        fail('Cannot create a temporary media file.');
    }
    @unlink($temporary);
    $temporary .= '.' . $extension;
    $pipes = [];
    $process = proc_open(
        [$imageMagick, $candidate, '-auto-orient', '-strip', $temporary],
        [1 => ['pipe', 'w'], 2 => ['pipe', 'w']],
        $pipes,
        null,
        null,
        ['bypass_shell' => true]
    );
    if (!is_resource($process)) {
        fail('Cannot start ImageMagick.');
    }
    foreach ($pipes as $pipe) {
        stream_get_contents($pipe);
        fclose($pipe);
    }
    $exitCode = proc_close($process);
    $imageInfo = is_file($temporary) ? @getimagesize($temporary) : false;
    if ($exitCode !== 0 || !is_array($imageInfo)) {
        @unlink($temporary);
        fail('ImageMagick could not sanitize a referenced media file.');
    }
    $hash = hash_file('sha256', $temporary);
    $name = $hash . '.' . $extension;
    $target = $mediaDir . DIRECTORY_SEPARATOR . $name;
    if (!is_file($target) && !copy($temporary, $target)) {
        @unlink($temporary);
        fail('Cannot save a sanitized media file.');
    }
    @unlink($temporary);
    $mediaMap[$path] = $name;
    return 'media/' . $name;
}

function clean_html_media(string $html, string $sourceRoot, string $mediaDir, string $imageMagick, array &$mediaMap): string
{
    return preg_replace_callback(
        '#(?<![A-Za-z0-9])/?uploads/[A-Za-z0-9_./%-]+\.(?:jpg|jpeg|png|webp|gif)(?:\?[^"\'\s<]*)?#i',
        static function (array $match) use ($sourceRoot, $mediaDir, $imageMagick, &$mediaMap): string {
            $reference = media_reference($match[0], $sourceRoot, $mediaDir, $imageMagick, $mediaMap);
            return $reference !== '' ? '{{MEDIA_BASE}}/' . basename($reference) : '/template/pc/skin/wogaosuni/image/thumb-fallback-01.svg';
        },
        $html
    ) ?? $html;
}

function table_exists(PDO $pdo, string $table): bool
{
    $statement = $pdo->prepare(
        'SELECT 1 FROM information_schema.TABLES WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME=:table_name LIMIT 1'
    );
    $statement->execute([':table_name' => $table]);
    return (bool)$statement->fetchColumn();
}

$sourceRoot = option($argv ?? [], '--source-root', dirname(__DIR__, 2));
$sourceRoot = $sourceRoot !== null ? realpath($sourceRoot) : false;
if ($sourceRoot === false || !is_file($sourceRoot . '/application/database.php')) {
    fail('Use --source-root=PATH to point at the source EyouCMS installation.');
}
$imageMagick = option($argv ?? [], '--imagemagick', '');
$imageMagick = $imageMagick !== null && $imageMagick !== '' ? realpath($imageMagick) : false;
if ($imageMagick === false || !is_file($imageMagick)) {
    fail('Use --imagemagick=PATH to provide the ImageMagick magick executable for metadata removal.');
}

$packageRoot = dirname(__DIR__);
$dataDir = $packageRoot . '/data';
$mediaDir = $dataDir . '/media';
foreach ([$dataDir, $mediaDir] as $directory) {
    if (!is_dir($directory) && !mkdir($directory, 0777, true) && !is_dir($directory)) {
        fail('Cannot create output directory.');
    }
}

$db = include $sourceRoot . '/application/database.php';
if (!is_array($db)) {
    fail('The source database configuration is not readable.');
}
$prefix = (string)($db['prefix'] ?? 'ey_');
if (!preg_match('/^[A-Za-z0-9_]+$/', $prefix)) {
    fail('Unsafe database table prefix.');
}
$pdo = new PDO(
    sprintf(
        'mysql:host=%s;port=%s;dbname=%s;charset=%s',
        $db['hostname'],
        $db['hostport'],
        $db['database'],
        $db['charset'] ?? 'utf8mb4'
    ),
    $db['username'],
    $db['password'],
    [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]
);

$sourceHosts = [];
$sourceBrandTerms = [];
try {
    $configStatement = $pdo->query("SELECT name,value FROM {$prefix}config
        WHERE name IN ('web_basehost','web_cmsurl','web_name','web_title')");
    foreach ($configStatement->fetchAll() as $configRow) {
        $candidate = trim((string)$configRow['value']);
        if (in_array((string)$configRow['name'], ['web_name', 'web_title'], true)) {
            if ($candidate !== '') {
                $sourceBrandTerms[] = $candidate;
            }
        } else {
            $host = parse_url(strpos($candidate, '://') === false ? 'https://' . ltrim($candidate, '/') : $candidate, PHP_URL_HOST);
            if (is_string($host) && $host !== '') {
                $sourceHosts[] = strtolower($host);
            }
        }
    }
} catch (Throwable $ignored) {
    // The export remains safe without a configured source host.
}
$sourceHosts = array_values(array_unique($sourceHosts));
$sourceBrandTerms = array_values(array_unique($sourceBrandTerms));
$mediaMap = [];

$categorySql = "SELECT id,parent_id,channeltype,typename,dirname,dirpath,diy_dirpath,rulelist,ruleview,
        typelink,litpic,templist,tempview,seo_title,seo_keywords,seo_description,sort_order,is_hidden,
        is_part,target,nofollow,typearcrank,lang
    FROM {$prefix}arctype
    WHERE status=1 AND is_del=0 AND channeltype IN (1,2,4,6,8)
    ORDER BY parent_id ASC,sort_order ASC,id ASC";
$categoryRows = $pdo->query($categorySql)->fetchAll();

$toolSql = "SELECT a.aid,a.typeid,a.stypeid,a.title,a.subtitle,a.introduction,a.litpic,
        a.is_head,a.is_top,a.is_recom,a.is_b,a.is_special,a.is_jump,a.click,a.sort_order,
        a.jumplinks,a.seo_title,a.seo_keywords,a.seo_description,a.htmlfilename,a.lang,
        a.add_time,a.update_time,pc.content,pc.content_ey_m,pc.site_region,pc.top_global,
        pc.top_home,pc.top_category,pc.platform_tier,pc.home_sort_order,pc.category_sort_order
    FROM {$prefix}archives a
    INNER JOIN {$prefix}product_content pc ON pc.aid=a.aid
    WHERE a.channel=2 AND a.status=1 AND a.is_del=0 AND a.arcrank>-1
    ORDER BY a.aid ASC";
$toolRows = $pdo->query($toolSql)->fetchAll();

$tagsByAid = [];
$tagSql = "SELECT aid,tag FROM {$prefix}taglist WHERE aid IN (
        SELECT aid FROM {$prefix}archives WHERE channel=2 AND status=1 AND is_del=0 AND arcrank>-1
    ) ORDER BY aid ASC,tid ASC";
foreach ($pdo->query($tagSql)->fetchAll() as $tagRow) {
    $tagsByAid[(int)$tagRow['aid']][] = clean_text((string)$tagRow['tag'], $sourceHosts);
}

$relationsByAid = [];
$relationTable = $prefix . 'wogs_tool_category_rel';
if (table_exists($pdo, $relationTable)) {
    $relationSql = "SELECT aid,typeid,role,sort_order FROM {$relationTable} WHERE status=1 ORDER BY aid,typeid";
    foreach ($pdo->query($relationSql)->fetchAll() as $relationRow) {
        $relationsByAid[(int)$relationRow['aid']][] = [
            'category_legacy_id' => (int)$relationRow['typeid'],
            'role' => clean_text((string)$relationRow['role'], $sourceHosts),
            'sort_order' => (int)$relationRow['sort_order'],
        ];
    }
}

$categories = [];
foreach ($categoryRows as $row) {
    $categories[] = [
        'legacy_id' => (int)$row['id'],
        'parent_legacy_id' => (int)$row['parent_id'],
        'channel_type' => (int)$row['channeltype'],
        'name' => clean_text((string)$row['typename'], $sourceHosts),
        'slug' => preg_replace('/[^A-Za-z0-9_-]/', '', (string)$row['dirname']) ?: 'category-' . (int)$row['id'],
        'dirpath' => clean_text((string)$row['dirpath'], $sourceHosts),
        'diy_dirpath' => clean_text((string)$row['diy_dirpath'], $sourceHosts),
        'rule_list' => clean_text((string)$row['rulelist'], $sourceHosts),
        'rule_view' => clean_text((string)$row['ruleview'], $sourceHosts),
        'type_link' => clean_text((string)$row['typelink'], $sourceHosts),
        'template_list' => basename((string)$row['templist']),
        'template_view' => basename((string)$row['tempview']),
        'seo_title' => clean_text((string)$row['seo_title'], $sourceHosts),
        'seo_keywords' => clean_text((string)$row['seo_keywords'], $sourceHosts),
        'seo_description' => clean_text((string)$row['seo_description'], $sourceHosts),
        'sort_order' => (int)$row['sort_order'],
        'is_hidden' => (int)$row['is_hidden'] === 1 ? 1 : 0,
        'is_part' => (int)$row['is_part'],
        'target' => (int)$row['target'],
        'nofollow' => (int)$row['nofollow'],
        'type_rank' => (int)$row['typearcrank'],
        'lang' => preg_replace('/[^A-Za-z0-9_-]/', '', (string)$row['lang']) ?: 'cn',
    ];
}

$tools = [];
foreach ($toolRows as $row) {
    $litpic = media_reference((string)$row['litpic'], $sourceRoot, $mediaDir, $imageMagick, $mediaMap);
    $content = clean_html_media(clean_text((string)$row['content'], $sourceHosts), $sourceRoot, $mediaDir, $imageMagick, $mediaMap);
    $mobileContent = clean_html_media(clean_text((string)$row['content_ey_m'], $sourceHosts), $sourceRoot, $mediaDir, $imageMagick, $mediaMap);
    $aid = (int)$row['aid'];
    $tags = array_values(array_unique(array_filter($tagsByAid[$aid] ?? [], static function (string $tag): bool {
        return $tag !== '';
    })));
    $tools[] = [
        'legacy_aid' => $aid,
        'category_legacy_id' => (int)$row['typeid'],
        'secondary_category_legacy_ids' => array_values(array_filter(array_map('intval', explode(',', (string)$row['stypeid'])))),
        'category_relations' => $relationsByAid[$aid] ?? [],
        'title' => clean_text((string)$row['title'], $sourceHosts),
        'subtitle' => clean_text((string)$row['subtitle'], $sourceHosts),
        'summary' => clean_text((string)$row['introduction'], $sourceHosts),
        'thumbnail' => $litpic !== '' ? $litpic : 'template-fallback',
        'official_url' => clean_url((string)$row['jumplinks'], $sourceHosts),
        'content_html' => $content,
        'mobile_content_html' => $mobileContent,
        'flags' => [
            'headline' => (int)$row['is_head'] === 1 ? 1 : 0,
            'top' => (int)$row['is_top'] === 1 ? 1 : 0,
            'recommended' => (int)$row['is_recom'] === 1 ? 1 : 0,
            'bold' => (int)$row['is_b'] === 1 ? 1 : 0,
            'special' => (int)$row['is_special'] === 1 ? 1 : 0,
        ],
        'ranking' => [
            'clicks' => max(0, (int)$row['click']),
            'base_sort_order' => max(0, (int)$row['sort_order']),
            'global_top' => (int)$row['top_global'] === 1 ? 1 : 0,
            'home_top' => (int)$row['top_home'] === 1 ? 1 : 0,
            'category_top' => (int)$row['top_category'] === 1 ? 1 : 0,
            'platform_tier' => clean_text((string)$row['platform_tier'], $sourceHosts) ?: '普通',
            'home_sort_order' => max(0, (int)$row['home_sort_order']),
            'category_sort_order' => max(0, (int)$row['category_sort_order']),
        ],
        'site_region' => in_array((string)$row['site_region'], ['国内', '国外'], true) ? (string)$row['site_region'] : '国内',
        'seo' => [
            'title' => clean_text((string)$row['seo_title'], $sourceHosts),
            'keywords' => clean_text((string)$row['seo_keywords'], $sourceHosts),
            'description' => clean_text((string)$row['seo_description'], $sourceHosts),
        ],
        'html_filename' => preg_replace('/[^A-Za-z0-9_-]/', '', (string)$row['htmlfilename']) ?: '',
        'tags' => $tags,
        'lang' => preg_replace('/[^A-Za-z0-9_-]/', '', (string)$row['lang']) ?: 'cn',
        'published_at' => max(0, (int)$row['add_time']),
        'updated_at' => max(0, (int)$row['update_time']),
    ];
}

$wantedMedia = array_fill_keys(array_unique(array_values($mediaMap)), true);
foreach (glob($mediaDir . '/*') ?: [] as $existingMedia) {
    $name = basename($existingMedia);
    if (is_file($existingMedia)
        && preg_match('/^[a-f0-9]{64}\.(?:jpg|png|webp|gif)$/', $name)
        && !isset($wantedMedia[$name])
        && !unlink($existingMedia)) {
        fail('Cannot remove an obsolete generated media file.');
    }
}

$payload = [
    'format' => 'eyoucms-navigation-content',
    'format_version' => 1,
    'generated_at' => date('c'),
    'scope' => 'published navigation tools only',
    'privacy' => [
        'database configuration is never exported',
        'administrator and user identifiers are omitted',
        'sessions, payments, system settings and logs are omitted',
        'emails, phone numbers, local paths and known secret shapes are redacted',
        'source-site absolute URLs are converted to relative paths',
    ],
    'counts' => [
        'categories' => count($categories),
        'tools' => count($tools),
        'media_files' => count(array_unique(array_values($mediaMap))),
    ],
    'categories' => $categories,
    'tools' => $tools,
];

$json = json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
if (!is_string($json)) {
    fail('JSON encoding failed: ' . json_last_error_msg());
}
$outputPath = $dataDir . '/navigation-content.v1.json';
if (file_put_contents($outputPath, $json . "\n", LOCK_EX) === false) {
    fail('Cannot write the sanitized data file.');
}
fwrite(STDOUT, sprintf(
    "Exported categories=%d tools=%d media=%d json_bytes=%d\n",
    count($categories),
    count($tools),
    count(array_unique(array_values($mediaMap))),
    strlen($json)
));
