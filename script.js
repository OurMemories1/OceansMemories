"use strict";

/* =====================================================
   ENGINE
===================================================== */
const stage = document.getElementById("stage");
const bar = document.getElementById("bar");
const audio = document.getElementById("audio");
const musicBtn = document.getElementById("music");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const FX = Object.assign(
    { floaters: true, snow: true, snowAmount: 1, waves: true, boat: true, stars: true, shootingStars: true, cursorTrail: true, mascot: true },
    CONFIG.effects || {}
);
const MASCOT = Object.assign({ name: "Acidd", hint: "", moonWish: "Make a wish ✨", pageLines: [], tapLines: [] }, CONFIG.mascot || {});

const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const nextBtn = (label, extra = "") =>
    `<button class="btn" data-next type="button">${esc(label)}</button>${extra}`;

const HERO_BOAT = `
    <div class="hero-boat" aria-hidden="true">
        <svg viewBox="0 0 60 44" width="58" height="42">
            <path d="M30 3 V24" stroke="#cfe6ee" stroke-width="1.4" stroke-linecap="round"/>
            <path d="M30 4 L30 23 H9 Z" fill="#eaf5f8"/>
            <path d="M32 9 L51 23 H32 Z" fill="#a9c9d6"/>
            <path d="M3 25 H57 L48 38 H12 Z" fill="#f4fafc"/>
            <path d="M3 25 H57 L55 28 H5 Z" fill="#9ac7d7"/>
            <path d="M30 4 L38 6.5 L30 9 Z" fill="#ff9fb4"/>
        </svg>
    </div>`;

const pages = [
    // 1 Opening
    (c) => `
        <section class="page">
            ${HERO_BOAT}
            ${c.opening.badge ? `<span class="badge">${esc(c.opening.badge)}</span>` : ""}
            <h1>${esc(c.opening.headline)}</h1>
            <span class="name">${esc(c.crushName)}</span>
            ${c.opening.subhead ? `<p>${esc(c.opening.subhead)}</p>` : ""}
            ${c.opening.message ? `<p>${esc(c.opening.message)}</p>` : ""}
            ${c.opening.signature ? `<p class="script" style="font-size:15px">${esc(c.opening.signature)}</p>` : ""}
            ${nextBtn(c.opening.button)}
        </section>`,

    // 2 Letter
    (c) => `
        <section class="page">
            <h2>${esc(c.letter.title)}</h2>
            <div class="letter script">
                <span class="dear">${esc(c.ui.dear)} ${esc(c.crushName)},</span>
                <div class="body typing" id="typed"></div>
                <div class="sign" id="sign" hidden>${esc(c.senderName)}</div>
            </div>
            <div class="nav" id="letterNav" hidden>
                <button class="btn ghost" data-prev type="button">${esc(c.ui.back)}</button>
                ${nextBtn(c.letter.button)}
            </div>
        </section>`,

    // 3 Little things
    (c) => `
        <section class="page wide">
            <h2>${esc(c.little.title)}</h2>
            <div class="cards ${c.little.items.length > 3 ? "four" : "three"}">
                ${c.little.items
                    .map(
                        (it, i) => `
                    <article class="card" style="animation-delay:${0.15 + i * 0.15}s">
                        <span class="ico">${esc(it.icon)}</span>
                        <h3>${esc(it.title)}</h3>
                        <p>${esc(it.text)}</p>
                    </article>`
                    )
                    .join("")}
            </div>
            <div class="nav"><button class="btn ghost" data-prev type="button">${esc(c.ui.back)}</button>${nextBtn(c.little.button)}</div>
        </section>`,

    // 4 Memories
    (c) => `
        <section class="page wide">
            <h2>${esc(c.memories.title)}</h2>
            <div class="gallery n${c.memories.photos.length}">
                ${c.memories.photos
                    .map(
                        (p) => `
                    <figure class="shot">
                        <img src="${esc(p.src)}" alt="${esc(p.caption)}" loading="lazy">
                        <figcaption>${esc(p.caption)}</figcaption>
                    </figure>`
                    )
                    .join("")}
            </div>
            <div class="memory-note">
                ${c.memories.paragraphs.map((t) => `<p>${esc(t)}</p>`).join("")}
            </div>
            <div class="nav"><button class="btn ghost" data-prev type="button">${esc(c.ui.back)}</button>${nextBtn(c.memories.button)}</div>
        </section>`,

    // 5 Satu kenangan yang tersisa
    (c) => `
        <section class="page memory-solo">
            <h2>${esc(c.soloMemory.title)}</h2>
            <div class="solo-photo">
                <figure class="shot">
                    <img src="${esc(c.soloMemory.photo.src)}" alt="${esc(c.soloMemory.photo.caption)}" loading="lazy">
                    <figcaption>${esc(c.soloMemory.photo.caption)}</figcaption>
                </figure>
            </div>
            ${c.soloMemory.paragraphs.map((t) => `<p>${esc(t)}</p>`).join("")}
            <div class="nav"><button class="btn ghost" data-prev type="button">${esc(c.ui.back)}</button>${nextBtn(c.soloMemory.button)}</div>
        </section>`,

    // 6 Why you
    (c) => `
        <section class="page wide">
            <h2>${esc(c.why.title)}</h2>
            <div class="cards four">
                ${c.why.items
                    .map(
                        (it, i) => `
                    <article class="card" style="animation-delay:${0.15 + i * 0.15}s">
                        <span class="num">${String(i + 1).padStart(2, "0")}</span>
                        <h3>${esc(it.title)}</h3>
                        <p>${esc(it.text)}</p>
                    </article>`
                    )
                    .join("")}
            </div>
            <div class="nav"><button class="btn ghost" data-prev type="button">${esc(c.ui.back)}</button>${nextBtn(c.why.button)}</div>
        </section>`,

    // 7 Final
    (c) => `
        <section class="page">
            <span class="badge">${esc(c.final.badge)}</span>
            <p class="final-line">${esc(c.final.headline)}</p>
            ${c.final.paragraphs.map((t) => `<p>${esc(t)}</p>`).join("")}
            <div class="heart-big">♡</div>
            <div class="script" style="font-size:16px">${esc(c.final.from)}</div>
            <span class="name" style="font-size:clamp(30px,9vw,44px)">${esc(c.senderName)}</span>
            <form class="reply" id="replyForm" autocomplete="off">
                <h3 class="reply-title">${esc(c.reply.title)}</h3>
                <p class="reply-hint">${esc(c.reply.hint)}</p>
                <input id="replyName" type="text" maxlength="40" placeholder="${esc(c.reply.namePlaceholder)}" aria-label="${esc(c.reply.namePlaceholder)}">
                <textarea id="replyText" rows="4" maxlength="800" placeholder="${esc(c.reply.messagePlaceholder)}" aria-label="${esc(c.reply.messagePlaceholder)}" required></textarea>
                <button class="btn" type="submit">${esc(c.reply.button)}</button>
                <p class="reply-status" id="replyStatus" role="status" aria-live="polite"></p>
            </form>
            <div class="nav"><button class="btn ghost" data-prev type="button">${esc(c.ui.back)}</button>
            <button class="btn" data-restart type="button">${esc(c.final.button)}</button></div>
        </section>`
];

/* seberapa deras salju di tiap halaman (halaman terakhir paling syahdu) */
const SNOW_BY_PAGE = [1, 1, 1, 1.1, 1, 1, 2.4];

let current = 0;
let busy = false;
let typeTimer = null;
let typeDone = false;

/* ---------- Render & transisi ---------- */
function show(index) {
    if (index < 0 || index >= pages.length) return;
    clearTimeout(typeTimer);

    stage.innerHTML = pages[index](CONFIG);
    current = index;

    bar.style.width = ((index + 1) / pages.length) * 100 + "%";
    document.body.dataset.page = index;

    document.querySelectorAll(".shot img").forEach((img) =>
        img.addEventListener("error", () => {
            img.remove();
            img.parentElement?.classList.add("empty");
        })
    );

    if (index === 1) startTyping();
    onPageShown(index);
}

function go(index) {
    if (busy || index === current) return;
    const old = stage.firstElementChild;
    if (!old || reduceMotion) return show(index);

    busy = true;
    old.classList.add("leave");
    setTimeout(() => {
        show(index);
        busy = false;
    }, 420);
}

/* ---------- Typing ---------- */
function startTyping() {
    const box = document.getElementById("typed");
    const text = CONFIG.letter.message;
    typeDone = false;
    let i = 0;

    const tick = () => {
        i++;
        box.textContent = text.slice(0, i);
        if (i >= text.length) return finishTyping();
        typeTimer = setTimeout(tick, CONFIG.typingSpeed);
    };

    if (reduceMotion) return finishTyping();
    tick();
}

function finishTyping() {
    clearTimeout(typeTimer);
    const box = document.getElementById("typed");
    if (!box) return;
    box.textContent = CONFIG.letter.message;
    box.classList.remove("typing");
    document.getElementById("sign").hidden = false;
    document.getElementById("letterNav").hidden = false;
    typeDone = true;
}

/* ---------- Burst (hati, salju, kilau) ---------- */
const BURST_SYMBOLS = ["♡", "❄", "✦", "❄", "♡", "·"];
function burst(x, y, count = 8) {
    if (reduceMotion) return;
    for (let i = 0; i < count; i++) {
        const h = document.createElement("span");
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
        const dist = 40 + Math.random() * 46;
        h.className = "burst";
        h.textContent = BURST_SYMBOLS[Math.floor(Math.random() * BURST_SYMBOLS.length)];
        h.style.cssText = `left:${x}px;top:${y}px;font-size:${12 + Math.random() * 10}px;--dx:${Math.cos(angle) * dist}px;--dy:${Math.sin(angle) * dist}px`;
        document.body.appendChild(h);
        h.addEventListener("animationend", () => h.remove());
    }
}

/* ---------- Klik ---------- */
document.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) {
        // ketuk area kosong = hujan kilau kecil
        if (!e.target.closest(".page")) burst(e.clientX, e.clientY, 6);
        return;
    }

    if (btn.hasAttribute("data-next")) {
        burst(e.clientX, e.clientY);
        go(current + 1);
    } else if (btn.hasAttribute("data-prev")) {
        go(current - 1);
    } else if (btn.hasAttribute("data-restart")) {
        burst(e.clientX, e.clientY);
        go(0);
    }
});

// Klik di area surat = lewati ketikan
stage.addEventListener("click", (e) => {
    if (current === 1 && !typeDone && !e.target.closest("button")) finishTyping();
});

/* ---------- Keyboard ---------- */
document.addEventListener("keydown", (e) => {
    // saat mengetik pesan, tombol panah dipakai untuk memindah kursor, bukan pindah halaman
    if (e.target.closest && e.target.closest("input, textarea")) return;
    if (e.key === "ArrowRight") {
        if (current === 1 && !typeDone) return finishTyping();
        go(current + 1);
    } else if (e.key === "ArrowLeft") {
        go(current - 1);
    }
});

/* ---------- Pesan untuk pembuat web (halaman terakhir) ----------
   Urutan pengiriman: WhatsApp (CONFIG.reply.whatsapp) -> email (CONFIG.reply.email)
   -> menu bagikan HP -> salin ke clipboard. */
document.addEventListener("submit", async (e) => {
    if (e.target.id !== "replyForm") return;
    e.preventDefault();

    const R = CONFIG.reply || {};
    const status = document.getElementById("replyStatus");
    const name = document.getElementById("replyName").value.trim();
    const message = document.getElementById("replyText").value.trim();
    if (!message) return;

    const text = `Pesan dari ${name || CONFIG.crushName} untuk ${CONFIG.senderName}:\n\n${message}`;
    const wa = String(R.whatsapp || "").replace(/\D/g, "");

    if (wa) {
        window.open(`https://wa.me/${wa}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
        status.textContent = R.waDone || "Membuka WhatsApp… tinggal tekan kirim.";
        return;
    }
    if (R.email) {
        location.href = `mailto:${R.email}?subject=${encodeURIComponent("Pesan dari " + (name || CONFIG.crushName))}&body=${encodeURIComponent(text)}`;
        status.textContent = R.mailDone || "Membuka aplikasi email…";
        return;
    }
    if (navigator.share) {
        try {
            await navigator.share({ text });
            status.textContent = R.sharedDone || "Terkirim, terima kasih ♡";
            return;
        } catch (err) {
            if (err && err.name === "AbortError") return;
        }
    }
    try {
        await navigator.clipboard.writeText(text);
        status.textContent = R.copiedDone || "Pesan tersalin. Tempel dan kirim ke " + CONFIG.senderName + " ya.";
    } catch (err) {
        status.textContent = "Gagal menyalin, coba salin pesannya secara manual ya.";
    }
});

/* ---------- Musik latar: coba autoplay, lalu mulai saat interaksi pertama jika diblokir ---------- */
function toast(msg) {
    document.querySelectorAll(".toast").forEach((t) => t.remove());
    const t = document.createElement("div");
    t.className = "toast";
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3800);
}

function playMusic(showError = false) {
    audio.play().then(() => {
        musicBtn.classList.add("on");
        musicBtn.setAttribute("aria-label", "Jeda musik");
    }).catch((err) => {
        musicBtn.classList.remove("on");
        if (showError) {
            console.warn("Musik gagal diputar:", err, audio.src);
            toast(audio.error ? "File musik tidak ditemukan atau formatnya tidak didukung" : "Browser memblokir autoplay. Tekan tombol musik untuk memulai.");
        }
    });
}

audio.addEventListener("play", () => musicBtn.classList.add("on"));
audio.addEventListener("pause", () => musicBtn.classList.remove("on"));
window.addEventListener("load", () => playMusic(false));
document.addEventListener("pointerdown", function startAfterGesture() {
    if (audio.paused) playMusic(false);
    document.removeEventListener("pointerdown", startAfterGesture);
}, { once: true });

musicBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (audio.paused) playMusic(true);
    else {
        audio.pause();
        musicBtn.classList.remove("on");
        musicBtn.setAttribute("aria-label", "Putar musik");
    }
});

/* ---------- Floating hearts, snowflakes & bubbles ---------- */
(function floaters() {
    if (reduceMotion) return;
    const box = document.getElementById("floaters");
    const symbols = ["♡", "♥", "✦", "·", "❄", "○"];

    setInterval(() => {
        if (document.hidden) return;
        const f = document.createElement("span");
        f.className = "floater";
        f.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        f.style.left = Math.random() * 100 + "%";
        f.style.fontSize = 10 + Math.random() * 16 + "px";
        f.style.animationDuration = 9 + Math.random() * 8 + "s";
        f.style.setProperty("--sway", Math.random() * 60 - 30 + "px");
        box.appendChild(f);
        f.addEventListener("animationend", () => f.remove());
    }, 1400);
})();

/* =====================================================
   SALJU TURUN PERLAHAN (canvas, 2 lapisan: jauh & dekat)
===================================================== */
const Snow = (function () {
    const layers = [];
    let w = 0, h = 0, dpr = 1;
    let wind = 0, windTarget = 0;
    let intensity = 1, intensityTarget = 1;
    let last = 0, t = 0, started = false;
    const rnd = (a, b) => a + Math.random() * (b - a);

    function spawn(L, anywhere) {
        const o = L.opts;
        const k = Math.pow(Math.random(), 1.6);
        return {
            x: rnd(0, w),
            y: anywhere ? rnd(0, h) : -rnd(6, 60),
            r: o.minR + (o.maxR - o.minR) * k,
            vy: o.speed * (0.6 + k * 0.9) * rnd(0.8, 1.2),
            sway: rnd(6, 20),
            ss: rnd(0.4, 1.1),
            ph: rnd(0, 6.28),
            a: o.alpha * rnd(0.55, 1),
            rot: rnd(0, 6.28),
            rs: rnd(-0.6, 0.6)
        };
    }

    function resize() {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        w = window.innerWidth;
        h = window.innerHeight;
        layers.forEach((L) => {
            L.canvas.width = Math.round(w * dpr);
            L.canvas.height = Math.round(h * dpr);
            L.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            const n = Math.round(Math.min(L.opts.max, (w * h) / L.opts.area) * FX.snowAmount);
            while (L.flakes.length < n) L.flakes.push(spawn(L, true));
            L.flakes.length = n;
        });
        if (reduceMotion) layers.forEach(draw);
    }

    function draw(L) {
        const c = L.ctx;
        c.clearRect(0, 0, w, h);
        for (const f of L.flakes) {
            const col = `rgba(236,248,253,${f.a.toFixed(3)})`;
            if (f.r >= 2.6) {
                c.save();
                c.translate(f.x, f.y);
                c.rotate(f.rot);
                c.strokeStyle = col;
                c.lineWidth = Math.max(0.8, f.r * 0.2);
                c.lineCap = "round";
                c.beginPath();
                for (let i = 0; i < 3; i++) {
                    c.moveTo(0, -f.r);
                    c.lineTo(0, f.r);
                    c.moveTo(-f.r * 0.32, -f.r * 0.62);
                    c.lineTo(0, -f.r * 0.3);
                    c.lineTo(f.r * 0.32, -f.r * 0.62);
                    c.moveTo(-f.r * 0.32, f.r * 0.62);
                    c.lineTo(0, f.r * 0.3);
                    c.lineTo(f.r * 0.32, f.r * 0.62);
                    c.rotate(Math.PI / 3);
                }
                c.stroke();
                c.restore();
            } else {
                c.fillStyle = col;
                c.beginPath();
                c.arc(f.x, f.y, f.r, 0, 6.2832);
                c.fill();
            }
        }
    }

    function step(L, dt) {
        const maxR = L.opts.maxR;
        for (const f of L.flakes) {
            f.y += f.vy * intensity * dt;
            f.x += (Math.sin(t * f.ss + f.ph) * f.sway + wind * (0.4 + f.r / maxR)) * dt;
            f.rot += f.rs * dt;
            if (f.y > h + 12) Object.assign(f, spawn(L, false));
            else if (f.x < -12) f.x = w + 10;
            else if (f.x > w + 12) f.x = -10;
        }
    }

    function frame(ts) {
        const dt = Math.min((ts - last) / 1000 || 0.016, 0.05);
        last = ts;
        t += dt;
        wind += (windTarget - wind) * Math.min(1, dt * 1.5);
        intensity += (intensityTarget - intensity) * Math.min(1, dt * 0.8);
        layers.forEach((L) => { step(L, dt); draw(L); });
        requestAnimationFrame(frame);
    }

    return {
        add(canvasId, opts) {
            const canvas = document.getElementById(canvasId);
            if (!canvas) return;
            layers.push({ canvas, ctx: canvas.getContext("2d"), opts, flakes: [] });
        },
        start() {
            if (started || !layers.length) return;
            started = true;
            resize();
            window.addEventListener("resize", resize);
            window.addEventListener("pointermove", (e) => { windTarget = (e.clientX / w - 0.5) * 34; }, { passive: true });
            if (!reduceMotion) requestAnimationFrame(frame);
        },
        setIntensity(v) { intensityTarget = v; }
    };
})();

if (FX.snow) {
    Snow.add("snowBack", { max: 110, area: 14000, minR: 0.8, maxR: 2.2, speed: 16, alpha: 0.55 });
    Snow.add("snowFront", { max: 46, area: 32000, minR: 2.2, maxR: 5.2, speed: 26, alpha: 0.8 });
    Snow.start();
} else {
    document.querySelectorAll(".snow").forEach((c) => c.remove());
}

/* =====================================================
   BINTANG, BULAN & BINTANG JATUH
===================================================== */
(function sky() {
    const starBox = document.getElementById("stars");
    const moon = document.getElementById("moon");
    const shootBox = document.getElementById("shooting");

    if (!FX.stars) {
        starBox.remove();
        moon.remove();
        shootBox.remove();
        return;
    }

    const n = window.innerWidth < 600 ? 34 : 64;
    for (let i = 0; i < n; i++) {
        const s = document.createElement("span");
        const size = 1 + Math.random() * 2;
        s.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 62}%;width:${size}px;height:${size}px;animation-delay:${(Math.random() * 6).toFixed(2)}s;animation-duration:${(3 + Math.random() * 4).toFixed(2)}s`;
        starBox.appendChild(s);
    }

    function shoot() {
        if (reduceMotion || document.hidden) return;
        const el = document.createElement("span");
        el.className = "shoot";
        el.style.left = 20 + Math.random() * 70 + "%";
        el.style.top = Math.random() * 28 + "%";
        shootBox.appendChild(el);
        el.addEventListener("animationend", () => el.remove());
    }
    if (FX.shootingStars) {
        setTimeout(shoot, 3500);
        setInterval(shoot, 11000);
    }

    moon.addEventListener("click", (e) => {
        e.stopPropagation();
        moon.classList.remove("wish");
        void moon.offsetWidth;
        moon.classList.add("wish");
        shoot();
        setTimeout(shoot, 350);
        burst(e.clientX, e.clientY, 10);
        toast(MASCOT.moonWish);
    });
})();

/* =====================================================
   OMBAK & PERAHU KERTAS
===================================================== */
if (!FX.waves) document.getElementById("sea").remove();
else if (!FX.boat) document.getElementById("boat").remove();

/* =====================================================
   PIPI SI PENGUIN
===================================================== */
const mascotWrap = document.getElementById("mascotWrap");
const mascot = document.getElementById("mascot");
const bubble = document.getElementById("bubble");
let bubbleTimer = null;
let lastTap = -1;

function say(text, ms = 5200) {
    if (!FX.mascot || !text) return;
    bubble.textContent = text;
    bubble.classList.add("show");
    clearTimeout(bubbleTimer);
    bubbleTimer = setTimeout(() => bubble.classList.remove("show"), ms);
}

if (!FX.mascot) {
    mascotWrap.remove();
} else {
    mascot.addEventListener("click", (e) => {
        e.stopPropagation();
        mascot.classList.remove("hop");
        void mascot.offsetWidth;
        mascot.classList.add("hop");
        const r = mascot.getBoundingClientRect();
        burst(r.left + r.width / 2, r.top + 10, 7);
        const lines = MASCOT.tapLines;
        if (lines.length) {
            let i;
            do { i = Math.floor(Math.random() * lines.length); } while (lines.length > 1 && i === lastTap);
            lastTap = i;
            say(lines[i], 4200);
        }
    });
}

let hinted = false;
function onPageShown(index) {
    Snow.setIntensity(SNOW_BY_PAGE[index] || 1);

    if (FX.mascot) {
        setTimeout(() => { if (current === index) say(MASCOT.pageLines[index]); }, 1200);
    }

    if (index === 0 && !hinted && MASCOT.hint) {
        hinted = true;
        setTimeout(() => { if (current === 0) toast(MASCOT.hint); }, 6500);
    }

    // halaman terakhir: hujan salju & kilau kecil
    if (index === pages.length - 1 && !reduceMotion) {
        [0, 500, 1000].forEach((d, i) =>
            setTimeout(() => {
                if (current === pages.length - 1) burst(window.innerWidth * (0.25 + i * 0.25), window.innerHeight * 0.3, 8);
            }, 900 + d)
        );
    }
}

/* =====================================================
   JEJAK SALJU DI KURSOR (desktop)
===================================================== */
(function trail() {
    if (reduceMotion || !FX.cursorTrail) return;
    let lastT = 0;
    window.addEventListener("pointermove", (e) => {
        if (e.pointerType !== "mouse") return;
        const now = performance.now();
        if (now - lastT < 70) return;
        lastT = now;
        const s = document.createElement("span");
        s.className = "trail";
        s.textContent = Math.random() > 0.4 ? "❄" : "✦";
        s.style.left = e.clientX + "px";
        s.style.top = e.clientY + "px";
        s.style.fontSize = 8 + Math.random() * 8 + "px";
        s.style.setProperty("--tx", Math.random() * 24 - 12 + "px");
        document.body.appendChild(s);
        s.addEventListener("animationend", () => s.remove());
    }, { passive: true });
})();

/* ---------- Terapkan pengaturan dari config.js ---------- */
if (CONFIG.pageTitle) document.title = CONFIG.pageTitle;
Object.entries(CONFIG.theme || {}).forEach(([k, v]) => document.documentElement.style.setProperty("--" + k, v));
if (CONFIG.music && CONFIG.music.src) {
    let src = CONFIG.music.src;
    try { src = encodeURI(decodeURI(src)); } catch (e) { /* pakai apa adanya */ }
    audio.src = src;
}
if (CONFIG.music && CONFIG.music.enabled === false) musicBtn.hidden = true;
if (FX.floaters === false) document.getElementById("floaters").hidden = true;

show(0);
