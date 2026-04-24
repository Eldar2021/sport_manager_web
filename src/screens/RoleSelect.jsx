import { useEffect } from 'react';
import { Icon } from '../components/Icon';
import { RU } from '../tokens';

export function ScreenRoleSelect({ theme, go, setRole, role }) {
  useEffect(() => {
    if (role === 'manager') { setRole('manager'); go('registerManager'); }
  }, []);

  const card = (icon, title, sub, next, roleVal) => (
    <button onClick={() => { setRole(roleVal); go(next); }} style={{
      background: theme.card, border: `1.5px solid ${theme.ink300}`,
      borderRadius: 16, padding: 20, textAlign: 'left',
      display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer',
      width: '100%',
    }}>
      <div style={{
        width: 56, height: 56, borderRadius: 14,
        background: theme.primaryLight, color: theme.primary,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: 'Inter', fontSize: 17, fontWeight: 700, color: theme.ink900 }}>{title}</div>
        <div style={{ fontFamily: 'Inter', fontSize: 13, color: theme.ink500, marginTop: 4 }}>{sub}</div>
      </div>
      <div style={{ color: theme.ink300 }}><Icon.chevron /></div>
    </button>
  );

  return (
    <div style={{ height: '100%', background: theme.bg, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '60px 16px 0', display: 'flex', alignItems: 'center' }}>
        <button onClick={() => go('welcome')} style={{ background: 'none', border: 'none', color: theme.primary, padding: 8, cursor: 'pointer' }}>
          <Icon.back />
        </button>
      </div>
      <div style={{ padding: '24px 24px 8px' }}>
        <div style={{ fontFamily: 'Inter', fontSize: 32, fontWeight: 800, color: theme.ink900, letterSpacing: -0.8 }}>{RU.chooseRole}</div>
        <div style={{ fontFamily: 'Inter', fontSize: 15, color: theme.ink500, marginTop: 6 }}>Это определит доступные функции</div>
      </div>
      <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        {card(<Icon.crown />, RU.iAmOwner, RU.iAmOwnerSub, 'registerOwner', 'owner')}
        {card(<Icon.users />, RU.iAmManager, RU.iAmManagerSub, 'registerManager', 'manager')}
      </div>
    </div>
  );
}
