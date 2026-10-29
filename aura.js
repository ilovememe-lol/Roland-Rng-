// aura.js - 오라 시스템 모듈
export const AURAS = [
    { name: "Common", chance: 2, color: "#a0a0a0", effect: "dust" },
    { name: "Uncommon", chance: 4, color: "#55ff55", effect: "leaf" },
    { name: "Good", chance: 8, color: "#55ffff", effect: "sparkle" },
    { name: "Natural", chance: 16, color: "#88ff88", effect: "floatCircle" },
    { name: "Rare", chance: 32, color: "#5555ff", effect: "orbitDots" },
    { name: "Divinus", chance: 64, color: "#ffff55", effect: "holyCross" },
    { name: "Rage", chance: 256, color: "#ff3333", effect: "fireFlame" },
    { name: "JACKPOT", chance: 7777, color: "#00ffaa", effect: "coinShower" },
    { name: "Roland: Absolute", chance: 100000000, color: "#ff0000", effect: "absoluteRedStorm" },
    { name: "CREATION", chance: 1000000000, color: "#00ffff", effect: "galaxyBigBang" }
];

export class AuraManager {
    constructor() {
        this.totalRolls = 0;
        this.gold = 0;
        this.luck = 1.0;
        this.bestChance = 0;
        this.bestName = "None";
        this.inventory = {};
        this.isRolling = false;
        this.isAuto = false;
        this.loadData();
    }

    loadData() {
        const saved = localStorage.getItem('aura_game_save');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.totalRolls = data.totalRolls || 0;
                this.gold = data.gold || 0;
                this.bestChance = data.bestChance || 0;
                this.bestName = data.bestName || "None";
                this.inventory = data.inventory || {};
            } catch(e) {}
        }
    }

    saveData() {
        const data = {
            totalRolls: this.totalRolls,
            gold: this.gold,
            bestChance: this.bestChance,
            bestName: this.bestName,
            inventory: this.inventory
        };
        localStorage.setItem('aura_game_save', JSON.stringify(data));
    }

    roll() {
        if (this.isRolling) return null;
        this.isRolling = true;
        this.totalRolls++;

        let selected = AURAS[0];
        for (let i = AURAS.length - 1; i >= 0; i--) {
            if (Math.random() < (1 / (AURAS[i].chance / this.luck))) {
                selected = AURAS[i];
                break;
            }
        }

        this.gold += Math.max(1, Math.floor(Math.log2(selected.chance)));
        this.inventory[selected.name] = (this.inventory[selected.name] || 0) + 1;

        if (selected.chance > this.bestChance) {
            this.bestChance = selected.chance;
            this.bestName = selected.name;
        }

        this.saveData();
        setTimeout(() => { this.isRolling = false; }, 200);
        return selected;
    }
}
