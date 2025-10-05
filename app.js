/**
 * Chiggi.us - Personal Website Application
 * Dynamic content loading, theme management, and tab routing
 */

// ============================================
// 1. CONFIG LOADER
// ============================================
class ConfigLoader {
    constructor() {
        this.config = null;
    }

    /**
     * Load configuration from config.json
     */
    async load() {
        try {
            const response = await fetch('config.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.config = await response.json();
            return this.config;
        } catch (error) {
            console.error('Error loading config.json:', error);
            return null;
        }
    }

    /**
     * Get nested value from config using dot notation
     */
    getNestedValue(path) {
        if (!this.config) return null;
        return path.split('.').reduce((obj, key) => obj?.[key], this.config);
    }
}

// ============================================
// 2. THEME MANAGER
// ============================================
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.themeToggleBtn = null;
        this.themeIcon = null;
    }

    /**
     * Initialize theme system
     */
    init() {
        // Get DOM elements
        this.themeToggleBtn = document.getElementById('themeToggle');
        this.themeIcon = document.getElementById('themeIcon');

        // Set initial theme
        this.applyTheme(this.currentTheme);

        // Add event listener for toggle button
        if (this.themeToggleBtn) {
            this.themeToggleBtn.addEventListener('click', () => this.toggle());
        }

        // Listen for system theme changes
        this.watchSystemTheme();
    }

    /**
     * Apply theme to document
     */
    applyTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        this.updateIcon();
        localStorage.setItem('theme', theme);
    }

    /**
     * Toggle between light and dark theme
     */
    toggle() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
    }

    /**
     * Update theme toggle icon
     */
    updateIcon() {
        if (this.themeIcon) {
            this.themeIcon.textContent = this.currentTheme === 'light' ? '☀️' : '🌙';
        }
    }

    /**
     * Watch for system theme preference changes
     */
    watchSystemTheme() {
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

        darkModeQuery.addEventListener('change', (e) => {
            // Only auto-switch if user hasn't manually set a preference
            if (!localStorage.getItem('theme')) {
                this.applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
}

// ============================================
// 3. TAB ROUTER
// ============================================
class TabRouter {
    constructor() {
        this.currentTab = null;
        this.tabs = [];
        this.tabButtons = [];
    }

    /**
     * Initialize tab routing system
     */
    init() {
        // Get all tab buttons (both desktop and mobile)
        this.tabButtons = Array.from(document.querySelectorAll('[data-tab]'));

        // Get all tab content sections
        this.tabs = Array.from(document.querySelectorAll('.tab-content'));

        // Add click listeners to all tab buttons
        this.tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const tabName = e.currentTarget.getAttribute('data-tab');
                this.showTab(tabName);
            });
        });

        // Handle browser back/forward
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.slice(1);
            if (hash) {
                this.showTab(hash, false); // Don't update hash again
            }
        });

        // Handle keyboard navigation
        this.tabButtons.forEach((button, index) => {
            button.addEventListener('keydown', (e) => {
                this.handleKeyboardNav(e, index);
            });
        });

        // Show initial tab (from URL hash or default to 'home')
        const initialTab = window.location.hash.slice(1) || 'home';
        this.showTab(initialTab);
    }

    /**
     * Show specific tab
     */
    showTab(tabName, updateHash = true) {
        // Hide all tabs
        this.tabs.forEach(tab => {
            tab.classList.remove('active');
        });

        // Remove active state from all buttons
        this.tabButtons.forEach(button => {
            button.classList.remove('active');
            button.setAttribute('aria-selected', 'false');
        });

        // Show selected tab
        const selectedTab = document.getElementById(tabName);
        if (selectedTab) {
            selectedTab.classList.add('active');
            this.currentTab = tabName;

            // Update button states
            this.tabButtons.forEach(button => {
                if (button.getAttribute('data-tab') === tabName) {
                    button.classList.add('active');
                    button.setAttribute('aria-selected', 'true');
                }
            });

            // Update URL hash
            if (updateHash) {
                window.location.hash = tabName;
            }

            // Scroll to top on tab change
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    /**
     * Handle keyboard navigation (Arrow keys)
     */
    handleKeyboardNav(event, currentIndex) {
        let newIndex = currentIndex;

        switch(event.key) {
            case 'ArrowLeft':
            case 'ArrowUp':
                event.preventDefault();
                newIndex = currentIndex > 0 ? currentIndex - 1 : this.tabButtons.length - 1;
                break;
            case 'ArrowRight':
            case 'ArrowDown':
                event.preventDefault();
                newIndex = currentIndex < this.tabButtons.length - 1 ? currentIndex + 1 : 0;
                break;
            case 'Home':
                event.preventDefault();
                newIndex = 0;
                break;
            case 'End':
                event.preventDefault();
                newIndex = this.tabButtons.length - 1;
                break;
            default:
                return;
        }

        // Focus and activate the new tab
        const newButton = this.tabButtons[newIndex];
        newButton.focus();
        const tabName = newButton.getAttribute('data-tab');
        this.showTab(tabName);
    }
}

// ============================================
// 4. CONTENT RENDERER
// ============================================
class ContentRenderer {
    constructor(configLoader) {
        this.configLoader = configLoader;
    }

    /**
     * Render dynamic content from config.json
     */
    render() {
        const config = this.configLoader.config;

        if (!config) {
            console.warn('Config not loaded, using default content');
            return;
        }

        // Home tab
        this.updateElement('homeIntro', config.home?.intro);
        this.updateElement('homeDescription', config.home?.description);

        // Chirag tab
        this.updateElement('chiragAbout', config.chirag?.about_me);
        this.updateElement('chiragWork', config.chirag?.my_work);
        this.updateElement('chiragSpiritual', config.chirag?.spiritual_side);

        // Render passions dynamically
        this.renderPassions(config.chirag?.passions);

        // Jiggi tab
        this.updateElement('jiggiIntro', config.jiggi?.intro);

        // Render Jiggi sections dynamically
        this.renderJiggiSections(config.jiggi?.sections);

        // Footer
        this.updateElement('footerText', config.site?.footer);

        // Update page title
        if (config.site?.title) {
            document.title = `${config.site.title} - Chirag & Jiggi's Journey Together`;
        }
    }

    /**
     * Update element text content if element exists
     */
    updateElement(id, content) {
        const element = document.getElementById(id);
        if (element && content) {
            element.textContent = content;
        }
    }

    /**
     * Render passions section dynamically
     */
    renderPassions(passions) {
        if (!passions || !Array.isArray(passions)) return;

        const container = document.getElementById('chiragPassions');
        if (!container) return;

        // Clear existing content
        container.innerHTML = '';

        // Render each passion
        passions.forEach(passion => {
            const passionDiv = document.createElement('div');
            passionDiv.className = 'passion-item';

            const icon = this.getPassionIcon(passion.name);

            // Check if passion has a URL
            if (passion.url) {
                passionDiv.classList.add('clickable');
                passionDiv.innerHTML = `
                    <h4>${icon} <a href="${passion.url}" target="_blank" rel="noopener noreferrer">${passion.name}</a></h4>
                    <p>${passion.desc}</p>
                `;
                passionDiv.style.cursor = 'pointer';
                passionDiv.addEventListener('click', (e) => {
                    if (e.target.tagName !== 'A') {
                        window.open(passion.url, '_blank', 'noopener,noreferrer');
                    }
                });
            } else {
                passionDiv.innerHTML = `
                    <h4>${icon} ${passion.name}</h4>
                    <p>${passion.desc}</p>
                `;
            }

            container.appendChild(passionDiv);
        });
    }

    /**
     * Get icon for passion based on name
     */
    getPassionIcon(name) {
        if (name.toLowerCase().includes('geet') || name.toLowerCase().includes('music')) {
            return '🎵';
        }
        if (name.toLowerCase().includes('tool') || name.toLowerCase().includes('automation')) {
            return '🔧';
        }
        return '💡';
    }

    /**
     * Render Jiggi sections dynamically
     */
    renderJiggiSections(sections) {
        if (!sections || !Array.isArray(sections)) return;

        const container = document.getElementById('jiggiSections');
        if (!container) return;

        // Clear existing content
        container.innerHTML = '';

        // Render each section
        sections.forEach(section => {
            const sectionDiv = document.createElement('div');
            sectionDiv.className = 'jiggi-card card';

            sectionDiv.innerHTML = `
                <h3>${section.title}</h3>
                <p>${section.text}</p>
            `;

            container.appendChild(sectionDiv);
        });
    }
}

// ============================================
// 5. APPLICATION INITIALIZATION
// ============================================
class App {
    constructor() {
        this.configLoader = new ConfigLoader();
        this.themeManager = new ThemeManager();
        this.tabRouter = new TabRouter();
        this.contentRenderer = new ContentRenderer(this.configLoader);
    }

    /**
     * Initialize the application
     */
    async init() {
        try {
            // Initialize theme first (no config needed)
            this.themeManager.init();

            // Load configuration
            await this.configLoader.load();

            // Render dynamic content
            this.contentRenderer.render();

            // Initialize tab routing
            this.tabRouter.init();

            console.log('✅ Chiggi.us application initialized successfully');
        } catch (error) {
            console.error('❌ Error initializing application:', error);
        }
    }
}

// ============================================
// 6. START APPLICATION
// ============================================

// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const app = new App();
        app.init();
    });
} else {
    // DOM already loaded
    const app = new App();
    app.init();
}

// Expose app to window for debugging (optional)
window.ChiggiApp = App;
