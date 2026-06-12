// Pos-build: minifica os assets servidos da pasta public/ (styles.css e
// script.js), que o Astro copia para dist/ sem processar. Mantem os fontes
// legiveis e entrega versoes menores em producao.
import { transform } from 'esbuild';
import { readFile, writeFile, stat } from 'node:fs/promises';

const targets = [
  { file: 'dist/styles.css', loader: 'css' },
  { file: 'dist/script.js', loader: 'js' },
];

for (const { file, loader } of targets) {
  try {
    const before = (await stat(file)).size;
    const code = await readFile(file, 'utf8');
    const result = await transform(code, { loader, minify: true, legalComments: 'none' });
    await writeFile(file, result.code);
    const after = Buffer.byteLength(result.code);
    console.log(`[optimize] ${file}: ${(before / 1024).toFixed(1)}KB -> ${(after / 1024).toFixed(1)}KB`);
  } catch (err) {
    console.warn(`[optimize] pulando ${file}: ${err.message}`);
  }
}
