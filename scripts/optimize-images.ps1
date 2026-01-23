# Image Optimization Script for Ortho-Showcase
# Converts JPEG images to WebP format and resizes to optimal web dimensions

param(
    [int]$MaxWidth = 1200,
    [int]$Quality = 85,
    [switch]$DryRun
)

# Refresh environment to get ImageMagick path
$env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path", "User")

$magickPath = "C:\Program Files\ImageMagick-7.1.2-Q16-HDRI\magick.exe"
if (-not (Test-Path $magickPath)) {
    $magickPath = (Get-Command magick -ErrorAction SilentlyContinue).Source
    if (-not $magickPath) {
        Write-Error "ImageMagick not found. Please restart your terminal after installation."
        exit 1
    }
}

$imagesDir = ".\assets\images\cases"
$totalOriginalSize = 0
$totalOptimizedSize = 0
$processedCount = 0

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Image Optimization Script" -ForegroundColor Cyan
Write-Host "  Max Width: $MaxWidth px | Quality: $Quality%" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Get all case directories
$caseDirs = Get-ChildItem -Path $imagesDir -Directory | Where-Object { $_.Name -match "^case-\d+$" }

foreach ($caseDir in $caseDirs) {
    Write-Host "Processing $($caseDir.Name)..." -ForegroundColor Yellow
    
    # Get all JPG files
    $jpgFiles = Get-ChildItem -Path $caseDir.FullName -Filter "*.jpg"
    
    foreach ($jpg in $jpgFiles) {
        $originalSize = $jpg.Length
        $totalOriginalSize += $originalSize
        
        $webpPath = $jpg.FullName -replace "\.jpg$", ".webp"
        $webpName = $jpg.Name -replace "\.jpg$", ".webp"
        
        if ($DryRun) {
            Write-Host "  [DRY RUN] Would convert: $($jpg.Name)" -ForegroundColor Gray
        }
        else {
            # Convert and resize to WebP
            & $magickPath $jpg.FullName -resize "$($MaxWidth)x>" -quality $Quality $webpPath
            
            if (Test-Path $webpPath) {
                $webpSize = (Get-Item $webpPath).Length
                $totalOptimizedSize += $webpSize
                $savings = [math]::Round((1 - $webpSize / $originalSize) * 100, 1)
                
                $origKB = [math]::Round($originalSize / 1024, 0)
                $webpKB = [math]::Round($webpSize / 1024, 0)
                Write-Host "  OK: $($jpg.Name) - ${origKB}KB to ${webpKB}KB (-${savings}%)" -ForegroundColor Green
                
                $processedCount++
            }
            else {
                Write-Host "  FAIL: $($jpg.Name)" -ForegroundColor Red
            }
        }
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  SUMMARY" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

$origMB = [math]::Round($totalOriginalSize / 1048576, 2)
$optMB = [math]::Round($totalOptimizedSize / 1048576, 2)
$totalSavings = if ($totalOriginalSize -gt 0) { [math]::Round((1 - $totalOptimizedSize / $totalOriginalSize) * 100, 1) } else { 0 }

Write-Host "  Images processed: $processedCount"
Write-Host "  Original total:   $origMB MB"
Write-Host "  Optimized total:  $optMB MB"
Write-Host "  Space saved:      $totalSavings%" -ForegroundColor Green
Write-Host ""
Write-Host "WebP files created alongside original JPGs."
Write-Host "Original JPG files preserved for backup."
Write-Host ""
