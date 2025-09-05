#!/bin/bash

# Simple local test script to demonstrate vulnerability detection
# This shows what the GitHub Actions workflow will find

echo "🎯 Local Test: Scanning for Unmanaged JavaScript Vulnerabilities"
echo "================================================================"
echo ""

# Check if retire is installed
if ! command -v retire &> /dev/null; then
    echo "📦 Installing retire.js..."
    npm install -g retire
    echo ""
fi

echo "🔍 Scanning JavaScript files for embedded vulnerable libraries..."
echo "Directory: $(pwd)"
echo ""

# Run retire.js scan
retire --path . --outputformat json --ignore node_modules,dist,build,.git > scan-results.json 2>/dev/null || true

# Check results
if [ -f "scan-results.json" ] && [ -s "scan-results.json" ]; then
    echo "📋 SCAN RESULTS"
    echo "──────────────────────────────────────────────────"
    
    # Parse JSON results
    FILES=$(cat scan-results.json | jq -r '.data | length' 2>/dev/null || echo "0")
    VULNS=$(cat scan-results.json | jq -r '[.data[].results[]?.vulnerabilities[]?] | length' 2>/dev/null || echo "0")
    LIBS=$(cat scan-results.json | jq -r '[.data[].results[]?.component] | unique | length' 2>/dev/null || echo "0")
    
    echo "📁 Files scanned: $FILES"
    echo "🔍 Libraries detected: $LIBS" 
    echo "🚨 Total vulnerabilities: $VULNS"
    echo ""
    
    if [ "$VULNS" -gt 0 ]; then
        echo "🚨 VULNERABLE LIBRARIES FOUND:"
        echo "────────────────────────────────────────────────────────────────────────────────"
        
        # Display vulnerability details
        cat scan-results.json | jq -r '
          .data[] | 
          select(.results | length > 0) |
          "📄 " + (.file | split("/") | last),
          (.results[] | 
            select(.vulnerabilities | length > 0) |
            "  📦 " + (.component // .npmname) + " v" + .version + " - " + ((.vulnerabilities | length) | tostring) + " vulnerabilities",
            (.vulnerabilities[0:2][] | 
              "    • [" + (.severity | ascii_upcase) + "] " + (.identifiers.summary // "Vulnerability found")
            ),
            if (.vulnerabilities | length) > 2 then "    • ... and " + (((.vulnerabilities | length) - 2) | tostring) + " more" else empty end
          ),
          ""
        ' 2>/dev/null || echo "Error parsing details"
        
        echo "💡 KEY INSIGHT FOR CUSTOMER:"
        echo "These vulnerable libraries are embedded directly in the source code!"
        echo "Traditional dependency scans miss them because they're not in package.json"
        echo ""
        echo "✅ This demonstrates the security gap that Snyk's unmanaged scanner fills"
    else
        echo "❌ No vulnerabilities found - this might indicate an issue with the scan"
    fi
    
    echo ""
    echo "📄 Full results saved to: scan-results.json"
else
    echo "❌ No scan results generated"
    echo "💡 This could mean:"
    echo "   - No JavaScript files found"
    echo "   - retire.js failed to execute"
    echo "   - No vulnerable patterns detected"
fi

echo ""
echo "🎬 Ready for GitHub Actions demo!"
echo "The workflow will show the same results automatically"
