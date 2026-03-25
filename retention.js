/**
 * ============================================
 * POP RTP — RETENTION ENGINE
 * 9 features to keep visitors coming back
 * ============================================
 */

(function () {
    'use strict';

    // ============================================
    // SHARED UTILS
    // ============================================

    function getSPTime() {
        return new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
    }

    function getTodaySeed() {
        var t = getSPTime();
        return t.getFullYear() * 10000 + (t.getMonth() + 1) * 100 + t.getDate();
    }

    function seededRand(seed) {
        seed = Math.abs(seed | 0);
        var t = seed += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }

    function getUserSeed() {
        var s = localStorage.getItem('popRtpUserSeed');
        if (!s) {
            s = Math.floor(Math.random() * 999999).toString();
            localStorage.setItem('popRtpUserSeed', s);
        }
        return parseInt(s);
    }

    // ============================================
    // 1. HORÁRIO QUENTE DO DIA
    // ============================================

    // Typical Brazilian peak casino hours BRT
    var HOT_HOURS = [
        { h: 14, m: 0,  label: '14:00' },
        { h: 18, m: 0,  label: '18:00' },
        { h: 21, m: 0,  label: '21:00' },
        { h: 22, m: 30, label: '22:30' },
        { h: 23, m: 30, label: '23:30' }
    ];

    function getNextHotHour() {
        var sp = getSPTime();
        var nowTotalSec = sp.getHours() * 3600 + sp.getMinutes() * 60 + sp.getSeconds();

        for (var i = 0; i < HOT_HOURS.length; i++) {
            var entry = HOT_HOURS[i];
            var targetSec = entry.h * 3600 + entry.m * 60;
            if (targetSec > nowTotalSec) {
                return { label: entry.label, diffSec: targetSec - nowTotalSec };
            }
        }
        // Wrap to tomorrow's first
        var first = HOT_HOURS[0];
        var targetSec = first.h * 3600 + first.m * 60;
        return { label: first.label, diffSec: 86400 - nowTotalSec + targetSec };
    }

    function isHotHourActive() {
        var sp = getSPTime();
        var h = sp.getHours(), m = sp.getMinutes();
        for (var i = 0; i < HOT_HOURS.length; i++) {
            var e = HOT_HOURS[i];
            var diffMin = (h - e.h) * 60 + (m - e.m);
            if (diffMin >= 0 && diffMin < 30) return true;
        }
        return false;
    }

    function initHoraQuente() {
        var strip = document.getElementById('horaQuenteStrip');
        if (!strip) return;

        var countdownEl = document.getElementById('horaQuenteCountdown');
        var timeEl      = document.getElementById('horaQuenteTime');
        var labelEl     = document.getElementById('horaQuenteLabel');

        function tick() {
            if (isHotHourActive()) {
                strip.classList.add('hora-quente-active');
                if (labelEl) labelEl.textContent = '🔥 HORÁRIO QUENTE ATIVO AGORA!';
                if (countdownEl) countdownEl.textContent = 'Aproveita — tá pagando demais';
                if (timeEl) timeEl.textContent = '';
            } else {
                strip.classList.remove('hora-quente-active');
                var next = getNextHotHour();
                var d = Math.floor(next.diffSec);
                var hh = Math.floor(d / 3600);
                var mm = Math.floor((d % 3600) / 60);
                var ss = d % 60;
                var cd = hh > 0
                    ? hh + 'h ' + mm + 'min'
                    : mm > 0
                    ? mm + 'm ' + ss.toString().padStart(2, '0') + 's'
                    : ss + 's';

                if (labelEl) labelEl.textContent = '🔥 PRÓXIMO HORÁRIO QUENTE:';
                if (timeEl) timeEl.textContent = next.label + '';
                if (countdownEl) countdownEl.textContent = '— em ' + cd;
            }
        }

        tick();
        setInterval(tick, 1000);
    }

    // ============================================
    // 2. SINAL DO DIA
    // ============================================

    var SINAL_GAMES = [
        'Fortune Tiger', 'Gates of Olympus', 'Sweet Bonanza', 'Starlight Princess',
        'Fortune Rabbit', 'Fortune Dragon', 'Big Bass Bonanza', 'Fruit Party',
        'Sugar Rush', 'Wild West Gold', 'Fortune Ox', 'Mahjong Ways'
    ];

    var SINAL_MULTS = ['10X', '13X', '15X', '17X', '20X'];

    function getSinalDoDia() {
        var seed = getTodaySeed();
        var idx   = Math.floor(seededRand(seed)     * SINAL_GAMES.length);
        var rtpMin = 85 + Math.floor(seededRand(seed + 1) * 10);
        var rtpMax = rtpMin + 2 + Math.floor(seededRand(seed + 2) * 4);
        var mult  = SINAL_MULTS[Math.floor(seededRand(seed + 3) * SINAL_MULTS.length)];
        return { game: SINAL_GAMES[idx], rtpMin: rtpMin, rtpMax: rtpMax, mult: mult };
    }

    function initSinalDoDia() {
        var panel = document.getElementById('sinalDoDiaPanel');
        if (!panel) return;

        var sinal = getSinalDoDia();
        var gameEl = document.getElementById('sinalGameName');
        var rtpEl  = document.getElementById('sinalRTP');
        var multEl = document.getElementById('sinalMult');

        if (gameEl) gameEl.textContent = sinal.game;
        if (rtpEl)  rtpEl.textContent  = sinal.rtpMin + '–' + sinal.rtpMax + '%';
        if (multEl) multEl.textContent = 'até ' + sinal.mult;
    }

    // ============================================
    // 3. TELEGRAM FOMO NOTIFICATION
    // ============================================

    var TG_LINK = 'https://poppremio.com/tg';

    var TG_MESSAGES = [
        function (n) { return n + ' sinais mandados hoje no grupo VIP — partiu!'; },
        function (n) { return 'Grupo VIP: ' + n + ' membros tão on agora'; },
        function ()  { return 'Último sinal: Fortune Tiger disparou +' + (5 + Math.floor(Math.random() * 8)) + 'X — foi fácil'; },
        function ()  { return 'Sinal exclusivo caiu há 3 min no Telegram — não perdeu né?'; },
        function ()  { return 'Gates of Olympus: sinal confirmado no grupo VIP agora'; },
        function (n) { return n + ' usuários pegaram o sinal agora'; },
        function ()  { return 'Sweet Bonanza tá na rodada pagante — sinal ativo'; }
    ];

    function showTelegramFomo() {
        var container = document.getElementById('telegramFomoContainer');
        if (!container) return;
        if (container.querySelector('.tg-fomo-notif')) return; // already showing

        var count = 180 + Math.floor(Math.random() * 320);
        var fn  = TG_MESSAGES[Math.floor(Math.random() * TG_MESSAGES.length)];
        var msg = fn(count);

        var notif = document.createElement('a');
        notif.href     = TG_LINK;
        notif.target   = '_blank';
        notif.rel      = 'noopener';
        notif.className = 'tg-fomo-notif';
        notif.innerHTML =
            '<span class="tg-fomo-icon">✈</span>' +
            '<span class="tg-fomo-text">' + msg + '</span>' +
            '<span class="tg-fomo-cta">ENTRAR →</span>';

        container.appendChild(notif);

        requestAnimationFrame(function () {
            notif.classList.add('tg-fomo-visible');
        });

        setTimeout(function () {
            notif.classList.remove('tg-fomo-visible');
            setTimeout(function () { notif.remove(); }, 500);
        }, 5500);
    }

    function startTelegramFomo() {
        // First show at 40–70s, then every 90–180s
        setTimeout(function () {
            showTelegramFomo();
            setInterval(function () {
                if (Math.random() > 0.25) showTelegramFomo();
            }, 90000 + Math.floor(Math.random() * 90000));
        }, 40000 + Math.floor(Math.random() * 30000));
    }

    // ============================================
    // 4. GANHOS DE HOJE (Daily rolling total)
    // ============================================

    /**
     * Local calendar day as one integer (YYYYMMDD) for ganhos seeding.
     * Inputs: d — Date. Output: number seed.
     */
    function getLocalDateSeedFromDate(d) {
        return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
    }

    /**
     * Seconds since local midnight, 0..86399.
     * Inputs: d — Date. Output: integer.
     */
    function getSecOfDayFromDate(d) {
        return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
    }

    /**
     * Stable 32-bit mix for seededRand (date + 10s block index).
     * Inputs: dateSeed, tenSecBlockIndex — 0..8639 (floor(secOfDay / 10)).
     * Output: unsigned-ish integer for seededRand.
     */
    function ganhosRandMix(dateSeed, tenSecBlockIndex) {
        return ((dateSeed ^ Math.imul(tenSecBlockIndex, 48271)) >>> 0);
    }

    /**
     * Pseudo-random BRL gain for one 10-second local clock window — identical on all devices
     * for the same date + block index (seededRand, not Math.random).
     * Inputs: dateSeed — YYYYMMDD; tenSecBlockIndex — 0..8639.
     * Output: integer in [5, 80].
     */
    function gainForGanhosTenSecBlock(dateSeed, tenSecBlockIndex) {
        var GANHOS_GAIN_MIN  = 5;
        var GANHOS_GAIN_SPAN = 76;
        var r = seededRand(ganhosRandMix(dateSeed, tenSecBlockIndex));
        return GANHOS_GAIN_MIN + Math.floor(r * GANHOS_GAIN_SPAN);
    }

    /**
     * Sum of per-10s-block gains from local midnight through the block containing secOfDay.
     * Inputs: dateSeed, secOfDay — 0..86399. Output: integer (first paint / day rollover).
     */
    function cumulativeGanhosGainsThroughSecond(dateSeed, secOfDay) {
        var maxBlock = Math.floor(secOfDay / 10);
        var sum = 0;
        for (var i = 0; i <= maxBlock; i++) {
            sum += gainForGanhosTenSecBlock(dateSeed, i);
        }
        return sum;
    }

    function fmtBRL(n) {
        return 'R$ ' + Math.floor(n).toLocaleString('pt-BR', { maximumFractionDigits: 0 });
    }

    /**
     * Binds #ganhosDoDiaValue to a device-local clock total: each 10s window adds one seeded
     * random gain in R$ 5–80. Same value on all devices for that date + time block.
     * Inputs: none. Output: none (DOM side effects only).
     */
    function startGanhosDoDia() {
        var el = document.getElementById('ganhosDoDiaValue');
        var elDesktop = document.getElementById('ganhosDoDiaValueDesktop');
        if (!el) return;

        var lastShown = -1;
        var lastDateSeed = -1;
        var lastSecOfDay = -1;
        var runningTotal = 0;

        function dayBase(dateSeed) {
            return 1500 + Math.floor(seededRand((dateSeed ^ 0x5bd1e995) >>> 0) * 800);
        }

        function tick() {
            var d = new Date();
            var dateSeed = getLocalDateSeedFromDate(d);
            var sec = getSecOfDayFromDate(d);

            if (dateSeed !== lastDateSeed) {
                lastDateSeed = dateSeed;
                lastSecOfDay = -1;
            }

            if (lastSecOfDay < 0) {
                runningTotal = dayBase(dateSeed) + cumulativeGanhosGainsThroughSecond(dateSeed, sec);
                lastSecOfDay = sec;
            } else if (sec > lastSecOfDay) {
                var prevBlock = Math.floor(lastSecOfDay / 10);
                var curBlock = Math.floor(sec / 10);
                if (curBlock > prevBlock) {
                    for (var b = prevBlock + 1; b <= curBlock; b++) {
                        runningTotal += gainForGanhosTenSecBlock(dateSeed, b);
                    }
                }
                lastSecOfDay = sec;
            } else if (sec < lastSecOfDay) {
                runningTotal = dayBase(dateSeed) + cumulativeGanhosGainsThroughSecond(dateSeed, sec);
                lastSecOfDay = sec;
            }

            var v = runningTotal;
            var txt = fmtBRL(v);
            el.textContent = txt;
            if (elDesktop) elDesktop.textContent = txt;
            if (v !== lastShown) {
                lastShown = v;
                el.classList.add('ganhos-flash');
                setTimeout(function () { el.classList.remove('ganhos-flash'); }, 400);
                if (elDesktop) {
                    elDesktop.classList.add('ganhos-flash');
                    setTimeout(function () { elDesktop.classList.remove('ganhos-flash'); }, 400);
                }
            }
        }

        tick();
        setInterval(tick, 250);
    }

    // ============================================
    // 5. VIEWERS PER GAME CARD
    // ============================================

    function addViewersToCards() {
        var grid = document.getElementById('gamesGrid');
        if (!grid) return;

        function inject() {
            var cards = grid.querySelectorAll('.game-card:not([data-viewers])');
            cards.forEach(function (card) {
                card.setAttribute('data-viewers', '1');
                var count = 2 + Math.floor(Math.random() * 37);

                var badge = document.createElement('div');
                badge.className = 'card-viewers-badge';
                badge.innerHTML = '👁 <span class="viewers-count">' + count + '</span>';

                var imgCont = card.querySelector('.game-image-container');
                if (imgCont) imgCont.appendChild(badge);

                /* Each card gets its own random personality:
                   - interval: 4–12 s between updates
                   - upBias: 30–70 % chance of going up (skews some cards bullish, others bearish)
                   - maxDelta: 1–5 step size per tick                                             */
                var interval = 4000 + Math.floor(Math.random() * 8000);
                var upBias   = 0.30 + Math.random() * 0.40;
                var maxDelta = 1 + Math.floor(Math.random() * 5);

                setInterval(function () {
                    var span = badge.querySelector('.viewers-count');
                    if (!span) return;
                    var cur   = parseInt(span.textContent) || count;
                    var sign  = Math.random() < upBias ? 1 : -1;
                    var step  = 1 + Math.floor(Math.random() * maxDelta);
                    var next  = Math.max(1, Math.min(99, cur + sign * step));
                    span.textContent = next;
                }, interval);
            });
        }

        inject();
        var observer = new MutationObserver(function () { setTimeout(inject, 60); });
        observer.observe(grid, { childList: true });
    }

    // ============================================
    // 6. RTP ALERT MODAL
    // ============================================

    var rtpAlertDone = false;

    // Picks the real highest-RTP game from window._allGames using the EXACT same
    // generateRandomRTP() that the cards use — so popup always matches the card.
    function getRTPAlertData() {
        var sp         = getSPTime();
        var secInCycle = (sp.getMinutes() % 3) * 60 + sp.getSeconds();

        var game = null, rtp = 0;

        var games = window._allGames;
        if (games && games.length && typeof generateRandomRTP === 'function') {
            for (var i = 0; i < games.length; i++) {
                var g = games[i];
                var r = generateRandomRTP(g.id);
                if (r > rtp) { rtp = r; game = g; }
            }
        }

        rtp = rtp || 96;
        var imagePath = game ? game.imagePath : '';
        return { imagePath: imagePath, rtp: rtp, secsRemaining: 180 - secInCycle };
    }

    function showRTPAlert() {
        if (rtpAlertDone) return;
        var modal = document.getElementById('rtpAlertModal');
        if (!modal) return;

        var data = getRTPAlertData();

        var gameImgEl = document.getElementById('rtpAlertGameImg');
        var rtpEl  = document.getElementById('rtpAlertValue');
        var cdEl   = document.getElementById('rtpAlertCountdown');

        if (gameImgEl && data.imagePath) gameImgEl.src = data.imagePath;
        if (rtpEl)  rtpEl.textContent  = data.rtp + '%';

        modal.classList.add('rtp-alert-active');
        rtpAlertDone = true;

        // Start countdown from actual seconds remaining in the 3-min cycle
        var secs = data.secsRemaining;
        function tick() {
            if (!cdEl) return;
            var m = Math.floor(secs / 60);
            var s = secs % 60;
            cdEl.textContent = m + ':' + s.toString().padStart(2, '0');
            if (secs > 0) { secs--; setTimeout(tick, 1000); }
            else modal.classList.remove('rtp-alert-active');
        }
        tick();

        function close() { modal.classList.remove('rtp-alert-active'); }
        var closeBtn = document.getElementById('rtpAlertClose');
        var actionBtn = document.getElementById('rtpAlertBtn');
        if (closeBtn)  closeBtn.addEventListener('click', close);
        if (actionBtn) actionBtn.addEventListener('click', close);
        modal.addEventListener('click', function (e) {
            if (e.target === modal) close();
        });
    }

    function scheduleRTPAlert() {
        setTimeout(showRTPAlert, 70000 + Math.floor(Math.random() * 50000));
    }

    // ============================================
    // 7. CYCLE EXPIRY WARNING (<= 30s)
    // ============================================

    function startCycleExpiryWatcher() {
        setInterval(function () {
            var minEl = document.getElementById('timerMinutes');
            var secEl = document.getElementById('timerSeconds');
            if (!minEl || !secEl) return;

            var total = (parseInt(minEl.textContent) || 0) * 60 + (parseInt(secEl.textContent) || 0);
            var timerCont   = document.querySelector('.timer-container');
            var floatingBtn = document.getElementById('floatingTimerBtn');
            var timerSec    = document.querySelector('.timer-section');

            var warning = total <= 30 && total > 0;
            [timerCont, floatingBtn, timerSec].forEach(function (el) {
                if (!el) return;
                el.classList.toggle('timer-expiry-warning', warning);
            });
        }, 500);
    }

    // ============================================
    // 8. SEU JOGO FAVORITO (localStorage)
    // ============================================

    function trackFavoriteGames() {
        var grid = document.getElementById('gamesGrid');
        if (!grid) return;

        function getHistory() {
            try { return JSON.parse(localStorage.getItem('popRtpHistory') || '{}'); }
            catch (e) { return {}; }
        }

        function saveClick(gameId) {
            var h = getHistory();
            h[gameId] = (h[gameId] || 0) + 1;
            try { localStorage.setItem('popRtpHistory', JSON.stringify(h)); }
            catch (e) {}
        }

        function applyBadges() {
            var h = getHistory();
            var sorted = Object.entries(h).sort(function (a, b) { return b[1] - a[1]; });
            var topIds = sorted.slice(0, 3).map(function (e) { return e[0]; });

            grid.querySelectorAll('.game-card').forEach(function (card) {
                var img = card.querySelector('.game-image');
                if (!img) return;
                var gameId = img.alt;
                var isFav = topIds.includes(gameId);

                card.classList.toggle('game-favorito', isFav);

                // Remove stale badge
                var old = card.querySelector('.favorito-badge');
                if (old) old.remove();

            });
        }

        grid.addEventListener('click', function (e) {
            var card = e.target.closest('.game-card');
            if (!card) return;
            var img = card.querySelector('.game-image');
            if (img) saveClick(img.alt);
        });

        applyBadges();
        var observer = new MutationObserver(function () { setTimeout(applyBadges, 80); });
        observer.observe(grid, { childList: true });
    }

    // ============================================
    // 9. LUCKY NUMBER OF THE DAY
    // ============================================

    function getLuckyData() {
        var combined = getTodaySeed() + getUserSeed();
        var num  = Math.floor(seededRand(combined) * 9) + 1;
        var mults = ['3X', '7X', '9X', '10X', '11X', '13X', '15X', '17X', '20X'];
        var mult = mults[num - 1];
        return { number: num, mult: mult };
    }

    function initLuckyNumber() {
        var numEl  = document.getElementById('luckyNumberDisplay');
        var multEl = document.getElementById('luckyMultDisplay');
        if (!numEl) return;

        var lucky = getLuckyData();
        numEl.textContent  = lucky.number;
        if (multEl) multEl.textContent = lucky.mult;

        var grid = document.getElementById('gamesGrid');
        if (!grid) return;

        function highlightCards() {
            grid.querySelectorAll('.game-card').forEach(function (card, i) {
                card.classList.toggle('lucky-card', (i + 1) % lucky.number === 0);
            });
        }

        highlightCards();
        var observer = new MutationObserver(function () { setTimeout(highlightCards, 80); });
        observer.observe(grid, { childList: true });
    }

    // ============================================
    // INIT
    // ============================================

    document.addEventListener('DOMContentLoaded', function () {
        initHoraQuente();
        initSinalDoDia();
        startTelegramFomo();
        startGanhosDoDia();
        addViewersToCards();
        scheduleRTPAlert();
        startCycleExpiryWatcher();
        trackFavoriteGames();
        initLuckyNumber();
    });

})();
