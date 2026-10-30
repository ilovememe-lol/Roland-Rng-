const AURAS = [
    // [기본 아우라 그룹]
    { name: "Common", chance: 2, color: "#a0a0a0", effect: "dust" },
    { name: "Uncommon", chance: 4, color: "#55ff55", effect: "leaf" },
    { name: "Good", chance: 5, color: "#55ffff", effect: "sparkle" },
    { name: "Natural", chance: 8, color: "#88ff88", effect: "floatCircle" },
    { name: "Rare", chance: 16, color: "#5555ff", effect: "orbitDots" },
    { name: "Crystallized", chance: 64, color: "#00ffff", effect: "crystalShard" },
    { name: "Rage", chance: 128, color: "#ff3333", effect: "fireFlame" },
    
    // [커스텀 및 1,000 ~ 10,000대 아우라]
    { name: "Beats", chance: 4000, color: "#2bff00", effect: ["spinning", "timeClock", "blackHolePull", "sparkle", "swirlVortex", "voidNebula", "blackHole", "shadowEclipse", "cosmicRings", "absoluteRedStorm", "galaxyBigBang"] },
    { name: "Glacier", chance: 1024, color: "#aaffff", effect: ["snowBurst", "spinning"] },
    { name: "Precious", chance: 1024, color: "#00bfff", effect: ["rainbowPrism", "sparkle"] },
    { name: "Magnetic", chance: 2048, color: "#ff3300", effect: ["swirlVortex", "electricShield"] },
    { name: "Sidereum", chance: 4096, color: "#ffd700", effect: ["goldRune", "timeClock"] },
    { name: "Gilded", chance: 5000, color: "#ffd700", effect: ["goldenBeam", "goldRune"] },
    { name: "Quartz", chance: 8192, color: "#ff69b4", effect: ["crystalShard", "dnaHelix"] },
    { name: "Diaboli", chance: 10000, color: "#990000", effect: ["demonHellfire", "chaosPortal"] },
    { name: "Powered", chance: 16384, color: "#ffffff", effect: ["lightningSpark", "electricShield"] },
    { name: "BOUNDLESS", chance: 120000, color: "#da70d6", effect: ["voidNebula", "blackHolePull"] },

    // [중간 재료 아우라]
    { name: "Glacier Alloy", chance: 3000, color: "#aaffff", effect: "snowBurst" },
    { name: "Magnet Core", chance: 8000, color: "#ff3300", effect: ["swirlVortex", "spinning"] },
    { name: "Age Of Golden", chance: 12000, color: "#fbff00", effect: ["dust", "sparkle", "crystalShard"] },
    { name: "Demon Ember", chance: 35000, color: "#990000", effect: "demonHellfire" },
    { name: "Celestial Dust", chance: 500000, color: "#ffff00", effect: ["cosmicRings", "starShower"] },

    // [상위 및 최상위 아우라]
    { name: "Ether Essence", chance: 5000, color: "#00ffaa", effect: "swirlVortex" },
    { name: "Prism Fragment", chance: 25000, color: "#ff00ff", effect: "rainbowPrism" },
    { name: "Solar Core", chance: 100000, color: "#ffcc00", effect: ["solarCrown", "goldenBeam", "sacredRays"] },
    { name: "Clockwork Core", chance: 500000, color: "#e0e0e0", effect: ["pixelNoise", "timeClock"] },
    { name: "Flame Spark", chance: 1200000, color: "#ff4500", effect: ["sunExplosion", "fireFlame"] },
    { name: "Abyss Orb", chance: 2500000, color: "#00ffff", effect: ["blackHole", "blackHolePull"] },
    { name: "Void Crystal", chance: 5000000, color: "#4b0082", effect: ["shadowEclipse", "hexShield"] },
    { name: "Cyber Chip", chance: 8000000, color: "#00ff66", effect: ["cyberGlitch", "electricShield"] },
    { name: "Cosmic Feather", chance: 15000000, color: "#ffff00", effect: ["cosmicRings", "starShower"] },
    { name: "Titan Relic", chance: 25000000, color: "#ff0055", effect: ["darkBloodPillar", "demonHellfire", "chaosPortal"] },
    { name: "Crimson Crest", chance: 50000000, color: "#ff0000", effect: ["absoluteRedStorm", "meteorFall"] },
    { name: "Genesis Heart", chance: 100000000, color: "#ffffff", effect: ["galaxyBigBang", "rainbowPrism", "sacredRays"] },

    { name: "Glitch", chance: 250000, color: "#00ff66", effect: ["cyberGlitch", "pixelNoise"] },
    { name: "Celestial", chance: 500000, color: "#00bfff", effect: ["cosmicRings", "starShower"] },
    { name: "Solaris", chance: 7500000, color: "#ff8c00", effect: ["solarCrown", "sunExplosion"] },
    { name: "Eclipse", chance: 40000000, color: "#4b0082", effect: ["shadowEclipse", "blackHolePull"] },
    { name: "Matrix", chance: 50000000, color: "#00ff66", effect: ["cyberGlitch", "hexShield"] },
    { name: "AbyssalHunter", chance: 100000000, color: "#00ffff", effect: ["blackHole", "darkBloodPillar"] },
    { name: "Roland: Absolute", chance: 100000000, color: "#ff0000", effect: ["absoluteRedStorm", "lightningSpark", "sacredRays"] },
    { name: "Atlas", chance: 360000000, color: "#ffcc00", effect: ["goldenBeam", "cosmicRings", "timeClock"] },
    { name: "Creation", chance: 1000000000, color: "#00ffff", effect: ["galaxyBigBang", "rainbowPrism", "goldenBeam", "spinning"] },
    
    // [조합 전용 아우라 그룹]
    { name: "AETHER", chance: 15000, color: "#00ffaa", effect: "swirlVortex", craftOnly: true },
    { name: "CHROMA", chance: 80000, color: "#ff00ff", effect: ["rainbowPrism", "sparkle"], craftOnly: true },
    { name: "HYPERION", chance: 500000, color: "#ffcc00", effect: ["goldenBeam", "sacredRays"], craftOnly: true },
    { name: "Matrix : Steampunk", chance: 150000000, color: "#e0e0e0", effect: ["pixelNoise", "cyberGlitch", "timeClock"], craftOnly: true },
    { name: "SOLARIS : Overdrive", chance: 250000000, color: "#ff4500", effect: ["sunExplosion", "solarCrown", "spinning"], craftOnly: true },
    { name: "AbyssalHunter : Awakened", chance: 400000000, color: "#00ffff", effect: ["blackHole", "blackHolePull", "swirlVortex"], craftOnly: true },
    { name: "ECLIPSE : Void", chance: 500000000, color: "#4b0082", effect: ["shadowEclipse", "darkBloodPillar", "hexShield"], craftOnly: true },
    { name: "GLITCH : Unstable", chance: 800000000, color: "#00ff66", effect: ["cyberGlitch", "electricShield", "lightningSpark"], craftOnly: true },
    { name: "A.T.L.A.S.", chance: 1000000000, color: "#ff0055", effect: ["darkBloodPillar", "goldenBeam", "timeClock"], craftOnly: true },
    { name: "CELESTIAL : Zenith", chance: 1200000000, color: "#ffff00", effect: ["cosmicRings", "rainbowPrism", "starShower"], craftOnly: true },
    { name: "ROLAND : Infinity", chance: 2000000000, color: "#ff0000", effect: ["absoluteRedStorm", "demonHellfire", "meteorFall"], craftOnly: true },
    { name: "CREATION : Prime", chance: 5000000000, color: "#ffffff", effect: ["galaxyBigBang", "rainbowPrism", "goldenBeam", "spinning", "sacredRays"], craftOnly: true }
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
let isInspecting = false; // ★ 관전 모드 상태 플래그
let equippedGear = null, activeBuff = null, oneShotLuckMult = 0;
let gearRollCounter = 0, activeGearBuff = null;
let enableParticles = true, lastRolledAura = AURAS[0];

const inventory = {}, gearInventory = {};

// UI 엘리먼트
const auraNameEl = document.getElementById('aura-name');
const auraRarityEl = document.getElementById('aura-rarity');
const totalRollsEl = document.getElementById('total-rolls');
const goldValEl = document.getElementById('gold-val');
const luckMultEl = document.getElementById('luck-mult');
const equippedGearEl = document.getElementById('equipped-gear');
const bestRollEl = document.getElementById('best-roll');
const avatar = document.getElementById('character-avatar');
const rollBtn = document.getElementById('roll-btn');
const autoBtn = document.getElementById('auto-btn');

const bgmPlayer = document.getElementById('bgm-player');
const bgmSlider = document.getElementById('bgm-volume');
const canvas = document.getElementById('auraCanvas');
const ctx = canvas ? canvas.getContext('2d') : null;
const particles = [];
let currentAura = AURAS[0];

// UI 제어 함수
window.toggleSidebar = function() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar) sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('active');
};

window.openModal = function(id) {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('active');

    const modal = document.getElementById(id);
    if (modal) modal.style.display = 'flex';

    if (id === 'inv-modal') renderInventoryList();
    if (id === 'gear-modal') renderGearList();
};

window.closeModal = function(id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = 'none';
};

window.toggleFullscreen = function() {
    window.toggleSidebar();
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
    } else {
        if (document.exitFullscreen) document.exitFullscreen();
    }
};

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
    // 관전 모드 중에는 롤링을 진행하지 않음
    if (isInspecting) return;
    
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
    }

    saveData();

    setTimeout(() => {
        isRolling = false;
        if (rollBtn) rollBtn.disabled = false;
        // 오토 롤 중이더라도 관전 모드로 전환되었으면 다음 롤 중단
        if (isAuto && !isInspecting) setTimeout(roll, getEffectiveDelay());
    }, 250);
}

function inspectAura(auraName) {
    const foundAura = AURAS.find(a => a.name === auraName);
    if (!foundAura) return;

    isInspecting = true; // 관전 상태 ON
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

    closeModal('inv-modal');
    document.getElementById('normal-panel').style.display = 'none';
    document.getElementById('inspect-panel').style.display = 'flex';
}

const exitInspectBtn = document.getElementById('exit-inspect-btn');
if (exitInspectBtn) {
    exitInspectBtn.addEventListener('click', () => {
        isInspecting = false; // 관전 상태 OFF
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

        document.getElementById('inspect-panel').style.display = 'none';
        document.getElementById('normal-panel').style.display = 'flex';

        // 관전 종료 후 오토가 켜져 있으면 롤 재개
        if (isAuto && !isRolling) roll();
    });
}

function renderInventoryList() {
    const listEl = document.getElementById('inv-list');
    if (!listEl) return;
    listEl.innerHTML = '';
    AURAS.forEach(a => {
        const count = inventory[a.name] || 0;
        const isUnlocked = count > 0;
        const row = document.createElement('div');
        row.className = 'item-row';
        
        // ★ 미해금 아우라 ??? 처리 로직
        const displayName = isUnlocked ? a.name : "???";
        const displayColor = isUnlocked ? a.color : "#555555";
        const displayCountText = isUnlocked ? `보유: ${count}개` : "미해금";

        const viewBtnHtml = isUnlocked 
            ? `<button class="view-btn" onclick="inspectAura('${a.name}')">👁️ 구경</button>` 
            : `<span style="color:#555; font-size:12px;">🔒 미해금</span>`;

        const tagText = (a.craftOnly && isUnlocked) ? " [조합 전용]" : "";

        row.innerHTML = `
            <div>
                <span style="color:${displayColor}; font-weight:bold;">${displayName}${tagText} (1/${a.chance.toLocaleString()})</span>
                <div style="font-size:12px; color:#aaa;">${displayCountText}</div>
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
    const effects = Array.isArray(currentAura.effect) ? currentAura.effect : [currentAura.effect];

    // 배경 글로우
    const grad = ctx.createRadialGradient(centerX, centerY, 20, centerX, centerY, 180);
    grad.addColorStop(0, color + 'aa');
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 180, 0, Math.PI * 2);
    ctx.fill();

    if (enableParticles) {
        effects.forEach(effect => {
            ctx.strokeStyle = color;
            ctx.fillStyle = color;

            if (effect === 'spinning') {
                ctx.lineWidth = 3;
                ctx.beginPath(); ctx.arc(centerX, centerY, 65, angleTick * 2, angleTick * 2 + Math.PI * 1.2); ctx.stroke();
                ctx.beginPath(); ctx.arc(centerX, centerY, 85, -angleTick * 2.5, -angleTick * 2.5 + Math.PI * 1.2); ctx.stroke();
            }
            else if (effect === 'blackHolePull') {
                ctx.lineWidth = 2.5;
                const r = (150 - (angleTick * 60) % 120);
                ctx.beginPath(); ctx.arc(centerX, centerY, Math.max(10, r), 0, Math.PI * 2); ctx.stroke();
            }
            else if (effect === 'dust' || effect === 'leaf' || effect === 'sparkle' || effect === 'floatCircle') {
                if (Math.random() < 0.3) {
                    const vy = effect === 'floatCircle' ? -1.5 : (Math.random() - 0.5) * 2;
                    particles.push({
                        x: centerX + (Math.random() - 0.5) * 180, y: centerY + (Math.random() - 0.5) * 180,
                        vx: (Math.random() - 0.5) * 2, vy: vy,
                        size: Math.random() * 5 + 2, life: 1, color: color
                    });
                }
            }
            else if (effect === 'orbitDots') {
                for (let i = 0; i < 4; i++) {
                    const a = angleTick * 2 + (Math.PI / 2) * i;
                    ctx.beginPath(); ctx.arc(centerX + Math.cos(a) * 90, centerY + Math.sin(a) * 90, 6, 0, Math.PI * 2); ctx.fill();
                }
            }
            else if (effect === 'crystalShard') {
                if (Math.random() < 0.3) {
                    const a = Math.random() * Math.PI * 2;
                    const r = Math.random() * 80 + 40;
                    particles.push({
                        x: centerX + Math.cos(a) * r, y: centerY + Math.sin(a) * r,
                        vx: Math.cos(a) * 0.5, vy: Math.sin(a) * 0.5,
                        size: Math.random() * 6 + 3, life: 0.8, color: color
                    });
                }
            }
            else if (effect === 'snowBurst') {
                if (Math.random() < 0.4) {
                    particles.push({
                        x: centerX + (Math.random() - 0.5) * 220, y: centerY - 120,
                        vx: (Math.random() - 0.5) * 1, vy: Math.random() * 2 + 1,
                        size: Math.random() * 4 + 2, life: 1, color: color
                    });
                }
            }
            else if (effect === 'goldRune') {
                ctx.lineWidth = 2;
                ctx.beginPath(); ctx.arc(centerX, centerY, 100, 0, Math.PI * 2); ctx.stroke();
                for (let i = 0; i < 6; i++) {
                    const a = (Math.PI * 2 / 6) * i - angleTick * 0.5;
                    ctx.beginPath(); ctx.arc(centerX + Math.cos(a) * 100, centerY + Math.sin(a) * 100, 5, 0, Math.PI * 2); ctx.fill();
                }
            }
            else if (effect === 'goldenBeam') {
                ctx.lineWidth = 15; ctx.globalAlpha = 0.3;
                ctx.beginPath(); ctx.moveTo(centerX - 40, 0); ctx.lineTo(centerX - 40, 500); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(centerX + 40, 0); ctx.lineTo(centerX + 40, 500); ctx.stroke();
                ctx.globalAlpha = 1.0;
            }
            else if (effect === 'lightningSpark' || effect === 'absoluteRedStorm') {
                ctx.lineWidth = 2.5;
                for (let i = 0; i < 4; i++) {
                    ctx.beginPath();
                    ctx.moveTo(centerX, centerY);
                    ctx.lineTo(centerX + (Math.random() - 0.5) * 260, centerY + (Math.random() - 0.5) * 260);
                    ctx.stroke();
                }
            }
            else if (effect === 'solarCrown') {
                ctx.lineWidth = 4;
                ctx.beginPath(); ctx.arc(centerX, centerY, 85, 0, Math.PI * 2); ctx.stroke();
                for (let i = 0; i < 12; i++) {
                    const a = (Math.PI * 2 / 12) * i + angleTick;
                    ctx.beginPath();
                    ctx.moveTo(centerX + Math.cos(a) * 85, centerY + Math.sin(a) * 85);
                    ctx.lineTo(centerX + Math.cos(a) * 110, centerY + Math.sin(a) * 110);
                    ctx.stroke();
                }
            }
            else if (effect === 'sunExplosion') {
                if (Math.random() < 0.6) {
                    const a = Math.random() * Math.PI * 2;
                    const spd = Math.random() * 5 + 2;
                    particles.push({
                        x: centerX, y: centerY,
                        vx: Math.cos(a) * spd, vy: Math.sin(a) * spd,
                        size: Math.random() * 7 + 3, life: 0.7, color: color
                    });
                }
            }
            else if (effect === 'voidNebula') {
                ctx.lineWidth = 3;
                ctx.beginPath(); ctx.arc(centerX, centerY, 70 + Math.sin(angleTick) * 15, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.arc(centerX, centerY, 120 + Math.cos(angleTick) * 15, 0, Math.PI * 2); ctx.stroke();
            }
            else if (effect === 'electricShield') {
                ctx.lineWidth = 2; ctx.beginPath();
                for (let i = 0; i < 8; i++) {
                    const a = (Math.PI * 2 / 8) * i + angleTick;
                    const r = 75 + (Math.random() - 0.5) * 12;
                    const x = centerX + Math.cos(a) * r;
                    const y = centerY + Math.sin(a) * r;
                    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
                }
                ctx.closePath(); ctx.stroke();
            }
            else if (effect === 'meteorFall') {
                if (Math.random() < 0.4) {
                    particles.push({
                        x: centerX + (Math.random() - 0.5) * 300, y: centerY - 200,
                        vx: -2, vy: Math.random() * 6 + 4, size: Math.random() * 5 + 3, life: 0.8, color: color
                    });
                }
            }
            else if (effect === 'dnaHelix') {
                for (let i = -80; i <= 80; i += 20) {
                    const y = centerY + i;
                    const x1 = centerX + Math.sin(angleTick * 2 + i * 0.05) * 45;
                    const x2 = centerX - Math.sin(angleTick * 2 + i * 0.05) * 45;
                    ctx.beginPath(); ctx.arc(x1, y, 5, 0, Math.PI * 2); ctx.fill();
                    ctx.beginPath(); ctx.arc(x2, y, 5, 0, Math.PI * 2); ctx.fill();
                }
            }
            else if (effect === 'timeClock') {
                ctx.lineWidth = 2.5;
                ctx.beginPath(); ctx.arc(centerX, centerY, 110, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(centerX, centerY);
                ctx.lineTo(centerX + Math.cos(angleTick) * 90, centerY + Math.sin(angleTick) * 90); ctx.stroke();
            }
            else if (effect === 'chaosPortal') {
                ctx.lineWidth = 3;
                ctx.save(); ctx.translate(centerX, centerY); ctx.rotate(angleTick);
                ctx.strokeRect(-70, -70, 140, 140); ctx.restore();
            }
            else if (effect === 'sacredRays') {
                ctx.lineWidth = 2.5;
                for (let i = 0; i < 6; i++) {
                    const a = (Math.PI * 2 / 6) * i + angleTick * 0.5;
                    ctx.beginPath(); ctx.moveTo(centerX, centerY);
                    ctx.lineTo(centerX + Math.cos(a) * 180, centerY + Math.sin(a) * 180); ctx.stroke();
                }
            }
            else if (effect === 'hexShield') {
                ctx.lineWidth = 2.5; ctx.beginPath();
                for (let i = 0; i < 6; i++) {
                    const a = (Math.PI * 2 / 6) * i;
                    const x = centerX + Math.cos(a) * 95;
                    const y = centerY + Math.sin(a) * 95;
                    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
                }
                ctx.closePath(); ctx.stroke();
            }
            else if (effect === 'spiralUp') {
                if (Math.random() < 0.5) {
                    particles.push({
                        x: centerX + Math.cos(angleTick * 4) * 50, y: centerY + 100,
                        vx: 0, vy: -Math.random() * 3 - 2, size: Math.random() * 4 + 2, life: 1, color: color
                    });
                }
            }
            else if (effect === 'pulseWave') {
                ctx.lineWidth = 2.5;
                ctx.beginPath(); ctx.arc(centerX, centerY, (angleTick * 90) % 180, 0, Math.PI * 2); ctx.stroke();
            }
            else if (effect === 'starShower') {
                if (Math.random() < 0.4) {
                    const pAngle = Math.random() * Math.PI * 2;
                    particles.push({
                        x: centerX, y: centerY,
                        vx: Math.cos(pAngle) * (Math.random() * 4 + 1),
                        vy: Math.sin(pAngle) * (Math.random() * 4 + 1),
                        size: Math.random() * 6 + 3, life: 1, color: color
                    });
                }
            }
            else if (effect === 'fireFlame' || effect === 'demonHellfire' || effect === 'darkBloodPillar') {
                if (Math.random() < 0.6) {
                    particles.push({
                        x: centerX + (Math.random() - 0.5) * 80, y: centerY + 40,
                        vx: (Math.random() - 0.5) * 2, vy: -Math.random() * 4 - 2,
                        size: Math.random() * 8 + 4, life: 1, color: color
                    });
                }
            }
            else if (effect === 'swirlVortex' || effect === 'cosmicRings' || effect === 'rainbowPrism') {
                ctx.lineWidth = 3;
                ctx.beginPath(); ctx.arc(centerX, centerY, 90 + Math.sin(angleTick) * 10, angleTick, angleTick + Math.PI * 1.5); ctx.stroke();
            }
            else if (effect === 'cyberGlitch' || effect === 'pixelNoise') {
                if (Math.random() < 0.4) {
                    ctx.fillStyle = Math.random() < 0.5 ? '#00ff66' : '#ff00ff';
                    ctx.fillRect(centerX + (Math.random() - 0.5) * 200, centerY + (Math.random() - 0.5) * 200, Math.random() * 20 + 5, 4);
                }
            }
            else if (effect === 'galaxyBigBang' || effect === 'blackHole' || effect === 'shadowEclipse') {
                ctx.lineWidth = 4;
                ctx.beginPath(); ctx.arc(centerX, centerY, 140 + Math.sin(angleTick * 2) * 20, 0, Math.PI * 2); ctx.stroke();
            }
        });

        if (Math.random() < 0.3) {
            particles.push({
                x: centerX + Math.cos(angleTick * 2) * 100, y: centerY + Math.sin(angleTick * 2) * 100,
                vx: (Math.random() - 0.5) * 2, vy: (Math.random() - 0.5) * 2,
                size: Math.random() * 6 + 3, life: 1, color: color
            });
        }

        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx; p.y += p.vy; p.life -= 0.02;
            ctx.fillStyle = p.color;
            ctx.globalAlpha = Math.max(0, p.life);
            ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
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
    }
    saveData();
}

function craftGear(key) {
    if (key === 'LuckGlove') {
        if (!(inventory['Rare'] >= 5)) { alert('재료가 부족합니다! (Rare 5개)'); return; }
        inventory['Rare'] -= 5; gearInventory[key] = true;
        alert('🛡️ Luck Glove 제작 완료!');
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
            alert('재료가 부족합니다!'); return;
        }
        inventory['Ether Essence'] -= 1; inventory['Crystallized'] -= 5;
        inventory['AETHER'] = (inventory['AETHER'] || 0) + 1;
        alert('✨ AETHER 제작 성공!');
    }
    saveData();
}

if (rollBtn) rollBtn.addEventListener('click', roll);
window.addEventListener('keydown', (e) => {
    // 관전 모드가 아니고, 스페이스 키 입력 시에만 롤 작동
    if (e.code === 'Space' && !isRolling && !isInspecting && document.activeElement.tagName !== 'BUTTON') roll();
});

if (autoBtn) {
    autoBtn.addEventListener('click', () => {
        tryPlayMusic();
        isAuto = !isAuto;
        if (isAuto) {
            autoBtn.innerText = "Auto: ON"; autoBtn.classList.add('active');
            if (!isRolling && !isInspecting) roll();
        } else {
            autoBtn.innerText = "Auto: OFF"; autoBtn.classList.remove('active');
        }
    });
}

loadData();
renderCanvas();
