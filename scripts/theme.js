// Theme management
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.body = document.body;
        this.init();
    }

    init() {
        // Check saved theme or system preferences
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            this.enableDarkMode();
        } else {
            this.enableLightMode();
        }

        // Add event listener to toggle button
        this.themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (!localStorage.getItem('theme')) {
                if (e.matches) {
                    this.enableDarkMode();
                } else {
                    this.enableLightMode();
                }
            }
        });
    }

    toggleTheme() {
        if (this.body.getAttribute('data-theme') === 'dark') {
            this.enableLightMode();
        } else {
            this.enableDarkMode();
        }
    }

    enableDarkMode() {
        this.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        this.dispatchThemeChangeEvent('dark');
    }

    enableLightMode() {
        this.body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        this.dispatchThemeChangeEvent('light');
    }

    dispatchThemeChangeEvent(theme) {
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
    }

    getCurrentTheme() {
        return this.body.getAttribute('data-theme') || 'light';
    }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager();
});