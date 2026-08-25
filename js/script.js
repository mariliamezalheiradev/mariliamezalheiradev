(function () {
  'use strict';

  /* ========================
     HELPER: Escape HTML
     ======================== */
  function escapeHTML(str) {
    if (str === undefined || str === null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /* ========================
     STORAGE KEYS
     ======================== */
  const STORAGE_KEY_LANG  = 'portfolio_lang';
  const STORAGE_KEY_THEME = 'portfolio_theme';

  /* ========================
     INITIAL DETECTION
     ======================== */
  function detectInitialLang() {
    const stored = localStorage.getItem(STORAGE_KEY_LANG);
    if (stored === 'pt' || stored === 'en') return stored;
    const navLang = (navigator.language || 'pt').toLowerCase();
    return navLang.startsWith('pt') ? 'pt' : 'en';
  }

  function detectInitialTheme() {
    const stored = localStorage.getItem(STORAGE_KEY_THEME);
    if (stored === 'light' || stored === 'dark') return stored;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
    return 'dark';
  }

  /* ========================
     I18N DICTIONARY
     Keys aligned 1:1 with all data-i18n attributes in index.html.
     ======================== */
  const TRANSLATIONS = {
    pt: {
      htmlLang: 'pt-BR',
      meta: {
        description: 'Marília Mezalheira | Software Engineer focada em Java, TypeScript e SQL.',
        ogTitle:       'Marília Mezalheira | Software Engineer',
        ogDescription: 'Software Engineer • Java, TypeScript, SQL • Grupo Stefanini.',
      },
      nav: {
        // HTML keys used: nav.home / nav.studies / nav.stack / nav.contact
        home:    'Início',
        studies: 'Estudos',
        stack:   'Tecnologias',
        contact: 'Contato',
        // aliases (kept for backwards-compat with earlier keys)
        inicio:    'Início',
        estudos:   'Estudos',
        tecnologias:'Tecnologias',
        contato:   'Contato',
      },
      topbar: {
        langAria:  'Selecionar idioma',
        themeAria: 'Alternar tema claro/escuro',
        themeTitle:'Alternar tema',
      },
      hero: {
        tag:     '> Software Engineer',
        lastname:'Mezalheira',
        status:  'Estagiária de TI',
        statusInternship: 'Aberta a oportunidades Júnior',
        aboutTitle: 'Sobre mim',
        bio: 'Sou Marília Mezalheira, Engenheira de Software focada no desenvolvimento de soluções robustas, escaláveis e alinhadas às melhores práticas de mercado. Tenho experiência com suporte técnico, análise de processos e resolução de bugs, aplicando esse conhecimento para criar arquiteturas eficientes e focadas em performance e qualidade.',
        aboutCard: {
          title:  'Sobre Mim',
          paragraph: [
            'Sou Marília Mezalheira, Engenheira de Software focada no desenvolvimento de soluções robustas, escaláveis e alinhadas às melhores práticas de mercado. Tenho experiência com suporte técnico, análise de processos e resolução de bugs, aplicando esse conhecimento para criar arquiteturas eficientes e focadas em performance e qualidade.',
          ],
          portfolioBtn: 'Ver portfólio completo',
        },
        terminal: {
          placeholder: 'digite "help" para ver os comandos',
        },
      },
      terminal: {
        title:       '~/marilia-mezalheira — terminal: digite "help"',
        placeholder: 'digite "help" para ver os comandos',
        promptPrefix: 'marilia@portfolio',
        promptCwd:    '~',
        notFound:     function (cmd) { return 'Comando não reconhecido: <span class="yellow">'+ escapeHTML(cmd) +'</span>. Digite <span class="cyan">help</span> para ver os comandos disponíveis.'; },
        helpTitle: 'Comandos disponíveis:',
        help: [
          '<span class="cyan">help</span>     → mostra esta ajuda',
          '<span class="cyan">about</span>    → conheça um pouco sobre mim',
          '<span class="cyan">skills</span>   → linguagens, frameworks e ferramentas',
          '<span class="cyan">status</span>   → minha disponibilidade atual',
          '<span class="cyan">contact</span>  → formas de entrar em contato',
          '<span class="cyan">clear</span>    → limpa o terminal',
        ].join('\n'),
        about: {
          title: '> Sobre mim',
          lines: [
            'Sou Marília Mezalheira, Engenheira de Software focada no desenvolvimento de soluções robustas, escaláveis e alinhadas às melhores práticas de mercado.',
            '',
            'Minha trajetória inclui passagem pelo Grupo Stefanini, uma das maiores empresas de tecnologia do Brasil, onde atuei com suporte técnico, análise de processos e resolução de bugs — experiência que moldou minha mentalidade orientada a soluções e meu respeito pelo usuário final.',
            '',
            'Hoje aplico esse conhecimento na construção de arquiteturas eficientes, focadas em performance e qualidade. Trabalho principalmente com Java, TypeScript e SQL unindo back-end robusto a integrações modernas.',
            '',
            'Stack principal: TypeScript, Java, SQL, Docker e conceitos de Cloud (AWS). Atualmente estagiária de TI, aberta a oportunidades júnior.',
          ].join('\n'),
        },
        skills: {
          title: '> Stack & Ferramentas',
          lines: [
            '<span class="cyan">Stack completa:</span>',
            '  TypeScript, Java, SQL, Docker, AWS,',
            '  Git, GitHub, VS Code, IntelliJ IDEA',
            '',
            '<span class="cyan">Back-end:</span>      Java, SQL',
            '<span class="cyan">Front-end:</span>     TypeScript',
            '<span class="cyan">DevOps & Cloud:</span> Docker, AWS',
            '<span class="cyan">Ferramentas:</span>   Git, GitHub, VS Code, IntelliJ IDEA',
            '<span class="cyan">Idiomas:</span>       Português (nativo), <span class="cyan">Inglês (Intermediário)</span>',
          ].join('\n'),
        },
        status: {
          title: '> Status atual',
          text: [
            '<span class="green">● Estagiária de TI</span> — aberta a oportunidades júnior.',
            '',
            'Atualmente foco meu tempo em duas frentes igualmente importantes:',
            '',
            '<span class="cyan">Crescimento profissional:</span>',
            '  • Aprofundamento em Spring Boot e arquitetura de APIs REST',
            '  • Front-end e integrações com TypeScript',
            '  • Containerização com Docker e conceitos de infraestrutura em nuvem (AWS)',
            '  • Preparação para oportunidades júnior, projetos e colaborações',
            '',
            '<span class="cyan">Crescimento pessoal:</span>',
            '  • Estudos contínuos e cursos complementares',
            '  • Projetos próprios para aplicar o que aprendo na prática',
            '  • Contribuição em comunidades tech e leitura contínua',
            '  • Equilíbrio entre teoria, prática e bem-estar (rotina, exercícios, leitura)',
            '',
            '<span class="dim">Tem uma ideia ou projeto em mente? Vamos conversar! 🚀</span>',
          ].join('\n'),
        },
        contact: {
          title: '> Contato',
          lines: [
            '<span class="cyan">E-mail:</span>   <a href="mailto:mariliagpedrosa@outlook.com" class="term-link">mariliagpedrosa@outlook.com</a>',
            '<span class="cyan">LinkedIn:</span> <a href="https://www.linkedin.com/in/mar%C3%ADlia-mezalheira/" target="_blank" rel="noopener" class="term-link">linkedin.com/in/marília-mezalheira</a>',
            '<span class="cyan">GitHub:</span>   <a href="https://github.com/mariliamezalheiradev" target="_blank" rel="noopener" class="term-link">github.com/mariliamezalheiradev</a>',
          ].join('\n'),
        },
      },
      sections: {
        estudosTitle:  'Aprofundando Atualmente',
        estudosLabel:  '/ ESTUDOS',
        stackTitle:    'Stack & Tecnologias',
        stackLabel:    '/ STACK',
        contatoTitle:  'Vamos Conversar',
        contatoLabel:  '/ CONTATO',
        contatoLead:   'Estou aberta a oportunidades júnior, projetos e colaborações. Entre em contato pelo canal de sua preferência:',
      },
      // HTML uses studies.label / studies.titleA / studies.titleB / studies.s1.title / studies.s1.desc ...
      studies: {
        label:  'EM APROFUNDAMENTO',
        titleA: 'Aprofundando',
        titleB: 'agora',
        items: [
          { num: '01', nome: 'Spring Boot', desc: 'Desenvolvimento back-end com Java, APIs REST e microsserviços.' },
          { num: '02', nome: 'TypeScript',  desc: 'JavaScript fortemente tipado para aplicações escaláveis no front e no back-end.' },
          { num: '03', nome: 'Docker',      desc: 'Containerização de aplicações para desenvolvimento e deploy consistentes.' },
          { num: '04', nome: 'AWS',         desc: 'Infraestrutura em nuvem, deploy e escalabilidade de aplicações.' },
        ],
        // HTML uses s1/s2/s3/s4 (4 cards numbered)
        s1: { title: 'Spring Boot', desc: 'Desenvolvimento back-end com Java, APIs REST e microsserviços.' },
        s2: { title: 'TypeScript',  desc: 'JavaScript fortemente tipado para aplicações escaláveis no front e no back-end.' },
        s3: { title: 'Docker',      desc: 'Containerização de aplicações para desenvolvimento e deploy consistentes.' },
        s4: { title: 'AWS',         desc: 'Infraestrutura em nuvem, deploy e escalabilidade de aplicações.' },
      },
      stack: {
        // HTML uses stack.label / stack.titleA / stack.titleB
        label:  'TECNOLOGIAS',
        titleA: 'Tecnologias e',
        titleB: 'Ferramentas',
        typescript: { name: 'TypeScript', desc: 'Superset tipado do JavaScript para aplicações escaláveis.' },
        java: { name: 'Java', desc: 'Linguagem principal para desenvolvimento back-end orientado a objetos.' },
        spring: { name: 'Spring Boot', desc: 'Framework Java para APIs REST e microsserviços.' },
        mysql: { name: 'MySQL', desc: 'Modelagem e consultas em banco de dados relacional.' },
        docker: { name: 'Docker', desc: 'Containerização de aplicações para ambientes consistentes.' },
        aws: { name: 'AWS', desc: 'Conceitos de infraestrutura e deploy em nuvem.' },
        github: { name: 'GitHub', desc: 'Hospedagem de repositórios e colaboração em projetos.' },
        git: { name: 'Git', desc: 'Versionamento de código e controle de mudanças.' },
        vscode: { name: 'VS Code', desc: 'Editor principal para desenvolvimento e organização de projetos.' },
        intellij: { name: 'IntelliJ IDEA', desc: 'IDE principal para desenvolvimento em Java.' },
      },
      contact: {
        // HTML uses contact.label / contact.titleA / contact.titleB / contact.text / contact.email / contact.linkedin / contact.github / contact.instagram
        label:     'CONTATO',
        titleA:    'Vamos',
        titleB:    'conversar?',
        text:      'Estou aberta a oportunidades júnior, projetos e colaborações. Fique à vontade para entrar em contato.',
        email:     'Enviar e-mail',
        linkedin:  'LinkedIn',
        github:    'GitHub',
        instagram: 'Instagram',
      },
      footer: {
        // HTML uses footer.made / footer.copy
        made: 'Feito com 💙 por',
        copy: '© 2026 · Todos os direitos reservados',
        // aliases kept for JS-internal use
        full: 'Feito com 💙 por <strong>Marília Mezalheira</strong>',
        sub:  '© 2026 • Software Engineer',
      },
      scroll: {
        topTitle: 'Voltar ao topo',
      },
    },
    en: {
      htmlLang: 'en',
      meta: {
        description: 'Marília Mezalheira | Software Engineer focused on Java, TypeScript and SQL.',
        ogTitle:       'Marília Mezalheira | Software Engineer',
        ogDescription: 'Software Engineer • Java, TypeScript, SQL • Grupo Stefanini.',
      },
      nav: {
        home:    'Home',
        studies: 'Studies',
        stack:   'Tech',
        contact: 'Contact',
        inicio:    'Home',
        estudos:   'Studies',
        tecnologias:'Tech',
        contato:   'Contact',
      },
      topbar: {
        langAria:  'Select language',
        themeAria: 'Toggle light/dark theme',
        themeTitle:'Toggle theme',
      },
      hero: {
        tag:     '> Software Engineer',
        lastname:'Mezalheira',
        status:  'IT Intern',
        statusInternship: 'Open to Junior opportunities',
        aboutTitle: 'About me',
        bio: 'I am Marília Mezalheira, a Software Engineer focused on robust, scalable solutions. Experienced in technical support, process analysis, and bug resolution, applying this knowledge to create efficient architectures focused on performance and quality.',
        aboutCard: {
          title:  'About Me',
          paragraph: [
            'I am Marília Mezalheira, a Software Engineer focused on robust, scalable solutions. Experienced in technical support, process analysis, and bug resolution, applying this knowledge to create efficient architectures focused on performance and quality.',
          ],
          portfolioBtn: 'View full portfolio',
        },
        terminal: {
          placeholder: 'type "help" to see commands',
        },
      },
      terminal: {
        title:       '~/marilia-mezalheira — terminal: type "help"',
        placeholder: 'type "help" to see commands',
        promptPrefix: 'marilia@portfolio',
        promptCwd:    '~',
        notFound:     function (cmd) { return 'Command not recognized: <span class="yellow">'+ escapeHTML(cmd) +'</span>. Type <span class="cyan">help</span> to see available commands.'; },
        helpTitle: 'Available commands:',
        help: [
          '<span class="cyan">help</span>     → show this help',
          '<span class="cyan">about</span>    → learn a bit about me',
          '<span class="cyan">skills</span>   → languages, frameworks and tools',
          '<span class="cyan">status</span>   → my current availability',
          '<span class="cyan">contact</span>  → ways to reach me',
          '<span class="cyan">clear</span>    → clear the terminal',
        ].join('\n'),
        about: {
          title: '> About Me',
          lines: [
            'I am Marília Mezalheira, a Software Engineer focused on building robust, scalable solutions aligned with market best practices.',
            '',
            'My professional path includes time at Grupo Stefanini, one of the largest technology companies in Brazil, where I worked in technical support, process analysis, and bug resolution — experience that shaped a solution-oriented mindset and a deep respect for the end user.',
            '',
            'Today I apply that knowledge to building efficient architectures focused on performance and quality. I work mainly with Java, Spring Boot and TypeScript, pairing a solid back-end with modern integrations.',
            '',
            'Main stack: TypeScript, Java, SQL, Docker and Cloud concepts (AWS). Currently an IT Intern, open to Junior opportunities.',
          ].join('\n'),
        },
        skills: {
          title: '> Stack & Tools',
          lines: [
            '<span class="cyan">Full stack:</span>',
            '  TypeScript, Java, SQL, Docker, AWS,',
            '  Git, GitHub, VS Code, IntelliJ IDEA',
            '',
            '<span class="cyan">Back-end:</span>     Java, SQL',
            '<span class="cyan">Front-end:</span>    TypeScript',
            '<span class="cyan">DevOps & Cloud:</span> Docker, AWS',
            '<span class="cyan">Tools:</span>        Git, GitHub, VS Code, IntelliJ IDEA',
            '<span class="cyan">Languages:</span>    Portuguese (native), <span class="cyan">English (Intermediate)</span>',
          ].join('\n'),
        },
        status: {
          title: '> Current status',
          text: [
            '<span class="green">● IT Intern</span> — open to Junior opportunities.',
            '',
            'I currently focus my time on two equally important fronts:',
            '',
            '<span class="cyan">Professional growth:</span>',
            '  • Deepening knowledge in Spring Boot and REST API architecture',
            '  • Front-end and integrations with TypeScript',
            '  • Containerization with Docker and cloud infrastructure concepts (AWS)',
            '  • Preparing for Junior opportunities, projects and collaborations',
            '',
            '<span class="cyan">Personal growth:</span>',
            '  • Ongoing studies and complementary courses',
            '  • Personal projects to apply what I learn in practice',
            '  • Contributing to tech communities and continuous reading',
            '  • Balance between theory, practice and well-being (routine, exercise, reading)',
            '',
            '<span class="dim">Got an idea or project in mind? Let\'s talk! 🚀</span>',
          ].join('\n'),
        },
        contact: {
          title: '> Contact',
          lines: [
            '<span class="cyan">E-mail:</span>   <a href="mailto:mariliagpedrosa@outlook.com" class="term-link">mariliagpedrosa@outlook.com</a>',
            '<span class="cyan">LinkedIn:</span> <a href="https://www.linkedin.com/in/mar%C3%ADlia-mezalheira/" target="_blank" rel="noopener" class="term-link">linkedin.com/in/marília-mezalheira</a>',
            '<span class="cyan">GitHub:</span>   <a href="https://github.com/mariliamezalheiradev" target="_blank" rel="noopener" class="term-link">github.com/mariliamezalheiradev</a>',
          ].join('\n'),
        },
      },
      sections: {
        estudosTitle:  'Currently Specializing In',
        estudosLabel:  '/ STUDIES',
        stackTitle:    'Stack & Technologies',
        stackLabel:    '/ STACK',
        contatoTitle:  'Let\'s Talk',
        contatoLabel:  '/ CONTACT',
        contatoLead:   'I\'m open to Junior opportunities, projects, and collaborations. Reach out through any channel:',
      },
      studies: {
        label:  'DEEPENING',
        titleA: 'Deepening',
        titleB: 'now',
        items: [
          { num: '01', nome: 'Spring Boot', desc: 'Back-end development with Java, REST APIs, and microservices.' },
          { num: '02', nome: 'TypeScript',  desc: 'Strongly typed JavaScript for scalable front-end and back-end applications.' },
          { num: '03', nome: 'Docker',      desc: 'Containerization of applications for consistent development and deployment.' },
          { num: '04', nome: 'AWS',         desc: 'Cloud infrastructure, deployment, and scaling of applications.' },
        ],
        s1: { title: 'Spring Boot', desc: 'Back-end development with Java, REST APIs, and microservices.' },
        s2: { title: 'TypeScript',  desc: 'Strongly typed JavaScript for scalable front-end and back-end applications.' },
        s3: { title: 'Docker',      desc: 'Containerization of applications for consistent development and deployment.' },
        s4: { title: 'AWS',         desc: 'Cloud infrastructure, deployment, and scaling of applications.' },
      },
      stack: {
        label:  'TECHNOLOGIES',
        titleA: 'Technologies and',
        titleB: 'Tools',
        typescript: { name: 'TypeScript', desc: 'Typed superset of JavaScript for scalable applications.' },
        java: { name: 'Java', desc: 'Main language for object-oriented back-end development.' },
        spring: { name: 'Spring Boot', desc: 'Java framework for REST APIs and microservices.' },
        mysql: { name: 'MySQL', desc: 'Relational database modeling and querying.' },
        docker: { name: 'Docker', desc: 'Containerization of applications for consistent environments.' },
        aws: { name: 'AWS', desc: 'Cloud infrastructure and deployment concepts.' },
        github: { name: 'GitHub', desc: 'Repository hosting and project collaboration.' },
        git: { name: 'Git', desc: 'Code versioning and change control.' },
        vscode: { name: 'VS Code', desc: 'Main editor for development and project organization.' },
        intellij: { name: 'IntelliJ IDEA', desc: 'Main IDE for Java development.' },
      },
      contact: {
        label:     'CONTACT',
        titleA:    'Let\'s',
        titleB:    'talk?',
        text:      'I am open to Junior opportunities, projects, and collaborations. Feel free to reach out.',
        email:     'Send e-mail',
        linkedin:  'LinkedIn',
        github:    'GitHub',
        instagram: 'Instagram',
      },
      footer: {
        made: 'Made with 💙 by',
        copy: '© 2026 · All rights reserved',
        full: 'Made with 💙 by <strong>Marília Mezalheira</strong>',
        sub:  '© 2026 • Software Engineer',
      },
      scroll: {
        topTitle: 'Back to top',
      },
    },
  };

  let currentLang = detectInitialLang();
  let currentTheme = detectInitialTheme();

  /* ========================
     THEME
     ======================== */
  function applyTheme(theme) {
    currentTheme = theme === 'light' ? 'light' : 'dark';
    document.body.classList.remove('theme-dark', 'theme-light');
    document.body.classList.add('theme-' + currentTheme);
    document.documentElement.setAttribute('data-theme', currentTheme);

    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) themeBtn.setAttribute('aria-pressed', currentTheme === 'light' ? 'true' : 'false');

    try { localStorage.setItem(STORAGE_KEY_THEME, currentTheme); } catch (e) { /* noop */ }
  }

  function toggleTheme() {
    applyTheme(currentTheme === 'light' ? 'dark' : 'light');
  }

  /* ========================
     LANGUAGE
     ======================== */
  function dict() {
    return TRANSLATIONS[currentLang] || TRANSLATIONS.pt;
  }

  function resolveKey(d, dottedKey) {
    const parts = dottedKey.split('.');
    let value = d;
    for (let i = 0; i < parts.length; i++) {
      if (value == null) return undefined;
      value = value[parts[i]];
    }
    return value;
  }

  function applyLang(lang) {
    currentLang = (lang === 'en') ? 'en' : 'pt';
    const d = dict();

    document.documentElement.setAttribute('lang', d.htmlLang);

    // Meta description + Open Graph
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', d.meta.description);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', d.meta.ogTitle);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', d.meta.ogDescription);
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', d.meta.ogTitle);
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', d.meta.ogDescription);

    // Translate any element with data-i18n (key may be dotted)
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      const value = resolveKey(d, key);
      if (typeof value === 'string') el.innerHTML = value;
    });

    // Translate any element with data-i18n-attr (e.g. "aria-label:terminal.placeholder")
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      const spec = el.getAttribute('data-i18n-attr');
      spec.split(';').forEach(function (pair) {
        const tokens = pair.split(':');
        const k = tokens[0] && tokens[0].trim();
        const v = tokens[1] && tokens[1].trim();
        if (k && v) {
          const value = resolveKey(d, v);
          if (typeof value === 'string') el.setAttribute(k, value);
        }
      });
    });

    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) langBtn.setAttribute('aria-pressed', currentLang === 'en' ? 'true' : 'false');

    document.querySelectorAll('.topbar-toggle-opt').forEach(function (el) {
      const opt = el.getAttribute('data-lang-opt');
      el.classList.toggle('is-active', opt === currentLang);
    });

    try { localStorage.setItem(STORAGE_KEY_LANG, currentLang); } catch (e) { /* noop */ }

    if (typeof window.rebuildTerminalCommands === 'function') window.rebuildTerminalCommands();

    const input = document.getElementById('terminal-input');
    if (input) input.setAttribute('placeholder', d.terminal.placeholder);
  }

  function toggleLang() {
    applyLang(currentLang === 'pt' ? 'en' : 'pt');
  }

  /* ========================
     CUSTOM CURSOR
     ======================== */
  function canUseHoverCursor() {
    // Primary: media query (hover: hover) — true on devices with a real mouse.
    if (window.matchMedia && window.matchMedia('(hover: hover)').matches) return true;
    // Secondary: explicit pointer:fine.
    if (window.matchMedia && window.matchMedia('(pointer: fine)').matches) return true;
    return false;
  }

  function initCustomCursor() {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    if (!cursor || !follower) return;

    // Task 2.4: touch detection — only block the cursor when the device is
    // truly touch-only. Touch-capable laptops/tablets with a mouse still get
    // the cursor. (hover: hover) is the canonical CSS signal for "real mouse".
    let mouseCapable =
      (window.matchMedia && window.matchMedia('(hover: hover)').matches) ||
      (window.matchMedia && window.matchMedia('(pointer: fine)').matches);

    // Hard fallback: if a mousemove ever fires, this device has a mouse
    // regardless of what the touch heuristics said.
    let mouseSeen = false;
    const onFirstMouse = function () {
      mouseSeen = true;
      mouseCapable = true;
    };
    document.addEventListener('mousemove', onFirstMouse, { once: true, passive: true });

    if (!mouseCapable && !mouseSeen) {
      // Truly touch-only device — hide both cursor elements.
      cursor.style.display = 'none';
      follower.style.display = 'none';
      document.body.style.cursor = 'auto';
      return;
    }

    // Task 2.2: start at -1000 so the dot is not visible at (0, 0) before
    // the first mousemove. The CSS initial top:-100px / left:-100px is the
    // belt; these JS values are the suspenders.
    let mouseX = -1000;
    let mouseY = -1000;
    let followerX = -1000;
    let followerY = -1000;
    let firstMove = false;

    // Task 2.1: do NOT touch cursor.style.transform or follower.style.transform
    // in JS — the CSS owns it (translate(-50%, -50%) for centering).
    // Only set left/top to keep coordinates aligned with the mouse.
    cursor.style.left = '-100px';
    cursor.style.top  = '-100px';
    follower.style.left = '-100px';
    follower.style.top  = '-100px';

    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Task 2.3: apply left/top directly to both elements. No transform
      // writes here — CSS transform stays "translate(-50%, -50%)" forever.
      cursor.style.left = mouseX + 'px';
      cursor.style.top  = mouseY + 'px';
      follower.style.left = mouseX + 'px';
      follower.style.top  = mouseY + 'px';

      if (!firstMove) {
        firstMove = true;
        // Belt-and-suspenders: kill the native cursor if the CSS hasn't done it.
        document.body.style.cursor = 'none';
      }
    });

    document.addEventListener('mouseleave', function () {
      // Soft fallback if the mouse leaves the window: stop chasing.
      mouseX = followerX;
      mouseY = followerY;
    });

    // Task 2.5: animateCursor only writes left/top to the follower.
    // No transform writes — CSS keeps translate(-50%, -50%) fixed.
    function animateCursor() {
      followerX += (mouseX - followerX) * 0.2;
      followerY += (mouseY - followerY) * 0.2;
      follower.style.left = followerX + 'px';
      follower.style.top  = followerY + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    const hoverSel = 'a, button, .topbar-toggle, .menu-fixo a, .link-btn, .stack-item, .estudo-card, input';
    document.querySelectorAll(hoverSel).forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        cursor.classList.add('hover');
        follower.classList.add('hover');
      });
      el.addEventListener('mouseleave', function () {
        cursor.classList.remove('hover');
        follower.classList.remove('hover');
      });
    });
  }

  /* ========================
     PARTICLES.JS
     ======================== */
  function initParticles() {
    if (typeof particlesJS !== 'function') return;
    if (!document.getElementById('particles-js')) return;

    const isLight = document.body.classList.contains('theme-light');
    const particleColor = isLight ? '#0b3d91' : '#3d6fd6';
    const lineColor     = isLight ? '#0b3d91' : '#3d6fd6';

    particlesJS('particles-js', {
      particles: {
        number: { value: 60, density: { enable: true, value_area: 900 } },
        color:  { value: particleColor },
        shape:  { type: 'circle' },
        opacity: {
          value: 0.55, random: true,
          anim: { enable: true, speed: 1, opacity_min: 0.15, sync: false },
        },
        size:   { value: 3, random: true, anim: { enable: false } },
        line_linked: {
          enable: true,
          distance: 140,
          color: lineColor,
          opacity: 0.25,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1.4,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false,
        },
      },
      interactivity: {
        detect_on: 'window',
        events: {
          onhover: { enable: true, mode: 'grab' },
          onclick: { enable: false },
          resize: true,
        },
        modes: {
          grab: { distance: 180, line_linked: { opacity: 0.45 } },
        },
      },
      retina_detect: true,
    });
  }

  /* ========================
     GSAP / SCROLLTRIGGER
     ======================== */
  function initGSAP() {
    if (typeof gsap === 'undefined') return;
    if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);

    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const cardSelectors = ['.estudo-card', '.stack-item'];
    cardSelectors.forEach(function (sel) {
      gsap.utils.toArray(sel).forEach(function (el, i) {
        gsap.from(el, {
          opacity: 0,
          y: 50,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
          delay: (i % 6) * 0.08,
        });
      });
    });

    if (typeof ScrollTrigger !== 'undefined') {
      gsap.to('.orb-1', {
        y: 60, x: 30, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to('.orb-2', {
        y: -50, x: -40, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to('.orb-3', {
        y: 80, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      });
    }
  }

  /* ========================
     TERMINAL
     ======================== */
  let terminalState = { commands: {}, history: [] };

  function termAppend(html) {
    const out = document.getElementById('terminal-output');
    if (!out) return;
    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.innerHTML = html;
    out.appendChild(line);
    out.scrollTop = out.scrollHeight;
  }

  function termAppendRaw(html) { termAppend(html); }

  function echoPrompt(cmd) {
    const d = dict();
    termAppend(
      '<span class="prompt-symbol">'+ escapeHTML(d.terminal.promptPrefix) +'</span>' +
      '<span class="dim">:'+ escapeHTML(d.terminal.promptCwd) +'$</span> ' +
      escapeHTML(cmd)
    );
  }

  function rebuildTerminalCommands() {
    const d = dict();

    function printBlock(title, lines) {
      termAppend('<span class="title">'+ escapeHTML(title) +'</span>');
      if (Array.isArray(lines)) {
        lines.forEach(function (l) { termAppendRaw(l); });
      } else if (typeof lines === 'string') {
        lines.split('\n').forEach(function (l) { termAppendRaw(l); });
      }
    }

    terminalState.commands = {
      help: function () {
        termAppend('<span class="title">'+ escapeHTML(d.terminal.helpTitle) +'</span>');
        d.terminal.help.split('\n').forEach(function (l) { termAppendRaw(l); });
      },
      about: function () {
        // Defensive: d.terminal.about may be an object {title, lines} (current shape)
        // or a plain string (legacy shape). printBlock() already handles both.
        const a = d.terminal.about;
        if (a && typeof a === 'object') {
          printBlock(a.title, a.lines);
        } else if (typeof a === 'string') {
          termAppendRaw(a);
        } else {
          termAppendRaw('<span class="dim">(about: conteúdo indisponível)</span>');
        }
      },
      skills: function () {
        printBlock(d.terminal.skills.title, d.terminal.skills.lines);
      },
      status: function () {
        printBlock(d.terminal.status.title, d.terminal.status.text);
      },
      contact: function () {
        printBlock(d.terminal.contact.title, d.terminal.contact.lines);
      },
      clear: function () {
        const out = document.getElementById('terminal-output');
        if (out) out.innerHTML = '';
      },
    };

    window.rebuildTerminalCommands = function () {
      rebuildTerminalCommands();
    };
  }

  function initTerminal() {
    const input  = document.getElementById('terminal-input');
    const out    = document.getElementById('terminal-output');
    if (!input || !out) return;

    const d = dict();
    input.setAttribute('placeholder', d.terminal.placeholder);

    rebuildTerminalCommands();

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        const raw = input.value.trim();
        if (!raw) return;
        echoPrompt(raw);
        terminalState.history.push(raw);

        const cmd = raw.toLowerCase().split(/\s+/)[0];
        const handler = terminalState.commands[cmd];
        if (handler) {
          try { handler(); } catch (err) { /* noop */ }
        } else {
          termAppendRaw(dict().terminal.notFound(raw));
        }
        input.value = '';
      } else if (e.key === 'ArrowUp') {
        if (terminalState.history.length > 0) {
          input.value = terminalState.history[terminalState.history.length - 1];
          e.preventDefault();
        }
      } else if (e.key === 'l' && (e.ctrlKey || e.metaKey)) {
        if (terminalState.commands.clear) terminalState.commands.clear();
        e.preventDefault();
      }
    });

    const wrapper = input.closest('.terminal-wrapper');
    if (wrapper) {
      wrapper.addEventListener('click', function (e) {
        if (e.target.closest('a')) return;
        input.focus();
      });
    }
  }

  /* ========================
     IMAGE FALLBACKS (data-retry pattern)
     ======================== */
  function initImageFallbacks() {
    document.querySelectorAll('img[data-fallback-src]').forEach(function (img) {
      img.addEventListener('error', function handle() {
        const fallback = img.getAttribute('data-fallback-src');
        if (fallback && !img.hasAttribute('data-retry')) {
          img.setAttribute('data-retry', 'true');
          img.src = fallback;
        } else {
          img.style.display = 'none';
          const ph = img.nextElementSibling;
          if (ph && ph.classList.contains('media-placeholder')) {
            ph.style.display = 'flex';
          }
        }
      }, { once: false });
    });
  }

  /* ========================
     INTERSECTION OBSERVER (reveal fallback)
     ======================== */
  function initRevealObserver() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal, .stack-item, .estudo-card, .section-label, .section-title')
        .forEach(function (el) { el.classList.add('visible'); });
      return;
    }

    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

    document.querySelectorAll('.reveal, .stack-item, .estudo-card, .section-label, .section-title')
      .forEach(function (el) { io.observe(el); });
  }

  /* ========================
     TOPBAR SCROLLED STATE
     ======================== */
  function initTopbarScroll() {
    const topbar = document.querySelector('.topbar');
    if (!topbar) return;
    function onScroll() {
      if (window.scrollY > 40) topbar.classList.add('is-scrolled');
      else topbar.classList.remove('is-scrolled');
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ========================
     TOGGLES (idioma + tema)
     ======================== */
  function initToggles() {
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
      langBtn.addEventListener('click', toggleLang);
    }

    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', toggleTheme);
    }

    document.querySelectorAll('.topbar-toggle-opt').forEach(function (opt) {
      opt.addEventListener('click', function (e) {
        e.stopPropagation();
        applyLang(opt.getAttribute('data-lang-opt'));
      });
    });
  }

  /* ========================
     BOOTSTRAP
     ======================== */
  function bootstrap() {
    applyTheme(currentTheme);
    applyLang(currentLang);

    initCustomCursor();
    initTopbarScroll();
    initToggles();
    initParticles();
    initGSAP();
    initTerminal();
    initImageFallbacks();
    initRevealObserver();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
  } else {
    bootstrap();
  }
})();
