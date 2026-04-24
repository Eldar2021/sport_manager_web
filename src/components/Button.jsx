import { useState } from 'react';

export function TFButton({ children, kind = 'primary', size = 'lg', onClick, disabled, theme, style = {}, icon }) {
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
  const [pressed, setPressed] = useState(false);
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
