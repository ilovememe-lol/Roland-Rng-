// -------------------------------------------------------------
// SUPABASE 설정
// -------------------------------------------------------------
const SUPABASE_URL = "https://vkjgznvyvurlnefdskpw.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_C-UkMzjJ-OvaGLyjdIvwoQ_QCuEs4hi";

let supabase = null;

// Supabase 클라이언트 안전 생성
try {
    if (window.supabase && typeof window.supabase.createClient === 'function') {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
} catch (e) {
    console.error("Supabase 초기화 실패:", e);
}

let myNickname = localStorage.getItem('sols_nickname') || '유저_' + Math.floor(Math.random() * 8999 + 1000);

document.addEventListener('DOMContentLoaded', () => {
    const nickEl = document.getElementById('user-nickname');
    if (nickEl) nickEl.innerText = myNickname;

    const sendBtn = document.getElementById('chat-send-btn');
    const inputEl = document.getElementById('chat-input');
    
    if (sendBtn) sendBtn.addEventListener('click', sendChatMessage);
    if (inputEl) inputEl.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendChatMessage(); });

    if (supabase) {
        loadInitialChats();
        supabase
            .channel('public:chat')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat' }, payload => {
                appendChatMsg(payload.new.user, payload.new.text);
            })
            .subscribe();
    }
});

// -------------------------------------------------------------
// 실시간 온라인 채팅
// -------------------------------------------------------------
async function sendChatMessage() {
    const chatInput = document.getElementById('chat-input');
    if (!chatInput) return;
    
    const text = chatInput.value.trim();
    if (!text) return;

    if (!supabase) {
        alert("Supabase 서버에 연결되어 있지 않습니다.");
        return;
    }

    const { error } = await supabase.from('chat').insert([{ user: myNickname, text: text }]);
    if (error) {
        console.error("채팅 전송 에러:", error);
        alert("채팅 전송 실패: " + error.message);
    } else {
        chatInput.value = '';
    }
}

async function loadInitialChats() {
    if (!supabase) return;
    const { data, error } = await supabase.from('chat').select('*').order('created_at', { ascending: false }).limit(20);
    if (error) {
        console.error("채팅 로드 에러:", error);
        return;
    }
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
    if (!supabase || bestChance === 0) return;
    
    const { error } = await supabase.from('leaderboard').upsert([
        { user: myNickname, aura: bestName, chance: bestChance }
    ], { onConflict: 'user' });

    if (error) {
        console.error("랭킹 등록 에러:", error);
    }
}

async function loadOnlineRankings() {
    const rankList = document.getElementById('rank-list');
    if (!rankList) return;

    if (!supabase) {
        rankList.innerHTML = '<div style="text-align:center; padding:20px; color:#ff4444;">Supabase 연동이 설정되지 않았습니다.</div>';
        return;
    }

    const { data, error } = await supabase
        .from('leaderboard')
        .select('*')
        .order('chance', { ascending: false })
        .limit(10);

    if (error) {
        console.error("랭킹 불러오기 에러:", error);
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
