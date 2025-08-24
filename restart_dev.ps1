# Development Restart Script for News Dashboard (PowerShell)
# This script helps restart both frontend and backend with proper port management

Write-Host "🔄 Restarting News Dashboard Development Environment..." -ForegroundColor Green

# Kill any existing processes on ports 3000, 3001, 3002, and 5000
Write-Host "🛑 Stopping existing processes..." -ForegroundColor Yellow

# Function to kill processes on a specific port
function Stop-ProcessOnPort {
    param([int]$Port)
    
    $processes = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue
    foreach ($process in $processes) {
        try {
            $processInfo = Get-Process -Id $process.OwningProcess -ErrorAction SilentlyContinue
            if ($processInfo) {
                Write-Host "Stopping process on port $Port: $($processInfo.ProcessName) (PID: $($processInfo.Id))" -ForegroundColor Yellow
                Stop-Process -Id $process.OwningProcess -Force -ErrorAction SilentlyContinue
            }
        }
        catch {
            Write-Host "Could not stop process on port $Port" -ForegroundColor Red
        }
    }
}

# Stop processes on development ports
Stop-ProcessOnPort -Port 3000
Stop-ProcessOnPort -Port 3001
Stop-ProcessOnPort -Port 3002
Stop-ProcessOnPort -Port 5000

# Wait a moment for processes to fully stop
Start-Sleep -Seconds 2

Write-Host "✅ Processes stopped" -ForegroundColor Green

# Start backend first
Write-Host "🚀 Starting backend on port 5000..." -ForegroundColor Green
Set-Location backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "python app.py" -WindowStyle Normal
Set-Location ..

# Wait for backend to start
Write-Host "⏳ Waiting for backend to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Start frontend
Write-Host "🚀 Starting frontend..." -ForegroundColor Green
Set-Location frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm start" -WindowStyle Normal
Set-Location ..

Write-Host "✅ Development environment started!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 URLs:" -ForegroundColor Cyan
Write-Host "   Frontend: http://localhost:3000 (or 3001/3002 if 3000 is busy)" -ForegroundColor White
Write-Host "   Backend:  http://localhost:5000" -ForegroundColor White
Write-Host "   Health:   http://localhost:5000/api/health" -ForegroundColor White
Write-Host ""
Write-Host "🔧 If authentication fails:" -ForegroundColor Yellow
Write-Host "   1. Check that both services are running" -ForegroundColor White
Write-Host "   2. Clear browser cookies for localhost" -ForegroundColor White
Write-Host "   3. Try accessing http://localhost:5000/auth/test-oauth to check OAuth config" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
