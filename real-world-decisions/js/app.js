// Main Application Controller
class RealWorldDecisionsApp {
    constructor() {
        this.isInitialized = false;
        this.loadingScreen = null;
        this.currentScreen = 'main-menu';
        
        // Bind methods
        this.init = this.init.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    }

    async init() {
        try {
            console.log('Initializing Real World Decisions App...');
            
            // Show loading screen
            this.showLoadingScreen();
            
            // Initialize components
            await this.initializeComponents();
            
            // Set up event listeners
            this.setupEventListeners();
            
            // Apply initial settings
            this.applyInitialSettings();
            
            // Check for saved game state
            this.checkSavedState();
            
            // Hide loading screen and show main menu
            setTimeout(() => {
                this.hideLoadingScreen();
                this.showMainMenu();
                this.isInitialized = true;
                console.log('App initialization complete');
            }, 2000);
            
        } catch (error) {
            console.error('Failed to initialize app:', error);
            this.showErrorMessage('Failed to load the application. Please refresh the page.');
        }
    }

    showLoadingScreen() {
        this.loadingScreen = document.getElementById('loading-screen');
        if (this.loadingScreen) {
            this.loadingScreen.style.display = 'flex';
        }
    }

    hideLoadingScreen() {
        if (this.loadingScreen) {
            this.loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                this.loadingScreen.style.display = 'none';
            }, 1000);
        }
    }

    async initializeComponents() {
        // Validate game data
        const validationErrors = DataUtils.validateScenarioData();
        if (validationErrors.length > 0) {
            console.warn('Data validation warnings:', validationErrors);
        }

        // Initialize game settings
        gameSettings.applySettings();

        // Initialize game state
        gameState.reset();

        // Set up timer if needed
        const timerDuration = gameSettings.get('timerDuration');
        gameTimer.reset(timerDuration);

        console.log('Components initialized');
    }

    setupEventListeners() {
        // Window events
        window.addEventListener('resize', this.handleResize);
        window.addEventListener('beforeunload', this.handleBeforeUnload.bind(this));
        document.addEventListener('visibilitychange', this.handleVisibilityChange);

        // Keyboard shortcuts
        document.addEventListener('keydown', this.handleKeydown.bind(this));

        // Touch events for smart board optimization
        this.setupTouchEvents();

        // Auto-save game state periodically
        setInterval(() => {
            if (gameState.isGameActive) {
                gameState.saveToLocalStorage();
            }
        }, 30000); // Save every 30 seconds

        console.log('Event listeners set up');
    }

    setupTouchEvents() {
        // Prevent default touch behaviors that might interfere
        document.addEventListener('touchstart', function(e) {
            // Allow normal touch behavior
        }, { passive: true });

        document.addEventListener('touchmove', function(e) {
            // Prevent scrolling on game elements
            if (e.target.closest('.game-content, .worksheet-content')) {
                e.preventDefault();
            }
        }, { passive: false });

        // Add visual feedback for touch interactions
        document.addEventListener('touchstart', function(e) {
            if (e.target.matches('button, .btn, .category-btn, .token-btn, .mode-card')) {
                e.target.classList.add('touch-active');
            }
        });

        document.addEventListener('touchend', function(e) {
            if (e.target.matches('button, .btn, .category-btn, .token-btn, .mode-card')) {
                setTimeout(() => {
                    e.target.classList.remove('touch-active');
                }, 150);
            }
        });
    }

    applyInitialSettings() {
        // Apply saved settings
        gameSettings.applySettings();

        // Set up responsive design classes
        this.updateResponsiveClasses();

        // Initialize accessibility features
        this.initializeAccessibility();
    }

    updateResponsiveClasses() {
        const body = document.body;
        const width = window.innerWidth;
        const height = window.innerHeight;

        // Add device type classes
        body.classList.remove('mobile', 'tablet', 'desktop', 'smart-board');
        
        if (width >= 1920 && height >= 1080) {
            body.classList.add('smart-board');
        } else if (width >= 1024) {
            body.classList.add('desktop');
        } else if (width >= 768) {
            body.classList.add('tablet');
        } else {
            body.classList.add('mobile');
        }

        // Add orientation class
        body.classList.remove('landscape', 'portrait');
        body.classList.add(width > height ? 'landscape' : 'portrait');
    }

    initializeAccessibility() {
        // Add ARIA labels and roles
        this.addAriaLabels();

        // Set up focus management
        this.setupFocusManagement();

        // Add screen reader announcements
        this.setupScreenReaderSupport();
    }

    addAriaLabels() {
        // Add ARIA labels to interactive elements
        document.querySelectorAll('button:not([aria-label])').forEach(button => {
            const text = button.textContent.trim();
            if (text) {
                button.setAttribute('aria-label', text);
            }
        });

        // Add roles to main sections
        document.querySelectorAll('.screen').forEach(screen => {
            screen.setAttribute('role', 'main');
        });
    }

    setupFocusManagement() {
        // Trap focus within active screen
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                const activeScreen = document.querySelector('.screen.active');
                if (activeScreen) {
                    const focusableElements = activeScreen.querySelectorAll(
                        'button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
                    );
                    
                    if (focusableElements.length > 0) {
                        const firstElement = focusableElements[0];
                        const lastElement = focusableElements[focusableElements.length - 1];
                        
                        if (e.shiftKey && document.activeElement === firstElement) {
                            e.preventDefault();
                            lastElement.focus();
                        } else if (!e.shiftKey && document.activeElement === lastElement) {
                            e.preventDefault();
                            firstElement.focus();
                        }
                    }
                }
            }
        });
    }

    setupScreenReaderSupport() {
        // Create live region for announcements
        const liveRegion = document.createElement('div');
        liveRegion.id = 'live-region';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.style.position = 'absolute';
        liveRegion.style.left = '-10000px';
        liveRegion.style.width = '1px';
        liveRegion.style.height = '1px';
        liveRegion.style.overflow = 'hidden';
        document.body.appendChild(liveRegion);
    }

    announceToScreenReader(message) {
        const liveRegion = document.getElementById('live-region');
        if (liveRegion) {
            liveRegion.textContent = message;
        }
    }

    checkSavedState() {
        // Check if there's a saved game state
        if (gameState.loadFromLocalStorage()) {
            console.log('Found saved game state');
            // Could show a "Resume Game" option here
        }
    }

    showMainMenu() {
        showScreen('main-menu');
        this.currentScreen = 'main-menu';
        
        // Focus first interactive element
        setTimeout(() => {
            const firstButton = document.querySelector('#main-menu button');
            if (firstButton) {
                firstButton.focus();
            }
        }, 100);
    }

    handleResize() {
        this.updateResponsiveClasses();
        
        // Adjust UI elements for new size
        this.adjustUIForSize();
    }

    adjustUIForSize() {
        // Adjust font sizes and spacing for different screen sizes
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        // Smart board optimizations
        if (width >= 1920 && height >= 1080) {
            document.documentElement.style.setProperty('--base-font-size', '20px');
            document.documentElement.style.setProperty('--touch-target-min', '60px');
        } else {
            document.documentElement.style.setProperty('--base-font-size', '16px');
            document.documentElement.style.setProperty('--touch-target-min', '44px');
        }
    }

    handleVisibilityChange() {
        if (document.hidden) {
            // Page is hidden - pause timers, save state
            if (gameTimer.isRunning) {
                gameTimer.pause();
            }
            if (gameState.isGameActive) {
                gameState.saveToLocalStorage();
            }
        } else {
            // Page is visible - resume if appropriate
            if (gameState.isGameActive && gameState.gameMode === 'quick-decision') {
                // Only auto-resume for timed modes
                gameTimer.resume();
            }
        }
    }

    handleBeforeUnload(e) {
        // Save game state before page unload
        if (gameState.isGameActive) {
            gameState.saveToLocalStorage();
            
            // Show confirmation for active games
            e.preventDefault();
            e.returnValue = 'You have an active game. Are you sure you want to leave?';
            return e.returnValue;
        }
    }

    handleKeydown(e) {
        // Global keyboard shortcuts
        switch(e.key) {
            case 'Escape':
                this.handleEscapeKey();
                break;
            case 'F11':
                e.preventDefault();
                this.toggleFullscreen();
                break;
            case 'h':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    this.showHelp();
                }
                break;
        }
    }

    handleEscapeKey() {
        // Handle escape key based on current screen
        switch(this.currentScreen) {
            case 'worksheet-screen':
                if (confirm('Exit worksheet? Progress will be lost.')) {
                    showScreen('game-screen');
                }
                break;
            case 'evaluation-screen':
                if (confirm('Cancel evaluation?')) {
                    showScreen('game-screen');
                }
                break;
            case 'settings':
            case 'staff-login':
                showScreen('main-menu');
                break;
        }
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log('Error attempting to enable fullscreen:', err);
            });
        } else {
            document.exitFullscreen();
        }
    }

    showHelp() {
        // Show help modal or navigate to help screen
        this.announceToScreenReader('Help information displayed');
        // Implementation would show help content
    }

    showErrorMessage(message) {
        // Create error display
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <div class="error-content">
                <i class="fas fa-exclamation-triangle"></i>
                <h2>Error</h2>
                <p>${message}</p>
                <button onclick="location.reload()" class="btn primary">
                    <i class="fas fa-refresh"></i> Reload Page
                </button>
            </div>
        `;
        
        document.body.appendChild(errorDiv);
    }

    // Public API methods
    getCurrentScreen() {
        return this.currentScreen;
    }

    isReady() {
        return this.isInitialized;
    }

    getGameState() {
        return gameState;
    }

    getSettings() {
        return gameSettings;
    }

    // Development/Debug methods
    exportDebugInfo() {
        return {
            appState: {
                initialized: this.isInitialized,
                currentScreen: this.currentScreen,
                timestamp: new Date().toISOString()
            },
            gameState: gameState.exportGameData(),
            settings: gameSettings.settings,
            browserInfo: {
                userAgent: navigator.userAgent,
                viewport: {
                    width: window.innerWidth,
                    height: window.innerHeight
                },
                features: {
                    touch: 'ontouchstart' in window,
                    fullscreen: !!document.fullscreenEnabled
                }
            }
        };
    }

    resetApp() {
        // Reset everything to initial state
        gameState.reset();
        gameState.clearSavedState();
        gameSettings.reset();
        this.showMainMenu();
        console.log('App reset to initial state');
    }
}

// Global app instance
let app;

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    app = new RealWorldDecisionsApp();
    app.init();
});

// Global functions for HTML onclick handlers
window.showScreen = showScreen;
window.setTeamCount = setTeamCount;
window.updateTeamName = updateTeamName;
window.updatePlayer = updatePlayer;
window.selectGameMode = selectGameMode;
window.startGame = startGame;
window.selectCategory = selectCategory;
window.drawScenario = drawScenario;
window.showWorksheet = showWorksheet;
window.previousStep = previousStep;
window.nextStep = nextStep;
window.submitWorksheet = submitWorksheet;
window.assignToken = assignToken;
window.submitEvaluation = submitEvaluation;
window.pauseGame = pauseGame;
window.endGame = endGame;
window.startNewGame = startNewGame;
window.exportResults = exportResults;
window.staffLogin = staffLogin;
window.saveSettings = saveSettings;
window.resetSettings = resetSettings;

// Export app for external access
window.RealWorldDecisionsApp = app;

// Service Worker registration for PWA functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/real-world-decisions/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// Add CSS for touch feedback and error messages
const additionalStyles = `
<style>
.touch-active {
    transform: scale(0.95);
    opacity: 0.8;
}

.error-message {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10001;
}

.error-content {
    background: white;
    padding: 40px;
    border-radius: 16px;
    text-align: center;
    max-width: 500px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.error-content i {
    font-size: 48px;
    color: var(--danger-red);
    margin-bottom: 20px;
}

.error-content h2 {
    margin-bottom: 15px;
    color: var(--gray-800);
}

.error-content p {
    margin-bottom: 25px;
    color: var(--gray-600);
    line-height: 1.6;
}

.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--white);
    padding: 16px 20px;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-large);
    display: flex;
    align-items: center;
    gap: 12px;
    z-index: 1000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
}

.notification.show {
    transform: translateX(0);
}

.notification.success {
    border-left: 4px solid var(--success-green);
}

.notification.error {
    border-left: 4px solid var(--danger-red);
}

.notification.info {
    border-left: 4px solid var(--primary-blue);
}

.notification i {
    color: var(--primary-blue);
}

.notification.success i {
    color: var(--success-green);
}

.notification.error i {
    color: var(--danger-red);
}

/* Smart board specific optimizations */
@media (min-width: 1920px) and (min-height: 1080px) {
    .btn {
        min-height: 60px;
        padding: 20px 40px;
        font-size: 20px;
    }
    
    .form-group input,
    .form-group textarea,
    .form-group select {
        min-height: 60px;
        padding: 20px;
        font-size: 18px;
    }
    
    .category-btn,
    .token-btn {
        min-height: 70px;
        padding: 25px;
        font-size: 18px;
    }
    
    .menu-btn {
        min-height: 120px;
        padding: 50px 40px;
    }
}

/* High contrast mode enhancements */
body.high-contrast .btn {
    border: 2px solid currentColor;
}

body.high-contrast .form-group input,
body.high-contrast .form-group textarea,
body.high-contrast .form-group select {
    border: 3px solid currentColor;
}

/* Focus indicators for accessibility */
button:focus,
input:focus,
textarea:focus,
select:focus {
    outline: 3px solid var(--primary-blue);
    outline-offset: 2px;
}

body.high-contrast button:focus,
body.high-contrast input:focus,
body.high-contrast textarea:focus,
body.high-contrast select:focus {
    outline: 4px solid #ffff00;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', additionalStyles);