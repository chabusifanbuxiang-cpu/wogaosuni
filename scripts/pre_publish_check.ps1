[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'
$packageRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..')).TrimEnd('\', '/')
$gitRootOutput = @(& git -C $packageRoot rev-parse --show-toplevel 2>$null)
$gitExitCode = $LASTEXITCODE
$gitRootText = ($gitRootOutput | Select-Object -First 1)
if ($gitExitCode -ne 0 -or [string]::IsNullOrWhiteSpace($gitRootText)) {
    throw 'The package directory is not an independent Git repository. Run git init only inside this package, then retry.'
}
$gitRoot = [IO.Path]::GetFullPath($gitRootText.Trim()).TrimEnd('\', '/')
if (-not [string]::Equals($gitRoot, $packageRoot, [StringComparison]::OrdinalIgnoreCase)) {
    throw "Git root is not the package directory; stopped to prevent uploading the parent project. Git=$gitRoot Package=$packageRoot"
}

$php = (Get-Command php -ErrorAction Stop).Source
& $php (Join-Path $packageRoot 'scripts\audit_release.php')
if ($LASTEXITCODE -ne 0) {
    throw 'Release audit failed.'
}
Get-ChildItem -LiteralPath (Join-Path $packageRoot 'scripts') -Filter '*.php' -File | ForEach-Object {
    & $php -l $_.FullName
    if ($LASTEXITCODE -ne 0) {
        throw "PHP syntax check failed: $($_.Name)"
    }
}

$node = Get-Command node -ErrorAction SilentlyContinue
$javascriptChecks = @(
    'template\pc\skin\wogaosuni\script\article-lightbox.js',
    'template\pc\skin\wogaosuni\script\site-i18n.js',
    'template\pc\skin\wogaosuni\script\custom.js',
    'template\pc\skin\wogaosuni\script\custom.min.js',
    'template\pc\skin\Lib\photoswipe\js\photoswipe.umd.min.js',
    'template\pc\skin\Lib\photoswipe\js\photoswipe-lightbox.umd.min.js'
)
if ($null -ne $node) {
    foreach ($relative in $javascriptChecks) {
        $javascriptPath = Join-Path $packageRoot $relative
        if (-not (Test-Path -LiteralPath $javascriptPath -PathType Leaf)) {
            throw "Required JavaScript file is missing: $relative"
        }
        & $node.Source --check $javascriptPath
        if ($LASTEXITCODE -ne 0) {
            throw "JavaScript syntax check failed: $relative"
        }
    }
} else {
    Write-Warning 'Node.js is unavailable; JavaScript syntax checks were skipped. Install Node.js and rerun before a public release.'
}

$staged = @(& git -C $packageRoot diff --cached --name-only --diff-filter=ACMR)
if ($LASTEXITCODE -ne 0) {
    throw 'Cannot read the Git staging area.'
}
$forbidden = '(?i)(^|/)(application|core|vendor|public|install|install_eyoucms|uploads?|runtime|session|cache|backups?)/|(^|/)(database\.php(?:_read)?|\.env(?:\..*)?)$|\.(sql|sqlite3?|db|pem|key|pfx|p12|log|bak|backup|zip|rar|7z)$'
foreach ($relative in $staged) {
    $normalized = $relative -replace '\\', '/'
    if ($normalized -match $forbidden) {
        throw "Staging contains a forbidden file: $normalized"
    }
    $isDataFile = $normalized.StartsWith('data/', [StringComparison]::OrdinalIgnoreCase)
    $isAllowedDataFile = $normalized -eq 'data/navigation-content.v1.json' -or $normalized -match '^data/media/[a-f0-9]{64}\.(?:jpg|png|webp|gif)$'
    if ($isDataFile -and -not $isAllowedDataFile) {
        throw "The data directory contains a non-allowlisted file: $normalized"
    }
    $fullPath = [IO.Path]::GetFullPath((Join-Path $packageRoot $relative))
    if (-not $fullPath.StartsWith($packageRoot + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) {
        throw "Staged path escapes the package root: $normalized"
    }
    if ((Test-Path -LiteralPath $fullPath -PathType Leaf) -and (Get-Item -LiteralPath $fullPath).Length -gt 50MB) {
        throw "Staging contains a file larger than 50 MiB: $normalized"
    }
}

$gitleaks = Get-Command gitleaks -ErrorAction SilentlyContinue
if ($null -ne $gitleaks -and $staged.Count -gt 0) {
    & $gitleaks.Source protect --staged --redact --source $packageRoot
    if ($LASTEXITCODE -ne 0) {
        throw 'Gitleaks failed. Remove or rotate every detected credential before publishing.'
    }
} elseif ($null -eq $gitleaks) {
    Write-Warning 'Gitleaks is unavailable. The built-in audit ran, but install Gitleaks and scan once more before publishing publicly.'
}

& git -C $packageRoot diff --cached --check
if ($LASTEXITCODE -ne 0) {
    throw 'The staged diff has whitespace errors. Fix them before publishing.'
}
Write-Host ("Pre-publish checks passed: GitRoot={0} StagedFiles={1}" -f $gitRoot, $staged.Count)
