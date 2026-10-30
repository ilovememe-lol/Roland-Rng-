const AURAS = [
    { name: "Common", chance: 2, color: "#a0a0a0", effect: "dust" },
    { name: "Uncommon", chance: 4, color: "#55ff55", effect: "leaf" },
    { name: "Good", chance: 5, color: "#55ffff", effect: "sparkle" },
    { name: "Natural", chance: 8, color: "#88ff88", effect: "floatCircle" },
    { name: "Rare", chance: 16, color: "#5555ff", effect: "orbitDots" },
    { name: "Crystallized", chance: 64, color: "#00ffff", effect: "crystalShard" },
    { name: "Rage", chance: 128, color: "#ff3333", effect: "fireFlame" },
    { name: "Glacier", chance: 1024, color: "#aaffff", effect: "snowBurst" },
    { name: "Precious", chance: 1024, color: "#00bfff", effect: "snowBurst" },
    { name: "Magnetic", chance: 2048, color: "#ff3300", effect: "swirlVortex" },
    { name: "Sidereum", chance: 4096, color: "#ffd700", effect: "goldRune" },
    { name: "Gilded", chance: 5000, color: "#ffd700", effect: "goldRune" },
    { name: "Quartz", chance: 8192, color: "#ff69b4", effect: "orbitDots" },
    { name: "Diaboli", chance: 10000, color: "#990000", effect: "demonHellfire" },
    { name: "Powered", chance: 16384, color: "#ffffff", effect: "lightningSpark" },
    { name: "BOUNDLESS", chance: 120000, color: "#da70d6", effect: "voidNebula" },

    { name: "Glacier Alloy", chance: 3000, color: "#aaffff", effect: "snowBurst" },
    { name: "Magnet Core", chance: 8000, color: "#ff3300", effect: "swirlVortex" },
    { name: "Demon Ember", chance: 35000, color: "#990000", effect: "demonHellfire" },
    { name: "Celestial Dust", chance: 500000, color: "#ffff00", effect: "cosmicRings" },

    { name: "Ether Essence", chance: 5000, color: "#00ffaa", effect: "swirlVortex" },
    { name: "Prism Fragment", chance: 25000, color: "#ff00ff", effect: "rainbowPrism" },
    { name: "Solar Core", chance: 100000, color: "#ffcc00", effect: "goldenBeam" },
    { name: "Clockwork Core", chance: 500000, color: "#e0e0e0", effect: "pixelNoise" },
    { name: "Flame Spark", chance: 1200000, color: "#ff4500", effect: "fireFlame" },
    { name: "Abyss Orb", chance: 2500000, color: "#00ffff", effect: "blackHole" },
    { name: "Void Crystal", chance: 5000000, color: "#4b0082", effect: "shadowEclipse" },
    { name: "Cyber Chip", chance: 8000000, color: "#00ff66", effect: "cyberGlitch" },
    { name: "Cosmic Feather", chance: 15000000, color: "#ffff00", effect: "cosmicRings" },
    { name: "Titan Relic", chance: 25000000, color: "#ff0055", effect: "darkBloodPillar" },
    { name: "Crimson Crest", chance: 50000000, color: "#ff0000", effect: "absoluteRedStorm" },
    { name: "Genesis Heart", chance: 100000000, color: "#ffffff", effect: "galaxyBigBang" },

    { name: "Glitch", chance: 250000, color: "#00ff66", effect: "cyberGlitch" },
    { name: "Celestial", chance: 500000, color: "#00bfff", effect: "cosmicRings" },
    { name: "Solaris", chance: 7500000, color: "#ff8c00", effect: "solarCrown" },
    { name: "Eclipse", chance: 40000000, color: "#4b0082", effect: "shadowEclipse" },
    { name: "Matrix", chance: 50000000, color: "#00ff66", effect: "cyberGlitch" },
    { name: "AbyssalHunter", chance: 100000000, color: "#00ffff", effect: "blackHole" },
    { name: "Roland: Absolute", chance: 100000000, color: "#ff0000", effect: "absoluteRedStorm" },
    { name: "Atlas", chance: 360000000, color: "#ffcc00", effect: "goldenBeam" },
    { name: "Creation", chance: 1000000000, color: "#00ffff", effect: "galaxyBigBang" },
    
    { name: "AETHER", chance: 15000, color: "#00ffaa", effect: "swirlVortex", craftOnly: true },
    { name: "CHROMA", chance: 80000, color: "#ff00ff", effect: "rainbowPrism", craftOnly: true },
    { name: "HYPERION", chance: 500000, color: "#ffcc00", effect: "goldenBeam", craftOnly: true },
    { name: "Matrix : Steampunk", chance: 150000000, color: "#e0e0e0", effect: "pixelNoise", craftOnly: true },
    { name: "SOLARIS : Overdrive", chance: 250000000, color: "#ff4500", effect: "sunExplosion", craftOnly: true },
    { name: "AbyssalHunter : Awakened", chance: 400000000, color: "#00ffff", effect: "blackHole", craftOnly: true },
    { name: "ECLIPSE : Void", chance: 500000000, color: "#4b0082", effect: "shadowEclipse", craftOnly: true },
    { name: "GLITCH : Unstable", chance: 800000000, color: "#00ff66", effect: "cyberGlitch", craftOnly: true },
    { name: "A.T.L.A.S.", chance: 1000000000, color: "#ff0055", effect: "darkBloodPillar", craftOnly: true },
    { name: "CELESTIAL : Zenith", chance: 1200000000, color: "#ffff00", effect: "cosmicRings", craftOnly: true },
    { name: "ROLAND : Infinity", chance: 2000000000, color: "#ff0000", effect: "absoluteRedStorm", craftOnly: true },
    { name: "CREATION : Prime", chance: 5000000000, color: "#ffffff", effect: "galaxyBigBang", craftOnly: true }
];

const GEARS = {
    LuckGlove: { name: "Luck Glove", luckBoost: 0.2, speedBoost: 0, desc: "행운 +20%" },
    SpeedDevice: { name: "Speed Device", luckBoost: 0, speedBoost: 0.3, desc: "쿨타임 -30%" },
    JackpotGauntlet: { name: "Jackpot Gauntlet", luckBoost: 0.5, speedBoost: 0.2, desc: "행운 +50%, 쿨타임 -20%" },
    FrostRing: { name: "Frost Ring", luckBoost: 0, speedBoost: 0.4, desc: "쿨타임 -40% | ✨10회 ROLL 시 5초간 쿨타임 -80%" },
    MagneticGauntlet: { name: "Magnetic Gauntlet", luckBoost: 0.8, speedBoost: 0, desc: "행운 +80% | ✨15회 ROLL 시 10초간 행운 +150%" },
    ExoflexDevice: { name: "Exoflex Device", luckBoost: 1.2, speedBoost: 0.5, desc: "행운 +120%, 쿨타임 -50%" },
    DemonScythe: { name: "Demon Scythe", luckBoost: 1.5, speedBoost: 0, desc: "행운 +150% | ✨20회 ROLL 시 다음 ROLL 행운 +300%" },
    CelestialCrown: { name: "Celestial Crown", luckBoost: 2.5, speedBoost: 0.6, desc: "행운 +250%, 쿨타임 -60% | ✨30회 ROLL 시 10초간 행운 +500%, 쿨타임 -90%" }
};

const BGM_PLAYLIST = [
    "./[Blue Archive] Luminous Memory lofi mix - ChestnutWhale.mp3",
    "./[blue archive] target for love but chill lofi - TiHA Studio.mp3",
    "./[blue archive] usagi flap but chill lofi - TiHA Studio.mp3",
    "./hifumi daisuki but it's a chill lofi mix loop for study ♪✨ [blue archive] - TiHA Studio.mp3"
];

let bgmIndex = 0;
let totalRolls = 0, gold = 0, baseAutoDelay = 250;
let bestChance = 0, bestName = "None", isAuto = false, isRolling = false;
let equippedGear = null, activeBuff = null, oneShotLuckMult = 0;
let gearRollCounter = 0, activeGearBuff = null;
let enableParticles = true, lastRolledAura = AURAS[0];

const inventory = {}, gearInventory = {};

// DOM 요소 식별
const menuBtn = document.getElementById('menu-toggle-btn');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebar-overlay');

const navInv = document.getElementById('nav-inv');
const navGear = document.getElementById('nav-gear');
const navShop = document.getElementById('nav-shop');
const navCraft = document.getElementById('nav-craft');
const navFullscreen = document.getElementById('nav-fullscreen');
const navSettings = document.getElementById('nav-settings');

const invModal = document.getElementById('inv-modal');
const gearModal = document.getElementById('gear-modal');
const shopModal = document.getElementById('shop-modal');
const craftModal = document.getElementById('craft-modal');
const settingsModal = document.getElementById('settings-modal');

const rollBtn = document.getElementById('roll-btn');
const autoBtn = document.getElementById('auto-btn');
const normalPanel = document.getElementById('normal-panel');
const inspectPanel = document.getElementById('inspect-panel');
const exitInspectBtn = document.getElementById('exit-inspect-btn');

const auraNameEl = document.getElementById('aura-name');
const auraRarityEl = document.getElementById('aura-rarity');
const totalRollsEl = document.getElementById('total-rolls');
const goldValEl = document.getElementById('gold-val');
const luckMultEl = document.getElementById('luck-mult');
const equippedGearEl = document.getElementById('equipped-gear');
const bestRollEl = document.getElementById('best-roll');
const avatar = document.getElementById('character-avatar');

const bgmPlayer = document.getElementById('bgm-player');
const bgmSlider = document.getElementById('bgm-volume');
const canvas = document.getElementById('auraCanvas');
const ctx = canvas.getContext('2d');
const particles = [];
let currentAura = AURAS[0];

if (bgmPlayer && bgmSlider) {
    bgmPlayer.volume = bgmSlider.value / 100;
    bgmSlider.addEventListener('input', (e) => { bgmPlayer.volume = e.target.value / 100; });
    bgmPlayer.addEventListener('ended', playNextBGM);
}

function playNextBGM() {
    if (!bgmPlayer) return;
    bgmPlayer.src = encodeURI(BGM_PLAYLIST[bgmIndex]);
    bgmPlayer.play().catch(() => {});
    bgmIndex = (bgmIndex + 1) % BGM_PLAYLIST.length;
}

function tryPlayMusic() {
    if (bgmPlayer && bgmPlayer.paused) playNextBGM();
}

function toggleSidebar() {
    if (sidebar) sidebar.classList.toggle('open');
    if (sidebarOverlay) sidebarOverlay.classList.toggle('active');
}

if (menuBtn) menuBtn.addEventListener('click', toggleSidebar);
if (sidebarOverlay) sidebarOverlay.addEventListener('click', toggleSidebar);

if (navInv) navInv.addEventListener('click', () => { toggleSidebar(); renderInventoryList(); if (invModal) invModal.style.display = 'flex'; });
if (navGear) navGear.addEventListener('click', () => { toggleSidebar(); renderGearList(); if (gearModal) gearModal.style.display = 'flex'; });
if (navShop) navShop.addEventListener('click', () => { toggleSidebar(); if (shopModal) shopModal.style.display = 'flex'; });
if (navCraft) navCraft.addEventListener('click', () => { toggleSidebar(); if (craftModal) craftModal.style.display = 'flex'; });
if (navSettings) navSettings.addEventListener('click', () => { toggleSidebar(); if (settingsModal) settingsModal.style.display = 'flex'; });

if (navFullscreen) {
    navFullscreen.addEventListener('click', () => {
        toggleSidebar();
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
        } else {
            if (document.exitFullscreen) document.exitFullscreen();
        }
    });
}

document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', (e) => { e.target.closest('.modal').style.display = 'none'; });
});

const particleToggle = document.getElementById('particle-toggle');
if (particleToggle) particleToggle.addEventListener('change', (e) => { enableParticles = e.target.checked; });

function resetGameData() {
    if (confirm("정말로 모든 데이터를 초기화하시겠습니까? (복구 불가)")) {
        localStorage.removeItem('sols_rng_save');
        location.reload();
    }
}

function saveData() {
    const data = { totalRolls, gold, bestChance, bestName, inventory, gearInventory, equippedGear };
    localStorage.setItem('sols_rng_save', JSON.stringify(data));
}

function loadData() {
    const saved = localStorage.getItem('sols_rng_save');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            totalRolls = data.totalRolls || 0;
            gold = data.gold || 0;
            bestChance = data.bestChance || 0;
            bestName = data.bestName || "None";
            equippedGear = data.equippedGear || null;
            Object.assign(inventory, data.inventory || {});
            Object.assign(gearInventory, data.gearInventory || {});

            if (totalRollsEl) totalRollsEl.innerText = totalRolls.toLocaleString();
            if (goldValEl) goldValEl.innerText = gold.toLocaleString();
            if (bestChance > 0 && bestRollEl) {
                bestRollEl.innerText = `${bestName} (1/${bestChance.toLocaleString()})`;
                const bestAura = AURAS.find(a => a.name === bestName);
                if (bestAura) bestRollEl.style.color = bestAura.color;
            }
            updateStatsDisplay();
        } catch(e) {}
    }
}

function getEffectiveLuck() {
    let gearLuck = equippedGear && GEARS[equippedGear] ? GEARS[equippedGear].luckBoost : 0;
    let buffLuck = activeBuff ? activeBuff.luckMult : 1.0;
    let gearBuffLuck = activeGearBuff ? activeGearBuff.luckMult : 0;
    let total = (1.0 + gearLuck + gearBuffLuck) * buffLuck;
    if (oneShotLuckMult > 0) total += oneShotLuckMult;
    return total;
}

function getEffectiveDelay() {
    let gearSpeed = equippedGear && GEARS[equippedGear] ? GEARS[equippedGear].speedBoost : 0;
    let gearBuffSpeed = activeGearBuff ? activeGearBuff.speedMult : 0;
    let buffSpeed = activeBuff ? activeBuff.speedMult : 1.0;
    let totalSpeed = Math.min(0.9, gearSpeed + gearBuffSpeed);
    let delay = baseAutoDelay * (1.0 - totalSpeed) / buffSpeed;
    return Math.max(30, delay);
}

function updateStatsDisplay() {
    let effectiveLuck = getEffectiveLuck();
    let statusTag = "";
    if (oneShotLuckMult > 0) statusTag += " [⚡1회]";
    if (activeGearBuff) statusTag += " [🔥버프]";

    if (luckMultEl) {
        luckMultEl.innerText = `${effectiveLuck.toFixed(1)}x${statusTag}`;
        luckMultEl.style.color = activeGearBuff ? "#ff0055" : (oneShotLuckMult > 0 ? "#ff00ff" : (activeBuff ? "#ffaa00" : "#00ffcc"));
    }
    if (equippedGearEl) {
        equippedGearEl.innerText = equippedGear && GEARS[equippedGear] ? GEARS[equippedGear].name : "없음";
    }
}

function triggerGearSkillBuff(luckMult, speedMult, duration, isOneShot = false) {
    if (activeGearBuff && activeGearBuff.timerId) clearInterval(activeGearBuff.timerId);
    activeGearBuff = { luckMult, speedMult, timeRemaining: duration, isOneShot };
    updateStatsDisplay();

    if (!isOneShot && duration > 0) {
        activeGearBuff.timerId = setInterval(() => {
            activeGearBuff.timeRemaining--;
            if (activeGearBuff.timeRemaining <= 0) {
                clearInterval(activeGearBuff.timerId);
                activeGearBuff = null;
                updateStatsDisplay();
            }
        }, 1000);
    }
}

function processGearSkillOnRoll() {
    if (!equippedGear) return;
    gearRollCounter++;

    if (equippedGear === 'FrostRing' && gearRollCounter % 10 === 0) triggerGearSkillBuff(0, 0.4, 5);
    else if (equippedGear === 'MagneticGauntlet' && gearRollCounter % 15 === 0) triggerGearSkillBuff(1.5, 0, 10);
    else if (equippedGear === 'DemonScythe' && gearRollCounter % 20 === 0) triggerGearSkillBuff(3.0, 0, 0, true);
    else if (equippedGear === 'CelestialCrown' && gearRollCounter % 30 === 0) triggerGearSkillBuff(5.0, 0.3, 10);
}

function roll() {
    tryPlayMusic();
    if (isRolling) return;
    isRolling = true;
    if (rollBtn) rollBtn.disabled = true;

    totalRolls++;
    if (totalRollsEl) totalRollsEl.innerText = totalRolls.toLocaleString();
    processGearSkillOnRoll();

    let rollCount = 0;
    const rollInterval = setInterval(() => {
        const tempAura = AURAS[Math.floor(Math.random() * 6)];
        if (auraNameEl) {
            auraNameEl.innerText = tempAura.name;
            auraNameEl.style.color = tempAura.color;
        }
        if (auraRarityEl) auraRarityEl.innerText = `1 / ${tempAura.chance.toLocaleString()}`;
        rollCount++;

        if (rollCount > 7) {
            clearInterval(rollInterval);
            finalizeRoll();
        }
    }, 45);
}

function finalizeRoll() {
    let selectedAura = AURAS[0];
    let luck = getEffectiveLuck();

    for (let i = AURAS.length - 1; i >= 0; i--) {
        if (AURAS[i].craftOnly) continue;
        const effectiveChance = AURAS[i].chance / luck;
        if (Math.random() < (1 / effectiveChance)) {
            selectedAura = AURAS[i];
            break;
        }
    }

    if (oneShotLuckMult > 0) oneShotLuckMult = 0;
    if (activeGearBuff && activeGearBuff.isOneShot) activeGearBuff = null;
    updateStatsDisplay();

    const earnedGold = Math.max(1, Math.floor(Math.log2(selectedAura.chance)));
    gold += earnedGold;
    if (goldValEl) goldValEl.innerText = gold.toLocaleString();

    if (auraNameEl) {
        auraNameEl.innerText = selectedAura.name;
        auraNameEl.style.color = selectedAura.color;
        auraNameEl.style.transform = "scale(1.2)";
        setTimeout(() => auraNameEl.style.transform = "scale(1)", 150);
    }
    if (auraRarityEl) auraRarityEl.innerText = `1 / ${selectedAura.chance.toLocaleString()}`;

    currentAura = selectedAura;
    lastRolledAura = selectedAura;
    if (avatar) {
        avatar.style.backgroundColor = selectedAura.color;
        avatar.style.boxShadow = `0 0 35px ${selectedAura.color}`;
    }

    inventory[selectedAura.name] = (inventory[selectedAura.name] || 0) + 1;

    if (selectedAura.chance > bestChance) {
        bestChance = selectedAura.chance;
        bestName = selectedAura.name;
        if (bestRollEl) {
            bestRollEl.innerText = `${bestName} (1/${bestChance.toLocaleString()})`;
            bestRollEl.style.color = selectedAura.color;
        }

        // online.js 연동 랭킹 업로드 호출
        if (typeof uploadLeaderboard === 'function') {
            uploadLeaderboard(bestName, bestChance);
        }
    }

    saveData();

    setTimeout(() => {
        isRolling = false;
        if (rollBtn) rollBtn.disabled = false;
        if (isAuto) setTimeout(roll, getEffectiveDelay());
    }, 250);
}

function inspectAura(auraName) {
    const foundAura = AURAS.find(a => a.name === auraName);
    if (!foundAura) return;

    currentAura = foundAura;
    if (auraNameEl) {
        auraNameEl.innerText = foundAura.name;
        auraNameEl.style.color = foundAura.color;
    }
    if (auraRarityEl) auraRarityEl.innerText = `1 / ${foundAura.chance.toLocaleString()} (관전 모드)`;
    if (avatar) {
        avatar.style.backgroundColor = foundAura.color;
        avatar.style.boxShadow = `0 0 35px ${foundAura.color}`;
    }

    if (invModal) invModal.style.display = 'none';
    if (normalPanel) normalPanel.style.display = 'none';
    if (inspectPanel) inspectPanel.style.display = 'flex';
}

if (exitInspectBtn) {
    exitInspectBtn.addEventListener('click', () => {
        currentAura = lastRolledAura;
        if (auraNameEl) {
            auraNameEl.innerText = lastRolledAura.name;
            auraNameEl.style.color = lastRolledAura.color;
        }
        if (auraRarityEl) auraRarityEl.innerText = `1 / ${lastRolledAura.chance.toLocaleString()}`;
        if (avatar) {
            avatar.style.backgroundColor = lastRolledAura.color;
            avatar.style.boxShadow = `0 0 35px ${lastRolledAura.color}`;
        }

        if (inspectPanel) inspectPanel.style.display = 'none';
        if (normalPanel) normalPanel.style.display = 'flex';
    });
}

function renderInventoryList() {
    const listEl = document.getElementById('inv-list');
    if (!listEl) return;
    listEl.innerHTML = '';
    AURAS.forEach(a => {
        const count = inventory[a.name] || 0;
        const row = document.createElement('div');
        row.className = 'item-row';
        
        const viewBtnHtml = count > 0 
            ? `<button class="view-btn" onclick="inspectAura('${a.name}')">👁️ 구경</button>` 
            : `<span style="color:#666; font-size:12px;">미해금</span>`;

        const tagText = a.craftOnly ? " [조합 전용]" : "";

        row.innerHTML = `
            <div>
                <span style="color:${a.color}; font-weight:bold;">${a.name}${tagText} (1/${a.chance.toLocaleString()})</span>
                <div style="font-size:12px; color:#aaa;">보유: ${count}개</div>
            </div>
            ${viewBtnHtml}
        `;
        listEl.appendChild(row);
    });
}

function renderGearList() {
    const listEl = document.getElementById('gear-list');
    if (!listEl) return;
    listEl.innerHTML = '';

    Object.keys(GEARS).forEach(key => {
        const gear = GEARS[key];
        const isOwned = gearInventory[key];
        const isEquipped = equippedGear === key;

        const row = document.createElement('div');
        row.className = 'craft-card';

        let btnHtml = '';
        if (isEquipped) {
            btnHtml = `<button class="sub-btn active" onclick="unequipGear()">장착 해제</button>`;
        } else if (isOwned) {
            btnHtml = `<button class="sub-btn" onclick="equipGear('${key}')">장착</button>`;
        } else {
            btnHtml = `<span style="color:#666; font-size:12px;">미보유</span>`;
        }

        row.innerHTML = `
            <div class="craft-info">
                <strong>${gear.name}</strong>
                <span class="craft-req">${gear.desc}</span>
            </div>
            ${btnHtml}
        `;
        listEl.appendChild(row);
    });
}

function equipGear(key) {
    equippedGear = key;
    gearRollCounter = 0;
    if (activeGearBuff && activeGearBuff.timerId) clearInterval(activeGearBuff.timerId);
    activeGearBuff = null;

    updateStatsDisplay();
    renderGearList();
    saveData();
}

function unequipGear() {
    equippedGear = null;
    gearRollCounter = 0;
    if (activeGearBuff && activeGearBuff.timerId) clearInterval(activeGearBuff.timerId);
    activeGearBuff = null;

    updateStatsDisplay();
    renderGearList();
    saveData();
}

let angleTick = 0;
function renderCanvas() {
    if (!ctx) return;
    ctx.clearRect(0, 0, 500, 500);
    const centerX = 250, centerY = 250;
    angleTick += 0.03;

    const color = currentAura.color;
    const effect = currentAura.effect;

    const grad = ctx.createRadialGradient(centerX, centerY, 20, centerX, centerY, 180);
    grad.addColorStop(0, color + 'aa');
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 180, 0, Math.PI * 2);
    ctx.fill();

    if (enableParticles) {
        if (effect === 'fireFlame' || effect === 'demonHellfire' || effect === 'darkBloodPillar') {
            if (Math.random() < 0.6) {
                particles.push({
                    x: centerX + (Math.random() - 0.5) * 80, y: centerY + 40,
                    vx: (Math.random() - 0.5) * 2, vy: -Math.random() * 4 - 2,
                    size: Math.random() * 8 + 4, life: 1, color
                });
            }
        } else if (effect === 'swirlVortex' || effect === 'cosmicRings' || effect === 'rainbowPrism') {
            ctx.strokeStyle = color; ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(centerX, centerY, 90 + Math.sin(angleTick) * 10, angleTick, angleTick + Math.PI * 1.5);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(centerX, centerY, 130 + Math.cos(angleTick) * 10, -angleTick, -angleTick + Math.PI * 1.2);
            ctx.stroke();
        } else if (effect === 'cyberGlitch' || effect === 'pixelNoise') {
            if (Math.random() < 0.4) {
                ctx.fillStyle = Math.random() < 0.5 ? '#00ff66' : '#ff00ff';
                ctx.fillRect(centerX + (Math.random() - 0.5) * 200, centerY + (Math.random() - 0.5) * 200, Math.random() * 20 + 5, 4);
            }
        } else if (effect === 'lightningSpark' || effect === 'absoluteRedStorm') {
            ctx.strokeStyle = color; ctx.lineWidth = 2;
            for (let i = 0; i < 3; i++) {
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(centerX + (Math.random() - 0.5) * 240, centerY + (Math.random() - 0.5) * 240);
                ctx.stroke();
            }
        } else if (effect === 'galaxyBigBang' || effect === 'whiteGodLight' || effect === 'blackHole') {
            ctx.strokeStyle = color; ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(centerX, centerY, 150 + Math.sin(angleTick * 2) * 20, 0, Math.PI * 2);
            ctx.stroke();
        }

        if (Math.random() < 0.3) {
            particles.push({
                x: centerX + Math.cos(angleTick * 2) * 100, y: centerY + Math.sin(angleTick * 2) * 100,
                vx: (Math.random() - 0.5) * 2, vy: (Math.random() - 0.5) * 2,
                size: Math.random() * 6 + 3, life: 1, color
            });
        }

        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx; p.y += p.vy; p.life -= 0.02;
            ctx.fillStyle = p.color;
            ctx.globalAlpha = Math.max(0, p.life);
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            if (p.life <= 0) particles.splice(i, 1);
        }
        ctx.globalAlpha = 1.0;
    }

    requestAnimationFrame(renderCanvas);
}

function applyBuff(luckMult, speedMult, duration) {
    if (activeBuff && activeBuff.timerId) clearInterval(activeBuff.timerId);
    activeBuff = { luckMult, speedMult, timeRemaining: duration };
    updateStatsDisplay();

    activeBuff.timerId = setInterval(() => {
        activeBuff.timeRemaining--;
        if (activeBuff.timeRemaining <= 0) {
            clearInterval(activeBuff.timerId);
            activeBuff = null;
            updateStatsDisplay();
        }
    }, 1000);
}

function buyPotion(type) {
    if (type === 'small') {
        if (gold < 100) { alert('골드가 부족합니다!'); return; }
        gold -= 100; if (goldValEl) goldValEl.innerText = gold.toLocaleString();
        applyBuff(1.5, 1.0, 30);
    } else if (type === 'speed_small') {
        if (gold < 300) { alert('골드가 부족합니다!'); return; }
        gold -= 300; if (goldValEl) goldValEl.innerText = gold.toLocaleString();
        applyBuff(1.0, 2.0, 20);
    } else if (type === 'one_shot_small') {
        if (gold < 500) { alert('골드가 부족합니다!'); return; }
        gold -= 500; if (goldValEl) goldValEl.innerText = gold.toLocaleString();
        oneShotLuckMult += 10;
        updateStatsDisplay();
    }
    saveData();
}

function craftPotion(type) {
    if (type === 'large') {
        if (!(inventory['Rare'] >= 1)) { alert('재료 부족!'); return; }
        inventory['Rare']--;
        applyBuff(3.0, 1.0, 40);
    } else if (type === 'one_shot_large') {
        if (!(inventory['Precious'] >= 1) || !(inventory['Sidereum'] >= 1)) { alert('재료 부족!'); return; }
        inventory['Precious']--; inventory['Sidereum']--;
        oneShotLuckMult += 50;
        updateStatsDisplay();
    } else if (type === 'one_shot_god') {
        if (!(inventory['Diaboli'] >= 1) || !(inventory['Ether Essence'] >= 1)) { alert('재료 부족!'); return; }
        inventory['Diaboli']--; inventory['Ether Essence']--;
        oneShotLuckMult += 200;
        updateStatsDisplay();
    } else if (type === 'hyper') {
        if (!(inventory['Diaboli'] >= 1)) { alert('재료 부족!'); return; }
        inventory['Diaboli']--;
        applyBuff(10.0, 1.0, 20);
    }
    saveData();
}

function craftGear(key) {
    if (key === 'LuckGlove') {
        if (!(inventory['Rare'] >= 5)) { alert('재료가 부족합니다! (Rare 5개)'); return; }
        inventory['Rare'] -= 5; gearInventory[key] = true;
        alert('🛡️ Luck Glove 제작 완료!');
    } else if (key === 'SpeedDevice') {
        if (!(inventory['Precious'] >= 3)) { alert('재료가 부족합니다! (Precious 3개)'); return; }
        inventory['Precious'] -= 3; gearInventory[key] = true;
        alert('🛡️ Speed Device 제작 완료!');
    } else if (key === 'JackpotGauntlet') {
        if (!(inventory['Sidereum'] >= 5) || !(inventory['Gilded'] >= 5)) { alert('재료가 부족합니다! (Sidereum 5개 + Gilded 5개)'); return; }
        inventory['Sidereum'] -= 5; inventory['Gilded'] -= 5; gearInventory[key] = true;
        alert('🛡️ Jackpot Gauntlet 제작 완료!');
    } else if (key === 'FrostRing') {
        if (!(inventory['Glacier Alloy'] >= 1) || !(inventory['Glacier'] >= 10)) { alert('재료가 부족합니다! (Glacier Alloy 1개 + Glacier 10개)'); return; }
        inventory['Glacier Alloy'] -= 1; inventory['Glacier'] -= 10; gearInventory[key] = true;
        alert('🛡️ Frost Ring 제작 완료!');
    } else if (key === 'MagneticGauntlet') {
        if (!(inventory['Magnet Core'] >= 1) || !(inventory['Magnetic'] >= 15)) { alert('재료가 부족합니다! (Magnet Core 1개 + Magnetic 15개)'); return; }
        inventory['Magnet Core'] -= 1; inventory['Magnetic'] -= 15; gearInventory[key] = true;
        alert('🛡️ Magnetic Gauntlet 제작 완료!');
    } else if (key === 'ExoflexDevice') {
        if (!(inventory['Clockwork Core'] >= 1) || !(inventory['Powered'] >= 100)) { alert('재료가 부족합니다! (Clockwork Core 1개 + Powered 100개)'); return; }
        inventory['Clockwork Core'] -= 1; inventory['Powered'] -= 100; gearInventory[key] = true;
        alert('🛡️ Exoflex Device 제작 완료!');
    } else if (key === 'DemonScythe') {
        if (!(inventory['Demon Ember'] >= 1) || !(inventory['Diaboli'] >= 10)) { alert('재료가 부족합니다! (Demon Ember 1개 + Diaboli 10개)'); return; }
        inventory['Demon Ember'] -= 1; inventory['Diaboli'] -= 10; gearInventory[key] = true;
        alert('🛡️ Demon Scythe 제작 완료!');
    } else if (key === 'CelestialCrown') {
        if (!(inventory['Celestial Dust'] >= 1) || !(inventory['Cosmic Feather'] >= 1)) { alert('재료가 부족합니다! (Celestial Dust 1개 + Cosmic Feather 1개)'); return; }
        inventory['Celestial Dust'] -= 1; inventory['Cosmic Feather'] -= 1; gearInventory[key] = true;
        alert('🛡️ Celestial Crown 제작 완료!');
    }
    saveData();
}

function switchCraftTab(tabName) {
    const potionTabBtn = document.getElementById('tab-potion-btn');
    const gearTabBtn = document.getElementById('tab-gear-btn');
    const auraTabBtn = document.getElementById('tab-aura-btn');
    
    const potionSection = document.getElementById('craft-potion-section');
    const gearSection = document.getElementById('craft-gear-section');
    const auraSection = document.getElementById('craft-aura-section');

    if (potionTabBtn) potionTabBtn.classList.remove('active');
    if (gearTabBtn) gearTabBtn.classList.remove('active');
    if (auraTabBtn) auraTabBtn.classList.remove('active');

    if (potionSection) potionSection.style.display = 'none';
    if (gearSection) gearSection.style.display = 'none';
    if (auraSection) auraSection.style.display = 'none';

    if (tabName === 'potion') {
        if (potionTabBtn) potionTabBtn.classList.add('active');
        if (potionSection) potionSection.style.display = 'block';
    } else if (tabName === 'gear') {
        if (gearTabBtn) gearTabBtn.classList.add('active');
        if (gearSection) gearSection.style.display = 'block';
    } else {
        if (auraTabBtn) auraTabBtn.classList.add('active');
        if (auraSection) auraSection.style.display = 'block';
    }
}

function craftAura(key) {
    if (key === 'AETHER') {
        if (!(inventory['Ether Essence'] >= 1) || !(inventory['Crystallized'] >= 5)) {
            alert('재료가 부족합니다! (Ether Essence 1개 + Crystallized 5개)'); return;
        }
        inventory['Ether Essence'] -= 1; inventory['Crystallized'] -= 5;
        inventory['AETHER'] = (inventory['AETHER'] || 0) + 1;
        alert('✨ AETHER 제작 성공!');
    } else if (key === 'CHROMA') {
        if (!(inventory['Prism Fragment'] >= 1) || !(inventory['Precious'] >= 10)) {
            alert('재료가 부족합니다! (Prism Fragment 1개 + Precious 10개)'); return;
        }
        inventory['Prism Fragment'] -= 1; inventory['Precious'] -= 10;
        inventory['CHROMA'] = (inventory['CHROMA'] || 0) + 1;
        alert('✨ CHROMA 제작 성공!');
    } else if (key === 'HYPERION') {
        if (!(inventory['Solar Core'] >= 1) || !(inventory['Sidereum'] >= 20)) {
            alert('재료가 부족합니다! (Solar Core 1개 + Sidereum 20개)'); return;
        }
        inventory['Solar Core'] -= 1; inventory['Sidereum'] -= 20;
        inventory['HYPERION'] = (inventory['HYPERION'] || 0) + 1;
        alert('✨ HYPERION 제작 성공!');
    } else if (key === 'MatrixSteampunk') {
        if (!(inventory['Matrix'] >= 1) || !(inventory['Clockwork Core'] >= 1) || !(inventory['Powered'] >= 500)) { 
            alert('재료가 부족합니다! (Matrix 1개 + Clockwork Core 1개 + Powered 500개)'); return; 
        }
        inventory['Matrix'] -= 1; inventory['Clockwork Core'] -= 1; inventory['Powered'] -= 500;
        inventory['Matrix : Steampunk'] = (inventory['Matrix : Steampunk'] || 0) + 1;
        alert('✨ Matrix : Steampunk 제작 성공!');
    } else if (key === 'AbyssalAwakened') {
        if (!(inventory['AbyssalHunter'] >= 1) || !(inventory['Abyss Orb'] >= 1) || !(inventory['Crystallized'] >= 100)) { 
            alert('재료가 부족합니다! (AbyssalHunter 1개 + Abyss Orb 1개 + Crystallized 100개)'); return; 
        }
        inventory['AbyssalHunter'] -= 1; inventory['Abyss Orb'] -= 1; inventory['Crystallized'] -= 100;
        inventory['AbyssalHunter : Awakened'] = (inventory['AbyssalHunter : Awakened'] || 0) + 1;
        alert('✨ AbyssalHunter : Awakened 제작 성공!');
    } else if (key === 'ATLAS') {
        if (!(inventory['Atlas'] >= 1) || !(inventory['Titan Relic'] >= 1) || !(inventory['Magnetic'] >= 50)) { 
            alert('재료가 부족합니다! (Atlas 1개 + Titan Relic 1개 + Magnetic 50개)'); return; 
        }
        inventory['Atlas'] -= 1; inventory['Titan Relic'] -= 1; inventory['Magnetic'] -= 50;
        inventory['A.T.L.A.S.'] = (inventory['A.T.L.A.S.'] || 0) + 1;
        alert('✨ A.T.L.A.S. 제작 성공!');
    } else if (key === 'SolarisOverdrive') {
        if (!(inventory['Solaris'] >= 1) || !(inventory['Flame Spark'] >= 1) || !(inventory['Rage'] >= 150)) {
            alert('재료가 부족합니다! (Solaris 1개 + Flame Spark 1개 + Rage 150개)'); return;
        }
        inventory['Solaris'] -= 1; inventory['Flame Spark'] -= 1; inventory['Rage'] -= 150;
        inventory['SOLARIS : Overdrive'] = (inventory['SOLARIS : Overdrive'] || 0) + 1;
        alert('✨ SOLARIS : Overdrive 제작 성공!');
    } else if (key === 'EclipseVoid') {
        if (!(inventory['Eclipse'] >= 1) || !(inventory['Void Crystal'] >= 1) || !(inventory['Diaboli'] >= 30)) {
            alert('재료가 부족합니다! (Eclipse 1개 + Void Crystal 1개 + Diaboli 30개)'); return;
        }
        inventory['Eclipse'] -= 1; inventory['Void Crystal'] -= 1; inventory['Diaboli'] -= 30;
        inventory['ECLIPSE : Void'] = (inventory['ECLIPSE : Void'] || 0) + 1;
        alert('✨ ECLIPSE : Void 제작 성공!');
    } else if (key === 'GlitchUnstable') {
        if (!(inventory['Glitch'] >= 1) || !(inventory['Cyber Chip'] >= 1) || !(inventory['Powered'] >= 500)) {
            alert('재료가 부족합니다! (Glitch 1개 + Cyber Chip 1개 + Powered 500개)'); return;
        }
        inventory['Glitch'] -= 1; inventory['Cyber Chip'] -= 1; inventory['Powered'] -= 500;
        inventory['GLITCH : Unstable'] = (inventory['GLITCH : Unstable'] || 0) + 1;
        alert('✨ GLITCH : Unstable 제작 성공!');
    } else if (key === 'CelestialZenith') {
        if (!(inventory['Celestial'] >= 1) || !(inventory['Cosmic Feather'] >= 1) || !(inventory['Quartz'] >= 100)) {
            alert('재료가 부족합니다! (Celestial 1개 + Cosmic Feather 1개 + Quartz 100개)'); return;
        }
        inventory['Celestial'] -= 1; inventory['Cosmic Feather'] -= 1; inventory['Quartz'] -= 100;
        inventory['CELESTIAL : Zenith'] = (inventory['CELESTIAL : Zenith'] || 0) + 1;
        alert('✨ CELESTIAL : Zenith 제작 성공!');
    } else if (key === 'RolandInfinity') {
        if (!(inventory['Roland: Absolute'] >= 1) || !(inventory['Crimson Crest'] >= 1)) {
            alert('재료가 부족합니다! (Roland: Absolute 1개 + Crimson Crest 1개)'); return;
        }
        inventory['Roland: Absolute'] -= 1; inventory['Crimson Crest'] -= 1;
        inventory['ROLAND : Infinity'] = (inventory['ROLAND : Infinity'] || 0) + 1;
        alert('✨ ROLAND : Infinity 제작 성공!');
    } else if (key === 'CreationPrime') {
        if (!(inventory['Creation'] >= 1) || !(inventory['Genesis Heart'] >= 1) || !(inventory['BOUNDLESS'] >= 50)) {
            alert('재료가 부족합니다! (Creation 1개 + Genesis Heart 1개 + BOUNDLESS 50개)'); return;
        }
        inventory['Creation'] -= 1; inventory['Genesis Heart'] -= 1; inventory['BOUNDLESS'] -= 50;
        inventory['CREATION : Prime'] = (inventory['CREATION : Prime'] || 0) + 1;
        alert('✨ CREATION : Prime 제작 성공!');
    }

    saveData();
}

if (rollBtn) rollBtn.addEventListener('click', roll);
window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !isRolling && document.activeElement.tagName !== 'BUTTON') roll();
});

if (autoBtn) {
    autoBtn.addEventListener('click', () => {
        tryPlayMusic();
        isAuto = !isAuto;
        if (isAuto) {
            autoBtn.innerText = "Auto: ON"; autoBtn.classList.add('active');
            if (!isRolling) roll();
        } else {
            autoBtn.innerText = "Auto: OFF"; autoBtn.classList.remove('active');
        }
    });
}

loadData();
renderCanvas();
