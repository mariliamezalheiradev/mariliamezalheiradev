/* =============================================
   MARÍLIA MEZALHEIRA — Portfolio script.js
   Refatorado: blue/cyan theme + PT/EN toggle
   ============================================= */

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
     ======================== */
  const TRANSLATIONS = {
    pt: {
      htmlLang: 'pt-BR',
      meta: {
        description: 'Desenvolvedora Full Stack em formação, focada em criar interfaces modernas, responsivas e funcionais.',
      },
      nav: {
        inicio:    'Início',
        projetos:  'Projetos',
        estudos:   'Estudos',
        tecnologias: 'Tecnologias',
        contato:   'Contato',
      },
      topbar: {
        langAria: 'Selecionar idioma',
        themeAria: 'Alternar tema claro/escuro',
        themeTitle: 'Alternar tema',
      },
      hero: {
        tag:     '> Desenvolvedora Full Stack',
        name:    'Marília <em>Mezalheira</em>',
        status:  'Disponível para novos projetos',
        statusSep: ' • ',
        typed:   [
          'Full Stack em formação',
          'Front-end com React & Next.js',
          'Back-end com Java & Python',
          'Interfaces modernas e responsivas',
          'Aprendizado contínuo 💙',
        ],
        aboutCard: {
          title:  'Sobre Mim',
          paragraph: [
            'Iniciei minha jornada na área de desenvolvimento criando projetos com foco em interfaces modernas, responsivas e funcionais. Antes da programação, trabalhei com suporte técnico, atendimento ao usuário, análise de processos e resolução de bugs — uma base que me ajuda a pensar em soluções também pela perspectiva de quem usa o sistema.',
            'Atualmente curso Análise e Desenvolvimento de Sistemas na UNINOVE e sigo construindo projetos práticos para evoluir no ecossistema Full Stack, do front-end com React ao back-end com Java e Python.',
            'Para conhecer melhor meus projetos e minha trajetória, acesse meu portfólio completo abaixo 👇',
          ],
          portfolioBtn: 'Ver portfólio completo',
        },
        terminal: {
          placeholder: 'digite "help" para ver os comandos',
        },
      },
      terminal: {
        placeholder: 'digite "help" para ver os comandos',
        promptPrefix: 'marilia@portfolio',
        promptCwd:    '~',
        notFound:     function (cmd) { return 'Comando não reconhecido: <span class="yellow">'+ escapeHTML(cmd) +'</span>. Digite <span class="cyan">help</span> para ver os comandos disponíveis.'; },
        help: [
          '<span class="cyan">help</span>     → mostra esta ajuda',
          '<span class="cyan">about</span>    → conheça um pouco sobre mim',
          '<span class="cyan">skills</span>   → linguagens, frameworks e ferramentas',
          '<span class="cyan">status</span>   → minha disponibilidade atual',
          '<span class="cyan">contact</span>  → formas de entrar em contato',
          '<span class="cyan">clear</span>    → limpa o terminal',
        ].join('\n'),
        about: {
          title:  '> Marília Mezalheira',
          lines: [
            '<span class="cyan">Estudante</span> de Análise e Desenvolvimento de Sistemas (UNINOVE)',
            '<span class="cyan">Foco</span>     em desenvolvimento Full Stack com ênfase em UI/UX',
            '<span class="cyan">Stack</span>    HTML, CSS, JavaScript, TypeScript, React, Next.js, Tailwind',
            '<span class="cyan">Back-end</span> Java, Python',
            '<span class="cyan">Soft skills</span> Suporte técnico, análise de processos e resolução de bugs',
            '',
            '<span class="dim">> "Código que resolve problemas reais começa por entender pessoas."</span>',
          ].join('\n'),
        },
        skills: {
          title: '> Stack & Ferramentas',
          lines: [
            '<span class="cyan">Linguagens:</span>    JavaScript (ES6+), TypeScript, Java, Python, HTML5, CSS3',
            '<span class="cyan">Front-end:</span>     React, Next.js, Tailwind CSS',
            '<span class="cyan">Back-end:</span>      Java, Python',
            '<span class="cyan">Ferramentas:</span>   Git, GitHub, VS Code, IntelliJ IDEA',
            '<span class="cyan">Idiomas:</span>       Português (nativo), <span class="cyan">Inglês (Intermediário)</span>',
          ].join('\n'),
        },
        status: {
          title: '> Status atual',
          text:  '<span class="green">● Disponível</span> para novos projetos freelance, estágio ou colaborações em desenvolvimento Full Stack. Tem uma ideia ou projeto em mente? Vamos conversar! 🚀',
        },
        contact: {
          title: '> Contato',
          lines: [
            '<span class="cyan">LinkedIn:</span> <a href="https://www.linkedin.com/in/mar%C3%ADlia-mezalheira/" target="_blank" rel="noopener" class="term-link">linkedin.com/in/marília-mezalheira</a>',
            '<span class="cyan">E-mail:</span>   <a href="mailto:mariliagpedrosa@outlook.com" class="term-link">mariliagpedrosa@outlook.com</a>',
            '<span class="cyan">GitHub:</span>   <a href="https://github.com/mariliamezalheiradev" target="_blank" rel="noopener" class="term-link">github.com/mariliamezalheiradev</a>',
          ].join('\n'),
        },
      },
      sections: {
        projetosTitle: 'Projetos',
        projetosLabel: '/ PROJETOS',
        projetosLead:  'Conheça alguns dos meus projetos mais recentes',
        projetosDesc:  'Cada projeto é uma oportunidade de aprendizado. Aqui estão os que mais representaram minha evolução como desenvolvedora Full Stack.',
        estudosTitle:  'Atualmente Estudando',
        estudosLabel:  '/ ESTUDOS',
        stackTitle:    'Stack & Tecnologias',
        stackLabel:    '/ STACK',
        contatoTitle:  'Vamos Conversar',
        contatoLabel:  '/ CONTATO',
        contatoLead:   'Estou aberta a oportunidades, parcerias e conversas sobre tecnologia. Entre em contato pelo canal de sua preferência:',
      },
      projects: {
        mario: {
          numero:    '01 /',
          nome:      'Mario Cart Game',
          status:    'FINALIZADO',
          statusKind:'finalizado',
          descricao: 'Mini-jogo web com HTML, CSS e JavaScript: animações, colisão em tempo real e lógica de game over — meu primeiro projeto de lógica interativa.',
          techs:     ['HTML5', 'CSS3', 'JavaScript', 'Animação 2D'],
          features:  ['Animações com CSS', 'Detecção de colisão em tempo real', 'Lógica de Game Over', 'Controles com teclado'],
          demoLabel: 'Jogar agora',
          repoLabel: 'Ver repositório',
        },
        flowsalon: {
          numero:    '02 /',
          nome:      'FlowSalon',
          status:    'FINALIZADO',
          statusKind:'finalizado',
          descricao: 'Sistema web completo para salão/barbearia: agendamento online, painel administrativo, gestão de clientes, profissionais, integração com API ViaCEP e LocalStorage para persistência.',
          techs:     ['HTML5', 'CSS3', 'JavaScript', 'LocalStorage', 'ViaCEP'],
          features:  ['Agendamento online', 'Painel administrativo', 'Gestão de clientes', 'Integração ViaCEP', 'Persistência local'],
          demoLabel: 'Ver online',
          repoLabel: 'Ver repositório',
        },
        financas: {
          numero:    '03 /',
          nome:      'Finanças Pessoais',
          status:    'EM EVOLUÇÃO',
          statusKind:'evolucao',
          descricao: 'Sistema de finanças pessoais integrado ao Firebase: autenticação por e-mail/senha, Firestore, dashboard mensal, transações, contas a pagar e alertas automáticos de vencimento.',
          techs:     ['HTML5', 'CSS3', 'JavaScript', 'Firebase Auth', 'Cloud Firestore'],
          features:  ['Login e cadastro', 'Dashboard financeiro', 'Transações e contas', 'Alertas de vencimento', 'Notificações no menu'],
          demoLabel: 'Ver online',
          repoLabel: 'Ver repositório',
        },
      },
      studies: {
        items: [
          { num: '01', nome: 'React & Next.js',      desc: 'Componentização, hooks, server components, roteamento e renderização híbrida no ecossistema moderno.' },
          { num: '02', nome: 'TypeScript',           desc: 'Tipagem estática avançada, generics, utility types e integração total com React.' },
          { num: '03', nome: 'Tailwind CSS',         desc: 'Estilização utilitária, design tokens, responsividade rápida e consistência visual.' },
          { num: '04', nome: 'Java & Python',        desc: 'Programação orientada a objetos, APIs REST, persistência de dados e boas práticas back-end.' },
        ],
      },
      stack: {
        items: [
          { nome: 'HTML5',          desc: 'Estrutura semântica e acessível para qualquer projeto web.' },
          { nome: 'CSS3',           desc: 'Estilização moderna: flexbox, grid, animações e responsividade.' },
          { nome: 'JavaScript',     desc: 'ES6+, DOM, assíncrono, APIs e lógica de interação.' },
          { nome: 'TypeScript',     desc: 'Tipagem estática para código mais seguro e manutenível.' },
          { nome: 'React',          desc: 'Componentização, hooks, contexto e SPAs modernas.' },
          { nome: 'Next.js',        desc: 'SSR/SSG, roteamento e renderização híbrida para produção.' },
          { nome: 'Tailwind CSS',   desc: 'Design system utilitário para interfaces escaláveis.' },
          { nome: 'Java',           desc: 'Orientação a objetos, coleções e ecossistema back-end.' },
          { nome: 'Python',         desc: 'Versatilidade para scripts, APIs e automações.' },
          { nome: 'Git',            desc: 'Versionamento, branches e trabalho colaborativo.' },
          { nome: 'GitHub',         desc: 'Repositórios, PRs, Pages e deploy contínuo.' },
          { nome: 'VS Code',        desc: 'Editor principal: extensões, atalhos e produtividade.' },
        ],
      },
      contato: {
        botoes: {
          linkedin: 'LinkedIn',
          email:    'E-mail',
          github:   'GitHub',
          portfolio:'Portfólio',
        },
      },
      footer: {
        copy: 'Feito com 💙 por <strong>Marília Mezalheira</strong>',
        sub:  '© 2026 • Desenvolvedora Full Stack em formação',
      },
      scroll: {
        topTitle: 'Voltar ao topo',
        projBtn:  'Ver projetos',
      },
    },
    en: {
      htmlLang: 'en',
      meta: {
        description: 'Full Stack Developer in training, focused on building modern, responsive and functional interfaces.',
      },
      nav: {
        inicio:    'Home',
        projetos:  'Projects',
        estudos:   'Studies',
        tecnologias: 'Tech',
        contato:   'Contact',
      },
      topbar: {
        langAria: 'Select language',
        themeAria: 'Toggle light/dark theme',
        themeTitle: 'Toggle theme',
      },
      hero: {
        tag:     '> Full Stack Developer',
        name:    'Marília <em>Mezalheira</em>',
        status:  'Available for new projects',
        statusSep: ' • ',
        typed:   [
          'Full Stack Developer in training',
          'Front-end with React & Next.js',
          'Back-end with Java & Python',
          'Modern responsive interfaces',
          'Continuous learning 💙',
        ],
        aboutCard: {
          title:  'About Me',
          paragraph: [
            'I started my journey in development by building projects focused on modern, responsive, and functional interfaces. Before programming, I worked with technical support, user assistance, process analysis, and bug resolution — a foundation that helps me think about solutions from the perspective of the people who use them.',
            'I am currently studying Systems Analysis and Development at UNINOVE and keep building hands-on projects to grow in the Full Stack ecosystem, from front-end with React to back-end with Java and Python.',
            'To explore my projects and journey in more detail, check my full portfolio below 👇',
          ],
          portfolioBtn: 'View full portfolio',
        },
        terminal: {
          placeholder: 'type "help" to see commands',
        },
      },
      terminal: {
        placeholder: 'type "help" to see commands',
        promptPrefix: 'marilia@portfolio',
        promptCwd:    '~',
        notFound:     function (cmd) { return 'Command not recognized: <span class="yellow">'+ escapeHTML(cmd) +'</span>. Type <span class="cyan">help</span> to see available commands.'; },
        help: [
          '<span class="cyan">help</span>     → show this help',
          '<span class="cyan">about</span>    → learn a bit about me',
          '<span class="cyan">skills</span>   → languages, frameworks and tools',
          '<span class="cyan">status</span>   → my current availability',
          '<span class="cyan">contact</span>  → ways to reach me',
          '<span class="cyan">clear</span>    → clear the terminal',
        ].join('\n'),
        about: {
          title:  '> Marília Mezalheira',
          lines: [
            '<span class="cyan">Student</span>  of Systems Analysis and Development (UNINOVE)',
            '<span class="cyan">Focus</span>    on Full Stack development with UI/UX emphasis',
            '<span class="cyan">Stack</span>    HTML, CSS, JavaScript, TypeScript, React, Next.js, Tailwind',
            '<span class="cyan">Back-end</span> Java, Python',
            '<span class="cyan">Soft skills</span> Technical support, process analysis and bug resolution',
            '',
            '<span class="dim">> "Code that solves real problems starts by understanding people."</span>',
          ].join('\n'),
        },
        skills: {
          title: '> Stack & Tools',
          lines: [
            '<span class="cyan">Languages:</span>    JavaScript (ES6+), TypeScript, Java, Python, HTML5, CSS3',
            '<span class="cyan">Front-end:</span>    React, Next.js, Tailwind CSS',
            '<span class="cyan">Back-end:</span>     Java, Python',
            '<span class="cyan">Tools:</span>        Git, GitHub, VS Code, IntelliJ IDEA',
            '<span class="cyan">Languages:</span>    Portuguese (native), <span class="cyan">English (Intermediate)</span>',
          ].join('\n'),
        },
        status: {
          title: '> Current status',
          text:  '<span class="green">● Available</span> for new freelance projects, internships or Full Stack collaborations. Got an idea or project in mind? Let\'s talk! 🚀',
        },
        contact: {
          title: '> Contact',
          lines: [
            '<span class="cyan">LinkedIn:</span> <a href="https://www.linkedin.com/in/mar%C3%ADlia-mezalheira/" target="_blank" rel="noopener" class="term-link">linkedin.com/in/marília-mezalheira</a>',
            '<span class="cyan">E-mail:</span>   <a href="mailto:mariliagpedrosa@outlook.com" class="term-link">mariliagpedrosa@outlook.com</a>',
            '<span class="cyan">GitHub:</span>   <a href="https://github.com/mariliamezalheiradev" target="_blank" rel="noopener" class="term-link">github.com/mariliamezalheiradev</a>',
          ].join('\n'),
        },
      },
      sections: {
        projetosTitle: 'Projects',
        projetosLabel: '/ PROJECTS',
        projetosLead:  'Check out some of my most recent projects',
        projetosDesc:  'Every project is a learning opportunity. Here are the ones that best represent my growth as a Full Stack developer.',
        estudosTitle:  'Currently Studying',
        estudosLabel:  '/ STUDIES',
        stackTitle:    'Stack & Technologies',
        stackLabel:    '/ STACK',
        contatoTitle:  'Let\'s Talk',
        contatoLabel:  '/ CONTACT',
        contatoLead:   'I\'m open to opportunities, partnerships and conversations about tech. Reach out through any channel:',
      },
      projects: {
        mario: {
          numero:    '01 /',
          nome:      'Mario Cart Game',
          status:    'FINISHED',
          statusKind:'finalizado',
          descricao: 'Mini web game built with HTML, CSS and JavaScript: animations, real-time collision and a game over logic — my first hands-on interactive project.',
          techs:     ['HTML5', 'CSS3', 'JavaScript', '2D Animation'],
          features:  ['CSS animations', 'Real-time collision detection', 'Game over logic', 'Keyboard controls'],
          demoLabel: 'Play now',
          repoLabel: 'View repository',
        },
        flowsalon: {
          numero:    '02 /',
          nome:      'FlowSalon',
          status:    'FINISHED',
          statusKind:'finalizado',
          descricao: 'Full web system for salon/barbershop: online booking, admin panel, client & staff management, ViaCEP API integration and LocalStorage persistence.',
          techs:     ['HTML5', 'CSS3', 'JavaScript', 'LocalStorage', 'ViaCEP'],
          features:  ['Online booking', 'Admin panel', 'Client management', 'ViaCEP integration', 'Local persistence'],
          demoLabel: 'View live',
          repoLabel: 'View repository',
        },
        financas: {
          numero:    '03 /',
          nome:      'Personal Finance',
          status:    'IN PROGRESS',
          statusKind:'evolucao',
          descricao: 'Personal finance app integrated with Firebase: e-mail/password auth, Firestore, monthly dashboard, transactions, bills to pay and automatic due-date alerts.',
          techs:     ['HTML5', 'CSS3', 'JavaScript', 'Firebase Auth', 'Cloud Firestore'],
          features:  ['Sign-in & sign-up', 'Finance dashboard', 'Transactions & bills', 'Due-date alerts', 'Menu badge notifications'],
          demoLabel: 'View live',
          repoLabel: 'View repository',
        },
      },
      studies: {
        items: [
          { num: '01', nome: 'React & Next.js', desc: 'Components, hooks, server components, routing and hybrid rendering in the modern ecosystem.' },
          { num: '02', nome: 'TypeScript',      desc: 'Advanced static typing, generics, utility types and full React integration.' },
          { num: '03', nome: 'Tailwind CSS',    desc: 'Utility-first styling, design tokens, fast responsiveness and visual consistency.' },
          { num: '04', nome: 'Java & Python',   desc: 'OOP, REST APIs, data persistence and back-end best practices.' },
        ],
      },
      stack: {
        items: [
          { nome: 'HTML5',          desc: 'Semantic and accessible structure for any web project.' },
          { nome: 'CSS3',           desc: 'Modern styling: flexbox, grid, animations and responsiveness.' },
          { nome: 'JavaScript',     desc: 'ES6+, DOM, async, APIs and interaction logic.' },
          { nome: 'TypeScript',     desc: 'Static typing for safer, more maintainable code.' },
          { nome: 'React',          desc: 'Components, hooks, context and modern SPAs.' },
          { nome: 'Next.js',        desc: 'SSR/SSG, routing and hybrid rendering for production.' },
          { nome: 'Tailwind CSS',   desc: 'Utility-first design system for scalable UIs.' },
          { nome: 'Java',           desc: 'OOP, collections and the back-end ecosystem.' },
          { nome: 'Python',         desc: 'Versatile for scripts, APIs and automation.' },
          { nome: 'Git',            desc: 'Versioning, branches and collaborative work.' },
          { nome: 'GitHub',         desc: 'Repos, PRs, Pages and continuous deployment.' },
          { nome: 'VS Code',        desc: 'Main editor: extensions, shortcuts and productivity.' },
        ],
      },
      contato: {
        botoes: {
          linkedin: 'LinkedIn',
          email:    'E-mail',
          github:   'GitHub',
          portfolio:'Portfolio',
        },
      },
      footer: {
        copy: 'Made with 💙 by <strong>Marília Mezalheira</strong>',
        sub:  '© 2026 • Full Stack Developer in training',
      },
      scroll: {
        topTitle: 'Back to top',
        projBtn:  'View projects',
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

  function applyLang(lang) {
    currentLang = (lang === 'en') ? 'en' : 'pt';
    const d = dict();

    document.documentElement.setAttribute('lang', d.htmlLang);

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', d.meta.description);

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      const parts = key.split('.');
      let value = d;
      for (let i = 0; i < parts.length; i++) {
        if (value == null) break;
        value = value[parts[i]];
      }
      if (typeof value === 'string') {
        el.innerHTML = value;
      }
    });

    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      const spec = el.getAttribute('data-i18n-attr');
      spec.split(';').forEach(function (pair) {
        const tokens = pair.split(':');
        const k = tokens[0] && tokens[0].trim();
        const v = tokens[1] && tokens[1].trim();
        if (k && v) {
          const parts = v.split('.');
          let value = d;
          for (let i = 0; i < parts.length; i++) {
            if (value == null) break;
            value = value[parts[i]];
          }
          if (typeof value === 'string') {
            el.setAttribute(k, value);
          }
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

    if (typeof window.refreshTyped === 'function') window.refreshTyped();
    if (typeof window.rebuildTerminalCommands === 'function') window.rebuildTerminalCommands();

    // Re-render the terminal placeholder
    const input = document.getElementById('terminal-input');
    if (input) input.setAttribute('placeholder', d.terminal.placeholder);
  }

  function toggleLang() {
    applyLang(currentLang === 'pt' ? 'en' : 'pt');
  }

  /* ========================
     CUSTOM CURSOR
     ======================== */
  function initCustomCursor() {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    if (!cursor || !follower) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let mouseX = 0, mouseY = 0;
    let fx = 0, fy = 0;

    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top  = mouseY + 'px';
    });

    function loop() {
      fx += (mouseX - fx) * 0.18;
      fy += (mouseY - fy) * 0.18;
      follower.style.left = fx + 'px';
      follower.style.top  = fy + 'px';
      requestAnimationFrame(loop);
    }
    loop();

    const hoverSel = 'a, button, .topbar-toggle, .menu-fixo a, .projeto-link, .link-btn, .stack-item, .estudo-card, input';
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
        detect_on: 'canvas',
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

    const cardSelectors = ['.estudo-card', '.stack-item', '.projeto-card'];
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
     TYPED.JS
     ======================== */
  let typedInstance = null;

  function initTyped() {
    if (typeof Typed === 'undefined') return;
    const el = document.getElementById('typed-tagline');
    if (!el) return;

    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      el.textContent = dict().hero.typed[0];
      return;
    }

    if (typedInstance) {
      try { typedInstance.destroy(); } catch (e) { /* noop */ }
      typedInstance = null;
    }

    typedInstance = new Typed(el, {
      strings: dict().hero.typed,
      typeSpeed: 55,
      backSpeed: 30,
      backDelay: 1800,
      loop: true,
      smartBackspace: true,
      cursorChar: '|',
      contentType: 'html',
    });

    window.refreshTyped = function () {
      if (typedInstance) {
        try { typedInstance.destroy(); } catch (e) { /* noop */ }
        typedInstance = null;
      }
      if (el) el.innerHTML = '';
      initTyped();
    };
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

  function termAppendRaw(html) {
    termAppend(html);
  }

  function echoPrompt(cmd) {
    const d = dict();
    termAppend(
      '<span class="prompt-symbol">'+ escapeHTML(d.terminal.promptPrefix) +'</span>' +
      '<span class="dim">'+ escapeHTML(d.terminal.promptCwd) +'</span> ' +
      '$ ' + escapeHTML(cmd)
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
        termAppend('<span class="title">'+ escapeHTML('Comandos disponíveis:') +'</span>');
        d.terminal.help.split('\n').forEach(function (l) { termAppendRaw(l); });
      },
      about: function () {
        printBlock(d.terminal.about.title, d.terminal.about.lines);
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
      document.querySelectorAll('.reveal, .stack-item, .estudo-card, .projeto-card, .section-label, .section-title')
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

    document.querySelectorAll('.reveal, .stack-item, .estudo-card, .projeto-card, .section-label, .section-title')
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
    initTyped();
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