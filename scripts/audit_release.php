<?php
declare(strict_types=1);

if (PHP_SAPI !== 'cli') {
    http_response_code(404);
    exit;
}

error_reporting(E_ALL);
ini_set('display_errors', '1');
mb_internal_encoding('UTF-8');

$root = realpath(dirname(__DIR__));
if ($root === false) {
    fwrite(STDERR, "ERROR: Cannot resolve package root.\n");
    exit(1);
}

$failures = [];
$warnings = [];
$fail = static function (string $rule, string $path) use (&$failures): void {
    $failures[] = ['rule' => $rule, 'path' => str_replace('\\', '/', $path)];
};
$warn = static function (string $rule, string $path) use (&$warnings): void {
    $warnings[] = ['rule' => $rule, 'path' => str_replace('\\', '/', $path)];
};

$textExtensions = [
    'php', 'md', 'htm', 'html', 'css', 'js', 'json', 'svg', 'txt', 'ps1',
    'gitignore', 'gitattributes', 'editorconfig',
];
$secretPatterns = [
    'openai_token' => '/\bsk-[A-Za-z0-9_-]{20,}\b/',
    'github_token' => '/\bgh[pousr]_[A-Za-z0-9]{20,}\b/',
    'aws_access_key' => '/\bAKIA[0-9A-Z]{16}\b/',
    'slack_token' => '/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/',
    'anthropic_token' => '/\bsk-ant-[A-Za-z0-9_-]{20,}\b/',
    'google_api_key' => '/\bAIza[0-9A-Za-z_-]{35}\b/',
    'stripe_live_secret' => '/\b(?:sk|rk)_live_[A-Za-z0-9]{16,}\b/',
    'jwt_token' => '/\beyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/',
    'generic_named_secret' => '/(?:api[_-]?key|app[_-]?secret|client[_-]?secret|access[_-]?token)[\'"]\s*[:=]\s*[\'"][A-Za-z0-9_.\/+\-]{16,}[\'"]/i',
    'private_key_block' => '/-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----\s*[A-Za-z0-9+\/=\r\n]{100,}\s*-----END (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/s',
    'literal_database_credential' => '/[\'"](?:hostname|database|username|password)[\'"]\s*=>\s*[\'"][^\'"]+[\'"]/i',
];
$legacyBrandPattern = '/(?:' . preg_quote((string)base64_decode('5oiR5ZGK6K+J5L2gQUk='), '/')
    . '|' . preg_quote((string)base64_decode('d29nYW9zdW5pLmNu'), '/') . ')/iu';
$authorizedDemoLinkFiles = [
    'README.md' => true,
    'docs/INSTALLATION.md' => true,
];
$authorizedDemoUrl = 'https://' . (string)base64_decode('d29nYW9zdW5pLmNu') . '/';
$assetReferences = [];
$includeReferences = [];
$textFileCount = 0;
$photoSwipeDetected = false;
$trustedUrlTemplates = [
    'template/pc/seo_schema_helper.htm' => 'wn_schema_internal_url',
    'template/pc/view_article.htm' => 'wn_article_head_internal_url',
    'template/pc/view_download.htm' => 'wn_article_head_internal_url',
    'template/pc/view_product.htm' => 'wn_article_head_internal_url',
];
$trustedUrlTemplateContents = [];

$iterator = new RecursiveIteratorIterator(
    new RecursiveDirectoryIterator($root, FilesystemIterator::SKIP_DOTS)
);
foreach ($iterator as $file) {
    if (!$file->isFile()) {
        continue;
    }
    $relative = substr($file->getPathname(), strlen($root) + 1);
    $normalizedRelative = str_replace('\\', '/', $relative);
    $lowerName = strtolower($file->getFilename());
    if (preg_match('/^(?:\.env(?:\..+)?|database\.php(?:_read)?|.*\.(?:sql|sqlite3?|db|pem|key|pfx|p12|log|bak|backup))$/i', $lowerName)) {
        $fail('forbidden_file_type', $relative);
    }

    $extension = strtolower($file->getExtension());
    if ($lowerName === '.gitignore') {
        $extension = 'gitignore';
    } elseif ($lowerName === '.gitattributes') {
        $extension = 'gitattributes';
    } elseif ($lowerName === '.editorconfig') {
        $extension = 'editorconfig';
    }
    if (!in_array($extension, $textExtensions, true)) {
        continue;
    }
    $textFileCount++;
    $content = file_get_contents($file->getPathname());
    if (!is_string($content)) {
        $fail('unreadable_text_file', $relative);
        continue;
    }
    if (!mb_check_encoding($content, 'UTF-8')) {
        $fail('invalid_utf8', $relative);
    }
    foreach ($secretPatterns as $rule => $pattern) {
        if (preg_match($pattern, $content)) {
            $fail($rule, $relative);
        }
    }
    $brandScanContent = $content;
    if (isset($authorizedDemoLinkFiles[$normalizedRelative])) {
        $brandScanContent = str_replace($authorizedDemoUrl, '', $brandScanContent);
    }
    if (preg_match($legacyBrandPattern, $brandScanContent)) {
        $fail('legacy_source_brand', $relative);
    }
    if (strpos($normalizedRelative, 'template/') === 0) {
        if (stripos($normalizedRelative, 'fancybox') !== false) {
            $fail('forbidden_fancybox_file', $relative);
        }
        if (preg_match('/\bwindow\.Fancybox\b|\bFancybox\.(?:bind|getInstance)\b|data-fancybox|fancybox__/i', $content)) {
            $fail('forbidden_fancybox_api', $relative);
        }
        if (stripos($normalizedRelative, 'photoswipe') !== false || preg_match('/\bPhotoSwipe(?:Lightbox)?\b|data-pswp-gallery/i', $content)) {
            $photoSwipeDetected = true;
        }
        if (isset($trustedUrlTemplates[$normalizedRelative])) {
            $trustedUrlTemplateContents[$normalizedRelative] = $content;
            if (preg_match('/request\(\)\s*->\s*domain\s*\(|\$_SERVER\s*\[\s*[\'\"]HTTP_HOST[\'\"]\s*\]/i', $content)) {
                $fail('untrusted_request_host_usage', $relative);
            }
        }
        if (preg_match_all('#/?(template/(?:pc|mobile)/skin/[A-Za-z0-9_./-]+\.(?:css|js|png|jpg|jpeg|webp|gif|svg|woff|woff2|ttf))#i', $content, $matches)) {
            foreach ($matches[1] as $reference) {
                $assetReferences[$reference] = true;
            }
        }
        if ($extension === 'htm' && preg_match_all('#\{eyou:include\s+file=["\']([^"\']+)["\']#i', $content, $matches)) {
            foreach ($matches[1] as $reference) {
                $includeReferences[$reference] = true;
            }
        }
    }
}

foreach ($trustedUrlTemplates as $template => $requiredHelper) {
    if (!isset($trustedUrlTemplateContents[$template])) {
        $fail('missing_trusted_url_template', $template);
    } elseif (strpos($trustedUrlTemplateContents[$template], $requiredHelper) === false) {
        $fail('missing_internal_url_helper', $template);
    }
}
if ($photoSwipeDetected && !is_file($root . '/template/pc/skin/Lib/photoswipe/LICENSE')) {
    $fail('missing_photoswipe_license', 'template/pc/skin/Lib/photoswipe/LICENSE');
}

foreach (array_keys($assetReferences) as $reference) {
    if (!is_file($root . '/' . $reference)) {
        $fail('missing_template_asset', $reference);
    }
}
foreach (array_keys($includeReferences) as $reference) {
    if (!is_file($root . '/template/pc/' . $reference) && !is_file($root . '/template/mobile/' . $reference)) {
        $fail('missing_template_include', $reference);
    }
}

$dataPath = $root . '/data/navigation-content.v1.json';
$payload = is_file($dataPath) ? json_decode((string)file_get_contents($dataPath), true) : null;
if (!is_array($payload)) {
    $fail('invalid_or_missing_json', 'data/navigation-content.v1.json');
    $payload = [];
}

$forbiddenKeys = array_fill_keys([
    'hostname', 'database', 'username', 'password', 'api_key', 'apikey', 'secret', 'token',
    'access_token', 'client_secret', 'admin_id', 'users_id', 'session', 'cookie',
], true);
$inspectKeys = static function ($value, string $path = '$') use (&$inspectKeys, $forbiddenKeys, $fail): void {
    if (!is_array($value)) {
        return;
    }
    foreach ($value as $key => $child) {
        $childPath = $path . '.' . (string)$key;
        if (is_string($key) && isset($forbiddenKeys[strtolower($key)])) {
            $fail('forbidden_json_key', $childPath);
        }
        $inspectKeys($child, $childPath);
    }
};
$inspectKeys($payload);
$inspectPrivacyStrings = static function ($value, string $path = '$') use (&$inspectPrivacyStrings, $fail): void {
    if (is_array($value)) {
        foreach ($value as $key => $child) {
            $inspectPrivacyStrings($child, $path . '.' . (string)$key);
        }
        return;
    }
    if (!is_string($value)) {
        return;
    }
    $text = preg_replace('/\b[a-f0-9]{64}\b/i', '', $value) ?? $value;
    if (preg_match('/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i', $text)) {
        $fail('email_in_public_data', $path);
    }
    if (preg_match('/(?<!\d)1[3-9]\d{9}(?!\d)/', $text)) {
        $fail('phone_in_public_data', $path);
    }
    if (preg_match('/\b[A-Z]:\\\\(?:[^\\\\\r\n]+\\\\)*[^\\\\\r\n]*/i', $text)) {
        $fail('local_path_in_public_data', $path);
    }
};
$inspectPrivacyStrings([
    'categories' => $payload['categories'] ?? [],
    'tools' => $payload['tools'] ?? [],
]);

$tools = is_array($payload['tools'] ?? null) ? $payload['tools'] : [];
$categories = is_array($payload['categories'] ?? null) ? $payload['categories'] : [];
$categoryIds = [];
foreach ($categories as $index => $category) {
    $id = (int)($category['legacy_id'] ?? 0);
    if ($id <= 0 || isset($categoryIds[$id])) {
        $fail('invalid_or_duplicate_category_id', 'categories[' . $index . ']');
        continue;
    }
    $categoryIds[$id] = true;
}
foreach ($categories as $index => $category) {
    $parentId = (int)($category['parent_legacy_id'] ?? 0);
    if ($parentId > 0 && !isset($categoryIds[$parentId])) {
        $fail('orphan_category_parent', 'categories[' . $index . '].parent_legacy_id');
    }
    foreach (['template_list', 'template_view'] as $templateField) {
        $template = basename((string)($category[$templateField] ?? ''));
        if ($template !== ''
            && !is_file($root . '/template/pc/' . $template)
            && !is_file($root . '/template/mobile/' . $template)) {
            $fail('missing_category_template', 'categories[' . $index . '].' . $templateField);
        }
    }
}

$isPrivateHost = static function (string $host): bool {
    $host = strtolower(rtrim($host, '.'));
    if ($host === 'localhost' || substr($host, -6) === '.local') {
        return true;
    }
    if (filter_var($host, FILTER_VALIDATE_IP)) {
        return filter_var($host, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) === false;
    }
    return false;
};
$dangerousHtmlPattern = '#<(?:script|iframe|object|embed|form|input|button|textarea|select|base|meta)\b|\son[a-z]+\s*=|(?:javascript|vbscript|data)\s*:|<\?(?:php|=)|\{eyou:#iu';
$referencedMedia = [];
$toolIds = [];
$titles = [];
$urlIdentities = [];
foreach ($tools as $index => $tool) {
    $aid = (int)($tool['legacy_aid'] ?? 0);
    $title = trim((string)($tool['title'] ?? ''));
    if ($aid <= 0 || isset($toolIds[$aid])) {
        $fail('invalid_or_duplicate_tool_id', 'tools[' . $index . '].legacy_aid');
    }
    $toolIds[$aid] = true;
    if ($title === '') {
        $fail('empty_tool_title', 'tools[' . $index . '].title');
    } else {
        $titles[mb_strtolower($title, 'UTF-8')][] = $aid;
    }

    $primaryCategory = (int)($tool['category_legacy_id'] ?? 0);
    if (!isset($categoryIds[$primaryCategory])) {
        $fail('orphan_primary_category', 'tools[' . $index . '].category_legacy_id');
    }
    foreach ((array)($tool['secondary_category_legacy_ids'] ?? []) as $secondaryId) {
        if (!isset($categoryIds[(int)$secondaryId])) {
            $fail('orphan_secondary_category', 'tools[' . $index . '].secondary_category_legacy_ids');
        }
    }
    foreach ((array)($tool['category_relations'] ?? []) as $relationIndex => $relation) {
        if (!isset($categoryIds[(int)($relation['category_legacy_id'] ?? 0)])) {
            $fail('orphan_category_relation', 'tools[' . $index . '].category_relations[' . $relationIndex . ']');
        }
    }

    $url = (string)($tool['official_url'] ?? '');
    $parts = parse_url($url);
    if (!is_array($parts) || !in_array(strtolower((string)($parts['scheme'] ?? '')), ['http', 'https'], true)) {
        $fail('invalid_official_url', 'tools[' . $index . '].official_url');
    } elseif (isset($parts['user']) || isset($parts['pass'])) {
        $fail('url_contains_credentials', 'tools[' . $index . '].official_url');
    } elseif ($isPrivateHost((string)($parts['host'] ?? ''))) {
        $fail('private_or_local_official_url', 'tools[' . $index . '].official_url');
    } else {
        $identityPath = rawurldecode((string)($parts['path'] ?? '/'));
        $identityPath = $identityPath === '/' ? '/' : rtrim('/' . ltrim($identityPath, '/'), '/');
        $urlIdentities[strtolower((string)($parts['host'] ?? '')) . $identityPath][] = $aid;
        if (strtolower((string)($parts['scheme'] ?? '')) === 'http') {
            $warn('non_https_official_url', 'tools[' . $index . '].official_url');
        }
    }
    if (!empty($parts['query'])) {
        parse_str((string)$parts['query'], $query);
        foreach (array_keys($query) as $key) {
            if (preg_match('/^(?:utm_.+|ref|aff|affiliate|invite|token|key|secret|code|from|source|comefrom|jwt|sig|signature|auth|credential|apikey|api_key|access_token)$/i', (string)$key)) {
                $fail('sensitive_url_parameter', 'tools[' . $index . '].official_url');
            }
        }
    }

    foreach (['content_html', 'mobile_content_html'] as $htmlField) {
        $html = (string)($tool[$htmlField] ?? '');
        if ($htmlField === 'content_html' && $html === '') {
            $fail('empty_tool_content', 'tools[' . $index . '].' . $htmlField);
        } elseif ($html !== '' && preg_match($dangerousHtmlPattern, $html)) {
            $fail('dangerous_html', 'tools[' . $index . '].' . $htmlField);
        }
    }
    $publishedAt = (int)($tool['published_at'] ?? 0);
    $updatedAt = (int)($tool['updated_at'] ?? 0);
    if ($publishedAt < 0 || $updatedAt < 0 || $publishedAt > time() + 86400 || $updatedAt > time() + 86400) {
        $fail('invalid_tool_timestamp', 'tools[' . $index . ']');
    }

    $strings = [
        (string)($tool['thumbnail'] ?? ''),
        (string)($tool['content_html'] ?? ''),
        (string)($tool['mobile_content_html'] ?? ''),
    ];
    foreach ($strings as $text) {
        if (preg_match_all('#(?:media/|\{\{MEDIA_BASE\}\}/)([a-f0-9]{64}\.(?:jpg|png|webp|gif))#', $text, $matches)) {
            foreach ($matches[1] as $name) {
                $referencedMedia[$name] = true;
            }
        }
    }
}

foreach ($titles as $aids) {
    if (count($aids) > 1) {
        $warn('duplicate_tool_title', 'AID:' . implode(',', $aids));
    }
}
foreach ($urlIdentities as $aids) {
    if (count($aids) > 1) {
        $warn('duplicate_official_url', 'AID:' . implode(',', $aids));
    }
}
foreach (array_keys($referencedMedia) as $name) {
    if (!is_file($root . '/data/media/' . $name)) {
        $fail('missing_media', 'data/media/' . $name);
    }
}

$actualMedia = glob($root . '/data/media/*') ?: [];
$allowedMimes = [
    'jpg' => ['image/jpeg'],
    'png' => ['image/png'],
    'webp' => ['image/webp'],
    'gif' => ['image/gif'],
];
foreach ($actualMedia as $mediaPath) {
    if (!is_file($mediaPath)) {
        $fail('unexpected_media_entry', 'data/media/' . basename($mediaPath));
        continue;
    }
    $extension = strtolower(pathinfo($mediaPath, PATHINFO_EXTENSION));
    $expectedName = hash_file('sha256', $mediaPath) . '.' . $extension;
    if (!hash_equals($expectedName, basename($mediaPath))) {
        $fail('media_filename_hash_mismatch', 'data/media/' . basename($mediaPath));
    }
    $info = @getimagesize($mediaPath);
    if (!isset($allowedMimes[$extension]) || !is_array($info) || !in_array((string)($info['mime'] ?? ''), $allowedMimes[$extension], true)) {
        $fail('invalid_or_disguised_media', 'data/media/' . basename($mediaPath));
    } elseif ((int)$info[0] > 4096 || (int)$info[1] > 4096 || (int)$info[0] <= 0 || (int)$info[1] <= 0) {
        $fail('unsafe_media_dimensions', 'data/media/' . basename($mediaPath));
    }
}

if (count($categories) !== (int)($payload['counts']['categories'] ?? -1)) {
    $fail('category_count_mismatch', 'data/navigation-content.v1.json');
}
if (count($tools) !== (int)($payload['counts']['tools'] ?? -1)) {
    $fail('tool_count_mismatch', 'data/navigation-content.v1.json');
}
if (count($actualMedia) !== (int)($payload['counts']['media_files'] ?? -1)) {
    $fail('media_count_mismatch', 'data/media');
}

if ($warnings !== []) {
    fwrite(STDOUT, sprintf("Release audit warnings: %d\n", count($warnings)));
    foreach ($warnings as $warning) {
        fwrite(STDOUT, 'WARNING' . "\t" . $warning['rule'] . "\t" . $warning['path'] . "\n");
    }
}
if ($failures !== []) {
    fwrite(STDERR, sprintf("Release audit FAILED: %d issue(s)\n", count($failures)));
    foreach ($failures as $failure) {
        fwrite(STDERR, $failure['rule'] . "\t" . $failure['path'] . "\n");
    }
    exit(1);
}

fwrite(STDOUT, sprintf(
    "Release audit OK: text_files=%d categories=%d tools=%d media=%d warnings=%d\n",
    $textFileCount,
    count($categories),
    count($tools),
    count($actualMedia),
    count($warnings)
));
