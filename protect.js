;(function(){
    'use strict';

    // ─── 1. KILL ALL CONSOLE OUTPUT ────────────────────────────────────────────
    var noop = function(){};
    try {
        ['log','warn','error','info','debug','table','trace','dir','group',
         'groupCollapsed','groupEnd','time','timeEnd','count','assert','clear']
        .forEach(function(m){ console[m] = noop; });
    } catch(e){}

    // ─── 2. BLOCK RIGHT-CLICK ──────────────────────────────────────────────────
    document.addEventListener('contextmenu', function(e){ e.preventDefault(); }, true);

    // ─── 3. BLOCK KEYBOARD SHORTCUTS ──────────────────────────────────────────
    document.addEventListener('keydown', function(e){
        var code = e.keyCode || e.which;
        if (code === 123) { e.preventDefault(); e.stopPropagation(); return false; }
        if (e.ctrlKey && e.shiftKey && [73,74,67,75,69].indexOf(code) !== -1) {
            e.preventDefault(); e.stopPropagation(); return false;
        }
        if (e.ctrlKey && [85,83,65].indexOf(code) !== -1) {
            e.preventDefault(); e.stopPropagation(); return false;
        }
    }, true);

    // ─── 4. DISABLE TEXT SELECT + DRAG ─────────────────────────────────────────
    document.addEventListener('selectstart', function(e){
        var tag = (e.target||{}).tagName||'';
        if (tag!=='INPUT'&&tag!=='TEXTAREA') e.preventDefault();
    }, true);
    document.addEventListener('dragstart', function(e){ e.preventDefault(); }, true);

    // ─── 5. TAB VISIBILITY FLAG ─────────────────────────────────────────────────
    window._tabActive = true;
    document.addEventListener('visibilitychange', function(){
        window._tabActive = !document.hidden;
    });

    // ─── 6. SCARY HACK-BACK OVERLAY ─────────────────────────────────────────────
    var _devOpen   = false;
    var _overlayShown = false;
    var _threshold = 160;

    function _getUserInfo() {
        // Grab real browser data to show in the "scan"
        var ua  = navigator.userAgent || '';
        var plat = navigator.platform || 'desconhecido';
        var lang = navigator.language || 'pt-BR';
        var cores = navigator.hardwareConcurrency || '?';
        var mem  = navigator.deviceMemory ? navigator.deviceMemory + ' GB' : '?';
        var w    = screen.width + 'x' + screen.height;
        var tz   = Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/Sao_Paulo';

        var browser = 'Desconhecido';
        if (/Chrome/.test(ua) && !/Edg/.test(ua) && !/OPR/.test(ua)) browser = 'Google Chrome';
        else if (/Firefox/.test(ua)) browser = 'Mozilla Firefox';
        else if (/Edg/.test(ua))  browser = 'Microsoft Edge';
        else if (/Safari/.test(ua)) browser = 'Safari';
        else if (/OPR/.test(ua)) browser  = 'Opera';

        // Fake but plausible IP from their actual timezone
        var ipBase = tz.indexOf('Sao_Paulo') !== -1 ? '177.82.' :
                     tz.indexOf('America')   !== -1 ? '189.44.' :
                     tz.indexOf('Europe')    !== -1 ? '91.108.' : '103.21.';
        var fakeIP = ipBase + Math.floor(Math.random()*255) + '.' + Math.floor(Math.random()*255);

        return { browser: browser, plat: plat, lang: lang, cores: cores,
                 mem: mem, res: w, tz: tz, ip: fakeIP };
    }

    function _buildOverlay() {
        var info = _getUserInfo();
        var div = document.createElement('div');
        div.id = '_dtOverlay';
        div.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;' +
            'background:radial-gradient(circle at 20% 20%, rgba(0,140,255,0.08), transparent 40%),' +
            'radial-gradient(circle at 80% 0%, rgba(0,255,200,0.10), transparent 40%),' +
            'linear-gradient(135deg, #05070f 0%, #0a0f1c 100%);' +
            'backdrop-filter: blur(10px);' +
            'z-index:2147483647;display:flex;flex-direction:column;' +
            'align-items:center;justify-content:center;overflow:hidden;pointer-events:all;';

        // Subtle grid backdrop
        var canvas = document.createElement('canvas');
        canvas.id  = '_matrixCanvas';
        canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;opacity:0.10;';
        div.appendChild(canvas);

        // Terminal box (glassmorphism)
        var box = document.createElement('div');
        box.id  = '_dtBox';
        box.style.cssText = 'position:relative;z-index:2;width:min(92vw,620px);' +
            'background:rgba(10,14,26,0.85);border:1px solid rgba(0,212,255,0.25);border-radius:10px;' +
            'font-family:monospace;font-size:13px;overflow:hidden;' +
            'box-shadow:0 10px 60px rgba(0,0,0,0.55),0 0 38px rgba(0,212,255,0.22);';

        // Title bar
        var titleBar = document.createElement('div');
        titleBar.style.cssText = 'background:linear-gradient(90deg,#0dd7ff,#00ffa3);padding:10px 16px;display:flex;' +
            'align-items:center;gap:10px;letter-spacing:1.5px;text-transform:uppercase;';
        titleBar.innerHTML = '<span style="font-size:13px;font-weight:800;color:#04101c;">Segurança ativa</span>' +
            '<span style="font-size:11px;font-weight:700;color:#062131;opacity:0.8;">Monitoramento em tempo real</span>';
        box.appendChild(titleBar);

        // Terminal body
        var body = document.createElement('div');
        body.id  = '_dtTermBody';
        body.style.cssText = 'padding:20px 22px;min-height:280px;color:#a8b3c2;line-height:1.8;';
        box.appendChild(body);

        // Bottom bar with countdown
        var footer = document.createElement('div');
        footer.style.cssText = 'background:rgba(8,12,22,0.9);border-top:1px solid rgba(0,212,255,0.18);' +
            'padding:12px 20px;display:flex;justify-content:space-between;align-items:center;';
        footer.innerHTML =
            '<span style="color:#5d6b7a;font-size:11px;">POP RTP Secure // Sessão monitorada</span>' +
            '<span style="color:#00e0b8;font-size:12px;font-weight:800;" id="_dtCountdown">Monitorando...</span>';
        box.appendChild(footer);

        div.appendChild(box);
        document.body.appendChild(div);

        _startMatrixRain(canvas);
        _runTerminalSequence(body, info);
        _startCountdown();
    }

    function _startMatrixRain(canvas) {
        var ctx = canvas.getContext('2d');
        function resize() {
            canvas.width  = canvas.offsetWidth  || window.innerWidth;
            canvas.height = canvas.offsetHeight || window.innerHeight;
        }
        resize();
        window.addEventListener('resize', resize);
        var cols = Math.floor(canvas.width / 18);
        var drops = [];
        for (var i = 0; i < cols; i++) drops[i] = Math.random() * canvas.height;
        var chars = '01▮▯▱▢■□▪▫';
        setInterval(function(){
            ctx.fillStyle = 'rgba(5,7,15,0.08)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgba(0,255,200,0.14)';
            ctx.font = '12px monospace';
            for (var j = 0; j < drops.length; j++) {
                var c = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(c, j * 18, drops[j]);
                if (drops[j] > canvas.height && Math.random() > 0.982) drops[j] = 0;
                drops[j] += 16;
            }
        }, 50);
    }

    function _type(el, html, delay, cb) {
        // Append html after delay ms
        setTimeout(function(){
            el.innerHTML += html;
            el.scrollTop = el.scrollHeight;
            if (cb) cb();
        }, delay);
    }

    function _runTerminalSequence(el, info) {
        var d = 0;
        function line(text, color, extra) {
            d += extra || 420;
            _type(el,
                '<div style="color:'+(color||'#a8b3c2')+';">' + text + '</div>',
                d);
            return d;
        }
        function blank() { d += 180; _type(el,'<br/>',d); }

        line('<span style="color:#00e0b8;">[ Segurança ]</span> Acesso técnico detectado.', '#00e0b8', 0);
        blank();
        line('> Sessão protegida. Ferramentas de desenvolvedor não são permitidas.', '#6b7887', 200);
        line('> Monitorando integridade do ambiente...', '#6b7887');
        blank();
        line('<span style="color:#00ffa3;">• IP:</span> <span style="color:#e6edf3;">' + info.ip + '</span>', '#00ffa3');
        line('<span style="color:#00ffa3;">• Navegador:</span> <span style="color:#e6edf3;">' + info.browser + '</span>', '#00ffa3');
        line('<span style="color:#00ffa3;">• Sistema:</span> <span style="color:#e6edf3;">' + info.plat + '</span>', '#00ffa3');
        line('<span style="color:#00ffa3;">• Resolução:</span> <span style="color:#e6edf3;">' + info.res + '</span>', '#00ffa3');
        line('<span style="color:#00ffa3;">• Localização:</span> <span style="color:#e6edf3;">' + info.tz + '</span>', '#00ffa3');
        line('<span style="color:#00ffa3;">• Idioma:</span> <span style="color:#e6edf3;">' + info.lang + '</span>', '#00ffa3');
        line('<span style="color:#00ffa3;">• CPU:</span> <span style="color:#e6edf3;">' + info.cores + ' cores</span>', '#00ffa3');
        blank();
        line('> Registro criado. Sessão será bloqueada enquanto DevTools estiver aberto.', '#6b7887');
        line('> Para continuar, feche as ferramentas de desenvolvedor.', '#6b7887');
        blank();
        line('<span style="color:#00e0b8;font-weight:bold;">Proteção ativa.</span>', '#00e0b8', 400);
        line('<span style="color:#5d6b7a;">Feche DevTools para retomar a navegação.</span>', '#5d6b7a');
    }

    function _startCountdown() {
        var secs = 30;
        var el = null;
        var done = false;
        var iv = setInterval(function(){
            if (!el) el = document.getElementById('_dtCountdown');
            if (!el || done) return;
            secs--;
            if (secs <= 0) {
                done = true;
                clearInterval(iv);
                el.textContent = 'Sessão bloqueada enquanto DevTools estiver aberto.';
                el.style.color = '#ff4d4f';
                var body = document.getElementById('_dtTermBody');
                if (body) {
                    body.innerHTML += '<br/><div style="color:#ff4d4f;font-weight:700;text-align:center;margin-top:8px;">' +
                        'Acesso suspenso.</div>' +
                        '<div style="color:#5d6b7a;text-align:center;font-size:11px;margin-top:4px;">' +
                        'Feche as ferramentas de desenvolvedor para retomar a página.</div>';
                }
            } else {
                el.style.color = secs <= 10 ? '#ff4d4f' : '#00e0b8';
                el.textContent = 'Bloqueando sessão em ' + secs + 's...';
            }
        }, 1000);
    }

    function _onDevtoolsOpen() {
        if (_overlayShown) return;
        _overlayShown = true;
        // Wait for DOM to be ready
        if (document.body) { _buildOverlay(); }
        else { document.addEventListener('DOMContentLoaded', _buildOverlay); }
    }

    function _hideOverlay() {
        var ov = document.getElementById('_dtOverlay');
        if (ov) { ov.style.display = 'none'; }
        _overlayShown = false;
    }

    // ─── 7. DEVTOOLS DETECTION POLL ─────────────────────────────────────────────
    setInterval(function(){
        var wDiff = window.outerWidth  - window.innerWidth;
        var hDiff = window.outerHeight - window.innerHeight;
        var open  = wDiff > _threshold || hDiff > _threshold;
        if (open && !_devOpen) {
            _devOpen = true;
            _onDevtoolsOpen();
        } else if (!open && _devOpen) {
            _devOpen = false;
            _overlayShown = false;
            // Hide overlay and clear terminal so next open gets fresh scary sequence
            var ov = document.getElementById('_dtOverlay');
            if (ov) { ov.parentNode.removeChild(ov); }
        }
    }, 800);

})();

