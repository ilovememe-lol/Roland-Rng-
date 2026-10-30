// -------------------------------------------------------------
// SUPABASE 모바일 최적화 설정
// -------------------------------------------------------------
const SUPABASE_URL = "https://vkjgznvyvurlnefdskpw.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_C-UkMzjJ-OvaGLyjdIvwoQ_QCuEs4hi";

let supabase = null;

// 모바일 상단 강제 알림창 (오류 확인용)
function showMobileBanner(msg, isError = false) {
    let banner = document.getElementById('mobile-banner');
    if (!banner) {
        banner = document.createElement('div');
        banner.id = 'mobile-banner';
        banner.style.cssText = 'position:fixed; top:0; left:0; width:100%; z-index:999999; padding:8px 12px; font-size:12px; font-weight:bold; text-align:center; transition:0.3s;';
        document.body.appendChild(banner);
    }
    banner.style.background = isError ? '#ff3333' : '#00cc88';
    banner.style.color = '#ffffff';
    banner.innerText = msg;

    // 4초 후 자동으로 사라짐
    setTimeout(() => {
        if (banner) banner.style.display = 'none';
    }, 4000);
}

function initSupabaseClient() {
    try {
        if (window.supabase && typeof window.supabase.createClient === 'function') {
            supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            showMobileBanner("✅ Supabase 서버 연결 완료!");
            return true;
        } else {
            showMobileBanner("❌ Supabase SDK를 불러오지 못했습니다. (네트워크/CDN 차단)", true);
        }
    } catch (e) {
        showMobileBanner("❌ Supabase 초기화 에러: " + e.message, true);
    }
    return false;
}

let myNickname = localStorage.getItem('sols_nickname') || '유저_' + Math.floor(Math.random() * 8999 + 1000);

// 모바일 터치(Touch) 및 터치클릭 대응 함수
function bindMobileClick(id, callback) {
    const el = document.getElementById(id);
    if (!el) return;
    
    const handler = (e) => {
        e.preventDefault();
        callback(e);
    };

    el.removeEventListener('click', callback);
    el.addEventListener('click', callback);
    el.addEventListener('touchend', handler);
}

// DOM 로드 후 실행
window.addEventListener('load', () => {
    // 1. Supabase 접속 시도
    initSupabaseClient();

    // 2. 닉네임 표기
    const nickEl = document.getElementById('user-nickname');
    if (nickEl) nickEl.innerText = myNickname;

    // 3. 채팅 버튼 이벤트 등록
    bindMobileClick('chat-send-btn', sendChatMessage);

    const inputEl = document.getElementById('chat-input');
    if (inputEl) {
        inputEl.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendChatMessage(); });
    }

    // 4. 초기 채팅 데이터 및 실시간 구독
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
            console.error("Realtime 에러:", e);
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

    if (!supabase && !initSupabaseClient()) {
        alert("Supabase 서버에 연결할 수 없습니다. 상단 배너 문구를 확인해주세요.");
        return;
    }

    const { error } = await supabase.from('chat').insert([{ user: myNickname, text: text }]);
    if (error) {
        showMobileBanner("채팅 전송 실패: " + error.message, true);
    } else {
        chatInput.value = '';
    }
}

async function loadInitialChats() {
    if (!supabase && !initSupabaseClient()) return;
    const { data, error } = await supabase.from('chat').select('*').order('created_at', { ascending: false }).limit(20);
    if (error) {
        showMobileBanner("채팅 불러오기 실패: " + error.message, true);
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
    if ((!supabase && !initSupabaseClient()) || bestChance === 0) return;
    
    const { error } = await supabase.from('leaderboard').upsert([
        { user: myNickname, aura: bestName, chance: bestChance }
    ], { onConflict: 'user' });

    if (error) {
        showMobileBanner("랭킹 업로드 에러: " + error.message, true);
    }
}

async function loadOnlineRankings() {
    const rankList = document.getElementById('rank-list');
    if (!rankList) return;

    if (!supabase && !initSupabaseClient()) {
        rankList.innerHTML = '<div style="text-align:center; padding:20px; color:#ff4444;">Supabase 연동 안됨</div>';
        return;
    }

    const { data, error } = await supabase
        .from('leaderboard')
        .select('*')
        .order('chance', { ascending: false })
        .limit(10);

    if (error) {
        showMobileBanner("랭킹 불러오기 에러: " + error.message, true);
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
