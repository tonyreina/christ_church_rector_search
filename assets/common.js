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
                <img src="${pathPrefix}assets/logo.png" alt="Christ Church Coronado logo"
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

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    fadeInObserver.observe(el);
});

// Observe panels for reveal animation
const panelObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

document.querySelectorAll('.cc-panel').forEach(el => {
    panelObserver.observe(el);
});

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

// Improve focus visibility for accessibility
document.addEventListener('mousedown', () => {
    document.body.classList.add('using-mouse');
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.remove('using-mouse');
    }

    // Allow escape to close mobile menu
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
    setInterval(highlightNext, 2500);
}

// Initialize on load
window.addEventListener('load', () => {
    // Generate header, footer, and back-to-top button first
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
});
