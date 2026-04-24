import { useState } from 'react';
import { Icon } from '../components/Icon';
import { TFButton } from '../components/Button';
import { TFPill } from '../components/Pill';
import { TFBottomNav } from '../components/BottomNav';
import { SectionHeader } from '../components/SectionHeader';
import { RU } from '../tokens';
import { TF_VENUES, TF_MANAGERS } from '../data';

export function ScreenSettings({ theme, go, role }) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const row = (icon, label, target, color, sub) => (
    <button onClick={() => go(target)} style={{
      width: '100%', background: theme.card, border: 'none',
      padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14,
      cursor: 'pointer', textAlign: 'left',
      borderBottom: `1px solid ${theme.ink100}`,
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 9, background: color + '22',
        color, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: 'Inter', fontSize: 15, fontWeight: 600, color: theme.ink900 }}>{label}</div>
        {sub && <div style={{ fontFamily: 'Inter', fontSize: 12, color: theme.ink500, marginTop: 2 }}>{sub}</div>}
      </div>
      <span style={{ color: theme.ink300 }}><Icon.chevron /></span>
    </button>
  );

  return (
    <div style={{ height: '100%', background: theme.bg, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ padding: '60px 16px 16px', background: theme.card, borderBottom: `1px solid ${theme.ink100}` }}>
        <div style={{ fontFamily: 'Inter', fontSize: 20, fontWeight: 800, color: theme.ink900, padding: '0 4px' }}>{RU.settings}</div>
      </div>

      <div style={{ flex: 1, overflow: 'auto', paddingBottom: 80 }}>
        <div style={{ padding: 16 }}>
          <div style={{ background: theme.card, borderRadius: 16, padding: 16, display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 52, height: 52, borderRadius: 999,
              background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`,
              color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Inter', fontWeight: 700, fontSize: 18,
            }}>{role === 'owner' ? 'БС' : 'АА'}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'Inter', fontSize: 16, fontWeight: 700, color: theme.ink900 }}>
                {role === 'owner' ? 'Бакыт Сулайманов' : 'Айбек Асанов'}
              </div>
              <div style={{ marginTop: 4 }}>
                <TFPill
                  color={role === 'owner' ? theme.primary : theme.success}
                  bg={role === 'owner' ? theme.primaryLight : theme.successLight}>
                  {role === 'owner' ? <Icon.crown /> : <Icon.users />}
                  {role === 'owner' ? RU.owner : RU.manager}
                </TFPill>
              </div>
            </div>
          </div>
        </div>

        {role === 'owner' && (
          <>
            <SectionHeader theme={theme}>Управление</SectionHeader>
            <div style={{ borderRadius: 14, overflow: 'hidden', margin: '0 16px' }}>
              {row(<Icon.pin />, RU.venueMgmt, 'venueMgmt', theme.primary, `${TF_VENUES.length} залов`)}
              {row(<Icon.users />, RU.managerMgmt, 'managerMgmt', theme.success, `${TF_MANAGERS.length} менеджеров`)}
            </div>
          </>
        )}

        <SectionHeader theme={theme}>Аккаунт</SectionHeader>
        <div style={{ borderRadius: 14, overflow: 'hidden', margin: '0 16px' }}>
          {role === 'owner' && row(<Icon.card />, RU.subscription, 'subscription', theme.primary, 'Активна · до 15 мая')}
          {row(<Icon.lock />, RU.changePassword, 'resetPassword', theme.ink700)}
        </div>

        <div style={{ padding: 16, marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button onClick={() => setShowLogoutConfirm(true)} style={{
            width: '100%', background: theme.card, border: 'none',
            padding: 14, borderRadius: 14, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            color: theme.danger, fontFamily: 'Inter', fontSize: 15, fontWeight: 600,
          }}>
            <Icon.logout /> {RU.logout}
          </button>
          <button onClick={() => setShowDeleteConfirm(true)} style={{
            width: '100%', background: 'transparent', border: `1.5px solid ${theme.ink300}`,
            padding: 14, borderRadius: 14, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            color: theme.ink500, fontFamily: 'Inter', fontSize: 14, fontWeight: 600,
          }}>
            <Icon.trash /> Удалить аккаунт
          </button>
        </div>

        <div style={{ textAlign: 'center', fontFamily: 'Inter', fontSize: 12, color: theme.ink500, padding: 16 }}>
          TableFlow v1.0 · MVP
        </div>
      </div>

      <TFBottomNav current="settings" go={go} role={role} theme={theme} />

      {showLogoutConfirm && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.45)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <div style={{ background: theme.card, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: '24px 20px 32px' }}>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{ width: 56, height: 56, borderRadius: 999, background: theme.dangerLight, color: theme.danger, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}><Icon.logout /></div>
              <div style={{ fontFamily: 'Inter', fontSize: 18, fontWeight: 800, color: theme.ink900 }}>Выйти из аккаунта?</div>
              <div style={{ fontFamily: 'Inter', fontSize: 14, color: theme.ink500, marginTop: 6, lineHeight: 1.5 }}>
                Вы будете перенаправлены на экран входа. Данные сохранятся.
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <TFButton theme={theme} kind="danger" onClick={() => { setShowLogoutConfirm(false); go('welcome'); }}>Выйти</TFButton>
              <TFButton theme={theme} kind="ghost" size="md" onClick={() => setShowLogoutConfirm(false)}>{RU.cancel}</TFButton>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.45)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <div style={{ background: theme.card, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: '24px 20px 32px' }}>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{ width: 56, height: 56, borderRadius: 999, background: theme.dangerLight, color: theme.danger, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}><Icon.trash /></div>
              <div style={{ fontFamily: 'Inter', fontSize: 18, fontWeight: 800, color: theme.ink900 }}>Удалить аккаунт?</div>
              <div style={{ fontFamily: 'Inter', fontSize: 14, color: theme.ink500, marginTop: 6, lineHeight: 1.55 }}>
                Все данные, сессии и настройки будут <b style={{ color: theme.danger }}>безвозвратно удалены</b>. Это действие нельзя отменить.
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <TFButton theme={theme} kind="danger" onClick={() => { setShowDeleteConfirm(false); go('welcome'); }}>Удалить навсегда</TFButton>
              <TFButton theme={theme} kind="ghost" size="md" onClick={() => setShowDeleteConfirm(false)}>{RU.cancel}</TFButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
