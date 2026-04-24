import { useState } from 'react';
import { Icon } from '../components/Icon';
import { TFButton } from '../components/Button';
import { TFInput } from '../components/Input';

export function ScreenFirstVenueSetup({ theme, go, editVenue, setVenues }) {
  const isEdit = !!editVenue;
  const [name, setName] = useState(editVenue?.name || '');
  const [code, setCode] = useState(editVenue?.code || '');
  const [step, setStep] = useState(1);
  const valid = name.trim().length > 0;

  const onSubmit = () => {
    if (isEdit && setVenues) {
      setVenues(vs => vs.map(v => v.id === editVenue.id ? { ...v, name: name.trim(), code: code.trim() } : v));
      go('venueMgmt');
    } else {
      setStep(2);
    }
  };

  if (step === 2) return (
    <div style={{
      height: '100%', background: theme.bg,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: 32, textAlign: 'center',
    }}>
      <div style={{
        width: 88, height: 88, borderRadius: 999,
        background: theme.successLight, color: theme.success,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 24, fontSize: 44,
      }}>✓</div>
      <div style={{ fontFamily: 'Inter', fontSize: 28, fontWeight: 800, color: theme.ink900, letterSpacing: -0.6 }}>
        Зал создан!
      </div>
      <div style={{ fontFamily: 'Inter', fontSize: 15, color: theme.ink500, marginTop: 10, maxWidth: 280, lineHeight: 1.6 }}>
        «{name || 'Мой зал'}» готов к работе. Теперь добавьте столы.
      </div>
      <div style={{ marginTop: 40, width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <TFButton theme={theme} kind="success" onClick={() => go('home')}>Перейти на главную</TFButton>
        <TFButton theme={theme} kind="ghost" size="md" onClick={() => go('tableMgmt')}>Настроить столы</TFButton>
      </div>
    </div>
  );

  return (
    <div style={{ height: '100%', background: theme.bg, display: 'flex', flexDirection: 'column' }}>
      <div style={{
        padding: '60px 8px 14px', background: theme.card,
        borderBottom: `1px solid ${theme.ink100}`,
        display: 'flex', alignItems: 'center', gap: 4,
      }}>
        <button onClick={() => go(isEdit ? 'venueMgmt' : 'registerOwner')} style={{ background: 'none', border: 'none', color: theme.primary, padding: 8, cursor: 'pointer' }}>
          <Icon.back />
        </button>
        <div style={{ flex: 1, fontFamily: 'Inter', fontSize: 17, fontWeight: 700, color: theme.ink900 }}>
          {isEdit ? 'Редактировать зал' : 'Создайте первый зал'}
        </div>
      </div>

      {!isEdit && (
        <div style={{ padding: '20px 24px 12px' }}>
          <div style={{ fontFamily: 'Inter', fontSize: 14, color: theme.ink500, lineHeight: 1.5 }}>
            Дайте название вашему залу. Столы можно будет добавить позже с главной страницы.
          </div>
        </div>
      )}

      <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
        <TFInput theme={theme} label="Название зала" placeholder="Центральный филиал" value={name} onChange={e => setName(e.target.value)} />
        <TFInput theme={theme} label="Короткий код / номер (необязательно)" placeholder="№ 1 или ЦФ" value={code} onChange={e => setCode(e.target.value)} />
        {!isEdit && (
          <div style={{
            padding: 14, background: theme.primaryLight, borderRadius: 12,
            fontFamily: 'Inter', fontSize: 13, color: theme.primaryDark, lineHeight: 1.6,
            display: 'flex', gap: 10,
          }}>
            <span style={{ color: theme.primary, flexShrink: 0 }}><Icon.sparkle /></span>
            <span>После создания зала вы сможете добавлять столы по одному с собственным тарифом.</span>
          </div>
        )}
      </div>

      <div style={{ padding: 24 }}>
        <TFButton theme={theme} disabled={!valid} onClick={onSubmit}>
          {isEdit ? 'Обновить' : 'Создать зал →'}
        </TFButton>
      </div>
    </div>
  );
}
