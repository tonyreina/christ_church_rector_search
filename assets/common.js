// Page configuration data
const PAGE_CONFIGS = {
    'index': {
        title: 'Welcome • Rector Search',
        heroImage: 'assets/hero_home.jpg',
        heroAlt: 'Christ Church Coronado',
        heroDescription: 'Christ Episcopal Church in Coronado, California — a vibrant, worshiping, beachside community shaped by prayer, fellowship, and service.',
        heroLink: 'https://en.wikipedia.org/wiki/Coronado,_California'
    },
    'worship': {
        title: 'Worship • Rector Search',
        heroImage: '../assets/worship_congregation.jpg',
        heroAlt: 'Worship at Christ Church Coronado',
        heroDescription: 'Christ Episcopal Church in Coronado, California — a vibrant worshiping community shaped by prayer, fellowship, and service.'
    },
    'youth_family': {
        title: 'Youth & Family • Rector Search',
        heroImage: '../assets/hero_youth.jpg',
        heroAlt: 'Youth and Family Ministry',
        heroDescription: 'Christ Episcopal Church in Coronado, California — a vibrant worshiping community shaped by prayer, fellowship, and service.'
    },
    'service_ministry': {
        title: 'Service Ministry • Rector Search',
        heroImage: '../assets/hero_service.jpg',
        heroAlt: 'Service Ministry',
        heroDescription: 'Christ Episcopal Church in Coronado, California — a vibrant worshiping community shaped by prayer, fellowship, and service.'
    },
    'day_school': {
        title: 'Christ Church Day School • Rector Search',
        heroImage: '../assets/hero_school.webp',
        heroAlt: 'Christ Church Day School',
        heroDescription: 'Christ Episcopal Church in Coronado, California — a vibrant worshiping community shaped by prayer, fellowship, and service.'
    },
    'thrift_shop': {
        title: 'Thrift Shop • Rector Search',
        heroImage: '../assets/thrift_shoppers.jpg',
        heroAlt: 'Christ Church Thrift Shop',
        heroDescription: 'Christ Episcopal Church in Coronado, California — a vibrant worshiping community shaped by prayer, fellowship, and service.'
    },
    'music_liturgy': {
        title: 'Choir & Altar Guild • Rector Search',
        heroImage: '../assets/hero_music.jpg',
        heroAlt: 'Music Ministry',
        heroDescription: 'Christ Episcopal Church in Coronado, California — a vibrant worshiping community shaped by prayer, fellowship, and service.'
    }
};

// Detect if we're on index page or subpage
function getPageInfo() {
    const path = window.location.pathname;
    const isIndex = path.endsWith('index.html') || path.endsWith('/');
    const pathPrefix = isIndex ? '' : '../';
    const pagePathPrefix = isIndex ? 'pages/' : '';

    // Determine active page
    let activePage = 'index';
    if (path.includes('worship.html')) activePage = 'worship';
    else if (path.includes('youth_family.html')) activePage = 'youth_family';
    else if (path.includes('service_ministry.html')) activePage = 'service_ministry';
    else if (path.includes('day_school.html')) activePage = 'day_school';
    else if (path.includes('thrift_shop.html')) activePage = 'thrift_shop';
    else if (path.includes('music_liturgy.html')) activePage = 'music_liturgy';

    return { isIndex, pathPrefix, pagePathPrefix, activePage };
}

// Set page title dynamically
function setPageTitle() {
    const { activePage } = getPageInfo();
    const config = PAGE_CONFIGS[activePage];
    if (config && config.title) {
        document.title = config.title;
    }
}

// Generate hero section
function generateHeroSection() {
    const { activePage, pathPrefix, pagePathPrefix } = getPageInfo();
    const config = PAGE_CONFIGS[activePage];
    const heroContainer = document.getElementById('heroSection');

    if (!heroContainer || !config) return;

    const descriptionHTML = config.heroLink
        ? `Christ Episcopal Church in <a href="${config.heroLink}" target="_blank"
            rel="noopener noreferrer" class="underline hover:text-white transition-colors">Coronado, California</a>
            — a vibrant, worshiping, beachside community shaped by
            prayer, fellowship, and service.`
        : config.heroDescription;

    // Use darker overlay for lighter images
    const needsDarkerOverlay = ['youth_family', 'thrift_shop', 'music_liturgy'].includes(activePage);
    const overlayClass = needsDarkerOverlay
        ? 'bg-gradient-to-r from-black/75 via-black/50 to-black/20'
        : 'bg-gradient-to-r from-black/55 via-black/25 to-transparent';

    heroContainer.innerHTML = `
      <div class="grid md:grid-cols-5 h-full">
        <div class="md:col-span-3 relative h-full">
          <img src="${config.heroImage}" alt="${config.heroAlt}"
            class="parallax-img absolute inset-0 z-0" loading="eager" />
          <div class="absolute inset-0 z-10 ${overlayClass}"></div>
          <div class="absolute left-6 bottom-6 right-6 z-20">
            <div class="text-white text-sm uppercase tracking-wide">Bridging Love &amp; Service</div>
            <h1 class="text-white text-3xl md:text-4xl font-semibold tracking-tight mt-2">Rector Search</h1>
            <p class="text-white/90 mt-2 max-w-xl">
              ${descriptionHTML}
            </p>
          </div>
        </div>
        <div class="md:col-span-2 p-6 md:p-8">
          <div class="text-sm uppercase tracking-wide text-[var(--muted)]">Visit us</div>
          <div class="mt-2 font-semibold text-[var(--ink)]">Sundays at 8 & 10 AM</div>
          <div class="text-[var(--muted)] mt-1">Holy Eucharist • All are welcome</div>
          <div class="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 flex gap-3 items-start">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round" class="text-[var(--sage)] flex-shrink-0 mt-0.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <div class="flex-1">
              <a href="https://www.google.com/maps/place/1114+Ninth+Street,+Coronado,+CA+92118" target="_blank"
                rel="noopener noreferrer" class="text-[var(--ink)] font-medium hover:underline">1114 Ninth Street</a>
              <div class="text-[var(--muted)]">Coronado, CA 92118</div>
              <a href="tel:+16194354561" class="text-[var(--muted)] hover:underline">(619) 435-4561</a>
            </div>
            <img src="${pathPrefix}assets/logo.png" 
              alt="Christ Church Logo" class="flex-shrink-0 self-center" style="width: 144px; height: auto;" loading="lazy" />
          </div>
          <div class="mt-5 flex flex-wrap gap-2">
            <a class="rounded-xl border border-slate-200 px-4 py-2 hover:bg-slate-100 flex items-center gap-2"
              href="https://christchurchcoronado.org/news-and-events" target="_blank" rel="noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
              Website
            </a>
            <a class="rounded-xl border border-slate-200 px-4 py-2 hover:bg-slate-100 flex items-center gap-2"
              href="https://christchurchcoronado.org/live-stream" target="_blank" rel="noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              Live Stream
            </a>
            <a class="rounded-xl border border-slate-200 px-4 py-2 hover:bg-slate-100 flex items-center gap-2"
              href="https://www.instagram.com/nadochristchurch" target="_blank" rel="noopener noreferrer"
              aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              Instagram
            </a>
          </div>
        </div>
      </div>
    `;
}

// Generate bottom cards section
function generateBottomCards() {
    const cardsContainer = document.getElementById('bottomCards');
    if (!cardsContainer) return;

    cardsContainer.innerHTML = `
      <div class="cc-card p-6">
        <div class="font-semibold">Our motto</div>
        <div class="mt-2 text-[var(--muted)]">Bridging Love and Service</div>
      </div>
      <div class="cc-card p-6">
        <div class="font-semibold"><a href="https://christchurchcoronado.org/news-and-events" target="_blank">Website</a></div>
        <div class="mt-2 text-[var(--muted)]">Rite I & Rite II, with a rich musical life.</div>
      </div>
      <div class="cc-card p-6">
        <div class="font-semibold">In the community</div>
        <div class="mt-2 text-[var(--muted)]">Service, outreach, and an impactful ministry.</div>
      </div>
    `;
}

// Generate header HTML
function generateHeader() {
    const { pathPrefix, pagePathPrefix, activePage } = getPageInfo();

    const header = document.getElementById('siteHeader');
    if (!header) return;

    header.innerHTML = `
    <!-- Scroll Progress Indicator -->
    <div class="scroll-progress" id="scrollProgress"></div>
    
    <div class="sticky top-0 z-50 cc-topbar" id="header">
        <div class="cc-shell py-4 flex items-center justify-between gap-4">
            <a href="${pathPrefix}index.html" class="flex items-center gap-3">
                <img src="${pathPrefix}assets/episcopal_shield.svg" alt="Episcopal Church Shield"
                    class="h-10 w-10 rounded-2xl object-contain bg-white border border-slate-200 p-1" />
                <div class="leading-tight">
                    <div class="font-semibold">Christ Church</div>
                    <div class="text-sm text-[var(--muted)]">Rector Search • Coronado, CA</div>
                    <div class="text-xs text-[var(--muted)]"><a
                        href="https://www.google.com/maps/place/1114+Ninth+Street,+Coronado,+CA+92118" target="_blank"
                        rel="noopener noreferrer" class="hover:underline">1114 Ninth Street, Coronado, CA 92118</a> • <a
                        href="tel:+16194354561" class="hover:underline">(619) 435-4561</a></div>
                </div>
            </a>

            <button id="menuBtn" class="md:hidden cc-btn">Menu</button>

            <nav class="hidden md:flex items-center gap-1 cc-nav">
                <a class="${activePage === 'index' ? 'is-active' : ''}" href="${pathPrefix}index.html">Welcome</a>
                <a class="${activePage === 'worship' ? 'is-active' : ''}" href="${pagePathPrefix}worship.html">Worship</a>
                <a class="${activePage === 'youth_family' ? 'is-active' : ''}" href="${pagePathPrefix}youth_family.html">Youth & Family</a>
                <a class="${activePage === 'service_ministry' ? 'is-active' : ''}" href="${pagePathPrefix}service_ministry.html">Service Ministry</a>
                <a class="${activePage === 'day_school' ? 'is-active' : ''}" href="${pagePathPrefix}day_school.html">Christ Church Day School</a>
                <a class="${activePage === 'thrift_shop' ? 'is-active' : ''}" href="${pagePathPrefix}thrift_shop.html">Thrift Shop</a>
                <a class="${activePage === 'music_liturgy' ? 'is-active' : ''}" href="${pagePathPrefix}music_liturgy.html">Choir & Altar Guild</a>
            </nav>
        </div>

        <div id="mobileNav" class="md:hidden hidden border-t border-[var(--line)] bg-[rgba(246,241,232,.96)]">
            <div class="cc-shell py-3 flex flex-col gap-2 cc-nav">
                <a class="${activePage === 'index' ? 'is-active' : ''}" href="${pathPrefix}index.html">Welcome</a>
                <a class="${activePage === 'worship' ? 'is-active' : ''}" href="${pagePathPrefix}worship.html">Worship</a>
                <a class="${activePage === 'youth_family' ? 'is-active' : ''}" href="${pagePathPrefix}youth_family.html">Youth & Family</a>
                <a class="${activePage === 'service_ministry' ? 'is-active' : ''}" href="${pagePathPrefix}service_ministry.html">Service Ministry</a>
                <a class="${activePage === 'day_school' ? 'is-active' : ''}" href="${pagePathPrefix}day_school.html">Christ Church Day School</a>
                <a class="${activePage === 'thrift_shop' ? 'is-active' : ''}" href="${pagePathPrefix}thrift_shop.html">Thrift Shop</a>
                <a class="${activePage === 'music_liturgy' ? 'is-active' : ''}" href="${pagePathPrefix}music_liturgy.html">Choir & Altar Guild</a>
            </div>
        </div>
    </div>
    `;
}

// Generate footer HTML
function generateFooter() {
    const { pagePathPrefix } = getPageInfo();

    const footer = document.getElementById('siteFooter');
    if (!footer) return;

    footer.innerHTML = `
    <div class="cc-shell py-8 text-sm text-[var(--muted)] flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>© 2026 Christ Church • Rector Search</div>
        <div class="flex gap-4">
            <a class="hover:underline" href="${pagePathPrefix}worship.html">Worship</a>
            <a class="hover:underline" href="${pagePathPrefix}service_ministry.html">Service</a>
            <a class="hover:underline" href="https://www.instagram.com/nadochristchurch" target="_blank"
                rel="noopener noreferrer">Instagram</a>
        </div>
    </div>
    `;
}

// Generate back to top button
function generateBackToTop() {
    const btn = document.getElementById('backToTopBtn');
    if (!btn) return;

    btn.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round">
        <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
    `;
}

// Mobile menu toggle - must be set up after header is generated
function setupMobileMenu() {
    const btn = document.getElementById('menuBtn');
    const nav = document.getElementById('mobileNav');
    if (btn && nav) {
        btn.addEventListener('click', () => nav.classList.toggle('hidden'));
    }
}

// Scroll progress indicator
function updateScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    const header = document.getElementById('header');
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (scrollProgress) {
        scrollProgress.style.width = scrolled + '%';
    }

    // Add shadow to header on scroll
    if (header) {
        if (winScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
}

window.addEventListener('scroll', updateScrollProgress, { passive: true });

// Back to top button
function toggleBackToTop() {
    const backToTop = document.getElementById('backToTopBtn');
    const scrollPos = window.scrollY || document.documentElement.scrollTop;
    if (backToTop) {
        if (scrollPos > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
}

function setupBackToTop() {
    const backToTop = document.getElementById('backToTopBtn');
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        backToTop.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe panels for reveal animation
const panelObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

// Function to set up observers for dynamic content
function setupObservers() {
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        // Check if element is already in viewport
        const rect = el.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

        if (isInViewport) {
            // If already in viewport, make it visible immediately
            el.classList.add('visible');
        }

        fadeInObserver.observe(el);
    });

    // Observe all panels
    document.querySelectorAll('.cc-panel').forEach(el => {
        panelObserver.observe(el);
    });
}

// Parallax effect for hero image
const parallaxImg = document.querySelector('.parallax-img');
const heroSection = document.getElementById('heroSection');

function handleParallax() {
    if (parallaxImg && heroSection && window.innerWidth >= 768) {
        const scrolled = window.scrollY;
        const heroTop = heroSection.offsetTop;
        const heroHeight = heroSection.offsetHeight;

        if (scrolled < heroTop + heroHeight) {
            const yPos = (scrolled - heroTop) * 0.3;
            parallaxImg.style.transform = `translateY(${yPos}px)`;
        }
    }
}

window.addEventListener('scroll', handleParallax, { passive: true });

// Allow escape to close mobile menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const nav = document.getElementById('mobileNav');
        if (nav && !nav.classList.contains('hidden')) {
            nav.classList.add('hidden');
        }
    }
});

// Preload critical images on hover
const links = document.querySelectorAll('a[href*=".html"]');
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        const href = link.getAttribute('href');
        if (href && !link.dataset.preloaded) {
            const preloadLink = document.createElement('link');
            preloadLink.rel = 'prefetch';
            preloadLink.href = href;
            document.head.appendChild(preloadLink);
            link.dataset.preloaded = 'true';
        }
    }, { once: true });
});

// Animated list cycling (used on index.html)
function animateList() {
    const list = document.getElementById('rector-hopes');
    if (!list) return;

    const items = list.querySelectorAll('li');
    let currentIndex = 0;

    function highlightNext() {
        // Remove active class from all items
        items.forEach(item => item.classList.remove('active'));

        // Add active class to current item
        items[currentIndex].classList.add('active');

        // Move to next item
        currentIndex = (currentIndex + 1) % items.length;
    }

    // Start with first item
    highlightNext();

    // Cycle every 2.5 seconds
    setInterval(highlightNext, 30000);
}

// Initialize on load
window.addEventListener('load', () => {
    // Set page title
    setPageTitle();

    // Generate hero section and bottom cards
    generateHeroSection();
    generateBottomCards();

    // Generate header, footer, and back-to-top button
    generateHeader();
    generateFooter();
    generateBackToTop();

    // Set up event handlers after elements are generated
    setupMobileMenu();
    setupBackToTop();

    // Set up scroll listeners
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    window.addEventListener('scroll', handleParallax, { passive: true });

    // Initialize other features
    updateScrollProgress();
    toggleBackToTop();
    handleParallax();
    animateList();

    // Initialize ministry profile items and rotation if present
    if (typeof generateMinistryProfileItems === 'function') {
        generateMinistryProfileItems();
    }
    if (typeof rotateMinistryProfile === 'function') {
        rotateMinistryProfile();
    }

    // Set up observers after all content has been generated
    setupObservers();
});
