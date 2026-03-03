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
    const navItems = [
        { page: 'index', label: 'Welcome' },
        { page: 'worship', label: 'Worship' },
        { page: 'youth_family', label: 'Youth & Family' },
        { page: 'service_ministry', label: 'Service Ministry' },
        { page: 'day_school', label: 'Christ Church Day School' },
        { page: 'thrift_shop', label: 'Thrift Shop' },
        { page: 'music_ministry', label: 'Music Ministry' },
        { page: 'altar_guild', label: 'Altar Guild' }
    ];

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

    const needsDarkerOverlay = ['youth_family', 'thrift_shop', 'music_ministry', 'altar_guild'].includes(getActivePage());
    const overlayClass = needsDarkerOverlay
        ? 'hero-overlay-dark'
        : 'hero-overlay';

    const heroLinkHTML =
        'Christ Episcopal Church in Coronado, California — a vibrant, worshiping, beachside community shaped by prayer, fellowship, and service.';

    heroContainer.innerHTML = `
    <div class="grid grid-5-3-2 h-full">
      <div class="hero-image-container relative h-full">
        <img src="${pageData.heroImage}" alt="${pageData.heroAlt}" class="parallax-img absolute inset-0 z-0" loading="eager" />
        <div class="absolute inset-0 z-10 ${overlayClass}"></div>
        <div class="absolute left-6 bottom-6 right-6 z-20">
          <div class="text-white text-sm uppercase tracking-wide">Bridging Love &amp; Service</div>
          <h1 class="text-white text-3xl md-text-4xl font-semibold tracking-tight mt-2">Rector Search</h1>
          <p class="text-white-90 mt-2 max-w-xl">${heroLinkHTML}</p>
        </div>
      </div>
      <div class="hero-info-container p-6 md-p-8">
        <div class="text-sm uppercase tracking-wide text-muted">Visit us</div>
        <div class="mt-2 font-semibold text-ink">Sundays at 8 & 10 AM</div>
        <div class="text-muted mt-1">Holy Eucharist • All are welcome</div>
        <div class="mt-4 hero-contact-card">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-sage flex-shrink-0 mt-0.5">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <div class="flex-1">
            <a href="https://www.google.com/maps/place/1114+Ninth+Street,+Coronado,+CA+92118" target="_blank" rel="noopener noreferrer" class="text-ink font-medium hover-underline">1114 Ninth Street</a>
            <div class="text-muted">Coronado, CA 92118</div>
            <a href="tel:+16194354561" class="text-muted hover-underline">(619) 435-4561</a>
          </div>
          <img src="assets/logo.png" alt="Christ Church Logo" class="flex-shrink-0 self-center logo-img" loading="lazy" />
        </div>
        <div class="mt-5 flex flex-wrap gap-2">
          <a class="hero-link-btn" href="https://christchurchcoronado.org/news-and-events" target="_blank" rel="noreferrer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            Website
          </a>
          <a class="hero-link-btn" href="https://christchurchcoronado.org/live-stream" target="_blank" rel="noreferrer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            Live Stream
          </a>
          <a class="hero-link-btn" href="https://www.instagram.com/nadochristchurch" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            Instagram
          </a>
          <a class="hero-link-btn" href="https://www.facebook.com/christchurchcoronado/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Facebook
          </a>
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
        html += `
      <section class="cc-panel cc-content fade-in">
        <div class="cc-kicker">${section.kicker}</div>
        <h2 class="text-4xl font-semibold tracking-tight mt-2 heading-green">${section.heading}</h2>
        <div class="mt-6 space-y-5 text-muted leading-relaxed">
          ${section.content}
        </div>
      </section>
    `;

        if (index < pageData.sections.length - 1) {
            html += '<div class="mt-6"></div>';
        }
    });

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
const MINISTRY_PROFILES = [
    {
        title: "Who will we call as our next rector?",
        pages: ['index'],
        content: `<span class="font-medium">We hope to call a leader who embodies Christ's love</span> with humility, compassion, and spiritual depth. Essential gifts include strong pastoral presence, excellent liturgical leadership, and <span class="font-medium">preaching that connects the Gospel to everyday life</span> with warmth and clarity. We value someone who helps newcomers feel truly welcome and who nurtures long-time members with care, especially in seasons of joy, grief, and transition.`
    },
    {
        title: "What we hope for in our next rector.",
        pages: ['index'],
        content: `<span class="font-medium">We need a collaborative leader</span> who listens well, builds trust, and works closely with vestry, lay leaders, and staff. Administrative skill and wise stewardship are essential, as is adaptability in a changing Church. <span class="font-medium">Above all, we seek a rector grounded in prayer and emotional maturity</span>—someone who will help us grow as a supportive community led by the Holy Spirit and rooted in faith, hope, and love.`
    },
    {
        title: "Supporting diverse worship traditions",
        pages: ['index'],
        content: `<span class="font-medium">Christ Church welcomes all of God's children with hope and openness as we prepare for the future.</span> We support worship and pastoral care through dedicated parishioners, strengthened by clergy guidance, and we offer both Rite I and Rite II so people can worship in the tradition that best nourishes them.`
    },
    {
        title: "Growing engagement and community visibility",
        pages: ['index'],
        content: `<p>We grow engagement through active ministries and committees, intentionally inviting new voices into shared leadership and discernment. <span class="font-medium">We also work to be visible in the wider community</span>, so our neighbors know who we are and how we seek to follow Jesus. Our partnership with Christ Church Day School is a treasured part of our identity, and we are strengthening youth formation through Godly Play, fellowship, and meaningful learning.</p>`
    },
    {
        title: "Stewarding our campus and diocesan partnerships",
        pages: ['index'],
        content: `<p><span class="font-medium">We care for our 130-year-old campus as a gift entrusted to us</span>, planning responsibly for maintenance and future needs. Finally, we seek deeper relationships across the Diocese, especially with parishes serving immigrant communities, so we can stand with those most in need.</p>`
    },
    {
        title: "Serving beyond our parish",
        pages: ['service_ministry'],
        content: `Our Service Ministry helps our parish live out a faith that is truly active and visible. James 2:17 says, "So also faith by itself, if it does not have works, is dead." Guided by that call, we raise funds for <a href="https://vjkids.org/" target="_blank" rel="noopener noreferrer" class="underline">Vida Joven</a>, shelter for orphans in Tijuana, through our annual Cinco de Mayo dinner. We also provide backpacks and school supplies for children, Thanksgiving meals for families in need.`
    },
    {
        title: "Caring for our neighbors",
        pages: ['service_ministry', 'thrift_shop'],
        content: `In recent years, we revived a longtime tradition of offering practical care to neighbors experiencing homelessness by equipping parishioners with small gift bags of essentials to share with dignity and kindness. Our Thrift Shop further extends this outreach. It is a true community ministry, with volunteers and donors from well beyond our congregation.`
    },
    {
        title: "Peace & Justice ministry",
        pages: ['service_ministry'],
        content: `We stay connected and engaged through our weekly newsletter, <a href="https://christchurchcoronado.org/news-and-events" target="_blank">Grace Notes</a>, which highlights opportunities to serve in the wider community. In addition, our Peace &amp; Justice Committee supports education and advocacy on issues such as housing, ocean pollution, immigration, and LGBTQ protections and rights, helping us respond thoughtfully and faithfully to our neighbors' needs.`
    },
    {
        title: "Sacred Ground & community organizing",
        pages: ['service_ministry'],
        content: `In the past five years, one of our most significant new ministries has been the formation of our Peace &amp; Justice Committee. During COVID, parishioners participated in the Episcopal Church's Sacred Ground program, which deepened our commitment to faithful action and honest conversation. From that work, we sensed a call to engage issues affecting our neighbors, and we joined the <a href="https://sdop.org/" target="_blank" rel="noopener noreferrer" class="underline">San Diego Organizing Project (SDOP)</a>, a non-partisan, multi-faith network. Through listening and discernment, we focused first on housing, homelessness, and ocean pollution, supporting efforts such as renter protections, housing initiatives, and practical support for the unhoused.`
    },
    {
        title: "Faithful accompaniment for migrants",
        pages: ['service_ministry'],
        content: `More recently, we have felt a clear call toward immigration and refugee support. We have hosted Home Meetings, participated in forums and rallies, and held discussions on issues including refugee resettlement. In collaboration with Our Lady of Guadalupe Church and SDOP, we now support the FAITH program (Faithful Accompaniment in Trust &amp; Hope), offering moral and prayerful presence for migrants at court hearings and related sites.`
    },
    {
        title: "Worship, prayer, and community life",
        pages: ['worship', 'music_ministry', 'altar_guild'],
        content: `Christ Church is a loving, Spirit-filled community grounded in worship, prayer, and relationships. We are nourished through thoughtful liturgy, beautiful music, and gathering at the Lord's Table. Fellowship also matters to us: shared meals and parish gatherings deepen connection and remind us we do not walk alone. We care for one another's spiritual, emotional, and physical well-being through formation, prayer, and community life.`
    },
    {
        title: "Formation and hospitality",
        pages: ['worship', 'index'],
        content: `Weekly Men's Bible Study and lay-led Evening Prayer offer regular opportunities for scripture, reflection, and shared intercession. We also support health of mind and body through offerings such as an on-site yoga class held twice a month.`
    },
    {
        title: "Hospitality and service",
        pages: ['service_ministry', 'thrift_shop'],
        content: `Beyond our parish, we extend care through hospitality by opening our facilities to youth events, scouting groups, arts performances, fundraisers, and Alcoholics Anonymous meetings. Our all-volunteer Thrift Shop is a ministry of compassion that provides affordable, high-quality goods and distributes over $100,000 annually to ministries locally and throughout the wider Church.`
    },
    {
        title: "Our parish-school partnership",
        pages: ['day_school'],
        content: `Our partnership with Christ Church Day School is a treasured and defining part of our parish identity. For 70 years, we have shared our campus, our worship life, and our commitment to Christian formation with students and families who bring energy, diversity, and joy to our community. We believe this partnership strengthens both church and school. Students participate in weekly chapels, building early connections to Episcopal worship and tradition.`
    },
    {
        title: "Building relationships across generations",
        pages: ['day_school'],
        content: `Parents and faculty often join parish events, deepening relationships across generations. Service projects unite school families and parishioners in common mission. Our Day School chaplain serves both communities, weaving together formation, pastoral care, and spiritual nurture.`
    },
    {
        title: "Caring for our campus",
        pages: ['day_school', 'index'],
        content: `We care for our 130-year-old campus as a gift entrusted to us by past generations and held in trust for those to come. As we plan responsibly for maintenance, growth, and future needs, we do so knowing that this sacred space serves not only Sunday worship but also the daily formation of young hearts and minds throughout the week.`
    },
    {
        title: "Ministry as Christ's hands and feet",
        pages: ['service_ministry'],
        content: `We invite everyone to share in ministry as we seek to be Christ's "hands and feet" in the world. Parishioners serve our neighbors through outreach that meets real needs with dignity and care. We support St. Mark's kitchen and prepare "Blessings in a Bag" with snacks, water, and handmade hats, gloves, or scarves to offer those living on the streets. These remind our neighbors that they are seen and loved by God the Father, Son, and Spirit.`
    },
    {
        title: "Prayer and belonging for all",
        pages: ['worship'],
        content: `We also create space for prayer and belonging. Our mid-week, lay-led Evening Prayer service is intentionally welcoming and nonjudgmental, with opportunities for people to speak names and concerns aloud. In seasons like Lent, we gather for Stations of the Cross and a lecture series, sharing a simple meal and deepening fellowship.`
    },
    {
        title: "Witnessing to inclusive love",
        pages: ['service_ministry'],
        content: `Our congregation participates in the San Diego Pride celebration alongside others in the Diocese, praying at the Cathedral and witnessing to God's inclusive love. We support <a href="https://vjkids.org/" target="_blank" rel="noopener noreferrer" class="underline">Vida Joven</a> orphanages in Mexico through fundraising that helps provide food and care.`
    },
    {
        title: "Standing with migrants in court",
        pages: ['service_ministry'],
        content: `Through our Peace and Justice Ministry, we educate ourselves about suffering at the border and offer prayerful presence for those facing immigration court proceedings, standing as compassionate witnesses and reminding people they are not alone.`
    },
    {
        title: "The Thrift Shop ministry",
        pages: ['thrift_shop'],
        content: `Our volunteer-run Thrift Shop is another vital ministry. It offers affordable clothing and household goods to the larger community while generating annual support for staff, parish ministries, local organizations, and scholarships. It is entirely staffed by volunteers and is known as a place of warmth, generosity, and good humor.`
    },
    {
        title: "Growing youth formation",
        pages: ['youth_family'],
        content: `We are encouraged by new life in our ministries: our youth programs are rebuilding with the hiring of <a href="https://www.buzzsprout.com/94924/episodes/18402328-the-tenth-day-of-christmas-with-leighton-jones-12-days-of-god-sightings-on-faith-to-go" target="_blank" rel="noopener">Leighton Jones</a>, our new Youth Minister and Day School chaplain. We are nurturing the next generation through thoughtful Christian formation that invites wonder, questions, and belonging.`
    },
    {
        title: "Our vision for youth and families",
        pages: ['youth_family'],
        content: `<ul class="list-disc list-inside"><li>Regular Sunday School and youth gatherings that build friendships rooted in faith</li><li>Godly Play sessions that help children encounter scripture through story and wonder</li><li>Service opportunities that connect young people to Christ's mission in the world</li><li>Intergenerational worship and fellowship that strengthens the whole parish family</li><li>Deepening partnerships with Christ Church Day School for shared formation and worship</li><li>Creating space where young people feel genuinely seen, heard, and valued</li><li>Supporting parents and families as they nurture faith at home</li></ul>`
    }
];

function generateMinistryProfile() {
    const activePage = getActivePage();
    const container = document.getElementById('ministry-profile-container');
    const section = document.getElementById('ministryProfileSection');

    if (!container || !section) return;

    // Filter items for current page
    ministryProfileItems = MINISTRY_PROFILES.filter(item => item.pages.includes(activePage));

    if (ministryProfileItems.length === 0) {
        section.style.display = 'none';
        return;
    }

    section.style.display = 'block';

    // Random starting index
    currentProfileIndex = Math.floor(Math.random() * ministryProfileItems.length);

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
      <p class="text-muted leading-relaxed mt-3">${item.content}</p>
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

// ===== ANIMATED LIST (for rector hopes) =====
function animateRectorHopes() {
    const list = document.getElementById('rector-hopes');
    if (!list) return;

    const items = list.querySelectorAll('li');
    if (items.length === 0) return;

    let currentIndex = 0;

    function highlightNext() {
        items.forEach(item => item.classList.remove('active'));
        items[currentIndex].classList.add('active');
        currentIndex = (currentIndex + 1) % items.length;
    }

    highlightNext();
    setInterval(highlightNext, RECTOR_HOPES_HIGHLIGHT_INTERVAL);
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

    // Animate rector hopes list if present
    setTimeout(animateRectorHopes, 200);

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
