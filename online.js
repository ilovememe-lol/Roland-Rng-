const SUPABASE_URL = "https://vkjgznvyvurlnefdskpw.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_C-UkMzjJ-OvaGLyjdIvwoQ_QCuEs4hi";

let myNickname = localStorage.getItem('sols_nickname') || '유저_' + Math.floor(Math.random() * 8999 + 1000);

// REST API 직통 통신
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

// 메뉴 사이드바 토글
window.toggleSidebar = function() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar) sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('active');
};

// 모달 열기/닫기
window.openModal = function(id) {
    window.toggleSidebar();
    const modal = document.getElementById(id);
    if (modal) modal.style.display = 'flex';

    if (id === 'inv-modal' && typeof renderInventoryList === 'function') renderInventoryList();
    if (id === 'gear-modal' && typeof renderGearList === 'function') renderGearList();
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

// 닉네임 변경
window.changeNickname = function() {
    window.toggleSidebar();
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

// 랭킹 모달 열기
window.openRankModal = function() {
    window.toggleSidebar();
    const modal = document.getElementById('rank-modal');
    if (modal) modal.style.display = 'flex';
    loadOnlineRankings();
};

// 채팅 메시지 전송
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
        alert("채팅 전송에 실패했습니다.");
    }
};

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

// 초기화
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
