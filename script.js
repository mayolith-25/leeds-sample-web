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
    // App-launch Modal animation
    const showAssessmentFormBtn = document.getElementById('showAssessmentFormBtn');
    const assessmentModal = document.getElementById('assessmentModal');
    const closeModalBtn = document.getElementById('closeModalBtn');

    // Create the launcher element once and append to body
    const launcher = document.createElement('div');
    launcher.className = 'modal-launcher';
    launcher.style.visibility = 'hidden';
    document.body.appendChild(launcher);

    function openModal() {
        const rect = showAssessmentFormBtn.getBoundingClientRect();
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        // Position launcher exactly over the button
        launcher.style.setProperty('--btn-top',    rect.top    + 'px');
        launcher.style.setProperty('--btn-left',   rect.left   + 'px');
        launcher.style.setProperty('--btn-width',  rect.width  + 'px');
        launcher.style.setProperty('--btn-height', rect.height + 'px');

        // Scale needed to cover the whole viewport from the button's center
        const scaleX = (vw / rect.width)  * 1.1;
        const scaleY = (vh / rect.height) * 1.1;
        launcher.style.setProperty('--scale-x', scaleX);
        launcher.style.setProperty('--scale-y', scaleY);

        // Reset & show launcher at button position instantly
        launcher.classList.remove('expanding', 'collapsing');
        launcher.style.visibility = 'visible';

        // Next frame: trigger the expansion
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                launcher.classList.add('expanding');
                // Show the overlay (blur + form) slightly after expansion starts
                setTimeout(() => {
                    assessmentModal.classList.remove('hidden');
                }, 180);
            });
        });
    }

    function closeModal() {
        // Hide the form immediately
        assessmentModal.classList.add('hidden');

        // Collapse the launcher back to button size
        launcher.classList.remove('expanding');
        launcher.classList.add('collapsing');

        // Once collapsed, hide launcher
        setTimeout(() => {
            launcher.classList.remove('collapsing');
            launcher.style.visibility = 'hidden';
        }, 520);
    }

    if (showAssessmentFormBtn && assessmentModal) {
        showAssessmentFormBtn.addEventListener('click', function (e) {
            e.preventDefault();
            openModal();
        });

        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', closeModal);
        }

        assessmentModal.addEventListener('click', function (e) {
            if (e.target === assessmentModal) {
                closeModal();
            }
        });
    }
});
