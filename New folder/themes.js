// Theme system for W-Key
const themes = {
    default: {
        name: 'Default',
        colors: {
            primary: {
                start: '#667eea',
                end: '#764ba2',
                gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            },
            text: {
                primary: '#333333',
                secondary: '#666666',
                light: '#999999',
                white: '#ffffff'
            },
            background: {
                primary: '#ffffff',
                secondary: '#f8f9fa',
                overlay: 'rgba(0, 0, 0, 0.7)'
            },
            border: {
                light: '#dadce0',
                transparent: 'rgba(255, 255, 255, 0.3)'
            },
            shadow: {
                light: 'rgba(0, 0, 0, 0.1)',
                medium: 'rgba(0, 0, 0, 0.2)',
                heavy: 'rgba(0, 0, 0, 0.3)'
            },
            achievement: {
                gold: 'rgba(255, 215, 0, 0.9)',
                goldBorder: 'rgba(255, 215, 0, 0.3)'
            },
            progress: {
                colors: [
                    '#ff3d00', '#ff9100', '#ffea00', '#c6ff00',
                    '#00e5ff', '#2979ff', '#651fff', '#d500f9'
                ]
            }
        },
        effects: {
            blur: {
                light: '5px',
                medium: '10px',
                heavy: '20px'
            },
            transition: {
                fast: '0.2s ease',
                normal: '0.3s ease',
                slow: '0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            }
        }
    },
    dark: {
        name: 'Dark',
        colors: {
            primary: {
                start: '#2d1b4e',
                end: '#1a1a2e',
                gradient: 'linear-gradient(135deg, #2d1b4e 0%, #1a1a2e 100%)'
            },
            text: {
                primary: '#ffffff',
                secondary: '#cccccc',
                light: '#999999',
                white: '#ffffff'
            },
            background: {
                primary: '#121212',
                secondary: '#1e1e1e',
                overlay: 'rgba(0, 0, 0, 0.85)'
            },
            border: {
                light: '#333333',
                transparent: 'rgba(255, 255, 255, 0.1)'
            },
            shadow: {
                light: 'rgba(0, 0, 0, 0.2)',
                medium: 'rgba(0, 0, 0, 0.4)',
                heavy: 'rgba(0, 0, 0, 0.6)'
            },
            achievement: {
                gold: 'rgba(255, 215, 0, 0.7)',
                goldBorder: 'rgba(255, 215, 0, 0.2)'
            },
            progress: {
                colors: [
                    '#ff3d00', '#ff9100', '#ffea00', '#c6ff00',
                    '#00e5ff', '#2979ff', '#651fff', '#d500f9'
                ]
            }
        },
        effects: {
            blur: {
                light: '5px',
                medium: '10px',
                heavy: '20px'
            },
            transition: {
                fast: '0.2s ease',
                normal: '0.3s ease',
                slow: '0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            }
        }
    },
    neon: {
        name: 'Neon',
        colors: {
            primary: {
                start: '#ff00ff',
                end: '#00ffff',
                gradient: 'linear-gradient(135deg, #ff00ff 0%, #00ffff 100%)'
            },
            text: {
                primary: '#ffffff',
                secondary: '#00ffff',
                light: '#ff00ff',
                white: '#ffffff'
            },
            background: {
                primary: '#000000',
                secondary: '#1a1a1a',
                overlay: 'rgba(0, 0, 0, 0.9)'
            },
            border: {
                light: '#00ffff',
                transparent: 'rgba(255, 0, 255, 0.3)'
            },
            shadow: {
                light: 'rgba(0, 255, 255, 0.3)',
                medium: 'rgba(255, 0, 255, 0.3)',
                heavy: 'rgba(255, 255, 255, 0.3)'
            },
            achievement: {
                gold: 'rgba(255, 255, 0, 0.9)',
                goldBorder: 'rgba(255, 255, 0, 0.3)'
            },
            progress: {
                colors: [
                    '#ff00ff', '#ff00cc', '#ff0099', '#ff0066',
                    '#ff0033', '#ff0000', '#cc00ff', '#9900ff'
                ]
            }
        },
        effects: {
            blur: {
                light: '5px',
                medium: '10px',
                heavy: '20px'
            },
            transition: {
                fast: '0.2s ease',
                normal: '0.3s ease',
                slow: '0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            }
        }
    },
    kawaii: {
        name: 'Kawaii Pink',
        colors: {
            primary: {
                start: '#FF9DC4',
                end: '#FF69B4',
                gradient: 'linear-gradient(135deg, #FF9DC4 0%, #FF69B4 100%)'
            },
            text: {
                primary: '#FF4D8C',
                secondary: '#FF69B4',
                light: '#FFA5D2',
                white: '#ffffff'
            },
            background: {
                primary: '#FFF0F5',
                secondary: '#FFE4F1',
                overlay: 'rgba(255, 192, 203, 0.95)'
            },
            border: {
                light: '#FFB6C1',
                transparent: 'rgba(255, 182, 193, 0.3)'
            },
            shadow: {
                light: 'rgba(255, 105, 180, 0.1)',
                medium: 'rgba(255, 105, 180, 0.2)',
                heavy: 'rgba(255, 105, 180, 0.3)'
            },
            achievement: {
                gold: 'rgba(255, 223, 186, 0.9)',
                goldBorder: 'rgba(255, 182, 193, 0.5)'
            },
            progress: {
                colors: [
                    '#FF69B4', '#FFB6C1', '#FFC0CB', '#FFD1DC',
                    '#FFE4E1', '#FFF0F5', '#FFE4E1', '#FFD1DC'
                ]
            }
        },
        effects: {
            blur: {
                light: '5px',
                medium: '10px',
                heavy: '20px'
            },
            transition: {
                fast: '0.2s ease',
                normal: '0.3s ease',
                slow: '0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            }
        }
    }
};

// Theme management functions
let currentTheme = 'default';

function getCurrentTheme() {
    return themes[currentTheme];
}

function setTheme(themeName) {
    if (themes[themeName]) {
        currentTheme = themeName;
        applyTheme(themes[themeName]);
    } else {
        console.error(`Theme "${themeName}" not found`);
    }
}

function applyTheme(theme) {
    const root = document.documentElement;
    const body = document.body;
    
    // Set data-theme attribute for CSS overrides
    body.setAttribute('data-theme', currentTheme);
    
    // Apply primary colors
    root.style.setProperty('--primary-gradient', theme.colors.primary.gradient);
    root.style.setProperty('--primary-start', theme.colors.primary.start);
    root.style.setProperty('--primary-end', theme.colors.primary.end);
    
    // Apply text colors
    root.style.setProperty('--text-primary', theme.colors.text.primary);
    root.style.setProperty('--text-secondary', theme.colors.text.secondary);
    root.style.setProperty('--text-light', theme.colors.text.light);
    root.style.setProperty('--text-white', theme.colors.text.white);
    
    // Apply background colors
    root.style.setProperty('--bg-primary', theme.colors.background.primary);
    root.style.setProperty('--bg-secondary', theme.colors.background.secondary);
    root.style.setProperty('--bg-overlay', theme.colors.background.overlay);
    
    // Apply border colors
    root.style.setProperty('--border-light', theme.colors.border.light);
    root.style.setProperty('--border-transparent', theme.colors.border.transparent);
    
    // Apply shadow colors
    root.style.setProperty('--shadow-light', theme.colors.shadow.light);
    root.style.setProperty('--shadow-medium', theme.colors.shadow.medium);
    root.style.setProperty('--shadow-heavy', theme.colors.shadow.heavy);
    
    // Apply achievement colors
    root.style.setProperty('--achievement-gold', theme.colors.achievement.gold);
    root.style.setProperty('--achievement-gold-border', theme.colors.achievement.goldBorder);
    
    // Apply progress colors as a CSS array
    root.style.setProperty('--progress-colors', theme.colors.progress.colors.join(', '));
    
    // Apply effects
    root.style.setProperty('--blur-light', theme.effects.blur.light);
    root.style.setProperty('--blur-medium', theme.effects.blur.medium);
    root.style.setProperty('--blur-heavy', theme.effects.blur.heavy);
    
    // Apply transitions
    root.style.setProperty('--transition-fast', theme.effects.transition.fast);
    root.style.setProperty('--transition-normal', theme.effects.transition.normal);
    root.style.setProperty('--transition-slow', theme.effects.transition.slow);
}

// Export the theme system
export {
    themes,
    getCurrentTheme,
    setTheme
}; 