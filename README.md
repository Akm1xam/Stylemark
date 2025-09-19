# Stylemark - Генератор и менеджер системы дизайна

![Stylemark Logo](https://img.shields.io/badge/Stylemark-Design%20System-3B82F6?style=for-the-badge&logo=design&logoColor=white)
![Version](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)

<p align="center">
  <img src="/assets/images/Screenshot.png" alt="Stylemark Banner" width="800">
</p>

## 🚀 О проекте

**Stylemark** — это современный инструмент для создания, управления и применения дизайн-систем. Мы помогаем командам разработчиков и дизайнеров поддерживать согласованность интерфейсов, генерировать готовый код и ускорить процесс разработки.

### ✨ Ключевые возможности

- 🎨 **Централизованное управление** дизайн-токенами
- 🎯 **Визуальный конструктор** цветовых палитр и типографики
- 📦 **Автоматическая генерация** кода для CSS, SCSS, Tailwind
- 🌙 **Поддержка темной и светлой темы**
- 👥 **Совместная работа** над дизайн-системой
- 🚀 **Быстрый экспорт** и интеграция с проектами

## 📦 Быстрый старт

### Установка

```bash
# Клонирование репозитория
git clone https://github.com/your-username/stylemark.git

# Переход в директорию проекта
cd stylemark

# Установка зависимостей (если используете сборку)
npm install

# Запуск development сервера
npm run dev

# Или просто откройте index.html в браузере
```

### Использование

1. **Создайте проект** - дайте название вашей дизайн-системе
2. **Настройте токены** - цвета, шрифты, отступы, тени
3. **Предпросмотр** - увидьте изменения в реальном времени
4. **Экспортируйте код** - получите готовые файлы для вашего проекта

## 🛠 Технологии

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Chroma.js](https://img.shields.io/badge/Chroma.js-FF6B6B?style=for-the-badge)

- **Pure CSS** с CSS Variables для темизации
- **Vanilla JavaScript** для максимальной производительности
- **Chroma.js** для advanced манипуляций с цветом
- **Адаптивный дизайн** для всех устройств

## 📁 Структура проекта

```
stylemark/
├── index.html              # Главная страница
├── features.html           # Страница возможностей
├── demo.html              # Интерактивная демонстрация
├── pricing.html           # Страница с тарифами
├── docs.html              # Документация
├── styles/                # Стили проекта
│   ├── main.css           # Главный файл стилей
│   ├── components/        # Стили компонентов
│   └── utils/             # Утилиты и переменные
├── scripts/               # JavaScript файлы
│   ├── main.js           # Основная логика
│   ├── theme.js          # Управление темами
│   ├── demo.js           # Демо-функциональность
│   └── header.js         # Навигация и хедер
├── assets/               # Ресурсы
│   ├── icons/            # Иконки
│   └── images/           # Изображения
└── README.md             # Документация
```

## 🎨 Основные функции

### Цветовые палитры
- Генерация палитр из базового цвета
- Проверка контрастности WCAG
- Экспорт в различных форматах

```javascript
// Пример генерации палитры
const palette = generateColorPalette('#3B82F6');
// Возвращает: {50: '#EFF6FF', 100: '#DBEAFE', ..., 900: '#1E3A8A'}
```

### Типографика
- Настройка системных шрифтов
- Шкала размеров и межстрочных интервалов
- Предпросмотр текстовых стилей

### Пространство и размеры
- Единая шкала отступов
- Визуальный редактор spacing
- Адаптивные breakpoints

### Компоненты
- Конструктор UI компонентов
- Live-преview изменений
- Готовые шаблоны кнопок, input'ов и др.

## 🚀 Использование в проекте

### CSS Variables
```css
:root {
  --color-primary-500: #3b82f6;
  --font-family: 'Inter', sans-serif;
  --spacing-4: 1rem;
  --radius-md: 0.375rem;
}

.button {
  background: var(--color-primary-500);
  padding: var(--spacing-4);
  border-radius: var(--radius-md);
}
```

### Tailwind Config
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        }
      }
    }
  }
}
```

### JSON Tokens
```json
{
  "colors": {
    "primary": {
      "500": "#3b82f6"
    }
  },
  "typography": {
    "fontFamily": "Inter, sans-serif"
  }
}
```

## 🌟 Преимущества

### Для разработчиков
- ✅ Единый источник истины для стилей
- ✅ Согласованность across всех компонентов
- ✅ Быстрое внедрение изменений
- ✅ Готовый код для экспорта

### Для дизайнеров
- ✅ Визуальное управление дизайн-системой
- ✅ Проверка контрастности и accessibility
- ✅ Совместная работа с разработчиками
- ✅ Документация в реальном времени

### Для бизнеса
- ✅ Ускорение разработки на 40%
- ✅ Сокращение количества ошибок
- ✅ Упрощение поддержки и масштабирования
- ✅ Проще onboarding новых сотрудников

## 📊 Сравнение с аналогами

| Функция | Stylemark | Figma | Storybook | Zeroheight |
|---------|-----------|-------|-----------|------------|
| Генерация кода | ✅ | ❌ | ❌ | ⚠️ |
| Управление токенами | ✅ | ⚠️ | ❌ | ✅ |
| Совместная работа | ✅ | ✅ | ✅ | ✅ |
| Бесплатное использование | ✅ | ⚠️ | ✅ | ⚠️ |

## 🛣 Roadmap

- [ ] **Q1 2024** - Режим совместного редактирования
- [ ] **Q2 2024** - Интеграция с Figma API
- [ ] **Q3 2024** - Плагины для React/Vue
- [ ] **Q4 2024** - Мобильное приложение

## 👥 Сообщество

### Как можно поучаствовать?
- 🐛 Сообщайте об ошибках через [Issues](https://github.com/your-username/stylemark/issues)
- 💡 Предлагайте новые функции через [Discussions](https://github.com/your-username/stylemark/discussions)
- 🔧 Присылайте Pull Requests с улучшениями
- 📣 Расскажите о Stylemark в вашем комьюнити


## 🏆 Благодарности

- [Chroma.js](https://gka.github.io/chroma.js/) - мощная библиотека для работы с цветами
- [Inter font](https://rsms.me/inter/) - прекрасный шрифт для интерфейсов
- [Heroicons](https://heroicons.com/) - красивые иконки

## 📞 Контакты

- **Website**: [st.ma.19](https://t.me/stma19)
- **Email**: st.ma.19@yandex.ru


