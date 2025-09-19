// Главный файл скриптов
import { HeaderManager } from './header.js';
import { FooterManager } from './footer.js';
import { DemoManager } from './demo.js';

class StylemarkApp {
    constructor() {
        this.init();
    }

    init() {
        // Инициализация хедера
        this.headerManager = new HeaderManager();
        
        // Инициализация футера
        this.footerManager = new FooterManager();
        
        // Инициализация демо-блока (только на главной странице)
        if (document.querySelector('.demo-container')) {
            this.demoManager = new DemoManager();
        }
        
        this.setupSmoothScrolling();
        this.setupAnimations();
        this.setupEventListeners();
        this.initializeComponents();
    }

    // Остальные методы
    setupSmoothScrolling() {
        // Плавная прокрутка для anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupAnimations() {
        // Intersection Observer для анимаций
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, observerOptions);

        // Наблюдаем за элементами с классами анимаций
        document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right, .scale-in').forEach(el => {
            observer.observe(el);
        });
    }

    setupEventListeners() {
        // Кнопка начала проекта
        const startProjectBtn = document.getElementById('startProjectBtn');
        if (startProjectBtn) {
            startProjectBtn.addEventListener('click', () => {
                this.showNotification('Функция "Начать проект" будет доступна в полной версии');
            });
        }

        // Демо-кнопки
        document.querySelectorAll('.demo-button').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.showNotification('Демонстрационная кнопка');
            });
        });

        // Эффекты фокуса для input
        document.querySelectorAll('input').forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('focused');
            });
        });

        // Горячие клавиши
        document.addEventListener('keydown', (e) => {
            // Переключение темы Ctrl/Cmd + T
            if ((e.ctrlKey || e.metaKey) && e.key === 't') {
                e.preventDefault();
                if (window.themeManager) {
                    window.themeManager.toggleTheme();
                }
            }
        });
    }

    initializeComponents() {
        console.log('Stylemark app initialized');
    }

    showNotification(message, type = 'info') {
        // Создаем уведомление
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Стилизуем уведомление
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.padding = '12px 16px';
        notification.style.backgroundColor = type === 'error' ? 
            'var(--color-error)' : 
            type === 'success' ? 
            'var(--color-success)' : 
            'var(--color-gray-900)';
        notification.style.color = 'var(--color-white)';
        notification.style.borderRadius = 'var(--radius-md)';
        notification.style.boxShadow = 'var(--shadow-lg)';
        notification.style.zIndex = '1000';
        notification.style.fontSize = 'var(--font-size-sm)';
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        notification.style.transition = 'all 0.3s ease';
        
        document.body.appendChild(notification);
        
        // Анимируем появление
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);
        
        // Удаляем через 3 секунды
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    window.stylemarkApp = new StylemarkApp();
});