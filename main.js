document.addEventListener('DOMContentLoaded', function() {
    // Кастомный курсор
    const cursor = document.querySelector('.cursor');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Эффекты курсора
    const hoverElements = document.querySelectorAll(
        'a, button, .project-card, .menu-btn, .stat-item, .social-icon'
    );
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
        });
    });
    
    // Клик эффект
    document.addEventListener('mousedown', () => {
        cursor.classList.add('click');
    });
    
    document.addEventListener('mouseup', () => {
        cursor.classList.remove('click');
    });
    
    // Мобильное меню
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('open');
        navLinks.classList.toggle('active');
        
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Закрыть меню при клике на ссылку
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('open');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Анимация заголовка
    const titleWords = document.querySelectorAll('.title-word');
    
    titleWords.forEach((word, index) => {
        setTimeout(() => {
            word.style.opacity = '1';
            word.style.transform = 'translateY(0)';
            word.classList.add('active');
        }, index * 200);
    });
    
    // Анимация подзаголовка и кнопки
    setTimeout(() => {
        document.querySelector('.subtitle').style.opacity = '1';
        document.querySelector('.subtitle').style.transform = 'translateY(0)';
    }, titleWords.length * 200);
    
    setTimeout(() => {
        document.querySelector('.btn-portfolio').style.opacity = '1';
        document.querySelector('.btn-portfolio').style.transform = 'translateY(0)';
    }, titleWords.length * 200 + 300);
    
    // Анимация при скролле
    const animateOnScroll = () => {
        const elements = document.querySelectorAll(
            '.about-content, .project-card, .stat-item'
        );
        
        elements.forEach(el => {
            const elementPosition = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Инициализация элементов
    document.querySelectorAll('.about-content, .project-card, .stat-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 0.5s, transform 0.5s';
    });
    
    // Первая проверка
    animateOnScroll();
    
    // Проверка при скролле
    window.addEventListener('scroll', animateOnScroll);
    
    // Анимация счетчиков
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounters = () => {
        statNumbers.forEach(number => {
            const target = parseInt(number.getAttribute('data-count'));
            const duration = 2000;
            const start = 0;
            const increment = target / (duration / 16);
            let current = start;
            
            const counter = setInterval(() => {
                current += increment;
                if (current >= target) {
                    clearInterval(counter);
                    current = target;
                }
                number.textContent = Math.floor(current);
            }, 16);
        });
    };
    
    // Intersection Observer для счетчиков
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelector('.about-stats').querySelectorAll('.stat-item').forEach(item => {
        observer.observe(item);
    });
    
    // Плавный скролл
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
    
    // Кнопка портфолио
    document.getElementById('portfolio-btn').addEventListener('click', () => {
        window.scrollTo({
            top: document.getElementById('projects').offsetTop - 80,
            behavior: 'smooth'
        });
    });
    
    // Случайные мерцания неона
    setInterval(() => {
        const neonElements = document.querySelectorAll(
            '.logo, .nav-links a, .title-animation, .section-title, .stat-number, .project-overlay h3'
        );
        
        const randomElement = neonElements[Math.floor(Math.random() * neonElements.length)];
        randomElement.classList.add('flicker');
        
        setTimeout(() => {
            randomElement.classList.remove('flicker');
        }, 300);
    }, 3000);
    
    // Плавающий эффект для некоторых элементов
    const floatElements = document.querySelectorAll('.project-card, .stat-item');
    
    floatElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
        el.classList.add('float');
    });
});