<?php
declare(strict_types=1);

if (PHP_SAPI !== 'cli') {
    http_response_code(404);
    exit;
}

error_reporting(E_ALL);
ini_set('display_errors', '1');
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

function bool_option(array $argv, string $name): ?int
{
    $value = option($argv, $name, null);
    if ($value === null) {
        return null;
    }
    if (!in_array($value, ['0', '1'], true)) {
        fail("{$name} only accepts 0 or 1.");
    }
    return (int)$value;
}

$args = $argv ?? [];
$apply = in_array('--apply', $args, true);
if ($apply && option($args, '--confirm', '') !== 'UPDATE_TOOL_RANKING') {
    fail('Apply mode requires --confirm=UPDATE_TOOL_RANKING.');
}
$cmsRoot = option($args, '--cms-root', '');
$cmsRoot = $cmsRoot !== null && $cmsRoot !== '' ? realpath($cmsRoot) : false;
if ($cmsRoot === false || !is_file($cmsRoot . '/application/database.php')) {
    fail('Use --cms-root=PATH to point at the target EyouCMS installation.');
}
$aid = (int)(option($args, '--aid', '0') ?? 0);
if ($aid <= 0) {
    fail('Use --aid=NUMBER to select one tool.');
}

$archiveChanges = [];
foreach (['--recommended' => 'is_recom', '--headline' => 'is_head', '--top' => 'is_top'] as $argument => $field) {
    $value = bool_option($args, $argument);
    if ($value !== null) {
        $archiveChanges[$field] = $value;
    }
}
$click = option($args, '--click', null);
if ($click !== null) {
    if (!ctype_digit($click)) {
        fail('--click requires a non-negative integer.');
    }
    $archiveChanges['click'] = (int)$click;
}

$productChanges = [];
foreach (['--global-top' => 'top_global', '--home-top' => 'top_home', '--category-top' => 'top_category'] as $argument => $field) {
    $value = bool_option($args, $argument);
    if ($value !== null) {
        $productChanges[$field] = $value;
    }
}
foreach (['--home-sort' => 'home_sort_order', '--category-sort' => 'category_sort_order'] as $argument => $field) {
    $value = option($args, $argument, null);
    if ($value !== null) {
        if (!ctype_digit($value)) {
            fail("{$argument} requires a non-negative integer.");
        }
        $productChanges[$field] = min(999999, (int)$value);
    }
}
$tier = option($args, '--tier', null);
$tiers = ['普通', '国内大厂', '国外大厂', '国内普通', '国外成熟', '国外普通', '低优先'];
if ($tier !== null) {
    if (!in_array($tier, $tiers, true)) {
        fail('--tier is not in the allowed platform tier list.');
    }
    $productChanges['platform_tier'] = $tier;
}
$region = option($args, '--region', null);
if ($region !== null) {
    if (!in_array($region, ['国内', '国外'], true)) {
        fail('--region only accepts 国内 or 国外.');
    }
    $productChanges['site_region'] = $region;
}
if ($archiveChanges === [] && $productChanges === []) {
    fail('No ranking changes were specified.');
}

$db = include $cmsRoot . '/application/database.php';
$prefix = is_array($db) ? (string)($db['prefix'] ?? 'ey_') : '';
if (!is_array($db) || !preg_match('/^[A-Za-z0-9_]+$/', $prefix)) {
    fail('The target database configuration is invalid.');
}
$pdo = new PDO(
    sprintf('mysql:host=%s;port=%s;dbname=%s;charset=%s', $db['hostname'], $db['hostport'], $db['database'], $db['charset'] ?? 'utf8mb4'),
    $db['username'],
    $db['password'],
    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]
);
$select = $pdo->prepare("SELECT a.aid,a.title,a.is_recom,a.is_head,a.is_top,a.click,
    pc.top_global,pc.top_home,pc.top_category,pc.platform_tier,pc.home_sort_order,pc.category_sort_order,pc.site_region
    FROM `{$prefix}archives` a INNER JOIN `{$prefix}product_content` pc ON pc.aid=a.aid
    WHERE a.aid=:aid AND a.channel=2 LIMIT 1");
$select->execute([':aid' => $aid]);
$current = $select->fetch();
if (!$current) {
    fail("Tool AID {$aid} was not found.");
}

fwrite(STDOUT, 'Mode=' . ($apply ? 'apply' : 'dry-run') . ' AID=' . $aid . ' Title=' . $current['title'] . "\n");
foreach ($archiveChanges + $productChanges as $field => $value) {
    fwrite(STDOUT, sprintf("%s: %s -> %s\n", $field, (string)$current[$field], (string)$value));
}
if (!$apply) {
    fwrite(STDOUT, "Dry run only. Add --apply --confirm=UPDATE_TOOL_RANKING to save.\n");
    exit(0);
}

$pdo->beginTransaction();
try {
    foreach ([[$prefix . 'archives', $archiveChanges], [$prefix . 'product_content', $productChanges]] as [$table, $changes]) {
        if ($changes === []) {
            continue;
        }
        $sets = [];
        $parameters = [':aid' => $aid];
        foreach ($changes as $field => $value) {
            $sets[] = "`{$field}`=:{$field}";
            $parameters[':' . $field] = $value;
        }
        $statement = $pdo->prepare("UPDATE `{$table}` SET " . implode(',', $sets) . ' WHERE aid=:aid');
        $statement->execute($parameters);
    }
    $pdo->commit();
} catch (Throwable $error) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    fail('Update rolled back: ' . $error->getMessage());
}
fwrite(STDOUT, "Ranking settings updated. Clear the EyouCMS cache before checking the page.\n");
