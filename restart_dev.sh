#!/bin/bash

# Development Restart Script for News Dashboard
# This script helps restart both frontend and backend with proper port management

echo "🔄 Restarting News Dashboard Development Environment..."

# Kill any existing processes on ports 3000, 3001, 3002, and 5000
echo "🛑 Stopping existing processes..."

# Windows PowerShell commands
echo "Stopping processes on port 3000..."
netstat -ano | findstr :3000 | findstr LISTENING > nul 2>&1 && (
    for /f "tokens=5" %a in ('netstat -ano ^| findstr :3000 ^| findstr LISTENING') do taskkill /f /pid %a
)

echo "Stopping processes on port 3001..."
netstat -ano | findstr :3001 | findstr LISTENING > nul 2>&1 && (
    for /f "tokens=5" %a in ('netstat -ano ^| findstr :3001 ^| findstr LISTENING') do taskkill /f /pid %a
)

echo "Stopping processes on port 3002..."
netstat -ano | findstr :3002 | findstr LISTENING > nul 2>&1 && (
    for /f "tokens=5" %a in ('netstat -ano ^| findstr :3002 ^| findstr LISTENING') do taskkill /f /pid %a
)

echo "Stopping processes on port 5000..."
netstat -ano | findstr :5000 | findstr LISTENING > nul 2>&1 && (
    for /f "tokens=5" %a in ('netstat -ano ^| findstr :5000 ^| findstr LISTENING') do taskkill /f /pid %a
)

# Wait a moment for processes to fully stop
timeout /t 2 /nobreak > nul

echo "✅ Processes stopped"

# Start backend first
echo "🚀 Starting backend on port 5000..."
cd backend
start "Backend" cmd /k "python app.py"
cd ..

# Wait for backend to start
echo "⏳ Waiting for backend to start..."
timeout /t 5 /nobreak > nul

# Start frontend
echo "🚀 Starting frontend..."
cd frontend
start "Frontend" cmd /k "npm start"
cd ..

echo "✅ Development environment started!"
echo ""
echo "📋 URLs:"
echo "   Frontend: http://localhost:3000 (or 3001/3002 if 3000 is busy)"
echo "   Backend:  http://localhost:5000"
echo "   Health:   http://localhost:5000/api/health"
echo ""
echo "🔧 If authentication fails:"
echo "   1. Check that both services are running"
echo "   2. Clear browser cookies for localhost"
echo "   3. Try accessing http://localhost:5000/auth/test-oauth to check OAuth config"
echo ""
echo "Press any key to exit..."
pause > nul
