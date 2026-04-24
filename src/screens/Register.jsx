import { Icon } from '../components/Icon';
import { TFButton } from '../components/Button';
import { TFInput } from '../components/Input';
import { TFPill } from '../components/Pill';
import { RU } from '../tokens';

export function ScreenRegisterOwner({ theme, go }) {
  return (
    <div style={{ height: '100%', background: theme.bg, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '60px 16px 0' }}>
        <button onClick={() => go('role')} style={{ background: 'none', border: 'none', color: theme.primary, padding: 8, cursor: 'pointer' }}>
          <Icon.back />
        </button>
      </div>
      <div style={{ padding: '16px 24px 8px' }}>
        <div style={{ fontFamily: 'Inter', fontSize: 28, fontWeight: 800, color: theme.ink900, letterSpacing: -0.8 }}>Регистрация владельца</div>
        <TFPill color={theme.primary} bg={theme.primaryLight} style={{ marginTop: 10 }}>
          <Icon.crown /> {RU.owner}
        </TFPill>
      </div>
      <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 14, flex: 1, overflow: 'auto' }}>
        <TFInput theme={theme} label={RU.name} placeholder="Бакыт" value="Бакыт Сулайманов" onChange={() => {}} />
        <TFInput theme={theme} label={RU.phone} placeholder="+996 ..." value="+996 555 12 34 56" onChange={() => {}} />
        <TFInput theme={theme} label={RU.email} value="bakyt@example.kg" onChange={() => {}} />
        <TFInput theme={theme} label={RU.password} type="password" value="••••••••••" onChange={() => {}} />
        <TFInput theme={theme} label={RU.passwordAgain} type="password" value="••••••••••" onChange={() => {}} />
        <label style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4, fontFamily: 'Inter', fontSize: 14, color: theme.ink700 }}>
          <span style={{ width: 22, height: 22, borderRadius: 6, background: theme.primary, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon.check />
          </span>
          {RU.agreeTerms}
        </label>
      </div>
      <div style={{ padding: 24 }}>
        <TFButton theme={theme} onClick={() => go('firstVenueSetup')}>{RU.createAccount}</TFButton>
      </div>
    </div>
  );
}

export function ScreenRegisterManager({ theme, go }) {
  return (
    <div style={{ height: '100%', background: theme.bg, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '60px 16px 0' }}>
        <button onClick={() => go('role')} style={{ background: 'none', border: 'none', color: theme.primary, padding: 8, cursor: 'pointer' }}>
          <Icon.back />
        </button>
      </div>
      <div style={{ padding: '16px 24px 8px' }}>
        <div style={{ fontFamily: 'Inter', fontSize: 28, fontWeight: 800, color: theme.ink900, letterSpacing: -0.8 }}>Регистрация менеджера</div>
        <TFPill color={theme.success} bg={theme.successLight} style={{ marginTop: 10 }}>
          <Icon.users /> {RU.manager}
        </TFPill>
      </div>
      <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
        <div style={{
          padding: 14, background: theme.primaryLight, borderRadius: 12,
          fontFamily: 'Inter', fontSize: 13, color: theme.primaryDark, lineHeight: 1.5,
        }}>
          <Icon.sparkle /> Получите код приглашения у владельца зала
        </div>
        <TFInput theme={theme} label={RU.inviteCode} placeholder="TF-XXXXX" value="TF-48X2KD" onChange={() => {}} />
        <TFInput theme={theme} label="Логин" value="aibek" onChange={() => {}} />
        <TFInput theme={theme} label={RU.name} value="Айбек Асанов" onChange={() => {}} />
        <TFInput theme={theme} label={RU.password} type="password" value="••••••••" onChange={() => {}} />
      </div>
      <div style={{ padding: 24 }}>
        <TFButton theme={theme} onClick={() => go('home')}>{RU.createAccount}</TFButton>
      </div>
    </div>
  );
}
