import { useState, useEffect, useRef } from "react";

// ── Pixel art SVG icons ──────────────────────────────────────────
const PixelHeart = ({ color = "#F4A7C3", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 10 10" style={{ imageRendering: "pixelated" }}>
    <rect x="1" y="2" width="3" height="1" fill={color} />
    <rect x="6" y="2" width="3" height="1" fill={color} />
    <rect x="0" y="3" width="4" height="2" fill={color} />
    <rect x="5" y="3" width="4" height="2" fill={color} />
    <rect x="1" y="5" width="8" height="2" fill={color} />
    <rect x="2" y="7" width="6" height="1" fill={color} />
    <rect x="3" y="8" width="4" height="1" fill={color} />
    <rect x="4" y="9" width="2" height="1" fill={color} />
  </svg>
);

const PixelExclaim = () => (
  <svg width="20" height="20" viewBox="0 0 10 10" style={{ imageRendering: "pixelated" }}>
    <rect x="4" y="1" width="2" height="5" fill="#7EC8E3" />
    <rect x="4" y="8" width="2" height="2" fill="#7EC8E3" />
  </svg>
);

const PixelCat = () => (
  <svg width="20" height="20" viewBox="0 0 10 10" style={{ imageRendering: "pixelated" }}>
    <rect x="1" y="3" width="1" height="2" fill="#A0C8DC" />
    <rect x="8" y="3" width="1" height="2" fill="#A0C8DC" />
    <rect x="2" y="2" width="6" height="6" fill="#C8E4F4" />
    <rect x="3" y="4" width="1" height="1" fill="#5A9FBF" />
    <rect x="6" y="4" width="1" height="1" fill="#5A9FBF" />
    <rect x="4" y="6" width="2" height="1" fill="#F4A7C3" />
    <rect x="3" y="5" width="1" height="1" fill="#A0C8DC" />
    <rect x="6" y="5" width="1" height="1" fill="#A0C8DC" />
  </svg>
);

const PixelRibbon = () => (
  <svg width="20" height="20" viewBox="0 0 10 10" style={{ imageRendering: "pixelated" }}>
    <rect x="0" y="2" width="4" height="3" fill="#F4A7C3" />
    <rect x="6" y="2" width="4" height="3" fill="#F4A7C3" />
    <rect x="4" y="3" width="2" height="1" fill="#E07AAC" />
    <rect x="1" y="3" width="2" height="1" fill="#fff" opacity="0.5" />
    <rect x="7" y="3" width="2" height="1" fill="#fff" opacity="0.5" />
    <rect x="3" y="2" width="4" height="3" fill="#F4A7C3" />
    <rect x="4" y="3" width="2" height="1" fill="#E07AAC" />
  </svg>
);

const PixelLamp = () => (
  <svg width="18" height="18" viewBox="0 0 10 10" style={{ imageRendering: "pixelated" }}>
    <rect x="3" y="0" width="4" height="3" fill="#FFE08A" />
    <rect x="2" y="0" width="1" height="2" fill="#FFE08A" />
    <rect x="7" y="0" width="1" height="2" fill="#FFE08A" />
    <rect x="4" y="3" width="2" height="4" fill="#C8DCEF" />
    <rect x="2" y="7" width="6" height="1" fill="#A0B4E8" />
  </svg>
);
const PixelPlant = () => (
  <svg width="18" height="18" viewBox="0 0 10 10" style={{ imageRendering: "pixelated" }}>
    <rect x="3" y="0" width="1" height="3" fill="#7BC47F" />
    <rect x="5" y="1" width="1" height="3" fill="#7BC47F" />
    <rect x="4" y="2" width="2" height="3" fill="#9AD89E" />
    <rect x="3" y="6" width="4" height="3" fill="#E0A872" />
    <rect x="3" y="6" width="4" height="1" fill="#C88E5C" />
  </svg>
);
const PixelBook = () => (
  <svg width="18" height="18" viewBox="0 0 10 10" style={{ imageRendering: "pixelated" }}>
    <rect x="1" y="2" width="8" height="6" fill="#F4A7C3" />
    <rect x="1" y="2" width="8" height="1" fill="#E07AAC" />
    <rect x="4" y="2" width="1" height="6" fill="#fff" opacity="0.6" />
  </svg>
);
const PixelFrame = () => (
  <svg width="18" height="18" viewBox="0 0 10 10" style={{ imageRendering: "pixelated" }}>
    <rect x="1" y="1" width="8" height="8" fill="#A0B4E8" />
    <rect x="2" y="2" width="6" height="6" fill="#EAF2FF" />
    <rect x="3" y="5" width="4" height="2" fill="#9AD89E" />
    <rect x="4" y="3" width="2" height="2" fill="#FFE08A" />
  </svg>
);

const PANEL_ICONS = [PixelHeart, PixelExclaim, PixelCat, PixelRibbon];

const PANELS = [
  { id: "vitamins", label: "Vitamins" },
  { id: "morning", label: "Morning" },
  { id: "night", label: "Night" },
  { id: "habit", label: "Habit" },
];

const PANEL_META = {
  vitamins: { title: "💊 Vitamins / 약", color: "#E8F4FF", accent: "#7EC8E3", placeholder: "예) 비타민 D, 오메가3..." },
  morning: { title: "🌅 Morning Routine", color: "#EAF6FF", accent: "#89C4E1", placeholder: "예) 스트레칭 10분, 물 한 잔..." },
  night: { title: "🌙 Night Routine", color: "#EEF0FF", accent: "#A0B4E8", placeholder: "예) 스킨케어, 일기 쓰기..." },
  habit: { title: "💪 Habit Tracker", color: "#E8F8FF", accent: "#6BBFD8", placeholder: "예) 운동, 독서 30분..." },
};

const TABS = ["ALL", "IDEA", "TO DO", "MEMO", "WORK"];
const CAT_COLORS = {
  IDEA: { bg: "#D6EFFF", icon: "💡" },
  "TO DO": { bg: "#D6F0FF", icon: "✅" },
  MEMO: { bg: "#E0F4FF", icon: "📝" },
  WORK: { bg: "#D0E8FF", icon: "💼" },
};

const INIT_ITEMS = [
  { id: 1, category: "TO DO", text: "오늘 할 일 정리하기", done: false, photo: null },
  { id: 2, category: "IDEA", text: "새로운 아이디어 메모", done: false, photo: null },
  { id: 3, category: "MEMO", text: "중요한 메모 내용", done: false, photo: null },
  { id: 4, category: "WORK", text: "업무 관련 사항", done: false, photo: null },
];

const INIT_PANEL_ITEMS = {
  vitamins: ["비타민 D ☀️", "오메가3 🐟", "마그네슘 💎"],
  morning: ["물 한 잔 마시기 🥛", "스트레칭 10분 🧘", "오늘 할 일 확인 📋"],
  night: ["스킨케어 루틴 🧴", "내일 준비하기 🎒", "일기 쓰기 📖"],
  habit: ["하루 30분 운동 🏃", "독서 20분 📚", "물 2L 마시기 💧"],
};

const PAGES = [
  { id: "home", label: "HOME", mark: "⌂" },
  { id: "routine", label: "ROUTINE", mark: "✎" },
  { id: "calendar", label: "CALENDAR", mark: "▣" },
  { id: "memo", label: "MEMO", mark: "✐" },
  { id: "diary", label: "DIARY", mark: "✉" },
  { id: "board", label: "게시판", mark: "▤" },
  { id: "guestbook", label: "방명록", mark: "💌" },
];

// ── Fan personas (editable) ──────────────────────────────────────
const INIT_FANS = [
  { name: "별빛토끼", emoji: "🐰", color: "#FFD6E8" },
  { name: "구름사탕", emoji: "🍬", color: "#D6F0FF" },
  { name: "민트초코", emoji: "🍃", color: "#D6FFE8" },
  { name: "핑크달님", emoji: "🌙", color: "#FFE8F4" },
  { name: "반짝이별", emoji: "⭐", color: "#FFF8D6" },
  { name: "하늘보라", emoji: "🌸", color: "#EAD6FF" },
  { name: "솜사탕구름", emoji: "☁️", color: "#E8F4FF" },
  { name: "꿀벌이", emoji: "🐝", color: "#FFF3D6" },
  { name: "라벤더향기", emoji: "💜", color: "#F0E8FF" },
  { name: "햇살한조각", emoji: "☀️", color: "#FFF8E8" },
];

const MESSAGE_TEMPLATES = [
  "hyeoni 오늘도 너무 열심히 살고 있어! 항상 응원해 💕",
  "오늘 하루도 수고했어~ hyeoni 최고야!! ✨",
  "hyeoni 존재 자체가 반짝반짝 빛나~ 🌟",
  "오늘 루틴 다 했어? 대단하다 진짜!!! 🎉",
  "hyeoni의 플래너 너무 귀여워ㅠㅠ 부러워 💙",
  "오늘도 좋은 하루 보내!! 항상 행복했으면 좋겠어 🌷",
  "hyeoni야 밥은 먹었어? 잘 챙겨먹어!! 🍱",
  "세상에서 제일 열심히 사는 사람 시상식 1등 = hyeoni 🏆",
  "오늘 뽀모도로 얼마나 했어? 집중력 갓벽!! 👑",
  "hyeoni 파이팅!!! 오늘도 할 수 있어!!! 💪",
  "이 플래너 쓰는 거 보면 진짜 대단하다는 생각밖에 안 들어 🥹",
  "hyeoni 덕분에 나도 오늘 기운 얻었어! 고마워~~ 🩷",
  "자기 전에 오늘 수고한 hyeoni 칭찬해줘!! 정말 잘했어 🌙",
  "hyeoni 항상 이렇게 예쁘게 살아줘서 고마워 🌸",
  "ADHD여도 이렇게 열심히 하는 거 진짜 존경스러워 💎",
  "오늘 일기 썼어? hyeoni 일상 너무 궁금해!! 📖",
  "hyeoni야 지금 이 순간도 충분히 잘 하고 있어!! 🫶",
  "완벽하지 않아도 괜찮아~ 그냥 hyeoni면 충분해!! 💝",
  "오늘 비타민 먹었지?? 건강 챙겨!! 소중한 사람이니까 🌿",
  "hyeoni 화이팅!! 오늘도 눈부시게 빛나고 있어 ⭐",
  "방명록에 왔어!! 사랑해 hyeoni~ 항상 곁에 있을게 💌",
  "이 공간 너무 예뻐서 맨날 오고 싶어!! 😍",
  "hyeoni 목소리 상상만 해도 너무 귀여울 것 같아 🥰",
  "오늘 날씨 좋아!! hyeoni도 기분 좋은 하루 보내 ☀️",
  "hyeoni 팬 된 지 오래됐는데 아직도 설레~ 💓",
];

const INIT_BOARD_POSTS = [
  {
    id: 1,
    type: "owner",
    authorName: "hyeoni",
    text: "게시판을 새로 만들었어요! 하고 싶은 말이나 편지, 자유롭게 남겨주세요 🩵",
    photo: null,
    time: new Date(Date.now() - 1000 * 60 * 60 * 20),
    comments: [
      { id: 101, name: "별빛토끼", text: "드디어 게시판 생겼다!! 너무 좋아 🐰", time: new Date(Date.now() - 1000 * 60 * 60 * 18), isOwner: false },
      { id: 102, name: "hyeoni", text: "와줘서 고마워!! 자주 놀러와줘 💕", time: new Date(Date.now() - 1000 * 60 * 60 * 17), isOwner: true, parentId: 101 },
    ],
  },
];

function generateDailyMessages(profileName, date, fans) {
  const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
  const rng = (n) => { let x = Math.sin(seed + n) * 10000; return x - Math.floor(x); };
  const messages = [];
  for (let i = 0; i < 10; i++) {
    const fanIdx = Math.floor(rng(i * 3) * fans.length);
    const msgIdx = Math.floor(rng(i * 3 + 1) * MESSAGE_TEMPLATES.length);
    const minAgo = Math.floor(rng(i * 3 + 2) * 480);
    const fan = fans[fanIdx];
    const msg = MESSAGE_TEMPLATES[msgIdx].replace(/hyeoni/g, profileName);
    const time = new Date(date);
    time.setHours(8 + Math.floor(minAgo / 60), minAgo % 60, 0, 0);
    messages.push({ id: `auto-${seed}-${i}`, fan, msg, time });
  }
  return messages.sort((a, b) => b.time - a.time);
}

function useTimer(focusMins, breakMins) {
  const [phase, setPhase] = useState("idle");
  const [remaining, setRemaining] = useState(focusMins * 60);
  const [isFocus, setIsFocus] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (phase === "idle" || phase === "paused") { clearInterval(intervalRef.current); return; }
    intervalRef.current = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) { clearInterval(intervalRef.current); const next = !isFocus; setIsFocus(next); setPhase("idle"); return next ? breakMins * 60 : focusMins * 60; }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [phase]);

  const start = () => setPhase("focus");
  const pause = () => setPhase("paused");
  const resume = () => setPhase("focus");
  const reset = () => { clearInterval(intervalRef.current); setPhase("idle"); setIsFocus(true); setRemaining(focusMins * 60); };
  useEffect(() => { if (phase === "idle") setRemaining(isFocus ? focusMins * 60 : breakMins * 60); }, [focusMins, breakMins]);
  return { phase, remaining, isFocus, start, pause, resume, reset };
}

function pad(n) { return String(n).padStart(2, "0"); }

function readFileAsDataURL(file, cb) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => cb(reader.result);
  reader.readAsDataURL(file);
}

export default function HyeoniSpace() {
  const [now, setNow] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(t); }, []);
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const dateStr = `${now.getMonth() + 1}월 ${now.getDate()}일 (${weekdays[now.getDay()]})`;
  const todayKey = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;

  const [visitorCount] = useState(() => 1000 + Math.floor(Math.random() * 900));
  const [page, setPage] = useState("home");

  const [profileName, setProfileName] = useState("hyeoni");
  const [editingName, setEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState("hyeoni");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const profilePhotoRef = useRef(null);
  const startEditName = () => { setNameDraft(profileName); setEditingName(true); };
  const saveName = () => { const t = nameDraft.trim(); if (t) setProfileName(t); setEditingName(false); };

  // ── Theme music tag (small label next to the name, this site's theme song) ──
  const [themeMusic, setThemeMusic] = useState("Butterfly");
  const [editingTheme, setEditingTheme] = useState(false);
  const [themeDraft, setThemeDraft] = useState("Butterfly");
  const startEditTheme = () => { setThemeDraft(themeMusic); setEditingTheme(true); };
  const saveTheme = () => { const t = themeDraft.trim(); if (t) setThemeMusic(t); setEditingTheme(false); };

  const [activePanel, setActivePanel] = useState(null);
  const [panelItems, setPanelItems] = useState(INIT_PANEL_ITEMS);
  const [panelChecked, setPanelChecked] = useState({ vitamins: [], morning: [], night: [], habit: [] });
  const [panelInput, setPanelInput] = useState("");
  const [panelEditIdx, setPanelEditIdx] = useState(null);
  const [panelEditText, setPanelEditText] = useState("");
  const [showRoutineHistory, setShowRoutineHistory] = useState(false);
  const [lastRoutineDate, setLastRoutineDate] = useState(todayKey);
  const [routineHistory, setRoutineHistory] = useState([]);

  useEffect(() => {
    if (todayKey !== lastRoutineDate) {
      const summary = PANELS.map((p) => ({ id: p.id, title: PANEL_META[p.id].title, total: panelItems[p.id].length, done: panelChecked[p.id].length }));
      setRoutineHistory((prev) => [{ date: lastRoutineDate, summary }, ...prev].slice(0, 30));
      setPanelChecked({ vitamins: [], morning: [], night: [], habit: [] });
      setLastRoutineDate(todayKey);
    }
  }, [todayKey]);

  const [activeTab, setActiveTab] = useState("ALL");
  const [items, setItems] = useState(INIT_ITEMS);
  const [nextId, setNextId] = useState(5);
  const [memoInput, setMemoInput] = useState("");
  const [memoCategory, setMemoCategory] = useState("MEMO");
  const [memoPhoto, setMemoPhoto] = useState(null);
  const memoFileRef = useRef(null);
  const [editingId, setEditingId] = useState(null);
  const [editCat, setEditCat] = useState("");
  const [editingTextId, setEditingTextId] = useState(null);
  const [editTextDraft, setEditTextDraft] = useState("");
  const [lightboxImg, setLightboxImg] = useState(null);

  const [focusMins, setFocusMins] = useState(25);
  const [breakMins, setBreakMins] = useState(5);
  const [showPomoCfg, setShowPomoCfg] = useState(false);
  const [tmpFocus, setTmpFocus] = useState(25);
  const [tmpBreak, setTmpBreak] = useState(5);
  const { phase, remaining, isFocus, start, pause, resume, reset } = useTimer(focusMins, breakMins);

  const [calYear, setCalYear] = useState(now.getFullYear());
  const [calMonth, setCalMonth] = useState(now.getMonth());
  const [calNotes, setCalNotes] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [calInput, setCalInput] = useState("");
  const [calEditIdx, setCalEditIdx] = useState(null);
  const [calEditText, setCalEditText] = useState("");

  const [diaryEntries, setDiaryEntries] = useState([]);
  const [diaryInput, setDiaryInput] = useState("");
  const [diaryPhoto, setDiaryPhoto] = useState(null);
  const diaryFileRef = useRef(null);
  const [editingDiaryId, setEditingDiaryId] = useState(null);
  const [editingDiaryText, setEditingDiaryText] = useState("");

  // ── Board (게시판): owner posts / fan letters + comments + owner replies ──
  const [boardPosts, setBoardPosts] = useState(INIT_BOARD_POSTS);
  const [nextBoardId, setNextBoardId] = useState(2);
  const [composerMode, setComposerMode] = useState("owner"); // "owner" | "fan"
  const [boardAuthorName, setBoardAuthorName] = useState("");
  const [boardInput, setBoardInput] = useState("");
  const [boardPhoto, setBoardPhoto] = useState(null);
  const boardFileRef = useRef(null);
  const [expandedPostId, setExpandedPostId] = useState(INIT_BOARD_POSTS[0]?.id ?? null);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editingPostText, setEditingPostText] = useState("");
  const [commentDrafts, setCommentDrafts] = useState({});
  const [replyDraftFor, setReplyDraftFor] = useState(null);
  const [replyText, setReplyText] = useState("");

  const addBoardPost = () => {
    const t = boardInput.trim();
    if (!t && !boardPhoto) return;
    const author = composerMode === "owner" ? profileName : (boardAuthorName.trim() || "익명의 팬");
    setBoardPosts((p) => [{ id: nextBoardId, type: composerMode, authorName: author, text: t, photo: boardPhoto, time: new Date(), comments: [] }, ...p]);
    setNextBoardId((n) => n + 1);
    setBoardInput(""); setBoardPhoto(null); setBoardAuthorName("");
    if (boardFileRef.current) boardFileRef.current.value = "";
  };
  const deleteBoardPost = (id) => setBoardPosts((p) => p.filter((post) => post.id !== id));
  const startEditPost = (post) => { setEditingPostId(post.id); setEditingPostText(post.text); };
  const saveEditPost = (id) => { const t = editingPostText.trim(); setBoardPosts((p) => p.map((post) => (post.id === id ? { ...post, text: t } : post))); setEditingPostId(null); };
  const updateCommentDraft = (postId, field, value) => setCommentDrafts((p) => ({ ...p, [postId]: { ...p[postId], [field]: value } }));
  const addComment = (postId) => {
    const draft = commentDrafts[postId] || {};
    const text = (draft.text || "").trim();
    if (!text) return;
    const name = (draft.name || "").trim() || "익명의 방문자";
    setBoardPosts((p) => p.map((post) => (post.id === postId ? { ...post, comments: [...post.comments, { id: Date.now(), name, text, time: new Date(), isOwner: false }] } : post)));
    setCommentDrafts((p) => ({ ...p, [postId]: { name: "", text: "" } }));
  };
  const startReply = (commentId) => { setReplyDraftFor(commentId); setReplyText(""); };
  const cancelReply = () => { setReplyDraftFor(null); setReplyText(""); };
  const addOwnerReply = (postId, commentId) => {
    const t = replyText.trim();
    if (!t) return;
    setBoardPosts((p) => p.map((post) => (post.id === postId ? { ...post, comments: [...post.comments, { id: Date.now(), name: profileName, text: t, time: new Date(), isOwner: true, parentId: commentId }] } : post)));
    setReplyDraftFor(null); setReplyText("");
  };
  const deleteComment = (postId, commentId) => setBoardPosts((p) => p.map((post) => (post.id === postId ? { ...post, comments: post.comments.filter((c) => c.id !== commentId) } : post)));
  const formatBoardTime = (t) => { const d = new Date(t); return `${d.getMonth() + 1}/${d.getDate()} ${pad(d.getHours())}:${pad(d.getMinutes())}`; };
  const totalComments = boardPosts.reduce((a, p) => a + p.comments.length, 0);

  // ── Guestbook ──
  const [gbEntries, setGbEntries] = useState([]);
  const [gbInput, setGbInput] = useState("");
  const [gbName, setGbName] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [gbNotif, setGbNotif] = useState(null);

  // ── Fan personas (editable) ──
  const [fans, setFans] = useState(INIT_FANS);
  const [editingFanIdx, setEditingFanIdx] = useState(null);
  const [fanNameDraft, setFanNameDraft] = useState("");
  const [showAllFans, setShowAllFans] = useState(false);
  const startEditFan = (idx, currentName) => { setEditingFanIdx(idx); setFanNameDraft(currentName); };
  const saveFanName = (idx) => {
    const t = fanNameDraft.trim();
    if (t) setFans(p => p.map((f, i) => i === idx ? { ...f, name: t } : f));
    setEditingFanIdx(null);
  };

  // Generate today's fan messages on mount / profileName / fans change
  const [aiMessages, setAiMessages] = useState([]);
  useEffect(() => {
    setAiMessages(generateDailyMessages(profileName, now, fans));
  }, [profileName, fans]);

  const allGbEntries = [...gbEntries, ...aiMessages].sort((a, b) => new Date(b.time) - new Date(a.time));

  const generateNewMessage = async () => {
    setIsGenerating(true);
    try {
      const fan = fans[Math.floor(Math.random() * fans.length)];
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `당신은 "${fan.name}"이라는 귀여운 팬이에요. "${profileName}"라는 사람의 블로그 방명록에 귀여운 한국어 응원 메시지를 딱 1개 남겨주세요. 
규칙:
- 2~3문장으로 짧고 귀엽게
- 이모지 2~3개 포함
- ${profileName} 이름을 한 번 언급
- 따뜻하고 진심 어린 응원의 말
- 친근한 반말 사용
- 메시지만 출력 (다른 말 없이)`
          }]
        })
      });
      const data = await response.json();
      const msg = data.content?.[0]?.text?.trim() || "오늘도 화이팅!! 💕";
      const newEntry = { id: `gen-${Date.now()}`, fan, msg, time: new Date(), isAI: true };
      setAiMessages(prev => [newEntry, ...prev]);
      setGbNotif(`${fan.emoji} ${fan.name}님이 방명록을 남겼어요!`);
      setTimeout(() => setGbNotif(null), 3000);
    } catch (e) {
      setGbNotif("메시지를 불러오지 못했어요 😢");
      setTimeout(() => setGbNotif(null), 2000);
    }
    setIsGenerating(false);
  };

  const sendGuestbook = () => {
    const t = gbInput.trim();
    if (!t) return;
    const name = gbName.trim() || "익명의 방문자";
    setGbEntries(prev => [{ id: `user-${Date.now()}`, fan: { name, emoji: "✍️", color: "#F0F8FF" }, msg: t, time: new Date(), isAI: false }, ...prev]);
    setGbInput("");
    setGbName("");
  };

  // helpers
  const togglePanelCheck = (pid, idx) => setPanelChecked((p) => ({ ...p, [pid]: p[pid].includes(idx) ? p[pid].filter((i) => i !== idx) : [...p[pid], idx] }));
  const addPanelItem = (pid) => { const t = panelInput.trim(); if (!t) return; setPanelItems((p) => ({ ...p, [pid]: [...p[pid], t] })); setPanelInput(""); };
  const delPanelItem = (pid, idx) => { setPanelItems((p) => ({ ...p, [pid]: p[pid].filter((_, i) => i !== idx) })); setPanelChecked((p) => ({ ...p, [pid]: p[pid].filter((i) => i !== idx).map((i) => (i > idx ? i - 1 : i)) })); };
  const startPanelEdit = (idx, text) => { setPanelEditIdx(idx); setPanelEditText(text); };
  const savePanelEdit = (pid) => {
    const t = panelEditText.trim();
    if (t) setPanelItems((p) => ({ ...p, [pid]: p[pid].map((it, i) => (i === panelEditIdx ? t : it)) }));
    setPanelEditIdx(null);
  };

  const filtered = activeTab === "ALL" ? items : items.filter((i) => i.category === activeTab);
  const sendMemo = () => { const t = memoInput.trim(); if (!t && !memoPhoto) return; setItems((p) => [...p, { id: nextId, category: memoCategory, text: t, done: false, photo: memoPhoto }]); setNextId((n) => n + 1); setMemoInput(""); setMemoPhoto(null); if (memoFileRef.current) memoFileRef.current.value = ""; };
  const toggleDone = (id) => setItems((p) => p.map((i) => (i.id === id ? { ...i, done: !i.done } : i)));
  const deleteItem = (id) => setItems((p) => p.filter((i) => i.id !== id));
  const saveEdit = (id) => { setItems((p) => p.map((i) => (i.id === id ? { ...i, category: editCat } : i))); setEditingId(null); };
  const startEditText = (item) => { setEditingTextId(item.id); setEditTextDraft(item.text); };
  const saveEditText = (id) => {
    const t = editTextDraft.trim();
    if (t) setItems((p) => p.map((i) => (i.id === id ? { ...i, text: t } : i)));
    setEditingTextId(null);
  };

  const applyPomo = () => { setFocusMins(tmpFocus); setBreakMins(tmpBreak); reset(); setShowPomoCfg(false); };
  const mm = Math.floor(remaining / 60), ss = remaining % 60;
  const total = isFocus ? focusMins * 60 : breakMins * 60;
  const pct = ((total - remaining) / total) * 100;

  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  const calKey = (d) => `${calYear}-${pad(calMonth + 1)}-${pad(d)}`;
  const addCalNote = () => { if (!selectedDay || !calInput.trim()) return; const k = calKey(selectedDay); setCalNotes((p) => ({ ...p, [k]: [...(p[k] || []), { text: calInput.trim(), done: false }] })); setCalInput(""); };
  const toggleCalNote = (k, idx) => setCalNotes((p) => ({ ...p, [k]: p[k].map((n, i) => (i === idx ? { ...n, done: !n.done } : n)) }));
  const delCalNote = (k, idx) => setCalNotes((p) => ({ ...p, [k]: p[k].filter((_, i) => i !== idx) }));
  const startCalEdit = (idx, text) => { setCalEditIdx(idx); setCalEditText(text); };
  const saveCalEdit = (k) => {
    const t = calEditText.trim();
    if (t) setCalNotes((p) => ({ ...p, [k]: p[k].map((n, i) => (i === calEditIdx ? { ...n, text: t } : n)) }));
    setCalEditIdx(null);
  };
  const isToday = (d) => d === now.getDate() && calMonth === now.getMonth() && calYear === now.getFullYear();

  const addDiaryEntry = () => { const t = diaryInput.trim(); if (!t && !diaryPhoto) return; setDiaryEntries((p) => [{ id: Date.now(), text: t, time: new Date(), photo: diaryPhoto }, ...p]); setDiaryInput(""); setDiaryPhoto(null); if (diaryFileRef.current) diaryFileRef.current.value = ""; };
  const deleteDiaryEntry = (id) => setDiaryEntries((p) => p.filter((e) => e.id !== id));
  const startDiaryEdit = (entry) => { setEditingDiaryId(entry.id); setEditingDiaryText(entry.text); };
  const saveDiaryEdit = (id) => {
    const t = editingDiaryText.trim();
    setDiaryEntries((p) => p.map((e) => (e.id === id ? { ...e, text: t } : e)));
    setEditingDiaryId(null);
  };
  const formatDiaryTime = (d) => `${d.getMonth() + 1}/${d.getDate()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;

  const todoTotal = items.length, todoDone = items.filter((i) => i.done).length;
  const routineTotal = Object.values(panelItems).reduce((a, arr) => a + arr.length, 0);
  const routineDone = Object.values(panelChecked).reduce((a, arr) => a + arr.length, 0);
  const latestDiary = diaryEntries[0];

  const formatGbTime = (t) => {
    const d = new Date(t);
    return `${d.getMonth() + 1}/${d.getDate()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  return (
    <div style={s.page}>
      <style>{`
        @font-face { font-family: 'DungGeunMo'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/DungGeunMo.woff') format('woff'); font-weight: normal; font-display: swap; }
        .hp-root, .hp-root input, .hp-root textarea, .hp-root select, .hp-root button { font-family: 'DungGeunMo', 'Courier New', monospace !important; }
        .hp-scroll::-webkit-scrollbar { width:6px; }
        .hp-scroll::-webkit-scrollbar-thumb { background:#B8DCEF; border-radius:4px; }
        .hp-navbtn:hover { background:#CDE9F8 !important; }
        .hp-navbtn.active:hover { background:#7EC8E3 !important; }
        .hp-photobtn:hover { background:#F4A7C3 !important; color:#fff !important; }
        .gb-gen-btn:hover { opacity:0.85; transform:scale(1.02); }
        @keyframes fanPop { 0%{opacity:0;transform:translateY(12px) scale(0.95)} 100%{opacity:1;transform:translateY(0) scale(1)} }
        .gb-fan-entry { animation: fanPop 0.35s ease; }
        @keyframes notifSlide { 0%{opacity:0;transform:translateY(-20px)} 100%{opacity:1;transform:translateY(0)} }
        .gb-notif { animation: notifSlide 0.3s ease; }
        @media (max-width: 760px) { .hp-body { flex-direction: column !important; } .hp-sidebar { width: 100% !important; flex-direction: row !important; flex-wrap: wrap; align-items: center !important; } .hp-sidebar-profile { width: 100% !important; } .hp-navlist { flex-direction: row !important; flex-wrap: wrap; width: 100% !important; } .hp-shelf { display: none !important; } }
      `}</style>

      {/* Toast notification */}
      {gbNotif && (
        <div className="gb-notif" style={{ position: "fixed", top: 20, right: 20, background: "#fff", border: "1.5px solid #F4A7C3", borderRadius: 12, padding: "10px 16px", fontSize: 13, color: "#C06090", boxShadow: "0 4px 16px rgba(244,167,195,0.3)", zIndex: 9999, fontFamily: "monospace" }}>
          {gbNotif}
        </div>
      )}

      <div className="hp-root" style={s.frame}>
        <div className="hp-body" style={s.body}>
          <aside className="hp-sidebar" style={s.sidebar}>
            <div className="hp-sidebar-profile" style={s.profileBox}>
              <input ref={profilePhotoRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => readFileAsDataURL(e.target.files[0], setProfilePhoto)} />
              <button onClick={() => profilePhotoRef.current?.click()} title="프로필 사진 변경" style={{ ...s.profileBadge, backgroundImage: profilePhoto ? `url(${profilePhoto})` : undefined }}>
                {!profilePhoto && <PixelHeart color="#fff" size={32} />}
              </button>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, flexWrap: "wrap" }}>
                  {editingName ? (
                    <input autoFocus value={nameDraft} onChange={(e) => setNameDraft(e.target.value)} onBlur={saveName} onKeyDown={(e) => e.key === "Enter" && saveName()} style={s.nameInput} />
                  ) : (
                    <div style={s.profileName} onClick={startEditName} title="클릭해서 이름 변경">{profileName} ♡ ✏️</div>
                  )}
                  {editingTheme ? (
                    <input autoFocus value={themeDraft} onChange={(e) => setThemeDraft(e.target.value)} onBlur={saveTheme} onKeyDown={(e) => e.key === "Enter" && saveTheme()} style={s.themeInput} placeholder="테마 음악" />
                  ) : (
                    <span style={s.themeTag} onClick={startEditTheme} title="클릭해서 테마 음악 변경">♪ {themeMusic}</span>
                  )}
                </div>
                <div style={s.profileSub}>{dateStr}</div>
              </div>
            </div>
            <div style={s.sidebarDivider} />
            <nav className="hp-navlist" style={s.navList}>
              {PAGES.map((p) => (
                <button key={p.id} className={`hp-navbtn${page === p.id ? " active" : ""}`} onClick={() => setPage(p.id)}
                  style={{ ...s.navBtn, background: page === p.id ? "#7EC8E3" : "transparent", color: page === p.id ? "#fff" : "#3A7A9C", fontWeight: page === p.id ? 700 : 400 }}>
                  <span style={{ opacity: 0.8, marginRight: 6 }}>{p.mark}</span>{p.label}
                  {p.id === "board" && <span style={{ marginLeft: "auto", background: "#7EC8E3", color: "#fff", borderRadius: 8, fontSize: 10, padding: "1px 5px" }}>{boardPosts.length}</span>}
                  {p.id === "guestbook" && <span style={{ marginLeft: "auto", background: "#F4A7C3", color: "#fff", borderRadius: 8, fontSize: 10, padding: "1px 5px" }}>{allGbEntries.length}</span>}
                </button>
              ))}
            </nav>
            <div style={s.sidebarDivider} />
            <div className="hp-shelf" style={s.shelfRow}>
              <PixelLamp /><PixelPlant /><PixelBook /><PixelFrame />
            </div>
            <div style={s.visitorBadge}>오늘 다녀간 사람 ⊹ {visitorCount}명</div>
          </aside>

          <main className="hp-scroll" style={s.content}>

            {/* HOME */}
            {page === "home" && (
              <div style={s.homeWrap}>
                <div style={s.homeHero}>
                  <div style={s.homeGreeting}>안녕, {profileName}! 오늘도 좋은 하루 ⋆⁺</div>
                  <div style={s.homeClock}>{pad(now.getHours())}:{pad(now.getMinutes())}:{pad(now.getSeconds())}</div>
                  <div style={s.homeDate}>{dateStr}</div>
                </div>
                <div style={s.statRow}>
                  <button style={s.statTile} onClick={() => setPage("memo")}><div style={s.statNum}>{todoDone}/{todoTotal}</div><div style={s.statLabel}>오늘 메모 완료</div></button>
                  <button style={s.statTile} onClick={() => setPage("routine")}><div style={s.statNum}>{routineDone}/{routineTotal}</div><div style={s.statLabel}>루틴 체크</div></button>
                  <button style={s.statTile} onClick={() => setPage("guestbook")}><div style={s.statNum}>{allGbEntries.length}</div><div style={s.statLabel}>응원 메시지 💌</div></button>
                </div>

                {/* Latest fan message preview on home */}
                {aiMessages[0] && (
                  <div style={{ ...s.homeDiaryPreview, borderLeft: "3px solid #F4A7C3" }}>
                    <div style={s.homeSectionLabel}>💌 오늘의 팬 메시지</div>
                    <div style={s.quoteCard}>
                      <div style={{ fontSize: 11, color: "#C097B0", marginBottom: 4, fontFamily: "monospace" }}>{aiMessages[0].fan.emoji} {aiMessages[0].fan.name}</div>
                      <div style={s.quoteText}>"{aiMessages[0].msg}"</div>
                    </div>
                    <button style={s.homeLinkBtn} onClick={() => setPage("guestbook")}>방명록 전체 보기 →</button>
                  </div>
                )}

                <div style={s.homeDiaryPreview}>
                  <div style={s.homeSectionLabel}>✉ 최근 끄적임</div>
                  {latestDiary ? (
                    <div style={s.quoteCard}>
                      {latestDiary.photo && <img src={latestDiary.photo} style={s.quoteImg} alt="" />}
                      <div style={s.quoteText}>"{latestDiary.text}"</div>
                      <div style={s.quoteTime}>{formatDiaryTime(latestDiary.time)}</div>
                    </div>
                  ) : <div style={s.empty}>아직 끄적인 게 없어요. DIARY 메뉴에서 가볍게 적어보세요 ✏️</div>}
                  <button style={s.homeLinkBtn} onClick={() => setPage("diary")}>다이어리 보러가기 →</button>
                </div>
                <div style={s.homeSectionLabel}>✎ 바로가기</div>
                <div style={s.shortcutRow}>
                  <button style={s.shortcutBtn} onClick={() => setPage("routine")}>ROUTINE</button>
                  <button style={s.shortcutBtn} onClick={() => setPage("board")}>게시판 ▤</button>
                  <button style={s.shortcutBtn} onClick={() => setPage("guestbook")}>방명록 💌</button>
                </div>
              </div>
            )}

            {/* ROUTINE */}
            {page === "routine" && (
              <div style={s.routineWrap}>
                <div style={s.card}>
                  <div style={s.cardBar}>
                    <span style={s.dot} /><span style={s.cardBarTitle}>ROUTINE · 매일 자정에 새로 갱신돼요</span>
                    <button onClick={() => setShowRoutineHistory((v) => !v)} style={s.closeBtn} title="기록 보기">📜</button>
                  </div>
                  {showRoutineHistory && (
                    <div style={s.historyPanel}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "#5A9FBF", marginBottom: 6 }}>지난 루틴 기록</div>
                      {routineHistory.length === 0 && <div style={s.empty}>아직 쌓인 기록이 없어요 🌙</div>}
                      <div className="hp-scroll" style={{ maxHeight: 180, overflowY: "auto", display: "flex", flexDirection: "column", gap: 6 }}>
                        {routineHistory.map((h, i) => (
                          <div key={i} style={s.historyRow}>
                            <div style={{ fontSize: 11.5, color: "#4A9ABF", fontWeight: 700, marginBottom: 3 }}>{h.date}</div>
                            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                              {h.summary.map((sm) => <span key={sm.id} style={s.historyBadge}>{sm.title.split(" ")[0]} {sm.done}/{sm.total}</span>)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div style={s.panelIconRow}>
                    {PANELS.map((p, i) => { const Icon = PANEL_ICONS[i]; return (
                      <button key={p.id} onClick={() => { setActivePanel(activePanel === p.id ? null : p.id); setPanelInput(""); setPanelEditIdx(null); }}
                        style={{ ...s.iconBtn, background: activePanel === p.id ? "#C8E8F8" : "#F0F8FF", border: activePanel === p.id ? "1.5px solid #7EC8E3" : "1.5px solid #C0DFF0" }} title={p.label}>
                        <Icon />
                      </button>
                    ); })}
                  </div>
                  {activePanel ? (() => {
                    const meta = PANEL_META[activePanel]; const list = panelItems[activePanel]; const checked = panelChecked[activePanel];
                    return (
                      <div style={{ background: meta.color, borderRadius: 10, margin: "0 10px 10px" }}>
                        <div style={s.panelSubBar}><span style={{ fontSize: 12, fontWeight: 700, color: "#5A9FBF" }}>{meta.title}</span><button onClick={() => setActivePanel(null)} style={s.closeBtn}>✕</button></div>
                        <div className="hp-scroll" style={s.panelList}>
                          {list.length === 0 && <div style={s.empty}>항목을 추가해보세요 🩵</div>}
                          {list.map((item, idx) => (
                            <div key={idx} style={s.panelRow}>
                              <input type="checkbox" checked={checked.includes(idx)} onChange={() => togglePanelCheck(activePanel, idx)} style={s.checkbox} />
                              {panelEditIdx === idx ? (
                                <input
                                  autoFocus
                                  value={panelEditText}
                                  onChange={(e) => setPanelEditText(e.target.value)}
                                  onBlur={() => savePanelEdit(activePanel)}
                                  onKeyDown={(e) => e.key === "Enter" && savePanelEdit(activePanel)}
                                  style={{ ...s.textInput, flex: 1, padding: "3px 6px", fontSize: 13 }}
                                />
                              ) : (
                                <span
                                  style={{ ...s.panelText, textDecoration: checked.includes(idx) ? "line-through" : "none", color: checked.includes(idx) ? "#A0C8DC" : "#3A7A9C", cursor: "pointer" }}
                                  onClick={() => startPanelEdit(idx, item)}
                                  title="클릭해서 수정"
                                >{item}</span>
                              )}
                              {panelEditIdx !== idx && <button onClick={() => startPanelEdit(idx, item)} style={s.editBtn} title="수정">✏️</button>}
                              <button onClick={() => delPanelItem(activePanel, idx)} style={s.deleteBtn}>×</button>
                            </div>
                          ))}
                        </div>
                        <div style={s.inputRow}>
                          <input style={s.textInput} placeholder={meta.placeholder} value={panelInput} onChange={(e) => setPanelInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addPanelItem(activePanel)} />
                          <button onClick={() => addPanelItem(activePanel)} style={{ ...s.sendBtn, background: meta.accent }}>ADD</button>
                        </div>
                      </div>
                    );
                  })() : <div style={s.panelPlaceholder}>아이콘을 눌러서<br />루틴을 확인해보세요 🩵</div>}
                </div>
                <div style={s.card}>
                  <div style={s.cardBar}>
                    <span style={s.dot} /><span style={s.cardBarTitle}>🍅 POMODORO</span>
                    <button onClick={() => { setTmpFocus(focusMins); setTmpBreak(breakMins); setShowPomoCfg((v) => !v); }} style={s.closeBtn}>⚙</button>
                  </div>
                  {showPomoCfg && (
                    <div style={s.pomoCfgRow}>
                      <label style={s.cfgLabel}>집중<input type="number" min={1} max={99} value={tmpFocus} onChange={(e) => setTmpFocus(Number(e.target.value))} style={s.cfgInput} />분</label>
                      <label style={s.cfgLabel}>휴식<input type="number" min={1} max={99} value={tmpBreak} onChange={(e) => setTmpBreak(Number(e.target.value))} style={s.cfgInput} />분</label>
                      <button onClick={applyPomo} style={{ ...s.sendBtn, padding: "4px 12px", fontSize: 12 }}>적용</button>
                    </div>
                  )}
                  <div style={s.pomoBody}>
                    <div style={{ fontSize: 12, color: isFocus ? "#4A9ABF" : "#A0B4E8", fontWeight: 600 }}>{phase === "idle" ? (isFocus ? "집중 준비" : "휴식 준비") : isFocus ? "🎯 집중 중" : "☕ 휴식 중"}</div>
                    <div style={{ position: "relative", width: 84, height: 84 }}>
                      <svg width="84" height="84" style={{ transform: "rotate(-90deg)" }}>
                        <circle cx="42" cy="42" r="35" fill="none" stroke="#D8EEF8" strokeWidth="7" />
                        <circle cx="42" cy="42" r="35" fill="none" stroke={isFocus ? "#7EC8E3" : "#A0B4E8"} strokeWidth="7" strokeDasharray={`${2 * Math.PI * 35}`} strokeDashoffset={`${2 * Math.PI * 35 * (1 - pct / 100)}`} strokeLinecap="round" style={{ transition: "stroke-dashoffset 1s linear" }} />
                      </svg>
                      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, fontWeight: 700, color: "#4A9ABF" }}>{pad(mm)}:{pad(ss)}</div>
                    </div>
                    <div style={{ display: "flex", gap: 6 }}>
                      {phase === "idle" && <button onClick={start} style={s.pomoBtn}>▶ 시작</button>}
                      {phase === "focus" && <button onClick={pause} style={s.pomoBtn}>⏸ 정지</button>}
                      {phase === "paused" && <button onClick={resume} style={s.pomoBtn}>▶ 재개</button>}
                      <button onClick={reset} style={{ ...s.pomoBtn, background: "#C8DCE8" }}>↺</button>
                    </div>
                    <div style={{ fontSize: 11, color: "#90BFDC" }}>집중 {focusMins}분 · 휴식 {breakMins}분</div>
                  </div>
                </div>
              </div>
            )}

            {/* CALENDAR */}
            {page === "calendar" && (
              <div style={s.card}>
                <div style={s.cardBar}>
                  <span style={s.dot} />
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1 }}>
                    <button onClick={() => { if (calMonth === 0) { setCalMonth(11); setCalYear((y) => y - 1); } else setCalMonth((m) => m - 1); setSelectedDay(null); }} style={s.calNavBtn}>‹</button>
                    <span style={{ ...s.cardBarTitle, flex: 1, textAlign: "center" }}>{calYear}년 {calMonth + 1}월</span>
                    <button onClick={() => { if (calMonth === 11) { setCalMonth(0); setCalYear((y) => y + 1); } else setCalMonth((m) => m + 1); setSelectedDay(null); }} style={s.calNavBtn}>›</button>
                  </div>
                </div>
                <div style={{ padding: "10px 10px 4px" }}>
                  <div style={s.calGrid}>
                    {["일", "월", "화", "수", "목", "금", "토"].map((d) => <div key={d} style={{ ...s.calCell, color: "#90BFDC", fontWeight: 700, fontSize: 11 }}>{d}</div>)}
                    {cells.map((d, i) => { const k = d ? calKey(d) : null; const hasNote = d && calNotes[k]?.length > 0; return (
                      <div key={i} onClick={() => { if (d) { setSelectedDay(selectedDay === d ? null : d); setCalEditIdx(null); } }}
                        style={{ ...s.calCell, background: d && selectedDay === d ? "#B8E0F4" : isToday(d) ? "#DFF0FA" : "transparent", borderRadius: 6, cursor: d ? "pointer" : "default", border: d && selectedDay === d ? "1.5px solid #7EC8E3" : "1.5px solid transparent", color: isToday(d) ? "#4A9ABF" : "#3A6080", fontWeight: isToday(d) ? 700 : 400, position: "relative" }}>
                        {d}
                        {hasNote && <div style={{ position: "absolute", bottom: 2, left: "50%", transform: "translateX(-50%)", width: 4, height: 4, borderRadius: "50%", background: "#7EC8E3" }} />}
                      </div>
                    ); })}
                  </div>
                </div>
                {selectedDay && (
                  <div style={s.calNotePanel}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#5A9FBF", marginBottom: 6 }}>{calMonth + 1}월 {selectedDay}일 일정</div>
                    <div className="hp-scroll" style={{ maxHeight: 140, overflowY: "auto" }}>
                      {(calNotes[calKey(selectedDay)] || []).map((n, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                          <input type="checkbox" checked={n.done} onChange={() => toggleCalNote(calKey(selectedDay), i)} style={s.checkbox} />
                          {calEditIdx === i ? (
                            <input
                              autoFocus
                              value={calEditText}
                              onChange={(e) => setCalEditText(e.target.value)}
                              onBlur={() => saveCalEdit(calKey(selectedDay))}
                              onKeyDown={(e) => e.key === "Enter" && saveCalEdit(calKey(selectedDay))}
                              style={{ ...s.textInput, flex: 1, fontSize: 12, padding: "3px 6px" }}
                            />
                          ) : (
                            <span style={{ flex: 1, fontSize: 12, color: n.done ? "#A0C0D8" : "#3A6080", textDecoration: n.done ? "line-through" : "none", cursor: "pointer" }} onClick={() => startCalEdit(i, n.text)} title="클릭해서 수정">{n.text}</span>
                          )}
                          {calEditIdx !== i && <button onClick={() => startCalEdit(i, n.text)} style={s.editBtn} title="수정">✏️</button>}
                          <button onClick={() => delCalNote(calKey(selectedDay), i)} style={s.deleteBtn}>×</button>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
                      <input style={{ ...s.textInput, fontSize: 12 }} placeholder="일정 추가..." value={calInput} onChange={(e) => setCalInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addCalNote()} />
                      <button onClick={addCalNote} style={{ ...s.sendBtn, padding: "5px 10px", fontSize: 12 }}>ADD</button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* MEMO */}
            {page === "memo" && (
              <div style={s.card}>
                <div style={s.tabRow}>
                  {TABS.map((tab) => <button key={tab} onClick={() => setActiveTab(tab)} style={{ ...s.tab, ...(activeTab === tab ? s.tabActive : {}) }}>{tab}</button>)}
                </div>
                <div className="hp-scroll" style={s.itemList}>
                  {filtered.length === 0 && <div style={s.empty}>메모가 없어요 🩵</div>}
                  {filtered.map((item) => (
                    <div key={item.id} style={s.itemRow}>
                      <div style={{ ...s.catBadge, background: CAT_COLORS[item.category]?.bg || "#D6EFFF" }}>{CAT_COLORS[item.category]?.icon || "📌"}</div>
                      <input type="checkbox" checked={item.done} onChange={() => toggleDone(item.id)} style={s.checkbox} />
                      {item.photo && <img src={item.photo} alt="" style={s.itemThumb} onClick={() => setLightboxImg(item.photo)} />}
                      {editingTextId === item.id ? (
                        <input
                          autoFocus
                          value={editTextDraft}
                          onChange={(e) => setEditTextDraft(e.target.value)}
                          onBlur={() => saveEditText(item.id)}
                          onKeyDown={(e) => e.key === "Enter" && saveEditText(item.id)}
                          style={{ ...s.textInput, flex: 1, fontSize: 13, padding: "3px 6px" }}
                        />
                      ) : (
                        <span
                          style={{ ...s.itemText, textDecoration: item.done ? "line-through" : "none", color: item.done ? "#A0C0D8" : "#3A6080", cursor: "pointer" }}
                          onClick={() => startEditText(item)}
                          title="클릭해서 수정"
                        >{item.text}</span>
                      )}
                      {editingId === item.id ? (
                        <select value={editCat} onChange={(e) => setEditCat(e.target.value)} onBlur={() => saveEdit(item.id)} autoFocus style={{ ...s.select, fontSize: 11, padding: "2px 4px" }}>
                          {TABS.filter((t) => t !== "ALL").map((t) => <option key={t} value={t}>{t}</option>)}
                        </select>
                      ) : (
                        <span style={s.catLabel} onClick={() => { setEditingId(item.id); setEditCat(item.category); }} title="클릭해서 카테고리 변경">{item.category} ✏️</span>
                      )}
                      <button onClick={() => deleteItem(item.id)} style={s.deleteBtn}>×</button>
                    </div>
                  ))}
                </div>
                {memoPhoto && (
                  <div style={s.pendingPhotoRow}>
                    <img src={memoPhoto} alt="" style={s.pendingThumb} />
                    <span style={{ fontSize: 11, color: "#5A9FBF", flex: 1 }}>사진 첨부됨</span>
                    <button onClick={() => { setMemoPhoto(null); if (memoFileRef.current) memoFileRef.current.value = ""; }} style={s.deleteBtn}>×</button>
                  </div>
                )}
                <div style={s.inputRow}>
                  <select value={memoCategory} onChange={(e) => setMemoCategory(e.target.value)} style={s.select}>
                    {TABS.filter((t) => t !== "ALL").map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <input style={s.textInput} placeholder="memo..." value={memoInput} onChange={(e) => setMemoInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMemo()} />
                  <input ref={memoFileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => readFileAsDataURL(e.target.files[0], setMemoPhoto)} />
                  <button className="hp-photobtn" onClick={() => memoFileRef.current?.click()} style={s.photoBtn} title="사진 첨부">📷</button>
                  <button onClick={sendMemo} style={s.sendBtn}>SEND</button>
                </div>
              </div>
            )}

            {/* DIARY */}
            {page === "diary" && (
              <div style={s.card}>
                <div style={s.cardBar}><span style={s.dot} /><span style={s.cardBarTitle}>끄적이기 (낙서장)</span><span style={s.diaryHint}>날짜별 일기 대신, 떠오르면 바로 적는 칸</span></div>
                <div style={s.composerRow}>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                    <textarea style={s.diaryTextarea} placeholder="오늘 무슨 생각? 그냥 막 적어보세요..." rows={2} value={diaryInput} onChange={(e) => setDiaryInput(e.target.value)} onKeyDown={(e) => { if (e.ctrlKey && e.key === "Enter") addDiaryEntry(); }} />
                    {diaryPhoto && (
                      <div style={s.pendingPhotoRow}>
                        <img src={diaryPhoto} alt="" style={s.pendingThumb} />
                        <span style={{ fontSize: 11, color: "#5A9FBF", flex: 1 }}>사진 첨부됨</span>
                        <button onClick={() => { setDiaryPhoto(null); if (diaryFileRef.current) diaryFileRef.current.value = ""; }} style={s.deleteBtn}>×</button>
                      </div>
                    )}
                  </div>
                  <input ref={diaryFileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => readFileAsDataURL(e.target.files[0], setDiaryPhoto)} />
                  <button className="hp-photobtn" onClick={() => diaryFileRef.current?.click()} style={{ ...s.photoBtn, alignSelf: "flex-end" }} title="사진 첨부">📷</button>
                  <button onClick={addDiaryEntry} style={s.diaryPostBtn}>올리기</button>
                </div>
                <div className="hp-scroll" style={s.diaryFeed}>
                  {diaryEntries.length === 0 && <div style={s.empty}>아직 끄적인 게 없어요. 짧게, 가볍게, 편하게 ✏️</div>}
                  {diaryEntries.map((e) => (
                    <div key={e.id} style={s.diaryItem}>
                      <div style={{ flex: 1 }}>
                        <div style={s.diaryTime}>{formatDiaryTime(e.time)}</div>
                        {e.photo && <img src={e.photo} alt="" style={s.diaryImg} onClick={() => setLightboxImg(e.photo)} />}
                        {editingDiaryId === e.id ? (
                          <textarea
                            autoFocus
                            value={editingDiaryText}
                            onChange={(ev) => setEditingDiaryText(ev.target.value)}
                            onBlur={() => saveDiaryEdit(e.id)}
                            onKeyDown={(ev) => { if (ev.ctrlKey && ev.key === "Enter") saveDiaryEdit(e.id); }}
                            style={{ ...s.diaryTextarea, width: "100%" }}
                            rows={2}
                          />
                        ) : (
                          e.text && <div style={s.diaryText} onClick={() => startDiaryEdit(e)} title="클릭해서 수정">{e.text}</div>
                        )}
                      </div>
                      {editingDiaryId !== e.id && <button onClick={() => startDiaryEdit(e)} style={s.editBtn} title="수정">✏️</button>}
                      <button onClick={() => deleteDiaryEntry(e.id)} style={s.deleteBtn}>×</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* BOARD 게시판 */}
            {page === "board" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={s.card}>
                  <div style={s.cardBar}><span style={s.dot} /><span style={s.cardBarTitle}>게시판에 글쓰기</span></div>
                  <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button onClick={() => setComposerMode("owner")} style={{ ...s.modeTab, ...(composerMode === "owner" ? s.modeTabActive : {}) }}>✏️ 내가 글쓰기</button>
                      <button onClick={() => setComposerMode("fan")} style={{ ...s.modeTab, ...(composerMode === "fan" ? s.modeTabActive : {}) }}>💌 팬레터 쓰기</button>
                    </div>
                    {composerMode === "fan" && (
                      <input style={{ ...s.textInput, fontSize: 12 }} placeholder="이름 (비워두면 익명의 팬)" value={boardAuthorName} onChange={(e) => setBoardAuthorName(e.target.value)} />
                    )}
                    <textarea style={{ ...s.diaryTextarea, width: "100%" }} rows={3} placeholder={composerMode === "owner" ? "게시물을 작성해보세요..." : "팬레터를 남겨보세요..."} value={boardInput} onChange={(e) => setBoardInput(e.target.value)} />
                    {boardPhoto && (
                      <div style={s.pendingPhotoRow}>
                        <img src={boardPhoto} alt="" style={s.pendingThumb} />
                        <span style={{ fontSize: 11, color: "#5A9FBF", flex: 1 }}>사진 첨부됨</span>
                        <button onClick={() => { setBoardPhoto(null); if (boardFileRef.current) boardFileRef.current.value = ""; }} style={s.deleteBtn}>×</button>
                      </div>
                    )}
                    <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                      <input ref={boardFileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => readFileAsDataURL(e.target.files[0], setBoardPhoto)} />
                      <button className="hp-photobtn" onClick={() => boardFileRef.current?.click()} style={s.photoBtn} title="사진 첨부">📷</button>
                      <button onClick={addBoardPost} style={s.diaryPostBtn}>올리기</button>
                    </div>
                  </div>
                </div>

                <div style={s.card}>
                  <div style={s.cardBar}><span style={s.dot} /><span style={s.cardBarTitle}>게시글 {boardPosts.length}개 · 댓글 {totalComments}개</span></div>
                  <div className="hp-scroll" style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: 10, maxHeight: 560, overflowY: "auto" }}>
                    {boardPosts.length === 0 && <div style={s.empty}>아직 게시물이 없어요. 첫 글을 남겨보세요 ✏️</div>}
                    {boardPosts.map((post) => (
                      <div key={post.id} style={s.boardPostCard}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                          <span style={{ ...s.catLabel, cursor: "default", background: post.type === "owner" ? "#DFF0FA" : "#FFE8F4", color: post.type === "owner" ? "#4A9ABF" : "#C06090" }}>
                            {post.type === "owner" ? "👑 OWNER" : "💌 FAN LETTER"}
                          </span>
                          <span style={{ fontSize: 12, fontWeight: 700, color: "#3A6080" }}>{post.authorName}</span>
                          <span style={{ fontSize: 10.5, color: "#90BFDC", marginLeft: "auto" }}>{formatBoardTime(post.time)}</span>
                          <button onClick={() => deleteBoardPost(post.id)} style={s.deleteBtn}>×</button>
                        </div>
                        {post.photo && <img src={post.photo} alt="" style={s.diaryImg} onClick={() => setLightboxImg(post.photo)} />}
                        {editingPostId === post.id ? (
                          <textarea autoFocus value={editingPostText} onChange={(e) => setEditingPostText(e.target.value)} onBlur={() => saveEditPost(post.id)} style={{ ...s.diaryTextarea, width: "100%" }} rows={2} />
                        ) : (
                          post.text && <div style={s.diaryText} onClick={() => startEditPost(post)} title="클릭해서 수정">{post.text}</div>
                        )}
                        <button onClick={() => setExpandedPostId(expandedPostId === post.id ? null : post.id)} style={s.homeLinkBtn}>
                          💬 댓글 {post.comments.length}개 {expandedPostId === post.id ? "숨기기" : "보기"}
                        </button>
                        {expandedPostId === post.id && (
                          <div style={s.commentBox}>
                            {post.comments.length === 0 && <div style={{ fontSize: 11.5, color: "#A0C0D8" }}>아직 댓글이 없어요</div>}
                            {post.comments.map((c) => (
                              <div key={c.id} style={{ ...s.commentRow, marginLeft: c.parentId ? 16 : 0, background: c.isOwner ? "#FFF0F8" : "#F0F8FF", borderColor: c.isOwner ? "#F4A7C3" : "#C8E4F4" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                  <span style={{ fontSize: 11.5, fontWeight: 700, color: c.isOwner ? "#C06090" : "#4A9ABF" }}>{c.isOwner ? "👑 " : ""}{c.name}</span>
                                  <span style={{ fontSize: 10, color: "#A0C0D8" }}>{formatBoardTime(c.time)}</span>
                                  <button onClick={() => deleteComment(post.id, c.id)} style={{ ...s.deleteBtn, marginLeft: "auto" }}>×</button>
                                </div>
                                <div style={{ fontSize: 12.5, color: "#3A6080", marginTop: 3 }}>{c.text}</div>
                                {!c.isOwner && replyDraftFor !== c.id && (
                                  <button onClick={() => startReply(c.id)} style={s.replyBtn}>↳ 답글 남기기</button>
                                )}
                                {replyDraftFor === c.id && (
                                  <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
                                    <input autoFocus style={{ ...s.textInput, fontSize: 12 }} placeholder={`${profileName}으로 답글...`} value={replyText} onChange={(e) => setReplyText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addOwnerReply(post.id, c.id)} />
                                    <button onClick={() => addOwnerReply(post.id, c.id)} style={{ ...s.sendBtn, padding: "4px 10px", fontSize: 11 }}>등록</button>
                                    <button onClick={cancelReply} style={{ ...s.deleteBtn, fontSize: 13 }}>취소</button>
                                  </div>
                                )}
                              </div>
                            ))}
                            <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                              <input style={{ ...s.textInput, flex: "0 1 80px", fontSize: 12 }} placeholder="이름" value={commentDrafts[post.id]?.name || ""} onChange={(e) => updateCommentDraft(post.id, "name", e.target.value)} />
                              <input style={{ ...s.textInput, fontSize: 12 }} placeholder="댓글 남기기..." value={commentDrafts[post.id]?.text || ""} onChange={(e) => updateCommentDraft(post.id, "text", e.target.value)} onKeyDown={(e) => e.key === "Enter" && addComment(post.id)} />
                              <button onClick={() => addComment(post.id)} style={{ ...s.sendBtn, padding: "5px 10px", fontSize: 12 }}>등록</button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* GUESTBOOK 💌 */}
            {page === "guestbook" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {/* Header banner */}
                <div style={{ background: "linear-gradient(135deg,#FFE8F4,#F0E8FF)", border: "1.5px solid #F4A7C3", borderRadius: 14, padding: "16px 18px", textAlign: "center" }}>
                  <div style={{ fontSize: 18, color: "#C06090", letterSpacing: 1, marginBottom: 4 }}>💌 방명록</div>
                  <div style={{ fontSize: 11, color: "#C097B0" }}>{profileName}를 응원하는 팬들이 매일 메시지를 남겨요 ✨</div>
                  <div style={{ marginTop: 10, display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
                    {(showAllFans ? fans : fans.slice(0, 5)).map((f, idx) => (
                      editingFanIdx === idx ? (
                        <input
                          key={idx}
                          autoFocus
                          value={fanNameDraft}
                          onChange={(e) => setFanNameDraft(e.target.value)}
                          onBlur={() => saveFanName(idx)}
                          onKeyDown={(e) => e.key === "Enter" && saveFanName(idx)}
                          style={{ background: "#fff", border: "1.5px solid #F4A7C3", borderRadius: 20, padding: "3px 10px", fontSize: 11, color: "#C06090", width: 90, outline: "none" }}
                        />
                      ) : (
                        <div key={f.name + idx} onClick={() => startEditFan(idx, f.name)} title="클릭해서 이름 변경"
                          style={{ background: f.color, border: "1px solid #F4A7C3", borderRadius: 20, padding: "3px 10px", fontSize: 11, color: "#C06090", cursor: "pointer" }}>
                          {f.emoji} {f.name} <span style={{ opacity: 0.6 }}>✏️</span>
                        </div>
                      )
                    ))}
                    {!showAllFans && fans.length > 5 && (
                      <button onClick={() => setShowAllFans(true)} style={{ background: "#F8F0FF", border: "1px solid #E0C8F4", borderRadius: 20, padding: "3px 10px", fontSize: 11, color: "#9060C0", cursor: "pointer" }}>+{fans.length - 5}명 더</button>
                    )}
                    {showAllFans && (
                      <button onClick={() => setShowAllFans(false)} style={{ background: "#F8F0FF", border: "1px solid #E0C8F4", borderRadius: 20, padding: "3px 10px", fontSize: 11, color: "#9060C0", cursor: "pointer" }}>접기</button>
                    )}
                  </div>
                </div>

                {/* Generate new message */}
                <div style={{ background: "#FFF0F8", border: "1.5px dashed #F4A7C3", borderRadius: 12, padding: "14px 16px", textAlign: "center" }}>
                  <div style={{ fontSize: 12, color: "#C097B0", marginBottom: 10 }}>팬들에게 지금 바로 응원 메시지 받기 ✨</div>
                  <button className="gb-gen-btn" onClick={generateNewMessage} disabled={isGenerating}
                    style={{ background: isGenerating ? "#E0C8D8" : "linear-gradient(135deg,#F4A7C3,#C8A0E8)", color: "#fff", border: "none", borderRadius: 20, padding: "10px 24px", fontSize: 13, fontWeight: 700, cursor: isGenerating ? "not-allowed" : "pointer", boxShadow: "0 3px 10px rgba(244,167,195,0.4)", transition: "all 0.15s", letterSpacing: 0.5 }}>
                    {isGenerating ? "✨ 메시지 받는 중..." : "💌 응원 메시지 받기"}
                  </button>
                  <div style={{ fontSize: 10, color: "#D4A0C0", marginTop: 8 }}>버튼을 누를 때마다 팬이 새 메시지를 남겨줘요!</div>
                </div>

                {/* User can also write */}
                <div style={s.card}>
                  <div style={s.cardBar}><span style={s.dot} /><span style={s.cardBarTitle}>✍️ 나도 방명록 남기기</span></div>
                  <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: 8 }}>
                    <input style={{ ...s.textInput, fontSize: 12 }} placeholder="이름 (비워두면 익명)" value={gbName} onChange={e => setGbName(e.target.value)} />
                    <div style={{ display: "flex", gap: 8 }}>
                      <textarea style={{ ...s.textInput, flex: 1, resize: "none", height: 52, fontSize: 12 }} placeholder="방명록 메시지를 남겨보세요..." value={gbInput} onChange={e => setGbInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendGuestbook(); } }} />
                      <button onClick={sendGuestbook} style={{ ...s.sendBtn, alignSelf: "stretch", padding: "0 14px" }}>남기기</button>
                    </div>
                  </div>
                </div>

                {/* All messages feed */}
                <div style={s.card}>
                  <div style={s.cardBar}><span style={s.dot} /><span style={s.cardBarTitle}>전체 메시지 ({allGbEntries.length})</span></div>
                  <div className="hp-scroll" style={{ padding: "10px 12px", maxHeight: 420, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
                    {allGbEntries.length === 0 && <div style={s.empty}>아직 메시지가 없어요. 위에서 받아보세요! 💌</div>}
                    {allGbEntries.map((entry) => (
                      <div key={entry.id} className="gb-fan-entry"
                        style={{ display: "flex", gap: 10, padding: "10px 12px", background: entry.isAI ? entry.fan.color : "#F8FCFF", border: `1.5px solid ${entry.isAI ? "#F4A7C3" : "#C8E4F4"}`, borderRadius: 12, alignItems: "flex-start" }}>
                        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#F4A7C3,#C8A0E8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0, border: "2px solid #fff", boxShadow: "0 2px 6px rgba(244,167,195,0.3)" }}>
                          {entry.fan.emoji}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                            <span style={{ fontSize: 12, fontWeight: 700, color: "#C06090" }}>{entry.fan.name}</span>
                            {entry.isAI && <span style={{ fontSize: 9, background: "#F4A7C3", color: "#fff", borderRadius: 8, padding: "1px 5px" }}>팬</span>}
                            <span style={{ fontSize: 10, color: "#C8A0B8", marginLeft: "auto" }}>{formatGbTime(entry.time)}</span>
                          </div>
                          <div style={{ fontSize: 13, color: "#5A3060", lineHeight: 1.6 }}>{entry.msg}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </main>
        </div>
        <div style={s.footer}>⋆⁺ ﾞ {profileName}'s space 방명록 환영 ﾞ⁺⋆</div>
      </div>

      {lightboxImg && (
        <div style={s.lightboxOverlay} onClick={() => setLightboxImg(null)}>
          <img src={lightboxImg} alt="" style={s.lightboxImg} />
        </div>
      )}
    </div>
  );
}

const s = {
  page: { minHeight: "100vh", background: "linear-gradient(135deg,#EEF7FF 0%,#F5FBFF 100%)", display: "flex", justifyContent: "center", padding: 24 },
  frame: { width: "100%", maxWidth: 1040, background: "#F8FCFF", border: "1.5px solid #B8DCEF", borderRadius: 16, overflow: "hidden", boxShadow: "0 10px 36px rgba(80,150,200,0.18)", display: "flex", flexDirection: "column" },
  body: { display: "flex", flex: 1, minHeight: 560 },
  sidebar: { width: 196, flexShrink: 0, background: "#EAF5FC", borderRight: "1.5px solid #B8DCEF", display: "flex", flexDirection: "column", padding: "16px 12px", gap: 12 },
  profileBox: { display: "flex", alignItems: "center", gap: 12 },
  profileBadge: { width: 58, height: 58, borderRadius: 16, background: "linear-gradient(135deg,#7EC8E3,#A0B4E8)", backgroundSize: "cover", backgroundPosition: "center", border: "none", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 3px 9px rgba(100,160,210,0.35)", cursor: "pointer", padding: 0 },
  profileName: { fontSize: 15.5, color: "#3A6080", fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" },
  nameInput: { fontSize: 14, color: "#3A6080", border: "1px solid #7EC8E3", borderRadius: 5, padding: "2px 5px", width: 100, outline: "none" },
  themeTag: { fontSize: 10.5, color: "#5A9FBF", background: "#DFF0FA", border: "1px solid #B8DCEF", borderRadius: 10, padding: "1px 8px", cursor: "pointer", whiteSpace: "nowrap" },
  themeInput: { fontSize: 10.5, color: "#3A6080", border: "1px solid #7EC8E3", borderRadius: 8, padding: "1px 6px", width: 80, outline: "none" },
  profileSub: { fontSize: 10.5, color: "#90BFDC", marginTop: 4 },
  sidebarDivider: { borderTop: "1px dashed #B8DCEF" },
  navList: { display: "flex", flexDirection: "column", gap: 4 },
  navBtn: { textAlign: "left", border: "none", borderRadius: 8, padding: "8px 10px", fontSize: 12.5, cursor: "pointer", letterSpacing: 0.3, transition: "background 0.15s", display: "flex", alignItems: "center" },
  shelfRow: { display: "flex", justifyContent: "center", gap: 10, padding: "2px 0" },
  visitorBadge: { fontSize: 10.5, color: "#7AAFC8", textAlign: "center", marginTop: "auto" },
  content: { flex: 1, padding: 18, overflowY: "auto", maxHeight: 700 },
  homeWrap: { display: "flex", flexDirection: "column", gap: 14 },
  homeHero: { background: "linear-gradient(135deg,#DFF0FA,#EAF2FF)", border: "1.5px solid #C8E4F4", borderRadius: 12, padding: "18px 16px", textAlign: "center" },
  homeGreeting: { fontSize: 13, color: "#4A9ABF", marginBottom: 8 },
  homeClock: { fontSize: 30, color: "#3A6080", letterSpacing: 1 },
  homeDate: { fontSize: 11, color: "#90BFDC", marginTop: 4 },
  statRow: { display: "flex", gap: 10 },
  statTile: { flex: 1, background: "#F0F8FF", border: "1.5px solid #C8E4F4", borderRadius: 10, padding: "10px 6px", cursor: "pointer", textAlign: "center" },
  statNum: { fontSize: 16, color: "#4A9ABF", fontWeight: 700 },
  statLabel: { fontSize: 10.5, color: "#7AAFC8", marginTop: 4 },
  homeDiaryPreview: { background: "#F8FCFF", border: "1.5px solid #C8E4F4", borderRadius: 10, padding: "12px 14px" },
  homeSectionLabel: { fontSize: 12, color: "#5A9FBF", fontWeight: 700, marginBottom: 8 },
  quoteCard: { background: "#EEF8FF", borderLeft: "3px solid #F4A7C3", borderRadius: 6, padding: "8px 10px" },
  quoteImg: { width: "100%", maxHeight: 140, objectFit: "cover", borderRadius: 6, marginBottom: 6 },
  quoteText: { fontSize: 12.5, color: "#3A6080", lineHeight: 1.6, whiteSpace: "pre-wrap" },
  quoteTime: { fontSize: 10.5, color: "#90BFDC", marginTop: 4 },
  homeLinkBtn: { marginTop: 8, background: "none", border: "none", color: "#5A9FBF", fontSize: 11.5, cursor: "pointer", padding: 0, textDecoration: "underline" },
  shortcutRow: { display: "flex", gap: 8 },
  shortcutBtn: { flex: 1, background: "#7EC8E3", color: "#fff", border: "none", borderRadius: 8, padding: "8px 4px", fontSize: 11.5, fontWeight: 700, cursor: "pointer" },
  routineWrap: { display: "flex", flexDirection: "column", gap: 14 },
  card: { background: "#F8FCFF", border: "1.5px solid #B8DCEF", borderRadius: 14, overflow: "hidden", boxShadow: "0 3px 14px rgba(100,180,220,0.10)" },
  cardBar: { background: "#DFF0FA", padding: "7px 10px", display: "flex", alignItems: "center", gap: 7, borderBottom: "1px solid #B8DCEF" },
  dot: { width: 9, height: 9, borderRadius: "50%", background: "#7EC8E3", display: "inline-block", flexShrink: 0 },
  cardBarTitle: { fontSize: 12, color: "#5A9FBF", flex: 1, letterSpacing: 0.3 },
  closeBtn: { background: "none", border: "none", color: "#7AAFC8", fontSize: 13, cursor: "pointer", padding: "0 2px" },
  historyPanel: { padding: "10px 12px", background: "#EAF5FC", borderBottom: "1px solid #B8DCEF" },
  historyRow: { background: "#F8FCFF", border: "1px solid #C8E4F4", borderRadius: 8, padding: "6px 9px" },
  historyBadge: { fontSize: 10.5, color: "#5A9FBF", background: "#E0F3FF", border: "1px solid #C8E4F4", borderRadius: 5, padding: "2px 6px" },
  panelIconRow: { display: "flex", justifyContent: "center", gap: 8, padding: "12px 10px" },
  iconBtn: { width: 34, height: 34, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.15s" },
  panelPlaceholder: { textAlign: "center", fontSize: 12, color: "#90C0DC", padding: "6px 10px 16px", lineHeight: 1.7 },
  panelSubBar: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 10px 4px" },
  panelList: { padding: "4px 10px", minHeight: 50, maxHeight: 140, overflowY: "auto", display: "flex", flexDirection: "column", gap: 6 },
  panelRow: { display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.7)", borderRadius: 8, padding: "6px 9px", border: "1px solid #C8E4F4" },
  panelText: { flex: 1, fontSize: 13, lineHeight: 1.5 },
  pomoCfgRow: { padding: "10px 14px", background: "#EAF5FC", borderBottom: "1px solid #B8DCEF", display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" },
  cfgLabel: { fontSize: 12, color: "#5A9FBF", display: "flex", alignItems: "center", gap: 4 },
  cfgInput: { width: 36, border: "1px solid #B8DCEF", borderRadius: 6, padding: "3px 5px", fontSize: 13, color: "#3A6080", textAlign: "center", outline: "none", margin: "0 3px" },
  pomoBody: { padding: "14px 14px", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 },
  pomoBtn: { background: "#7EC8E3", color: "#fff", border: "none", borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer" },
  calGrid: { display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2, marginBottom: 6 },
  calCell: { aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 },
  calNavBtn: { background: "none", border: "none", color: "#7AAFC8", fontSize: 15, cursor: "pointer", padding: "0 4px" },
  calNotePanel: { borderTop: "1px solid #B8DCEF", padding: "10px 12px", background: "#EAF5FC" },
  tabRow: { display: "flex", borderBottom: "1px solid #B8DCEF", background: "#E8F5FC", padding: "6px 8px 0", gap: 4, flexWrap: "wrap" },
  tab: { padding: "5px 9px", fontSize: 11, fontWeight: 600, border: "none", background: "transparent", color: "#90BFDC", cursor: "pointer", borderRadius: "6px 6px 0 0", letterSpacing: 0.3 },
  tabActive: { background: "#F8FCFF", color: "#4A9ABF", borderBottom: "2px solid #7EC8E3" },
  itemList: { padding: "10px 12px", minHeight: 100, maxHeight: 320, overflowY: "auto", display: "flex", flexDirection: "column", gap: 6 },
  empty: { textAlign: "center", color: "#90C0DC", fontSize: 12, marginTop: 16, padding: "0 10px" },
  itemRow: { display: "flex", alignItems: "center", gap: 7, background: "#EEF8FF", borderRadius: 8, padding: "7px 10px", border: "1px solid #C8E4F4" },
  catBadge: { width: 22, height: 22, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0 },
  checkbox: { accentColor: "#7EC8E3", width: 14, height: 14, flexShrink: 0, cursor: "pointer" },
  itemText: { flex: 1, fontSize: 13, lineHeight: 1.5 },
  itemThumb: { width: 28, height: 28, borderRadius: 6, objectFit: "cover", flexShrink: 0, cursor: "pointer", border: "1px solid #C8E4F4" },
  catLabel: { fontSize: 11, color: "#90BFDC", background: "#E0F3FF", border: "1px solid #B8DCEF", borderRadius: 4, padding: "1px 5px", flexShrink: 0, cursor: "pointer", whiteSpace: "nowrap" },
  deleteBtn: { background: "none", border: "none", color: "#A0C8DC", fontSize: 15, cursor: "pointer", padding: "0 2px", lineHeight: 1, flexShrink: 0 },
  editBtn: { background: "none", border: "none", color: "#A0C8DC", fontSize: 12, cursor: "pointer", padding: "0 2px", lineHeight: 1, flexShrink: 0 },
  replyBtn: { marginTop: 4, background: "none", border: "none", color: "#90BFDC", fontSize: 11, cursor: "pointer", padding: 0, textDecoration: "underline" },
  inputRow: { display: "flex", borderTop: "1px solid #B8DCEF", padding: "9px 10px", gap: 7, background: "#DFF0FA", alignItems: "center" },
  select: { fontSize: 12, border: "1px solid #B8DCEF", borderRadius: 8, padding: "5px 4px", background: "#F0F8FF", color: "#4A9ABF", outline: "none", cursor: "pointer" },
  textInput: { flex: 1, border: "1px solid #B8DCEF", borderRadius: 8, padding: "6px 10px", fontSize: 13, background: "#F8FCFF", color: "#3A6080", outline: "none" },
  sendBtn: { background: "#7EC8E3", color: "#fff", border: "none", borderRadius: 8, padding: "6px 13px", fontSize: 12, fontWeight: 700, cursor: "pointer", flexShrink: 0 },
  photoBtn: { background: "#F0F8FF", color: "#5A9FBF", border: "1px solid #C8E4F4", borderRadius: 8, padding: "6px 9px", fontSize: 13, cursor: "pointer", flexShrink: 0, transition: "all 0.15s" },
  pendingPhotoRow: { display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", background: "#EAF5FC", borderTop: "1px dashed #C8E4F4" },
  pendingThumb: { width: 30, height: 30, borderRadius: 6, objectFit: "cover", border: "1px solid #C8E4F4" },
  diaryHint: { fontSize: 11, color: "#90BFDC", fontWeight: 400 },
  composerRow: { display: "flex", gap: 10, padding: "12px 14px", alignItems: "flex-start", borderBottom: "1px dashed #C8E4F4" },
  diaryTextarea: { flex: 1, border: "1px solid #B8DCEF", borderRadius: 10, padding: "8px 10px", fontSize: 13, color: "#3A6080", background: "#F8FCFF", outline: "none", resize: "none" },
  diaryPostBtn: { background: "#F4A7C3", color: "#fff", border: "none", borderRadius: 20, padding: "8px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer", alignSelf: "flex-end", flexShrink: 0 },
  diaryFeed: { padding: "10px 14px", display: "flex", flexDirection: "column", gap: 8, maxHeight: 360, overflowY: "auto" },
  diaryItem: { display: "flex", gap: 10, alignItems: "flex-start", background: "#EEF8FF", border: "1px solid #C8E4F4", borderRadius: 10, padding: "8px 12px" },
  diaryTime: { fontSize: 11, color: "#90BFDC", marginBottom: 4, whiteSpace: "nowrap" },
  diaryText: { fontSize: 13, color: "#3A6080", lineHeight: 1.6, whiteSpace: "pre-wrap", cursor: "pointer" },
  diaryImg: { width: "100%", maxWidth: 220, maxHeight: 180, objectFit: "cover", borderRadius: 8, marginBottom: 6, cursor: "pointer", display: "block" },
  modeTab: { flex: 1, textAlign: "center", padding: "7px 4px", fontSize: 12, fontWeight: 600, border: "1px solid #C8E4F4", background: "#F0F8FF", color: "#90BFDC", cursor: "pointer", borderRadius: 8 },
  modeTabActive: { background: "#7EC8E3", color: "#fff", border: "1px solid #7EC8E3" },
  boardPostCard: { background: "#F8FCFF", border: "1.5px solid #C8E4F4", borderRadius: 10, padding: "10px 12px" },
  commentBox: { marginTop: 8, paddingTop: 8, borderTop: "1px dashed #C8E4F4", display: "flex", flexDirection: "column", gap: 6 },
  commentRow: { border: "1.5px solid #C8E4F4", borderRadius: 8, padding: "6px 9px" },
  lightboxOverlay: { position: "fixed", inset: 0, background: "rgba(20,30,50,0.65)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: 24 },
  lightboxImg: { maxWidth: "90vw", maxHeight: "90vh", borderRadius: 10, boxShadow: "0 10px 40px rgba(0,0,0,0.4)" },
  footer: { textAlign: "center", color: "#90BFDC", fontSize: 11, padding: "10px 0 14px", borderTop: "1px dashed #C8E4F4" },
};
