import { useState } from 'react';

export function TFInput({ label, value, onChange, placeholder, type = 'text', theme, right, error }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && (
        <label style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 500, color: theme.ink500 }}>
          {label}
        </label>
      )}
      <div style={{
        display: 'flex', alignItems: 'center',
        height: 48, borderRadius: 12, padding: '0 14px',
        background: theme.card,
        border: `1.5px solid ${error ? theme.danger : focused ? theme.primary : theme.ink300}`,
        transition: 'border-color 120ms',
      }}>
        <input
          type={type}
          value={value || ''}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1, border: 'none', outline: 'none', background: 'transparent',
            fontFamily: 'Inter', fontSize: 16, color: theme.ink900,
          }}
        />
        {right}
      </div>
      {error && <div style={{ color: theme.danger, fontSize: 13, fontFamily: 'Inter' }}>{error}</div>}
    </div>
  );
}
