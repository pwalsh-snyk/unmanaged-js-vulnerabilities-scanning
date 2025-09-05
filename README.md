# Customer Web Application - Unmanaged JavaScript Dependencies Demo

> **🎯 Purpose**: This repository demonstrates a real-world scenario where development teams have manually copied JavaScript libraries into their codebase, making them invisible to traditional dependency scanning tools.

## 🚨 The Problem

This application represents a common customer scenario where:

1. **Developers copy/paste JavaScript libraries** directly into source files
2. **Libraries are NOT managed** by `package.json` or other package managers  
3. **Traditional security scans MISS these dependencies** because they only check manifest files
4. **Vulnerable code goes undetected** in production applications

## 📁 Application Structure

```
customer-demo-app/
├── 📦 package.json              # Only contains legitimate managed dependencies
├── 🖥️  src/app.js               # Express server (managed dependencies)
├── 🌐 public/
│   ├── index.html               # Main application page
│   ├── styles.css              # Application styling
│   └── js/                     # ⚠️ UNMANAGED VULNERABLE LIBRARIES
│       ├── vendor-libs.js       # jQuery 1.8.0, Lodash 2.0.0 (EMBEDDED)
│       ├── chart-utils.js       # Moment.js 2.0.0, Handlebars 1.0.0 (EMBEDDED)
│       └── app-main.js          # AngularJS 1.2.0 (EMBEDDED)
└── 🔄 .github/workflows/       # CI/CD security scanning
    └── unmanaged-js-scan.yml   # Snyk Unmanaged JS Scanner
```

## ⚠️ Vulnerable Libraries (Unmanaged)

The following libraries are **embedded directly in the source code** and contain known security vulnerabilities:

### `public/js/vendor-libs.js`
- **jQuery 1.8.0** - Multiple XSS vulnerabilities, prototype pollution
- **Lodash 2.0.0** - Prototype pollution, command injection risks

### `public/js/chart-utils.js`  
- **Moment.js 2.0.0** - ReDoS (Regular Expression Denial of Service) vulnerabilities
- **Handlebars 1.0.0** - XSS vulnerabilities in template rendering

### `public/js/app-main.js`
- **AngularJS 1.2.0** - Multiple XSS vulnerabilities, End-of-Life warnings

## 🔍 Detection Challenge

**Traditional tools CANNOT detect these vulnerabilities because:**

✅ `package.json` only shows legitimate dependencies:
```json
{
  "dependencies": {
    "express": "^4.18.0",     // ✅ Managed & secure
    "body-parser": "^1.20.0"  // ✅ Managed & secure  
  }
}
```

❌ **But the vulnerable libraries are hidden in source files:**
- jQuery 1.8.0 (2012) with **7 known vulnerabilities**
- Lodash 2.0.0 (2013) with **6 known vulnerabilities** 
- AngularJS 1.2.0 (2013) with **16 known vulnerabilities**
- And more...

## 🛡️ Solution: Snyk Unmanaged JS Scanner

The **Snyk Unmanaged JavaScript Scanner** solves this problem by:

1. **🔍 Scanning source code directly** (not just manifest files)
2. **🎯 Detecting embedded library patterns** using retire.js
3. **📊 Identifying vulnerabilities** in unmanaged dependencies
4. **🚨 Alerting in CI/CD pipelines** before code reaches production

## 🚀 Live Demo

### GitHub Actions Integration

This repository includes a complete **GitHub Actions workflow** that demonstrates:

- ✅ **Automated scanning** on every push/PR
- ✅ **Detailed vulnerability reporting** with CVE information
- ✅ **PR comments** with security findings
- ✅ **Build failures** for high/critical vulnerabilities
- ✅ **Artifact uploads** for detailed analysis

### Running the Demo

1. **Fork this repository**
2. **Push a change** or create a Pull Request
3. **Watch the Actions tab** as the scanner runs
4. **Review the results** in the workflow summary and artifacts

## 📊 Expected Scan Results

When you run the scanner, you should see results similar to:

```
🔍 Snyk Unmanaged JavaScript Library Scanner
Scanning: /path/to/customer-demo-app

📋 SCAN SUMMARY
──────────────────────────────────────────────────
📁 Files scanned: 3
⚠️  Vulnerable files: 3  
🔍 Libraries detected: 5
🚨 Total vulnerabilities: 35+

🎯 SEVERITY BREAKDOWN
──────────────────────────────────────────────────
Critical: 0
High: 4
Medium: 25+
Low: 6+

📚 DETECTED LIBRARIES
──────────────────────────────────────────────────
• jquery 1.8.0
• lodash 2.0.0
• moment 2.0.0
• handlebars 1.0.0
• angularjs 1.2.0
```

## 🎯 Business Value Demonstration

This demo proves that:

1. **❌ Standard security tools miss critical vulnerabilities** in unmanaged code
2. **✅ Snyk's solution fills this security gap** effectively
3. **🔄 Easy CI/CD integration** provides continuous protection
4. **📈 Immediate ROI** by catching hidden vulnerabilities

## 🏢 Customer Use Cases

This scenario is common in enterprises where:

- **Legacy applications** have accumulated copy/pasted libraries over time
- **Development teams** prefer "quick fixes" over proper dependency management  
- **Security teams** need visibility into ALL code dependencies
- **Compliance requirements** demand complete vulnerability tracking

## 📞 Next Steps

After seeing this demo, customers typically want to:

1. **🔍 Scan their existing codebase** to find hidden vulnerabilities
2. **🔧 Integrate the scanner** into their CI/CD pipelines
3. **📋 Establish policies** for managing unmanaged dependencies
4. **🎓 Train development teams** on secure dependency practices

---

**💡 Key Takeaway**: Traditional security scanning is incomplete without checking for unmanaged JavaScript dependencies. This tool provides the missing piece for comprehensive application security.

## 🛠️ Technical Details

- **Scanner Engine**: [retire.js](https://github.com/RetireJS/retire.js) 
- **CI/CD Integration**: GitHub Actions, Jenkins, GitLab CI
- **Output Formats**: JSON, text, with detailed CVE information
- **Customizable**: Severity thresholds, ignore patterns, file extensions
