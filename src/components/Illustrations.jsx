export function TableIllustration({ theme, size = 140 }) {
  const p = theme.primary;
  const s = theme.ink300;
  return (
    <svg width={size} height={size * 0.8} viewBox="0 0 160 128" fill="none">
      <rect x="10" y="20" width="140" height="88" rx="8" fill={theme.successLight} />
      <rect x="10" y="20" width="140" height="88" rx="8" stroke={theme.success} strokeWidth="2" fill="none" />
      {[[18,28],[80,28],[142,28],[18,100],[80,100],[142,100]].map(([x,y],i) =>
        <circle key={i} cx={x} cy={y} r="5" fill={theme.ink900} />
      )}
      <circle cx="55" cy="64" r="7" fill="#fff" stroke={s} strokeWidth="1" />
      <circle cx="75" cy="58" r="7" fill={theme.danger} />
      <circle cx="75" cy="70" r="7" fill={theme.warning} />
      <circle cx="95" cy="64" r="7" fill={p} />
      <text x="55" y="68" textAnchor="middle" fontSize="7" fontWeight="700" fill={theme.ink900}>8</text>
    </svg>
  );
}

export function EmptyIllustration({ theme, size = 100 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="40" fill={theme.primaryLight} />
      <circle cx="50" cy="50" r="22" fill={theme.card} stroke={theme.primary} strokeWidth="2" />
      <path d="M50 38v14l9 5" stroke={theme.primary} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
