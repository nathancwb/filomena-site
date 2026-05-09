const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.astro'));

for (const file of files) {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  content = content.replace(/<script src="\/script\.js"><\/script>/g, '<script src="/script.js" is:inline></script>');
  content = content.replace(/<script src="script\.js"><\/script>/g, '<script src="/script.js" is:inline></script>');
  
  fs.writeFileSync(filePath, content, 'utf8');
}
console.log('Fixes applied.');
