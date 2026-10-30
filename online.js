// -------------------------------------------------------------
// SUPABASE 모바일 최적화 설정
// -------------------------------------------------------------
const SUPABASE_URL = "https://vkjgznvyvurlnefdskpw.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_C-UkMzjJ-OvaGLyjdIvwoQ_QCuEs4hi";

let supabase = null;

// 모바일 화면용 디버그 콘솔 생성 함수
function mobileLog(msg, isError = false) {
    let logBox = document.getElementById('mobile-debug-log');
    if (!logBox) {
        logBox = document.createElement('div');
        logBox.id = 'mobile-debug-log';
        logBox.style.cssText = 'position:fixed; bottom:0; left:0; width:100%; max-height:120px; overflow-y:auto; background:rgba(0,0,0,0.85); color:#00ffcc; font-size:10px; z-index:99999; padding:5px; border-top:1px solid #333; word-break:break-all; pointer-events:none;';
        document.body.appendChild(logBox);
    }
    const item = document.createElement('div');
    item.style.color = isError ? '#ff4444' : '#00ffcc';
    item.innerText = `[${new Date().toLocaleTimeString()}] ${msg}`;
    logBox.appendChild(item);
    logBox.scrollTop = logBox.scrollHeight;
}

function initSupabase() {
    try {
        if (window.supabase && typeof window.supabase.createClient === 'function') {
            supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            mobileLog("Supabase 연결 성공!");
            return true;
        } else {
            mobileLog("Supabase SDK(CDN) 로드 안됨", true);
        }
    } catch (e) {
        mobileLog("Supabase 에러: " + e.message, true);
    }
    return false;
}

let myNickname = localStorage.getItem('sols_nickname') || '유저_' + Math.floor(Math.random() * 8999 + 1000);

// 이벤트 바인딩 (클릭 + 터치 대응)
function bindEvent(id, handler) {
    const el = document.getElementById(id);
    if (el) {
        el.addEventListener('click', handler);
        el.addEventListener('touchend', (e) => {
            e.preventDefault();
            handler(e);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initSupabase();

    const nickEl = document.getElementById('user-nickname');
    if (nickEl) nickEl.innerText = myNickname;

    bindEvent('chat-send-btn', sendChatMessage);

    const inputEl = document.getElementById('chat-input');
    if (inputEl) {
        inputEl.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendChatMessage(); });
    }

    if (supabase) {
        loadInitialChats();
        try {
            supabase
                .channel('public:chat')
                .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat' }, payload => {
                    appendChatMsg(payload.new.user, payload.new.text);
                })
                .subscribe();
        } catch (e) {
            mobileLog("Realtime 구독 에러: " + e.message, true);
        }
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

    if (!supabase && !initSupabase()) {
        alert("Supabase 서버에 연결되어 있지 않습니다.");
        return;
    }

    const { error } = await supabase.from('chat').insert([{ user: myNickname, text: text }]);
    if (error) {
        mobileLog("채팅 오류: " + error.message, true);
        alert("채팅 실패: " + error.message);
    } else {
        chatInput.value = '';
    }
}

async function loadInitialChats() {
    if (!supabase && !initSupabase()) return;
    const { data, error } = await supabase.from('chat').select('*').order('created_at', { ascending: false }).limit(20);
    if (error) {
        mobileLog("채팅 불러오기 오류: " + error.message, true);
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
    if ((!supabase && !initSupabase()) || bestChance === 0) return;
    
    const { error } = await supabase.from('leaderboard').upsert([
        { user: myNickname, aura: bestName, chance: bestChance }
    ], { onConflict: 'user' });

    if (error) {
        mobileLog("랭킹 등록 오류: " + error.message, true);
    }
}

async function loadOnlineRankings() {
    const rankList = document.getElementById('rank-list');
    if (!rankList) return;

    if (!supabase && !initSupabase()) {
        rankList.innerHTML = '<div style="text-align:center; padding:20px; color:#ff4444;">Supabase 연동 안됨</div>';
        return;
    }

    const { data, error } = await supabase
        .from('leaderboard')
        .select('*')
        .order('chance', { ascending: false })
        .limit(10);

    if (error) {
        mobileLog("랭킹 오류: " + error.message, true);
        rankList.innerHTML = `<div style="text-align:center; padding:20px; color:#ff4444;">오류: ${error.message}</div>`;
        return;
    }

    if (!data || data.length === 0) {
        rankList.innerHTML = '<div style="text-align:center; padding:20px;">등록된 랭킹이 없습니다.</div>';
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
