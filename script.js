
// Navigation entre les pages
function showPage(pageId) {
    // Masquer toutes les pages
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Afficher la page demandée
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Mettre à jour la navigation active
    updateActiveNavLink(pageId);
    
    // Faire défiler vers le haut
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    // Fermer le menu mobile si ouvert
    const navLinks = document.querySelector('.nav-links');
    const mobileMenu = document.querySelector('.mobile-menu');
    if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
}

// Mettre à jour le lien de navigation actif
function updateActiveNavLink(pageId) {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Trouver et activer le lien correspondant
    navLinks.forEach(link => {
        const onclick = link.getAttribute('onclick');
        if (onclick && onclick.includes(`'${pageId}'`)) {
            link.classList.add('active');
        }
    });
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // Gestion du menu mobile
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }
    
    // Fermer le menu mobile lors du clic sur un lien
    const navLinkItems = document.querySelectorAll('.nav-links a');
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks) {
                navLinks.classList.remove('active');
            }
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
            }
        });
    });
    
    // Animation au scroll pour les cartes de services
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observer les cartes de services
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observer les features
    const features = document.querySelectorAll('.feature');
    features.forEach((feature, index) => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateY(20px)';
        feature.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(feature);
    });
    
    // Marquer la page d'accueil comme active par défaut
    updateActiveNavLink('home');
});

// Smooth scroll pour les ancres
document.addEventListener('click', function(e) {
    const target = e.target.closest('a[href^="#"]');
    if (target) {
        e.preventDefault();
        const href = target.getAttribute('href');
        if (href === '#services') {
            // Si on clique sur "Découvrir nos services", faire défiler vers la section services
            const servicesSection = document.getElementById('services');
            if (servicesSection) {
                servicesSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        } else if (href === '#contact') {
            // Si on clique sur "Contact", faire défiler vers le footer
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    }
});

// Effet parallax léger sur le hero
let ticking = false;
function updateParallax() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// Gestion responsive du menu
window.addEventListener('resize', function() {
    const navLinks = document.querySelector('.nav-links');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (window.innerWidth > 768) {
        if (navLinks) {
            navLinks.style.display = 'flex';
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        }
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
        }
    } else {
        if (navLinks && !navLinks.classList.contains('active')) {
            navLinks.style.display = 'none';
        }
    }
});

// Animation de typing pour le titre principal (optionnel)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    const timer = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}

// Gestion des touches clavier pour l'accessibilité
document.addEventListener('keydown', function(e) {
    // Échap pour fermer le menu mobile
    if (e.key === 'Escape') {
        const navLinks = document.querySelector('.nav-links');
        const mobileMenu = document.querySelector('.mobile-menu');
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    }
    
    // Entrée sur les cartes de service
    if (e.key === 'Enter' && e.target.classList.contains('service-card')) {
        e.target.click();
    }
});

// Fonction utilitaire pour débouncer les événements
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Débouncer le redimensionnement de fenêtre
window.addEventListener('resize', debounce(function() {
    // Code de redimensionnement ici si nécessaire
}, 250));

// Préchargement des images
function preloadImages() {
    const imageUrls = [
        'images/hero-main.jpg',
        'images/installations.jpg',
        'images/domotique.jpg',
        'images/alarme.jpg',
        'images/bornes.jpg'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Appeler le préchargement après le chargement de la page
window.addEventListener('load', preloadImages);

// Gestion des erreurs d'images
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        const placeholderText = e.target.nextElementSibling;
        if (placeholderText && placeholderText.classList.contains('placeholder-text')) {
            e.target.style.display = 'none';
            placeholderText.style.display = 'flex';
        }
    }
}, true);

// Analytics ou tracking (à personnaliser selon vos besoins)
function trackPageView(pageName) {
    // Ici vous pouvez ajouter votre code Google Analytics ou autre
    console.log('Page vue:', pageName);
}

// Fonction pour envoyer un formulaire de contact (à implémenter si nécessaire)
function submitContactForm(formData) {
    // Exemple d'implémentation
    console.log('Formulaire soumis:', formData);
    // Ici vous pourriez envoyer les données à un service backend
}

// Amélioration de l'accessibilité - gestion du focus
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Performance - lazy loading pour les images si nécessaire
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialiser le lazy loading si nécessaire
document.addEventListener('DOMContentLoaded', lazyLoadImages);