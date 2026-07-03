/**
 * remove-sections.js
 * ---------------------------------------------------------------
 * Build-time stripper (Method B — Node.js + Cheerio).
 *
 * Removes from the static landing-page source files:
 *   1. <section id="projetos">…</section>  (and the 3 .projeto-card
 *      articles inside it) from index.html
 *   2. The <a href="#projetos"> link from the topbar nav
 *   3. The `about` command handler from `terminalState.commands`
 *      in script.js, plus all `d.terminal.about` translation blobs
 *      in both `pt` and `en`
 *   4. The whole `projects` translation block (no longer referenced
 *      in HTML after step 1) and the `sections.projetos*` aliases
 *   5. The `about` line from the terminal `help` listing
 *   6. References to `.projeto-card` / `.projeto-link` in the
 *      custom-cursor hover selector and the GSAP cardSelectors list
 *   7. Every CSS rule whose selector targets `.projetos`, `.projeto-*`,
 *      `.media-frame`, `.mario-frame`, `.salon-frame`, `.financas-frame`,
 *      `.financas-gif`, `.tech-list`, `.feature*`, `.status-projeto`,
 *      `.status-finalizado`, `.status-evolucao` — and all references to
 *      `.projeto-card` in shared selectors / media queries
 *
 * Run:  node scripts/remove-sections.js
 * Idempotent: re-running on already-stripped files is a no-op (regex
 * patterns simply don't match).
 * ---------------------------------------------------------------
 */

'use strict';

const fs   = require('node:fs');
const path = require('node:path');
const cheerio = require('cheerio');

/* ---------- paths ---------- */
const ROOT       = path.resolve(__dirname, '..');
const HTML_PATH  = path.join(ROOT, 'index.html');
const JS_PATH    = path.join(ROOT, 'js', 'script.js');
const CSS_PATH   = path.join(ROOT, 'css', 'style.css');

/* ---------- small helpers ---------- */
function read(p)  { return fs.readFileSync(p, 'utf8'); }
function write(p, s) { fs.writeFileSync(p, s, 'utf8'); }
function info(msg)  { console.log('  ' + msg); }
function delta(before, after) {
  return (before.length - after.length).toString().padStart(5, ' ') + ' bytes';
}

/* ===============================================================
   1) index.html  —  Cheerio
   =============================================================== */
function stripHtml(html) {
  const $ = cheerio.load(html, { decodeEntities: false });

  // 1a) remove the whole projects section
  $('section#projetos').remove();

  // 1b) remove the "Projetos" link from the topbar nav so the menu
  //     points only to sections that still exist
  $('nav.menu-fixo a[href="#projetos"]').remove();

  // Cheerio auto-addes <html><head><body> wrappers unless we ask it not to.
  // We only mutated body content, so $.html() re-serialises the full doc.
  return $.html();
}

/* ===============================================================
   2) script.js  —  targeted regex over the source
   =============================================================== */
function stripScript(src) {
  let out = src;

  // 2a) drop the `about` entry from both help listings
  //     (matches:   '<span class="cyan">about</span>    → ...', )
  out = out.replace(
    /^\s*'<span class="cyan">about<\/span>[^']*',\s*\n/gm,
    ''
  );

  // 2b) drop the whole `about: { … },` block inside each terminal dict.
  //     The block starts with `about: {` (4-space indent) and ends at
  //     the matching closing `},` on its own line.
  out = out.replace(
    /^        about: \{\n[\s\S]*?\n        \},\n/gm,
    ''
  );

  // 2c) drop the `about: function () { … },` handler in
  //     terminalState.commands. Same start/end pattern.
  out = out.replace(
    /^      about: function \(\) \{\n[\s\S]*?\n      \},\n/gm,
    ''
  );

  // 2d) drop the entire `projects: { … },` translation block (PT and EN).
  //     These keys are no longer referenced after the HTML section is gone.
  out = out.replace(
    /^      projects: \{\n[\s\S]*?\n      \},\n/gm,
    ''
  );

  // 2e) drop the `sections.projetos*` aliases (PT and EN) — never used
  //     by the HTML and only referenced by the now-removed projects code.
  out = out.replace(
    /^\s*projetos\w*:\s*'[^']*',\s*\n/gm,
    ''
  );

  // 2f) drop `.projeto-card` and `.projeto-link` from the cursor hover
  //     selector list. They live inside a string literal, so a simple
  //     substring swap is safe.
  out = out.replace(/, \.projeto-link/g, '');

  // 2g) drop `.projeto-card` from the GSAP cardSelectors array
  out = out.replace(/', '\.projeto-card'/g, "'");

  // 2h) drop `.projeto-card` from the IntersectionObserver querySelectorAll
  //     strings (two occurrences in initRevealObserver).
  out = out.replace(
    /, \.projeto-card(?=,\s*\.section-label)/g,
    ''
  );

  // 2i) drop `nav.projects` keys (PT + EN) — the nav link was removed
  //     from the HTML in step 1, so the translation is now dead.
  out = out.replace(/^\s*projects:\s*'(Projetos|Projects)',\s*\n/gm, '');
  out = out.replace(
    /^\/\/ HTML keys used: nav\.home \/ nav\.projects \/ nav\.studies[^\n]*\n/gm,
    ''
  );

  // 2j) drop the now-unused `scroll.projBtn` keys and the comment
  //     describing the removed projects translation block.
  out = out.replace(
    /^\s*projBtn:\s*'(Ver projetos|View projects)',\s*\n/gm,
    ''
  );
  out = out.replace(
    /^\s*\/\/ HTML uses projects\.[^\n]*\n/gm,
    ''
  );

  return out;
}

/* ===============================================================
   3) style.css  —  drop every rule that targets a project class
   =============================================================== */
function stripCss(src) {
  let out = src;

  // 3a) full top-level rules (selector + { block })
  //     The rules we want to kill are single-selector blocks.
  //     Pattern: optional indent + `.foo, .bar { ... }` where the
  //     body has balanced braces.
  const killSelectors = [
    '.projetos',
    '.projeto-card',
    '.projeto-card:last-child',
    '.projeto-card::before',
    '.projeto-card:hover',
    '.media-frame',
    '.mario-frame',
    '.salon-frame',
    'body.theme-light .salon-frame',
    '.projeto-img',
    '.projeto-card:hover .projeto-img',
    '.media-placeholder',
    '.media-placeholder span',
    '.media-placeholder p',
    '.media-placeholder small',
    '.frame-badge',
    '.projeto-media',
    '.projeto-info',
    '.projeto-num',
    '.projeto-info h3',
    '.projeto-info > p',
    '.status-projeto',
    '.status-finalizado',
    '.status-evolucao',
    '.tech-list',
    '.tech-list span',
    '.feature-list',
    '.feature',
    '.feature-dot',
    '.projeto-actions',
    '.projeto-link',
    '.projeto-link svg',
    '.projeto-link:hover',
    '.projeto-link:hover svg',
    '.financas-frame',
    '.financas-frame .financas-gif',
    '.projeto-card:hover .financas-frame .financas-gif',
    '.financas-frame .frame-badge',
    'body.theme-light .financas-frame .frame-badge',
  ];

  for (const sel of killSelectors) {
    // Escape regex meta-characters in the selector
    const esc = sel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Match: optional indent + literal selector + optional comma-list
    // siblings + opening brace + body (no nested braces in this CSS) +
    // closing brace. We anchor on the exact selector to avoid killing
    // siblings in a comma list unintentionally.
    const re = new RegExp(
      '^[ \\t]*' + esc + '\\s*(?:,[^\\n]*)?\\{[\\s\\S]*?\\n\\}\\n',
      'gm'
    );
    out = out.replace(re, '');
  }

  // 3b) rules that include `.projeto-card` ALONGSIDE other selectors
  //     in a comma list — strip just the `.projeto-card` token + the
  //     trailing comma/space.
  out = out.replace(/,?\s*\.projeto-card\b/g, '');

  // 3c) media-query rules that only set `.projeto-card` (or its inner
  //     pieces) on small screens — drop the whole rule.
  out = out.replace(
    /^[ \t]*\.projeto-card[^{]*\{\n[\s\S]*?\n\}\n/gm,
    ''
  );
  out = out.replace(
    /^[ \t]*\.projeto-info[^{]*\{\n[\s\S]*?\n\}\n/gm,
    ''
  );
  out = out.replace(
    /^[ \t]*\.tech-list, \.feature-list[^{]*\{\n[\s\S]*?\n\}\n/gm,
    ''
  );
  out = out.replace(
    /^[ \t]*\.projeto-actions[^{]*\{\n[\s\S]*?\n\}\n/gm,
    ''
  );
  out = out.replace(
    /^[ \t]*\.projeto-actions \.projeto-link[^{]*\{\n[\s\S]*?\n\}\n/gm,
    ''
  );
  out = out.replace(
    /^[ \t]*\.status-projeto[^{]*\{\n[\s\S]*?\n\}\n/gm,
    ''
  );

  // 3d) comments whose only purpose is the now-deleted block
  out = out.replace(/\/\* ={2,}\s+\n\s+Frame Finanças\s+\n\s+={2,} \*\/\n/g, '');

  return out;
}

/* ===============================================================
   main
   =============================================================== */
function main() {
  console.log('▶ Build-time strip — removing Projects section + about command\n');

  /* --- HTML --- */
  const htmlBefore = read(HTML_PATH);
  const htmlAfter  = stripHtml(htmlBefore);
  write(HTML_PATH, htmlAfter);
  console.log('index.html  ' + delta(htmlBefore, htmlAfter));

  /* --- JS --- */
  const jsBefore = read(JS_PATH);
  const jsAfter  = stripScript(jsBefore);
  write(JS_PATH, jsAfter);
  console.log('js/script.js ' + delta(jsBefore, jsAfter));

  /* --- CSS --- */
  const cssBefore = read(CSS_PATH);
  const cssAfter  = stripCss(cssBefore);
  write(CSS_PATH, cssAfter);
  console.log('css/style.css ' + delta(cssBefore, cssAfter));

  console.log('\n✓ Done. Re-run `node scripts/remove-sections.js` to re-apply (idempotent).');
}

main();
