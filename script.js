// ============================================
// WILDBOAR INNOVATION SOLUTIONS (PTY) LTD
// Main JavaScript - script.js
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const backToTop = document.getElementById('backToTop');
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterSuccess = document.getElementById('newsletterSuccess');
    const currentYearSpan = document.getElementById('currentYear');
    const particlesContainer = document.getElementById('particles');
    const statNumbers = document.querySelectorAll('.stat-number');
    const allNavLinks = document.querySelectorAll('.nav-link');

    // --- Set Current Year ---
    if (currentYearSpan) {
        currentYearSpan.textContent = `${new Date().getFullYear()}`;
    }

    // --- Create Floating Particles ---
    function createParticles() {
        if (!particlesContainer) return;
        const particleCount = 50;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            const size = Math.random() * 6 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${Math.random() * 15 + 10}s`;
            particle.style.animationDelay = `${Math.random() * 10}s`;
            particle.style.opacity = Math.random() * 0.6 + 0.1;
            particlesContainer.appendChild(particle);
        }
    }
    createParticles();

    // --- Navbar Scroll Effect ---
    function handleScroll() {
        const scrollY = window.scrollY;

        // Navbar background
        if (scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button
        if (scrollY > 600) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Active nav link update
        updateActiveNavLink(scrollY);
    }

    // --- Update Active Nav Link Based on Scroll ---
    function updateActiveNavLink(scrollY) {
        const sections = document.querySelectorAll('section[id]');
        let currentSectionId = 'home';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        allNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // --- Mobile Menu Toggle ---
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when link is clicked
    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') &&
            !navLinks.contains(e.target) &&
            !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // --- Back to Top Button ---
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- Animate Stats Counter ---
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000;
            const stepTime = Math.abs(Math.floor(duration / target));
            let current = 0;
            const increment = target > 100 ? Math.ceil(target / 100) : 1;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !stat.classList.contains('counted')) {
                        stat.classList.add('counted');
                        const counter = setInterval(() => {
                            current += increment;
                            if (current >= target) {
                                current = target;
                                clearInterval(counter);
                            }
                            stat.textContent = current + (target === 24 ? '' : '+');
                        }, stepTime);
                        observer.unobserve(stat);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(stat);
        });
    }
    animateStats();

    // --- Contact Form Submission ---
    // if (contactForm) {
    //     contactForm.addEventListener('submit', (e) => {
    //         e.preventDefault();

    //         // Basic validation
    //         const firstName = document.getElementById('firstName').value.trim();
    //         const lastName = document.getElementById('lastName').value.trim();
    //         const email = document.getElementById('email').value.trim();
    //         const service = document.getElementById('service').value;
    //         const message = document.getElementById('message').value.trim();

    //         if (!firstName || !lastName || !email || !service || !message) {
    //             // Shake animation for empty fields
    //             contactForm.style.animation = 'shake 0.5s ease';
    //             setTimeout(() => {
    //                 contactForm.style.animation = '';
    //             }, 500);
    //             return;
    //         }
    if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const originalText = btnText.textContent;

        submitBtn.disabled = true;
        btnText.textContent = 'Sending...';

        try {
            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                formSuccess.classList.add('show');
                contactForm.reset();
                setTimeout(() => formSuccess.classList.remove('show'), 5000);
            } else {
                alert('Something went wrong. Please try again or email us directly.');
            }
        } catch (error) {
            alert('Network error. Please check your connection and try again.');
        } finally {
            submitBtn.disabled = false;
            btnText.textContent = originalText;
        }
    });
}

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                const emailInput = document.getElementById('email');
                emailInput.style.borderColor = '#e74c3c';
                emailInput.focus();
                setTimeout(() => {
                    emailInput.style.borderColor = '';
                }, 2000);
                return;
            }

            // Simulate form submission
            const submitBtn = contactForm.querySelector('.submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            const originalText = btnText.textContent;

            submitBtn.disabled = true;
            btnText.textContent = 'Sending...';
            submitBtn.style.opacity = '0.7';

            setTimeout(() => {
                // Show success message
                formSuccess.classList.add('show');
                contactForm.reset();
                submitBtn.disabled = false;
                btnText.textContent = originalText;
                submitBtn.style.opacity = '1';

                // Hide success message after 5 seconds
                setTimeout(() => {
                    formSuccess.classList.remove('show');
                }, 5000);

                // Scroll to success message
                formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 1500);
        });
    

    // --- Newsletter Form Submission ---
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input');
            const email = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!email || !emailRegex.test(email)) {
                emailInput.style.borderColor = '#e74c3c';
                setTimeout(() => {
                    emailInput.style.borderColor = '';
                }, 2000);
                return;
            }

            newsletterSuccess.classList.add('show');
            emailInput.value = '';

            setTimeout(() => {
                newsletterSuccess.classList.remove('show');
            }, 4000);
        });
    }

    // --- Smooth reveal animation for service cards ---
    const serviceCards = document.querySelectorAll('.service-card');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        revealObserver.observe(card);
    });

    // --- MV Cards reveal ---
    const mvCards = document.querySelectorAll('.mv-card');
    const mvObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
                entry.target.style.transition = `all 0.7s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.2}s`;
                mvObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    mvCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = index === 0 ? 'translateX(-50px)' : 'translateX(50px)';
        mvObserver.observe(card);
    });

    // --- Shake animation keyframes (injected dynamically) ---
    const shakeStyle = document.createElement('style');
    shakeStyle.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20% { transform: translateX(-8px); }
            40% { transform: translateX(8px); }
            60% { transform: translateX(-6px); }
            80% { transform: translateX(6px); }
        }
    `;
    document.head.appendChild(shakeStyle);

    // --- Keyboard accessibility ---
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    console.log('%c🐗 WILDBOAR INNOVATION SOLUTIONS (PTY) LTD %cReady',
        'font-size: 1.2rem; font-weight: bold; color: #e8491f;',
        'font-size: 1rem; color: #1a1a2e;');
    console.log('%cInnovate. Build. Support. — Your trusted technology partner.',
        'color: #636e72; font-style: italic;');