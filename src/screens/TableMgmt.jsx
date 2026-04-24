import { Icon } from '../components/Icon';
import { TFButton } from '../components/Button';
import { SimpleHeader } from '../components/SectionHeader';
import { RU } from '../tokens';

export function ScreenTableMgmt({ theme, go, tables, setTables, setEditTable }) {
  return (
    <div style={{ height: '100%', background: theme.bg, display: 'flex', flexDirection: 'column' }}>
      <SimpleHeader theme={theme} onBack={() => go('settings')} title={RU.tableMgmt} />
      <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
        <div style={{ background: theme.card, borderRadius: 14, border: `1px solid ${theme.ink100}`, overflow: 'hidden' }}>
          {tables.map((t, i) => (
            <button key={t.id} onClick={() => { setEditTable(t); go('tableDetail'); }} style={{
              width: '100%', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12,
              borderBottom: i < tables.length - 1 ? `1px solid ${theme.ink100}` : 'none',
              background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left',
            }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: theme.ink100, color: theme.ink700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon.ball />
              </div>
              <div style={{ flex: 1 }}>
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
      <div style={{ padding: 16, background: theme.card, borderTop: `1px solid ${theme.ink100}` }}>
        <TFButton theme={theme} icon={<Icon.plus />} onClick={() => { setEditTable(null); go('tableDetail'); }}>
          Добавить стол
        </TFButton>
      </div>
    </div>
  );
}
