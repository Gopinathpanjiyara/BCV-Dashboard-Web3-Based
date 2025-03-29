#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Path to the file with the error
const filePath = path.join(__dirname, 'src', 'features', 'VerificationSystem.jsx');

// Read the file
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading file: ${err}`);
    return;
  }

  // Fix the specific syntax error around lines 640-643
  const fixedContent = data.replace(
    /{VERIFICATION_TYPES[type].icon && \(\n                <VERIFICATION_TYPES\[type\]\.icon className="w-5 h-5 text-gray-400 mr-2" \/>\n              \)}/g,
    `{VERIFICATION_TYPES[type].icon && (
                React.createElement(VERIFICATION_TYPES[type].icon, {
                  className: "w-5 h-5 text-gray-400 mr-2"
                })
              )}`
  );

  // Write the fixed content back to the file
  fs.writeFile(filePath, fixedContent, 'utf8', (err) => {
    if (err) {
      console.error(`Error writing file: ${err}`);
      return;
    }
    console.log('Successfully fixed VerificationSystem.jsx');
  });
});

console.log('Running fix for VerificationSystem.jsx linter error');
console.log('This script replaces the problematic JSX with React.createElement() calls');
console.log('Run this script before building the Docker image if you encounter linter errors'); 