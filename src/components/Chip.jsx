export function TFChip({ children, active, onClick, theme, style }) {
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
