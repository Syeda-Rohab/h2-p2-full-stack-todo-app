@echo off
title TODO APP - Quick Start
color 0A
echo.
echo ============================================
echo    TODO APP - Phase 2 Quick Start
echo ============================================
echo.
echo Cleaning up old processes...
taskkill /F /IM node.exe /T >nul 2>&1
taskkill /F /IM python.exe /T >nul 2>&1
timeout /t 2 /nobreak >nul

echo.
echo Starting Backend Server...
cd backend
start "Backend API - Port 8000" cmd /k "uv run uvicorn src.main:app --reload --port 8000"
timeout /t 3 /nobreak >nul

echo.
echo Starting Frontend Server...
cd ..\frontend
start "Frontend App - Port 3000" cmd /k "npm run dev"

echo.
echo ============================================
echo   Servers Starting...
echo ============================================
echo.
echo Backend will be at: http://localhost:8000
echo Frontend will be at: http://localhost:3000
echo.
echo Wait 30-60 seconds for compilation...
echo Then open browser: http://localhost:3000
echo.
echo ============================================
timeout /t 5
start http://localhost:3000
echo.
pause
