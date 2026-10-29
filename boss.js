// boss.js - 거미집 아비들 보스전 시스템
export class SpiderBossEngine {
    constructor(canvasId, options = {}) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.modal = document.getElementById('boss-modal');
        this.hpFill = document.getElementById('boss-hp-fill');
        this.stageText = document.getElementById('boss-stage-text');
        this.msgEl = document.getElementById('boss-msg');
        this.slashBtn = document.getElementById('boss-slash-btn');

        this.isRunning = false;
        this.stage = 1;
        this.bossHp = 100;
        this.player = { x: 160, y: 160, radius: 5 };
        this.lines = [];
        this.timer = 0;
        this.phaseTimer = 0;
        this.isAttackOpportunity = false;

        this.options = options;
        this.initControls();
    }

    initControls() {
        const move = (e) => {
            if (!this.isRunning) return;
            const rect = this.canvas.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            this.player.x = Math.max(8, Math.min(312, clientX - rect.left));
            this.player.y = Math.max(8, Math.min(312, clientY - rect.top));
        };

        this.canvas.addEventListener('mousemove', move);
        this.canvas.addEventListener('touchmove', (e) => { move(e); e.preventDefault(); }, { passive: false });
        if (this.slashBtn) {
            this.slashBtn.addEventListener('click', () => this.executeSlash());
        }
    }

    start() {
        this.isRunning = true;
        this.stage = 1;
        this.bossHp = 100;
        this.lines = [];
        this.timer = 0;
        this.phaseTimer = 0;
        this.isAttackOpportunity = false;

        if (this.modal) this.modal.style.display = 'flex';
        if (this.slashBtn) this.slashBtn.style.display = 'none';

        this.updateUI();
        this.loop();
    }

    stop() {
        this.isRunning = false;
        if (this.modal) this.modal.style.display = 'none';
    }

    spawnPattern() {
        if (this.timer % Math.max(10, 30 - this.stage * 6) === 0) {
            const angle = Math.random() * Math.PI;
            this.lines.push({
                x1: 160 + Math.cos(angle) * 200, y1: 160 + Math.sin(angle) * 200,
                x2: 160 - Math.cos(angle) * 200, y2: 160 - Math.sin(angle) * 200,
                warn: 20, active: 8, width: 3 + this.stage
            });
        }
    }

    update() {
        this.timer++;
        this.phaseTimer++;

        if (this.phaseTimer > 220 && !this.isAttackOpportunity) {
            this.isAttackOpportunity = true;
            if (this.slashBtn) this.slashBtn.style.display = 'block';
            if (this.msgEl) {
                this.msgEl.innerText = "틈이 열렸다! 지금 베어라!";
                this.msgEl.style.color = "#00ffcc";
            }
        }

        if (!this.isAttackOpportunity) this.spawnPattern();

        for (let i = this.lines.length - 1; i >= 0; i--) {
            const l = this.lines[i];
            if (l.warn > 0) {
                l.warn--;
            } else {
                if (this.checkCollision(l)) {
                    alert("💀 참격에 베였습니다! (노히트 실패)");
                    this.stop();
                    return;
                }
                l.active--;
                if (l.active <= 0) this.lines.splice(i, 1);
            }
        }
    }

    checkCollision(l) {
        const A = this.player.x - l.x1, B = this.player.y - l.y1;
        const C = l.x2 - l.x1, D = l.y2 - l.y1;
        const dot = A * C + B * D, len = C * C + D * D;
        let p = len !== 0 ? dot / len : -1;
        let xx = p < 0 ? l.x1 : (p > 1 ? l.x2 : l.x1 + p * C);
        let yy = p < 0 ? l.y1 : (p > 1 ? l.y2 : l.y1 + p * D);
        return Math.hypot(this.player.x - xx, this.player.y - yy) < (this.player.radius + l.width / 2);
    }

    executeSlash() {
        this.isAttackOpportunity = false;
        if (this.slashBtn) this.slashBtn.style.display = 'none';
        this.lines = [];
        this.phaseTimer = 0;
        this.bossHp -= 34;

        if (this.bossHp <= 0) {
            alert("✨ 거미집 아비들을 베어내고 [기적] 업적을 달성했습니다!");
            this.stop();
            return;
        }

        this.stage++;
        if (this.msgEl) {
            this.msgEl.innerText = `${this.stage}페이즈 시작! 참격이 더 빨라집니다.`;
            this.msgEl.style.color = "#ff3344";
        }
        this.updateUI();
    }

    updateUI() {
        if (this.hpFill) this.hpFill.style.width = `${Math.max(0, this.bossHp)}%`;
        if (this.stageText) this.stageText.innerText = `단계 ${this.stage} / 3`;
    }

    render() {
        this.ctx.clearRect(0, 0, 320, 320);

        this.lines.forEach(l => {
            this.ctx.beginPath();
            this.ctx.moveTo(l.x1, l.y1);
            this.ctx.lineTo(l.x2, l.y2);
            this.ctx.strokeStyle = l.warn > 0 ? 'rgba(255, 51, 68, 0.3)' : '#ffffff';
            this.ctx.lineWidth = l.warn > 0 ? 1 : l.width;
            this.ctx.stroke();
        });

        this.ctx.fillStyle = '#ffffff';
        this.ctx.beginPath();
        this.ctx.arc(this.player.x, this.player.y, this.player.radius, 0, Math.PI * 2);
        this.ctx.fill();
    }

    loop() {
        if (!this.isRunning) return;
        this.update();
        this.render();
        requestAnimationFrame(() => this.loop());
    }
}
