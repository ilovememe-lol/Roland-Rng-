// -------------------------------------------------------------
// SUPABASE 설정 (본인의 키 값으로 입력 필요)
// -------------------------------------------------------------
const SUPABASE_URL = "https://supabase.com/dashboard/project/vkjgznvyvurlnefdskpw/editor/17604?schema=public";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";

let supabase = null;
if (SUPABASE_URL !== "sb_publishable_C-UkMzjJ-OvaGLyjdIvwoQ_QCuEs4hi") {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

let myNickname = localStorage.getItem('sols_nickname') || '유저_' + Math.floor(Math.random() * 8999 + 1000);

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('user-nickname').innerText = myNickname;
});

// -------------------------------------------------------------
// 실시간 온라인 채팅
// -------------------------------------------------------------
async function sendChatMessage() {
    const chatInput = document.getElementById('chat-input');
    const text = chatInput.value.trim();
    if (!text || !supabase) return;

    await supabase.from('chat').insert([{ user: myNickname, text: text }]);
    chatInput.value = '';
}

async function loadInitialChats() {
    if (!supabase) return;
    const { data } = await supabase.from('chat').select('*').order('created_at', { ascending: false }).limit(20);
    if (data) {
        data.reverse().forEach(msg => appendChatMsg(msg.user, msg.text));
    }
}

function appendChatMsg(user, text) {
    const chatMessages = document.getElementById('chat-messages');
    const msgDiv = document.createElement('div');
    msgDiv.className = 'chat-msg-item';
    msgDiv.innerHTML = `<span class="chat-user">${user}:</span> ${text}`;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

document.getElementById('chat-send-btn').addEventListener('click', sendChatMessage);
document.getElementById('chat-input').addEventListener('keypress', (e) => { if (e.key === 'Enter') sendChatMessage(); });

if (supabase) {
    loadInitialChats();
    supabase
        .channel('public:chat')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat' }, payload => {
            appendChatMsg(payload.new.user, payload.new.text);
        })
        .subscribe();
}

// -------------------------------------------------------------
// 실시간 온라인 랭킹
// -------------------------------------------------------------
async function uploadLeaderboard(bestName, bestChance) {
    if (!supabase || bestChance === 0) return;
    
    await supabase.from('leaderboard').upsert([
        { user: myNickname, aura: bestName, chance: bestChance }
    ], { onConflict: 'user' });
}

async function loadOnlineRankings() {
    const rankList = document.getElementById('rank-list');
    if (!supabase) {
        rankList.innerHTML = '<div style="text-align:center; padding:20px; color:#ff4444;">Supabase 연동 키 설정이 필요합니다.</div>';
        return;
    }

    const { data, error } = await supabase
        .from('leaderboard')
        .select('*')
        .order('chance', { ascending: false })
        .limit(10);

    if (error || !data) {
        rankList.innerHTML = '<div style="text-align:center; padding:20px;">랭킹을 불러오지 못했습니다.</div>';
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
