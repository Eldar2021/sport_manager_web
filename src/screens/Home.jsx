import { useState, useEffect } from 'react';
import { Icon } from '../components/Icon';
import { TFButton } from '../components/Button';
import { TFBottomNav } from '../components/BottomNav';
import { SectionHeader } from '../components/SectionHeader';
import { EmptyIllustration } from '../components/Illustrations';
import { RU } from '../tokens';
import { formatElapsed } from '../utils';

function TableCard({ table, theme, now, onClick }) {
  const isBusy = table.state === 'busy';
  const justFreed = !isBusy && table.justFreed && (now - table.justFreed < 5000);
  const elapsed = isBusy && table.startedAt ? now - table.startedAt : 0;
  const bg = isBusy ? theme.dangerLight : theme.card;

  return (
    <button
      onClick={onClick}
      className={justFreed ? 'just-freed' : ''}
      style={{
        background: bg, border: `1.5px solid ${isBusy ? theme.danger : justFreed ? theme.success : theme.ink300}`,
        borderRadius: 16, padding: 14, textAlign: 'left', cursor: 'pointer',
        display: 'flex', flexDirection: 'column', gap: 6, minHeight: 128,
        position: 'relative', overflow: 'hidden', transition: 'border-color 300ms',
        width: '100%',
      }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: 'Inter', fontSize: 17, fontWeight: 700, color: theme.ink900 }}>{table.name}</div>
        <span
          className={isBusy ? 'dot-pulse' : ''}
          style={{
            width: 10, height: 10, borderRadius: 999,
            background: justFreed ? theme.success : isBusy ? theme.danger : theme.success,
          }}
        />
      </div>
      <div style={{ fontFamily: 'Inter', fontSize: 12, color: theme.ink500, fontWeight: 500 }}>{table.sub}</div>
      <div style={{ flex: 1 }} />
      {isBusy ? (
        <>
          <div style={{
            fontFamily: 'Inter', fontSize: 24, fontWeight: 800, color: theme.danger,
            fontVariantNumeric: 'tabular-nums', letterSpacing: -0.5,
          }}>{formatElapsed(elapsed)}</div>
          <div style={{ fontFamily: 'Inter', fontSize: 12, color: theme.ink500, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 0.4 }}>
            {RU.busy}
          </div>
        </>
      ) : (
        <>
          <div style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 600, color: theme.success, textTransform: 'uppercase', letterSpacing: 0.4 }}>
            {justFreed ? '✓ Завершён' : RU.free}
          </div>
          <div style={{ fontFamily: 'Inter', fontSize: 13, color: theme.ink700, fontWeight: 600 }}>
            {table.rate} {RU.som}{RU.perHour}
          </div>
        </>
      )}
    </button>
  );
}

export function ScreenHome({ theme, go, role, tables, setTables, currentVenue, now, openVenuePicker, setActiveTableId, hasVenue, setHasVenue }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(t);
  }, []);

  if (role === 'owner' && hasVenue === false) {
    return (
      <div style={{ height: '100%', background: theme.bg, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '60px 16px 12px', background: theme.card, borderBottom: `1px solid ${theme.ink100}` }}>
          <button onClick={() => go('firstVenueSetup')} style={{
            background: 'none', border: `1.5px dashed ${theme.primary}`,
            padding: '8px 12px', borderRadius: 10, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 8,
            color: theme.primary, fontFamily: 'Inter', fontSize: 14, fontWeight: 600,
          }}>
            <Icon.plus /> Создать зал
          </button>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, textAlign: 'center', gap: 18 }}>
          <div style={{
            width: 88, height: 88, borderRadius: 22, background: theme.primaryLight, color: theme.primary,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><Icon.pin /></div>
          <div style={{ fontFamily: 'Inter', fontSize: 22, fontWeight: 800, color: theme.ink900, letterSpacing: -0.4 }}>
            У вас пока нет залов
          </div>
          <div style={{ fontFamily: 'Inter', fontSize: 15, color: theme.ink500, maxWidth: 280, lineHeight: 1.6 }}>
            Создайте первый зал, чтобы начать добавлять столы и принимать сессии.
          </div>
          <TFButton theme={theme} kind="primary" size="md" style={{ maxWidth: 240, marginTop: 8 }} onClick={() => go('firstVenueSetup')}>
            Создать зал
          </TFButton>
        </div>
        <TFBottomNav current="home" go={go} role={role} theme={theme} />
      </div>
    );
  }

  return (
    <div style={{ height: '100%', background: theme.bg, display: 'flex', flexDirection: 'column' }}>
      {/* AppBar */}
      <div style={{ padding: '60px 16px 12px', background: theme.card, borderBottom: `1px solid ${theme.ink100}` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={openVenuePicker} style={{
            background: 'none', border: 'none', padding: '6px 10px 6px 8px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 8, borderRadius: 10,
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8, background: theme.primaryLight,
              color: theme.primary, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}><Icon.pin /></div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontFamily: 'Inter', fontSize: 15, fontWeight: 700, color: theme.ink900, display: 'flex', alignItems: 'center', gap: 4 }}>
                {currentVenue.name} <span style={{ color: theme.ink500 }}><Icon.chevronDown /></span>
              </div>
              <div style={{ fontFamily: 'Inter', fontSize: 11, color: theme.ink500, fontWeight: 500 }}>
                {currentVenue.code} · {RU.numTables(currentVenue.tables)}
              </div>
            </div>
          </button>
          {role === 'owner' && setHasVenue && (
            <button onClick={() => setHasVenue(false)} title="Demo: toggle empty-venue state" style={{
              background: theme.ink100, border: 'none', color: theme.ink500,
              padding: '6px 10px', borderRadius: 8, cursor: 'pointer',
              fontFamily: 'Inter', fontSize: 11, fontWeight: 600,
            }}>⟲ Пусто</button>
          )}
        </div>
      </div>

      {/* Tables grid */}
      <div style={{ flex: 1, overflow: 'auto', padding: 16, paddingBottom: 80, position: 'relative' }}>
        <SectionHeader theme={theme}>{RU.tables} · {tables.length}</SectionHeader>
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="skeleton" style={{ minHeight: 128, borderRadius: 16 }} />
            ))}
          </div>
        ) : tables.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px', textAlign: 'center', gap: 16 }}>
            <EmptyIllustration theme={theme} size={100} />
            <div style={{ fontFamily: 'Inter', fontSize: 18, fontWeight: 800, color: theme.ink900 }}>Столов пока нет</div>
            <div style={{ fontFamily: 'Inter', fontSize: 14, color: theme.ink500, lineHeight: 1.6, maxWidth: 260 }}>
              {role === 'owner'
                ? 'Добавьте первый стол, чтобы менеджеры могли открывать сессии.'
                : 'Попросите владельца добавить столы в этот зал.'}
            </div>
            {role === 'owner' && (
              <TFButton theme={theme} kind="primary" size="md" style={{ maxWidth: 220 }} onClick={() => go('tableDetail')}>
                <Icon.plus /> Добавить стол
              </TFButton>
            )}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {tables.map(t => (
              <TableCard key={t.id} table={t} theme={theme} now={now}
                onClick={() => { setActiveTableId(t.id); go('table'); }} />
            ))}
          </div>
        )}
        {/* FAB — owner only, when there are tables */}
        {role === 'owner' && tables.length > 0 && (
          <button onClick={() => go('tableMgmt')} style={{
            position: 'absolute', bottom: 80, right: 16,
            width: 56, height: 56, borderRadius: 999,
            background: theme.primary, color: '#fff', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 8px 20px ${theme.primary}55`,
          }}>
            <Icon.plus />
          </button>
        )}
      </div>

      <TFBottomNav current="home" go={go} role={role} theme={theme} />
    </div>
  );
}
