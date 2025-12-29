@echo off
echo ============================================
echo    TODO APP - Phase 2
echo ============================================
echo.
echo Backend running at: http://localhost:8000
echo Frontend running at: http://localhost:3000
echo.
echo Opening browser in 3 seconds...
timeout /t 3 /nobreak > nul
start http://localhost:3000
echo.
echo Browser opened! If not, manually visit:
echo http://localhost:3000
echo.
echo ============================================
pause
