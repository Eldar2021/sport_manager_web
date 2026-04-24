import { useState } from 'react';
import { Icon } from '../components/Icon';
import { TFButton } from '../components/Button';
import { SimpleHeader } from '../components/SectionHeader';
import { formatAmount } from '../utils';

export function ScreenVenueDetail({ theme, go, venue, tables, setEditVenue, setShowDeleteVenue, setEditTable }) {
  const [menuOpen, setMenuOpen] = useState(false);
  if (!venue) return null;
  const venueTables = tables || [];

  return (
    <div style={{ height: '100%', background: theme.bg, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <SimpleHeader
        theme={theme}
        onBack={() => go('venueMgmt')}
        title={venue.name}
        right={
          <button onClick={() => setMenuOpen(o => !o)} style={{ background: 'transparent', border: 'none', padding: 8, cursor: 'pointer', color: theme.ink700 }}>
            <Icon.more />
          </button>
        }
      />

      {menuOpen && (
        <>
          <div onClick={() => setMenuOpen(false)} style={{ position: 'absolute', inset: 0, zIndex: 30 }} />
          <div style={{
            position: 'absolute', top: 56, right: 12, zIndex: 31,
            background: theme.card, borderRadius: 12, overflow: 'hidden',
            boxShadow: '0 12px 32px rgba(0,0,0,0.18)', border: `1px solid ${theme.ink100}`,
            minWidth: 180,
          }}>
            <button onClick={() => { setMenuOpen(false); setEditVenue(venue); go('firstVenueSetup'); }} style={{
              display: 'flex', alignItems: 'center', gap: 12, width: '100%',
              padding: '12px 14px', background: 'transparent', border: 'none', cursor: 'pointer',
              fontFamily: 'Inter', fontSize: 14, color: theme.ink900, textAlign: 'left',
              borderBottom: `1px solid ${theme.ink100}`,
            }}>
              <span style={{ color: theme.primary }}><Icon.edit /></span>
              Редактировать
            </button>
            <button onClick={() => { setMenuOpen(false); setShowDeleteVenue(venue); }} style={{
              display: 'flex', alignItems: 'center', gap: 12, width: '100%',
              padding: '12px 14px', background: 'transparent', border: 'none', cursor: 'pointer',
              fontFamily: 'Inter', fontSize: 14, color: theme.danger, textAlign: 'left',
            }}>
              <span><Icon.trash /></span>
              Удалить
            </button>
          </div>
        </>
      )}

      <div style={{ flex: 1, overflow: 'auto' }}>
        <div style={{ padding: 16 }}>
          <div style={{
            background: theme.card, borderRadius: 14, padding: 16,
            border: `1px solid ${theme.ink100}`,
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: theme.primaryLight, color: theme.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon.pin />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: 'Inter', fontSize: 18, fontWeight: 800, color: theme.ink900, letterSpacing: -0.3 }}>{venue.name}</div>
              <div style={{ fontFamily: 'Inter', fontSize: 13, color: theme.ink500, marginTop: 4 }}>
                {venue.code}{venue.address ? ` · ${venue.address}` : ''}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
            <div style={{ flex: 1, background: theme.card, borderRadius: 12, padding: 14, border: `1px solid ${theme.ink100}` }}>
              <div style={{ fontFamily: 'Inter', fontSize: 11, color: theme.ink500, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.4 }}>Столов</div>
              <div style={{ fontFamily: 'Inter', fontSize: 22, fontWeight: 800, color: theme.ink900, marginTop: 4 }}>{venueTables.length}</div>
            </div>
            <div style={{ flex: 1, background: theme.card, borderRadius: 12, padding: 14, border: `1px solid ${theme.ink100}` }}>
              <div style={{ fontFamily: 'Inter', fontSize: 11, color: theme.ink500, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.4 }}>Выручка / мес</div>
              <div style={{ fontFamily: 'Inter', fontSize: 22, fontWeight: 800, color: theme.ink900, marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>
                {formatAmount(142500 - venueTables.length * 1000)}
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding: '4px 16px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 4px 10px' }}>
            <div style={{ fontFamily: 'Inter', fontSize: 12, fontWeight: 700, color: theme.ink500, textTransform: 'uppercase', letterSpacing: 0.5 }}>Столы зала</div>
            <div style={{ fontFamily: 'Inter', fontSize: 12, color: theme.ink500 }}>{venueTables.length} шт.</div>
          </div>
          <div style={{ background: theme.card, borderRadius: 14, border: `1px solid ${theme.ink100}`, overflow: 'hidden' }}>
            {venueTables.length === 0 ? (
              <div style={{ padding: '24px 16px', textAlign: 'center', fontFamily: 'Inter', fontSize: 14, color: theme.ink500 }}>
                В этом зале пока нет столов
              </div>
            ) : venueTables.map((t, i) => (
              <button key={t.id} onClick={() => { setEditTable && setEditTable(t); go('tableDetail'); }} style={{
                width: '100%', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12,
                borderBottom: i < venueTables.length - 1 ? `1px solid ${theme.ink100}` : 'none',
                background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left',
              }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: theme.ink100, color: theme.ink700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon.ball />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'Inter', fontSize: 15, fontWeight: 700, color: theme.ink900 }}>{t.name}</div>
                  <div style={{ fontFamily: 'Inter', fontSize: 12, color: theme.ink500, marginTop: 2 }}>«{t.sub}»</div>
                </div>
                <div style={{ padding: '5px 10px', background: theme.primaryLight, color: theme.primary, borderRadius: 8, fontFamily: 'Inter', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
                  {t.rate} сом
                </div>
                <span style={{ color: theme.ink300 }}><Icon.chevron /></span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: 16, background: theme.card, borderTop: `1px solid ${theme.ink100}` }}>
        <TFButton theme={theme} icon={<Icon.plus />} onClick={() => { setEditTable && setEditTable(null); go('tableDetail'); }}>
          Добавить стол
        </TFButton>
      </div>
    </div>
  );
}
