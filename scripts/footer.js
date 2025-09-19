// Функциональность для футера
class FooterManager {
    constructor() {
        this.footer = document.querySelector('.footer');
        this.init();
    }

    init() {
        this.setupFooterAnimation();
        this.setupCurrentYear();
        this.setupSocialLinks();
        this.setupFooterLinks();
    }

    // Анимация появления футера при скролле
    setupFooterAnimation() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('footer-animate');
                }
            });
        }, observerOptions);

        if (this.footer) {
            observer.observe(this.footer);
        }
    }

    // Установка текущего года в копирайт
    setupCurrentYear() {
        const copyrightElement = document.querySelector('.copyright');
        if (copyrightElement) {
            const currentYear = new Date().getFullYear();
            copyrightElement.textContent = copyrightElement.textContent.replace('2023', currentYear);
        }
    }

    // Обработка кликов по социальным ссылкам
    setupSocialLinks() {
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const platform = link.getAttribute('aria-label').toLowerCase();
                this.trackSocialClick(platform);
                
                // Анимация клика
                link.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    link.style.transform = '';
                }, 200);
            });
        });
    }

    // Отслеживание кликов по социальным ссылкам
    trackSocialClick(platform) {
        console.log(`Social link clicked: ${platform}`);
        // Здесь может быть код для аналитики
    }

    // Плавная прокрутка для якорных ссылок в футере
    setupFooterLinks() {
        const footerLinks = document.querySelectorAll('.footer-link, .footer-bottom-link');
        footerLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Если это якорная ссылка
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 100,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    // Метод для обновления футера (например, при изменении темы)
    updateFooterTheme() {
        // Этот метод может быть вызван при изменении темы
        console.log('Footer theme updated');
    }
}

// Инициализация футера при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
    window.footerManager = new FooterManager();
});