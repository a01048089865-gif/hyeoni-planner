import { useState, useEffect, useRef } from "react";

// ── Pixel art SVG icons ──────────────────────────────────────────
const PixelHeart = () => (
  <svg width="20" height="20" viewBox="0 0 10 10" style={{imageRendering:"pixelated"}}>
    <rect x="1" y="2" width="3" height="1" fill="#F4A7C3"/>
    <rect x="6" y="2" width="3" height="1" fill="#F4A7C3"/>
    <rect x="0" y="3" width="4" height="2" fill="#F4A7C3"/>
    <rect x="5" y="3" width="4" height="2" fill="#F4A7C3"/>
    <rect x="1" y="5" width="8" height="2" fill="#F4A7C3"/>
    <rect x="2" y="7" width="6" height="1" fill="#F4A7C3"/>
    <rect x="3" y="8" width="4" height="1" fill="#F4A7C3"/>
    <rect x="4" y="9" width="2" height="1" fill="#F4A7C3"/>
  </svg>
);

const PixelExclaim = () => (
  <svg width="20" height="20" viewBox="0 0 10 10" style={{imageRendering:"pixelated"}}>
    <rect x="4" y="1" width="2" height="5" fill="#7EC8E3"/>
    <rect x="4" y="8" width="2" height="2" fill="#7EC8E3"/>
  </svg>
);

const PixelCat = () => (
  <svg width="20" height="20" viewBox="0 0 10 10" style={{imageRendering:"pixelated"}}>
    <rect x="1" y="3" width="1" height="2" fill="#A0C8DC"/>
    <rect x="8" y="3" width="1" height="2" fill="#A0C8DC"/>
    <rect x="2" y="2" width="6" height="6" fill="#C8E4F4"/>
    <rect x="3" y="4" width="1" height="1" fill="#5A9FBF"/>
    <rect x="6" y="4" width="1" height="1" fill="#5A9FBF"/>
    <rect x="4" y="6" width="2" height="1" fill="#F4A7C3"/>
    <rect x="3" y="5" width="1" height="1" fill="#A0C8DC"/>
    <rect x="6" y="5" width="1" height="1" fill="#A0C8DC"/>
  </svg>
);

const PixelRibbon = () => (
  <svg width="20" height="20" viewBox="0 0 10 10" style={{imageRendering:"pixelated"}}>
    <rect x="0" y="2" width="4" height="3" fill="#F4A7C3"/>
    <rect x="6" y="2" width="4" height="3" fill="#F4A7C3"/>
    <rect x="4" y="3" width="2" height="1" fill="#E07AAC"/>
    <rect x="1" y="3" width="2" height="1" fill="#fff" opacity="0.5"/>
    <rect x="7" y="3" width="2" height="1" fill="#fff" opacity="0.5"/>
    <rect x="3" y="2" width="4" height="3" fill="#F4A7C3"/>
    <rect x="4" y="3" width="2" height="1" fill="#E07AAC"/>
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
  morning:  { title: "🌅 Morning Routine", color: "#EAF6FF", accent: "#89C4E1", placeholder: "예) 스트레칭 10분, 물 한 잔..." },
  night:    { title: "🌙 Night Routine",   color: "#EEF0FF", accent: "#A0B4E8", placeholder: "예) 스킨케어, 일기 쓰기..." },
  habit:    { title: "💪 Habit Tracker",   color: "#E8F8FF", accent: "#6BBFD8", placeholder: "예) 운동, 독서 30분..." },
};

const TABS = ["ALL", "IDEA", "TO DO", "MEMO", "WORK"];
const CAT_COLORS = {
  IDEA:    { bg: "#D6EFFF", icon: "💡" },
  "TO DO": { bg: "#D6F0FF", icon: "✅" },
  MEMO:    { bg: "#E0F4FF", icon: "📝" },
  WORK:    { bg: "#D0E8FF", icon: "💼" },
};

const INIT_ITEMS = [
  { id: 1, category: "TO DO", text: "오늘 할 일 정리하기", done: false },
  { id: 2, category: "IDEA", text: "새로운 아이디어 메모", done: false },
  { id: 3, category: "MEMO", text: "중요한 메모 내용", done: false },
  { id: 4, category: "WORK", text: "업무 관련 사항", done: false },
];

const INIT_PANEL_ITEMS = {
  vitamins: ["비타민 D ☀️", "오메가3 🐟", "마그네슘 💎"],
  morning:  ["물 한 잔 마시기 🥛", "스트레칭 10분 🧘", "오늘 할 일 확인 📋"],
  night:    ["스킨케어 루틴 🧴", "내일 준비하기 🎒", "일기 쓰기 📖"],
  habit:    ["하루 30분 운동 🏃", "독서 20분 📚", "물 2L 마시기 💧"],
};

function useTimer(focusMins, breakMins) {
  const [phase, setPhase] = useState("idle"); // idle | focus | break | paused
  const [remaining, setRemaining] = useState(focusMins * 60);
  const [isFocus, setIsFocus] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (phase === "idle" || phase === "paused") {
      clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(intervalRef.current);
          const next = !isFocus;
          setIsFocus(next);
          setPhase("idle");
          return next ? breakMins * 60 : focusMins * 60;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [phase]);

  const start = () => { setPhase("focus"); };
  const pause = () => setPhase("paused");
  const resume = () => setPhase("focus");
  const reset = () => {
    clearInterval(intervalRef.current);
    setPhase("idle");
    setIsFocus(true);
    setRemaining(focusMins * 60);
  };

  useEffect(() => {
    if (phase === "idle") setRemaining(isFocus ? focusMins * 60 : breakMins * 60);
  }, [focusMins, breakMins]);

  return { phase, remaining, isFocus, start, pause, resume, reset };
}

function pad(n) { return String(n).padStart(2, "0"); }

export default function Dashboard() {
  // Clock
  const [now, setNow] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(t); }, []);
  const weekdays = ["일","월","화","수","목","금","토"];
  const dateStr = `${now.getMonth()+1}월 ${now.getDate()}일 (${weekdays[now.getDay()]})`;

  // Panels
  const [activePanel, setActivePanel] = useState(null);
  const [panelItems, setPanelItems] = useState(INIT_PANEL_ITEMS);
  const [panelChecked, setPanelChecked] = useState({ vitamins:[], morning:[], night:[], habit:[] });
  const [panelInput, setPanelInput] = useState("");

  // Memo
  const [activeTab, setActiveTab] = useState("ALL");
  const [items, setItems] = useState(INIT_ITEMS);
  const [nextId, setNextId] = useState(5);
  const [memoInput, setMemoInput] = useState("");
  const [memoCategory, setMemoCategory] = useState("MEMO");
  const [editingId, setEditingId] = useState(null);
  const [editCat, setEditCat] = useState("");

  // Pomodoro
  const [focusMins, setFocusMins] = useState(25);
  const [breakMins, setBreakMins] = useState(5);
  const [showPomoCfg, setShowPomoCfg] = useState(false);
  const [tmpFocus, setTmpFocus] = useState(25);
  const [tmpBreak, setTmpBreak] = useState(5);
  const { phase, remaining, isFocus, start, pause, resume, reset } = useTimer(focusMins, breakMins);

  // Calendar
  const [calYear, setCalYear] = useState(now.getFullYear());
  const [calMonth, setCalMonth] = useState(now.getMonth());
  const [calNotes, setCalNotes] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [calInput, setCalInput] = useState("");

  // ── helpers ──
  const togglePanelCheck = (pid, idx) =>
    setPanelChecked(p => ({ ...p, [pid]: p[pid].includes(idx) ? p[pid].filter(i=>i!==idx) : [...p[pid], idx] }));
  const addPanelItem = (pid) => {
    const t = panelInput.trim(); if (!t) return;
    setPanelItems(p => ({ ...p, [pid]: [...p[pid], t] })); setPanelInput("");
  };
  const delPanelItem = (pid, idx) => {
    setPanelItems(p => ({ ...p, [pid]: p[pid].filter((_,i)=>i!==idx) }));
    setPanelChecked(p => ({ ...p, [pid]: p[pid].filter(i=>i!==idx).map(i=>i>idx?i-1:i) }));
  };

  const filtered = activeTab === "ALL" ? items : items.filter(i => i.category === activeTab);
  const sendMemo = () => {
    const t = memoInput.trim(); if (!t) return;
    setItems(p => [...p, { id: nextId, category: memoCategory, text: t, done: false }]);
    setNextId(n=>n+1); setMemoInput("");
  };
  const toggleDone = id => setItems(p => p.map(i => i.id===id ? {...i,done:!i.done} : i));
  const deleteItem = id => setItems(p => p.filter(i => i.id!==id));
  const saveEdit = (id) => { setItems(p => p.map(i => i.id===id ? {...i, category: editCat} : i)); setEditingId(null); };

  const applyPomo = () => { setFocusMins(tmpFocus); setBreakMins(tmpBreak); reset(); setShowPomoCfg(false); };
  const mm = Math.floor(remaining/60), ss = remaining%60;
  const total = isFocus ? focusMins*60 : breakMins*60;
  const pct = ((total - remaining) / total) * 100;

  // Calendar grid
  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth+1, 0).getDate();
  const cells = [];
  for (let i=0; i<firstDay; i++) cells.push(null);
  for (let d=1; d<=daysInMonth; d++) cells.push(d);

  const calKey = (d) => `${calYear}-${pad(calMonth+1)}-${pad(d)}`;
  const addCalNote = () => {
    if (!selectedDay || !calInput.trim()) return;
    const k = calKey(selectedDay);
    setCalNotes(p => ({ ...p, [k]: [...(p[k]||[]), calInput.trim()] }));
    setCalInput("");
  };
  const delCalNote = (k, idx) => setCalNotes(p => ({ ...p, [k]: p[k].filter((_,i)=>i!==idx) }));

  const isToday = (d) => d === now.getDate() && calMonth === now.getMonth() && calYear === now.getFullYear();

  return (
    <div style={s.page}>

      {/* ── Clock ── */}
      <div style={s.card}>
        <div style={s.bar}>
          <span style={s.dot}/>
          <span style={s.barTitle}>hyeoni s space ♡ ٩(❛ัᴗ❛ั ๑)</span>
          <div style={s.winBtns}><span style={s.winBtn}>—</span><span style={s.winBtn}>□</span></div>
        </div>
        <div style={s.clockBody}>
          <div style={s.clockMain}>
            <div style={s.clockTime}>{pad(now.getHours())}<span>:</span>{pad(now.getMinutes())}<span style={s.secs}>{pad(now.getSeconds())}</span></div>
            <div style={s.clockDate}>{dateStr}</div>
          </div>
          <div style={s.iconCol}>
            {PANELS.map((p, i) => {
              const Icon = PANEL_ICONS[i];
              return (
                <button key={p.id} onClick={() => { setActivePanel(activePanel===p.id?null:p.id); setPanelInput(""); }}
                  style={{ ...s.iconBtn, background: activePanel===p.id ? "#C8E8F8" : "#F0F8FF", border: activePanel===p.id ? "1.5px solid #7EC8E3" : "1.5px solid #C0DFF0" }}>
                  <Icon/>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Panel Drawer ── */}
      {activePanel && (() => {
        const meta = PANEL_META[activePanel];
        const list = panelItems[activePanel];
        const checked = panelChecked[activePanel];
        return (
          <div style={{ ...s.card, background: meta.color }}>
            <div style={{ ...s.bar, background: "#D8EEFA", borderBottom: "1px solid #B0D8F0" }}>
              <span style={{ ...s.barTitle, color: "#5A9FBF" }}>{meta.title}</span>
              <button onClick={() => setActivePanel(null)} style={s.closeBtn}>✕</button>
            </div>
            <div style={s.panelList}>
              {list.length === 0 && <div style={s.empty}>항목을 추가해보세요 🩵</div>}
              {list.map((item, idx) => (
                <div key={idx} style={s.panelRow}>
                  <input type="checkbox" checked={checked.includes(idx)} onChange={() => togglePanelCheck(activePanel,idx)} style={s.checkbox}/>
                  <span style={{ ...s.panelText, textDecoration: checked.includes(idx)?"line-through":"none", color: checked.includes(idx)?"#A0C8DC":"#3A7A9C" }}>{item}</span>
                  <button onClick={() => delPanelItem(activePanel,idx)} style={s.deleteBtn}>×</button>
                </div>
              ))}
            </div>
            <div style={s.inputRow}>
              <input style={s.textInput} placeholder={meta.placeholder} value={panelInput}
                onChange={e=>setPanelInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addPanelItem(activePanel)}/>
              <button onClick={()=>addPanelItem(activePanel)} style={{ ...s.sendBtn, background: meta.accent }}>ADD</button>
            </div>
          </div>
        );
      })()}

      {/* ── Pomodoro ── */}
      <div style={s.card}>
        <div style={s.bar}>
          <span style={s.dot}/>
          <span style={s.barTitle}>🍅 Pomodoro</span>
          <button onClick={()=>{ setTmpFocus(focusMins); setTmpBreak(breakMins); setShowPomoCfg(v=>!v); }} style={s.closeBtn}>⚙️</button>
        </div>
        {showPomoCfg && (
          <div style={{ padding:"10px 14px", background:"#EAF5FC", borderBottom:"1px solid #B8DCEF", display:"flex", gap:10, alignItems:"center", flexWrap:"wrap" }}>
            <label style={s.cfgLabel}>집중
              <input type="number" min={1} max={99} value={tmpFocus} onChange={e=>setTmpFocus(Number(e.target.value))} style={s.cfgInput}/>분
            </label>
            <label style={s.cfgLabel}>휴식
              <input type="number" min={1} max={99} value={tmpBreak} onChange={e=>setTmpBreak(Number(e.target.value))} style={s.cfgInput}/>분
            </label>
            <button onClick={applyPomo} style={{ ...s.sendBtn, padding:"4px 12px", fontSize:11 }}>적용</button>
          </div>
        )}
        <div style={{ padding:"16px 20px", display:"flex", flexDirection:"column", alignItems:"center", gap:10 }}>
          <div style={{ fontSize:12, color: isFocus?"#4A9ABF":"#A0B4E8", fontWeight:600, letterSpacing:1 }}>
            {phase==="idle" ? (isFocus?"집중 준비":"휴식 준비") : isFocus?"🎯 집중 중":"☕ 휴식 중"}
          </div>
          {/* Ring */}
          <div style={{ position:"relative", width:100, height:100 }}>
            <svg width="100" height="100" style={{ transform:"rotate(-90deg)" }}>
              <circle cx="50" cy="50" r="42" fill="none" stroke="#D8EEF8" strokeWidth="8"/>
              <circle cx="50" cy="50" r="42" fill="none" stroke={isFocus?"#7EC8E3":"#A0B4E8"} strokeWidth="8"
                strokeDasharray={`${2*Math.PI*42}`} strokeDashoffset={`${2*Math.PI*42*(1-pct/100)}`}
                strokeLinecap="round" style={{transition:"stroke-dashoffset 1s linear"}}/>
            </svg>
            <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:22, fontWeight:700, color:"#4A9ABF", letterSpacing:1 }}>
              {pad(mm)}:{pad(ss)}
            </div>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            {phase==="idle" && <button onClick={start} style={s.pomoBtn}>▶ 시작</button>}
            {phase==="focus" && <button onClick={pause} style={s.pomoBtn}>⏸ 일시정지</button>}
            {phase==="paused" && <button onClick={resume} style={s.pomoBtn}>▶ 재개</button>}
            <button onClick={reset} style={{ ...s.pomoBtn, background:"#C8DCE8" }}>↺ 초기화</button>
          </div>
          <div style={{ fontSize:11, color:"#90BFDC" }}>집중 {focusMins}분 · 휴식 {breakMins}분</div>
        </div>
      </div>

      {/* ── Calendar ── */}
      <div style={s.card}>
        <div style={s.bar}>
          <span style={s.dot}/>
          <div style={{ display:"flex", alignItems:"center", gap:6, flex:1 }}>
            <button onClick={()=>{ if(calMonth===0){setCalMonth(11);setCalYear(y=>y-1);}else setCalMonth(m=>m-1); setSelectedDay(null); }} style={s.calNavBtn}>‹</button>
            <span style={{ ...s.barTitle, flex:1, textAlign:"center" }}>{calYear}년 {calMonth+1}월</span>
            <button onClick={()=>{ if(calMonth===11){setCalMonth(0);setCalYear(y=>y+1);}else setCalMonth(m=>m+1); setSelectedDay(null); }} style={s.calNavBtn}>›</button>
          </div>
        </div>
        <div style={{ padding:"10px 10px 4px" }}>
          <div style={s.calGrid}>
            {["일","월","화","수","목","금","토"].map(d=>(
              <div key={d} style={{ ...s.calCell, color:"#90BFDC", fontWeight:700, fontSize:11 }}>{d}</div>
            ))}
            {cells.map((d,i) => {
              const k = d ? calKey(d) : null;
              const hasNote = d && calNotes[k]?.length > 0;
              return (
                <div key={i} onClick={()=>d&&setSelectedDay(selectedDay===d?null:d)}
                  style={{ ...s.calCell,
                    background: d && selectedDay===d ? "#B8E0F4" : isToday(d) ? "#DFF0FA" : "transparent",
                    borderRadius:6, cursor: d?"pointer":"default",
                    border: d && selectedDay===d ? "1.5px solid #7EC8E3" : "1.5px solid transparent",
                    color: isToday(d) ? "#4A9ABF" : "#3A6080",
                    fontWeight: isToday(d) ? 700 : 400,
                    position:"relative",
                  }}>
                  {d}
                  {hasNote && <div style={{ position:"absolute", bottom:2, left:"50%", transform:"translateX(-50%)", width:4, height:4, borderRadius:"50%", background:"#7EC8E3" }}/>}
                </div>
              );
            })}
          </div>
        </div>
        {selectedDay && (
          <div style={{ borderTop:"1px solid #B8DCEF", padding:"10px 12px", background:"#EAF5FC" }}>
            <div style={{ fontSize:12, fontWeight:700, color:"#5A9FBF", marginBottom:6 }}>{calMonth+1}월 {selectedDay}일 메모</div>
            {(calNotes[calKey(selectedDay)]||[]).map((n,i)=>(
              <div key={i} style={{ display:"flex", alignItems:"center", gap:6, marginBottom:4 }}>
                <span style={{ flex:1, fontSize:12, color:"#3A6080" }}>• {n}</span>
                <button onClick={()=>delCalNote(calKey(selectedDay),i)} style={s.deleteBtn}>×</button>
              </div>
            ))}
            <div style={{ display:"flex", gap:6, marginTop:6 }}>
              <input style={{ ...s.textInput, fontSize:12 }} placeholder="일정 추가..." value={calInput}
                onChange={e=>setCalInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addCalNote()}/>
              <button onClick={addCalNote} style={{ ...s.sendBtn, padding:"5px 10px", fontSize:11 }}>ADD</button>
            </div>
          </div>
        )}
      </div>

      {/* ── Memo ── */}
      <div style={s.card}>
        <div style={s.tabRow}>
          {TABS.map(tab => (
            <button key={tab} onClick={()=>setActiveTab(tab)}
              style={{ ...s.tab, ...(activeTab===tab?s.tabActive:{}) }}>{tab}</button>
          ))}
        </div>
        <div style={s.itemList}>
          {filtered.length===0 && <div style={s.empty}>메모가 없어요 🩵</div>}
          {filtered.map(item=>(
            <div key={item.id} style={s.itemRow}>
              <div style={{ ...s.catBadge, background: CAT_COLORS[item.category]?.bg||"#D6EFFF" }}>
                {CAT_COLORS[item.category]?.icon||"📌"}
              </div>
              <input type="checkbox" checked={item.done} onChange={()=>toggleDone(item.id)} style={s.checkbox}/>
              <span style={{ ...s.itemText, textDecoration:item.done?"line-through":"none", color:item.done?"#A0C0D8":"#3A6080" }}>
                {item.text}
              </span>
              {/* Category edit */}
              {editingId===item.id ? (
                <select value={editCat} onChange={e=>setEditCat(e.target.value)}
                  onBlur={()=>saveEdit(item.id)}
                  autoFocus
                  style={{ ...s.select, fontSize:10, padding:"2px 4px" }}>
                  {TABS.filter(t=>t!=="ALL").map(t=><option key={t} value={t}>{t}</option>)}
                </select>
              ) : (
                <span style={s.catLabel} onClick={()=>{ setEditingId(item.id); setEditCat(item.category); }} title="클릭해서 카테고리 변경">
                  {item.category} ✏️
                </span>
              )}
              <button onClick={()=>deleteItem(item.id)} style={s.deleteBtn}>×</button>
            </div>
          ))}
        </div>
        <div style={s.inputRow}>
          <select value={memoCategory} onChange={e=>setMemoCategory(e.target.value)} style={s.select}>
            {TABS.filter(t=>t!=="ALL").map(t=><option key={t} value={t}>{t}</option>)}
          </select>
          <input style={s.textInput} placeholder="memo..." value={memoInput}
            onChange={e=>setMemoInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendMemo()}/>
          <button onClick={sendMemo} style={s.sendBtn}>SEND</button>
        </div>
      </div>

    </div>
  );
}

const s = {
  page: { minHeight:"100vh", background:"linear-gradient(135deg,#EEF7FF 0%,#F5FBFF 100%)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:16, padding:24, fontFamily:"'Segoe UI','Apple SD Gothic Neo',sans-serif" },
  card: { width:340, background:"#F8FCFF", border:"1.5px solid #B8DCEF", borderRadius:14, overflow:"hidden", boxShadow:"0 4px 20px rgba(100,180,220,0.13)" },
  bar: { background:"#DFF0FA", padding:"7px 12px", display:"flex", alignItems:"center", gap:7, borderBottom:"1px solid #B8DCEF" },
  dot: { width:9, height:9, borderRadius:"50%", background:"#7EC8E3", display:"inline-block", flexShrink:0 },
  barTitle: { fontSize:11, color:"#5A9FBF", flex:1, letterSpacing:0.3, fontWeight:600 },
  winBtns: { display:"flex", gap:6 },
  winBtn: { fontSize:11, color:"#90C4DC", cursor:"pointer", padding:"0 3px" },
  closeBtn: { background:"none", border:"none", color:"#7AAFC8", fontSize:14, cursor:"pointer", padding:"0 2px" },
  clockBody: { display:"flex", alignItems:"center", padding:"18px 20px", gap:16 },
  clockMain: { flex:1 },
  clockTime: { fontSize:42, fontWeight:700, color:"#4A9ABF", letterSpacing:2, lineHeight:1, fontVariantNumeric:"tabular-nums" },
  secs: { fontSize:20, color:"#90C8DC", marginLeft:4 },
  clockDate: { marginTop:6, fontSize:13, color:"#7AAFC8", letterSpacing:0.5 },
  iconCol: { display:"flex", flexDirection:"column", gap:6 },
  iconBtn: { width:34, height:34, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", transition:"all 0.15s" },
  panelList: { padding:"10px 12px", minHeight:80, maxHeight:180, overflowY:"auto", display:"flex", flexDirection:"column", gap:6 },
  panelRow: { display:"flex", alignItems:"center", gap:8, background:"rgba(255,255,255,0.7)", borderRadius:8, padding:"7px 10px", border:"1px solid #C8E4F4" },
  panelText: { flex:1, fontSize:13, lineHeight:1.4 },
  pomoBtn: { background:"#7EC8E3", color:"#fff", border:"none", borderRadius:8, padding:"6px 14px", fontSize:12, fontWeight:700, cursor:"pointer" },
  cfgLabel: { fontSize:12, color:"#5A9FBF", display:"flex", alignItems:"center", gap:4 },
  cfgInput: { width:38, border:"1px solid #B8DCEF", borderRadius:6, padding:"3px 5px", fontSize:13, color:"#3A6080", textAlign:"center", outline:"none", margin:"0 3px" },
  calGrid: { display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:2, marginBottom:6 },
  calCell: { aspectRatio:"1", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12 },
  calNavBtn: { background:"none", border:"none", color:"#7AAFC8", fontSize:16, cursor:"pointer", padding:"0 4px" },
  tabRow: { display:"flex", borderBottom:"1px solid #B8DCEF", background:"#E8F5FC", padding:"6px 8px 0", gap:4 },
  tab: { padding:"5px 10px", fontSize:11, fontWeight:600, border:"none", background:"transparent", color:"#90BFDC", cursor:"pointer", borderRadius:"6px 6px 0 0", letterSpacing:0.5 },
  tabActive: { background:"#F8FCFF", color:"#4A9ABF", borderBottom:"2px solid #7EC8E3" },
  itemList: { padding:"10px 12px", minHeight:140, maxHeight:260, overflowY:"auto", display:"flex", flexDirection:"column", gap:6 },
  empty: { textAlign:"center", color:"#90C0DC", fontSize:13, marginTop:30 },
  itemRow: { display:"flex", alignItems:"center", gap:7, background:"#EEF8FF", borderRadius:8, padding:"7px 10px", border:"1px solid #C8E4F4" },
  catBadge: { width:24, height:24, borderRadius:6, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, flexShrink:0 },
  checkbox: { accentColor:"#7EC8E3", width:14, height:14, flexShrink:0, cursor:"pointer" },
  itemText: { flex:1, fontSize:13, lineHeight:1.4 },
  catLabel: { fontSize:10, color:"#90BFDC", background:"#E0F3FF", border:"1px solid #B8DCEF", borderRadius:4, padding:"1px 5px", flexShrink:0, cursor:"pointer", whiteSpace:"nowrap" },
  deleteBtn: { background:"none", border:"none", color:"#A0C8DC", fontSize:16, cursor:"pointer", padding:"0 2px", lineHeight:1, flexShrink:0 },
  inputRow: { display:"flex", borderTop:"1px solid #B8DCEF", padding:"9px 10px", gap:7, background:"#DFF0FA", alignItems:"center" },
  select: { fontSize:11, border:"1px solid #B8DCEF", borderRadius:8, padding:"5px 4px", background:"#F0F8FF", color:"#4A9ABF", outline:"none", cursor:"pointer" },
  textInput: { flex:1, border:"1px solid #B8DCEF", borderRadius:8, padding:"6px 10px", fontSize:13, background:"#F8FCFF", color:"#3A6080", outline:"none" },
  sendBtn: { background:"#7EC8E3", color:"#fff", border:"none", borderRadius:8, padding:"6px 13px", fontSize:12, fontWeight:700, cursor:"pointer", letterSpacing:0.5, flexShrink:0 },
};
