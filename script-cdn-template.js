/**
 * ============================================
 * POP REDE - SISTEMA DE ANÁLISE RTP v2.0
 * CDN VERSION - For Multi-Site Architecture
 * ============================================
 * 
 * Purpose: Core RTP system that runs from centralized CDN
 * Location: Core repository (served via GitHub Pages)
 * 
 * IMPORTANT: This version uses CDN paths for ALL assets
 * (images, banners, platform logos)
 */

// ============================================
// CDN CONFIGURATION
// ============================================

/**
 * CDN Base URL Configuration
 * Replace YOUR-USERNAME with your actual GitHub username
 * 
 * This allows all websites to load shared assets from one location
 */
const CDN_BASE = 'https://YOUR-USERNAME.github.io/rtp-core';

const CDN_PATHS = {
    // Game images (HACKSAW, PG SOFT, Pragmatic Play, etc.)
    images: `${CDN_BASE}/images`,
    
    // Banner carousel images
    banner: `${CDN_BASE}/banner`,
    
    // Platform logos (1.png through 17.png) and favicon
    asset: `${CDN_BASE}/asset`
};

console.log('✅ CDN Configuration loaded:', CDN_PATHS);

// ============================================
// CONFIGURAÇÃO
// ============================================

const CONFIG = {
    gamesPerProvider: 0,
    rtpRanges: {
        min: 30,
        max: 99
    },
    multipliers: [
        { value: '3X', type: 'low' },
        { value: '7X', type: 'low' },
        { value: '9X', type: 'medium' },
        { value: '10X', type: 'medium' },
        { value: '11X', type: 'medium' },
        { value: '13X', type: 'high' },
        { value: '15X', type: 'high' },
        { value: '17X', type: 'high' },
        { value: '20X', type: 'high' }
    ],
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
    ]
};

// Allow site-specific config override
if (typeof window.SITE_CONFIG !== 'undefined') {
    // Merge site-specific config
    if (window.SITE_CONFIG.platforms) {
        CONFIG.platforms = window.SITE_CONFIG.platforms;
        console.log('✅ Using site-specific platform links');
    }
}

// Estado da aplicação
let showAllGames = true;
let currentProvider = 'all';
let allGames = [];
let systemStartTime = Date.now();
let cycleCount = 1;

// Pagination Settings
const GAMES_PER_PAGE = 100;
let visibleLimit = GAMES_PER_PAGE;

// ============================================
// TIMEZONE FUNCTIONS (São Paulo Time)
// ============================================

/**
 * Generates a time-based seed synchronized to São Paulo timezone (UTC-3).
 * This ensures all users worldwide see the same RTP values.
 */
function getTimeSeed() {
    const saoPauloTime = new Date(new Date().toLocaleString('en-US', { 
        timeZone: 'America/Sao_Paulo' 
    }));
    
    const currentMinute = saoPauloTime.getMinutes();
    const roundedMinute = Math.floor(currentMinute / 3) * 3;
    
    const totalMinutes = saoPauloTime.getFullYear() * 525600 +
                        saoPauloTime.getMonth() * 43800 +
                        saoPauloTime.getDate() * 1440 +
                        saoPauloTime.getHours() * 60 +
                        roundedMinute;
    
    console.log(`🕐 TimeSeed (São Paulo): Minuto=${currentMinute}, Arredondado=${roundedMinute}, Seed=${totalMinutes}`);
    
    return totalMinutes;
}

// [Other timezone functions remain the same - seededRandom, etc.]
// ... (keeping them for brevity, but they're identical to your current script.js)

// ============================================
// GAME CARD CREATION (WITH CDN PATHS)
// ============================================

/**
 * Creates a game card element with CDN-based image paths
 * 
 * @param {Object} game - Game object with provider and imageName
 * @param {number} index - Card index for animation delay
 * @returns {HTMLElement} Game card element
 */
function createGameCard(game, index) {
    const rtp = generateRandomRTP(game.id);
    const colorClass = getRTPColorClass(rtp);
    
    const card = document.createElement('div');
    card.className = 'game-card fade-in';
    card.style.animationDelay = `${index * 0.02}s`;
    
    // Click handler to open modal
    card.addEventListener('click', () => {
        openPlatformModal();
    });
    
    // Priority badge
    let priorityBadge = '';
    if (game.priority <= 3) {
        const priorityNames = {
            1: 'FORTUNE',
            2: 'POPULAR',
            3: 'DESTAQUE'
        };
        priorityBadge = `<div class="game-priority-badge priority-${game.priority}">${priorityNames[game.priority] || 'HOT'}</div>`;
    }
    
    // ✅ CRITICAL: Use CDN path for game images
    const imagePath = `${CDN_PATHS.images}/${game.provider}/${game.imageName}`;
    
    card.innerHTML = `
        <div class="game-image-container">
            <img src="${imagePath}" alt="${game.imageName}" class="game-image" loading="lazy" onerror="this.src='${CDN_PATHS.asset}/placeholder.png'">
            ${priorityBadge}
        </div>
        <div class="game-info">
            <div class="game-rtp-container">
                <div class="rtp-text-row">
                    <span class="rtp-label">RTP</span>
                    <span class="rtp-value rtp-${colorClass}">${rtp}%</span>
                </div>
                <div class="rtp-bar-container">
                    <div class="rtp-bar-fill rtp-fill-${colorClass}" style="width: ${rtp}%"></div>
                </div>
            </div>
        </div>
    `;
    
    return card;
}

// ============================================
// GAME LOADING (WITH CDN PATHS)
// ============================================

/**
 * Loads all games from data sources
 * Images are loaded from CDN, not locally
 */
async function loadAllGames() {
    allGames = [];
    
    // Try PHP API first (if available)
    try {
        const response = await fetch('get_images.php');
        
        if (response.ok) {
            const data = await response.json();
            
            if (data.success && data.providers) {
                for (const [provider, images] of Object.entries(data.providers)) {
                    images.forEach(imageName => {
                        const gameId = `${provider}/${imageName}`;
                        const priority = window.detectGamePriority 
                            ? window.detectGamePriority(imageName, provider) 
                            : 4;
                        
                        allGames.push({
                            id: gameId,
                            provider: provider,
                            imageName: imageName,
                            // ✅ Use CDN path
                            imagePath: `${CDN_PATHS.images}/${provider}/${imageName}`,
                            priority: priority
                        });
                    });
                }
                
                if (window.sortGamesByPopularity) {
                    allGames = window.sortGamesByPopularity(allGames);
                }
                
                console.log(`✅ ${allGames.length} jogos carregados dinamicamente (CDN)`);
                return;
            }
        }
    } catch (error) {
        console.warn('⚠️ API PHP indisponível, usando método alternativo...');
    }
    
    // Fallback: Use provider_image_lists.js
    if (window.PROVIDER_IMAGES) {
        for (const [provider, images] of Object.entries(window.PROVIDER_IMAGES)) {
            images.forEach(imageName => {
                const gameId = `${provider}/${imageName}`;
                const priority = window.detectGamePriority 
                    ? window.detectGamePriority(imageName, provider) 
                    : 4;
                
                allGames.push({
                    id: gameId,
                    provider: provider,
                    imageName: imageName,
                    // ✅ Use CDN path
                    imagePath: `${CDN_PATHS.images}/${provider}/${imageName}`,
                    priority: priority
                });
            });
        }
        
        if (window.sortGamesByPopularity) {
            allGames = window.sortGamesByPopularity(allGames);
        }
        
        console.log(`✅ ${allGames.length} jogos carregados por popularidade (CDN)`);
        return;
    }
    
    console.error('❌ Erro ao carregar jogos');
}

// ============================================
// PLATFORM MODAL (WITH CDN PATHS)
// ============================================

/**
 * Generates platform cards with logos from CDN
 */
function generatePlatformCards() {
    const modalGrid = document.getElementById('popupButtons');
    if (!modalGrid) return;
    
    modalGrid.innerHTML = '';
    
    CONFIG.platforms.forEach((platform, index) => {
        const card = document.createElement('a');
        card.href = '#';
        
        const isGold = index === 0;
        card.className = isGold ? 'platform-card platform-gold' : 'platform-card';
        card.setAttribute('data-url', platform.url);
        
        const hotBadge = isGold ? '<div class="platform-hot">EM BREVE</div>' : '';
        
        // ✅ CRITICAL: Use CDN path for platform logos
        const logoPath = `${CDN_PATHS.asset}/${platform.id}.png`;
        
        card.innerHTML = `
            ${hotBadge}
            <div class="platform-overlay"></div>
            <img src="${logoPath}" alt="Plataforma ${platform.id}" onerror="this.style.display='none'" />
            <div class="platform-status">
                <span class="status-dot"></span>
                ONLINE
            </div>
        `;
        
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const url = this.getAttribute('data-url');
            console.log(`🔗 Abrindo plataforma: ${url}`);
            window.open(url, '_blank');
        });
        
        modalGrid.appendChild(card);
    });
    
    console.log(`✅ ${CONFIG.platforms.length} plataformas carregadas (CDN logos)`);
}

// ============================================
// BANNER SETUP (INSTRUCTIONS FOR HTML)
// ============================================

/**
 * NOTE: Banners should be referenced in your HTML like this:
 * 
 * <div class="carousel-slide">
 *     <img src="https://YOUR-USERNAME.github.io/rtp-core/banner/1%20(1).jpg" alt="Banner 1">
 * </div>
 * 
 * Same for side banner:
 * <img src="https://YOUR-USERNAME.github.io/rtp-core/banner/side-1.png" alt="Side Banner">
 * 
 * This way, all sites use the same banners from CDN!
 */

// ============================================
// REMAINING FUNCTIONS
// ============================================

// [Include all your other functions here - timer, carousel, etc.]
// They remain the same as your current script.js
// Just make sure any image/asset references use CDN_PATHS

// ... [rest of your script.js functions] ...

console.log('✅ CDN-enabled RTP system loaded');
console.log('📦 Assets loading from:', CDN_BASE);

