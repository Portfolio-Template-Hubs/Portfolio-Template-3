// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations and interactive elements
    initNavigation();
    initSkillBars();
    initScrollAnimations();
    initContactForm();
    initStatCounters();
    initParallaxEffect();
    initProjectCardEffects();
});

// Mobile Navigation Toggle
function initNavigation() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('header');
    const navItems = document.querySelectorAll('.nav-links a');

    // Toggle mobile menu
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
            
            // Update ARIA attributes for accessibility
            const isExpanded = navLinks.classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded);
            
            // Transform hamburger to X
            const bars = this.querySelectorAll('.bar');
            if (isExpanded) {
                bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu when clicking on a nav item
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                
                // Reset hamburger icon
                const bars = menuToggle.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Animate skill bars
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Function to animate a skill bar
    function animateSkillBar(bar) {
        const skillValue = bar.getAttribute('data-skill');
        const progressBar = bar.querySelector('.skill-progress');
        
        // If user prefers reduced motion, just set the width without animation
        if (prefersReducedMotion) {
            progressBar.style.width = `${skillValue}%`;
            return;
        }
        
        // Otherwise, animate it
        progressBar.style.width = `${skillValue}%`;
    }
    
    // Use Intersection Observer to trigger animations when elements come into view
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBar(entry.target);
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, { threshold: 0.1 });
        
        skillBars.forEach(bar => observer.observe(bar));
    } else {
        // Fallback for browsers that don't support Intersection Observer
        skillBars.forEach(bar => animateSkillBar(bar));
    }
}

// Enhanced scroll animations with advanced reveal effects
function initScrollAnimations() {
    const animationClasses = [
        { selector: '.fade-in', effect: 'fade-in' },
        { selector: '.slide-in-left', effect: 'slide-in-left' },
        { selector: '.slide-in-right', effect: 'slide-in-right' },
        { selector: '.zoom-in', effect: 'zoom-in' },
        { selector: '.rotate-in', effect: 'rotate-in' },
        { selector: '.bounce-in', effect: 'bounce-in' },
        { selector: '.flip-in', effect: 'flip-in' }
    ];
    let animatedElements = [];
    
    // Collect all elements with animation classes
    animationClasses.forEach(({ selector, effect }) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.dataset.effect = effect;
            animatedElements.push(el);
        });
    });
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // If user prefers reduced motion, just show the elements without animation
    if (prefersReducedMotion) {
        animatedElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
            el.style.animation = 'none';
        });
        return;
    }
    
    // Use Intersection Observer with enhanced options
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const effect = el.dataset.effect;
                    const delay = el.dataset.delay || '0';
                    
                    // Add both the effect class and a custom animation class
                    setTimeout(() => {
                        el.classList.add('animated', effect);
                        
                        // Add additional effects based on scroll position
                        const scrollProgress = (window.scrollY + window.innerHeight - el.offsetTop) / (window.innerHeight + el.offsetHeight);
                        el.style.setProperty('--scroll-progress', Math.min(Math.max(scrollProgress, 0), 1));
                        
                        // Add parallax effect for specific elements
                        if (el.classList.contains('parallax')) {
                            el.style.transform = `translateY(${scrollProgress * 30}px)`;
                        }
                    }, parseInt(delay));
                    
                    observer.unobserve(el); // Stop observing once animated
                }
            });
        }, { 
            threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
            rootMargin: '0px 0px -10% 0px' // Trigger slightly before element comes into view
        });
        
        // Observe elements with staggered delay
        animatedElements.forEach((el, index) => {
            el.dataset.delay = (index % 3) * 150; // Stagger by 150ms in groups of 3
            observer.observe(el);
        });
    }
    
    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = `${scrollPercent}%`;
    });
}


// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Basic form validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // In a real application, you would send the form data to a server here
            // For this demo, we'll just show a success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
}

// Animate stat counters
function initStatCounters() {
    const statItems = document.querySelectorAll('.stat-item');
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Function to animate a counter
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const countElement = element.querySelector('h3');
        const currentText = countElement.textContent;
        const currentValue = parseInt(currentText);
        
        // If user prefers reduced motion, just set the final value
        if (prefersReducedMotion) {
            countElement.textContent = target + '+';
            return;
        }
        
        // Otherwise, animate it
        let count = 0;
        const duration = 2000; // 2 seconds
        const interval = Math.ceil(duration / target);
        
        const counter = setInterval(() => {
            count++;
            countElement.textContent = count + '+';
            
            if (count >= target) {
                clearInterval(counter);
            }
        }, interval);
    }
    
    // Use Intersection Observer to trigger animations when elements come into view
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, { threshold: 0.1 });
        
        statItems.forEach(item => observer.observe(item));
    } else {
        // Fallback for browsers that don't support Intersection Observer
        statItems.forEach(item => animateCounter(item));
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        // Don't smooth scroll if user prefers reduced motion
        if (document.documentElement.classList.contains('reduced-motion')) {
            return;
        }
        
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update URL without scrolling
            history.pushState(null, null, targetId);
        }
    });
});

// Add focus styles for keyboard navigation
function handleFirstTab(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('user-is-tabbing');
        window.removeEventListener('keydown', handleFirstTab);
    }
}

window.addEventListener('keydown', handleFirstTab);

// Parallax effect for hero section
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion && hero && heroContent) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            if (scrollPosition < 600) { // Only apply effect near the top of the page
                const translateY = scrollPosition * 0.3;
                heroContent.style.transform = `translateY(${translateY}px)`;
                hero.style.backgroundPosition = `50% ${translateY}px`;
            }
        });
    }
}

// Add interactive effects to project cards
function initProjectCardEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    const projectSection = document.querySelector('.projects');
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        // Add entrance animation for project section
        if (projectSection) {
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    projectCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animated');
                        }, index * 150); // Staggered animation
                    });
                    observer.unobserve(projectSection);
                }
            }, { threshold: 0.2 });
            
            observer.observe(projectSection);
        }
        
        projectCards.forEach(card => {
            // Enhanced tilt effect on mouse move
            card.addEventListener('mousemove', function(e) {
                const cardRect = card.getBoundingClientRect();
                const cardCenterX = cardRect.left + cardRect.width / 2;
                const cardCenterY = cardRect.top + cardRect.height / 2;
                const mouseX = e.clientX - cardCenterX;
                const mouseY = e.clientY - cardCenterY;
                
                // Calculate rotation based on mouse position with enhanced effect
                const rotateX = mouseY * -0.07;
                const rotateY = mouseX * 0.07;
                
                // Apply the transform with more dramatic effect
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
                
                // Add dynamic shadow based on mouse position
                const shadowX = mouseX * 0.1;
                const shadowY = mouseY * 0.1;
                card.style.boxShadow = `${shadowX}px ${shadowY}px 30px rgba(99, 102, 241, 0.2)`;
                
                // Move project content slightly based on mouse position for parallax effect
                const content = card.querySelector('.project-content');
                const image = card.querySelector('.project-image');
                if (content) content.style.transform = `translateX(${mouseX * 0.02}px) translateY(${mouseY * 0.02}px)`;
                if (image) image.style.transform = `translateX(${mouseX * 0.01}px) translateY(${mouseY * 0.01}px)`;
            });
            
            // Reset transform on mouse leave with smooth transition
            card.addEventListener('mouseleave', function() {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
                card.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
                card.style.boxShadow = '0 10px 25px rgba(99, 102, 241, 0.1)';
                
                // Reset content position
                const content = card.querySelector('.project-content');
                const image = card.querySelector('.project-image');
                if (content) content.style.transform = 'translateX(0) translateY(0)';
                if (image) image.style.transform = 'translateX(0) translateY(0)';
            });
            
            // Add focus effect for accessibility
            card.addEventListener('focus', function() {
                this.style.transform = 'scale3d(1.03, 1.03, 1.03)';
                this.style.boxShadow = '0 15px 35px rgba(99, 102, 241, 0.2)';
            });
            
            card.addEventListener('blur', function() {
                this.style.transform = 'scale3d(1, 1, 1)';
                this.style.boxShadow = '0 10px 25px rgba(99, 102, 241, 0.1)';
            });
        });
    }
}

// Listen for changes to the prefers-reduced-motion media query
motionMediaQuery.addEventListener('change', () => {
    // Reload the page to apply new motion preferences
    window.location.reload();
});