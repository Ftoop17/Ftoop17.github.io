document.addEventListener('DOMContentLoaded', function() {
    // Initialize Particles.js
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 60,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#6c5ce7"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                }
            },
            "opacity": {
                "value": 0.5,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 4,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#6c5ce7",
                "opacity": 0.3,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1.5,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 0.8
                    }
                },
                "push": {
                    "particles_nb": 3
                }
            }
        },
        "retina_detect": true
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        body.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            body.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll down button
    document.querySelector('.scroll-down').addEventListener('click', () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });

    // Initialize GSAP and ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero section animations
    gsap.from('.hero-title', {
        opacity: 0,
        y: 50,
        duration: 1.2,
        delay: 0.3,
        ease: "power3.out"
    });
    
    gsap.from('.hero-subtitle', {
        opacity: 0,
        y: 50,
        duration: 1.2,
        delay: 0.5,
        ease: "power3.out"
    });
    
    gsap.from('.hero-text', {
        opacity: 0,
        y: 50,
        duration: 1.2,
        delay: 0.7,
        ease: "power3.out"
    });
    
    gsap.from('.hero-buttons', {
        opacity: 0,
        y: 50,
        duration: 1.2,
        delay: 0.9,
        ease: "power3.out"
    });
    
    gsap.from('.hero-image', {
        opacity: 0,
        x: 50,
        duration: 1.5,
        delay: 0.6,
        ease: "power3.out"
    });
    
    // Scroll down arrow animation
    gsap.to('.scroll-down .arrow', {
        y: 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        duration: 1.5
    });
    
    // Section animations
    gsap.utils.toArray('[data-scroll]').forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });
    });
    
    // Animate stats counter
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateStats = () => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const start = parseInt(stat.textContent);
            const increment = target / (duration / 16);
            let current = start;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    clearInterval(timer);
                    current = target;
                }
                stat.textContent = Math.floor(current);
            }, 16);
        });
    };
    
    // Animate skill bars
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const animateSkills = () => {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            gsap.to(bar, {
                width: width + '%',
                duration: 2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: bar.closest('.skills-container'),
                    start: "top 70%"
                }
            });
        });
    };
    
    // Initialize animations when sections come into view
    ScrollTrigger.batch("[data-scroll]", {
        onEnter: batch => {
            batch.forEach(element => {
                if (element.closest('#about')) {
                    animateStats();
                } else if (element.closest('#skills')) {
                    animateSkills();
                }
            });
        },
        start: "top 80%"
    });
    
    // Refresh ScrollTrigger on resize
    window.addEventListener('resize', () => {
        ScrollTrigger.refresh();
    });

    // Name hover effect
    const nameParts = document.querySelectorAll('.name-part');
    nameParts.forEach(part => {
        part.addEventListener('mouseenter', () => {
            gsap.to(part, {
                y: -5,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        part.addEventListener('mouseleave', () => {
            gsap.to(part, {
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });

    // App download terms checkbox validation
    const downloadBtn = document.querySelector('.btn-download');
    const termsCheckbox = document.getElementById('agree-terms');
    
    if (downloadBtn && termsCheckbox) {
        downloadBtn.addEventListener('click', (e) => {
            if (!termsCheckbox.checked) {
                e.preventDefault();
                gsap.to(termsCheckbox, {
                    x: [-5, 5, -5, 5, 0],
                    duration: 0.5,
                    ease: "power1.inOut"
                });
                termsCheckbox.parentElement.style.color = 'var(--danger-color)';
                setTimeout(() => {
                    termsCheckbox.parentElement.style.color = '';
                }, 2000);
            }
        });
    }
});
// Terms Modal functionality
let currentSection = 0;
const totalSections = 6; // Количество секций в terms.html

function openTermsModal(e) {
    e.preventDefault();
    const modal = document.getElementById('termsModal');
    const frame = document.getElementById('termsFrame');
    frame.src = 'terms.html';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    currentSection = 0;
}

function closeTermsModal() {
    const modal = document.getElementById('termsModal');
    const frame = document.getElementById('termsFrame');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    frame.src = '';
}

function navigateTerms(direction) {
    currentSection += direction;
    
    if (currentSection < 0) currentSection = 0;
    if (currentSection >= totalSections) currentSection = totalSections - 1;
    
    const frame = document.getElementById('termsFrame');
    frame.contentWindow.scrollTo({
        top: document.documentElement.clientHeight * currentSection,
        behavior: 'smooth'
    });
}

// Close modal when clicking outside
document.getElementById('termsModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeTermsModal();
    }
});

// Close modal with ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.getElementById('termsModal').classList.contains('active')) {
        closeTermsModal();
    }
});