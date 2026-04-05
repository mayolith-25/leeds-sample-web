document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileBtn = document.getElementById('mobileBtn');
    const navLinks = document.getElementById('navLinks');
    
    if(mobileBtn && navLinks) {
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
            
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                if(navLinks.classList.contains('active')) {
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
    // Expanding CTA Form logic
    const showAssessmentFormBtn = document.getElementById('showAssessmentFormBtn');
    const assessmentForm = document.getElementById('assessmentForm');
    const ctaBtnWrapper = document.getElementById('ctaBtnWrapper');

    if (showAssessmentFormBtn && assessmentForm && ctaBtnWrapper) {
        showAssessmentFormBtn.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent jump to #contact
            ctaBtnWrapper.classList.add('hidden');
            assessmentForm.classList.add('visible');
        });
    }
});
