#!/bin/bash

# Exit on error
set -e

echo "🔧 BVC Dashboard Docker Build Script"
echo "======================================="

# Fix the linter error in VerificationSystem.jsx
echo "📝 Fixing linter errors in VerificationSystem.jsx..."
if [ -f src/features/VerificationSystem.jsx ]; then
  # Manual fix for the linter error using sed
  sed -i -E 's/<VERIFICATION_TYPES\[type\]\.icon className="w-5 h-5 text-gray-400 mr-2" \/>/\{React.createElement\(VERIFICATION_TYPES\[type\].icon, \{className: "w-5 h-5 text-gray-400 mr-2"\}\)\}/g' src/features/VerificationSystem.jsx
  echo "✅ Fixed linter errors"
else
  echo "⚠️ VerificationSystem.jsx not found, skipping fixes"
fi

# Build the Docker image
echo "🔨 Building Docker image..."
docker build -t bvc-dashboard .

# Check if the build was successful
if [ $? -eq 0 ]; then
  echo "✅ Docker image built successfully"
  echo "You can now run the container with:"
  echo "   docker run -p 80:80 --name bvc-dashboard -d bvc-dashboard"
  echo ""
  echo "Or use docker-compose:"
  echo "   docker-compose up -d"
else
  echo "❌ Docker build failed"
  exit 1
fi

echo "======================================="
echo "🚀 BVC Dashboard is ready to deploy!" 