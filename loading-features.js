/**
 * ============================================
 * LOADING SCREEN + FAKE ONLINE COUNTER + WIN TOAST
 * Terminal Hacker Theme Features
 * ============================================
 */

(function () {
    'use strict';

    // ============================================
    // 1. TERMINAL HACKER LOADING SCREEN
    // ============================================

    const TERMINAL_COMMANDS = [
        { cmd: 'root@poprede:~$ ssh -i key.pem rtp-server.poprtp.com', delay: 80 },
        { cmd: '> Conectando no servidor seguro...', delay: 100, isOutput: true },
        { cmd: '> Autenticação RSA-4096 aceita. Pode entrar!', delay: 80, isOutput: true },
        { cmd: 'root@rtp-server:~$ systemctl status rtp-engine', delay: 80 },
        { cmd: '  ● rtp-engine.service - Motor de Análise RTP', delay: 60, isOutput: true },
        { cmd: '     Ativo: rodando desde ' + new Date().toLocaleDateString('pt-BR') + ' às ' + new Date().toLocaleTimeString('pt-BR', {hour:'2-digit',minute:'2-digit'}) + ' BRT', delay: 60, isOutput: true },
        { cmd: '     Memória: 2.4G', delay: 60, isOutput: true },
        { cmd: 'root@rtp-server:~$ ./rtp-analytics --init --modo=ao-vivo', delay: 80 },
        { cmd: '> Carregando módulos de análise...', delay: 80, isOutput: true },
        { cmd: '> [████████████████████] 100% — tudo certo!', delay: 100, isOutput: true },
        { cmd: 'root@rtp-server:~$ rtp-sync --banco=master --verificar', delay: 80 },
        { cmd: '> Sincronizando 623 jogos com o banco principal...', delay: 80, isOutput: true },
        { cmd: '> Hash verificado: 0xA3F7...2B1D ✓', delay: 60, isOutput: true },
        { cmd: '> Conexão feita com 6 provedores. Valeu!', delay: 60, isOutput: true },
        { cmd: 'root@rtp-server:~$ rtp-monitor --iniciar --intervalo=180s', delay: 80 },
        { cmd: '> Monitor RTP ativado. Atualiza a cada 3 min.', delay: 80, isOutput: true },
        { cmd: '> STATUS: ██ SISTEMA ON ██', delay: 120, isOutput: true },
        { cmd: '> Redirecionando pra interface...', delay: 200, isOutput: true }
    ];

    const ASCII_LOGO = `
 ██████╗  ██████╗ ██████╗     ██████╗ ████████╗██████╗ 
 ██╔══██╗██╔═══██╗██╔══██╗    ██╔══██╗╚══██╔══╝██╔══██╗
 ██████╔╝██║   ██║██████╔╝    ██████╔╝   ██║   ██████╔╝
 ██╔═══╝ ██║   ██║██╔═══╝     ██╔══██╗   ██║   ██╔═══╝ 
 ██║     ╚██████╔╝██║         ██║  ██║   ██║   ██║     
 ╚═╝      ╚═════╝ ╚═╝         ╚═╝  ╚═╝   ╚═╝   ╚═╝     
`;

    function initLoadingScreen() {
        const overlay = document.getElementById('hackerLoadingOverlay');
        if (!overlay) return;

        const terminalBody = overlay.querySelector('.hacker-terminal-body');
        const progressFill = overlay.querySelector('.hacker-progress-fill');
        const progressText = overlay.querySelector('.hacker-progress-text');

        if (!terminalBody || !progressFill || !progressText) return;

        let currentLine = 0;
        const totalLines = TERMINAL_COMMANDS.length;

        function typeLine() {
            if (currentLine >= totalLines) {
                finishLoading();
                return;
            }

            const entry = TERMINAL_COMMANDS[currentLine];
            const line = document.createElement('div');
            line.className = entry.isOutput ? 'hacker-line hacker-output' : 'hacker-line hacker-cmd';

            terminalBody.appendChild(line);
            terminalBody.scrollTop = terminalBody.scrollHeight;

            // Type character by character
            let charIdx = 0;
            const text = entry.cmd;
            const typeSpeed = entry.isOutput ? 3 : 7;

            function typeChar() {
                if (charIdx < text.length) {
                    line.textContent += text[charIdx];
                    charIdx++;
                    terminalBody.scrollTop = terminalBody.scrollHeight;
                    setTimeout(typeChar, typeSpeed);
                } else {
                    // Update progress
                    currentLine++;
                    const pct = Math.round((currentLine / totalLines) * 100);
                    progressFill.style.width = pct + '%';
                    progressText.textContent = pct + '%';
                    setTimeout(typeLine, entry.delay);
                }
            }
            typeChar();
        }

        // Start after a brief pause
        setTimeout(typeLine, 500);
    }

    function finishLoading() {
        const overlay = document.getElementById('hackerLoadingOverlay');
        if (!overlay) return;

        overlay.classList.add('hacker-loading-done');
        setTimeout(function () {
            overlay.style.display = 'none';
            document.body.classList.remove('loading-active');
        }, 800);
    }

    // ============================================
    // 2. FAKE ONLINE COUNTER — ganhos-style: seeded per 10s block, can go up or down
    // Same local date + 10s window => same count on every device (no Math.random drift).
    // ============================================

    let currentOnlineCount = 0;

    /**
     * Deterministic PRNG in [0,1) from a 32-bit seed (same family as retention ganhos).
     * Input: integer seed. Output: number in [0, 1).
     */
    function seededRand(seed) {
        seed = Math.abs(seed | 0);
        let t = seed + 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }

    function getSaoPauloHour() {
        const now = new Date();
        const spTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
        return spTime.getHours() + spTime.getMinutes() / 60;
    }

    function getBaseOnlineCount() {
        const hour = getSaoPauloHour();
        if (hour >= 2  && hour < 6)  return 180  + Math.floor((hour - 2)  * 40);
        if (hour >= 6  && hour < 9)  return 340  + Math.floor((hour - 6)  * 320);
        if (hour >= 9  && hour < 12) return 1300 + Math.floor((hour - 9)  * 500);
        if (hour >= 12 && hour < 14) return 2800 + Math.floor((hour - 12) * 600);
        if (hour >= 14 && hour < 18) return 4000 + Math.floor((hour - 14) * 350);
        if (hour >= 18 && hour < 21) return 5400 + Math.floor((hour - 18) * 400);
        if (hour >= 21 && hour < 23) return 6600 - Math.floor((hour - 21) * 1200);
        if (hour >= 23)              return 4200 - Math.floor((hour - 23) * 1600);
        return 2600 - Math.floor(hour * 1210);
    }

    /** Local calendar YYYYMMDD (matches ganhos / device clock). */
    function getLocalDateSeed(d) {
        return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
    }

    /** Seconds since local midnight, 0..86399. */
    function getSecOfDayLocal(d) {
        return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
    }

    /** Mix date + 10s block index for seededRand (same idea as retention ganhosRandMix). */
    function onlineRandMix(dateSeed, tenSecBlockIndex) {
        return ((dateSeed ^ Math.imul(tenSecBlockIndex, 48271)) >>> 0);
    }

    /**
     * Signed fluctuation for one 10s window: magnitude uniformly 5..65, sign up or down (seeded).
     * Inputs: dateSeed, tenSecBlockIndex. Output: integer in [-65,-5] ∪ [5,65].
     */
    function onlineSwingForBlock(dateSeed, tenSecBlockIndex) {
        const SWING_MIN = 5;
        const SWING_MAX = 65;
        const span = SWING_MAX - SWING_MIN + 1;
        const rMag = seededRand(onlineRandMix(dateSeed, tenSecBlockIndex));
        const rSign = seededRand(onlineRandMix(dateSeed, tenSecBlockIndex + 9176) ^ 0x9e3779b9);
        const magnitude = SWING_MIN + Math.floor(rMag * span);
        const sign = rSign < 0.5 ? -1 : 1;
        return sign * magnitude;
    }

    /**
     * Target online count = BRT diurnal base + seeded swing for current local 10s block.
     * A per-second micro-drift of ±1 is layered on top so the number moves every second.
     */
    function getDeterministicOnlineCount() {
        const d = new Date();
        const sec = getSecOfDayLocal(d);
        const block = Math.floor(sec / 10);
        const base = getBaseOnlineCount();
        const swing = onlineSwingForBlock(getLocalDateSeed(d), block);
        const blockTarget = Math.max(100, Math.round(base + swing));

        /* Per-second nudge: seeded so it's reproducible but looks live.
           Mix date seed with the exact second index for a ±1 direction. */
        const secSeed = onlineRandMix(getLocalDateSeed(d), sec + 0x4c51);
        const microDrift = seededRand(secSeed) < 0.5 ? -1 : 1;
        return Math.max(100, blockTarget + microDrift);
    }

    function tickOnlineCounter() {
        if (window._tabActive === false) return;

        currentOnlineCount = getDeterministicOnlineCount();
        updateCounterElements(currentOnlineCount);
    }

    function updateCounterElements(val) {
        const el = document.getElementById('onlineViewerCount');
        const el2 = document.getElementById('onlineViewerCountHeader');
        if (el) setNumberSmooth(el, val);
        if (el2) setNumberSmooth(el2, val);
        // Keep ticker in sync when it's showing the online count
        if (tickerShowingOnline) {
            const tickerSpan = document.getElementById('tickerOnlineCount');
            if (tickerSpan) tickerSpan.textContent = formatNumber(val);
        }
    }

    // Smoothly roll the displayed number toward target over ~400ms
    function setNumberSmooth(el, target) {
        const start = parseInt(el.dataset.displayVal || el.textContent.replace(/\./g, '')) || target;
        el.dataset.displayVal = target;
        if (start === target) return;

        const duration = 400;
        const startTime = performance.now();

        function frame(now) {
            const progress = Math.min(1, (now - startTime) / duration);
            // ease out
            const eased = 1 - Math.pow(1 - progress, 3);
            const val = Math.round(start + (target - start) * eased);
            el.textContent = formatNumber(val);
            if (progress < 1) requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
    }

    function formatNumber(n) {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    // ============================================
    // 3. LIVE ACTIVITY TICKER
    // ============================================

    const TICKER_EVENTS = [
        // Online count
        function(count) { return '🟢 __ONLINE__ pessoas tão on agora'; },

        // RTP spikes
        function() { return '⚡ RTP tá alto — Fortune Tiger ' + (93 + Math.floor(Math.random()*5)) + '% — corre!'; },
        function() { return '⚡ RTP elevado — Gates of Olympus ' + (92 + Math.floor(Math.random()*6)) + '% agora'; },
        function() { return '⚡ RTP máximo detectado — Fortune Rabbit ' + (94 + Math.floor(Math.random()*4)) + '% agora'; },
        function() { return '⚡ Sugar Rush com RTP acima de ' + (91 + Math.floor(Math.random()*6)) + '% nesse momento'; },
        function() { return '📡 Pico de RTP em Starlight Princess — ' + (92 + Math.floor(Math.random()*5)) + '% ao vivo'; },
        function() { return '⚡ Wild West Gold disparou — RTP ' + (91 + Math.floor(Math.random()*7)) + '% agora'; },
        function() { return '📡 Fortune Mouse com RTP elevado — ' + (93 + Math.floor(Math.random()*5)) + '% detectado'; },
        function() { return '⚡ The Dog House pagando alto — RTP ' + (92 + Math.floor(Math.random()*6)) + '%'; },

        // Viewer / access surges
        function() { return '🔥 ' + (Math.floor(Math.random()*80)+20) + ' pessoas viram Sweet Bonanza agora mesmo'; },
        function() { return '🔥 Fortune Rabbit tá bombando — ' + (Math.floor(Math.random()*60)+30) + ' acessos agora'; },
        function() { return '👥 ' + (Math.floor(Math.random()*50)+15) + ' usuários viram Gates of Olympus agora'; },
        function() { return '👀 ' + (Math.floor(Math.random()*70)+25) + ' pessoas acompanham Fortune Tiger ao vivo'; },
        function() { return '🔥 ' + (Math.floor(Math.random()*40)+10) + ' novos usuários entraram no sistema agora'; },
        function() { return '👥 Pico de acesso — ' + (Math.floor(Math.random()*90)+30) + ' pessoas em Sugar Rush'; },

        // Paying round alerts
        function() { return '🎰 Rodada pagante ativa — aproveita nos próximos ' + (Math.floor(Math.random()*8)+3) + ' min'; },
        function() { return '⚡ Rodada pagante detectada — Big Bass Bonanza tá pagando'; },
        function() { return '🎰 Janela de pagamento aberta — Fortune Tiger nos próximos ' + (Math.floor(Math.random()*6)+2) + ' min'; },
        function() { return '🎰 Rodada quente em Starlight Princess — entra agora'; },
        function() { return '🔓 Ciclo pagante liberado — Gates of Olympus tá no pico'; },
        function() { return '⏱ Janela pagante expira em ' + (Math.floor(Math.random()*4)+1) + ' min — aproveita!'; },
        function() { return '🎰 Sweet Bonanza entrou em modo pagante — confere o RTP'; },

        // Win notifications (generic, no user ID)
        function() { return '🏆 Alguém acabou de ganhar R$ ' + (Math.floor(Math.random()*900)+100).toLocaleString('pt-BR') + ' em Fortune Tiger'; },
        function() { return '🏆 Jackpot em Gates of Olympus — R$ ' + (Math.floor(Math.random()*9000)+1000).toLocaleString('pt-BR') + ' pagos'; },
        function() { return '💰 Pagamento alto registrado — R$ ' + (Math.floor(Math.random()*4000)+500).toLocaleString('pt-BR') + ' em Big Bass Bonanza'; },
        function() { return '🏆 Fortune Rabbit pagou R$ ' + (Math.floor(Math.random()*2000)+200).toLocaleString('pt-BR') + ' agora mesmo'; },
        function() { return '💥 Mega win em Sugar Rush — R$ ' + (Math.floor(Math.random()*5000)+800).toLocaleString('pt-BR') + ' registrado'; },
        function() { return '🏆 Wild West Gold acabou de pagar R$ ' + (Math.floor(Math.random()*3000)+300).toLocaleString('pt-BR'); },

        // RTP trend alerts
        function() { return '📈 Starlight Princess subindo — última rodada +' + (Math.floor(Math.random()*8)+2) + '%'; },
        function() { return '📈 RTP em alta — Fortune Tiger subiu ' + (Math.floor(Math.random()*5)+1) + '% no último ciclo'; },
        function() { return '📉 RTP de Fortune Ox caindo — migra pra Fortune Tiger agora'; },
        function() { return '📈 Gates of Olympus em tendência de alta — monitora agora'; },
        function() { return '📊 Análise concluída — ' + (Math.floor(Math.random()*5)+3) + ' jogos no pico de RTP'; },

        // System / sync messages
        function() { return '📊 Base atualizada — ' + (623 - Math.floor(Math.random()*3)) + ' jogos sincronizados'; },
        function() { return '🟢 Novo usuário entrou no sistema agora mesmo'; },
        function() { return '🔄 Dados RTP atualizados — próxima análise em 3 min'; },
        function() { return '📡 Servidor sincronizado — ' + (623 - Math.floor(Math.random()*4)) + ' jogos monitorados ao vivo'; },
        function() { return '🔒 Conexão segura estabelecida — dados protegidos'; },
        function() { return '✅ Sistema estável — latência ' + (Math.floor(Math.random()*15)+4) + 'ms'; },
        function() { return '📡 Análise de ciclo concluída — dados atualizados agora'; },
        function() { return '🟢 Novo membro verificado no sistema — bem-vindo!'; },
    ];

    let tickerIndex = 0;
    let tickerShowingOnline = false;

    function showTickerMessage() {
        const el = document.getElementById('liveActivityTicker');
        if (!el) return;

        const idx = tickerIndex % TICKER_EVENTS.length;
        const fn = TICKER_EVENTS[idx];
        tickerIndex++;

        tickerShowingOnline = (idx === 0);

        el.classList.remove('ticker-visible');
        setTimeout(function () {
            const text = fn(currentOnlineCount);
            if (tickerShowingOnline) {
                // Render with a live span so it tracks counter in real time
                el.innerHTML = text.replace('__ONLINE__',
                    '<span id="tickerOnlineCount">' + formatNumber(currentOnlineCount) + '</span>');
            } else {
                el.textContent = text;
            }
            el.classList.add('ticker-visible');
        }, 300);
    }

    // ============================================
    // 3. FAKE WIN TOAST NOTIFICATIONS
    // ============================================

    // Platform groups — patterns from real member IDs
    const PLATFORM_GROUPS = [
        {
            // 4–7 digits (small platforms)
            names: ['POPBRA', 'POP888', 'POP678', 'POPPG', 'POP555', 'POPLUA', 'POPBEM', 'POPCEU'],
            generateId: function () {
                const len = randomBetween(4, 7);
                // Avoid leading zero
                let id = String(Math.floor(Math.random() * 9) + 1);
                for (let i = 1; i < len; i++) id += Math.floor(Math.random() * 10);
                return id;
            },
            maskId: function (id) {
                return id.slice(0, 3) + '***';
            }
        },
        {
            // Exactly 10 digits, prefix 1xxx (POPWB, POPMEL, POPSUR range)
            names: ['POPWB', 'POPMEL', 'POPSUR'],
            generateId: function () {
                // Real range: 1,000,000,000 – 1,999,999,999
                return String(Math.floor(Math.random() * 900000000) + 1000000000);
            },
            maskId: function (id) { return id.slice(0, 5) + '***'; }
        },
        {
            // Exactly 10 digits, prefix 2xxx (POPBOA, POPDEZ, POPBEA range)
            names: ['POPBOA', 'POPDEZ', 'POPBEA'],
            generateId: function () {
                // Real range: 2,000,000,000 – 2,999,999,999
                return String(Math.floor(Math.random() * 900000000) + 2000000000);
            },
            maskId: function (id) { return id.slice(0, 5) + '***'; }
        },
        {
            // Exactly 10 digits, prefix 3xxx (POPFLU, POPBIS, POPN1, POPVAI, POPLUZ range)
            names: ['POPFLU', 'POPBIS', 'POPN1', 'POPVAI', 'POPLUZ'],
            generateId: function () {
                // Real range: 3,000,000,000 – 3,999,999,999
                return String(Math.floor(Math.random() * 900000000) + 3000000000);
            },
            maskId: function (id) { return id.slice(0, 5) + '***'; }
        },
        {
            // Name-style usernames (letters + numbers, like real POPKKK/26BET members)
            names: ['POPKKK', '26BET'],
            generateId: function () {
                // Brazilian name fragments + numbers, mimicking real pattern
                const prefixes = ['silva','santos','maria','lucas','ana','pedro','julia',
                    'carlos','fernanda','gabriel','leticia','rafael','amanda','marcos',
                    'camila','thiago','larissa','bruno','patricia','rodrigo'];
                const suffixes = ['','2','7','10','20','24','77','90','99','123','2024','_'];
                const name = prefixes[Math.floor(Math.random() * prefixes.length)];
                const sfx  = suffixes[Math.floor(Math.random() * suffixes.length)];
                return name + sfx;
            },
            maskId: function (id) {
                const show = Math.min(4, Math.ceil(id.length * 0.5));
                return id.slice(0, show) + '***';
            }
        }
    ];

    const FAKE_GAMES = [
        'Fortune Tiger', 'Gates of Olympus', 'Sweet Bonanza', 'Fortune Rabbit',
        'Fortune Ox', 'Fortune Mouse', 'Starlight Princess', 'Sugar Rush',
        'Big Bass Bonanza', 'The Dog House', 'Wild West Gold', 'Gems Bonanza',
        'Fruit Party', 'Buffalo King', 'Madame Destiny', 'Great Rhino',
        'Book of Dead', 'Reactoonz', 'Fire Joker', 'Legacy of Dead',
        'Wanted Dead or Wild', 'Chaos Crew', 'Stick Em', 'Dork Unit',
        'Fortune Dragon', 'Ganesha Gold', 'Dragon Hatch', 'Bikini Paradise',
        'Jungle Delight', 'Mahjong Ways', 'Double Fortune', 'Treasures of Aztec'
    ];

    let toastQueue = [];
    let isShowingToast = false;

    function generateFakeWin() {
        // Pick random platform group, then random platform from that group
        const group = PLATFORM_GROUPS[Math.floor(Math.random() * PLATFORM_GROUPS.length)];
        const platform = group.names[Math.floor(Math.random() * group.names.length)];
        const rawId = group.generateId();
        const maskedId = group.maskId(rawId);
        const game = FAKE_GAMES[Math.floor(Math.random() * FAKE_GAMES.length)];

        // Graduated amount: tiny → jackpot
        let amount;
        const roll = Math.random();
        if (roll < 0.08) {
            amount = (Math.random() * 4 + 1).toFixed(2);            // R$1–5    (tiny)
        } else if (roll < 0.30) {
            amount = (Math.random() * 20 + 5).toFixed(2);           // R$5–25   (very small)
        } else if (roll < 0.55) {
            amount = (Math.random() * 75 + 25).toFixed(2);          // R$25–100 (small)
        } else if (roll < 0.75) {
            amount = (Math.random() * 400 + 100).toFixed(2);        // R$100–500 (medium)
        } else if (roll < 0.88) {
            amount = (Math.random() * 1500 + 500).toFixed(2);       // R$500–2000 (large)
        } else if (roll < 0.96) {
            amount = (Math.random() * 8000 + 2000).toFixed(2);      // R$2000–10000 (big)
        } else {
            amount = (Math.random() * 90000 + 10000).toFixed(2);    // R$10000–100000 (jackpot)
        }

        return { maskedId, game, platform, amount: parseFloat(amount) };
    }

    function getToastInterval() {
        // More frequent when more "users" are online
        if (currentOnlineCount > 5000) return randomBetween(8000, 15000);
        if (currentOnlineCount > 3000) return randomBetween(12000, 22000);
        if (currentOnlineCount > 1500) return randomBetween(18000, 30000);
        if (currentOnlineCount > 500) return randomBetween(25000, 45000);
        return randomBetween(35000, 60000);
    }

    function randomBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function showWinToast(win) {
        if (isShowingToast) {
            toastQueue.push(win);
            return;
        }

        isShowingToast = true;
        const container = document.getElementById('winToastContainer');
        if (!container) { isShowingToast = false; return; }

        const toast = document.createElement('div');
        toast.className = 'win-toast';

        const amountFormatted = 'R$ ' + win.amount.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        // Determine amount class for coloring
        let amountClass = 'win-amount-normal';
        if (win.amount >= 10000) amountClass = 'win-amount-jackpot';
        else if (win.amount >= 2000) amountClass = 'win-amount-big';
        else if (win.amount >= 500) amountClass = 'win-amount-medium';

        toast.innerHTML =
            '<div class="win-toast-icon">🏆</div>' +
            '<div class="win-toast-content">' +
                '<div class="win-toast-userid">' + win.maskedId + '</div>' +
                '<div class="win-toast-amount ' + amountClass + '">Ganhou ' + amountFormatted + '</div>' +
                '<div class="win-toast-bottom">' +
                    '<span class="win-toast-game">' + win.game + '</span>' +
                    ' <span class="win-toast-sep">•</span> ' +
                    '<span class="win-toast-platform">' + win.platform + '</span>' +
                    ' <span class="win-toast-sep">•</span> ' +
                    '<span class="win-toast-time">agora mesmo</span>' +
                '</div>' +
            '</div>';

        container.appendChild(toast);

        // Trigger slide-in
        requestAnimationFrame(function () {
            toast.classList.add('win-toast-visible');
        });

        // Remove after display
        setTimeout(function () {
            toast.classList.remove('win-toast-visible');
            toast.classList.add('win-toast-hiding');
            setTimeout(function () {
                toast.remove();
                isShowingToast = false;
                // Show next queued toast
                if (toastQueue.length > 0) {
                    showWinToast(toastQueue.shift());
                }
            }, 500);
        }, 4500);
    }

    function scheduleNextToast() {
        const interval = getToastInterval();
        setTimeout(function () {
            const win = generateFakeWin();
            showWinToast(win);
            scheduleNextToast();
        }, interval);
    }

    // ============================================
    // MOBILE BANNER CAROUSEL
    // ============================================

    /**
     * Platform definitions for the mobile banner strip.
     * Each entry maps a 1-based index to its square/long image filenames and link href.
     * The center slot (index 2 in the 5-slot view) always shows the LONG image.
     */
    const MB_PLATFORMS = [
        /* Image set 1 = PopSur */
        { id: 1, name: 'PopSur', square: 'sidebanner/SQUARE (1).png', long: 'sidebanner/LONG (1).png', href: 'https://c7m1qz8x.com?ch=85303'   },
        /* Image set 2 = PopBea */
        { id: 2, name: 'PopBea', square: 'sidebanner/SQUARE (2).png', long: 'sidebanner/LONG (2).png', href: 'https://popr8v6q4.com?ch=57378'   },
        /* Image set 3 = PopVai — use PopBea URL per owner instruction */
        { id: 3, name: 'PopVai', square: 'sidebanner/SQUARE (3).png', long: 'sidebanner/LONG (3).png', href: 'https://popr8v6q4.com?ch=57378'   },
        /* Image set 4 = PopLuz */
        { id: 4, name: 'PopLuz', square: 'sidebanner/SQUARE (4).png', long: 'sidebanner/LONG (4).png', href: 'https://popluz6n.com?ch=40617'    },
        /* Image set 5 = PopZoe — use PopBea URL (PopZoe replaced by PopBea) */
        { id: 5, name: 'PopZoe', square: 'sidebanner/SQUARE (5).png', long: 'sidebanner/LONG (5).png', href: 'https://popr8v6q4.com?ch=57378'   }
    ];

    /* Which slot index (0-based) is the "long/center" slot */
    const MB_CENTER_IDX = 2;
    /* Rotation interval in ms */
    const MB_INTERVAL   = 4000;

    /**
     * Sets the current (visible) image of a slot directly — no animation.
     * Used for initial paint and post-transition cleanup.
     * Inputs: item — .mb-item element; platform — MB_PLATFORMS entry; isCenter — boolean.
     */
    function mbSetCurrent(item, platform, isCenter) {
        const cur = item.querySelector('.mb-img-cur');
        cur.src = isCenter ? platform.long : platform.square;
        cur.alt = platform.name;
        item.href = platform.href;
        item.classList.toggle('mb-long',   isCenter);
        item.classList.toggle('mb-square', !isCenter);
    }

    /**
     * Applies the current platform order to all slots with no animation.
     * Inputs: items — array of .mb-item; order — array of MB_PLATFORMS entries.
     */
    function mbApplyOrder(items, order) {
        items.forEach(function (item, i) {
            mbSetCurrent(item, order[i], i === MB_CENTER_IDX);
            /* Ensure next-image is hidden off-screen with no transition */
            const nxt = item.querySelector('.mb-img-nxt');
            nxt.style.transition = 'none';
            nxt.style.transform  = 'translateX(100%)';
            nxt.src = '';
        });
    }

    /**
     * Initialises the rotating mobile banner carousel.
     * The 5 slot containers stay fixed; only their <img> elements move.
     *
     * Two-phase animation per tick, chained via transitionend (not guessed timeouts):
     *   Phase 1 (PRE-SLIDE, 200ms ease-in):
     *     .mb-img-cur nudges left by 50% — a "wind-up" cue.
     *   Phase 2 (SLIDE, 400ms ease-out):
     *     Triggered by Phase 1's transitionend. cur exits to -100%, nxt slides from 100%→0.
     *   Settle:
     *     Triggered by Phase 2's transitionend. Promote nxt→cur, reset, rotate order.
     *
     * Each phase has a setTimeout fallback so animating never gets permanently stuck.
     * All motion is inline-style driven — no CSS class conflicts.
     * Inputs: none. Output: none (DOM side-effects only).
     */
    function initMobileBannerCarousel() {
        const row = document.getElementById('mobileBannerRow');
        if (!row) return;

        const items = Array.from(row.querySelectorAll('.mb-item'));
        if (items.length !== 5) return;

        let order = MB_PLATFORMS.slice();
        mbApplyOrder(items, order);

        let animating = false;

        const PRE_MS  = 200;  /* Phase 1 duration */
        const SLIDE_MS = 400; /* Phase 2 duration  */

        function step() {
            if (animating) return;
            animating = true;

            const nextOrder = order.slice(1).concat(order[0]);

            /* ── SETUP: load next images off-screen right, no transition ── */
            items.forEach(function (item, i) {
                const platform = nextOrder[i];
                const isCenter = (i === MB_CENTER_IDX);
                const nxt = item.querySelector('.mb-img-nxt');
                nxt.style.transition = 'none';
                nxt.style.transform  = 'translateX(100%)';
                nxt.src = isCenter ? platform.long : platform.square;
                nxt.alt = platform.name;
            });

            /* Double rAF: first flush flushes the SETUP snap; second registers the
             * committed start state before Phase 1 begins, so the browser can diff it. */
            requestAnimationFrame(function () {
                requestAnimationFrame(function () {

                    /* sentinel: the first slot's cur image drives both phase triggers */
                    const sentinel = items[0].querySelector('.mb-img-cur');
                    let phase2Started = false;

                    /* ── Start Phase 2 (called by Phase 1 transitionend or its fallback) ── */
                    function startPhase2() {
                        if (phase2Started) return;
                        phase2Started = true;

                        let settled = false;

                        /**
                         * Settle: promotes nxt → cur, resets all positions,
                         * rotates platform order, updates slot classes.
                         */
                        function settle() {
                            if (settled) return;
                            settled = true;

                            items.forEach(function (item, i) {
                                const isCenter = (i === MB_CENTER_IDX);
                                const cur = item.querySelector('.mb-img-cur');
                                const nxt = item.querySelector('.mb-img-nxt');

                                cur.style.transition = 'none';
                                nxt.style.transition = 'none';

                                cur.src = nxt.src;
                                cur.alt = nxt.alt;
                                cur.style.transform = 'translateX(0)';
                                nxt.style.transform = 'translateX(100%)';
                                nxt.src = '';

                                item.classList.toggle('mb-long',   isCenter);
                                item.classList.toggle('mb-square', !isCenter);
                                item.href = nextOrder[i].href;
                            });

                            order = nextOrder;
                            animating = false;
                        }

                        /* Listen for Phase 2 end on the sentinel */
                        sentinel.addEventListener('transitionend', function onP2End(e) {
                            if (e.propertyName !== 'transform') return;
                            sentinel.removeEventListener('transitionend', onP2End);
                            settle();
                        });
                        setTimeout(settle, SLIDE_MS + 80); /* fallback */

                        /* ── PHASE 2: cur exits to -100%, nxt slides in to 0 ── */
                        const easeOut = 'transform ' + SLIDE_MS + 'ms ease-out';
                        items.forEach(function (item) {
                            const cur = item.querySelector('.mb-img-cur');
                            const nxt = item.querySelector('.mb-img-nxt');
                            cur.style.transition = easeOut;
                            cur.style.transform  = 'translateX(-100%)';
                            nxt.style.transition = easeOut;
                            nxt.style.transform  = 'translateX(0)';
                        });
                    }

                    /* Listen for Phase 1 end on the sentinel — triggers Phase 2 */
                    sentinel.addEventListener('transitionend', function onP1End(e) {
                        if (e.propertyName !== 'transform') return;
                        sentinel.removeEventListener('transitionend', onP1End);
                        startPhase2();
                    });
                    setTimeout(startPhase2, PRE_MS + 60); /* fallback */

                    /* ── PHASE 1: cur nudges left by 50% ── */
                    const easeIn = 'transform ' + PRE_MS + 'ms ease-in';
                    items.forEach(function (item) {
                        const cur = item.querySelector('.mb-img-cur');
                        cur.style.transition = easeIn;
                        cur.style.transform  = 'translateX(-50%)';
                    });

                });
            });
        }

        setInterval(step, MB_INTERVAL);
    }

    // ============================================
    // INITIALIZATION
    // ============================================

    document.addEventListener('DOMContentLoaded', function () {
        // Start loading screen
        document.body.classList.add('loading-active');
        initLoadingScreen();

        // Initialize counter from clock + seeded 10s swing, then refresh every 1.8s
        currentOnlineCount = getDeterministicOnlineCount();
        updateCounterElements(currentOnlineCount);
        setInterval(tickOnlineCounter, 1000);

        // Live activity ticker — show first message after 3s, then every 7s
        setTimeout(function () {
            showTickerMessage();
            setInterval(showTickerMessage, 7000);
        }, 3000);

        // Start win toasts after loading finishes
        setTimeout(function () {
            scheduleNextToast();
        }, 6000);

        // Start mobile banner carousel
        initMobileBannerCarousel();
    });

})();
