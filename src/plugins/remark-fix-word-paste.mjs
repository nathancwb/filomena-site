/**
 * Conserta conteúdo colado do Word/Google Docs em artigos do blog.
 *
 * Dois problemas comuns ao colar texto formatado:
 *   1. Listas viram parágrafos começando com "·" / "•" (marcador literal),
 *      em vez de listas de verdade.
 *   2. Subtítulos viram parágrafos 100% em negrito, sem hierarquia.
 *
 * Este plugin roda no build e converte:
 *   - parágrafos "·  texto" consecutivos  ->  lista <ul><li> real
 *   - parágrafo só em negrito             ->  título <h3>
 *
 * Sem dependências externas: percorre o mdast manualmente.
 */

// Marcadores de "bullet falso" comuns vindos de Word/Docs
const BULLET_RE = /^\s*[·•▪‣◦·∙]\s+/;

function isFakeBullet(node) {
  if (!node || node.type !== 'paragraph' || !node.children.length) return false;
  const first = node.children[0];
  return first && first.type === 'text' && BULLET_RE.test(first.value);
}

function stripBulletChildren(node) {
  // Remove o marcador do início do primeiro nó de texto, preservando o resto
  const children = node.children.map((c) => ({ ...c }));
  children[0].value = children[0].value.replace(BULLET_RE, '');
  return children;
}

function isBoldOnly(node) {
  if (!node || node.type !== 'paragraph') return false;
  // Ignora nós de texto que sejam apenas espaços em branco
  const meaningful = node.children.filter(
    (c) => !(c.type === 'text' && c.value.trim() === '')
  );
  return meaningful.length === 1 && meaningful[0].type === 'strong';
}

export default function remarkFixWordPaste() {
  return (tree) => {
    const children = tree.children;
    const out = [];
    let i = 0;

    while (i < children.length) {
      const node = children[i];

      // 1) Agrupa bullets falsos consecutivos numa lista real
      if (isFakeBullet(node)) {
        const items = [];
        while (i < children.length && isFakeBullet(children[i])) {
          items.push({
            type: 'listItem',
            spread: false,
            children: [
              { type: 'paragraph', children: stripBulletChildren(children[i]) },
            ],
          });
          i++;
        }
        out.push({ type: 'list', ordered: false, spread: false, children: items });
        continue;
      }

      // 2) Parágrafo inteiramente em negrito -> subtítulo h3
      if (isBoldOnly(node)) {
        const strong = node.children.find((c) => c.type === 'strong');
        out.push({ type: 'heading', depth: 3, children: strong.children });
        i++;
        continue;
      }

      out.push(node);
      i++;
    }

    tree.children = out;
  };
}
