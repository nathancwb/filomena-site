const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.astro'));

for (const file of files) {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  content = content.replace(/href="styles\.css"/g, 'href="/styles.css"');
  content = content.replace(/src="script\.js"/g, 'src="/script.js"');
  content = content.replace(/src="assets\//g, 'src="/assets/');
  content = content.replace(/background: url\('assets\//g, "background: url('/assets/");
  
  fs.writeFileSync(filePath, content, 'utf8');
}
console.log('Fixes applied.');
