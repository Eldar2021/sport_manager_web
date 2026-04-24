import { Icon } from '../components/Icon';
import { TFButton } from '../components/Button';
import { SimpleHeader } from '../components/SectionHeader';
import { RU } from '../tokens';
import { formatAmount } from '../utils';

export function ScreenVenueMgmt({ theme, go, venues, setVenues, setEditVenue, setActiveVenueId }) {
  return (
    <div style={{ height: '100%', background: theme.bg, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <SimpleHeader
        theme={theme}
        onBack={() => go('settings')}
        title={RU.venueMgmt}
        right={venues.length > 0 && (
          <button onClick={() => setVenues([])} title="Demo: clear venues" style={{
            background: theme.ink100, border: 'none', color: theme.ink500,
            padding: '6px 10px', borderRadius: 8, cursor: 'pointer',
            fontFamily: 'Inter', fontSize: 11, fontWeight: 600,
          }}>⟲ Пусто</button>
        )}
      />
      <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
        {venues.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 24px', textAlign: 'center', gap: 16 }}>
            <div style={{ width: 88, height: 88, borderRadius: 22, background: theme.primaryLight, color: theme.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon.pin />
            </div>
            <div style={{ fontFamily: 'Inter', fontSize: 20, fontWeight: 800, color: theme.ink900, letterSpacing: -0.4 }}>Залов пока нет</div>
            <div style={{ fontFamily: 'Inter', fontSize: 14, color: theme.ink500, lineHeight: 1.6, maxWidth: 280 }}>
              Создайте первый зал, чтобы добавить столы и принимать сессии.
            </div>
            <TFButton theme={theme} kind="primary" size="md" style={{ maxWidth: 220, marginTop: 8 }}
              icon={<Icon.plus />} onClick={() => { setEditVenue && setEditVenue(null); go('firstVenueSetup'); }}>
              Создать зал
            </TFButton>
          </div>
        ) : venues.map(v => (
          <button key={v.id} onClick={() => { setActiveVenueId && setActiveVenueId(v.id); go('venueDetail'); }} style={{
            display: 'block', width: '100%', textAlign: 'left',
            background: theme.card, borderRadius: 14, padding: 16, marginBottom: 10,
            border: `1px solid ${theme.ink100}`, cursor: 'pointer',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 11, background: theme.primaryLight, color: theme.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon.pin />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Inter', fontSize: 16, fontWeight: 700, color: theme.ink900 }}>{v.name}</div>
                <div style={{ fontFamily: 'Inter', fontSize: 13, color: theme.ink500, marginTop: 2 }}>{v.code}{v.address ? ` · ${v.address}` : ''}</div>
              </div>
              <span style={{ color: theme.ink300 }}><Icon.chevron /></span>
            </div>
            <div style={{ display: 'flex', gap: 16, marginTop: 12, paddingTop: 12, borderTop: `1px solid ${theme.ink100}` }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Inter', fontSize: 11, color: theme.ink500, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.4 }}>Столов</div>
                <div style={{ fontFamily: 'Inter', fontSize: 18, fontWeight: 800, color: theme.ink900, marginTop: 2 }}>{v.tables}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Inter', fontSize: 11, color: theme.ink500, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.4 }}>Выручка / мес</div>
                <div style={{ fontFamily: 'Inter', fontSize: 18, fontWeight: 800, color: theme.ink900, marginTop: 2, fontVariantNumeric: 'tabular-nums' }}>{formatAmount(142500 - v.tables * 1000)}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
      {venues.length > 0 && (
        <div style={{ padding: 16, background: theme.card, borderTop: `1px solid ${theme.ink100}` }}>
          <TFButton theme={theme} icon={<Icon.plus />} onClick={() => { setEditVenue && setEditVenue(null); go('firstVenueSetup'); }}>{RU.newVenue}</TFButton>
        </div>
      )}
    </div>
  );
}
