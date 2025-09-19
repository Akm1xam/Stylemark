// Функциональность для хедера
class HeaderManager {
    constructor() {
        this.header = document.querySelector('.header');
        this.navbarNav = document.querySelector('.navbar-nav');
        this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
        this.themeToggle = document.getElementById('themeToggle');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupNavLinks();
        this.setupHeaderScroll();
        this.setupCurrentPageHighlight();
    }

    // Мобильное меню
    setupMobileMenu() {
        if (this.mobileMenuBtn && this.navbarNav) {
            this.mobileMenuBtn.addEventListener('click', () => {
                this.toggleMobileMenu();
            });

            // Закрытие меню при клике вне его области
            document.addEventListener('click', (e) => {
                if (this.navbarNav.classList.contains('open') && 
                    !this.navbarNav.contains(e.target) && 
                    !this.mobileMenuBtn.contains(e.target)) {
                    this.closeMobileMenu();
                }
            });

            // Закрытие меню при нажатии Escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.navbarNav.classList.contains('open')) {
                    this.closeMobileMenu();
                }
            });
        }
    }

    toggleMobileMenu() {
        this.navbarNav.classList.toggle('open');
        this.mobileMenuBtn.setAttribute('aria-expanded', 
            this.navbarNav.classList.contains('open'));
        
        // Анимация иконки меню
        const icon = this.mobileMenuBtn.querySelector('svg');
        if (this.navbarNav.classList.contains('open')) {
            icon.innerHTML = '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>';
        } else {
            icon.innerHTML = '<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>';
        }
    }

    closeMobileMenu() {
        this.navbarNav.classList.remove('open');
        this.mobileMenuBtn.setAttribute('aria-expanded', 'false');
        
        // Возвращаем стандартную иконку меню
        const icon = this.mobileMenuBtn.querySelector('svg');
        icon.innerHTML = '<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>';
    }

    // Обработка навигационных ссылок
    setupNavLinks() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Плавная прокрутка для якорных ссылок
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        // Закрываем мобильное меню если открыто
                        if (this.navbarNav.classList.contains('open')) {
                            this.closeMobileMenu();
                        }
                        
                        // Плавная прокрутка
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                        
                        // Обновляем URL без перезагрузки страницы
                        history.pushState(null, null, href);
                    }
                }
                
                // Подсветка активной ссылки
                this.navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    // Эффект при скролле
    setupHeaderScroll() {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.header.style.boxShadow = 'var(--shadow-md)';
                this.header.style.backdropFilter = 'blur(10px)';
            } else {
                this.header.style.boxShadow = 'var(--shadow-sm)';
                this.header.style.backdropFilter = 'none';
            }
            
            // Скрытие/показ хедера при скролле
            if (window.scrollY > lastScrollY && window.scrollY > 200) {
                this.header.style.transform = 'translateY(-100%)';
            } else {
                this.header.style.transform = 'translateY(0)';
            }
            
            lastScrollY = window.scrollY;
        });
    }

    // Подсветка текущей страницы
    setupCurrentPageHighlight() {
        const currentPath = window.location.pathname;
        const currentHash = window.location.hash;
        
        this.navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            
            if (currentHash && linkPath === currentHash) {
                link.classList.add('active');
            } else if (currentPath.includes(linkPath) && !linkPath.startsWith('#')) {
                link.classList.add('active');
            }
        });
    }

    // Обновление темы хедера
    updateHeaderTheme() {
        console.log('Header theme updated');
    }
}

// Инициализация хедера при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
    window.headerManager = new HeaderManager();
});