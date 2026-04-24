import { Icon } from '../components/Icon';
import { TFButton } from '../components/Button';
import { TableIllustration } from '../components/Illustrations';
import { RU } from '../tokens';

export function ScreenWelcome({ theme, go, role }) {
  return (
    <div style={{
      height: '100%', background: theme.card,
      display: 'flex', flexDirection: 'column',
      padding: '60px 24px 32px',
    }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
        <div style={{
          width: 88, height: 88, borderRadius: 24,
          background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 12px 24px ${theme.primary}44`,
          color: '#fff',
        }}>
          <Icon.cue />
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'Inter', fontSize: 36, fontWeight: 800, letterSpacing: -0.8, color: theme.ink900 }}>
            TableFlow
          </div>
          <div style={{ fontFamily: 'Inter', fontSize: 16, color: theme.ink500, marginTop: 8, maxWidth: 260 }}>
            {RU.tagline}
          </div>
        </div>
        <TableIllustration theme={theme} size={200} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <TFButton theme={theme} kind="primary" onClick={() => go('login')}>{RU.login}</TFButton>
        <TFButton theme={theme} kind="secondary" onClick={() => go(role === 'manager' ? 'registerManager' : 'role')}>{RU.register}</TFButton>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 8, color: theme.ink500 }}>
          <Icon.globe />
          <span style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 500 }}>RU · KG · TR</span>
        </div>
      </div>
    </div>
  );
}
