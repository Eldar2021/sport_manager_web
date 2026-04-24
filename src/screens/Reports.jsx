import { useState } from 'react';
import { Icon } from '../components/Icon';
import { TFChip } from '../components/Chip';
import { TFBottomNav } from '../components/BottomNav';
import { RU } from '../tokens';
import { formatAmount } from '../utils';
import { TF_VENUES } from '../data';

function KpiCard({ theme, label, value, unit, delta, positive, small }) {
  return (
    <div style={{ background: theme.card, borderRadius: 14, padding: 14, border: `1px solid ${theme.ink100}` }}>
      <div style={{ fontFamily: 'Inter', fontSize: 12, fontWeight: 600, color: theme.ink500, textTransform: 'uppercase', letterSpacing: 0.4 }}>{label}</div>
      <div style={{ fontFamily: 'Inter', fontSize: small ? 22 : 26, fontWeight: 800, color: theme.ink900, letterSpacing: -0.6, marginTop: 6, fontVariantNumeric: 'tabular-nums' }}>
        {value} <span style={{ fontSize: 13, color: theme.ink500, fontWeight: 600 }}>{unit}</span>
      </div>
      {delta && (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 2, marginTop: 6, fontFamily: 'Inter', fontSize: 12, fontWeight: 700, color: positive ? theme.success : theme.danger }}>
          <Icon.arrowUp /> {delta}
        </div>
      )}
    </div>
  );
}

function Card({ theme, children, style }) {
  return (
    <div style={{ background: theme.card, borderRadius: 14, padding: 16, border: `1px solid ${theme.ink100}`, ...style }}>
      {children}
    </div>
  );
}

export function ScreenReports({ theme, go, role, currentVenue, setCurrentVenue }) {
  const [period, setPeriod] = useState('month');
  const [venueSheetOpen, setVenueSheetOpen] = useState(false);
  const allVenuesOption = { id: 'all', name: 'Все залы', code: '', tables: 0 };
  const venueOptions = [allVenuesOption, ...TF_VENUES];
  const selectedVenue = currentVenue.id === 'all' ? allVenuesOption : (TF_VENUES.find(v => v.id === currentVenue.id) || allVenuesOption);

  const daily = [45,62,38,71,88,52,64,40,76,58,63,44,39,75,91,68,54,41,77,82,50,46,71,85,58,62,73,88,94,78];
  const maxDaily = Math.max(...daily);
  const hourly = [0,0,0,0,0,0,0,0,0,0,5,12,18,22,28,32,38,52,68,85,92,78,45,22];
  const maxHourly = Math.max(...hourly);

  const tableStats = [
    { name: 'Стол 2', sub: 'VIP зал',   revenue: 45200, pct: 1.0 },
    { name: 'Стол 5', sub: 'Снукер',    revenue: 38400, pct: 0.85 },
    { name: 'Стол 1', sub: 'Основной',  revenue: 32100, pct: 0.71 },
    { name: 'Стол 4', sub: 'У окна',    revenue: 26800, pct: 0.59 },
  ];
  const managerStats = [
    { name: 'Айбек Асанов',    revenue: 65000, pct: 1.0 },
    { name: 'Нурлан Беков',    revenue: 42000, pct: 0.65 },
    { name: 'Данияр Токтогул', revenue: 35500, pct: 0.55 },
  ];

  return (
    <div style={{ height: '100%', background: theme.bg, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ padding: '60px 16px 12px', background: theme.card, borderBottom: `1px solid ${theme.ink100}` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: 'Inter', fontSize: 20, fontWeight: 800, color: theme.ink900 }}>{RU.reports}</div>
          <button onClick={() => setVenueSheetOpen(true)} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: theme.ink100, border: 'none', borderRadius: 10,
            padding: '8px 12px', cursor: 'pointer',
          }}>
            <Icon.pin style={{ color: theme.primary, width: 14, height: 14 }} />
            <span style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 600, color: theme.ink900, maxWidth: 110, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {selectedVenue.name}
            </span>
            <Icon.chevronDown style={{ color: theme.ink500 }} />
          </button>
        </div>
      </div>

      <div style={{ padding: '12px 16px 0', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {[['day','Сегодня'],['week','Неделя'],['month','Месяц'],['year','Год']].map(([k,label]) => (
          <TFChip key={k} theme={theme} active={period === k} onClick={() => setPeriod(k)}>{label}</TFChip>
        ))}
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '12px 16px 80px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <KpiCard theme={theme} label={RU.totalRevenue} value={`${formatAmount(142500)}`} unit={RU.som} delta="+12%" positive />
          <KpiCard theme={theme} label={RU.sessionCount} value="384" unit="" delta="+8%" positive />
          <KpiCard theme={theme} label={RU.avgDuration} value="1 ч 23" unit="мин" small />
          <KpiCard theme={theme} label={RU.activeTables} value="4" unit="/ 6" small />
        </div>

        <Card theme={theme}>
          <div style={{ fontFamily: 'Inter', fontSize: 15, fontWeight: 700, color: theme.ink900 }}>{RU.dailyRevenue}</div>
          <div style={{ fontFamily: 'Inter', fontSize: 12, color: theme.ink500, marginTop: 2 }}>Последние 30 дней</div>
          <div style={{ height: 120, display: 'flex', alignItems: 'flex-end', gap: 3, marginTop: 16 }}>
            {daily.map((v, i) => (
              <div key={i} style={{
                flex: 1, height: `${(v / maxDaily) * 100}%`, minHeight: 4,
                background: i === daily.length - 1 ? theme.primary : theme.primaryLight,
                borderRadius: 3,
              }} />
            ))}
          </div>
        </Card>

        <Card theme={theme}>
          <div style={{ fontFamily: 'Inter', fontSize: 15, fontWeight: 700, color: theme.ink900 }}>{RU.tablePerf}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 14 }}>
            {tableStats.map(t => (
              <div key={t.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <div>
                    <span style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 600, color: theme.ink900 }}>{t.name}</span>
                    <span style={{ fontFamily: 'Inter', fontSize: 12, color: theme.ink500, marginLeft: 8 }}>«{t.sub}»</span>
                  </div>
                  <span style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 700, color: theme.ink900, fontVariantNumeric: 'tabular-nums' }}>{formatAmount(t.revenue)} {RU.som}</span>
                </div>
                <div style={{ height: 6, background: theme.ink100, borderRadius: 999, overflow: 'hidden' }}>
                  <div style={{ width: `${t.pct * 100}%`, height: '100%', background: theme.primary, borderRadius: 999 }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card theme={theme}>
          <div style={{ fontFamily: 'Inter', fontSize: 15, fontWeight: 700, color: theme.ink900 }}>{RU.managerPerf}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 14 }}>
            {managerStats.map((m, i) => (
              <div key={m.name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 999,
                  background: [theme.primary, theme.success, theme.warning][i],
                  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Inter', fontWeight: 700, fontSize: 14,
                }}>{m.name.split(' ').map(s => s[0]).join('')}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 600, color: theme.ink900 }}>{m.name}</div>
                  <div style={{ height: 4, background: theme.ink100, borderRadius: 999, marginTop: 6, overflow: 'hidden' }}>
                    <div style={{ width: `${m.pct * 100}%`, height: '100%', background: theme.success, borderRadius: 999 }} />
                  </div>
                </div>
                <div style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 700, color: theme.ink900, fontVariantNumeric: 'tabular-nums' }}>{formatAmount(m.revenue)}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card theme={theme}>
          <div style={{ fontFamily: 'Inter', fontSize: 15, fontWeight: 700, color: theme.ink900 }}>{RU.hourDist}</div>
          <div style={{ height: 80, display: 'flex', alignItems: 'flex-end', gap: 2, marginTop: 14 }}>
            {hourly.map((v, i) => (
              <div key={i} style={{
                flex: 1, height: `${Math.max((v / maxHourly) * 100, 4)}%`,
                background: v > 60 ? theme.primary : v > 30 ? theme.primary + '99' : theme.primaryLight,
                borderRadius: 2,
              }} />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontFamily: 'Inter', fontSize: 11, color: theme.ink500 }}>
            <span>00</span><span>06</span><span>12</span><span>18</span><span>23</span>
          </div>
        </Card>
      </div>

      {venueSheetOpen && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 100,
          background: 'rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        }} onClick={() => setVenueSheetOpen(false)}>
          <div onClick={e => e.stopPropagation()} style={{ background: theme.card, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: '8px 0 32px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0 4px' }}>
              <div style={{ width: 36, height: 5, background: theme.ink300, borderRadius: 999 }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px 12px' }}>
              <div style={{ fontFamily: 'Inter', fontSize: 18, fontWeight: 700, color: theme.ink900 }}>Выберите зал</div>
              <button onClick={() => setVenueSheetOpen(false)} style={{ background: theme.ink100, border: 'none', color: theme.ink700, padding: 8, borderRadius: 999, cursor: 'pointer' }}>
                <Icon.close />
              </button>
            </div>
            <div style={{ padding: '0 12px' }}>
              {venueOptions.map(v => {
                const active = selectedVenue.id === v.id;
                return (
                  <button key={v.id} onClick={() => { setCurrentVenue(v); setVenueSheetOpen(false); }} style={{
                    width: '100%', background: active ? theme.primaryLight : 'transparent',
                    border: 'none', padding: '13px 12px', cursor: 'pointer', borderRadius: 12,
                    display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left',
                  }}>
                    <div style={{
                      width: 38, height: 38, borderRadius: 10,
                      background: active ? theme.primary : theme.ink100,
                      color: active ? '#fff' : theme.ink500,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}><Icon.pin /></div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'Inter', fontSize: 15, fontWeight: 700, color: theme.ink900 }}>{v.name}</div>
                      {v.tables > 0 && <div style={{ fontFamily: 'Inter', fontSize: 12, color: theme.ink500, marginTop: 2 }}>{RU.numTables(v.tables)}</div>}
                    </div>
                    {active && <span style={{ color: theme.primary }}><Icon.check /></span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <TFBottomNav current="reports" go={go} role={role} theme={theme} />
    </div>
  );
}
