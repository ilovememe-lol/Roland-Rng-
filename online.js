const SUPABASE_URL = "https://vkjgznvyvurlnefdskpw.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_C-UkMzjJ-OvaGLyjdIvwoQ_QCuEs4hi";

let myNickname = localStorage.getItem('sols_nickname') || '유저_' + Math.floor(Math.random() * 8999 + 1000);

// REST API 통신
async function supabaseFetch(endpoint, method = 'GET', body = null) {
    const headers = {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
    };
    const options = { method, headers };
    if (body) options.body = JSON.stringify(body);

    try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/${endpoint}`, options);
        if (!res.ok) return null;
        if (method === 'GET') return await res.json();
        return true;
    } catch (e) {
        return null;
    }
}

// 1. 닉네임 변경 함수
window.changeNickname = function() {
    closeSidebar();
    const newName = prompt("새 닉네임을 입력하세요 (최대 10자):", myNickname);
    if (newName && newName.trim() !== "") {
        myNickname = newName.trim().substring(0, 10);
        localStorage.setItem('sols_nickname', myNickname);
        
        const nickEl = document.getElementById('user-nickname');
        if (nickEl) nickEl.innerText = myNickname;

        if (typeof bestName !== 'undefined' && typeof bestChance !== 'undefined' && bestChance > 0) {
            uploadLeaderboard(bestName, bestChance);
        }
    }
};

// 2. 랭킹 모달 열기 함수
window.openRankModal = function() {
    closeSidebar();
    const modal = document.getElementById('rank-modal');
    if (modal) modal.style.display = 'flex';
    loadOnlineRankings();
};

// 3. 채팅 전송 함수
window.sendChatMessage = async function() {
    const chatInput = document.getElementById('chat-input');
    if (!chatInput) return;
    
    const text = chatInput.value.trim();
    if (!text) return;

    const res = await supabaseFetch('chat', 'POST', [{ user: myNickname, text: text }]);
    if (res) {
        chatInput.value = '';
        loadInitialChats();
    } else {
        alert("전송 실패! Supabase 테이블 RLS 설정을 확인하세요.");
    }
};

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
}

async function loadInitialChats() {
    const data = await supabaseFetch('chat?select=*&order=created_at.desc&limit=20');
    if (data && Array.isArray(data)) {
        const chatMessages = document.getElementById('chat-messages');
        if (!chatMessages) return;
        
        chatMessages.innerHTML = '';
        data.reverse().forEach(msg => {
            const msgDiv = document.createElement('div');
            msgDiv.className = 'chat-msg-item';
            msgDiv.innerHTML = `<span class="chat-user">${msg.user}:</span> ${msg.text}`;
            chatMessages.appendChild(msgDiv);
        });
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

async function uploadLeaderboard(bestName, bestChance) {
    if (!bestChance) return;
    const headers = {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates'
    };
    try {
        await fetch(`${SUPABASE_URL}/rest/v1/leaderboard`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify([{ user: myNickname, aura: bestName, chance: bestChance }])
        });
    } catch (e) {}
}

async function loadOnlineRankings() {
    const rankList = document.getElementById('rank-list');
    if (!rankList) return;

    const data = await supabaseFetch('leaderboard?select=*&order=chance.desc&limit=10');
    if (!data || !Array.isArray(data) || data.length === 0) {
        rankList.innerHTML = '<div style="text-align:center; padding:20px;">등록된 랭킹 데이터가 없습니다.</div>';
        return;
    }

    rankList.innerHTML = '';
    data.forEach((item, idx) => {
        const row = document.createElement('div');
        row.className = 'rank-row';
        row.innerHTML = `
            <span class="rank-num">#${idx + 1}</span>
            <span class="rank-user">${item.user}</span>
            <span class="rank-aura">${item.aura} <span style="color:#aaa; font-size:11px;">(1/${Number(item.chance).toLocaleString()})</span></span>
        `;
        rankList.appendChild(row);
    });
}

// 화면 로드 시 초기화
window.addEventListener('DOMContentLoaded', () => {
    const nickEl = document.getElementById('user-nickname');
    if (nickEl) nickEl.innerText = myNickname;

    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendChatMessage();
        });
    }

    loadInitialChats();
    setInterval(loadInitialChats, 3000);
});
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sol's RNG Online</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <!-- 상단 헤더 / 메뉴 버튼 -->
    <header id="header">
        <button id="menu-toggle-btn">☰ 메뉴</button>
        <div id="user-info">
            <span id="user-nickname">유저_0000</span>
        </div>
    </header>

    <!-- 사이드바 메뉴 -->
    <div id="sidebar-overlay"></div>
    <nav id="sidebar">
        <h2>메뉴</h2>
        <button id="nav-nickname">닉네임 변경</button>
        <button id="nav-rank">전체 랭킹</button>
        <button id="nav-inv">인벤토리</button>
        <button id="nav-gear">장비</button>
        <button id="nav-shop">상점</button>
        <button id="nav-craft">조합소</button>
        <button id="nav-fullscreen">전체화면</button>
        <button id="nav-settings">설정</button>
    </nav>

    <!-- 메인 게임 영역 -->
    <main id="game-container">
        <!-- 캔버스 및 캐릭터 비주얼 -->
        <div id="visual-area">
            <canvas id="auraCanvas" width="500" height="500"></canvas>
            <div id="character-avatar"></div>
        </div>

        <!-- 아우라 정보 표시 -->
        <div id="aura-display">
            <h1 id="aura-name">Common</h1>
            <p id="aura-rarity">1 / 2</p>
        </div>

        <!-- 기본 정보 상태창 -->
        <div id="stats-panel">
            <div>총 ROLL: <span id="total-rolls">0</span></div>
            <div>골드: <span id="gold-val">0</span> G</div>
            <div>행운: <span id="luck-mult">1.0x</span></div>
            <div>장착 장비: <span id="equipped-gear">없음</span></div>
            <div>최고 기록: <span id="best-roll">None</span></div>
        </div>

        <!-- 일반 버튼 패널 -->
        <div id="normal-panel">
            <button id="roll-btn">ROLL</button>
            <button id="auto-btn">Auto: OFF</button>
        </div>

        <!-- 관전 모드 해제 패널 -->
        <div id="inspect-panel" style="display: none;">
            <button id="exit-inspect-btn">관전 종료</button>
        </div>

        <!-- 실시간 온라인 채팅 영역 -->
        <section id="chat-section">
            <h3>실시간 채팅</h3>
            <div id="chat-messages"></div>
            <div id="chat-input-box">
                <input type="text" id="chat-input" placeholder="메시지를 입력하세요..." maxlength="100">
                <button id="chat-send-btn">전송</button>
            </div>
        </section>
    </main>

    <!-- 랭킹 모달 -->
    <div id="rank-modal" class="modal" style="display: none;">
        <div class="modal-content">
            <div class="modal-header">
                <h2>🏆 실시간 전체 랭킹</h2>
                <button class="modal-close-btn">&times;</button>
            </div>
            <div id="rank-list">
                <div style="text-align:center; padding:20px;">랭킹을 불러오는 중...</div>
            </div>
        </div>
    </div>

    <!-- 인벤토리 모달 -->
    <div id="inv-modal" class="modal" style="display: none;">
        <div class="modal-content">
            <div class="modal-header">
                <h2>🎒 인벤토리</h2>
                <button class="modal-close-btn">&times;</button>
            </div>
            <div id="inv-list"></div>
        </div>
    </div>

    <!-- 장비 모달 -->
    <div id="gear-modal" class="modal" style="display: none;">
        <div class="modal-content">
            <div class="modal-header">
                <h2>🛡️ 장비 보관함</h2>
                <button class="modal-close-btn">&times;</button>
            </div>
            <div id="gear-list"></div>
        </div>
    </div>

    <!-- 상점 모달 -->
    <div id="shop-modal" class="modal" style="display: none;">
        <div class="modal-content">
            <div class="modal-header">
                <h2>🛒 상점</h2>
                <button class="modal-close-btn">&times;</button>
            </div>
            <div class="shop-item">
                <div>행운 물약 (Small) - 100 G</div>
                <button onclick="buyPotion('small')">구매</button>
            </div>
            <div class="shop-item">
                <div>스피드 물약 - 300 G</div>
                <button onclick="buyPotion('speed_small')">구매</button>
            </div>
            <div class="shop-item">
                <div>1회성 행운 물약 (+10x) - 500 G</div>
                <button onclick="buyPotion('one_shot_small')">구매</button>
            </div>
        </div>
    </div>

    <!-- 조합소 모달 -->
    <div id="craft-modal" class="modal" style="display: none;">
        <div class="modal-content">
            <div class="modal-header">
                <h2>⚒️ 조합소</h2>
                <button class="modal-close-btn">&times;</button>
            </div>
            <div class="craft-tabs">
                <button id="tab-potion-btn" class="active" onclick="switchCraftTab('potion')">물약</button>
                <button id="tab-gear-btn" onclick="switchCraftTab('gear')">장비</button>
                <button id="tab-aura-btn" onclick="switchCraftTab('aura')">아우라</button>
            </div>
            <div id="craft-potion-section">
                <div class="shop-item">
                    <div>Large Luck Potion (Rare 1개)</div>
                    <button onclick="craftPotion('large')">조합</button>
                </div>
            </div>
            <div id="craft-gear-section" style="display: none;">
                <div class="shop-item">
                    <div>Luck Glove (Rare 5개)</div>
                    <button onclick="craftGear('LuckGlove')">제작</button>
                </div>
            </div>
            <div id="craft-aura-section" style="display: none;">
                <div class="shop-item">
                    <div>AETHER (Ether Essence 1개 + Crystallized 5개)</div>
                    <button onclick="craftAura('AETHER')">연성</button>
                </div>
            </div>
        </div>
    </div>

    <!-- 설정 모달 -->
    <div id="settings-modal" class="modal" style="display: none;">
        <div class="modal-content">
            <div class="modal-header">
                <h2>⚙️ 설정</h2>
                <button class="modal-close-btn">&times;</button>
            </div>
            <div class="setting-row">
                <label>파티클 효과</label>
                <input type="checkbox" id="particle-toggle" checked>
            </div>
            <div class="setting-row">
                <label>BGM 음량</label>
                <input type="range" id="bgm-volume" min="0" max="100" value="50">
            </div>
            <button onclick="resetGameData()" style="background:#ff4444; color:white; width:100%; margin-top:15px; padding:10px; border:none; border-radius:5px;">데이터 초기화</button>
        </div>
    </div>

    <!-- BGM 오디오 -->
    <audio id="bgm-player"></audio>

    <!-- ------------------------------------------------------------- -->
    <!-- 자바스크립트 스크립트 연결 순서 (순서 유지) -->
    <!-- ------------------------------------------------------------- -->
    <!-- 1. Supabase JS Client CDN -->
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <!-- 2. 온라인 스크립트 (채팅/랭킹/닉네임) -->
    <script src="online.js"></script>
    <!-- 3. 게임 메인 스크립트 -->
    <script src="game.js"></script>

</body>
</html>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sol's RNG Online</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <!-- 상단 헤더 / 메뉴 버튼 -->
    <header id="header">
        <button id="menu-toggle-btn">☰ 메뉴</button>
        <div id="user-info">
            <span id="user-nickname">유저_0000</span>
        </div>
    </header>

    <!-- 사이드바 메뉴 -->
    <div id="sidebar-overlay"></div>
    <nav id="sidebar">
        <h2>메뉴</h2>
        <button id="nav-nickname">닉네임 변경</button>
        <button id="nav-rank">전체 랭킹</button>
        <button id="nav-inv">인벤토리</button>
        <button id="nav-gear">장비</button>
        <button id="nav-shop">상점</button>
        <button id="nav-craft">조합소</button>
        <button id="nav-fullscreen">전체화면</button>
        <button id="nav-settings">설정</button>
    </nav>

    <!-- 메인 게임 영역 -->
    <main id="game-container">
        <!-- 캔버스 및 캐릭터 비주얼 -->
        <div id="visual-area">
            <canvas id="auraCanvas" width="500" height="500"></canvas>
            <div id="character-avatar"></div>
        </div>

        <!-- 아우라 정보 표시 -->
        <div id="aura-display">
            <h1 id="aura-name">Common</h1>
            <p id="aura-rarity">1 / 2</p>
        </div>

        <!-- 기본 정보 상태창 -->
        <div id="stats-panel">
            <div>총 ROLL: <span id="total-rolls">0</span></div>
            <div>골드: <span id="gold-val">0</span> G</div>
            <div>행운: <span id="luck-mult">1.0x</span></div>
            <div>장착 장비: <span id="equipped-gear">없음</span></div>
            <div>최고 기록: <span id="best-roll">None</span></div>
        </div>

        <!-- 일반 버튼 패널 -->
        <div id="normal-panel">
            <button id="roll-btn">ROLL</button>
            <button id="auto-btn">Auto: OFF</button>
        </div>

        <!-- 관전 모드 해제 패널 -->
        <div id="inspect-panel" style="display: none;">
            <button id="exit-inspect-btn">관전 종료</button>
        </div>

        <!-- 실시간 온라인 채팅 영역 -->
        <section id="chat-section">
            <h3>실시간 채팅</h3>
            <div id="chat-messages"></div>
            <div id="chat-input-box">
                <input type="text" id="chat-input" placeholder="메시지를 입력하세요..." maxlength="100">
                <button id="chat-send-btn">전송</button>
            </div>
        </section>
    </main>

    <!-- 랭킹 모달 -->
    <div id="rank-modal" class="modal" style="display: none;">
        <div class="modal-content">
            <div class="modal-header">
                <h2>🏆 실시간 전체 랭킹</h2>
                <button class="modal-close-btn">&times;</button>
            </div>
            <div id="rank-list">
                <div style="text-align:center; padding:20px;">랭킹을 불러오는 중...</div>
            </div>
        </div>
    </div>

    <!-- 인벤토리 모달 -->
    <div id="inv-modal" class="modal" style="display: none;">
        <div class="modal-content">
            <div class="modal-header">
                <h2>🎒 인벤토리</h2>
                <button class="modal-close-btn">&times;</button>
            </div>
            <div id="inv-list"></div>
        </div>
    </div>

    <!-- 장비 모달 -->
    <div id="gear-modal" class="modal" style="display: none;">
        <div class="modal-content">
            <div class="modal-header">
                <h2>🛡️ 장비 보관함</h2>
                <button class="modal-close-btn">&times;</button>
            </div>
            <div id="gear-list"></div>
        </div>
    </div>

    <!-- 상점 모달 -->
    <div id="shop-modal" class="modal" style="display: none;">
        <div class="modal-content">
            <div class="modal-header">
                <h2>🛒 상점</h2>
                <button class="modal-close-btn">&times;</button>
            </div>
            <div class="shop-item">
                <div>행운 물약 (Small) - 100 G</div>
                <button onclick="buyPotion('small')">구매</button>
            </div>
            <div class="shop-item">
                <div>스피드 물약 - 300 G</div>
                <button onclick="buyPotion('speed_small')">구매</button>
            </div>
            <div class="shop-item">
                <div>1회성 행운 물약 (+10x) - 500 G</div>
                <button onclick="buyPotion('one_shot_small')">구매</button>
            </div>
        </div>
    </div>

    <!-- 조합소 모달 -->
    <div id="craft-modal" class="modal" style="display: none;">
        <div class="modal-content">
            <div class="modal-header">
                <h2>⚒️ 조합소</h2>
                <button class="modal-close-btn">&times;</button>
            </div>
            <div class="craft-tabs">
                <button id="tab-potion-btn" class="active" onclick="switchCraftTab('potion')">물약</button>
                <button id="tab-gear-btn" onclick="switchCraftTab('gear')">장비</button>
                <button id="tab-aura-btn" onclick="switchCraftTab('aura')">아우라</button>
            </div>
            <div id="craft-potion-section">
                <div class="shop-item">
                    <div>Large Luck Potion (Rare 1개)</div>
                    <button onclick="craftPotion('large')">조합</button>
                </div>
            </div>
            <div id="craft-gear-section" style="display: none;">
                <div class="shop-item">
                    <div>Luck Glove (Rare 5개)</div>
                    <button onclick="craftGear('LuckGlove')">제작</button>
                </div>
            </div>
            <div id="craft-aura-section" style="display: none;">
                <div class="shop-item">
                    <div>AETHER (Ether Essence 1개 + Crystallized 5개)</div>
                    <button onclick="craftAura('AETHER')">연성</button>
                </div>
            </div>
        </div>
    </div>

    <!-- 설정 모달 -->
    <div id="settings-modal" class="modal" style="display: none;">
        <div class="modal-content">
            <div class="modal-header">
                <h2>⚙️ 설정</h2>
                <button class="modal-close-btn">&times;</button>
            </div>
            <div class="setting-row">
                <label>파티클 효과</label>
                <input type="checkbox" id="particle-toggle" checked>
            </div>
            <div class="setting-row">
                <label>BGM 음량</label>
                <input type="range" id="bgm-volume" min="0" max="100" value="50">
            </div>
            <button onclick="resetGameData()" style="background:#ff4444; color:white; width:100%; margin-top:15px; padding:10px; border:none; border-radius:5px;">데이터 초기화</button>
        </div>
    </div>

    <!-- BGM 오디오 -->
    <audio id="bgm-player"></audio>

    <!-- ------------------------------------------------------------- -->
    <!-- 자바스크립트 스크립트 연결 순서 (순서 유지) -->
    <!-- ------------------------------------------------------------- -->
    <!-- 1. Supabase JS Client CDN -->
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <!-- 2. 온라인 스크립트 (채팅/랭킹/닉네임) -->
    <script src="online.js"></script>
    <!-- 3. 게임 메인 스크립트 -->
    <script src="game.js"></script>

</body>
</html>
