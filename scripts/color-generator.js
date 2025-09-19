// Color palette generator
class ColorGenerator {
    constructor() {
        this.generatePaletteBtn = document.getElementById('generatePaletteBtn');
        this.init();
    }

    init() {
        if (this.generatePaletteBtn) {
            this.generatePaletteBtn.addEventListener('click', () => {
                this.generatePalette();
            });
        }
    }

    generatePalette(baseColor = '#3b82f6') {
        try {
            const colors = {
                50: chroma(baseColor).brighten(2.4).hex(),
                100: chroma(baseColor).brighten(1.8).hex(),
                200: chroma(baseColor).brighten(1.2).hex(),
                300: chroma(baseColor).brighten(0.6).hex(),
                400: chroma(baseColor).brighten(0.3).hex(),
                500: baseColor,
                600: chroma(baseColor).darken(0.3).hex(),
                700: chroma(baseColor).darken(0.6).hex(),
                800: chroma(baseColor).darken(0.9).hex(),
                900: chroma(baseColor).darken(1.2).hex()
            };

            this.displayPalette(colors);
            return colors;
        } catch (e) {
            console.error('Ошибка генерации палитры:', e);
            this.showError('Неверный формат цвета');
            return null;
        }
    }

    displayPalette(colors) {
        const paletteContainer = document.querySelector('.color-palette');
        if (!paletteContainer) return;

        // Clear existing palette
        paletteContainer.innerHTML = '';

        // Create new color items
        Object.entries(colors).forEach(([key, value]) => {
            const colorItem = document.createElement('div');
            colorItem.className = 'color-item';
            colorItem.style.backgroundColor = value;
            
            // Determine text color based on luminance
            const luminance = chroma(value).luminance();
            const textColor = luminance > 0.5 ? 'var(--color-gray-800)' : 'var(--color-white)';
            colorItem.style.color = textColor;
            
            colorItem.innerHTML = `
                <span>${key}</span>
                <span class="color-hex">${value}</span>
            `;
            
            // Add click to copy functionality
            colorItem.addEventListener('click', () => {
                this.copyToClipboard(value);
                this.showCopiedNotification(value);
            });
            
            paletteContainer.appendChild(colorItem);
        });
    }

    copyToClipboard(text) {
        navigator.clipboard.writeText(text).catch(err => {
            console.error('Ошибка копирования: ', err);
        });
    }

    showCopiedNotification(color) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'copy-notification';
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px;">
                <div style="width: 16px; height: 16px; border-radius: 2px; background: ${color};"></div>
                <span>Цвет ${color} скопирован!</span>
            </div>
        `;
        
        // Style the notification
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.padding = '12px 16px';
        notification.style.backgroundColor = 'var(--color-gray-900)';
        notification.style.color = 'var(--color-white)';
        notification.style.borderRadius = 'var(--radius-md)';
        notification.style.boxShadow = 'var(--shadow-lg)';
        notification.style.zIndex = '1000';
        notification.style.fontSize = 'var(--font-size-sm)';
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
        notification.style.transition = 'all 0.3s ease';
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(20px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    showError(message) {
        // Create error notification
        const error = document.createElement('div');
        error.className = 'error-notification';
        error.textContent = message;
        
        // Style the error
        error.style.position = 'fixed';
        error.style.bottom = '20px';
        error.style.right = '20px';
        error.style.padding = '12px 16px';
        error.style.backgroundColor = 'var(--color-error)';
        error.style.color = 'var(--color-white)';
        error.style.borderRadius = 'var(--radius-md)';
        error.style.boxShadow = 'var(--shadow-lg)';
        error.style.zIndex = '1000';
        error.style.fontSize = 'var(--font-size-sm)';
        error.style.opacity = '0';
        error.style.transform = 'translateY(20px)';
        error.style.transition = 'all 0.3s ease';
        
        document.body.appendChild(error);
        
        // Animate in
        setTimeout(() => {
            error.style.opacity = '1';
            error.style.transform = 'translateY(0)';
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            error.style.opacity = '0';
            error.style.transform = 'translateY(20px)';
            setTimeout(() => {
                document.body.removeChild(error);
            }, 300);
        }, 3000);
    }
}

// Initialize color generator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.colorGenerator = new ColorGenerator();
});