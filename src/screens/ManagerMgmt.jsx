import { useState } from 'react';
import { Icon } from '../components/Icon';
import { TFButton } from '../components/Button';
import { SectionHeader, SimpleHeader } from '../components/SectionHeader';
import { EmptyIllustration } from '../components/Illustrations';
import { RU } from '../tokens';
import { TF_MANAGERS } from '../data';

export function ScreenManagerMgmt({ theme, go, showToast }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    setCopied(true);
    showToast && showToast('Код скопирован');
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div style={{ height: '100%', background: theme.bg, display: 'flex', flexDirection: 'column' }}>
      <SimpleHeader theme={theme} onBack={() => go('settings')} title={RU.managerMgmt} />
      <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
        <div style={{
          background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`,
          color: '#fff', borderRadius: 16, padding: 20, marginBottom: 20,
        }}>
          <div style={{ fontFamily: 'Inter', fontSize: 12, fontWeight: 600, opacity: 0.85, textTransform: 'uppercase', letterSpacing: 0.5 }}>{RU.activeInviteCode}</div>
          <div style={{ fontFamily: 'Inter', fontSize: 32, fontWeight: 800, marginTop: 8, letterSpacing: 2, fontVariantNumeric: 'tabular-nums' }}>
            TF-48X2KD
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            <button onClick={handleCopy} style={{
              flex: 1, background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff',
              padding: '10px 14px', borderRadius: 10, cursor: 'pointer',
              fontFamily: 'Inter', fontSize: 14, fontWeight: 600,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
              {copied ? <><Icon.check /> {RU.copied}</> : <><Icon.copy /> {RU.copy}</>}
            </button>
            <button style={{
              flex: 1, background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff',
              padding: '10px 14px', borderRadius: 10, cursor: 'pointer',
              fontFamily: 'Inter', fontSize: 14, fontWeight: 600,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}><Icon.refresh /> {RU.refresh}</button>
          </div>
        </div>

        <SectionHeader theme={theme}>{RU.registeredManagers}</SectionHeader>
        {TF_MANAGERS.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 20px', textAlign: 'center', gap: 12, background: theme.card, borderRadius: 14, border: `1px solid ${theme.ink100}` }}>
            <EmptyIllustration theme={theme} size={80} />
            <div style={{ fontFamily: 'Inter', fontSize: 16, fontWeight: 700, color: theme.ink900 }}>Менеджеров пока нет</div>
            <div style={{ fontFamily: 'Inter', fontSize: 13, color: theme.ink500, lineHeight: 1.6 }}>{RU.emptyManagers}</div>
          </div>
        ) : (
          <div style={{ background: theme.card, borderRadius: 14, border: `1px solid ${theme.ink100}`, overflow: 'hidden' }}>
            {TF_MANAGERS.map((m, i) => (
              <div key={m.id} style={{
                padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12,
                borderBottom: i < TF_MANAGERS.length - 1 ? `1px solid ${theme.ink100}` : 'none',
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 999,
                  background: [theme.primary, theme.success, theme.warning][i % 3],
                  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Inter', fontWeight: 700, fontSize: 14,
                }}>{m.name.split(' ').map(s => s[0]).join('')}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'Inter', fontSize: 15, fontWeight: 700, color: theme.ink900 }}>{m.name}</div>
                  <div style={{ fontFamily: 'Inter', fontSize: 12, color: theme.ink500, marginTop: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
                    @{m.username}
                    <span style={{ width: 3, height: 3, borderRadius: 999, background: theme.ink500 }} />
                    {RU.lastSeen} {m.unit === 'min' ? RU.minAgo(m.lastSeen) : RU.daysAgo(m.lastSeen)}
                  </div>
                </div>
                <button style={{ background: 'none', border: 'none', color: theme.danger, padding: 8, cursor: 'pointer' }}><Icon.trash /></button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div style={{ padding: 16, background: theme.card, borderTop: `1px solid ${theme.ink100}` }}>
        <TFButton theme={theme} icon={<Icon.plus />}>{RU.inviteManager}</TFButton>
      </div>
    </div>
  );
}
