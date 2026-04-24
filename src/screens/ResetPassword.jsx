import { useState } from 'react';
import { Icon } from '../components/Icon';
import { TFButton } from '../components/Button';
import { TFInput } from '../components/Input';
import { SimpleHeader } from '../components/SectionHeader';

export function ScreenResetPassword({ theme, go }) {
  const [loginOrEmail, setLoginOrEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const valid = loginOrEmail.trim().length > 2;

  const contactSheet = contactOpen && (
    <>
      <div onClick={() => setContactOpen(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 40 }} />
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 41,
        background: theme.card, borderTopLeftRadius: 22, borderTopRightRadius: 22,
        padding: '10px 0 28px', boxShadow: '0 -10px 40px rgba(0,0,0,0.2)',
      }}>
        <div style={{ width: 40, height: 4, borderRadius: 2, background: theme.ink300, margin: '6px auto 14px' }} />
        <div style={{ padding: '0 20px 14px' }}>
          <div style={{ fontFamily: 'Inter', fontSize: 18, fontWeight: 800, color: theme.ink900, letterSpacing: -0.3 }}>Связаться с поддержкой</div>
          <div style={{ fontFamily: 'Inter', fontSize: 13, color: theme.ink500, marginTop: 4, lineHeight: 1.5 }}>
            Напишите или позвоните — поможем восстановить доступ.
          </div>
        </div>
        {[
          { label: 'WhatsApp', sub: '+996 555 12-34-56', bg: '#25D36615', fg: '#25D366', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M20.5 3.5A10 10 0 003.6 17.3L2 22l4.9-1.5a10 10 0 0013.6-17zM12 20.2a8.3 8.3 0 01-4.2-1.1l-.3-.2-2.9.9.9-2.8-.2-.3a8.3 8.3 0 1111.6 2.2 8.3 8.3 0 01-4.9 1.3zm4.8-6.2c-.3-.1-1.6-.8-1.8-.9-.3-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.6.1-.3-.1-1.1-.4-2.1-1.3-.8-.7-1.3-1.5-1.5-1.8-.2-.3 0-.4.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-1 .9-1 2.3s1 2.7 1.2 2.9c.1.2 2 3.1 5 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.6-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3z" fill="currentColor"/></svg> },
          { label: 'Telegram', sub: '@ymyrkai_support', bg: '#229ED915', fg: '#229ED9', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M21.5 3.2L2.9 10.4c-.9.4-.9 1.6 0 1.9l4.2 1.3 1.6 5.1c.2.7 1 .9 1.5.4l2.3-2.1 4.4 3.2c.6.4 1.4.1 1.6-.6l3.4-14.7c.2-.9-.7-1.7-1.4-1.7zm-3 4.5l-8.2 7.4-.3 3.1-1.3-4.2 9.8-6.3z" fill="currentColor"/></svg> },
          { label: 'Email', sub: 'support@ymyrkai.kg', bg: theme.primaryLight, fg: theme.primary, icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg> },
          { label: 'Позвонить', sub: '+996 700 12-34-56', bg: theme.successLight, fg: theme.success, icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7 12.8 12.8 0 00.7 2.8 2 2 0 01-.5 2.1L8 9.9a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.5 12.8 12.8 0 002.8.7 2 2 0 011.8 2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg> },
        ].map((c) => (
          <button key={c.label} onClick={() => setContactOpen(false)} style={{
            display: 'flex', alignItems: 'center', gap: 14, width: '100%',
            padding: '14px 20px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left',
            borderTop: `1px solid ${theme.ink100}`,
          }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: c.bg, color: c.fg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {c.icon}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: 'Inter', fontSize: 15, fontWeight: 700, color: theme.ink900 }}>{c.label}</div>
              <div style={{ fontFamily: 'Inter', fontSize: 13, color: theme.ink500, marginTop: 2 }}>{c.sub}</div>
            </div>
            <span style={{ color: theme.ink300 }}><Icon.chevron /></span>
          </button>
        ))}
      </div>
    </>
  );

  if (sent) return (
    <div style={{ height: '100%', background: theme.bg, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <SimpleHeader theme={theme} onBack={() => go('login')} title="Восстановление" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, textAlign: 'center' }}>
        <div style={{ width: 88, height: 88, borderRadius: 999, background: theme.successLight, color: theme.success, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, fontSize: 44 }}>✓</div>
        <div style={{ fontFamily: 'Inter', fontSize: 24, fontWeight: 800, color: theme.ink900, letterSpacing: -0.4 }}>Инструкция отправлена</div>
        <div style={{ fontFamily: 'Inter', fontSize: 15, color: theme.ink500, marginTop: 10, maxWidth: 300, lineHeight: 1.6 }}>
          Если <b style={{ color: theme.ink900 }}>{loginOrEmail}</b> привязан к аккаунту, мы отправили ссылку для сброса пароля. Проверьте почту или SMS.
        </div>
        <div style={{ marginTop: 28, width: '100%', maxWidth: 320, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <TFButton theme={theme} onClick={() => go('login')}>Вернуться ко входу</TFButton>
          <button onClick={() => setContactOpen(true)} style={{ background: 'transparent', border: 'none', padding: 12, cursor: 'pointer', fontFamily: 'Inter', fontSize: 14, fontWeight: 600, color: theme.primary }}>
            Ссылка не пришла? Свяжитесь с нами
          </button>
        </div>
      </div>
      {contactSheet}
    </div>
  );

  return (
    <div style={{ height: '100%', background: theme.bg, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <SimpleHeader theme={theme} onBack={() => go('login')} title="Восстановление пароля" />
      <div style={{ flex: 1, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{
          padding: 14, background: theme.primaryLight, borderRadius: 12,
          fontFamily: 'Inter', fontSize: 13, color: theme.primaryDark, lineHeight: 1.5,
          display: 'flex', gap: 10, alignItems: 'flex-start',
        }}>
          <span style={{ color: theme.primary, marginTop: 2 }}><Icon.lock /></span>
          Введите логин или email — мы отправим ссылку для сброса пароля.
        </div>
        <TFInput theme={theme} label="Логин или Email" placeholder="например, azamat@mail.kg" value={loginOrEmail} onChange={(e) => setLoginOrEmail(e.target.value)} />
        <button onClick={() => setContactOpen(true)} style={{
          marginTop: 4, background: 'transparent', border: `1.5px dashed ${theme.ink300}`,
          borderRadius: 12, padding: '14px 16px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left',
        }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: theme.primaryLight, color: theme.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M21 11.5a8.4 8.4 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.4 8.4 0 01-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.4 8.4 0 013.8-.9h.5a8.5 8.5 0 018 8v.5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 700, color: theme.ink900 }}>Не приходит ссылка?</div>
            <div style={{ fontFamily: 'Inter', fontSize: 12, color: theme.ink500, marginTop: 2 }}>Свяжитесь с нами — WhatsApp, Telegram, email, звонок</div>
          </div>
          <span style={{ color: theme.ink300 }}><Icon.chevron /></span>
        </button>
      </div>
      <div style={{ padding: 24 }}>
        <TFButton theme={theme} disabled={!valid} onClick={() => setSent(true)}>Отправить ссылку</TFButton>
      </div>
      {contactSheet}
    </div>
  );
}
