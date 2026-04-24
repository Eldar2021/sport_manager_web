import { Icon } from '../components/Icon';
import { RU } from '../tokens';
import { TF_VENUES } from '../data';

export function ScreenVenuePicker({ theme, role, currentVenue, setCurrentVenue, close }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 100,
      background: 'rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
    }} onClick={close}>
      <div onClick={e => e.stopPropagation()} style={{
        background: theme.card, borderTopLeftRadius: 24, borderTopRightRadius: 24,
        padding: '8px 0 32px', maxHeight: '75%', overflow: 'auto',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}>
          <div style={{ width: 36, height: 5, background: theme.ink300, borderRadius: 999 }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px 8px' }}>
          <div style={{ fontFamily: 'Inter', fontSize: 20, fontWeight: 700, color: theme.ink900 }}>{RU.selectVenue}</div>
          <button onClick={close} style={{ background: theme.ink100, border: 'none', color: theme.ink700, padding: 8, borderRadius: 999, cursor: 'pointer' }}>
            <Icon.close />
          </button>
        </div>
        <div style={{ padding: '8px 16px' }}>
          {TF_VENUES.map(v => {
            const active = v.id === currentVenue.id;
            return (
              <button key={v.id} onClick={() => { setCurrentVenue(v); close(); }} style={{
                width: '100%', background: active ? theme.primaryLight : 'transparent',
                border: 'none', padding: '14px 12px', cursor: 'pointer', borderRadius: 12,
                display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left',
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: active ? theme.primary : theme.ink100,
                  color: active ? '#fff' : theme.ink500,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}><Icon.pin /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'Inter', fontSize: 16, fontWeight: 700, color: theme.ink900 }}>{v.name}</div>
                  <div style={{ fontFamily: 'Inter', fontSize: 13, color: theme.ink500 }}>{v.code} · {RU.numTables(v.tables)}</div>
                </div>
                {active && <span style={{ color: theme.primary }}><Icon.check /></span>}
              </button>
            );
          })}
          {role === 'owner' && (
            <button style={{
              width: '100%', background: 'transparent', border: `1.5px dashed ${theme.ink300}`,
              padding: 14, cursor: 'pointer', borderRadius: 12, marginTop: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              color: theme.primary, fontFamily: 'Inter', fontSize: 15, fontWeight: 600,
            }}>
              <Icon.plus /> {RU.newVenue}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
