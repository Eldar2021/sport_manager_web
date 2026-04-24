import { useState } from 'react';
import { Icon } from '../components/Icon';
import { TFButton } from '../components/Button';
import { TFInput } from '../components/Input';
import { RU } from '../tokens';

export function ScreenLogin({ theme, go, role }) {
  const [u, setU] = useState('aibek');
  const [p, setP] = useState('••••••••');
  const [show, setShow] = useState(false);

  return (
    <div style={{ height: '100%', background: theme.bg, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '60px 16px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
        <button onClick={() => go('welcome')} style={{ background: 'none', border: 'none', color: theme.primary, padding: 8, cursor: 'pointer' }}>
          <Icon.back />
        </button>
      </div>
      <div style={{ padding: '24px 24px 16px' }}>
        <div style={{ fontFamily: 'Inter', fontSize: 32, fontWeight: 800, color: theme.ink900, letterSpacing: -0.8 }}>{RU.login}</div>
        <div style={{ fontFamily: 'Inter', fontSize: 15, color: theme.ink500, marginTop: 6 }}>Введите данные для входа</div>
      </div>
      <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
        <TFInput theme={theme} label={RU.username} value={u} onChange={(e) => setU(e.target.value)} />
        <TFInput
          theme={theme} label={RU.password} type={show ? 'text' : 'password'}
          value={p} onChange={(e) => setP(e.target.value)}
          right={
            <button onClick={() => setShow(s => !s)} style={{ background: 'none', border: 'none', color: theme.ink500, cursor: 'pointer' }}>
              <Icon.eye />
            </button>
          }
        />
        <button
          onClick={() => go('resetPassword')}
          style={{ background: 'none', border: 'none', color: theme.primary, fontFamily: 'Inter', fontSize: 14, fontWeight: 600, cursor: 'pointer', alignSelf: 'flex-start', padding: 0 }}>
          {RU.forgotPassword}
        </button>
      </div>
      <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <TFButton theme={theme} onClick={() => go('home')}>{RU.login}</TFButton>
        <div style={{ textAlign: 'center', fontFamily: 'Inter', fontSize: 15, color: theme.ink500 }}>
          {RU.noAccount}{' '}
          <button
            onClick={() => go(role === 'manager' ? 'registerManager' : 'role')}
            style={{ background: 'none', border: 'none', color: theme.primary, fontWeight: 600, cursor: 'pointer', padding: 0, fontSize: 15 }}>
            {RU.register}
          </button>
        </div>
      </div>
    </div>
  );
}
