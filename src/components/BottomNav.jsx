import { Icon } from './Icon';

export function TFBottomNav({ current, go, role, theme }) {
  const tabs = [
    { id: 'home',     label: 'Главная', icon: (active) => <Icon.home style={{ color: active ? theme.primary : theme.ink500 }} /> },
    ...(role === 'owner' ? [{ id: 'reports', label: 'Отчёты', icon: (active) => <Icon.chart style={{ color: active ? theme.primary : theme.ink500 }} /> }] : []),
    { id: 'settings', label: 'Профиль', icon: (active) => <Icon.person style={{ color: active ? theme.primary : theme.ink500 }} /> },
  ];

  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 50,
      background: theme.card,
      borderTop: `1px solid ${theme.ink100}`,
      display: 'flex', alignItems: 'stretch',
      paddingBottom: 20,
    }}>
      {tabs.map(tab => {
        const active = current === tab.id;
        return (
          <button key={tab.id} onClick={() => go(tab.id)} style={{
            flex: 1, background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: 4, padding: '10px 0 0',
          }}>
            {tab.icon(active)}
            <span style={{
              fontFamily: 'Inter', fontSize: 11, fontWeight: active ? 700 : 500,
              color: active ? theme.primary : theme.ink500,
              letterSpacing: 0.1,
            }}>{tab.label}</span>
            {active && (
              <div style={{ width: 4, height: 4, borderRadius: 99, background: theme.primary, marginTop: 1 }} />
            )}
          </button>
        );
      })}
    </div>
  );
}
