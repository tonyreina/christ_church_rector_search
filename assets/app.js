// Slideshow setup for dynamically loaded content
function setupSlideshows() {
    var slideshows = document.querySelectorAll('.slideshow');
    console.log('Setting up slideshows, found:', slideshows.length);
    slideshows.forEach(function (slideshow) {
        var slides = slideshow.querySelectorAll('.slide');
        console.log('Slideshow found with', slides.length, 'slides');
        // Remove any existing active classes
        slides.forEach(slide => slide.classList.remove('active'));
        var current = 0;
        if (slides.length > 0) {
            slides[current].classList.add('active');
            console.log('Set first slide to active');
        }
        if (slides.length < 2) {
            // Only one image, no interval needed
            if (slideshow._intervalId) clearInterval(slideshow._intervalId);
            return;
        }
        // Prevent multiple intervals on repeated calls
        if (slideshow._intervalId) clearInterval(slideshow._intervalId);
        slideshow._intervalId = setInterval(function () {
            slides[current].classList.remove('active');
            current = (current + 1) % slides.length;
            slides[current].classList.add('active');
        }, 7000);
    });
}
// Single Page App for Christ Church Rector Search
// Consolidated JavaScript - replaces common.js and ministry-profile.js

// ===== STATE =====
let contentData = null;
let ministryProfileItems = [];
let currentProfileIndex = 0;
let autoRotateInterval = null;

// ===== CONFIGURATION =====
const MINISTRY_PROFILE_ROTATE_INTERVAL = 60000; // 60 seconds
const RECTOR_HOPES_HIGHLIGHT_INTERVAL = 10000; // 10 seconds

// SVG icons for hero section links, keyed by the "type" field in site.links
const LINK_ICONS = {
    website:    `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`,
    livestream: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`,
    instagram:  `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>`,
    facebook:   `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
    pdf:        `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="11" x2="12" y2="17"></line><line x1="9" y1="14" x2="15" y2="14"></line></svg>`
};

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

function getActivePage() {
    const hash = window.location.hash.slice(1) || 'index';
    return hash;
}

// ===== CONTENT LOADING =====
async function loadContent() {
    try {
        const response = await fetch('assets/content.json');
        contentData = await response.json();
        return contentData;
    } catch (error) {
        console.error('Error loading content:', error);
        return null;
    }
}

// ===== META TAG UPDATES =====
function updateMetaTags(pageData) {
    document.title = pageData.metaTitle || 'Rector Search | Christ Church Coronado';

    const ogTitle = document.getElementById('og-title');
    const ogDesc = document.getElementById('og-description');
    const ogImage = document.getElementById('og-image');

    if (ogTitle) ogTitle.setAttribute('content', pageData.metaTitle || pageData.title);
    if (ogDesc) ogDesc.setAttribute('content', pageData.description);
    if (ogImage) {
        const imageUrl = `https://christchurchcoronado.org/rector-search/${pageData.heroImage}`;
        ogImage.setAttribute('content', imageUrl);
    }

    // Update description meta tag
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) descMeta.setAttribute('content', pageData.description);
}

// ===== NAVIGATION =====
function generateNavigation() {
    const activePage = getActivePage();
    const navItems = contentData.nav;

    const desktopNav = document.getElementById('desktopNav');
    const mobileNav = document.getElementById('mobileNav');

    const navHTML = navItems.map(item =>
        `<a class="${item.page === activePage ? 'is-active' : ''}" href="#${item.page}">${item.label}</a>`
    ).join('');

    if (desktopNav) desktopNav.innerHTML = navHTML;
    if (mobileNav) {
        mobileNav.innerHTML = `<div class="cc-shell py-3 flex flex-col gap-2">${navHTML}</div>`;
    }
}

function setupMobileMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const mobileNav = document.getElementById('mobileNav');

    if (menuBtn && mobileNav) {
        menuBtn.addEventListener('click', () => {
            mobileNav.classList.toggle('hidden');
        });
    }

    // Close mobile menu on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNav && !mobileNav.classList.contains('hidden')) {
            mobileNav.classList.add('hidden');
        }
    });

    // Close mobile menu when clicking a link
    if (mobileNav) {
        mobileNav.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                mobileNav.classList.add('hidden');
            }
        });
    }
}

// ===== HERO SECTION =====
function generateHeroSection(pageData) {
    const heroContainer = document.getElementById('heroSection');
    if (!heroContainer) return;

    const needsDarkerOverlay = ['youth_family', 'thrift_shop', 'music_ministry'].includes(getActivePage());
    const overlayClass = needsDarkerOverlay ? 'hero-overlay-dark' : 'hero-overlay';

    const site = contentData.site;
    const linksHTML = site.links.map(link =>
        `<a class="hero-link-btn" href="${link.url}" target="_blank" rel="noopener noreferrer">${LINK_ICONS[link.type] || ''}${link.label}</a>`
    ).join('');

    heroContainer.innerHTML = `
    <div class="grid grid-5-3-2 h-full">
      <div class="hero-image-container relative h-full">
        <img src="${pageData.heroImage}" alt="${pageData.heroAlt}" class="parallax-img absolute inset-0 z-0" loading="eager" />
        <div class="absolute inset-0 z-10 ${overlayClass}"></div>
        <div class="absolute left-6 bottom-6 right-6 z-20">
          <div class="text-white text-sm uppercase tracking-wide">${site.tagline}</div>
          <h1 class="text-white text-3xl md-text-4xl font-semibold tracking-tight mt-2">Rector Search</h1>
          <p class="text-white-90 mt-2 max-w-xl">${site.heroDescription}</p>
        </div>
      </div>
      <div class="hero-info-container p-6 md-p-8">
        <div class="text-sm uppercase tracking-wide text-muted">Visit us</div>
        <div class="mt-2 font-semibold text-ink">${site.worshipLabel}</div>
        <div class="text-muted mt-1">${site.worshipSubtitle}</div>
        <div class="mt-4 hero-contact-card">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-sage flex-shrink-0 mt-0.5">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <div class="flex-1">
            <a href="${site.address.mapsUrl}" target="_blank" rel="noopener noreferrer" class="text-ink font-medium hover-underline">${site.address.street}</a>
            <div class="text-muted">${site.address.city}</div>
            <a href="${site.phone.tel}" class="text-muted hover-underline">${site.phone.display}</a>
          </div>
          <img src="assets/logo.png" alt="Christ Church Logo" class="flex-shrink-0 self-center logo-img" loading="lazy" />
        </div>
        <div class="mt-5 flex flex-wrap gap-2">
          ${linksHTML}
        </div>
      </div>
    </div>
  `;
}

// ===== MAIN CONTENT =====
function renderPageContent(pageData) {
    const container = document.getElementById('mainContent');
    if (!container) return;

    let html = '';

    pageData.sections.forEach((section, index) => {
        const contentHtml = Array.isArray(section.content) ? section.content.join('') : section.content;
        html += `
            <section class="cc-panel cc-content fade-in">
                <div class="cc-kicker">${section.kicker}</div>
                <h2 class="text-4xl font-semibold tracking-tight mt-2 heading-green">${section.heading}</h2>
                <div class="mt-6 space-y-5 text-muted leading-relaxed">
                    ${contentHtml}
                </div>
            </section>
        `;

        if (index < pageData.sections.length - 1) {
            html += '<div class="mt-6"></div>';
        }
    });

    // Render slideshow if present and has images
    if (Array.isArray(pageData.slideshow) && pageData.slideshow.length > 0) {
        html += `
        <div class="cc-panel overflow-hidden mt-10 fade-in">
            <div class="slideshow">
                ${pageData.slideshow.map(img => `<img src="${img.src}" alt="${img.alt}" class="slide" />`).join('')}
            </div>
        </div>
        `;
    }

    // Add additional images if present (e.g., thrift shop sign)
    if (pageData.additionalImages && pageData.additionalImages.length > 0) {
        pageData.additionalImages.forEach(img => {
            html += `
        <div class="mt-10 cc-panel overflow-hidden fade-in">
          <img src="${img.src}" alt="${img.alt}" class="w-full img-cover-medium" />
        </div>
      `;
        });
    }

    container.innerHTML = html;
    setupSlideshows();
}

// ===== PHOTO HIGHLIGHTS =====
function renderPhotoHighlights() {
    const activePage = getActivePage();
    const container = document.getElementById('photoHighlights');

    if (!container || !contentData) return;

    const pageData = contentData.pages[activePage];

    if (!pageData.showPhotoHighlights) {
        container.style.display = 'none';
        return;
    }

    container.style.display = 'block';

    const html = `
    <div class="cc-panel cc-content">
      <div class="cc-kicker">Photo highlights</div>
      <h2 class="text-4xl font-semibold tracking-tight mt-2">Life at Christ Church</h2>
      <p class="cc-sub">A few glimpses of worship, community, and service in Coronado.</p>
      
      <div class="mt-6 grid grid-2 lg-grid-3 gap-4">
        ${contentData.photoHighlights.map(photo => `
          <a href="${photo.href}" class="photo-card">
            <img src="${photo.image}" alt="${photo.alt}" class="photo-card-img" loading="lazy" />
            <div class="p-4">
              <div class="text-xs uppercase tracking-wide text-muted">${photo.category}</div>
              <div class="mt-1 font-semibold text-ink">${photo.title}</div>
            </div>
          </a>
        `).join('')}
      </div>
      
      <div class="mt-4 text-xs text-muted">Photos sourced from Christ Church Coronado and CCDS websites.</div>
    </div>
  `;

    container.innerHTML = html;
}

// ===== MINISTRY PROFILE =====
// Ministry profile cards are defined in assets/content.json under "ministryProfiles".

function generateMinistryProfile() {
    const activePage = getActivePage();
    const container = document.getElementById('ministry-profile-container');
    const section = document.getElementById('ministryProfileSection');

    if (!container || !section) return;

    // Filter items for current page
    ministryProfileItems = contentData.ministryProfiles.filter(item => item.pages.includes(activePage));

    if (ministryProfileItems.length === 0) {
        section.style.display = 'none';
        return;
    }

    section.style.display = 'block';

    // Start with first item
    currentProfileIndex = 0;

    // Generate navigation buttons
    const buttonsHTML = `
    <button class="profile-nav-btn prev" aria-label="Previous profile section">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    </button>
    <button class="profile-nav-btn next" aria-label="Next profile section">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </button>
  `;

    // Generate items
    const itemsHTML = ministryProfileItems.map((item, index) => `
    <div class="ministry-profile-item ${index === currentProfileIndex ? 'active' : ''} cc-callout p-6 md-p-7" data-index="${index}">
      <div class="text-sm uppercase tracking-wide text-muted">From our Ministry Profile</div>
      <h3 class="text-2xl font-semibold tracking-tight mt-2">${item.title}</h3>
      <div class="text-muted leading-relaxed mt-3">${item.content}</div>
    </div>
  `).join('');

    container.innerHTML = buttonsHTML + itemsHTML;

    // Setup navigation
    setupMinistryProfileNavigation();
}

function setupMinistryProfileNavigation() {
    const container = document.getElementById('ministry-profile-container');
    if (!container || ministryProfileItems.length === 0) return;

    const items = container.querySelectorAll('.ministry-profile-item');
    const prevBtn = container.querySelector('.profile-nav-btn.prev');
    const nextBtn = container.querySelector('.profile-nav-btn.next');

    function showItem(index) {
        items.forEach(item => item.classList.remove('active'));
        items[index].classList.add('active');
    }

    function showNext() {
        currentProfileIndex = (currentProfileIndex + 1) % ministryProfileItems.length;
        showItem(currentProfileIndex);
    }

    function showPrev() {
        currentProfileIndex = (currentProfileIndex - 1 + ministryProfileItems.length) % ministryProfileItems.length;
        showItem(currentProfileIndex);
    }

    function startAutoRotate() {
        clearInterval(autoRotateInterval);
        autoRotateInterval = setInterval(showNext, MINISTRY_PROFILE_ROTATE_INTERVAL);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            showNext();
            startAutoRotate();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            showPrev();
            startAutoRotate();
        });
    }

    startAutoRotate();
}

// ===== SCROLL HANDLERS (consolidated) =====
function handleScroll() {
    updateScrollProgress();
    toggleBackToTop();
    handleParallax();
}

function updateScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    const header = document.getElementById('header');
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    if (scrollProgress) {
        scrollProgress.style.width = scrolled + '%';
    }

    if (header) {
        if (winScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
}

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

function handleParallax() {
    const parallaxImg = document.querySelector('.parallax-img');
    const heroSection = document.getElementById('heroSection');

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

function setupBackToTop() {
    const backToTop = document.getElementById('backToTopBtn');
    if (!backToTop) return;

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    backToTop.addEventListener('click', scrollToTop);
    backToTop.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            scrollToTop();
        }
    });
}

// ===== INTERSECTION OBSERVER (for animations) =====
function setupObservers() {
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

    const panelObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        const rect = el.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

        if (isInViewport) {
            el.classList.add('visible');
        }

        fadeInObserver.observe(el);
    });

    // Observe all panels
    document.querySelectorAll('.cc-panel').forEach(el => {
        panelObserver.observe(el);
    });
}

// ===== PAGE RENDERING =====
async function renderPage() {
    const activePage = getActivePage();

    if (!contentData) {
        await loadContent();
    }

    if (!contentData || !contentData.pages[activePage]) {
        console.error('Page not found:', activePage);
        return;
    }

    const pageData = contentData.pages[activePage];

    // Update everything
    updateMetaTags(pageData);
    generateNavigation();
    generateHeroSection(pageData);
    renderPageContent(pageData);
    renderPhotoHighlights();
    generateMinistryProfile();

    // Setup observers after content is rendered
    setTimeout(setupObservers, 100);

    // Scroll to top on page change
    window.scrollTo(0, 0);
}

// ===== INITIALIZATION =====
async function init() {
    // Load content
    await loadContent();

    // Initial page render
    await renderPage();

    // Setup event listeners
    setupMobileMenu();
    setupBackToTop();

    // Consolidated scroll handler (debounced)
    window.addEventListener('scroll', debounce(handleScroll, 16), { passive: true });

    // Hash change listener for navigation
    window.addEventListener('hashchange', renderPage);

    // Initial scroll state
    handleScroll();
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
