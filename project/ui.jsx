// Shared primitives: icons, buttons, placeholders

// ─── Icons (inline SVG, currentColor) ──────────────────────────
const Icon = {
  back: (p={}) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...p}><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  close: (p={}) => <svg width="22" height="22" viewBox="0 0 22 22" fill="none" {...p}><path d="M5 5l12 12M17 5L5 17" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg>,
  chevron: (p={}) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  chevronDown: (p={}) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  settings: (p={}) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33h0a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82v0a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  plus: (p={}) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg>,
  check: (p={}) => <svg width="18" height="18" viewBox="0 0 18 18" fill="none" {...p}><path d="M4 9.5l3.5 3.5L14 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  eye: (p={}) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" stroke="currentColor" strokeWidth="1.8"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/></svg>,
  copy: (p={}) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}><rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" strokeWidth="1.8"/></svg>,
  refresh: (p={}) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}><path d="M23 4v6h-6M1 20v-6h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  trash: (p={}) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  clock: (p={}) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8"/><path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  pin: (p={}) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}><path d="M12 22s-8-7.5-8-13a8 8 0 0116 0c0 5.5-8 13-8 13z" stroke="currentColor" strokeWidth="1.8"/><circle cx="12" cy="9" r="3" stroke="currentColor" strokeWidth="1.8"/></svg>,
  chart: (p={}) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}><path d="M3 3v18h18M7 14l3-3 4 4 5-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  users: (p={}) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  ball: (p={}) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" fill="currentColor" fillOpacity="0.08"/><circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.25"/><text x="12" y="15" textAnchor="middle" fontSize="7" fontWeight="700" fill="currentColor">8</text></svg>,
  arrowUp: (p={}) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><path d="M7 11V3m0 0L3 7m4-4l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  crown: (p={}) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}><path d="M2 18L4 8l5 4 3-6 3 6 5-4 2 10H2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>,
  cue: (p={}) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}><path d="M3 21L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="4.5" cy="19.5" r="2" fill="currentColor"/></svg>,
  globe: (p={}) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8"/><path d="M2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20" stroke="currentColor" strokeWidth="1.8"/></svg>,
  home: (p={}) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round"/><path d="M9 21V12h6v9" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round"/></svg>,
  person: (p={}) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.9"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"/></svg>,
  lock: (p={}) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}><rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="1.8"/></svg>,
  sparkle: (p={}) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}><path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>,
  card: (p={}) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}><rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M2 10h20" stroke="currentColor" strokeWidth="1.8"/></svg>,
  logout: (p={}) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  more: (p={}) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}><circle cx="12" cy="5" r="1.8" fill="currentColor"/><circle cx="12" cy="12" r="1.8" fill="currentColor"/><circle cx="12" cy="19" r="1.8" fill="currentColor"/></svg>,
  edit: (p={}) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}><path d="M12 20h9M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
};

// ─── Buttons ──────────────────────────────────────────────────
function TFButton({ children, kind = 'primary', size = 'lg', onClick, disabled, theme, style = {}, icon }) {
  const t = theme;
  const palettes = {
    primary:   { bg: t.primary,     fg: '#fff',      press: t.primaryDark  },
    success:   { bg: t.success,     fg: '#fff',      press: t.successDark  },
    danger:    { bg: t.danger,      fg: '#fff',      press: t.dangerDark   },
    ghost:     { bg: 'transparent', fg: t.primary,   press: t.primaryLight },
    secondary: { bg: t.ink100,      fg: t.ink900,    press: t.ink300       },
  };
  const p = palettes[kind];
  const heights = { sm: 36, md: 44, lg: 56, xl: 72 };
  const fontSizes = { sm: 14, md: 15, lg: 17, xl: 20 };
  const [pressed, setPressed] = React.useState(false);
  return (
    <button
      onClick={disabled ? undefined : onClick}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{
        height: heights[size], width: '100%', borderRadius: 12,
        background: disabled ? t.ink300 : (pressed ? p.press : p.bg),
        color: disabled ? t.ink500 : p.fg,
        border: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
        fontFamily: 'Inter, -apple-system, system-ui',
        fontWeight: 600, fontSize: fontSizes[size], letterSpacing: -0.2,
        transform: pressed && !disabled ? 'scale(0.985)' : 'scale(1)',
        transition: 'all 100ms ease',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        boxShadow: kind === 'primary' || kind === 'success' || kind === 'danger'
          ? `0 1px 2px ${p.bg}33, 0 4px 12px ${p.bg}22` : 'none',
        ...style,
      }}>
      {icon}{children}
    </button>
  );
}

// ─── Inputs ───────────────────────────────────────────────────
function TFInput({ label, value, onChange, placeholder, type = 'text', theme, right, error }) {
  const [focused, setFocused] = React.useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && <label style={{
        fontFamily: 'Inter', fontSize: 13, fontWeight: 500, color: theme.ink500,
      }}>{label}</label>}
      <div style={{
        display: 'flex', alignItems: 'center',
        height: 48, borderRadius: 12, padding: '0 14px',
        background: theme.card,
        border: `1.5px solid ${error ? theme.danger : focused ? theme.primary : theme.ink300}`,
        transition: 'border-color 120ms',
      }}>
        <input
          type={type} value={value || ''} onChange={onChange} placeholder={placeholder}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{
            flex: 1, border: 'none', outline: 'none', background: 'transparent',
            fontFamily: 'Inter', fontSize: 16, color: theme.ink900,
          }}/>
        {right}
      </div>
      {error && <div style={{ color: theme.danger, fontSize: 13, fontFamily: 'Inter' }}>{error}</div>}
    </div>
  );
}

// ─── Chip ─────────────────────────────────────────────────────
function TFChip({ children, active, onClick, theme, style }) {
  return (
    <button onClick={onClick} style={{
      height: 36, padding: '0 16px', borderRadius: 999,
      background: active ? theme.primary : theme.ink100,
      color: active ? '#fff' : theme.ink700,
      border: 'none', cursor: 'pointer',
      fontFamily: 'Inter', fontWeight: 600, fontSize: 14,
      transition: 'all 120ms', ...style,
    }}>{children}</button>
  );
}

// ─── Pill (status indicator) ──────────────────────────────────
function TFPill({ dot, children, color, bg, style }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '4px 10px', borderRadius: 999,
      background: bg, color,
      fontFamily: 'Inter', fontWeight: 600, fontSize: 12,
      letterSpacing: 0.3, textTransform: 'uppercase', ...style,
    }}>
      {dot && <span style={{ width: 7, height: 7, borderRadius: 999, background: color }}/>}
      {children}
    </span>
  );
}

// ─── Placeholder illustrations ────────────────────────────────
function TableIllustration({ theme, size = 140 }) {
  // Pool table silhouette, simple SVG
  const p = theme.primary, s = theme.ink300;
  return (
    <svg width={size} height={size * 0.8} viewBox="0 0 160 128" fill="none">
      {/* felt */}
      <rect x="10" y="20" width="140" height="88" rx="8" fill={theme.successLight}/>
      <rect x="10" y="20" width="140" height="88" rx="8" stroke={theme.success} strokeWidth="2" fill="none"/>
      {/* pockets */}
      {[[18,28],[80,28],[142,28],[18,100],[80,100],[142,100]].map(([x,y],i) =>
        <circle key={i} cx={x} cy={y} r="5" fill={theme.ink900}/>)}
      {/* balls */}
      <circle cx="55" cy="64" r="7" fill="#fff" stroke={s} strokeWidth="1"/>
      <circle cx="75" cy="58" r="7" fill={theme.danger}/>
      <circle cx="75" cy="70" r="7" fill={theme.warning}/>
      <circle cx="95" cy="64" r="7" fill={p}/>
      <text x="55" y="68" textAnchor="middle" fontSize="7" fontWeight="700" fill={theme.ink900}>8</text>
    </svg>
  );
}

function EmptyIllustration({ theme, size = 100 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="40" fill={theme.primaryLight}/>
      <circle cx="50" cy="50" r="22" fill={theme.card} stroke={theme.primary} strokeWidth="2"/>
      <path d="M50 38v14l9 5" stroke={theme.primary} strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
}

// ─── Time formatting ──────────────────────────────────────────
function formatElapsed(ms) {
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(h)}:${pad(m)}:${pad(sec)}`;
}
function formatDuration(ms) {
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60);
  if (h > 0) return `${h} ч ${m} мин`;
  return `${m} мин`;
}
function formatAmount(n) {
  return Math.round(n).toLocaleString('ru-RU').replace(/,/g, ' ');
}
function calcAmount(rate, ms) {
  return (rate * ms) / (1000 * 60 * 60);
}
function formatTime(d) {
  const date = new Date(d);
  return `${String(date.getHours()).padStart(2,'0')}:${String(date.getMinutes()).padStart(2,'0')}`;
}

// ─── Section header ───────────────────────────────────────────
function SectionHeader({ children, theme, right }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '16px 20px 8px',
      fontFamily: 'Inter', fontSize: 13, fontWeight: 600,
      color: theme.ink500, textTransform: 'uppercase', letterSpacing: 0.5,
    }}>
      <span>{children}</span>
      {right}
    </div>
  );
}

// ─── Bottom Navigation Bar ────────────────────────────────────
function TFBottomNav({ current, go, role, theme }) {
  const tabs = [
    { id: 'home',     label: 'Главная',  icon: (active) => <Icon.home style={{ color: active ? theme.primary : theme.ink500 }}/> },
    ...(role === 'owner' ? [{ id: 'reports', label: 'Отчёты', icon: (active) => <Icon.chart style={{ color: active ? theme.primary : theme.ink500 }}/> }] : []),
    { id: 'settings', label: 'Профиль', icon: (active) => <Icon.person style={{ color: active ? theme.primary : theme.ink500 }}/> },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 50,
      background: theme.card,
      borderTop: `1px solid ${theme.ink100}`,
      display: 'flex', alignItems: 'stretch',
      paddingBottom: 20, // home indicator space
    }}>
      {tabs.map(tab => {
        const active = current === tab.id;
        return (
          <button key={tab.id} onClick={() => go(tab.id)} style={{
            flex: 1, background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: 4, padding: '10px 0 0',
          }}>
            {tab.icon(active)}
            <span style={{
              fontFamily: 'Inter', fontSize: 11, fontWeight: active ? 700 : 500,
              color: active ? theme.primary : theme.ink500,
              letterSpacing: 0.1,
            }}>{tab.label}</span>
            {active && (
              <div style={{
                width: 4, height: 4, borderRadius: 99,
                background: theme.primary, marginTop: 1,
              }}/>
            )}
          </button>
        );
      })}
    </div>
  );
}

Object.assign(window, {
  Icon, TFButton, TFInput, TFChip, TFPill, TFBottomNav,
  TableIllustration, EmptyIllustration, SectionHeader,
  formatElapsed, formatDuration, formatAmount, calcAmount, formatTime,
});
