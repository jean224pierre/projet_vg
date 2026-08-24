// ============================================================
// SCRIPT COMPLET - Virgina Decoration
// ============================================================

document.addEventListener('DOMContentLoaded', function() {

    // ============================================================
    // 1. GESTION DU MENU BURGER
    // ============================================================
    var menuToggle = document.getElementById('menu-toggle');
    var navList = document.getElementById('nav-list');
    var navOverlay = document.getElementById('nav-overlay');
    var navLinks = document.querySelectorAll('.nav-list a');
    var branding = document.getElementById('branding');

    function toggleMenu() {
        var isOpen = navList.classList.toggle('active');
        menuToggle.classList.toggle('active', isOpen);
        navOverlay.classList.toggle('active', isOpen);
        menuToggle.setAttribute('aria-expanded', isOpen);
        document.body.classList.toggle('nav-open', isOpen);
        
        // --- NOUVELLE PARTIE POUR L'ICÔNE ---
        var icon = menuToggle.querySelector('i');
        if (isOpen) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times'); // Remplace les barres par une croix
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');  // Remet les barres
        }
        
        if (branding) {
            branding.classList.toggle('shift-left', isOpen);
        }
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggleMenu();
        });
    }

    if (navOverlay) {
        navOverlay.addEventListener('click', function() {
            if (navList.classList.contains('active')) {
                toggleMenu();
            }
        });
    }

    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            if (navList.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Fermer le menu avec la touche Echap
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navList.classList.contains('active')) {
            toggleMenu();
        }
    });

    // ============================================================
    // 2. SÉLECTEUR DE LANGUE
    // ============================================================
    window.toggleLanguageMenu = function() {
        var dropdown = document.getElementById('lang-dropdown');
        dropdown.classList.toggle('show');
    };

    // Fermer le menu langue en cliquant ailleurs
    document.addEventListener('click', function(e) {
        var selector = document.getElementById('language-selector');
        if (selector && !selector.contains(e.target)) {
            var dropdown = document.getElementById('lang-dropdown');
            if (dropdown) dropdown.classList.remove('show');
        }
    });

    window.changeLanguage = function(lang) {
        var display = document.getElementById('current-lang-display');
        var labels = {
            'fr': 'FR',
            'ht': 'HT',
            'en': 'EN'
        };
        if (display) display.textContent = labels[lang] || 'FR';
        
        var dropdown = document.getElementById('lang-dropdown');
        if (dropdown) dropdown.classList.remove('show');
        
        console.log('Langue changée en : ' + lang.toUpperCase());
        // Ici vous pouvez ajouter la logique de traduction
    };

    // ============================================================
    // 3. RECHERCHE DE SERVICES
    // ============================================================
    var searchForm = document.getElementById('search-form');
    var searchInput = document.getElementById('search-input');

    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var query = searchInput.value.toLowerCase().trim();
            
            if (query === '') {
                // Réinitialiser les surlignages
                document.querySelectorAll('.service-card .service-list li').forEach(function(item) {
                    item.style.backgroundColor = '';
                    item.style.fontWeight = '500';
                });
                return;
            }

            var found = false;
            var serviceItems = document.querySelectorAll('.service-card .service-list li');
            
            serviceItems.forEach(function(item) {
                var text = item.textContent.toLowerCase();
                if (text.includes(query)) {
                    item.style.backgroundColor = '#ffff99';
                    item.style.fontWeight = '700';
                    found = true;
                    
                    // Ouvrir la carte parente
                    var card = item.closest('.service-card');
                    if (card && !card.classList.contains('open')) {
                        card.classList.add('open');
                        var btn = card.querySelector('.toggle-services');
                        if (btn) {
                            btn.textContent = 'Voir moins';
                            btn.setAttribute('aria-expanded', 'true');
                        }
                    }
                } else {
                    item.style.backgroundColor = '';
                    item.style.fontWeight = '500';
                }
            });

            if (!found) {
                alert('Aucun service trouvé pour : "' + query + '"');
            }
        });
    }

    // ============================================================
    // 4. TOGGLE DES CARTES SERVICES — UNE SEULE OUVERTE À LA FOIS
    // ============================================================
    document.querySelectorAll('.toggle-services').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            var card = btn.closest('.service-card');

            var isCurrentlyOpen = card.classList.contains('open');

            // Fermer toutes les cartes ouvertes sauf celle cliquée
            document.querySelectorAll('.service-card.open').forEach(function(openCard) {
                if (openCard !== card) {
                    openCard.classList.remove('open');
                    var openBtn = openCard.querySelector('.toggle-services');
                    if (openBtn) {
                        openBtn.setAttribute('aria-expanded', 'false');
                        openBtn.textContent = 'Voir plus';
                    }
                }
            });

            // Si la carte était ouverte, la fermer ; sinon l'ouvrir
            if (isCurrentlyOpen) {
                card.classList.remove('open');
                btn.setAttribute('aria-expanded', 'false');
                btn.textContent = 'Voir plus';
            } else {
                card.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
                btn.textContent = 'Voir moins';
                card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    });

    // ============================================================
    // 6. BOUTON WHATSAPP
    // ============================================================
    document.querySelectorAll('.whatsapp-btn, .whatsapp-float').forEach(function(el) {
        el.addEventListener('click', function() {
            console.log('Redirection vers WhatsApp...');
        });
    });

    // ============================================================
    // 7. GESTION DU FORMULAIRE DE CONTACT
    // ============================================================
    var contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validation simple
            var name = document.getElementById('name');
            var email = document.getElementById('email');
            var phone = document.getElementById('phone');
            var message = document.getElementById('message');
            
            if (!name.value.trim() || !email.value.trim() || !phone.value.trim() || !message.value.trim()) {
                alert('Veuillez remplir tous les champs.');
                return;
            }
            
            // Simulation d'envoi
            alert('Votre message a été envoyé avec succès ! Nous vous contacterons rapidement.');
            this.reset();
        });
    }

    // ============================================================
    // 9. DÉFILEMENT FLUIDE POUR LES ANCRES
    // ============================================================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                var headerOffset = 80;
                var elementPosition = target.getBoundingClientRect().top;
                var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    console.log('Virgina Decoration - Site prêt');
});

// ============================================================
// 8. GALERIE ADMINISTRÉE
// ============================================================
// Cette section est vide côté frontend et sera alimentée par l'admin / CMS.
// Les réalisations doivent être injectées depuis le back-office ou une API.
var galleryContainer = document.getElementById('gallery-container');
if (galleryContainer) {
    galleryContainer.innerHTML = '';
}