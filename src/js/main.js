document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active'); // Add this line
        });

        // Optional: Close menu when a nav link is clicked (mobile UX)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active'); // Add this line
            });
        });
    }

    // Section reveal animation
    function checkScroll() {
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const triggerHeight = window.innerHeight * 0.8;
            if (sectionTop < triggerHeight) {
                section.classList.add('visible');
            }
        });
    }
    window.addEventListener('scroll', checkScroll);
    window.addEventListener('load', checkScroll);

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !document.querySelector(targetId)) return;
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });

    // Testimonials slider
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;
    let testimonialInterval;

    function showTestimonial(index) {
        testimonials.forEach((t, i) => {
            t.classList.toggle('active', i === index);
        });
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');

    if (prevBtn && nextBtn && testimonials.length > 0) {
        prevBtn.addEventListener('click', () => {
            prevTestimonial();
            resetTestimonialInterval();
        });
        nextBtn.addEventListener('click', () => {
            nextTestimonial();
            resetTestimonialInterval();
        });
        showTestimonial(currentTestimonial);

        // Auto-scroll every 5 seconds
        testimonialInterval = setInterval(nextTestimonial, 5000);

        // Reset interval on manual navigation
        function resetTestimonialInterval() {
            clearInterval(testimonialInterval);
            testimonialInterval = setInterval(nextTestimonial, 5000);
        }
    }

    // Highlight active nav link on scroll
    const sections = document.querySelectorAll('section');
    const navLinksAll = document.querySelectorAll('.nav-links a');

    function updateActiveNav() {
        let currentSectionId = '';
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom > 100) {
                currentSectionId = section.id;
            }
        });
        navLinksAll.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${currentSectionId}`);
        });
    }
    window.addEventListener('scroll', updateActiveNav);
    window.addEventListener('load', updateActiveNav);


    // Contact form submission (stub)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your form handling logic here
            alert('Thank you for contacting us!');
            contactForm.reset();
        });
    }
});