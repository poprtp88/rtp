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
    platforms: [
        { id: 1, url: 'https://platform1.com' },
        { id: 2, url: 'https://platform2.com' },
        { id: 3, url: 'https://platform3.com' },
        { id: 4, url: 'https://platform4.com' },
        { id: 5, url: 'https://platform5.com' },
        { id: 6, url: 'https://platform6.com' },
        { id: 7, url: 'https://platform7.com' },
        { id: 8, url: 'https://platform8.com' },
        { id: 9, url: 'https://platform9.com' },
        { id: 10, url: 'https://platform10.com' },
        { id: 11, url: 'https://platform11.com' },
        { id: 12, url: 'https://platform12.com' },
        { id: 13, url: 'https://platform13.com' },
        { id: 14, url: 'https://platform14.com' },
        { id: 15, url: 'https://platform15.com' },
        { id: 16, url: 'https://platform16.com' },
        { id: 17, url: 'https://platform17.com' }
    ]
};

// Estado da aplicação
let showAllGames = true;
let currentProvider = 'all';
let allGames = [];
let systemStartTime = Date.now();
let cycleCount = 1;

// ============================================
// FUNÇÕES UTILITÁRIAS
// ============================================

function getTimeSeed() {
    const now = new Date();
    const currentMinute = now.getMinutes();
    const roundedMinute = Math.floor(currentMinute / 3) * 3;
    const totalMinutes = now.getFullYear() * 525600 +
                        now.getMonth() * 43800 +
                        now.getDate() * 1440 +
                        now.getHours() * 60 +
                        roundedMinute;
    
    // Debug logging to track seed changes
    console.log(`🕐 TimeSeed Debug: Minuto=${currentMinute}, Arredondado=${roundedMinute}, Seed=${totalMinutes}`);
    
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

function updateSystemTime() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('pt-BR', { 
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

function updateLastRefresh() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('pt-BR', { 
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

function getTimeUntilNextUpdate() {
    const now = new Date();
    const currentMinutes = now.getMinutes();
    const currentSeconds = now.getSeconds();
    const currentMilliseconds = now.getMilliseconds();
    
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

function startCountdownTimer() {
    updateCountdownTimer();
    
    let lastUpdateMinute = -1; // Track the last minute we updated
    
    setInterval(() => {
        updateCountdownTimer();
        
        const now = new Date();
        const currentMinute = now.getMinutes();
        const currentThreeMinuteBlock = Math.floor(currentMinute / 3) * 3;
        
        // Only trigger update when we enter a new 3-minute block
        if (currentThreeMinuteBlock !== lastUpdateMinute && currentMinute % 3 === 0) {
            lastUpdateMinute = currentThreeMinuteBlock;
            
            // Add small delay to ensure we're fully in the new minute
            setTimeout(() => {
                const currentTimeSeed = getTimeSeed();
                console.log('═══════════════════════════════════════');
                console.log('🔄 ATUALIZAÇÃO DE RTP INICIADA');
                console.log(`⏰ TimeSeed NOVO: ${currentTimeSeed}`);
                console.log(`📅 Minuto atual: ${now.getMinutes()}, Bloco: ${currentThreeMinuteBlock}`);
                console.log('🎮 Recalculando RTP de TODOS os jogos...');
                console.log('═══════════════════════════════════════');
                
                renderGameCards();
                updateSyncStatus();
                updateCycleCount();
                updateLastRefresh();
                
                console.log('✅ RTP atualizado! Valores devem estar DIFERENTES agora.');
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
                            imagePath: `images/${provider}/${imageName}`,
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
                    imagePath: `images/${provider}/${imageName}`,
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
                <span class="rtp-label">RTP</span>
                <span class="rtp-value rtp-${colorClass}">${rtp}%</span>
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
    if (!gamesGrid) return;
    
    const filteredGames = filterGamesByProvider(currentProvider);
    const gamesToDisplay = filteredGames;
    
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
    
    updateGameCounter(gamesToDisplay.length, filteredGames.length);
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
// MODAL DE PLATAFORMAS
// ============================================

function generatePlatformCards() {
    const modalGrid = document.getElementById('popupButtons');
    if (!modalGrid) return;
    
    modalGrid.innerHTML = '';
    
    CONFIG.platforms.forEach(platform => {
        const card = document.createElement('a');
        card.href = '#';
        card.className = 'platform-card';
        card.setAttribute('data-url', platform.url);
        
        card.innerHTML = `
            <div class="platform-overlay"></div>
            <img src="asset/${platform.id}.png" alt="Plataforma ${platform.id}" />
            <div class="platform-status">
                <span class="status-dot"></span>
                ONLINE
            </div>
        `;
        
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const url = this.getAttribute('data-url');
            
            console.log(`🔗 Abrindo plataforma: ${url}`);
            
            // Descomentar para ativar redirecionamento real
            // window.open(url, '_blank');
            
            alert(`Plataforma: ${platform.id}\nURL: ${url}\n\nDescomentar código no script.js para ativar redirecionamento`);
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
    setupProviderMenu();
    setupPlatformModal();
    
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