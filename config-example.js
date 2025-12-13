/**
 * ============================================
 * SITE-SPECIFIC CONFIGURATION
 * ============================================
 * 
 * Purpose: Contains unique settings for this specific RTP website.
 * Location: Each website repository (not in core repository)
 * 
 * The core script.js reads this configuration if available,
 * allowing you to customize platform links, banners, and other
 * site-specific settings without modifying the core logic.
 * 
 * Usage:
 * 1. Copy this file to your website repository
 * 2. Rename to 'config.js'
 * 3. Customize the values below
 * 4. Load it BEFORE the core scripts in index.html:
 *    <script src="config.js"></script>
 *    <script src="https://YOUR-CDN/rtp-core/script.js"></script>
 */

const SITE_CONFIG = {
    // ============================================
    // SITE IDENTITY
    // ============================================
    
    /**
     * Site name displayed in the header
     * Example: "POP REDE", "RTP BRASIL", "SLOTS PRO"
     */
    siteName: "POP REDE",
    
    /**
     * Version displayed in the header tag
     * Example: "v8.9.1-BR", "v2.0-PRO", "v3.5.2"
     */
    siteVersion: "v8.9.1-BR",
    
    /**
     * Optional: Your domain for analytics/tracking
     */
    siteDomain: "poprede.com",
    
    
    // ============================================
    // PLATFORM LINKS (REQUIRED)
    // ============================================
    
    /**
     * Platform registration/affiliate links.
     * Each site should have UNIQUE platform links with your affiliate codes.
     * 
     * Structure:
     * - id: Number 1-17 (matches asset/{id}.png logo)
     * - url: Full registration URL with your affiliate code
     * 
     * IMPORTANT: These are YOUR unique links - customize them!
     */
    platforms: [
        { id: 1, url: 'https://popduqo.com?ch=23890' },
        { id: 2, url: 'https://popx5t.com?ch=13250' },
        { id: 3, url: 'https://popuptefa.com?ch=33323' },
        { id: 4, url: 'https://popbra.com/#/register?r_code=255862939718' },
        { id: 5, url: 'https://pop555.com/#/register?r_code=27363421531' },
        { id: 6, url: 'https://www.popbem66.com/#/register?r_code=62548100237' },
        { id: 7, url: 'https://poplua1.com/#/register?r_code=18527100158' },
        { id: 8, url: 'https://popkkk.com?code=252596' },
        { id: 9, url: 'https://pop678.com/#/register?r_code=84733330283' },
        { id: 10, url: 'https://pop888.com/#/register?r_code=82225748475' },
        { id: 11, url: 'https://26bet.com/?id=911719620' },
        { id: 12, url: 'https://poppg.com/#/register?r_code=87311374506' },
        { id: 13, url: 'https://q5gdw6.com?ch=2291' },
        { id: 14, url: 'https://popdezem.com?ch=30988' },
        { id: 15, url: 'https://9zqllv.com?ch=17356' },
        { id: 16, url: 'https://popceu.com/#/register?r_code=46223100109' },
        { id: 17, url: 'https://poplud.com?ch=30282' }
    ],
    
    
    // ============================================
    // SOCIAL LINKS (REQUIRED)
    // ============================================
    
    /**
     * Social media links displayed as floating buttons
     * Customize with YOUR community links
     */
    socialLinks: {
        telegram: 'https://poppremio.com/tg',
        whatsapp: 'https://pop-agent.com/wa'
    },
    
    
    // ============================================
    // BANNER CONFIGURATION (OPTIONAL)
    // ============================================
    
    /**
     * Banner images configuration
     * If not specified, uses default paths from index.html
     */
    banners: {
        // Main carousel banner images
        carousel: [
            'asset/banner/1 (1).jpg',
            'asset/banner/1 (2).jpg',
            'asset/banner/1 (3).jpg',
            'asset/banner/1 (4).jpg',
            'asset/banner/1 (5).jpg',
            'asset/banner/1 (6).jpg',
            'asset/banner/1 (7).jpg'
        ],
        
        // Side banner (desktop timer split)
        side: 'asset/banner/side-1.png',
        
        // Main banner click destination
        mainBannerLink: 'https://popduqo.com?ch=23890'
    },
    
    
    // ============================================
    // THEME COLORS (OPTIONAL)
    // ============================================
    
    /**
     * Custom color scheme
     * Alternatively, you can customize colors in styles.css
     * 
     * Examples:
     * - Site 1: Cyan/Green (default)
     * - Site 2: Red/Orange
     * - Site 3: Purple/Pink
     */
    theme: {
        primary: '#00f0ff',      // Main accent color (cyan)
        secondary: '#00ff88',    // Secondary accent (green)
        accent: '#b800ff',       // Tertiary accent (purple)
        background: '#050a1e'    // Main background
    },
    
    
    // ============================================
    // ANALYTICS (OPTIONAL)
    // ============================================
    
    /**
     * Google Analytics and tracking configuration
     */
    analytics: {
        googleAnalyticsId: 'G-PV01P9NMZL',
        enabled: true
    },
    
    
    // ============================================
    // FEATURE FLAGS (OPTIONAL)
    // ============================================
    
    /**
     * Enable/disable specific features per site
     */
    features: {
        // Enable "Load More" button for pagination
        enableLoadMore: true,
        
        // Number of games to show per page
        gamesPerPage: 100,
        
        // Code protection (disable right-click, F12, etc.)
        enableCodeProtection: false,
        
        // Show console window with system status
        enableConsole: true,
        
        // Enable animations and effects
        enableAnimations: true
    },
    
    
    // ============================================
    // IMAGE CONFIGURATION (OPTIONAL)
    // ============================================
    
    /**
     * Base URL for game images if using shared CDN
     * Leave empty to use local /images/ folder
     * 
     * Examples:
     * - Local: '' (default, uses /images/)
     * - GitHub: 'https://username.github.io/rtp-images/'
     * - jsDelivr: 'https://cdn.jsdelivr.net/gh/user/rtp-images/'
     */
    imageBaseURL: '',
    
    
    // ============================================
    // CUSTOM MESSAGES (OPTIONAL)
    // ============================================
    
    /**
     * Custom text messages displayed in the interface
     */
    messages: {
        loadingText: '⏳ INICIALIZANDO SISTEMA...',
        errorText: '❌ ERRO: Nenhum jogo encontrado',
        updateText: '🔄 ATUALIZAÇÃO DE RTP INICIADA',
        syncText: '✅ RTP atualizado! Valores sincronizados.'
    },
    
    
    // ============================================
    // ADVANCED SETTINGS (OPTIONAL)
    // ============================================
    
    /**
     * Advanced configuration for power users
     */
    advanced: {
        // Update interval in minutes (default: 3)
        updateInterval: 3,
        
        // Minimum RTP value (default: 30)
        rtpMin: 30,
        
        // Maximum RTP value (default: 99)
        rtpMax: 99,
        
        // Timezone for RTP calculations (DO NOT CHANGE)
        timezone: 'America/Sao_Paulo'
    }
};

// ============================================
// EXPORT CONFIGURATION
// ============================================

/**
 * Make configuration available to core scripts
 * Do not modify this section
 */
if (typeof window !== 'undefined') {
    window.SITE_CONFIG = SITE_CONFIG;
    console.log('✅ Site configuration loaded:', SITE_CONFIG.siteName);
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = SITE_CONFIG;
}

