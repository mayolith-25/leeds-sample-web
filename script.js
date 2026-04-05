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

    if (showAssessmentFormBtn && assessmentModal) {
        showAssessmentFormBtn.addEventListener('click', function (e) {
            e.preventDefault();
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
});
