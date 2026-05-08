/**
 * Filomena Propaganda - Minimalista
 * JavaScript Interatividade
 */

document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    initTheme();

    // Mobile Menu
    initMobileMenu();

    // Scroll Animations
    initScrollAnimations();
    
    // Parallax Effects
    initParallax();

    // Counter Animation
    initCounters();

    // Form Handler
    initForm();

    // Smooth Scroll
    initSmoothScroll();
});

// ==========================================
// THEME
// ==========================================
function initTheme() {
    const toggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'light';

    document.documentElement.setAttribute('data-theme', savedTheme);

    toggle?.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });
}

// ==========================================
// MOBILE MENU
// ==========================================
function initMobileMenu() {
    const toggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('nav-menu');

    toggle?.addEventListener('click', () => {
        menu?.classList.toggle('show');
        toggle.classList.toggle('active');
    });

    // Close menu on link click
    menu?.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('show');
            toggle?.classList.remove('active');
        });
    });
}

// ==========================================
// SCROLL ANIMATIONS
// ==========================================
function initScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

// ==========================================
// PARALLAX ANIMATION
// ==========================================
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-text-bg');
    if (!parallaxElements.length) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        // Usar requestAnimationFrame para animação ultra-suave
        window.requestAnimationFrame(() => {
            parallaxElements.forEach(el => {
                const speed = parseFloat(el.getAttribute('data-speed')) || 0.2;
                const xPos = -(scrolled * speed);
                el.style.transform = `translateY(-50%) translateX(${xPos}px)`;
            });
        });
    }, { passive: true }); // passive: true melhora performance do scroll
}

// ==========================================
// COUNTER ANIMATION
// ==========================================
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.dataset.count);
    const duration = 2000;
    const start = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);

        // Easing
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);

        element.textContent = current.toLocaleString('pt-BR');

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// ==========================================
// FORM HANDLER
// ==========================================
function initForm() {
    const form = document.querySelector('.contact__form');

    form?.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.textContent;

        btn.textContent = 'Enviando...';
        btn.disabled = true;

        // Simulate submission
        setTimeout(() => {
            btn.textContent = 'Enviado com sucesso!';
            btn.style.background = '#22c55e';

            setTimeout(() => {
                form.reset();
                btn.textContent = originalText;
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
        }, 1500);
    });
}

// ==========================================
// SMOOTH SCROLL
// ==========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================
// PORTFOLIO MODAL
// ==========================================
function initPortfolioModal() {
    const modal = document.getElementById('projectModal');
    const modalFrame = document.getElementById('modalFrame');
    const modalTitle = document.getElementById('modalTitle');
    const modalLink = document.getElementById('modalLink');
    const closeBtn = document.getElementById('closeModal');
    const backdrop = document.querySelector('.project-modal__backdrop');

    // Cards que abrem o modal
    const portfolioCards = document.querySelectorAll('.portfolio-card[data-project]');

    portfolioCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            const projectId = card.dataset.project;
            const title = card.dataset.title;

            // Configura o modal
            modalTitle.textContent = title;
            modalFrame.src = `https://www.behance.net/embed/project/${projectId}?ilo0=1`;
            modalLink.href = `https://www.behance.net/gallery/${projectId}`;

            // Abre o modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Fechar modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        modalFrame.src = '';
    }

    closeBtn?.addEventListener('click', closeModal);
    backdrop?.addEventListener('click', closeModal);

    // Fechar com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Inicializa o modal se existir na página
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('projectModal')) {
        initPortfolioModal();
    }

    // Service cards modal
    initServiceCards();
});

// ==========================================
// SERVICE CARDS MODAL
// ==========================================
function initServiceCards() {
    const cards = document.querySelectorAll('.service-card, .service-card-h');
    const modal = document.getElementById('serviceModal');
    if (!cards.length || !modal) return;

    const closeBtn = document.getElementById('closeServiceModal');
    const backdrop = modal.querySelector('.service-modal__backdrop');
    const titleEl = document.getElementById('serviceModalTitle');
    const descEl = document.getElementById('serviceModalDescription');
    const listEl = document.getElementById('serviceModalList');

    // Dados dos serviços
    const servicesData = {
        branding: {
            title: 'Branding & Identidade',
            description: 'Desenvolvemos identidades visuais completas que traduzem a essência da sua marca. Nossa equipe cria desde o logotipo até o manual completo de aplicação, garantindo consistência em todos os pontos de contato com seu público.',
            features: [
                'Criação e redesign de logotipos',
                'Manual de identidade visual completo',
                'Naming e desenvolvimento de taglines',
                'Papelaria e materiais corporativos',
                'Design de embalagens',
                'Aplicação em mídias digitais e offline'
            ]
        },
        marketing: {
            title: 'Marketing Digital',
            description: 'Criamos estratégias digitais personalizadas que conectam sua marca ao público certo. Utilizamos dados e criatividade para gerar resultados mensuráveis e construir presença online sólida.',
            features: [
                'Campanhas Google Ads e Meta Ads',
                'SEO e otimização para buscadores',
                'Gestão completa de redes sociais',
                'E-mail marketing e automação',
                'Inbound marketing e conteúdo',
                'Análise de métricas e relatórios'
            ]
        },
        audiovisual: {
            title: 'Produção Audiovisual',
            description: 'Produzimos conteúdo audiovisual de alta qualidade que conta a história da sua marca de forma envolvente. Da concepção ao produto final, cuidamos de cada detalhe.',
            features: [
                'Vídeos institucionais e corporativos',
                'Comerciais para TV e plataformas digitais',
                'Conteúdo para redes sociais',
                'Fotografia publicitária e de produtos',
                'Motion graphics e animações',
                'Cobertura de eventos'
            ]
        },
        midia: {
            title: 'Planejamento de Mídia',
            description: 'Desenvolvemos estratégias de mídia integradas que maximizam o alcance e a eficiência das suas campanhas. Selecionamos os melhores canais para atingir seu público-alvo.',
            features: [
                'Mídia offline (TV, rádio, outdoor)',
                'Mídia programática e display',
                'Planejamento de investimento',
                'Análise de ROI e performance',
                'Relatórios detalhados',
                'Otimização contínua de campanhas'
            ]
        },
        criacao: {
            title: 'Criação',
            description: 'Desenvolvemos campanhas criativas e materiais gráficos impactantes que comunicam sua mensagem de forma eficaz. Nossa equipe combina estratégia e criatividade para resultados memoráveis.',
            features: [
                'Campanhas publicitárias',
                'Design de peças gráficas',
                'Materiais promocionais',
                'Comunicação visual',
                'Criação de conteúdo',
                'Direção de arte'
            ]
        },
        consultoria: {
            title: 'Consultoria',
            description: 'Oferecemos análise estratégica e consultoria personalizada para otimizar suas ações de comunicação e marketing. Identificamos oportunidades e desenvolvemos planos de ação eficientes.',
            features: [
                'Diagnóstico de marca',
                'Análise de mercado e concorrência',
                'Planejamento estratégico',
                'Análise de dados e métricas',
                'Recomendações de investimento',
                'Otimização de resultados'
            ]
        }
    };

    function openModal(serviceKey) {
        const data = servicesData[serviceKey];
        if (!data) return;

        titleEl.textContent = data.title;
        descEl.textContent = data.description;
        listEl.innerHTML = data.features.map(f => `<li>${f}</li>`).join('');

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const serviceKey = card.dataset.service;
            openModal(serviceKey);
        });
    });

    closeBtn?.addEventListener('click', closeModal);
    backdrop?.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// ==========================================
// SERVICE DETAILS INLINE
// ==========================================
function initServiceDetails() {
    const cards = document.querySelectorAll('.service-card');
    const details = document.getElementById('serviceDetails');
    if (!cards.length || !details) return;

    const closeBtn = document.getElementById('closeServiceDetails');
    const numEl = document.getElementById('serviceDetailsNum');
    const titleEl = document.getElementById('serviceDetailsTitle');
    const descEl = document.getElementById('serviceDetailsDescription');
    const listEl = document.getElementById('serviceDetailsList');

    // Dados dos serviços
    const servicesData = {
        branding: {
            num: '01',
            title: 'Branding & Identidade',
            description: 'Desenvolvemos identidades visuais completas que traduzem a essência da sua marca. Nossa equipe cria desde o logotipo até o manual completo de aplicação, garantindo consistência em todos os pontos de contato com seu público.',
            features: [
                'Criação e redesign de logotipos',
                'Manual de identidade visual completo',
                'Naming e desenvolvimento de taglines',
                'Papelaria e materiais corporativos',
                'Design de embalagens',
                'Aplicação em mídias digitais e offline'
            ]
        },
        marketing: {
            num: '02',
            title: 'Marketing Digital',
            description: 'Criamos estratégias digitais personalizadas que conectam sua marca ao público certo. Utilizamos dados e criatividade para gerar resultados mensuráveis.',
            features: [
                'Campanhas Google Ads e Meta Ads',
                'SEO e otimização para buscadores',
                'Gestão completa de redes sociais',
                'E-mail marketing e automação',
                'Inbound marketing e conteúdo',
                'Análise de métricas e relatórios'
            ]
        },
        audiovisual: {
            num: '03',
            title: 'Produção Audiovisual',
            description: 'Produzimos conteúdo audiovisual de alta qualidade que conta a história da sua marca de forma envolvente. Da concepção ao produto final, cuidamos de cada detalhe.',
            features: [
                'Vídeos institucionais e corporativos',
                'Comerciais para TV e plataformas digitais',
                'Conteúdo para redes sociais',
                'Fotografia publicitária e de produtos',
                'Motion graphics e animações',
                'Cobertura de eventos'
            ]
        },
        midia: {
            num: '04',
            title: 'Planejamento de Mídia',
            description: 'Desenvolvemos estratégias de mídia integradas que maximizam o alcance e a eficiência das suas campanhas.',
            features: [
                'Mídia offline (TV, rádio, outdoor)',
                'Mídia programática e display',
                'Planejamento de investimento',
                'Análise de ROI e performance',
                'Relatórios detalhados',
                'Otimização contínua de campanhas'
            ]
        },
        criacao: {
            num: '05',
            title: 'Criação',
            description: 'Desenvolvemos campanhas criativas e materiais gráficos impactantes que comunicam sua mensagem de forma eficaz.',
            features: [
                'Campanhas publicitárias',
                'Design de peças gráficas',
                'Materiais promocionais',
                'Comunicação visual',
                'Criação de conteúdo',
                'Direção de arte'
            ]
        },
        consultoria: {
            num: '06',
            title: 'Consultoria',
            description: 'Oferecemos análise estratégica e consultoria personalizada para otimizar suas ações de comunicação e marketing.',
            features: [
                'Diagnóstico de marca',
                'Análise de mercado e concorrência',
                'Planejamento estratégico',
                'Análise de dados e métricas',
                'Recomendações de investimento',
                'Otimização de resultados'
            ]
        }
    };

    let activeCard = null;

    function showDetails(serviceKey, card) {
        const data = servicesData[serviceKey];
        if (!data) return;

        // Remove active de card anterior
        if (activeCard) activeCard.classList.remove('active');

        // Marca card atual
        card.classList.add('active');
        activeCard = card;

        // Preenche dados
        numEl.textContent = data.num;
        titleEl.textContent = data.title;
        descEl.textContent = data.description;
        listEl.innerHTML = data.features.map(f => `<li>${f}</li>`).join('');

        // Mostra detalhes
        details.classList.add('active');

        // Scroll suave para os detalhes
        setTimeout(() => {
            details.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }

    function hideDetails() {
        details.classList.remove('active');
        if (activeCard) {
            activeCard.classList.remove('active');
            activeCard = null;
        }
    }

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const serviceKey = card.dataset.service;
            if (activeCard === card && details.classList.contains('active')) {
                hideDetails();
            } else {
                showDetails(serviceKey, card);
            }
        });
    });

    closeBtn?.addEventListener('click', hideDetails);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && details.classList.contains('active')) {
            hideDetails();
        }
    });
}

// Inicializa detalhes de serviço
document.addEventListener('DOMContentLoaded', () => {
    initServiceDetails();
});






// --- Flying Bird Video Scroll Animation ---
document.addEventListener("DOMContentLoaded", () => {
    const birdVideo = document.createElement("video");
    birdVideo.src = "assets/videos/passaro_voando.mp4";
    birdVideo.className = "flying-bird-video";
    birdVideo.loop = true;
    birdVideo.muted = true;
    birdVideo.playsInline = true;
    
    document.body.appendChild(birdVideo);

    let currentX = -300;
    let targetX = -300;
    let currentY = 0;
    let targetY = 0;
    let currentRot = 0;
    let targetRot = 0;
    
    let isScrolling;

window.addEventListener("scroll", () => {
        // Calculate total scrollable height safely
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const scrollPercent = window.scrollY / (docHeight - window.innerHeight);
        
        // Passaro voa mais devagar, do canto esquerdo ate o direito cobrindo 100% do scroll
        targetX = -100 + (scrollPercent * (window.innerWidth + 200));
        
        // Voa para cima e para baixo suavemente
        targetY = Math.sin(scrollPercent * Math.PI * 4) * 80;
        
        // Inclina levemente dependendo do movimento
        targetRot = Math.cos(scrollPercent * Math.PI * 4) * 10;
        
        if (birdVideo.paused) {
            birdVideo.play();
        }
        
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(function() {
            birdVideo.pause();
        }, 150);
    });

    function animateBird() {
        currentX += (targetX - currentX) * 0.05;
        currentY += (targetY - currentY) * 0.05;
        currentRot += (targetRot - currentRot) * 0.05;
        
        birdVideo.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${currentRot}deg)`;
        requestAnimationFrame(animateBird);
    }
    
    animateBird();
});
