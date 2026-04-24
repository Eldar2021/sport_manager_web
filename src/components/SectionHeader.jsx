export function SectionHeader({ children, theme, right }) {
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

export function SimpleHeader({ theme, onBack, title, right }) {
  return (
    <div style={{
      padding: '60px 16px 12px', background: theme.card,
      borderBottom: `1px solid ${theme.ink100}`,
      display: 'flex', alignItems: 'center', gap: 8,
    }}>
      <button onClick={onBack} style={{ background: 'none', border: 'none', color: theme.primary, padding: 8, cursor: 'pointer' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      <div style={{ flex: 1, fontFamily: 'Inter', fontSize: 20, fontWeight: 800, color: theme.ink900 }}>{title}</div>
      {right}
    </div>
  );
}
