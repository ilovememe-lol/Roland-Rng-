// -------------------------------------------------------------
// SUPABASE REST API Direct Client (CDN 차단 우회용)
// -------------------------------------------------------------
const SUPABASE_URL = "https://vkjgznvyvurlnefdskpw.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_C-UkMzjJ-OvaGLyjdIvwoQ_QCuEs4hi";

let myNickname = localStorage.getItem('sols_nickname') || '유저_' + Math.floor(Math.random() * 8999 + 1000);

// 공통 HTTP 요청 함수
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
        const response = await fetch(`${SUPABASE_URL}/rest/v1/${endpoint}`, options);
        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData.message || `HTTP 에러 ${response.status}`);
        }
        if (method === 'GET') {
            return await response.json();
        }
        return true;
    } catch (err) {
        console.error(`[Supabase Error] ${endpoint}:`, err);
        return null;
    }
}

// 클릭 및 모바일 터치 이벤트 바인딩
function bindBtn(id, handler) {
    const el = document.getElementById(id);
    if (!el) return;
    
    el.onclick = (e) => {
        e.preventDefault();
        handler(e);
    };
    el.ontouchend = (e) => {
        e.preventDefault();
        handler(e);
    };
}

// DOM 준비 완료 시 이벤트 및 데이터 초기화
window.addEventListener('DOMContentLoaded', () => {
    // 1. 닉네임 표기
    const nickEl = document.getElementById('user-nickname');
    if (nickEl) nickEl.innerText = myNickname;

    // 2. 닉네임 변경 버튼
    bindBtn('nav-nickname', changeNickname);

    // 3. 랭킹 모달 열기 버튼
    bindBtn('nav-rank', () => {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebar-overlay');
        if (sidebar) sidebar.classList.remove('open');
        if (overlay) overlay.classList.remove('active');

        const modal = document.getElementById('rank-modal');
        if (modal) modal.style.display = 'flex';
        loadOnlineRankings();
    });

    // 4. 채팅 전송 버튼 및 엔터키
    bindBtn('chat-send-btn', sendChatMessage);
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
        chatInput.onkeypress = (e) => {
            if (e.key === 'Enter') sendChatMessage();
        };
    }

    // 5. 채팅 초기 불러오기 및 3초 간격 실시간 갱신 (CDN 없이 동동 작동)
    loadInitialChats();
    setInterval(loadInitialChats, 3000);
});

// -------------------------------------------------------------
// 닉네임 변경 기능
// -------------------------------------------------------------
function changeNickname() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('active');

    const newName = prompt("새 닉네임을 입력하세요 (최대 10자):", myNickname);
    if (newName && newName.trim() !== "") {
        myNickname = newName.trim().substring(0, 10);
        localStorage.setItem('sols_nickname', myNickname);
        
        const nickEl = document.getElementById('user-nickname');
        if (nickEl) nickEl.innerText = myNickname;

        // 최고 기록이 있다면 닉네임 갱신 업로드
        if (typeof bestName !== 'undefined' && typeof bestChance !== 'undefined' && bestChance > 0) {
            uploadLeaderboard(bestName, bestChance);
        }
    }
}

// -------------------------------------------------------------
// 실시간 온라인 채팅
// -------------------------------------------------------------
async function sendChatMessage() {
    const chatInput = document.getElementById('chat-input');
    if (!chatInput) return;
    
    const text = chatInput.value.trim();
    if (!text) return;

    const result = await supabaseFetch('chat', 'POST', [{ user: myNickname, text: text }]);
    if (result) {
        chatInput.value = '';
        loadInitialChats();
    } else {
        alert("채팅 전송 실패! (네트워크 상태를 확인하세요)");
    }
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

// -------------------------------------------------------------
// 실시간 온라인 랭킹
// -------------------------------------------------------------
async function uploadLeaderboard(bestName, bestChance) {
    if (!bestChance) return;
    
    // Upsert (user 기준 중복 덮어쓰기)
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
    } catch (e) {
        console.error("랭킹 업로드 에러:", e);
    }
}

async function loadOnlineRankings() {
    const rankList = document.getElementById('rank-list');
    if (!rankList) return;

    const data = await supabaseFetch('leaderboard?select=*&order=chance.desc&limit=10');

    if (!data || !Array.isArray(data)) {
        rankList.innerHTML = '<div style="text-align:center; padding:20px; color:#ff4444;">랭킹 데이터를 불러오지 못했습니다.</div>';
        return;
    }

    if (data.length === 0) {
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
