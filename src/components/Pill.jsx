export function TFPill({ dot, children, color, bg, style }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '4px 10px', borderRadius: 999,
      background: bg, color,
      fontFamily: 'Inter', fontWeight: 600, fontSize: 12,
      letterSpacing: 0.3, textTransform: 'uppercase', ...style,
    }}>
      {dot && <span style={{ width: 7, height: 7, borderRadius: 999, background: color }} />}
      {children}
    </span>
  );
}
