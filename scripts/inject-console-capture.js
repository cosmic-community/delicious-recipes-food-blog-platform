const fs = require('fs');
const path = require('path');

const scriptTag = '<script src="/dashboard-console-capture.js"></script>';

function injectScript(filePath) {
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes('dashboard-console-capture.js')) {
    console.log(`✓ Script already present in ${filePath}`);
    return;
  }
  
  if (content.includes('</head>')) {
    content = content.replace('</head>', `  ${scriptTag}\n</head>`);
    fs.writeFileSync(filePath, content);
    console.log(`✓ Injected script into ${filePath}`);
  }
}

const outDir = path.join(__dirname, '..', '.next', 'server', 'app');

if (fs.existsSync(outDir)) {
  const files = [];
  
  function walkDir(dir) {
    const items = fs.readdirSync(dir);
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        walkDir(fullPath);
      } else if (item.endsWith('.html')) {
        files.push(fullPath);
      }
    });
  }
  
  walkDir(outDir);
  files.forEach(injectScript);
  
  console.log(`\n✓ Processed ${files.length} HTML files`);
} else {
  console.log('Build directory not found. Run build first.');
}