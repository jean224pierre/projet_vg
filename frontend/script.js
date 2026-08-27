// ============================================================
// SCRIPT COMPLET - Virgina Decoration
// ============================================================

// ============================================================
// DICTIONNAIRE DE TRADUCTIONS (FR / HT / EN)
// ============================================================
var translations = {
    fr: {
        'pageTitle': 'Virgina Decoration',
        'pageDescription': 'Décoration événementielle en Haïti - Virgina Decoration',
        'nav.accueil': 'Accueil',
        'nav.services': 'Nos Services',
        'nav.galeries': 'Galeries',
        'nav.apropos': 'A propos',
        'nav.contact': 'Contact',
        'search.placeholder': 'Rechercher un service...',
        'hero.title': 'Créons des moments inoubliables',
        'hero.subtitle': 'Élégance - Raffinement - Prestige',
        'hero.cta': 'Découvrez nos services',
        'services.title': 'Nos Services',
        'services.subtitle': 'Découvrez notre gamme complète de services de décoration.',
        'services.events.title': "Organisation d'Événements",
        'services.events.item1': 'Anniversaires',
        'services.events.item2': 'Baby showers',
        'services.events.item3': 'Bridal showers',
        'services.events.item4': 'Fiançailles',
        'services.events.item5': 'Dîners privés',
        'services.events.item6': 'Événements familiaux',
        'services.events.item7': 'Événements professionnels',
        'services.deco.title': 'Décoration événementielle',
        'services.deco.item1': 'Backdrop / mur de décoration',
        'services.deco.item2': 'Décoration de tables',
        'services.deco.item3': 'Ballons',
        'services.deco.item4': 'Fleurs et compositions',
        'services.deco.item5': 'Centres de table',
        'services.deco.item6': 'Mise en place complète',
        'services.coordination.title': 'Coordination événementielle',
        'services.coordination.item1': "Gestion du déroulement de l'événement",
        'services.coordination.item2': 'Coordination des prestataires',
        'services.coordination.item3': 'Installation et supervision',
        'services.coordination.item4': 'Gestion du timing',
        'services.experiences.title': 'Expériences & événements signature',
        'services.experiences.item1': 'Emerald Paint & Picnic',
        'services.experiences.item2': 'Picnics privés',
        'services.experiences.item3': 'Dîners romantiques',
        'services.experiences.item4': 'Celebrations personnalisées',
        'services.experiences.item5': 'Expériences surprises',
        'toggle.voirPlus': 'Voir plus',
        'toggle.voirMoins': 'Voir moins',
        'galeries.title': 'Nos Réalisations',
        'galeries.placeholder': 'Nos réalisations arrivent bientôt ! En attendant, suivez-nous sur Facebook et Instagram pour découvrir nos dernières créations.',
        'apropos.title': 'A propos de nous',
        'apropos.lead': 'Votre rêve, notre passion',
        'apropos.text': "Experts en création d'événements sur mesure en Haïti.",
        'apropos.cta': 'En savoir plus',
        'contact.title': 'Contactez-nous',
        'contact.subtitle': "Prêt à organiser votre événement de rêve ? Envoyez-nous un message dès aujourd'hui !",
        'form.name.label': 'Nom complet',
        'form.email.label': 'Email',
        'form.phone.label': 'Téléphone',
        'form.message.label': 'Message',
        'form.message.placeholder': 'Votre message...',
        'form.submit': 'Envoyer',
        'whatsapp.label': 'Message',
        'footer.contact.title': 'Contact',
        'footer.social.title': 'Suivez-nous sur',
        'footer.copyright.title': 'Copyright',
        'footer.rights': 'Tous droits réservés',
        'alert.noResults': 'Aucun service trouvé pour : ',
        'alert.fillFields': 'Veuillez remplir tous les champs.',
        'alert.formSuccess': 'Votre message a été envoyé avec succès ! Nous vous contacterons rapidement.'
    },
    ht: {
        'pageTitle': 'Virgina Decoration',
        'pageDescription': 'Dekorasyon evènman an Ayiti - Virgina Decoration',
        'nav.accueil': 'Akèy',
        'nav.services': 'Sèvis Nou Yo',
        'nav.galeries': 'Galri',
        'nav.apropos': 'Konsènan Nou',
        'nav.contact': 'Kontakte Nou',
        'search.placeholder': 'Chèche yon sèvis...',
        'hero.title': "Ann kreye moman ou p ap janm bliye",
        'hero.subtitle': 'Elegans - Rafinman - Prestij',
        'hero.cta': 'Dekouvri sèvis nou yo',
        'services.title': 'Sèvis Nou Yo',
        'services.subtitle': 'Dekouvri tout gam sèvis dekorasyon nou yo.',
        'services.events.title': 'Òganizasyon Evènman',
        'services.events.item1': 'Fèt anivèsè',
        'services.events.item2': 'Baby shower',
        'services.events.item3': 'Bridal shower',
        'services.events.item4': 'Fiyansay',
        'services.events.item5': 'Dine prive',
        'services.events.item6': 'Evènman fanmi',
        'services.events.item7': 'Evènman pwofesyonèl',
        'services.deco.title': 'Dekorasyon Evènman',
        'services.deco.item1': 'Fon / mi dekorasyon',
        'services.deco.item2': 'Dekorasyon tab',
        'services.deco.item3': 'Balon',
        'services.deco.item4': 'Flè ak konpozisyon',
        'services.deco.item5': 'Sant tab',
        'services.deco.item6': 'Enstalasyon konplè',
        'services.coordination.title': 'Kowòdinasyon Evènman',
        'services.coordination.item1': 'Jesyon deroulman evènman an',
        'services.coordination.item2': 'Kowòdinasyon founisè',
        'services.coordination.item3': 'Enstalasyon ak sipèvizyon',
        'services.coordination.item4': 'Jesyon orè',
        'services.experiences.title': 'Eksperyans & Evènman Siyati',
        'services.experiences.item1': 'Emerald Paint & Picnic',
        'services.experiences.item2': 'Pikinik prive',
        'services.experiences.item3': 'Dine womantik',
        'services.experiences.item4': 'Selebrasyon pèsonalize',
        'services.experiences.item5': 'Eksperyans sipriz',
        'toggle.voirPlus': 'Wè plis',
        'toggle.voirMoins': 'Wè mwens',
        'galeries.title': 'Reyalizasyon Nou Yo',
        'galeries.placeholder': 'Reyalizasyon nou yo ap vini talè konsa! An atandan, swiv nou sou Facebook ak Instagram pou dekouvri dènye kreyasyon nou yo.',
        'apropos.title': 'Konsènan Nou',
        'apropos.lead': 'Rèv ou, pasyon nou',
        'apropos.text': 'Ekspè nan kreyasyon evènman sou mezi an Ayiti.',
        'apropos.cta': 'Aprann plis',
        'contact.title': 'Kontakte Nou',
        'contact.subtitle': 'Pare pou òganize evènman rèv ou a? Voye yon mesaj jodi a!',
        'form.name.label': 'Non konplè',
        'form.email.label': 'Imèl',
        'form.phone.label': 'Telefòn',
        'form.message.label': 'Mesaj',
        'form.message.placeholder': 'Mesaj ou...',
        'form.submit': 'Voye',
        'whatsapp.label': 'Mesaj',
        'footer.contact.title': 'Kontak',
        'footer.social.title': 'Swiv nou sou',
        'footer.copyright.title': 'Copyright',
        'footer.rights': 'Tout dwa rezève',
        'alert.noResults': 'Nou pa jwenn okenn sèvis pou : ',
        'alert.fillFields': 'Tanpri ranpli tout chan yo.',
        'alert.formSuccess': 'Mesaj ou a te voye avèk siksè! Nou pral kontakte w byento.'
    },
    en: {
        'pageTitle': 'Virgina Decoration',
        'pageDescription': 'Event decoration in Haiti - Virgina Decoration',
        'nav.accueil': 'Home',
        'nav.services': 'Our Services',
        'nav.galeries': 'Gallery',
        'nav.apropos': 'About',
        'nav.contact': 'Contact',
        'search.placeholder': 'Search for a service...',
        'hero.title': "Let's create unforgettable moments",
        'hero.subtitle': 'Elegance - Refinement - Prestige',
        'hero.cta': 'Discover our services',
        'services.title': 'Our Services',
        'services.subtitle': 'Discover our full range of decoration services.',
        'services.events.title': 'Event Planning',
        'services.events.item1': 'Birthdays',
        'services.events.item2': 'Baby showers',
        'services.events.item3': 'Bridal showers',
        'services.events.item4': 'Engagements',
        'services.events.item5': 'Private dinners',
        'services.events.item6': 'Family events',
        'services.events.item7': 'Corporate events',
        'services.deco.title': 'Event Decoration',
        'services.deco.item1': 'Backdrop / decoration wall',
        'services.deco.item2': 'Table decoration',
        'services.deco.item3': 'Balloons',
        'services.deco.item4': 'Flowers & arrangements',
        'services.deco.item5': 'Centerpieces',
        'services.deco.item6': 'Full setup',
        'services.coordination.title': 'Event Coordination',
        'services.coordination.item1': 'Event flow management',
        'services.coordination.item2': 'Vendor coordination',
        'services.coordination.item3': 'Setup & supervision',
        'services.coordination.item4': 'Timing management',
        'services.experiences.title': 'Signature Experiences & Events',
        'services.experiences.item1': 'Emerald Paint & Picnic',
        'services.experiences.item2': 'Private picnics',
        'services.experiences.item3': 'Romantic dinners',
        'services.experiences.item4': 'Personalized celebrations',
        'services.experiences.item5': 'Surprise experiences',
        'toggle.voirPlus': 'See more',
        'toggle.voirMoins': 'See less',
        'galeries.title': 'Our Work',
        'galeries.placeholder': "Our portfolio is coming soon! In the meantime, follow us on Facebook and Instagram to see our latest creations.",
        'apropos.title': 'About Us',
        'apropos.lead': 'Your dream, our passion',
        'apropos.text': 'Experts in custom event creation in Haiti.',
        'apropos.cta': 'Learn more',
        'contact.title': 'Contact Us',
        'contact.subtitle': 'Ready to plan your dream event? Send us a message today!',
        'form.name.label': 'Full name',
        'form.email.label': 'Email',
        'form.phone.label': 'Phone',
        'form.message.label': 'Message',
        'form.message.placeholder': 'Your message...',
        'form.submit': 'Send',
        'whatsapp.label': 'Message',
        'footer.contact.title': 'Contact',
        'footer.social.title': 'Follow us on',
        'footer.copyright.title': 'Copyright',
        'footer.rights': 'All rights reserved',
        'alert.noResults': 'No service found for: ',
        'alert.fillFields': 'Please fill in all fields.',
        'alert.formSuccess': 'Your message has been sent successfully! We will contact you shortly.'
    }
};

var currentLang = localStorage.getItem('virginaLang') || 'fr';

function t(key) {
    return (translations[currentLang] && translations[currentLang][key])
        || (translations.fr[key])
        || key;
}

function applyTranslations(lang) {
    if (!translations[lang]) lang = 'fr';
    currentLang = lang;
    document.documentElement.setAttribute('lang', lang);
    document.title = t('pageTitle');

    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t('pageDescription'));

    document.querySelectorAll('[data-i18n]').forEach(function(el) {
        var key = el.getAttribute('data-i18n');
        if (translations[lang][key] !== undefined) {
            el.textContent = translations[lang][key];
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
        var key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang][key] !== undefined) {
            el.setAttribute('placeholder', translations[lang][key]);
        }
    });

    // Remettre le bon libellé "Voir plus / Voir moins" selon l'état ouvert/fermé de chaque carte
    document.querySelectorAll('.toggle-services').forEach(function(btn) {
        var isOpen = btn.getAttribute('aria-expanded') === 'true';
        btn.textContent = isOpen ? t('toggle.voirMoins') : t('toggle.voirPlus');
    });

    localStorage.setItem('virginaLang', lang);
}

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

        applyTranslations(lang);
        console.log('Langue changée en : ' + lang.toUpperCase());
    };

    // Appliquer la langue sauvegardée (ou français par défaut) dès le chargement de la page
    (function initLanguage() {
        var display = document.getElementById('current-lang-display');
        var labels = { 'fr': 'FR', 'ht': 'HT', 'en': 'EN' };
        if (display) display.textContent = labels[currentLang] || 'FR';
        applyTranslations(currentLang);
    })();

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
            // Validation simple : on bloque l'envoi seulement si un champ est vide
            var name = document.getElementById('name');
            var email = document.getElementById('email');
            var phone = document.getElementById('phone');
            var message = document.getElementById('message');

            if (!name.value.trim() || !email.value.trim() || !phone.value.trim() || !message.value.trim()) {
                e.preventDefault();
                alert(t('alert.fillFields'));
                return;
            }

            // Si tout est rempli, on laisse le formulaire s'envoyer normalement
            // vers send.php (POST classique), qui redirige vers la page de confirmation.
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