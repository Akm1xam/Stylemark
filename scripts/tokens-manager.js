// Design tokens management
class TokensManager {
    constructor() {
        this.tokens = {
            colors: {},
            typography: {},
            spacing: {},
            shadows: {},
            radii: {}
        };
        
        this.init();
    }

    init() {
        this.loadDefaultTokens();
        this.setupEventListeners();
    }

    loadDefaultTokens() {
        // Load default design tokens from CSS variables
        this.tokens.colors = this.extractColorTokens();
        this.tokens.typography = this.extractTypographyTokens();
        this.tokens.spacing = this.extractSpacingTokens();
        this.tokens.shadows = this.extractShadowTokens();
        this.tokens.radii = this.extractRadiusTokens();
    }

    extractColorTokens() {
        const colors = {};
        const styles = getComputedStyle(document.documentElement);
        
        // Extract color variables
        for (let i = 0; i < styles.length; i++) {
            const name = styles[i];
            if (name.startsWith('--color-')) {
                const value = styles.getPropertyValue(name);
                colors[name] = value.trim();
            }
        }
        
        return colors;
    }

    extractTypographyTokens() {
        const typography = {};
        const styles = getComputedStyle(document.documentElement);
        
        // Extract typography variables
        for (let i = 0; i < styles.length; i++) {
            const name = styles[i];
            if (name.startsWith('--font-') || name.startsWith('--line-height-')) {
                const value = styles.getPropertyValue(name);
                typography[name] = value.trim();
            }
        }
        
        return typography;
    }

    extractSpacingTokens() {
        const spacing = {};
        const styles = getComputedStyle(document.documentElement);
        
        // Extract spacing variables
        for (let i = 0; i < styles.length; i++) {
            const name = styles[i];
            if (name.startsWith('--space-')) {
                const value = styles.getPropertyValue(name);
                spacing[name] = value.trim();
            }
        }
        
        return spacing;
    }

    extractShadowTokens() {
        const shadows = {};
        const styles = getComputedStyle(document.documentElement);
        
        // Extract shadow variables
        for (let i = 0; i < styles.length; i++) {
            const name = styles[i];
            if (name.startsWith('--shadow-')) {
                const value = styles.getPropertyValue(name);
                shadows[name] = value.trim();
            }
        }
        
        return shadows;
    }

    extractRadiusTokens() {
        const radii = {};
        const styles = getComputedStyle(document.documentElement);
        
        // Extract radius variables
        for (let i = 0; i < styles.length; i++) {
            const name = styles[i];
            if (name.startsWith('--radius-')) {
                const value = styles.getPropertyValue(name);
                radii[name] = value.trim();
            }
        }
        
        return radii;
    }

    setupEventListeners() {
        // Listen for theme changes to update tokens
        window.addEventListener('themeChanged', () => {
            this.loadDefaultTokens();
        });
    }

    exportTokens(format = 'css') {
        switch (format) {
            case 'css':
                return this.exportAsCSS();
            case 'scss':
                return this.exportAsSCSS();
            case 'json':
                return this.exportAsJSON();
            case 'tailwind':
                return this.exportAsTailwind();
            default:
                return this.exportAsCSS();
        }
    }

    exportAsCSS() {
        let css = ':root {\n';
        
        // Colors
        Object.entries(this.tokens.colors).forEach(([key, value]) => {
            css += `  ${key}: ${value};\n`;
        });
        
        // Typography
        Object.entries(this.tokens.typography).forEach(([key, value]) => {
            css += `  ${key}: ${value};\n`;
        });
        
        // Spacing
        Object.entries(this.tokens.spacing).forEach(([key, value]) => {
            css += `  ${key}: ${value};\n`;
        });
        
        // Shadows
        Object.entries(this.tokens.shadows).forEach(([key, value]) => {
            css += `  ${key}: ${value};\n`;
        });
        
        // Radii
        Object.entries(this.tokens.radii).forEach(([key, value]) => {
            css += `  ${key}: ${value};\n`;
        });
        
        css += '}';
        return css;
    }

    exportAsSCSS() {
        let scss = '';
        
        // Colors
        Object.entries(this.tokens.colors).forEach(([key, value]) => {
            scss += `${key}: ${value};\n`;
        });
        
        // Typography
        Object.entries(this.tokens.typography).forEach(([key, value]) => {
            scss += `${key}: ${value};\n`;
        });
        
        // Spacing
        Object.entries(this.tokens.spacing).forEach(([key, value]) => {
            scss += `${key}: ${value};\n`;
        });
        
        // Shadows
        Object.entries(this.tokens.shadows).forEach(([key, value]) => {
            scss += `${key}: ${value};\n`;
        });
        
        // Radii
        Object.entries(this.tokens.radii).forEach(([key, value]) => {
            scss += `${key}: ${value};\n`;
        });
        
        return scss;
    }

    exportAsJSON() {
        return JSON.stringify(this.tokens, null, 2);
    }

    exportAsTailwind() {
        const config = {
            theme: {
                extend: {
                    colors: {},
                    fontSize: {},
                    spacing: {},
                    boxShadow: {},
                    borderRadius: {}
                }
            }
        };
        
        // Process colors
        Object.entries(this.tokens.colors).forEach(([key, value]) => {
            const name = key.replace('--color-', '').replace(/-(\d+)$/, '-$1');
            config.theme.extend.colors[name] = value;
        });
        
        // Process typography (fontSize)
        Object.entries(this.tokens.typography).forEach(([key, value]) => {
            if (key.startsWith('--font-size-')) {
                const name = key.replace('--font-size-', '');
                config.theme.extend.fontSize[name] = value;
            }
        });
        
        // Process spacing
        Object.entries(this.tokens.spacing).forEach(([key, value]) => {
            const name = key.replace('--space-', '');
            config.theme.extend.spacing[name] = value;
        });
        
        // Process shadows
        Object.entries(this.tokens.shadows).forEach(([key, value]) => {
            const name = key.replace('--shadow-', '');
            config.theme.extend.boxShadow[name] = value;
        });
        
        // Process radii
        Object.entries(this.tokens.radii).forEach(([key, value]) => {
            const name = key.replace('--radius-', '');
            config.theme.extend.borderRadius[name] = value;
        });
        
        return `module.exports = ${JSON.stringify(config, null, 2)}`;
    }

    importTokens(tokens) {
        // Validate tokens structure
        if (tokens && typeof tokens === 'object') {
            this.tokens = { ...this.tokens, ...tokens };
            this.applyTokens();
            return true;
        }
        return false;
    }

    applyTokens() {
        // Apply tokens to document root
        const root = document.documentElement;
        
        // Apply colors
        Object.entries(this.tokens.colors).forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });
        
        // Apply typography
        Object.entries(this.tokens.typography).forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });
        
        // Apply spacing
        Object.entries(this.tokens.spacing).forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });
        
        // Apply shadows
        Object.entries(this.tokens.shadows).forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });
        
        // Apply radii
        Object.entries(this.tokens.radii).forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });
    }
}

// Initialize tokens manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.tokensManager = new TokensManager();
});