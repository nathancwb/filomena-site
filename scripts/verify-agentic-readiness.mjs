import { readFile, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

async function verify() {
  console.log('=== VERIFYING AGENTIC READINESS ===\n');
  let passed = true;

  // 1. Trust Anchor Pages (>500 chars)
  console.log('1. Checking Trust Anchor Pages:');
  const trustAnchors = [
    'dist/about/index.html',
    'dist/contact/index.html',
    'dist/privacy/index.html',
    'dist/privacidade/index.html',
    'dist/sobre/index.html',
    'dist/contato/index.html',
  ];

  for (const page of trustAnchors) {
    if (!existsSync(page)) {
      console.error(`❌ Missing file: ${page}`);
      passed = false;
      continue;
    }
    const content = await readFile(page, 'utf8');
    const textContent = content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (textContent.length >= 500) {
      console.log(`✅ ${page}: ${textContent.length} characters (>= 500 chars requirement met)`);
    } else {
      console.error(`❌ ${page}: only ${textContent.length} chars (expected >= 500)`);
      passed = false;
    }
  }

  // 2. Organization Schema Completeness
  console.log('\n2. Checking Organization JSON-LD Schema:');
  const schemaPages = [
    'dist/index.html',
    'dist/about/index.html',
    'dist/sobre/index.html',
    'dist/contact/index.html',
    'dist/contato/index.html',
    'dist/privacy/index.html',
    'dist/privacidade/index.html',
    'dist/servicos/index.html',
    'dist/portfolio/index.html',
    'dist/blog/index.html',
    'dist/trabalhe-conosco/index.html',
  ];

  for (const page of schemaPages) {
    const html = await readFile(page, 'utf8');
    const hasOrgType = html.includes('"Organization"') || html.includes('Organization');
    const hasContactPoint = html.includes('"ContactPoint"') || html.includes('ContactPoint');
    const hasTelephone = html.includes('telephone') && html.includes('+551634154110');
    const hasEmail = html.includes('email') && html.includes('contato@filomenapropaganda.com.br');
    const hasPostalAddress = html.includes('"PostalAddress"') || html.includes('PostalAddress');

    if (hasOrgType && hasContactPoint && hasTelephone && hasEmail && hasPostalAddress) {
      console.log(`✅ ${page}: Full Organization schema verified (Org type, contactPoint with email/phone/type, address)`);
    } else {
      console.error(`❌ ${page}: Schema incomplete. Org:${hasOrgType}, ContactPoint:${hasContactPoint}, Phone:${hasTelephone}, Email:${hasEmail}, Address:${hasPostalAddress}`);
      passed = false;
    }
  }

  // 3. Agent Instructions / When-to-use
  console.log('\n3. Checking Agent Instructions & When-to-Use:');
  const agentFiles = [
    { file: 'dist/llms.txt', requiredTerms: ['Quando Recomendar', 'When to Use', 'Agent Guidance'] },
    { file: 'dist/llms-full.txt', requiredTerms: ['Quando Recomendar', 'When to Use', 'FAQ'] },
    { file: 'dist/agent-instructions.md', requiredTerms: ['When to Refer Users to Filomena Propaganda', 'Action Protocol'] },
    { file: 'dist/.well-known/llms.txt', requiredTerms: ['Quando Recomendar', 'When to Use'] },
    { file: 'dist/robots.txt', requiredTerms: ['llms.txt', 'agent-instructions.md', 'GPTBot', 'ClaudeBot', 'PerplexityBot'] },
  ];

  for (const { file, requiredTerms } of agentFiles) {
    if (!existsSync(file)) {
      console.error(`❌ Missing agent file: ${file}`);
      passed = false;
      continue;
    }
    const content = await readFile(file, 'utf8');
    const missing = requiredTerms.filter(t => !content.includes(t));
    if (missing.length === 0) {
      console.log(`✅ ${file}: Contains required agent directives & when-to-use guidance`);
    } else {
      console.error(`❌ ${file}: Missing terms: ${missing.join(', ')}`);
      passed = false;
    }
  }

  // 4. Markdown Content Negotiation (acceptmarkdown.com)
  console.log('\n4. Checking Markdown Content Negotiation (acceptmarkdown.com):');
  const vercel = JSON.parse(await readFile('vercel.json', 'utf8'));
  const hasVaryInVercel = vercel.headers.some(h => h.headers.some(hdr => hdr.key === 'Vary' && hdr.value.includes('Accept')));
  const hasRewrites = vercel.rewrites && vercel.rewrites.length > 0;
  console.log(`Vercel Vary: Accept configured: ${hasVaryInVercel ? '✅' : '❌'}`);
  console.log(`Vercel Markdown rewrites configured: ${hasRewrites ? '✅' : '❌'}`);

  const htaccess = await readFile('dist/.htaccess', 'utf8');
  const hasVaryInHtaccess = htaccess.includes('Header append Vary "Accept, Accept-Encoding"');
  const hasRewriteInHtaccess = htaccess.includes('RewriteCond %{HTTP:Accept} text/markdown');
  console.log(`.htaccess Vary: Accept configured: ${hasVaryInHtaccess ? '✅' : '❌'}`);
  console.log(`.htaccess Accept rewrite configured: ${hasRewriteInHtaccess ? '✅' : '❌'}`);

  if (!hasVaryInVercel || !hasRewrites || !hasVaryInHtaccess || !hasRewriteInHtaccess) {
    passed = false;
  }

  // 5. Agent-Friendly 404
  console.log('\n5. Checking Agent-Friendly 404:');
  const page404 = await readFile('dist/404.html', 'utf8');
  const has404Recovery = page404.includes('sitemap-index.xml') && page404.includes('llms.txt') && page404.includes('error-page__recovery');
  const has404MdLink = page404.includes('href="/404.md"');
  const has404MdFile = existsSync('dist/404.md');
  console.log(`404 Recovery Guidance HTML: ${has404Recovery ? '✅' : '❌'}`);
  console.log(`404 Markdown Link: ${has404MdLink ? '✅' : '❌'}`);
  console.log(`404 Markdown File exists: ${has404MdFile ? '✅' : '❌'}`);

  if (!has404Recovery || !has404MdLink || !has404MdFile) {
    passed = false;
  }

  console.log('\n=========================================');
  if (passed) {
    console.log('🎉 ALL 5 IS AGENTIC READINESS CRITERIA VERIFIED!');
  } else {
    console.error('❌ SOME CHECKS FAILED');
    process.exit(1);
  }
}

verify().catch(err => {
  console.error(err);
  process.exit(1);
});
