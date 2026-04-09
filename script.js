document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileBtn = document.getElementById('mobileBtn');
    const navLinks = document.getElementById('navLinks');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Scroll header effect
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }

                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
    // Modal open/close
    const showAssessmentFormBtn = document.getElementById('showAssessmentFormBtn');
    const assessmentModal = document.getElementById('assessmentModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modalContent = assessmentModal ? assessmentModal.querySelector('.modal-content') : null;

    if (showAssessmentFormBtn && assessmentModal && modalContent) {
        showAssessmentFormBtn.addEventListener('click', function (e) {
            e.preventDefault();

            // Calculate how far the button is from viewport center
            const rect = this.getBoundingClientRect();
            const btnCenterX = rect.left + rect.width / 2;
            const btnCenterY = rect.top + rect.height / 2;
            const offsetX = btnCenterX - window.innerWidth / 2;
            const offsetY = btnCenterY - window.innerHeight / 2;

            // Set the starting translate so the form begins at the button
            modalContent.style.setProperty('--offset-x', `${offsetX}px`);
            modalContent.style.setProperty('--offset-y', `${offsetY}px`);

            assessmentModal.classList.remove('hidden');
        });

        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', function () {
                assessmentModal.classList.add('hidden');
            });
        }

        assessmentModal.addEventListener('click', function (e) {
            if (e.target === assessmentModal) {
                assessmentModal.classList.add('hidden');
            }
        });
    }

    // Generic scroll reveal observer
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-scale');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // Number Counting Animation for Stats
    const counters = document.querySelectorAll('.counter');
    const statsSection = document.querySelector('.stats');

    if (counters.length > 0 && statsSection) {
        let hasCounted = false;

        const countUp = () => {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps

                let currentCount = 0;
                
                const updateCounter = () => {
                    currentCount += increment;
                    if (currentCount < target) {
                        counter.innerText = Math.ceil(currentCount);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target;
                    }
                };
                
                updateCounter();
            });
        };

        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if (entry.isIntersecting && !hasCounted) {
                hasCounted = true;
                countUp();
                
                // Add visible class to cards with a staggered delay
                const statCards = document.querySelectorAll('.stat-card');
                statCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, index * 150);
                });
            }
        }, { threshold: 0.5 });

        observer.observe(statsSection);
    }

    // ─── Center Spotlight Auto-Hover ─────────────────────────────────────────
    // Tracks cards/content elements. On scroll, whichever card's center lands
    // within a 40px-tall window at the viewport midpoint gets .auto-hover.
    // Only ONE element can be active at a time; if none hit the window, all clear.
    const spotlightCards = document.querySelectorAll(
        '.feature-card, .stat-card, .testimonial-card, .cta-card'
    );

    const SPOTLIGHT_HALF = 20; // half of 40px window

    const updateSpotlight = () => {
        const centerY = window.innerHeight / 2;
        let activeCard = null;
        let closestDist = Infinity;

        spotlightCards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardCenterY = rect.top + rect.height / 2;
            const dist = Math.abs(cardCenterY - centerY);

            // Only consider cards within the 40px window
            if (dist <= SPOTLIGHT_HALF && dist < closestDist) {
                closestDist = dist;
                activeCard = card;
            }
        });

        spotlightCards.forEach(card => {
            if (card === activeCard) {
                card.classList.add('auto-hover');
            } else {
                card.classList.remove('auto-hover');
            }
        });
    };

    window.addEventListener('scroll', updateSpotlight, { passive: true });
    // Run once on load in case a card is already centered
    updateSpotlight();
});
