@echo off
echo 🔧 BVC Dashboard Docker Build Script
echo =======================================

REM Check if node is installed for the fix script
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
  echo ❌ Node.js is required but not found
  echo Please install Node.js from https://nodejs.org/
  exit /b 1
)

REM Run the fix script if the file exists
echo 📝 Fixing linter errors in VerificationSystem.jsx...
if exist src\features\VerificationSystem.jsx (
  node fix-verification-system.js
  if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to fix linter errors
    exit /b 1
  )
  echo ✅ Fixed linter errors
) else (
  echo ⚠️ VerificationSystem.jsx not found, skipping fixes
)

REM Build the Docker image
echo 🔨 Building Docker image...
docker build -t bvc-dashboard .

REM Check if the build was successful
if %ERRORLEVEL% NEQ 0 (
  echo ❌ Docker build failed
  exit /b 1
)

echo ✅ Docker image built successfully
echo You can now run the container with:
echo    docker run -p 80:80 --name bvc-dashboard -d bvc-dashboard
echo.
echo Or use docker-compose:
echo    docker-compose up -d

echo =======================================
echo 🚀 BVC Dashboard is ready to deploy! 