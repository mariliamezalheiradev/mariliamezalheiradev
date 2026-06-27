/* ============================================
   MARÍLIA MEZALHEIRA | DEV FULL STACK
   Script principal - Blue & Cyan Theme
   Recursos: Cursor | Particles.js | GSAP |
             Typed.js | Terminal Interativo |
             Smooth Scroll | Reveal Observer |
             Topbar Scroll | i18n PT/EN |
             Theme Toggle Dark/Light
   ============================================ */

(function () {
  'use strict';

  /* ============================================
     HELPERS GLOBAIS
     ============================================ */
  // Helper de escape usado por applyLang() e pelos handlers do terminal.
  // Declarado no topo do IIFE para evitar problemas de TDZ/Temporal Dead Zone.
  const escapeHTML = (str) =>
    String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  /* ============================================
     DICIONÁRIO DE TRADUÇÃO (PT / EN)
     ============================================ */
  const TRANSLATIONS = {
    pt: {
      meta: {
        description: 'Marília Mezalheira | Desenvolvedora Full Stack em formação, apaixonada por criar experiências digitais modernas.'
      },
      nav: {
        home: 'Início',
        projects: 'Projetos',
        studies: 'Estudos',
        stack: 'Tecnologias',
        contact: 'Contato'
      },
      hero: {
        tag: 'DESENVOLVEDORA FULL STACK',
        lastname: 'Mezalheira',
        status: 'Aberta a oportunidades',
        statusInternship: 'Estágio',
        aboutTitle: 'Sobre mim',
        bio: 'Sou Marília Mezalheira, estudante de Análise e Desenvolvimento de Sistemas na UNINOVE, em transição de carreira do suporte técnico para o Desenvolvimento Full Stack. Busco unir minha experiência com usuários à criação de interfaces funcionais e bem projetadas.'
      },
      terminal: {
        title: '~/marilia-mezalheira — terminal: digite "help"',
        placeholder: 'clique aqui e pressione Enter para executar um comando',
        banner: '● Terminal pronto. Digite help para começar.',
        prompt: 'terminal pronto. digite',
        promptAction: 'para começar.',
        available: '[ comandos disponíveis ]',
        login: 'Último login: sex jun 27 14:32:01 on ttys000',
        commands: {
          helpHeader: '[ comandos disponíveis ]',
          helpHelp: 'help → mostra essa lista',
          helpAbout: 'about → quem sou eu',
          helpSkills: 'skills → minhas habilidades',
          helpStatus: 'status → onde está meu foco',
          helpContact: 'contact → como me achar',
          helpClear: 'clear → limpa o terminal'
        },
        about: {
          line1: 'Marília Mezalheira — Dev Full Stack',
          line1Dim: '— Dev Full Stack',
          bio1: 'Trabalhei por quase 2 anos em suporte técnico e atendimento e foi justamente lá que percebi o que realmente queria fazer: estar do outro lado, construindo os sistemas que as pessoas usam.',
          bio2: 'Hoje estou em transição para Desenvolvimento Frontend. Curso TADS (Análise e Desenvolvimento de Sistemas) na UNINOVE, e estou desenvolvendo habilidades em HTML, CSS, JavaScript e Java, aplicando em projetos práticos enquanto avanço na graduação.',
          bio3: 'Na Stefanini Group, passei 1 ano e 8 meses prestando suporte a uma plataforma de bolsa de valores (AGF), resolvendo bugs, acompanhando chamados e trabalhando com sistemas integrados via WhatsApp. Depois, atuei como Analista de Processos em contexto jurídico monitorando informações em sistemas como ADA e Intranet, exigindo atenção a detalhes e organização que levo direto para o código.',
          bio4: 'O que me diferencia: não sou só quem escreve código. Sou quem já esteve no lado do usuário, sabe o que frustra e o que encanta e quer resolver isso com tecnologia.'
        },
        skills: {
          header: '[ skills completas ]',
          langs: '▸ Linguagens & Ferramentas:',
          langsList: '   HTML5, CSS3, JavaScript, TypeScript, React, Next.js, Tailwind CSS, Java, Python, Git, GitHub, VS Code, IntelliJ IDEA, Intermediate English',
          frameworks: '▸ Frameworks & Bibliotecas:',
          frameworksList: '   React, Next.js, Tailwind CSS',
          tools: '▸ Ferramentas:',
          toolsList: '   Git, GitHub, VS Code, IntelliJ IDEA',
          total: 'Total: 14 habilidades ativas no stack (incluindo Inglês Intermediário).'
        },
        status: {
          text: 'Meu foco está em construir habilidades sólidas que impulsionem meu crescimento profissional e pessoal. Busco não apenas aprender, mas também conectar-me com pessoas que compartilham da mesma paixão por tecnologia e inovação. Acredito que as melhores oportunidades surgem quando nos cercamos de pessoas inspiradoras que nos desafiam a ser melhores.'
        },
        contact: {
          emailLabel: '▸ E-mail:',
          linkedinLabel: '▸ LinkedIn:',
          githubLabel: '▸ GitHub:'
        },
        notFound: 'comando não encontrado:',
        notFoundHint: 'Digite help para ver os comandos.'
      },
      typed: {
        strings: [
          'experiências visuais incríveis.',
          'código limpo e moderno.',
          'interfaces fluidas e acessíveis.',
          'soluções full stack de ponta a ponta.'
        ]
      },
      projects: {
        label: 'PORTFÓLIO',
        titleA: 'Projetos que',
        titleB: 'construí',
        btnView: 'Ver projeto online',
        btnGithub: 'Ver no GitHub',
        mario: {
          status: 'Projeto de estudo · Pendente de Evolução',
          title: 'Game',
          desc: 'Mini-jogo web inspirado no clássico Mario, desenvolvido com o objetivo de praticar conceitos fundamentais de front-end. O projeto apresenta um personagem animado que deve saltar para desviar de obstáculos, utilizando detecção de colisão, animações em CSS e lógica de game over.',
          f1: 'Animações de pulo com keyframes CSS',
          f2: 'Detecção de colisão em tempo real',
          f3: 'Obstáculos com velocidade dinâmica',
          f4: 'Tela de Game Over com sprite'
        },
        salon: {
          status: 'Projeto acadêmico · Finalizado',
          title: 'Salon',
          desc: 'Plataforma de gestão completa para salões de beleza e barbearias. O sistema inclui agendamento online para clientes, painel administrativo com controle de agenda, gestão de clientes, catálogo de serviços e equipe de profissionais, tudo com uma interface dark moderna e fluida.',
          f1: 'Agendamento online com validação de formulário',
          f2: 'Dashboard administrativo completo',
          f3: 'Gestão de clientes, serviços e profissionais',
          f4: 'Design responsivo com tema dark moderno'
        },
        financas: {
          status: 'Projeto pessoal · Finalizado',
          title: 'Pessoais',
          desc: 'Sistema web desenvolvido para controle financeiro pessoal, integrado ao Firebase, com login e cadastro por e-mail e senha, salvamento online de dados, dashboard mensal, páginas separadas por área, cadastro de transações, contas a pagar, total em aberto, alertas automáticos de vencimento e alarme visual/sonoro dentro do próprio site.',
          f1: 'Login e cadastro com autenticação pelo Firebase',
          f2: 'Dados salvos online para acessar pelo celular, PC ou notebook',
          f3: 'Dashboard mensal com entradas, saídas, saldo e total em aberto',
          f4: 'Cadastro de transações, contas a pagar, alertas e alarme automático'
        }
      },
      studies: {
        label: 'EM APRENDIZADO',
        titleA: 'Estudando',
        titleB: 'agora',
        s1: { title: 'Java & Python',  desc: 'Fundamentos de orientação a objetos e lógica de programação back-end com Java e Python.' },
        s2: { title: 'JavaScript & TypeScript', desc: 'Manipulação do DOM, lógica avançada e tipagem estática para projetos robustos.' },
        s3: { title: 'React & Next.js', desc: 'Criação de SPAs modernas, componentes reutilizáveis, SSR e roteamento avançado.' },
        s4: { title: 'Tailwind CSS',   desc: 'Estilização rápida e utilitária, layouts responsivos e design system moderno.' }
      },
      stack: {
        label: 'TECNOLOGIAS',
        titleA: 'Tecnologias e',
        titleB: 'Ferramentas'
      },
      contact: {
        label: 'CONTATO',
        titleA: 'Vamos',
        titleB: 'conversar?',
        text: 'Estou aberta a oportunidades de estágio, conexões na área de tecnologia, projetos e novos aprendizados. Se quiser conversar comigo, escolha uma das opções abaixo.',
        email: 'Enviar e-mail'
      },
      footer: {
        made: 'Feito com 💙 por',
        copy: '© 2026 · Todos os direitos reservados'
      }
    },

    en: {
      meta: {
        description: 'Marília Mezalheira | Full Stack Developer in training, passionate about creating modern digital experiences.'
      },
      nav: {
        home: 'Home',
        projects: 'Projects',
        studies: 'Studies',
        stack: 'Technologies',
        contact: 'Contact'
      },
      hero: {
        tag: 'FULL STACK DEVELOPER',
        lastname: 'Mezalheira',
        status: 'Open to opportunities',
        statusInternship: 'Internship',
        aboutTitle: 'About me',
        bio: 'I am Marília Mezalheira, a Systems Analysis and Development student at UNINOVE, transitioning my career from technical support to Full Stack Development. I aim to combine my user-facing experience with the creation of functional and well-designed interfaces.'
      },
      terminal: {
        title: '~/marilia-mezalheira — terminal: type "help"',
        placeholder: 'click here and press Enter to run a command',
        banner: '● Terminal ready. Type help to start.',
        prompt: 'terminal ready. type',
        promptAction: 'to start.',
        available: '[ available commands ]',
        login: 'Last login: Fri Jun 27 14:32:01 on ttys000',
        commands: {
          helpHeader: '[ available commands ]',
          helpHelp: 'help → shows this list',
          helpAbout: 'about → who I am',
          helpSkills: 'skills → my abilities',
          helpStatus: 'status → where my focus is',
          helpContact: 'contact → how to reach me',
          helpClear: 'clear → clears the terminal'
        },
        about: {
          line1: 'Marília Mezalheira',
          line1Dim: '— Full Stack Developer',
          bio1: 'I worked for nearly two years in technical support and customer service, and that is exactly where I realized what I truly wanted to do: be on the other side, building the systems that people use.',
          bio2: 'I am currently transitioning into Frontend Development. I am studying Systems Analysis and Development (TADS) at UNINOVE, building skills in HTML, CSS, JavaScript and Java, and applying them in hands-on projects while I advance through my degree.',
          bio3: 'At Stefanini Group, I spent 1 year and 8 months supporting a stock trading platform (AGF), fixing bugs, tracking tickets and working with systems integrated via WhatsApp. After that, I worked as a Process Analyst in a legal context, monitoring information in systems like ADA and Intranet — which demands attention to detail and organization that I bring straight into my code.',
          bio4: 'What sets me apart: I am not only someone who writes code. I have been on the user side, I know what frustrates and what delights — and I want to solve that with technology.'
        },
        skills: {
          header: '[ full skills ]',
          langs: '▸ Languages & Tools:',
          langsList: '   HTML5, CSS3, JavaScript, TypeScript, React, Next.js, Tailwind CSS, Java, Python, Git, GitHub, VS Code, IntelliJ IDEA, Intermediate English',
          frameworks: '▸ Frameworks & Libraries:',
          frameworksList: '   React, Next.js, Tailwind CSS',
          tools: '▸ Tools:',
          toolsList: '   Git, GitHub, VS Code, IntelliJ IDEA',
          total: 'Total: 14 active skills in the stack (including Intermediate English).'
        },
        status: {
          text: 'My focus is on building solid skills that drive my professional and personal growth. I seek not only to learn but also to connect with people who share the same passion for technology and innovation. I believe that the best opportunities arise when we surround ourselves with inspiring people who challenge us to be better.'
        },
        contact: {
          emailLabel: '▸ Email:',
          linkedinLabel: '▸ LinkedIn:',
          githubLabel: '▸ GitHub:'
        },
        notFound: 'command not found:',
        notFoundHint: 'Type help to see the commands.'
      },
      typed: {
        strings: [
          'incredible visual experiences.',
          'clean and modern code.',
          'fluid and accessible interfaces.',
          'end-to-end full stack solutions.'
        ]
      },
      projects: {
        label: 'PORTFOLIO',
        titleA: 'Projects I',
        titleB: 'built',
        btnView: 'View project online',
        btnGithub: 'View on GitHub',
        mario: {
          status: 'Study project · Pending evolution',
          title: 'Game',
          desc: 'A web mini-game inspired by the classic Mario, developed with the goal of practicing core front-end concepts. The project features an animated character that must jump to avoid obstacles, using collision detection, CSS animations and game over logic.',
          f1: 'Jump animations with CSS keyframes',
          f2: 'Real-time collision detection',
          f3: 'Obstacles with dynamic speed',
          f4: 'Game Over screen with sprite'
        },
        salon: {
          status: 'Academic project · Finished',
          title: 'Salon',
          desc: 'A complete management platform for beauty salons and barbershops. The system includes online scheduling for clients, an administrative dashboard with schedule control, client management, service catalog and professional team — all wrapped in a modern and fluid dark interface.',
          f1: 'Online scheduling with form validation',
          f2: 'Complete administrative dashboard',
          f3: 'Clients, services and staff management',
          f4: 'Responsive design with modern dark theme'
        },
        financas: {
          status: 'Personal project · Finished',
          title: 'Personal',
          desc: 'A web system built for personal finance control, integrated with Firebase, with email/password login and sign-up, online data saving, monthly dashboard, area-separated pages, transaction registry, bills to pay, total outstanding, automatic due-date alerts and visual/audible alarm right inside the site.',
          f1: 'Login and sign-up with Firebase authentication',
          f2: 'Data saved online to access from phone, PC or notebook',
          f3: 'Monthly dashboard with income, expenses, balance and total outstanding',
          f4: 'Transactions, bills to pay, alerts and automatic alarm'
        }
      },
      studies: {
        label: 'CURRENTLY LEARNING',
        titleA: 'Studying',
        titleB: 'right now',
        s1: { title: 'Java & Python',  desc: 'Object-oriented fundamentals and back-end programming logic with Java and Python.' },
        s2: { title: 'JavaScript & TypeScript', desc: 'DOM manipulation, advanced logic and static typing for robust projects.' },
        s3: { title: 'React & Next.js', desc: 'Modern SPAs, reusable components, SSR and advanced routing.' },
        s4: { title: 'Tailwind CSS',   desc: 'Fast utility-first styling, responsive layouts and modern design system.' }
      },
      stack: {
        label: 'TECHNOLOGIES',
        titleA: 'Technologies and',
        titleB: 'Tools'
      },
      contact: {
        label: 'CONTACT',
        titleA: "Let's",
        titleB: 'talk?',
        text: 'I am open to internship opportunities, connections in the tech field, projects and new learning. If you want to talk to me, pick one of the options below.',
        email: 'Send email'
      },
      footer: {
        made: 'Made with 💙 by',
        copy: '© 2026 · All rights reserved'
      }
    }
  };

  /* ============================================
     ESTADO ATUAL (idioma + tema)
     ============================================ */
  const STORAGE_KEY_LANG  = 'mm_lang';
  const STORAGE_KEY_THEME = 'mm_theme';

  function detectInitialLang() {
    const saved = localStorage.getItem(STORAGE_KEY_LANG);
    if (saved === 'pt' || saved === 'en') return saved;
    const nav = (navigator.language || 'pt-BR').toLowerCase();
    return nav.startsWith('pt') ? 'pt' : 'en';
  }
  function detectInitialTheme() {
    const saved = localStorage.getItem(STORAGE_KEY_THEME);
    if (saved === 'dark' || saved === 'light') return saved;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
    return 'dark';
  }

  let currentLang  = detectInitialLang();
  let currentTheme = detectInitialTheme();

  /* ============================================
     APLICAÇÃO DE TEMA E IDIOMA
     ============================================ */
  function applyTheme(theme) {
    document.body.classList.remove('theme-dark', 'theme-light');
    document.body.classList.add(theme === 'light' ? 'theme-light' : 'theme-dark');
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'light' ? '#eef3f8' : '#0b121f');
    currentTheme = theme;
    try { localStorage.setItem(STORAGE_KEY_THEME, theme); } catch (_) {}
  }

  function applyLang(lang) {
    const dict = TRANSLATIONS[lang];
    if (!dict) return;

    // <html lang> e meta description
    document.documentElement.setAttribute('lang', lang === 'pt' ? 'pt-BR' : 'en');
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', dict.meta.description);

    // textContent via data-i18n (chave com pontos: "hero.tag").
    // Se o valor for um objeto (ex: hero.bio com p1..p4), usa innerHTML
    // e renderiza cada chave como <p data-i18n="mesma.chave.filha">.
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const value = key.split('.').reduce((acc, k) => (acc ? acc[k] : null), dict);

      if (typeof value === 'string') {
        el.textContent = value;
      } else if (value && typeof value === 'object') {
        // Renderiza cada sub-chave como <p> filho, mantendo a estrutura multiline.
        el.innerHTML = Object.keys(value)
          .map((sub) => `<p data-i18n="${key}.${sub}">${escapeHTML(value[sub])}</p>`)
          .join('');
      }
    });

    // Toggles do topbar
    document.querySelectorAll('.topbar-toggle-opt').forEach((opt) => {
      opt.classList.toggle('is-active', opt.getAttribute('data-lang') === lang);
    });

    // Placeholder do terminal
    const ti = document.getElementById('terminal-input');
    if (ti) ti.setAttribute('placeholder', dict.terminal.placeholder);

    // Reinicializa o terminal com o idioma novo
    rerenderTerminal();

    currentLang = lang;
    try { localStorage.setItem(STORAGE_KEY_LANG, lang); } catch (_) {}
  }

  /* ============================================
     CUSTOM CURSOR
     ============================================ */
  const cursor = document.querySelector('.cursor');
  const follower = document.querySelector('.cursor-follower');
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (cursor && follower && !isTouchDevice) {
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top  = mouseY + 'px';
    });

    function animateCursor() {
      followerX += (mouseX - followerX) * 0.14;
      followerY += (mouseY - followerY) * 0.14;
      follower.style.left = followerX + 'px';
      follower.style.top  = followerY + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    const hoverTargets = document.querySelectorAll(
      'a, button, .stack-item, .estudo-card, .projeto-card, .link-btn, #terminal-input, .topbar-toggle'
    );
    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        follower.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        follower.classList.remove('hover');
      });
    });
  }

  /* ============================================
     PARTICLES.JS
     ============================================ */
  function initParticles() {
    if (typeof particlesJS !== 'function') return;
    const el = document.getElementById('particles-js');
    if (!el) return;

    particlesJS('particles-js', {
      particles: {
        number: { value: 90, density: { enable: true, value_area: 850 } },
        color: { value: ['#00b4d8', '#90e0ef', '#00f5d4', '#48cae4'] },
        shape: { type: 'circle', stroke: { width: 0, color: '#000000' }, polygon: { nb_sides: 5 } },
        opacity: { value: 0.55, random: true, anim: { enable: true, speed: 1, opacity_min: 0.15, sync: false } },
        size:    { value: 3, random: true, anim: { enable: true, speed: 2, size_min: 0.5, sync: false } },
        line_linked: { enable: true, distance: 150, color: '#00b4d8', opacity: 0.35, width: 1 },
        move: { enable: true, speed: 1.4, direction: 'none', random: true, straight: false, out_mode: 'out', bounce: false, attract: { enable: false, rotateX: 600, rotateY: 600 } }
      },
      interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
        modes: { grab: { distance: 160, line_linked: { opacity: 0.7 } }, bubble: { distance: 200, size: 4, duration: 2, opacity: 0.8, speed: 3 }, repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 }, remove: { particles_nb: 2 } }
      },
      retina_detect: true
    });
  }

  /* ============================================
     GSAP + SCROLLTRIGGER
     ============================================ */
  function initGSAP() {
    if (typeof gsap === 'undefined') return;
    if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.reveal').forEach((elem) => {
      gsap.fromTo(elem,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: elem, start: 'top 85%', toggleActions: 'play none none none' } });
    });

    gsap.utils.toArray('.section-label').forEach((el) => {
      gsap.fromTo(el, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
    });
    gsap.utils.toArray('.section-title').forEach((el) => {
      gsap.fromTo(el, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', delay: 0.1, scrollTrigger: { trigger: el, start: 'top 88%' } });
    });

    gsap.utils.toArray('.estudos-grid .estudo-card').forEach((card, i) => {
      gsap.fromTo(card, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: i * 0.1, scrollTrigger: { trigger: card, start: 'top 88%' } });
    });
    gsap.utils.toArray('.stack-grid .stack-item').forEach((card, i) => {
      gsap.fromTo(card, { opacity: 0, y: 30, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out', delay: i * 0.06, scrollTrigger: { trigger: card, start: 'top 90%' } });
    });
    gsap.utils.toArray('.projeto-card').forEach((card) => {
      gsap.fromTo(card, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 85%' } });
    });

    gsap.to('.orb-1', { y: 60, x: 30, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.orb-2', { y: -40, x: -25, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  }

  /* ============================================
     TYPED.JS
     ============================================ */
  let typedInstance = null;
  function initTyped() {
    if (typeof Typed === 'undefined') return;
    const target = document.getElementById('typed-tagline');
    if (!target) return;
    startTyped();
  }
  function startTyped() {
    if (typeof Typed === 'undefined') return;
    const target = document.getElementById('typed-tagline');
    if (!target) return;
    if (typedInstance) { try { typedInstance.destroy(); } catch (_) {} typedInstance = null; }
    const dict = TRANSLATIONS[currentLang];
    target.textContent = '';
    typedInstance = new Typed('#typed-tagline', {
      strings: dict.typed.strings,
      typeSpeed: 55,
      backSpeed: 28,
      backDelay: 1800,
      startDelay: 600,
      loop: true,
      smartBackspace: true,
      cursorChar: '|'
    });
  }

  /* ============================================
     TERMINAL INTERATIVO (com i18n)
     ============================================ */
  let terminalReady = false;
  function initTerminal() {
    const terminalOutput = document.getElementById('terminal-output');
    const terminalInput = document.getElementById('terminal-input');
    if (!terminalOutput || !terminalInput) return;

    const print = (html) => {
      const div = document.createElement('div');
      div.innerHTML = html;
      terminalOutput.appendChild(div);
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
    };

    const printPrompt = (text) => {
      const safe = escapeHTML(text);
      print(`<div class="terminal-line"><span class="prompt-symbol">~$</span> <span class="cyan">${safe}</span></div>`);
    };

    const dict = () => TRANSLATIONS[currentLang].terminal;

    const buildCommands = () => ({
      help: () => {
        const d = dict();
        return `
          <div class="terminal-line title">${escapeHTML(d.commands.helpHeader)}</div>
          <div class="terminal-line">${escapeHTML(d.commands.helpHelp)}</div>
          <div class="terminal-line">${escapeHTML(d.commands.helpAbout)}</div>
          <div class="terminal-line">${escapeHTML(d.commands.helpSkills)}</div>
          <div class="terminal-line">${escapeHTML(d.commands.helpStatus)}</div>
          <div class="terminal-line">${escapeHTML(d.commands.helpContact)}</div>
          <div class="terminal-line">${escapeHTML(d.commands.helpClear)}</div>
        `;
      },

      about: () => {
        const d = dict().about;
        return `
          <div class="terminal-line"><span class="title">Marília Mezalheira</span> <span class="dim">${escapeHTML(d.line1Dim)}</span></div>
          <div class="terminal-line"></div>
          <div class="terminal-line">${escapeHTML(d.bio1)}</div>
          <div class="terminal-line"></div>
          <div class="terminal-line">${escapeHTML(d.bio2)}</div>
          <div class="terminal-line"></div>
          <div class="terminal-line">${escapeHTML(d.bio3)}</div>
          <div class="terminal-line"></div>
          <div class="terminal-line">${escapeHTML(d.bio4)}</div>
        `;
      },

      skills: () => {
        const d = dict().skills;
        return `
          <div class="terminal-line title">${escapeHTML(d.header)}</div>
          <div class="terminal-line"></div>
          <div class="terminal-line"><span class="cyan">${escapeHTML(d.langs)}</span></div>
          <div class="terminal-line">${escapeHTML(d.langsList)}</div>
          <div class="terminal-line"></div>
          <div class="terminal-line"><span class="cyan">${escapeHTML(d.frameworks)}</span></div>
          <div class="terminal-line">${escapeHTML(d.frameworksList)}</div>
          <div class="terminal-line"></div>
          <div class="terminal-line"><span class="cyan">${escapeHTML(d.tools)}</span></div>
          <div class="terminal-line">${escapeHTML(d.toolsList)}</div>
          <div class="terminal-line"></div>
          <div class="terminal-line"><span class="dim">${escapeHTML(d.total)}</span></div>
        `;
      },

      status: () => {
        // Lê do dicionário i18n (dict().status.text) em vez de consts inline
        // para manter uma única fonte da verdade.
        const text = dict().status.text;
        return `
          <div class="terminal-line"><span class="green">●</span> ${escapeHTML(text)}</div>
        `;
      },

      contact: () => {
        const d = dict().contact;
        // Cor dos links via classe `.term-link` (definida no CSS) para
        // acompanhar o tema light/dark sem hardcode de cor.
        return `
          <div class="terminal-line"><span class="cyan">${escapeHTML(d.emailLabel)}</span></div>
          <div class="terminal-line">   <a class="term-link" href="mailto:mariliagpedrosa@outlook.com">mariliagpedrosa@outlook.com</a></div>
          <div class="terminal-line"></div>
          <div class="terminal-line"><span class="cyan">${escapeHTML(d.linkedinLabel)}</span></div>
          <div class="terminal-line">   <a class="term-link" href="https://www.linkedin.com/in/mar%C3%ADlia-mezalheira/" target="_blank" rel="noopener noreferrer">https://www.linkedin.com/in/marília-mezalheira/</a></div>
          <div class="terminal-line"></div>
          <div class="terminal-line"><span class="cyan">${escapeHTML(d.githubLabel)}</span></div>
          <div class="terminal-line">   <a class="term-link" href="https://github.com/mariliamezalheiradev" target="_blank" rel="noopener noreferrer">https://github.com/mariliamezalheiradev</a></div>
        `;
      },

      clear: () => {
        terminalOutput.innerHTML = '';
        return null;
      }
    });

    const initialState = () => {
      // Estado inicial vazio: apenas o prompt ~$ aguardando comando.
      // A lista de comandos só aparece quando o usuário digita `help`.
      terminalOutput.innerHTML =
        `<div class="terminal-line"><span class="prompt-symbol">~$</span> <span class="terminal-cursor"></span></div>`;
    };

    function rerender() {
      initialState();
    }
    window.__rerenderTerminal = rerender;

    initialState();

    terminalInput.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter') return;

      const raw = terminalInput.value;
      const inputValue = raw.trim().toLowerCase();
      terminalInput.value = '';

      if (!raw.trim()) { printPrompt(''); return; }

      printPrompt(raw.trim());

      const commands = buildCommands();
      if (commands[inputValue]) {
        const result = commands[inputValue]();
        if (result !== null && result !== undefined && result !== '') print(result);
        if (inputValue === 'clear') setTimeout(initialState, 50);
      } else {
        const d = dict();
        print(`<div class="terminal-line"><span class="pink">${escapeHTML(d.notFound)}</span> ${escapeHTML(raw.trim())}. ${escapeHTML(d.notFoundHint)}</div>`);
      }

      terminalOutput.scrollTop = terminalOutput.scrollHeight;
    });

    document.querySelector('.terminal-wrapper')?.addEventListener('click', () => {
      terminalInput.focus();
    });

    terminalReady = true;
  }

  function rerenderTerminal() {
    if (!terminalReady) return;
    if (typeof window.__rerenderTerminal === 'function') window.__rerenderTerminal();
  }

  /* ============================================
     INTERSECTION OBSERVER (reveal fallback)
     ============================================ */
  function initRevealObserver() {
    const reveals = document.querySelectorAll('.reveal, .section-label, .section-title');
    if (!('IntersectionObserver' in window) || reveals.length === 0) {
      reveals.forEach((el) => el.classList.add('visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
    }, { threshold: 0.05, rootMargin: '0px 0px -10px 0px' });
    reveals.forEach((el) => observer.observe(el));
  }

  /* ============================================
     BOTÕES DE SCROLL + MENU
     ============================================ */
  function initScrollButtons() {
    document.querySelectorAll('.menu-fixo a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        const id = link.getAttribute('href');
        if (id && id.length > 1) {
          const target = document.querySelector(id);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });
  }

  /* ============================================
     FALLBACK DE IMAGENS
     Estratégia de 2 tentativas (espelha o data-retry do onerror inline):
       1ª falha → tenta o arquivo local (fallback)
       2ª falha → esconde a imagem e mostra o placeholder
     O atributo `data-retry` impede loop infinito.
     ============================================ */
  function initImageFallbacks() {
    document.querySelectorAll('.projeto-img').forEach((img) => {
      img.addEventListener('error', () => {
        const placeholder = img.nextElementSibling;
        if (!placeholder || !placeholder.classList.contains('media-placeholder')) {
          img.style.display = 'none';
          return;
        }
        if (!img.hasAttribute('data-retry')) {
          // 1ª falha: tenta o fallback local antes de desistir.
          img.setAttribute('data-retry', 'true');
          // Extrai apenas o basename do src atual para apontar para a versão local.
          const src = img.getAttribute('src') || '';
          const filename = src.split('/').pop();
          if (filename) img.src = 'imagens/' + filename;
        } else {
          // 2ª falha (fallback local também ausente): mostra o placeholder.
          img.style.display = 'none';
          placeholder.style.display = 'flex';
        }
      });
    });
  }

  /* ============================================
     PARALLAX DOS ORBS NO MOUSE
     ============================================ */
  function initOrbParallax() {
    if (isTouchDevice) return;
    const orb1 = document.querySelector('.orb-1');
    const orb2 = document.querySelector('.orb-2');
    const orb3 = document.querySelector('.orb-3');
    if (!orb1 || !orb2 || !orb3) return;
    document.addEventListener('mousemove', (e) => {
      const cx = window.innerWidth  / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      orb1.style.transform = `translate(${dx * 24}px, ${dy * 18}px)`;
      orb2.style.transform = `translate(${-dx * 18}px, ${-dy * 12}px)`;
      orb3.style.transform = `translate(calc(-50% + ${dx * 12}px), calc(-50% + ${dy * 12}px))`;
    });
  }

  /* ============================================
     TOPBAR SCROLL (transparente → sólido)
     ============================================ */
  function initTopbarScroll() {
    const topbar = document.getElementById('topbar');
    if (!topbar) return;
    const trigger = 80;
    function onScroll() {
      topbar.classList.toggle('is-scrolled', window.scrollY > trigger);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ============================================
     TOGGLES (Idioma + Tema)
     ============================================ */
  function initToggles() {
    const langBtn = document.getElementById('langToggle');
    const themeBtn = document.getElementById('themeToggle');

    if (langBtn) {
      langBtn.addEventListener('click', () => {
        applyLang(currentLang === 'pt' ? 'en' : 'pt');
      });
    }
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
      });
    }
  }

  /* ============================================
     INIT
     ============================================ */
  function bootstrap() {
    // Aplica estado persistido ANTES de inicializar componentes que dependem do dicionário
    applyTheme(currentTheme);
    applyLang(currentLang);

    initParticles();
    initGSAP();
    initTyped();
    initTerminal();
    initRevealObserver();
    initScrollButtons();
    initImageFallbacks();
    initOrbParallax();
    initTopbarScroll();
    initToggles();
  }

  if (document.readyState === 'loading') {
    window.addEventListener('load', bootstrap);
  } else {
    window.addEventListener('load', bootstrap);
  }
})();
