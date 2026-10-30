// -------------------------------------------------------------
// SUPABASE 설정
// -------------------------------------------------------------
const SUPABASE_URL = "https://vkjgznvyvurlnefdskpw.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_C-UkMzjJ-OvaGLyjdIvwoQ_QCuEs4hi";

let supabase = null;

try {
    if (window.supabase && typeof window.supabase.createClient === 'function') {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
} catch (e) {
    console.error("Supabase 연결 실패:", e);
}

let myNickname = localStorage.getItem('sols_nickname') || '유저_' + Math.floor(Math.random() * 8999 + 1000);

// 클릭 & 모바일 터치 통합 등록 함수
function bindBtn(id, handler) {
    const el = document.getElementById(id);
    if (!el) return;
    el.onclick = (e) => {
        e.preventDefault();
        handler(e);
    };
}

// 화면 로드 완료 시 이벤트 바인딩
window.addEventListener('DOMContentLoaded', () => {
    // 닉네임 표시
    const nickEl = document.getElementById('user-nickname');
    if (nickEl) nickEl.innerText = myNickname;

    // 사이드바 및 모달 버튼 이벤트 연결
    bindBtn('nav-nickname', changeNickname);
    bindBtn('nav-rank', () => {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebar-overlay');
        if (sidebar) sidebar.classList.remove('open');
        if (overlay) overlay.classList.remove('active');

        const modal = document.getElementById('rank-modal');
        if (modal) modal.style.display = 'flex';
        loadOnlineRankings();
    });

    // 채팅 버튼 연결
    bindBtn('chat-send-btn', sendChatMessage);
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
        chatInput.onkeypress = (e) => {
            if (e.key === 'Enter') sendChatMessage();
        };
    }

    // 초기 채팅 로드 및 실시간 구독
    if (supabase) {
        loadInitialChats();
        try {
            supabase
                .channel('public:chat')
                .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat' }, payload => {
                    appendChatMsg(payload.new.user, payload.new.text);
                })
                .subscribe();
        } catch (e) {}
    }
});

// -------------------------------------------------------------
// 닉네임 변경
// -------------------------------------------------------------
function changeNickname() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('active');

    const newName = prompt("새 닉네임을 입력하세요:", myNickname);
    if (newName && newName.trim() !== "") {
        myNickname = newName.trim().substring(0, 10);
        localStorage.setItem('sols_nickname', myNickname);
        const nickEl = document.getElementById('user-nickname');
        if (nickEl) nickEl.innerText = myNickname;

        // 최고 기록이 있다면 닉네임 갱신 전송
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

    if (!supabase) {
        alert("Supabase 연결이 설정되지 않았습니다.");
        return;
    }

    const { error } = await supabase.from('chat').insert([{ user: myNickname, text: text }]);
    if (error) {
        alert("채팅 전송 실패: " + error.message);
    } else {
        chatInput.value = '';
    }
}

async function loadInitialChats() {
    if (!supabase) return;
    const { data, error } = await supabase.from('chat').select('*').order('created_at', { ascending: false }).limit(20);
    if (error) return;
    if (data) {
        data.reverse().forEach(msg => appendChatMsg(msg.user, msg.text));
    }
}

function appendChatMsg(user, text) {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;
    
    const msgDiv = document.createElement('div');
    msgDiv.className = 'chat-msg-item';
    msgDiv.innerHTML = `<span class="chat-user">${user}:</span> ${text}`;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// -------------------------------------------------------------
// 실시간 온라인 랭킹
// -------------------------------------------------------------
async function uploadLeaderboard(bestName, bestChance) {
    if (!supabase || !bestChance) return;
    
    await supabase.from('leaderboard').upsert([
        { user: myNickname, aura: bestName, chance: bestChance }
    ], { onConflict: 'user' });
}

async function loadOnlineRankings() {
    const rankList = document.getElementById('rank-list');
    if (!rankList) return;

    if (!supabase) {
        rankList.innerHTML = '<div style="text-align:center; padding:20px; color:#ff4444;">Supabase 연결 실패</div>';
        return;
    }

    const { data, error } = await supabase
        .from('leaderboard')
        .select('*')
        .order('chance', { ascending: false })
        .limit(10);

    if (error) {
        rankList.innerHTML = `<div style="text-align:center; padding:20px; color:#ff4444;">오류: ${error.message}</div>`;
        return;
    }

    if (!data || data.length === 0) {
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
            <span class="rank-aura">${item.aura} <span style="color:#aaa; font-size:11px;">(1/${item.chance.toLocaleString()})</span></span>
        `;
        rankList.appendChild(row);
    });
}
