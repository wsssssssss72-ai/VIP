// App Data - All your educational apps
const apps = [
    {
        id: 1,
        name: "KHAN GLOBAL STUDIES",
        version: "v01.01",
        description: "Premium Learning Platform",
        downloads: "200+ Downloads",
        developer: "MADXRAJ",
        status: "NEW",
        link: "KGSFREE.HTML",
        icon: "fas fa-graduation-cap"
    },
    {
        id: 2,
        name: "CDS JOURNEY",
        version: "v01.01",
        description: "Premium Learning Platform",
        downloads: "2K+ USERS",
        developer: "MADXRAJ",
        status: "NEW",
        link: "CDSSSSSSSSS.HTML",
        icon: "fas fa-graduation-cap"
    },
    {
        id: 3,
        name: "Rojgar With Ankit",
        version: "v06.01",
        description: "Premium Learning Platform",
        downloads: "2.7+ USERS",
        developer: "MADXRAJ",
        status: "NEW",
        link: "RWAAA.HTML",
        icon: "fas fa-graduation-cap"
    },
    {
        id: 4,
        name: "CAREER WILL",
        version: "v04.01",
        description: "Premium Learning Platform",
        downloads: "6K+ USERS",
        developer: "MADXRAJ",
        status: "NEW",
        link: "CAREER WILL.html",
        icon: "fas fa-graduation-cap"
    },
    {
        id: 5,
        name: "CAREER WILL 2.0",
        version: "v07.01",
        description: "Premium Learning Platform",
        downloads: "6K+ USERS",
        developer: "MADXRAJ",
        status: "NEW",
        link: "/ℂ𝔸ℝ𝔼𝔼ℝ 𝕎𝕀𝕃𝕃 2.0.html",
        icon: "fas fa-graduation-cap"
    },
    {
        id: 6,
        name: "CLASS PLUS",
        version: "v03.01",
        description: "Premium Learning Platform",
        downloads: "900+ USERS",
        developer: "MADXRAJ",
        status: "NEW",
        link: "CLASSPLUS.HTML",
        icon: "fas fa-graduation-cap"
    },
    {
        id: 7,
        name: "NEXT TOPPER",
        version: "v08.91",
        description: "Premium Learning Platform",
        downloads: "1.23K+ USERS",
        developer: "MADXRAJ",
        status: "NEW",
        link: "/ℕ𝔼𝕏𝕋 𝕋ℙℙℙ𝔼ℝ.html",
        icon: "fas fa-graduation-cap"
    },
    {
        id: 8,
        name: "MASTER SAHAB",
        version: "v87.01",
        description: "Premium Learning Platform",
        downloads: "200+ USERS",
        developer: "MADXRAJ",
        status: "NEW",
        link: "/𝕞𝕒𝕤𝕥𝕖𝕣 𝕤𝕒𝕙𝕒𝕓.html",
        icon: "fas fa-graduation-cap"
    },
    {
        id: 9,
        name: "SELECTION WAY",
        version: "v04.01",
        description: "Premium Learning Platform",
        downloads: "6K+ USERS",
        developer: "MADXRAJ",
        status: "NEW",
        link: "/𝕤𝕖𝕝𝕖𝕔𝕥𝕚𝕠𝕟-𝕨𝕒𝕪..html",
        icon: "fas fa-graduation-cap"
    }
];

// Glass Loader
window.addEventListener('load', function() {
    const loader = document.getElementById('glassLoader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1500);
    
    // Render apps after load
    renderApps();
});

// Render App Cards
function renderApps() {
    const appGrid = document.querySelector('.app-showcase .glass-grid');
    if (!appGrid) return;
    
    appGrid.innerHTML = '';
    
    apps.forEach(app => {
        const appCard = document.createElement('div');
        appCard.className = 'app-card-glass';
        appCard.innerHTML = `
            <span class="app-badge badge-new">${app.status}</span>
            
            <div class="app-header-glass">
                <div class="app-icon-glass">
                    <i class="${app.icon}"></i>
                </div>
                <div class="app-info-glass">
                    <h3>${app.name}</h3>
                    <p>${app.description} ${app.version}</p>
                </div>
            </div>
            
            <div class="app-stats-glass">
                <div class="stat-glass">
                    <i class="fas fa-tag"></i>
                    <span>${app.version}</span>
                </div>
                <div class="stat-glass">
                    <i class="fas fa-download"></i>
                    <span>${app.downloads}</span>
                </div>
                <div class="stat-glass">
                    <i class="fas fa-hdd"></i>
                    <span>${app.developer}</span>
                </div>
            </div>
            
            <div class="app-actions-glass">
                <a href="${app.link}" class="glass-btn btn-gradient">
                    <i class="fas fa-book-open"></i>
                    LET'S STUDY
                </a>
            </div>
        `;
        
        appGrid.appendChild(appCard);
    });
}

// Navigation
document.addEventListener('DOMContentLoaded', function() {
    // Navigation active state
    const navLinks = document.querySelectorAll('.nav-link-glass');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add hover effect to glass cards
    document.querySelectorAll('.glass-card, .app-card-glass').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    // Parallax effect for floating orbs
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const orbs = document.querySelectorAll('.orb');
        
        orbs.forEach((orb, index) => {
            const speed = 0.5 + (index * 0.1);
            orb.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Mobile menu toggle
    const header = document.querySelector('.glass-header');
    const logo = document.querySelector('.glass-logo');
    
    // Add mobile menu button
    const menuBtn = document.createElement('button');
    menuBtn.className = 'mobile-menu-btn';
    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    menuBtn.style.cssText = `
        background: transparent;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        display: none;
    `;
    
    header.insertBefore(menuBtn, header.children[1]);
    
    // Show/hide mobile menu
    menuBtn.addEventListener('click', function() {
        const nav = document.querySelector('.glass-nav');
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    });
    
    // Responsive menu
    function handleResponsiveMenu() {
        const nav = document.querySelector('.glass-nav');
        const menuBtn = document.querySelector('.mobile-menu-btn');
        
        if (window.innerWidth <= 992) {
            nav.style.display = 'none';
            nav.style.flexDirection = 'column';
            nav.style.position = 'absolute';
            nav.style.top = '100%';
            nav.style.left = '0';
            nav.style.width = '100%';
            nav.style.background = 'var(--glass-bg)';
            nav.style.backdropFilter = 'blur(10px)';
            nav.style.borderRadius = '0 0 20px 20px';
            nav.style.padding = '20px';
            nav.style.border = '1px solid var(--glass-border)';
            nav.style.borderTop = 'none';
            menuBtn.style.display = 'block';
        } else {
            nav.style.display = 'flex';
            nav.style.flexDirection = 'row';
            nav.style.position = 'static';
            nav.style.background = 'transparent';
            nav.style.padding = '0';
            nav.style.border = 'none';
            menuBtn.style.display = 'none';
        }
    }
    
    window.addEventListener('resize', handleResponsiveMenu);
    handleResponsiveMenu();
});

// Alert functions
window.showStudyMaterials = function(appName) {
    alert(`Accessing ${appName} study materials...\n\nOpen the app to view comprehensive learning resources.`);
};

window.showComingSoon = function(appName) {
    alert(`${appName} is currently in development.\n\nJoin our Telegram channel for updates on the release.`);
};

window.showPreview = function(appName) {
    alert(`Preview for ${appName} coming soon.\n\nStay tuned for the beta release.`);
};