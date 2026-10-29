// menu.js - 메뉴 및 사이드바 제어 모듈
export class MenuSystem {
    constructor(callbacks = {}) {
        this.sidebar = document.getElementById('sidebar');
        this.overlay = document.getElementById('sidebar-overlay');
        this.menuBtn = document.getElementById('menu-toggle-btn');
        this.callbacks = callbacks;
        this.init();
    }

    init() {
        if (this.menuBtn) {
            this.menuBtn.addEventListener('click', () => this.toggleSidebar());
        }
        if (this.overlay) {
            this.overlay.addEventListener('click', () => this.closeSidebar());
        }

        // 메뉴 버튼 이벤트 바인딩
        this.bindNav('nav-inv', 'inv-modal', this.callbacks.onOpenInv);
        this.bindNav('nav-shop', 'shop-modal');
        this.bindNav('nav-craft', 'craft-modal');
        this.bindNav('nav-settings', 'settings-modal');

        // 보스전 진입 메뉴 버튼
        const bossBtn = document.getElementById('nav-boss');
        if (bossBtn) {
            bossBtn.addEventListener('click', () => {
                this.closeSidebar();
                if (this.callbacks.onStartBoss) this.callbacks.onStartBoss();
            });
        }

        // 모달 닫기 버튼들
        document.querySelectorAll('.close-modal-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                if (modal) modal.style.display = 'none';
            });
        });
    }

    toggleSidebar() {
        this.sidebar.classList.toggle('open');
        this.overlay.classList.toggle('active');
    }

    closeSidebar() {
        this.sidebar.classList.remove('open');
        this.overlay.classList.remove('active');
    }

    bindNav(btnId, modalId, customCallback) {
        const btn = document.getElementById(btnId);
        const modal = document.getElementById(modalId);
        if (btn && modal) {
            btn.addEventListener('click', () => {
                this.closeSidebar();
                if (customCallback) customCallback();
                modal.style.display = 'flex';
            });
        }
    }
}
