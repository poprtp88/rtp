/**
 * ============================================
 * FUTURISTIC ANIMATION CONTROLLER
 * Advanced animation system for RTP interface
 * ============================================
 */

class FuturisticAnimationController {
    constructor() {
        this.isAnimating = false;
        this.animationQueue = [];
        this.currentAnimation = null;
        this.init();
    }

    /**
     * Initialize the animation controller
     * Sets up event listeners and default animations
     */
    init() {
        this.setupEventListeners();
        this.startDefaultAnimations();
        console.log('🚀 Futuristic Animation Controller initialized');
    }

    /**
     * Set up event listeners for animation triggers
     */
    setupEventListeners() {
        // Timer button click animation
        const timerButton = document.querySelector('.floating-timer-button');
        if (timerButton) {
            timerButton.addEventListener('click', () => this.triggerInterfaceShrink());
            timerButton.addEventListener('dblclick', () => this.triggerInterfaceExpand());
        }

        // Game card hover effects
        document.addEventListener('DOMContentLoaded', () => {
            this.setupGameCardAnimations();
        });

        // Keyboard shortcuts for animations
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                this.triggerInterfaceShrink();
            }
            if (e.ctrlKey && e.key === 'e') {
                e.preventDefault();
                this.triggerInterfaceExpand();
            }
            if (e.ctrlKey && e.key === 'm') {
                e.preventDefault();
                this.triggerMorphAnimation();
            }
        });

        // Auto-trigger animations on timer updates
        this.setupTimerAnimations();
    }

    /**
     * Start default continuous animations
     */
    startDefaultAnimations() {
        // Add energy rings to timer container
        const timerContainer = document.querySelector('.timer-container');
        if (timerContainer) {
            timerContainer.classList.add('energy-rings');
        }

        // Add holographic effect to game cards
        setTimeout(() => {
            this.addHolographicEffects();
        }, 1000);

        // Start morphing animation for provider section
        const providerSection = document.querySelector('.provider-section');
        if (providerSection) {
            providerSection.classList.add('futuristic-morph');
        }
    }

    /**
     * Trigger interface shrinking animation
     */
    triggerInterfaceShrink() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        const mainContent = document.querySelector('.main-content');
        const timerSection = document.querySelector('.timer-section');
        const gamesSection = document.querySelector('.games-section');

        // Add shrink animation classes
        if (mainContent) mainContent.classList.add('animate-shrink');
        if (timerSection) timerSection.classList.add('interface-shrink');
        if (gamesSection) gamesSection.classList.add('interface-shrink');

        // Add visual effects
        this.addShrinkEffects();

        // Remove classes after animation
        setTimeout(() => {
            if (mainContent) mainContent.classList.remove('animate-shrink');
            if (timerSection) timerSection.classList.remove('interface-shrink');
            if (gamesSection) gamesSection.classList.remove('interface-shrink');
            this.isAnimating = false;
        }, 2000);

        console.log('🔄 Interface shrink animation triggered');
    }

    /**
     * Trigger interface expanding animation
     */
    triggerInterfaceExpand() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        const mainContent = document.querySelector('.main-content');
        const timerSection = document.querySelector('.timer-section');
        const gamesSection = document.querySelector('.games-section');

        // Add expand animation classes
        if (mainContent) mainContent.classList.add('animate-expand');
        if (timerSection) timerSection.classList.add('interface-expand');
        if (gamesSection) gamesSection.classList.add('interface-expand');

        // Add visual effects
        this.addExpandEffects();

        // Remove classes after animation
        setTimeout(() => {
            if (mainContent) mainContent.classList.remove('animate-expand');
            if (timerSection) timerSection.classList.remove('interface-expand');
            if (gamesSection) gamesSection.classList.remove('interface-expand');
            this.isAnimating = false;
        }, 2000);

        console.log('🔄 Interface expand animation triggered');
    }

    /**
     * Trigger morphing animation for containers
     */
    triggerMorphAnimation() {
        const containers = document.querySelectorAll('.console-window, .game-card, .timer-container');
        
        containers.forEach((container, index) => {
            setTimeout(() => {
                container.classList.add('animate-morph');
                setTimeout(() => {
                    container.classList.remove('animate-morph');
                }, 3000);
            }, index * 200);
        });

        console.log('🔄 Morph animation triggered');
    }

    /**
     * Add holographic effects to game cards
     */
    addHolographicEffects() {
        const gameCards = document.querySelectorAll('.game-card');
        gameCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('holographic-effect');
            }, index * 100);
        });
    }

    /**
     * Setup game card hover animations
     */
    setupGameCardAnimations() {
        const gameCards = document.querySelectorAll('.game-card');
        
        gameCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.addCardHoverEffect(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.removeCardHoverEffect(card);
            });
        });
    }

    /**
     * Add hover effect to game card
     */
    addCardHoverEffect(card) {
        card.style.transform = 'translateY(-8px) scale(1.02)';
        card.style.boxShadow = '0 15px 40px rgba(0, 240, 255, 0.6), 0 0 60px rgba(0, 255, 136, 0.3)';
        card.style.filter = 'brightness(1.1) saturate(1.2)';
        
        // Add temporary energy ring
        card.classList.add('energy-rings');
        setTimeout(() => {
            card.classList.remove('energy-rings');
        }, 1000);
    }

    /**
     * Remove hover effect from game card
     */
    removeCardHoverEffect(card) {
        card.style.transform = '';
        card.style.boxShadow = '';
        card.style.filter = '';
    }

    /**
     * Add visual effects during shrink animation
     */
    addShrinkEffects() {
        // Create temporary particle effect
        this.createParticleEffect('shrink');
        
        // Flash the screen border
        document.body.style.boxShadow = 'inset 0 0 100px rgba(0, 240, 255, 0.3)';
        setTimeout(() => {
            document.body.style.boxShadow = '';
        }, 500);
    }

    /**
     * Add visual effects during expand animation
     */
    addExpandEffects() {
        // Create temporary particle effect
        this.createParticleEffect('expand');
        
        // Flash the screen border
        document.body.style.boxShadow = 'inset 0 0 100px rgba(0, 255, 136, 0.3)';
        setTimeout(() => {
            document.body.style.boxShadow = '';
        }, 500);
    }

    /**
     * Create particle effect for animations
     */
    createParticleEffect(type) {
        const colors = type === 'shrink' ? 
            ['#00f0ff', '#0088ff'] : 
            ['#00ff88', '#00f0ff'];
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                this.createParticle(colors[Math.floor(Math.random() * colors.length)]);
            }, i * 50);
        }
    }

    /**
     * Create individual particle
     */
    createParticle(color) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            box-shadow: 0 0 10px ${color};
        `;
        
        // Random starting position
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        particle.style.left = startX + 'px';
        particle.style.top = startY + 'px';
        
        document.body.appendChild(particle);
        
        // Animate particle
        const animation = particle.animate([
            { 
                transform: 'translate(0, 0) scale(1)',
                opacity: 1
            },
            { 
                transform: `translate(${(Math.random() - 0.5) * 200}px, ${(Math.random() - 0.5) * 200}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 1000,
            easing: 'ease-out'
        });
        
        animation.onfinish = () => {
            particle.remove();
        };
    }

    /**
     * Setup timer-based animations
     */
    setupTimerAnimations() {
        // Trigger shrink animation every 30 seconds
        setInterval(() => {
            if (!this.isAnimating && Math.random() > 0.7) {
                this.triggerInterfaceShrink();
            }
        }, 30000);

        // Trigger expand animation every 45 seconds
        setInterval(() => {
            if (!this.isAnimating && Math.random() > 0.8) {
                this.triggerInterfaceExpand();
            }
        }, 45000);

        // Trigger morph animation every 60 seconds
        setInterval(() => {
            if (Math.random() > 0.6) {
                this.triggerMorphAnimation();
            }
        }, 60000);
    }

    /**
     * Manual animation triggers for external use
     */
    startShrinkAnimation() {
        this.triggerInterfaceShrink();
    }

    startExpandAnimation() {
        this.triggerInterfaceExpand();
    }

    startMorphAnimation() {
        this.triggerMorphAnimation();
    }

    /**
     * Stop all animations
     */
    stopAllAnimations() {
        this.isAnimating = false;
        const elements = document.querySelectorAll('.animate-shrink, .animate-expand, .animate-morph, .interface-shrink, .interface-expand');
        elements.forEach(el => {
            el.classList.remove('animate-shrink', 'animate-expand', 'animate-morph', 'interface-shrink', 'interface-expand');
        });
    }
}

// Initialize animation controller when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.animationController = new FuturisticAnimationController();
});

// Export for external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FuturisticAnimationController;
}
