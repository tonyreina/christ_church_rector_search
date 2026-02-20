// Mobile menu toggle
const btn = document.getElementById('menuBtn');
const nav = document.getElementById('mobileNav');
if (btn && nav) {
    btn.addEventListener('click', () => nav.classList.toggle('hidden'));
}

// Scroll progress indicator
const scrollProgress = document.getElementById('scrollProgress');
const header = document.getElementById('header');

function updateScrollProgress() {
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
const backToTop = document.getElementById('backToTop');

function toggleBackToTop() {
    const scrollPos = window.scrollY || document.documentElement.scrollTop;
    if (backToTop) {
        if (scrollPos > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
}

window.addEventListener('scroll', toggleBackToTop, { passive: true });

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

// Add keyboard navigation improvements
document.addEventListener('keydown', (e) => {
    // Allow escape to close mobile menu
    if (e.key === 'Escape' && nav && !nav.classList.contains('hidden')) {
        nav.classList.add('hidden');
    }
});

// Improve focus visibility for accessibility
document.addEventListener('mousedown', () => {
    document.body.classList.add('using-mouse');
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.remove('using-mouse');
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
