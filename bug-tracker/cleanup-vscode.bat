@echo off
REM VS Code Clean Up Script for Windows
REM This script clears VS Code cache and settings to ensure fresh configuration

echo.
echo 🧹 Cleaning VS Code Configuration (Windows)...
echo.

REM Set VS Code directory
set "VSCODE_DIR=%APPDATA%\Code"

echo Detected: Windows
echo VS Code Directory: %VSCODE_DIR%

REM Check if VS Code is running and close it
tasklist /FI "IMAGENAME eq Code.exe" 2>NUL | find /I /N "Code.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo Closing VS Code...
    taskkill /IM Code.exe /F >NUL 2>&1
    timeout /t 2 /nobreak
    echo ✓ Closed VS Code
)

REM Create backup
if exist "%VSCODE_DIR%" (
    echo.
    echo 📦 Backing up current settings...
    for /f "tokens=2-4 delims=/ " %%a in ('date /t') do (set mydate=%%c%%a%%b)
    for /f "tokens=1-2 delims=/:" %%a in ('time /t') do (set mytime=%%a%%b)
    set "BACKUP_DIR=%VSCODE_DIR%\backups\backup_%mydate%_%mytime%"
    mkdir "%VSCODE_DIR%\backups" >NUL 2>&1
    xcopy "%VSCODE_DIR%" "%BACKUP_DIR%" /E /I /Q >NUL 2>&1
    echo ✓ Backup created
)

REM Clear caches
echo.
echo 🗑️  Clearing caches...

if exist "%VSCODE_DIR%\CachedExtensions" (
    rmdir /S /Q "%VSCODE_DIR%\CachedExtensions" >NUL 2>&1
    echo   ✓ Cleared extension cache
)

if exist "%VSCODE_DIR%\Cache" (
    rmdir /S /Q "%VSCODE_DIR%\Cache" >NUL 2>&1
    echo   ✓ Cleared general cache
)

if exist "%VSCODE_DIR%\Code Cache" (
    rmdir /S /Q "%VSCODE_DIR%\Code Cache" >NUL 2>&1
    echo   ✓ Cleared code cache
)

if exist "%VSCODE_DIR%\Workspaces" (
    rmdir /S /Q "%VSCODE_DIR%\Workspaces" >NUL 2>&1
    echo   ✓ Cleared workspaces cache
)

if exist "%VSCODE_DIR%\User\workspaceStorage" (
    rmdir /S /Q "%VSCODE_DIR%\User\workspaceStorage" >NUL 2>&1
    echo   ✓ Cleared workspace storage
)

echo ✓ Cache clearing complete

echo.
echo ℹ️  Restart VS Code to apply clean configuration
echo.
echo Next steps:
echo 1. Open VS Code
echo 2. Install recommended extensions when prompted
echo 3. Run 'Start Both Servers' task
echo.
echo ✅ Cleanup complete!
echo.
pause
