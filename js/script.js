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
        description: 'Marília Mezalheira | Desenvolvedora Full Stack em formação, apaixonada por criar experiências digitais modernas.',
        ogTitle:       'Marília Mezalheira | Dev Full Stack',
        ogDescription: 'Desenvolvedora Full Stack em formação • Estudante de TADS (UNINOVE) • HTML, CSS, JavaScript, React, Java.',
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
        tag:     '> Desenvolvedora Full Stack',
        lastname:'Mezalheira',
        status:  'Aberta a oportunidades',
        statusInternship: 'Estágio',
        aboutTitle: 'Sobre mim',
        bio: 'Sou Marília Mezalheira, estudante de Análise e Desenvolvimento de Sistemas na UNINOVE, em transição de carreira do suporte técnico para o Desenvolvimento Full Stack. Busco unir minha experiência com usuários à criação de interfaces funcionais e bem projetadas.',
        aboutCard: {
          title:  'Sobre Mim',
          paragraph: [
            'Sou Marília Mezalheira, estudante de Análise e Desenvolvimento de Sistemas na UNINOVE, em transição de carreira do suporte técnico para o Desenvolvimento Full Stack. Busco unir minha experiência com usuários à criação de interfaces funcionais e bem projetadas.',
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
            'Sou Marília Mezalheira, atualmente estudante de Análise e Desenvolvimento de Sistemas (TADS) na UNINOVE. Estou em transição de carreira, vindo da área de suporte técnico — onde atuei diretamente com usuários, análise de processos e resolução de bugs — para o desenvolvimento Full Stack, área na qual encontrei meu verdadeiro propósito profissional.',
            '',
            'Minha trajetória profissional inclui passagem pelo Grupo Stefanini, uma das maiores empresas de tecnologia do Brasil, onde trabalhei com suporte técnico e operações de TI. Essa experiência foi fundamental para desenvolver uma mentalidade orientada a soluções, foco em resultados e respeito pelo usuário final.',
            '',
            'Também atuei na AGF, em ambiente corporativo internacional, e busquei formação complementar em instituições como a ADA e em projetos internos, complementando a grade curricular da faculdade com cursos livres de programação, lógica e desenvolvimento web. Na faculdade e na vida profissional, aprendi a integrar sistemas, lidar com a Intranet corporativa, versionar código em Git, documentar processos e colaborar em times multidisciplinares.',
            '',
            'Hoje, foco em desenvolvimento Full Stack com ênfase em UI/UX moderno — unindo a experiência de bastidores em suporte/infra com a paixão por construir interfaces claras, acessíveis e funcionais. Stack principal: HTML5, CSS3, JavaScript (ES6+), Next.js, Tailwind CSS no front; Java e Python no back. Atualmente disponível para estágio ou posição júnior em desenvolvimento.',
          ].join('\n'),
        },
        skills: {
          title: '> Stack & Ferramentas',
          lines: [
            '<span class="cyan">Stack completa:</span>',
            '  HTML5, CSS3, JavaScript, TypeScript, React, Next.js, Tailwind CSS,',
            '  Java, Python, Git, GitHub, VS Code, IntelliJ IDEA',
            '',
            '<span class="cyan">Front-end:</span>     React, Next.js, Tailwind CSS',
            '<span class="cyan">Back-end:</span>      Java, Python',
            '<span class="cyan">Ferramentas:</span>   Git, GitHub, VS Code, IntelliJ IDEA',
            '<span class="cyan">Idiomas:</span>       Português (nativo), <span class="cyan">Inglês (Intermediário)</span>',
          ].join('\n'),
        },
        status: {
          title: '> Status atual',
          text: [
            '<span class="green">● Disponível</span> para novos projetos, oportunidades e colaborações.',
            '',
            'Atualmente foco meu tempo em duas frentes igualmente importantes:',
            '',
            '<span class="cyan">Crescimento profissional:</span>',
            '  • Aprofundamento em React, Next.js e TypeScript no front-end moderno',
            '  • Back-end com Java (POO, APIs REST) e Python (automação, scripts)',
            '  • Boas práticas de UI/UX, acessibilidade (a11y) e performance web',
            '  • Preparação para oportunidades Full Stack (estágio, trainee ou júnior)',
            '',
            '<span class="cyan">Crescimento pessoal:</span>',
            '  • Estudos regulares na UNINOVE (TADS) + cursos complementares',
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
        estudosTitle:  'Atualmente Estudando',
        estudosLabel:  '/ ESTUDOS',
        stackTitle:    'Stack & Tecnologias',
        stackLabel:    '/ STACK',
        contatoTitle:  'Vamos Conversar',
        contatoLabel:  '/ CONTATO',
        contatoLead:   'Estou aberta a oportunidades, parcerias e conversas sobre tecnologia. Entre em contato pelo canal de sua preferência:',
      },
      // HTML uses studies.label / studies.titleA / studies.titleB / studies.s1.title / studies.s1.desc ...
      studies: {
        label:  'EM APRENDIZADO',
        titleA: 'Estudando',
        titleB: 'agora',
        items: [
          { num: '01', nome: 'Java & Python',          desc: 'Fundamentos de orientação a objetos e lógica de programação back-end com Java e Python.' },
          { num: '02', nome: 'JavaScript & TypeScript', desc: 'Manipulação do DOM, lógica avançada e tipagem estática para projetos robustos.' },
          { num: '03', nome: 'React & Next.js',         desc: 'Criação de SPAs modernas, componentes reutilizáveis, SSR e roteamento avançado.' },
          { num: '04', nome: 'Tailwind CSS',            desc: 'Estilização rápida e utilitária, layouts responsivos e design system moderno.' },
        ],
        // HTML uses s1/s2/s3/s4 (4 cards numbered)
        s1: { title: 'Java & Python',          desc: 'Fundamentos de orientação a objetos e lógica de programação back-end com Java e Python.' },
        s2: { title: 'JavaScript & TypeScript', desc: 'Manipulação do DOM, lógica avançada e tipagem estática para projetos robustos.' },
        s3: { title: 'React & Next.js',         desc: 'Criação de SPAs modernas, componentes reutilizáveis, SSR e roteamento avançado.' },
        s4: { title: 'Tailwind CSS',            desc: 'Estilização rápida e utilitária, layouts responsivos e design system moderno.' },
      },
      stack: {
        // HTML uses stack.label / stack.titleA / stack.titleB
        label:  'TECNOLOGIAS',
        titleA: 'Tecnologias e',
        titleB: 'Ferramentas',
        html5: { name: 'HTML5', desc: 'Estruturação semântica de páginas e interfaces web modernas.' },
        css3: { name: 'CSS3', desc: 'Estilização, animações, responsividade e layouts com Flexbox e Grid.' },
        javascript: { name: 'JavaScript', desc: 'Lógica de programação, manipulação do DOM e interatividade.' },
        typescript: { name: 'TypeScript', desc: 'Superset tipado do JavaScript para aplicações escaláveis.' },
        react: { name: 'React', desc: 'Biblioteca para construção de interfaces de usuário reativas.' },
        nextjs: { name: 'Next.js', desc: 'Framework React com SSR, SSG e roteamento para produção.' },
        tailwind: { name: 'Tailwind CSS', desc: 'Framework CSS utilitário para designs rápidos e responsivos.' },
        python: { name: 'Python', desc: 'Linguagem versátil para back-end, automação e ciência de dados.' },
        java: { name: 'Java', desc: 'Desenvolvimento back-end em formação, orientação a objetos.' },
        github: { name: 'Git & GitHub', desc: 'Versionamento de código e colaboração em repositórios.' },
        vscode: { name: 'VS Code', desc: 'Editor principal para desenvolvimento front-end e organização.' },
        intellij: { name: 'IntelliJ IDEA', desc: 'IDE utilizada para estudos e desenvolvimento em Java.' }
      },
      contact: {
        // HTML uses contact.label / contact.titleA / contact.titleB / contact.text / contact.email / contact.linkedin / contact.github / contact.instagram
        label:     'CONTATO',
        titleA:    'Vamos',
        titleB:    'conversar?',
        text:      'Estou aberta a oportunidades de estágio, conexões na área de tecnologia, projetos e novos aprendizados. Se quiser conversar comigo, escolha uma das opções abaixo.',
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
        sub:  '© 2026 • Desenvolvedora Full Stack em formação',
      },
      scroll: {
        topTitle: 'Voltar ao topo',
      },
    },
    en: {
      htmlLang: 'en',
      meta: {
        description: 'Marília Mezalheira | Full Stack Developer in training, passionate about building modern digital experiences.',
        ogTitle:       'Marília Mezalheira | Full Stack Dev',
        ogDescription: 'Full Stack Developer in training • TADS student (UNINOVE) • HTML, CSS, JavaScript, React, Java.',
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
        tag:     '> Full Stack Developer',
        lastname:'Mezalheira',
        status:  'Open to opportunities',
        statusInternship: 'Internship',
        aboutTitle: 'About me',
        bio: 'I am Marília Mezalheira, a Systems Analysis and Development student at UNINOVE, transitioning my career from technical support to Full Stack Development. I aim to combine my user-facing experience with the creation of functional and well-designed interfaces.',
        aboutCard: {
          title:  'About Me',
          paragraph: [
            'I am Marília Mezalheira, a Systems Analysis and Development student at UNINOVE, transitioning my career from technical support to Full Stack Development. I aim to combine my user-facing experience with the creation of functional and well-designed interfaces.',
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
            'I am Marília Mezalheira, currently a Systems Analysis and Development (TADS) student at UNINOVE. I am transitioning my career from technical support — where I worked directly with end users, process analysis, and bug resolution — into Full Stack development, the area where I found my true professional purpose.',
            '',
            'My professional path includes time at Grupo Stefanini, one of the largest technology companies in Brazil, where I worked in technical support and IT operations. That experience was fundamental in shaping a solution-oriented mindset, a results-driven focus, and a deep respect for the end user.',
            '',
            'I also worked at AGF in an international corporate environment, and pursued complementary training at institutions such as ADA and through internal projects, supplementing my college curriculum with free programming, logic, and web development courses. Throughout college and my professional life, I learned to integrate systems, work with corporate intranets, version code in Git, document processes, and collaborate in multidisciplinary teams.',
            '',
            'Today, I focus on Full Stack development with an emphasis on modern UI/UX — combining my background in support and infrastructure with a passion for building clear, accessible, and functional interfaces. Main stack: HTML5, CSS3, JavaScript (ES6+), Next.js, and Tailwind CSS on the front-end; Java and Python on the back-end. Currently open to internship or junior developer positions.',
          ].join('\n'),
        },
        skills: {
          title: '> Stack & Tools',
          lines: [
            '<span class="cyan">Full stack:</span>',
            '  HTML5, CSS3, JavaScript, TypeScript, React, Next.js, Tailwind CSS,',
            '  Java, Python, Git, GitHub, VS Code, IntelliJ IDEA',
            '',
            '<span class="cyan">Front-end:</span>    React, Next.js, Tailwind CSS',
            '<span class="cyan">Back-end:</span>     Java, Python',
            '<span class="cyan">Tools:</span>        Git, GitHub, VS Code, IntelliJ IDEA',
            '<span class="cyan">Languages:</span>    Portuguese (native), <span class="cyan">English (Intermediate)</span>',
          ].join('\n'),
        },
        status: {
          title: '> Current status',
          text: [
            '<span class="green">● Available</span> for new projects, opportunities and collaborations.',
            '',
            'I currently focus my time on two equally important fronts:',
            '',
            '<span class="cyan">Professional growth:</span>',
            '  • Deepening knowledge in React, Next.js and TypeScript on the modern front-end',
            '  • Back-end with Java (OOP, REST APIs) and Python (automation, scripts)',
            '  • UI/UX best practices, accessibility (a11y) and web performance',
            '  • Preparing for Full Stack opportunities (internship, trainee or junior)',
            '',
            '<span class="cyan">Personal growth:</span>',
            '  • Regular studies at UNINOVE (TADS) + complementary courses',
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
        estudosTitle:  'Currently Studying',
        estudosLabel:  '/ STUDIES',
        stackTitle:    'Stack & Technologies',
        stackLabel:    '/ STACK',
        contatoTitle:  'Let\'s Talk',
        contatoLabel:  '/ CONTACT',
        contatoLead:   'I\'m open to opportunities, partnerships and conversations about tech. Reach out through any channel:',
      },
      studies: {
        label:  'LEARNING',
        titleA: 'Studying',
        titleB: 'now',
        items: [
          { num: '01', nome: 'Java & Python',          desc: 'Object-oriented fundamentals and back-end programming logic with Java and Python.' },
          { num: '02', nome: 'JavaScript & TypeScript', desc: 'DOM manipulation, advanced logic and static typing for robust projects.' },
          { num: '03', nome: 'React & Next.js',         desc: 'Modern SPAs, reusable components, SSR and advanced routing.' },
          { num: '04', nome: 'Tailwind CSS',            desc: 'Fast utility styling, responsive layouts and modern design system.' },
        ],
        s1: { title: 'Java & Python',          desc: 'Object-oriented fundamentals and back-end programming logic with Java and Python.' },
        s2: { title: 'JavaScript & TypeScript', desc: 'DOM manipulation, advanced logic and static typing for robust projects.' },
        s3: { title: 'React & Next.js',         desc: 'Modern SPAs, reusable components, SSR and advanced routing.' },
        s4: { title: 'Tailwind CSS',            desc: 'Fast utility styling, responsive layouts and modern design system.' },
      },
      stack: {
        label:  'TECHNOLOGIES',
        titleA: 'Technologies and',
        titleB: 'Tools',
        html5: { name: 'HTML5', desc: 'Semantic structuring of modern pages and web interfaces.' },
        css3: { name: 'CSS3', desc: 'Styling, animations, responsiveness and Flexbox/Grid layouts.' },
        javascript: { name: 'JavaScript', desc: 'Programming logic, DOM manipulation and interactivity.' },
        typescript: { name: 'TypeScript', desc: 'Typed superset of JavaScript for scalable applications.' },
        react: { name: 'React', desc: 'Library for building reactive user interfaces.' },
        nextjs: { name: 'Next.js', desc: 'React framework with SSR, SSG and routing for production.' },
        tailwind: { name: 'Tailwind CSS', desc: 'Utility CSS framework for fast and responsive designs.' },
        python: { name: 'Python', desc: 'Versatile language for back-end, automation and data science.' },
        java: { name: 'Java', desc: 'Back-end development in training, object orientation.' },
        github: { name: 'Git & GitHub', desc: 'Code versioning and collaboration on repositories.' },
        vscode: { name: 'VS Code', desc: 'Main editor for front-end development and organization.' },
        intellij: { name: 'IntelliJ IDEA', desc: 'IDE used for studies and Java development.' }
      },
      contact: {
        label:     'CONTACT',
        titleA:    'Let\'s',
        titleB:    'talk?',
        text:      'I am open to internship opportunities, connections in tech, projects and new learnings. If you want to talk to me, choose one of the options below.',
        email:     'Send e-mail',
        linkedin:  'LinkedIn',
        github:    'GitHub',
        instagram: 'Instagram',
      },
      footer: {
        made: 'Made with 💙 by',
        copy: '© 2026 · All rights reserved',
        full: 'Made with 💙 by <strong>Marília Mezalheira</strong>',
        sub:  '© 2026 • Full Stack Developer in training',
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
    const particleColor = isLight ? '#0077b6' : '#00b4d8';
    const lineColor     = isLight ? '#0077b6' : '#00b4d8';

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