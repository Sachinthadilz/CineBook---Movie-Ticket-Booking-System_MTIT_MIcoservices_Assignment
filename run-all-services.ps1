# CineBook Microservices - Run All Services (PowerShell)
# Runs all services in this single terminal using background jobs.

$rootPath = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host ""
Write-Host "====================================================================" -ForegroundColor Cyan
Write-Host "Starting CineBook Microservices..." -ForegroundColor Cyan
Write-Host "====================================================================" -ForegroundColor Cyan
Write-Host ""

$services = @(
    @{ name = "API Gateway"; port = 3000; path = "api-gateway" },
    @{ name = "User Service"; port = 3004; path = "user-service" },
    @{ name = "Movie Service"; port = 3001; path = "movie-service" },
    @{ name = "Cinema Service"; port = 3002; path = "cinema-service" },
    @{ name = "Booking Service"; port = 3003; path = "booking-service" }
)

# Clean up old CineBook jobs from previous runs.
Get-Job -Name "CineBook:*" -ErrorAction SilentlyContinue | Stop-Job -ErrorAction SilentlyContinue
Get-Job -Name "CineBook:*" -ErrorAction SilentlyContinue | Remove-Job -ErrorAction SilentlyContinue

$jobs = @()

foreach ($service in $services) {
    $servicePath = Join-Path $rootPath $service.path

    if (-not (Test-Path $servicePath)) {
        Write-Host "Skipping $($service.name): path not found -> $servicePath" -ForegroundColor Red
        continue
    }

    Write-Host "Starting $($service.name) on port $($service.port)..." -ForegroundColor Yellow

    $job = Start-Job -Name "CineBook:$($service.name)" -ScriptBlock {
        param($pathToService)
        Set-Location $pathToService
        npm run dev
    } -ArgumentList $servicePath

    $jobs += $job
    Start-Sleep -Seconds 1
}

Write-Host ""
Write-Host "====================================================================" -ForegroundColor Green
Write-Host "All services started in this terminal." -ForegroundColor Green
Write-Host "====================================================================" -ForegroundColor Green
Write-Host ""
Write-Host "Services:" -ForegroundColor Cyan
Write-Host "  - API Gateway:     http://localhost:3000" -ForegroundColor White
Write-Host "  - User Service:    http://localhost:3004" -ForegroundColor White
Write-Host "  - Movie Service:   http://localhost:3001" -ForegroundColor White
Write-Host "  - Cinema Service:  http://localhost:3002" -ForegroundColor White
Write-Host "  - Booking Service: http://localhost:3003" -ForegroundColor White
Write-Host ""
Write-Host "Gateway Swagger: http://localhost:3000/api-docs" -ForegroundColor Cyan
Write-Host ""
Write-Host "To see logs: Get-Job -Name 'CineBook:*' | Receive-Job -Keep" -ForegroundColor Yellow
Write-Host "Press Ctrl+C to stop all services." -ForegroundColor Yellow
Write-Host ""

try {
    Wait-Job -Job $jobs
} finally {
    Get-Job -Name "CineBook:*" -ErrorAction SilentlyContinue | Stop-Job -ErrorAction SilentlyContinue
    Get-Job -Name "CineBook:*" -ErrorAction SilentlyContinue | Remove-Job -ErrorAction SilentlyContinue
}
