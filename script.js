/**
 * POP REDE - SISTEMA DE ANÁLISE RTP v2.0
 * Ultra Hacker Edition - 100% Português Brasileiro
 * Mobile-First | Click para Registrar | Sistemático
 */

// ============================================
// CODE PROTECTION SYSTEM
// ============================================

/* BAGIAN INI UNTUK DISABLE SEMUA DEVELOPER TOOLS
(function() {
    'use strict';
    
    // Disable right-click context menu
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
    document.addEventListener('keydown', function(e) {
        // F12
        if (e.keyCode === 123) {
            e.preventDefault();
            return false;
        }
        // Ctrl+Shift+I (Developer Tools)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
            e.preventDefault();
            return false;
        }
        // Ctrl+Shift+J (Console)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
            e.preventDefault();
            return false;
        }
        // Ctrl+U (View Source)
        if (e.ctrlKey && e.keyCode === 85) {
            e.preventDefault();
            return false;
        }
        // Ctrl+Shift+C (Inspect Element)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
            e.preventDefault();
            return false;
        }
        // Ctrl+S (Save Page)
        if (e.ctrlKey && e.keyCode === 83) {
            e.preventDefault();
            return false;
        }
    });
    
    // Disable text selection
    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Disable drag and drop
    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Clear console periodically
    setInterval(function() {
        console.clear();
    }, 1000);
    
    // Detect developer tools
    let devtools = {
        open: false,
        orientation: null
    };
    
    const threshold = 160;
    
    setInterval(function() {
        if (window.outerHeight - window.innerHeight > threshold || 
            window.outerWidth - window.innerWidth > threshold) {
            if (!devtools.open) {
                devtools.open = true;
                // Redirect or show warning
                document.body.innerHTML = '<div style="color: #ff0055; font-family: monospace; text-align: center; padding: 50px; background: #000;">⚠️ ACESSO NEGADO ⚠️<br>Ferramentas de desenvolvedor detectadas!</div>';
            }
        } else {
            devtools.open = false;
        }
    }, 500);
    // Disable console functions
    if (typeof console !== 'undefined') {
        console.log = function() {};
        console.warn = function() {};
        console.error = function() {};
        console.info = function() {};
        console.debug = function() {};
        console.trace = function() {};
    }
    
})();
// ============================================
// CONFIGURAÇÃO
// ============================================
*/
// ============================================
// CDN BASE URL - For Multi-Site Architecture
// ============================================
const CDN_BASE = 'https://poprtp88.github.io/TEST-RTP-BARU-2';

// ============================================
// DEBUG: Check for external platforms config
// ============================================
console.log('🔍 SCRIPT.JS LOADED - Checking for PLATFORMS_CONFIG...');
console.log('🔍 typeof PLATFORMS_CONFIG:', typeof PLATFORMS_CONFIG);
if (typeof PLATFORMS_CONFIG !== 'undefined') {
    console.log('✅ PLATFORMS_CONFIG FOUND! Length:', PLATFORMS_CONFIG.length);
    console.log('✅ First platform URL:', PLATFORMS_CONFIG[0]?.url);
} else {
    console.log('⚠️ PLATFORMS_CONFIG NOT FOUND - will use defaults');
}

const CONFIG = {
    gamesPerProvider: 0, // 0 = mostrar todos
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
    // Default platforms (fallback if no external config)
    defaultPlatforms: [
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

// ============================================
// PLATFORMS ASSIGNMENT - Use external config or defaults
// ============================================
// Directly assign platforms based on whether external config exists
if (typeof PLATFORMS_CONFIG !== 'undefined' && Array.isArray(PLATFORMS_CONFIG) && PLATFORMS_CONFIG.length > 0) {
    CONFIG.platforms = PLATFORMS_CONFIG;
    console.log('✅✅✅ USING EXTERNAL PLATFORMS:', PLATFORMS_CONFIG.length, 'platforms');
    console.log('✅ First platform:', PLATFORMS_CONFIG[0]);
} else {
    CONFIG.platforms = CONFIG.defaultPlatforms;
    console.log('⚠️⚠️⚠️ USING DEFAULT PLATFORMS (no external config)');
}

// Estado da aplicação
let showAllGames = true;
let currentProvider = 'all';
let allGames = [];
let systemStartTime = Date.now();
let cycleCount = 1;

// Pagination Settings
const INITIAL_GAMES = 25;
const GAMES_PER_PAGE = 25;
let visibleLimit = INITIAL_GAMES;

// ============================================
// FUNÇÕES UTILITÁRIAS
// ============================================

/**
 * Generates a time-based seed synchronized to São Paulo timezone (UTC-3).
 * This ensures all users worldwide see the same RTP values regardless of their local timezone.
 * Updates every 3 minutes, aligned with the Telegram bot.
 * 
 * @returns {number} Total minutes since epoch in São Paulo timezone, rounded to 3-minute intervals
 */
function getTimeSeed() {
    // CRITICAL: Use São Paulo timezone to ensure consistency across all users and match Telegram bot
    // São Paulo is always UTC-3 (Brazil stopped DST in 2019)
    const saoPauloTime = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
    
    const currentMinute = saoPauloTime.getMinutes();
    const roundedMinute = Math.floor(currentMinute / 3) * 3;
    
    // Calculate total minutes using São Paulo time
    const totalMinutes = saoPauloTime.getFullYear() * 525600 +
                        saoPauloTime.getMonth() * 43800 +
                        saoPauloTime.getDate() * 1440 +
                        saoPauloTime.getHours() * 60 +
                        roundedMinute;
    
    // Debug logging to track seed changes
    console.log(`🕐 TimeSeed Debug (São Paulo): Minuto=${currentMinute}, Arredondado=${roundedMinute}, Seed=${totalMinutes}`);
    console.log(`📍 Hora Local: ${new Date().toLocaleTimeString('pt-BR')}`);
    console.log(`📍 Hora São Paulo: ${saoPauloTime.toLocaleTimeString('pt-BR')}`);
    
    return totalMinutes;
}

function seededRandom(seed) {
    seed = Math.abs(seed | 0);
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
}

function getSeededRandomInt(seed, min, max) {
    seed = (seed * 9301 + 49297) % 233280;
    const random = seededRandom(seed);
    return Math.floor(random * (max - min + 1)) + min;
}

function stringToHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash);
}

function generateRandomRTP(gameId) {
    const timeSeed = getTimeSeed();
    const gameNumericId = typeof gameId === 'string' ? stringToHash(gameId) : gameId;
    const combinedSeed = timeSeed * 1000 + gameNumericId;
    const rtp = getSeededRandomInt(combinedSeed, CONFIG.rtpRanges.min, CONFIG.rtpRanges.max);
    
    // Debug log for first few games
    if (gameNumericId <= 3) {
        console.log(`🎲 Jogo ${gameNumericId}: TimeSeed=${timeSeed}, RTP=${rtp}%`);
    }
    
    return rtp;
}

function generateRandomMultiplier(gameId) {
    const timeSeed = getTimeSeed();
    const gameNumericId = typeof gameId === 'string' ? stringToHash(gameId) : gameId;
    
    const multiplierSeed = (timeSeed * 1000 + gameNumericId) * 7;
    const multiplierIndex = getSeededRandomInt(multiplierSeed, 0, CONFIG.multipliers.length - 1);
    const multiplier = CONFIG.multipliers[multiplierIndex];
    
    const icons = [];
    for (let i = 0; i < 3; i++) {
        const iconSeed = (timeSeed * 1000 + gameNumericId) * (13 + i * 5);
        const isCheck = getSeededRandomInt(iconSeed, 0, 1) === 1;
        icons.push(isCheck ? '✔' : '✕');
    }
    
    return {
        value: multiplier.value,
        type: multiplier.type,
        icons: icons
    };
}

function getRTPColorClass(rtp) {
    if (rtp >= 70) return 'high';
    if (rtp >= 50) return 'medium';
    return 'low';
}

// ============================================
// SISTEMA DE MONITORAMENTO
// ============================================

/**
 * Updates the system time display showing São Paulo timezone.
 * This is the authoritative time source for the entire system.
 */
function updateSystemTime() {
    // Display São Paulo time (synchronized with RTP calculations)
    const saoPauloTime = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
    const timeStr = saoPauloTime.toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    });
    
    const systemTimeEl = document.getElementById('systemTime');
    if (systemTimeEl) {
        systemTimeEl.textContent = timeStr;
    }
}

function updateSystemUptime() {
    const now = Date.now();
    const uptime = now - systemStartTime;
    
    const hours = Math.floor(uptime / 3600000);
    const minutes = Math.floor((uptime % 3600000) / 60000);
    const seconds = Math.floor((uptime % 60000) / 1000);
    
    const uptimeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    const uptimeEl = document.getElementById('systemUptime');
    if (uptimeEl) {
        uptimeEl.textContent = uptimeStr;
    }
}

function updateSyncStatus() {
    const syncStatusEl = document.getElementById('syncStatus');
    if (syncStatusEl) {
        syncStatusEl.textContent = 'SINCRONIZADO';
        syncStatusEl.style.color = '#00ff88';
        
        setTimeout(() => {
            syncStatusEl.style.color = '#00f0ff';
        }, 800);
    }
}

function updateActiveGamesCount(count) {
    const activeGamesEl = document.getElementById('activeGames');
    if (activeGamesEl) {
        activeGamesEl.textContent = count;
    }
}

function updateCycleCount() {
    const cycleEl = document.getElementById('cycleCount');
    if (cycleEl) {
        cycleEl.textContent = `CICLO #${cycleCount}`;
    }
    cycleCount++;
}

/**
 * Updates the last refresh time display using São Paulo timezone.
 */
function updateLastRefresh() {
    const saoPauloTime = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
    const timeStr = saoPauloTime.toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit'
    });
    
    const refreshEl = document.getElementById('lastRefresh');
    if (refreshEl) {
        const textEl = refreshEl.querySelector('.refresh-text');
        if (textEl) {
            textEl.textContent = timeStr;
        }
    }
}

// ============================================
// TEMPORIZADOR DE CONTAGEM REGRESSIVA
// ============================================

/**
 * Calculates milliseconds until next RTP update (every 3 minutes).
 * Uses São Paulo timezone to stay synchronized with all users.
 * 
 * @returns {number} Milliseconds until next update
 */
function getTimeUntilNextUpdate() {
    const saoPauloTime = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
    const currentMinutes = saoPauloTime.getMinutes();
    const currentSeconds = saoPauloTime.getSeconds();
    const currentMilliseconds = saoPauloTime.getMilliseconds();
    
    const minutesUntilNext = 3 - (currentMinutes % 3);
    const msUntilNext = (minutesUntilNext * 60 * 1000) - (currentSeconds * 1000) - currentMilliseconds;
    
    return msUntilNext;
}

function updateCountdownTimer() {
    const ms = getTimeUntilNextUpdate();
    const totalMs = 3 * 60 * 1000;
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    
    const minutesEl = document.getElementById('timerMinutes');
    const secondsEl = document.getElementById('timerSeconds');
    const progressBar = document.getElementById('timerProgressBar');
    const progressPercent = document.getElementById('progressPercent');
    const nextUpdateEl = document.getElementById('nextUpdate');
    
    // Update main timer
    if (minutesEl) {
        minutesEl.textContent = minutes.toString().padStart(2, '0');
    }
    
    if (secondsEl) {
        secondsEl.textContent = seconds.toString().padStart(2, '0');
    }
    
    if (progressBar) {
        const progress = ((totalMs - ms) / totalMs) * 100;
        progressBar.style.width = `${progress}%`;
    }
    
    if (progressPercent) {
        const progress = Math.floor(((totalMs - ms) / totalMs) * 100);
        progressPercent.textContent = `${progress}%`;
    }
    
    if (nextUpdateEl) {
        nextUpdateEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    
    // Update floating timer button
    const floatingMinutesEl = document.getElementById('floatingTimerMinutes');
    const floatingSecondsEl = document.getElementById('floatingTimerSeconds');
    const floatingProgressBar = document.getElementById('floatingTimerProgressBar');
    
    if (floatingMinutesEl) {
        floatingMinutesEl.textContent = minutes.toString().padStart(2, '0');
    }
    
    if (floatingSecondsEl) {
        floatingSecondsEl.textContent = seconds.toString().padStart(2, '0');
    }
    
    if (floatingProgressBar) {
        const progress = ((totalMs - ms) / totalMs) * 100;
        floatingProgressBar.style.width = `${progress}%`;
    }
}

/**
 * Starts the countdown timer and manages automatic RTP updates every 3 minutes.
 * Uses São Paulo timezone for consistency across all users globally.
 */
function startCountdownTimer() {
    updateCountdownTimer();
    
    let lastUpdateMinute = -1; // Track the last minute we updated
    
    setInterval(() => {
        updateCountdownTimer();
        
        // Use São Paulo time for update triggering
        const saoPauloTime = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
        const currentMinute = saoPauloTime.getMinutes();
        const currentThreeMinuteBlock = Math.floor(currentMinute / 3) * 3;
        
        // Only trigger update when we enter a new 3-minute block
        if (currentThreeMinuteBlock !== lastUpdateMinute && currentMinute % 3 === 0) {
            lastUpdateMinute = currentThreeMinuteBlock;
            
            // Add small delay to ensure we're fully in the new minute
            setTimeout(() => {
                const currentTimeSeed = getTimeSeed();
                console.log('═══════════════════════════════════════');
                console.log('🔄 ATUALIZAÇÃO DE RTP INICIADA (São Paulo Time)');
                console.log(`⏰ TimeSeed NOVO: ${currentTimeSeed}`);
                console.log(`📅 Minuto São Paulo: ${currentMinute}, Bloco: ${currentThreeMinuteBlock}`);
                console.log(`🌎 Hora São Paulo: ${saoPauloTime.toLocaleTimeString('pt-BR')}`);
                console.log('🎮 Recalculando RTP de TODOS os jogos...');
                console.log('═══════════════════════════════════════');
                
                renderGameCards();
                updateSyncStatus();
                updateCycleCount();
                updateLastRefresh();
                
                console.log('✅ RTP atualizado! Valores devem estar DIFERENTES agora.');
                console.log('✅ Todos os usuários no mundo veem os mesmos valores!');
            }, 100); // 100ms delay to ensure we're in the new minute
        }
    }, 100);
}

// ============================================
// CARREGAMENTO DE JOGOS
// ============================================

async function loadAllGames() {
    allGames = [];
    
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
                            imagePath: `${CDN_BASE}/images/${provider}/${imageName}`,
                            priority: priority
                        });
                    });
                }
                
                if (window.sortGamesByPopularity) {
                    allGames = window.sortGamesByPopularity(allGames);
                    console.log(`✅ ${allGames.length} jogos carregados e ordenados por popularidade`);
                } else {
                    console.log(`✅ ${allGames.length} jogos carregados dinamicamente`);
                }
                
                return;
            }
        }
    } catch (error) {
        console.warn('⚠️ API PHP indisponível, usando método alternativo...');
    }
    
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
                    imagePath: `${CDN_BASE}/images/${provider}/${imageName}`,
                    priority: priority
                });
            });
        }
        
        if (window.sortGamesByPopularity) {
            allGames = window.sortGamesByPopularity(allGames);
            console.log(`✅ ${allGames.length} jogos carregados por popularidade`);
        } else {
            console.log(`✅ ${allGames.length} jogos carregados`);
        }
        
        return;
    }
    
    console.error('❌ Erro ao carregar jogos');
}

function filterGamesByProvider(provider) {
    if (provider === 'all') {
        return allGames;
    }
    return allGames.filter(game => game.provider === provider);
}

// ============================================
// CRIAÇÃO DE CARDS DE JOGOS
// ============================================

function createGameCard(game, index) {
    const rtp = generateRandomRTP(game.id);
    const multiplier = generateRandomMultiplier(game.id);
    const colorClass = getRTPColorClass(rtp);
    
    const card = document.createElement('div');
    card.className = 'game-card fade-in';
    card.style.animationDelay = `${index * 0.02}s`;
    
    // IMPORTANTE: Adicionar click handler para abrir modal
    card.addEventListener('click', () => {
        openPlatformModal();
    });
    
    let priorityBadge = '';
    if (game.priority <= 3) {
        const priorityNames = {
            1: 'FORTUNE',
            2: 'POPULAR',
            3: 'DESTAQUE'
        };
        priorityBadge = `<div class="game-priority-badge priority-${game.priority}">${priorityNames[game.priority] || 'HOT'}</div>`;
    }
    
    card.innerHTML = `
        <div class="game-image-container">
            <img src="${game.imagePath}" alt="${game.imageName}" class="game-image" loading="lazy">
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
// RENDERIZAÇÃO
// ============================================

function renderGameCards() {
    const gamesGrid = document.getElementById('gamesGrid');
    const loadMoreContainer = document.getElementById('loadMoreContainer');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const remainingCountEl = document.getElementById('remainingGamesCount');
    
    if (!gamesGrid) return;
    
    const filteredGames = filterGamesByProvider(currentProvider);
    // Apply pagination limit
    const gamesToDisplay = filteredGames.slice(0, visibleLimit);
    
    // Add pulse animation to grid on refresh
    gamesGrid.classList.add('refreshing');
    setTimeout(() => {
        gamesGrid.classList.remove('refreshing');
    }, 600);
    
    gamesGrid.innerHTML = '';
    
    gamesToDisplay.forEach((game, index) => {
        const card = createGameCard(game, index);
        gamesGrid.appendChild(card);
    });
    
    // Handle Load More Button Visibility
    if (loadMoreContainer && remainingCountEl) {
        if (filteredGames.length > visibleLimit) {
            loadMoreContainer.style.display = 'flex';
            const remaining = filteredGames.length - visibleLimit;
            remainingCountEl.textContent = `+${remaining}`;
        } else {
            loadMoreContainer.style.display = 'none';
        }
    }
    
    updateGameCounter(gamesToDisplay.length, filteredGames.length);
}

function setupLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            visibleLimit += GAMES_PER_PAGE;
            renderGameCards();
            console.log(`📥 Carregando mais jogos... Limite atual: ${visibleLimit}`);
        });
    }
}

function updateGameCounter(displayed, total) {
    // Game counter elements were removed with the FILTRO section
    console.log(`📊 Jogos exibidos: ${displayed}/${total}`);
}

// ============================================
// CARROSSEL
// ============================================

function setupCarousel() {
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dots = document.querySelectorAll('.dot');
    
    if (!track || !prevBtn || !nextBtn) return;
    
    let currentSlide = 0;
    const totalSlides = document.querySelectorAll('.carousel-slide').length;
    
    function updateCarousel() {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }
    
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
        });
    });
    
    setInterval(nextSlide, 5000);
    
    console.log('✅ Carrossel inicializado');
}

// ============================================
// SIDE BANNER CAROUSEL (DESKTOP TIMER SPLIT)
// ============================================

/**
 * Initializes the side banner carousel for desktop timer split view.
 * Auto-rotates slides and allows dot navigation.
 */
function setupSideBannerCarousel() {
    const track = document.getElementById('sideBannerTrack');
    const dots = document.querySelectorAll('.side-dot');
    
    // Exit if elements not found (e.g., on mobile where they don't exist)
    if (!track) return;
    
    let currentSlide = 0;
    const slides = document.querySelectorAll('.side-banner-slide');
    const totalSlides = slides.length;
    
    if (totalSlides === 0) return;
    
    /**
     * Updates the carousel position and active dot indicator
     */
    function updateSideBanner() {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update slides active state
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
        
        // Update dots active state
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    /**
     * Advances to next slide with wraparound
     */
    function nextSideBannerSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSideBanner();
    }
    
    // Setup dot click handlers for manual navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSideBanner();
        });
    });
    
    // Auto-rotate every 4 seconds (faster than main carousel)
    setInterval(nextSideBannerSlide, 4000);
    
    // Initial update
    updateSideBanner();
    
    console.log('✅ Side banner carousel inicializado');
}

// ============================================
// MENU DE PROVEDORES
// ============================================

function setupProviderMenu() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const providerMenu = document.getElementById('providerMenu');
    const providerItems = document.querySelectorAll('.provider-item');
    const currentProviderName = document.getElementById('currentProviderName');
    const currentProviderCount = document.getElementById('currentProviderCount');
    
    if (!hamburgerBtn || !providerMenu) return;
    
    hamburgerBtn.addEventListener('click', () => {
        providerMenu.classList.toggle('active');
    });
    
    providerItems.forEach(item => {
        item.addEventListener('click', function() {
            const provider = this.getAttribute('data-provider');
            currentProvider = provider;
            
            // Reset pagination when changing filters
            visibleLimit = INITIAL_GAMES;
            
            providerItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            const providerText = this.querySelector('.provider-text').textContent;
            const providerCount = this.querySelector('.provider-game-count').textContent;
            
            if (currentProviderName) currentProviderName.textContent = providerText;
            if (currentProviderCount) currentProviderCount.textContent = providerCount;
            
            renderGameCards();
            providerMenu.classList.remove('active');
            
            console.log(`🎮 Filtro alterado para: ${provider}`);
        });
    });
    
    document.addEventListener('click', (e) => {
        if (!hamburgerBtn.contains(e.target) && !providerMenu.contains(e.target)) {
            providerMenu.classList.remove('active');
        }
    });
    
    console.log('✅ Menu de provedores inicializado');
}

// ============================================
// POPUP BANNER WITH SHOCKWAVE EFFECT
// ============================================

/**
 * Initializes the popup banner system with shockwave effects.
 * Shows the banner after a delay and handles close functionality.
 */
function setupPopupBanner() {
    const popupOverlay = document.getElementById('popupBannerOverlay');
    const popupClose = document.getElementById('popupBannerClose');
    const popupContainer = document.getElementById('popupBannerContainer');
    
    if (!popupOverlay || !popupClose || !popupContainer) {
        console.warn('⚠️ Popup banner elements not found');
        return;
    }
    
    /**
     * Opens the popup banner with animation
     */
    function openPopupBanner() {
        popupOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Shockwave effects are handled automatically by CSS animations
        // They run continuously with periodic timing (slow, thin waves)
        
        console.log('📢 Popup banner opened');
    }
    
    /**
     * Closes the popup banner
     */
    function closePopupBanner() {
        popupOverlay.classList.remove('active');
        document.body.style.overflow = '';
        console.log('📢 Popup banner closed');
    }
    
    /**
     * Triggers a shockwave effect from the container center
     * Note: CSS animations handle the periodic timing automatically
     */
    function triggerShockwave() {
        // Shockwaves are now handled entirely by CSS animations
        // with periodic timing (4s duration, staggered delays)
        // No need to manually trigger - they run continuously
    }
    
    // Close button click handler
    popupClose.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        closePopupBanner();
    });
    
    // Click outside to close (but not on the banner link)
    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            closePopupBanner();
        }
    });
    
    // Prevent closing when clicking on the banner link itself
    const popupLink = popupContainer.querySelector('.popup-banner-link');
    if (popupLink) {
        popupLink.addEventListener('click', (e) => {
            e.stopPropagation();
            // Link will handle navigation naturally
        });
    }
    
    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popupOverlay.classList.contains('active')) {
            closePopupBanner();
        }
    });
    
    // Show popup banner after 2 seconds delay
    setTimeout(() => {
        openPopupBanner();
    }, 2000);
    
    // Store functions globally for external control
    window.openPopupBanner = openPopupBanner;
    window.closePopupBanner = closePopupBanner;
    
    console.log('✅ Popup banner system initialized');
}

// ============================================
// MODAL DE PLATAFORMAS
// ============================================

function generatePlatformCards() {
    const modalGrid = document.getElementById('popupButtons');
    if (!modalGrid) return;
    
    modalGrid.innerHTML = '';
    
    CONFIG.platforms.forEach((platform, index) => {
        const card = document.createElement('a');
        card.href = '#';
        
        // Add special class for the first platform (Gold/Hot)
        const isGold = index === 0;
        const isPlatform19 = platform.id === 19;
        card.className = isGold ? 'platform-card platform-gold' : 'platform-card';
        
        card.setAttribute('data-url', platform.url);
        
        const isEmBreve = platform.name === 'EM BREVE' || (!platform.url || platform.url === '#');
        // Only platform 19 gets EM BREVE; first platform gets HOT only if not platform 19
        const hotBadge = isGold && !isPlatform19 ? '<div class="platform-hot">HOT</div>' : '';
        const newPlatformHotBadge = isPlatform19 ? '<div class="platform-hot">EM BREVE</div>' : '';
        
        // Use local asset path for platforms 18+ (not on CDN), CDN for 1-17
        const imagePath = platform.id >= 18 ? `asset/${platform.id}.png` : `${CDN_BASE}/asset/${platform.id}.png`;
        
        const statusOverlay = isEmBreve
            ? ''
            : '<div class="platform-status"><span class="status-dot"></span>ONLINE</div>';
        
        card.innerHTML = `
            ${hotBadge}
            ${newPlatformHotBadge}
            <div class="platform-overlay"></div>
            <img src="${imagePath}" alt="Plataforma ${platform.id}" />
            ${statusOverlay}
        `;
        
        card.addEventListener('click', function(e) {
            e.preventDefault();

            const url = this.getAttribute('data-url');
            
            // Don't redirect if URL is empty or '#'
            if (!url || url === '#') {
                console.log(`🚫 Plataforma em breve - redirecionamento desabilitado`);
                return;
            }
            
            console.log(`🔗 Abrindo plataforma: ${url}`);
            
            // Redirecionamento ativado
            window.open(url, '_blank');
        });
        
        modalGrid.appendChild(card);
    });
    
    console.log(`✅ ${CONFIG.platforms.length} plataformas carregadas no modal`);
}

function openPlatformModal() {
    const modal = document.getElementById('popupOverlay');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        console.log('📱 Modal de plataformas aberto');
    }
}

function closePlatformModal() {
    const modal = document.getElementById('popupOverlay');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        console.log('📱 Modal de plataformas fechado');
    }
}

function setupPlatformModal() {
    const floatingTimerBtn = document.getElementById('floatingTimerBtn');
    const modal = document.getElementById('popupOverlay');
    const closeBtn = document.getElementById('popupClose');
    
    if (!modal || !closeBtn) {
        console.warn('⚠️ Elementos do modal não encontrados');
        return;
    }
    
    // Gerar cards de plataforma
    generatePlatformCards();
    
    // Floating timer button
    if (floatingTimerBtn) {
        floatingTimerBtn.addEventListener('click', openPlatformModal);
    }
    
    // Botão fechar
    closeBtn.addEventListener('click', closePlatformModal);
    
    // Click fora do modal
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closePlatformModal();
        }
    });
    
    // Tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closePlatformModal();
        }
    });
    
    console.log('✅ Modal de plataformas inicializado');
}

// ============================================
// INICIALIZAÇÃO
// ============================================

async function init() {
    console.log('═══════════════════════════════════════');
    console.log('🎰 POP REDE - SISTEMA RTP v2.0');
    console.log('═══════════════════════════════════════');
    console.log('🇧🇷 Modo: Português Brasileiro');
    console.log('📱 Otimização: Mobile-First');
    console.log('🔲 Imagens: Quadradas (1:1)');
    console.log('👆 Modo: Click para Registrar');
    console.log('═══════════════════════════════════════');
    
    const gamesGrid = document.getElementById('gamesGrid');
    if (gamesGrid) {
        gamesGrid.innerHTML = '<p style="color: #00f0ff; padding: 20px; text-align: center; font-family: monospace;">⏳ INICIALIZANDO SISTEMA...</p>';
    }
    
    await loadAllGames();
    
    if (allGames.length === 0) {
        console.error('❌ ERRO: Nenhum jogo carregado');
        if (gamesGrid) {
            gamesGrid.innerHTML = '<p style="color: #ff0055; padding: 20px; text-align: center; font-family: monospace;">❌ ERRO: Nenhum jogo encontrado</p>';
        }
        return;
    }
    
    // Inicializar todos os sistemas
    setupCarousel();
    setupSideBannerCarousel();
    setupProviderMenu();
    setupPlatformModal();
    setupPopupBanner();
    setupLoadMore();
    
    // Iniciar monitores do sistema
    updateSystemTime();
    setInterval(updateSystemTime, 1000);
    
    updateSystemUptime();
    setInterval(updateSystemUptime, 1000);
    
    startCountdownTimer();
    
    // Renderização inicial
    renderGameCards();
    updateActiveGamesCount(allGames.length);
    updateSyncStatus();
    updateCycleCount();
    updateLastRefresh();
    
    console.log('✅ SISTEMA ONLINE');
    console.log(`📊 Total de Jogos: ${allGames.length}`);
    console.log('🔄 Intervalo de Atualização: 10 minutos');
    console.log('═══════════════════════════════════════');
    
    // Estatísticas
    const providerCounts = {};
    allGames.forEach(game => {
        providerCounts[game.provider] = (providerCounts[game.provider] || 0) + 1;
    });
    console.log('📈 Distribuição por Provedor:', providerCounts);
    
    const priorityCounts = [0, 0, 0, 0, 0, 0, 0];
    allGames.forEach(game => {
        if (game.priority >= 1 && game.priority <= 6) {
            priorityCounts[game.priority]++;
        }
    });
    console.log('🎯 Distribuição por Prioridade:', {
        'Prioridade 1 (FORTUNE)': priorityCounts[1],
        'Prioridade 2 (POPULAR)': priorityCounts[2],
        'Prioridade 3 (DESTAQUE)': priorityCounts[3],
        'Prioridade 4+': priorityCounts[4] + priorityCounts[5] + priorityCounts[6]
    });
    
    console.log('🔥 Top 10 Jogos:');
    allGames.slice(0, 10).forEach((game, i) => {
        console.log(`  ${i + 1}. [P${game.priority}] ${game.imageName} (${game.provider})`);
    });
    
    console.log('═══════════════════════════════════════');
    console.log('✅ SISTEMA PRONTO PARA USO');
    console.log('═══════════════════════════════════════');
}

// Iniciar quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}