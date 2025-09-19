// Функциональность для демонстрационного блока
class DemoManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupColorGenerator();
        this.setupTypographyControls();
        this.setupComponentControls();
        this.setupExportOptions();
        this.setupContrastChecker();
    }

    // Генератор цветовой палитры
    setupColorGenerator() {
        const baseColorInput = document.getElementById('baseColor');
        const baseColorHexInput = document.getElementById('baseColorHex');
        const generateBtn = document.getElementById('generatePaletteBtn');
        const colorPalette = document.getElementById('colorPalette');

        if (baseColorInput && baseColorHexInput && generateBtn && colorPalette) {
            // Синхронизация inputs
            baseColorInput.addEventListener('input', (e) => {
                baseColorHexInput.value = e.target.value;
            });

            baseColorHexInput.addEventListener('input', (e) => {
                if (/^#([0-9A-F]{3}){1,2}$/i.test(e.target.value)) {
                    baseColorInput.value = e.target.value;
                }
            });

            // Генерация палитры
            generateBtn.addEventListener('click', () => {
                this.generateColorPalette(baseColorInput.value);
            });
        }
    }

    generateColorPalette(baseColor) {
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

            this.displayColorPalette(colors);
            return colors;
        } catch (e) {
            console.error('Ошибка генерации палитры:', e);
            this.showError('Неверный формат цвета');
            return null;
        }
    }

    displayColorPalette(colors) {
        const paletteContainer = document.querySelector('.color-palette');
        if (!paletteContainer) return;

        // Очищаем палитру
        paletteContainer.innerHTML = '';

        // Создаем новые элементы цветов
        Object.entries(colors).forEach(([key, value]) => {
            const colorItem = document.createElement('div');
            colorItem.className = 'color-item';
            colorItem.style.backgroundColor = value;
            
            // Определяем цвет текста на основе яркости
            const luminance = chroma(value).luminance();
            const textColor = luminance > 0.5 ? 'var(--color-gray-800)' : 'var(--color-white)';
            colorItem.style.color = textColor;
            
            colorItem.innerHTML = `
                <span>${key}</span>
                <span class="color-hex">${value}</span>
            `;
            
            // Добавляем функциональность копирования
            colorItem.addEventListener('click', () => {
                this.copyToClipboard(value);
                this.showCopiedNotification(value);
            });
            
            paletteContainer.appendChild(colorItem);
        });
    }

// Дополнительные функции для демо-блока
setupCopyButtons() {
    // Добавляем кнопки копирования к preview кода
    const codePreviews = document.querySelectorAll('.code-preview');
    
    codePreviews.forEach(preview => {
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
            </svg>
            Копировать
        `;
        
        copyButton.addEventListener('click', () => {
            const code = preview.querySelector('code').textContent;
            this.copyToClipboard(code);
            
            // Визуальная обратная связь
            copyButton.textContent = 'Скопировано!';
            copyButton.style.background = 'var(--color-success)';
            
            setTimeout(() => {
                copyButton.innerHTML = `
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                    </svg>
                    Копировать
                `;
                copyButton.style.background = 'rgba(255, 255, 255, 0.1)';
            }, 2000);
        });
        
        preview.appendChild(copyButton);
    });
}

setupLivePreview() {
    // Live preview для изменений в реальном времени
    const inputs = document.querySelectorAll('input[type="range"], select, input[type="color"]');
    
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            // Добавляем класс анимации к превью
            const previewElement = this.getPreviewElement(input);
            if (previewElement) {
                previewElement.classList.add('preview-update');
                setTimeout(() => {
                    previewElement.classList.remove('preview-update');
                }, 300);
            }
        });
    });
}

getPreviewElement(input) {
    // Получаем элемент для preview на основе input
    const id = input.id;
    
    switch (id) {
        case 'fontFamily':
        case 'fontSize':
            return document.querySelector('.typography-item');
        case 'buttonRadius':
        case 'buttonPadding':
            return document.querySelector('.button-demo');
        case 'foregroundColor':
        case 'backgroundColor':
            return document.querySelector('.contrast-preview');
        default:
            return null;
    }
}

// Добавьте вызовы этих функций в метод init()
init() {
    this.setupColorGenerator();
    this.setupTypographyControls();
    this.setupComponentControls();
    this.setupExportOptions();
    this.setupContrastChecker();
    this.setupCopyButtons(); // Новая функция
    this.setupLivePreview(); // Новая функция
}

    // Контролы типографики
    setupTypographyControls() {
        const fontFamilySelect = document.getElementById('fontFamily');
        const fontSizeSlider = document.getElementById('fontSize');
        const fontSizeValue = document.getElementById('fontSizeValue');

        if (fontFamilySelect && fontSizeSlider && fontSizeValue) {
            fontFamilySelect.addEventListener('change', (e) => {
                document.body.style.fontFamily = e.target.value;
            });

            fontSizeSlider.addEventListener('input', (e) => {
                const size = e.target.value;
                fontSizeValue.textContent = `${size}px`;
                document.documentElement.style.setProperty('--font-size-base', `${size}px`);
            });
        }
    }

    // Контролы компонентов
    setupComponentControls() {
        const buttonRadiusSlider = document.getElementById('buttonRadius');
        const buttonRadiusValue = document.getElementById('buttonRadiusValue');
        const buttonPaddingSlider = document.getElementById('buttonPadding');
        const buttonPaddingValue = document.getElementById('buttonPaddingValue');

        if (buttonRadiusSlider && buttonRadiusValue) {
            buttonRadiusSlider.addEventListener('input', (e) => {
                const radius = e.target.value;
                buttonRadiusValue.textContent = `${radius}px`;
                document.documentElement.style.setProperty('--radius-md', `${radius}px`);
            });
        }

        if (buttonPaddingSlider && buttonPaddingValue) {
            buttonPaddingSlider.addEventListener('input', (e) => {
                const padding = e.target.value;
                buttonPaddingValue.textContent = `${padding}px`;
                
                // Обновляем отступы кнопок
                document.querySelectorAll('.demo-button').forEach(button => {
                    button.style.padding = `${padding / 2}px ${padding}px`;
                });
            });
        }
    }

    // Опции экспорта
    setupExportOptions() {
        const exportOptions = document.querySelectorAll('.export-option');
        
        exportOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                // Убираем активный класс у всех options
                exportOptions.forEach(opt => opt.classList.remove('active'));
                
                // Добавляем активный класс к текущей option
                e.target.classList.add('active');
                
                // Обновляем preview кода
                this.updateCodePreview(e.target.dataset.format);
            });
        });
    }

    updateCodePreview(format) {
        const codePreview = document.querySelector('.code-preview code');
        if (!codePreview) return;

        let code = '';
        
        switch (format) {
            case 'css':
                code = `:root {
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  --color-primary-900: #1e3a8a;
  
  --font-family: 'Inter', sans-serif;
  --font-size-base: 1rem;
  --font-weight-normal: 400;
  --font-weight-bold: 700;
  
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-4: 1rem;
  --spacing-6: 1.5rem;
  
  --radius-md: 0.375rem;
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}`;
                break;
                
            case 'scss':
                code = `$color-primary-50: #eff6ff;
$color-primary-100: #dbeafe;
$color-primary-500: #3b82f6;
$color-primary-600: #2563eb;
$color-primary-900: #1e3a8a;

$font-family: 'Inter', sans-serif;
$font-size-base: 1rem;
$font-weight-normal: 400;
$font-weight-bold: 700;

$spacing-1: 0.25rem;
$spacing-2: 0.5rem;
$spacing-4: 1rem;
$spacing-6: 1.5rem;

$radius-md: 0.375rem;
$shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);`;
                break;
                
            case 'tailwind':
                code = `module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          900: '#1e3a8a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      spacing: {
        '1': '0.25rem',
        '2': '0.5rem',
        '4': '1rem',
        '6': '1.5rem',
      },
      borderRadius: {
        'md': '0.375rem',
      },
      boxShadow: {
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      }
    }
  }
}`;
                break;
                
            case 'json':
                code = `{
  "colors": {
    "primary": {
      "50": "#eff6ff",
      "100": "#dbeafe",
      "500": "#3b82f6",
      "600": "#2563eb",
      "900": "#1e3a8a"
    }
  },
  "typography": {
    "fontFamily": "Inter, sans-serif",
    "fontSize": {
      "base": "1rem"
    },
    "fontWeight": {
      "normal": 400,
      "bold": 700
    }
  },
  "spacing": {
    "1": "0.25rem",
    "2": "0.5rem",
    "4": "1rem",
    "6": "1.5rem"
  },
  "borderRadius": {
    "md": "0.375rem"
  },
  "boxShadow": {
    "md": "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
  }
}`;
                break;
        }
        
        codePreview.textContent = code;
    }

    // Проверка контрастности
    setupContrastChecker() {
        const foregroundColor = document.getElementById('foregroundColor');
        const backgroundColor = document.getElementById('backgroundColor');
        const contrastPreview = document.querySelector('.contrast-preview');
        const contrastScore = document.querySelector('.contrast-score .score');
        const contrastRating = document.querySelector('.contrast-score .rating');

        if (foregroundColor && backgroundColor && contrastPreview && contrastScore && contrastRating) {
            const updateContrast = () => {
                const fgColor = foregroundColor.value;
                const bgColor = backgroundColor.value;
                
                // Обновляем preview
                contrastPreview.style.color = fgColor;
                contrastPreview.style.backgroundColor = bgColor;
                
                // Рассчитываем контраст
                const contrast = chroma.contrast(fgColor, bgColor);
                const ratio = contrast.toFixed(2);
                
                // Обновляем score
                contrastScore.textContent = `Контраст: ${ratio}:1`;
                
                // Определяем рейтинг
                let rating = 'error';
                let ratingText = 'Fail';
                
                if (contrast >= 7) {
                    rating = 'success';
                    ratingText = 'AAA';
                } else if (contrast >= 4.5) {
                    rating = 'warning';
                    ratingText = 'AA';
                }
                
                // Обновляем рейтинг
                contrastRating.className = `rating ${rating}`;
                contrastRating.textContent = ratingText;
            };
            
            foregroundColor.addEventListener('input', updateContrast);
            backgroundColor.addEventListener('input', updateContrast);
            
            // Инициализация
            updateContrast();
        }
    }

    // Вспомогательные методы
    copyToClipboard(text) {
        navigator.clipboard.writeText(text).catch(err => {
            console.error('Ошибка копирования: ', err);
        });
    }

    showCopiedNotification(color) {
        // Создаем уведомление
        const notification = document.createElement('div');
        notification.className = 'copy-notification';
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px;">
                <div style="width: 16px; height: 16px; border-radius: 2px; background: ${color};"></div>
                <span>Цвет ${color} скопирован!</span>
            </div>
        `;
        
        // Стилизуем уведомление
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
        
        // Анимируем появление
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);
        
        // Удаляем через 3 секунды
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(20px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    showError(message) {
        // Создаем уведомление об ошибке
        const error = document.createElement('div');
        error.className = 'error-notification';
        error.textContent = message;
        
        // Стилизуем уведомление
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
        
        // Анимируем появление
        setTimeout(() => {
            error.style.opacity = '1';
            error.style.transform = 'translateY(0)';
        }, 10);
        
        // Удаляем через 3 секунды
        setTimeout(() => {
            error.style.opacity = '0';
            error.style.transform = 'translateY(20px)';
            setTimeout(() => {
                document.body.removeChild(error);
            }, 300);
        }, 3000);
    }
}

// Инициализация демо-менеджера
document.addEventListener('DOMContentLoaded', () => {
    window.demoManager = new DemoManager();
});

