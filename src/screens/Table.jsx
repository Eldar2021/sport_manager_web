import { useState } from 'react';
import { Icon } from '../components/Icon';
import { TFButton } from '../components/Button';
import { TFPill } from '../components/Pill';
import { TableIllustration } from '../components/Illustrations';
import { RU } from '../tokens';
import { formatElapsed, formatDuration, formatAmount, calcAmount, formatTime } from '../utils';

function DetailRow({ theme, label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontFamily: 'Inter', fontSize: 14, color: theme.ink500, fontWeight: 500 }}>{label}</span>
      <span style={{ fontFamily: 'Inter', fontSize: 15, fontWeight: 600, color: theme.ink900, fontVariantNumeric: 'tabular-nums' }}>{value}</span>
    </div>
  );
}

export function ScreenTable({ theme, go, table, setTables, now, setPaymentData, role, setEditTable, setShowDeleteTable }) {
  if (!table) return null;
  const isBusy = table.state === 'busy';
  const elapsed = isBusy && table.startedAt ? now - table.startedAt : 0;
  const amount = isBusy ? calcAmount(table.rate, elapsed) : 0;
  const canCancel = isBusy && elapsed < 60 * 1000;
  const [menuOpen, setMenuOpen] = useState(false);

  const start = () => setTables(ts => ts.map(t => t.id === table.id ? { ...t, state: 'busy', startedAt: Date.now() } : t));
  const cancel = () => setTables(ts => ts.map(t => t.id === table.id ? { ...t, state: 'free', startedAt: null } : t));
  const finish = () => {
    setPaymentData({ tableId: table.id, startedAt: table.startedAt, endedAt: Date.now(), rate: table.rate });
    go('payment');
  };

  return (
    <div style={{ height: '100%', background: theme.bg, display: 'flex', flexDirection: 'column' }}>
      <div style={{
        padding: '60px 16px 12px', background: theme.card,
        borderBottom: `1px solid ${theme.ink100}`,
        display: 'flex', alignItems: 'center', gap: 8,
        position: 'relative',
      }}>
        <button onClick={() => go('home')} style={{ background: 'none', border: 'none', color: theme.primary, padding: 8, cursor: 'pointer' }}>
          <Icon.back />
        </button>
        <div style={{ flex: 1, fontFamily: 'Inter', fontSize: 17, fontWeight: 700, color: theme.ink900 }}>{table.name}</div>
        {role === 'owner' && (
          <button onClick={() => setMenuOpen(o => !o)} style={{ background: 'none', border: 'none', color: theme.ink700, padding: 8, cursor: 'pointer' }}>
            <Icon.more />
          </button>
        )}
        {menuOpen && role === 'owner' && (
          <>
            <div onClick={() => setMenuOpen(false)} style={{ position: 'absolute', inset: 0, zIndex: 10 }} />
            <div style={{
              position: 'absolute', top: 60, right: 12, zIndex: 20,
              background: theme.card, borderRadius: 12, overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06)',
              minWidth: 180,
            }}>
              <button onClick={() => { setMenuOpen(false); setEditTable && setEditTable(table); go('tableDetail'); }} style={{
                width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10,
                fontFamily: 'Inter', fontSize: 14, fontWeight: 500, color: theme.ink900,
                borderBottom: `1px solid ${theme.ink100}`,
              }}>
                <Icon.edit style={{ color: theme.primary }} /> Редактировать
              </button>
              <button onClick={() => { setMenuOpen(false); setShowDeleteTable && setShowDeleteTable(table); }} style={{
                width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10,
                fontFamily: 'Inter', fontSize: 14, fontWeight: 500, color: theme.danger,
              }}>
                <Icon.trash /> Удалить
              </button>
            </div>
          </>
        )}
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '24px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <TFPill dot color={isBusy ? theme.danger : theme.success} bg={isBusy ? theme.dangerLight : theme.successLight}>
          {isBusy ? RU.busy : RU.free}
        </TFPill>

        {isBusy ? (
          <>
            <div style={{ marginTop: 32, textAlign: 'center' }}>
              <div style={{
                fontFamily: 'Inter', fontSize: 56, fontWeight: 800,
                color: theme.ink900, letterSpacing: -1.5,
                fontVariantNumeric: 'tabular-nums', lineHeight: 1,
              }}>{formatElapsed(elapsed)}</div>
              <div style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 500, color: theme.ink500, marginTop: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>{RU.elapsed}</div>
            </div>
            <div style={{ marginTop: 24, textAlign: 'center' }}>
              <div style={{
                fontFamily: 'Inter', fontSize: 40, fontWeight: 800,
                color: theme.primary, letterSpacing: -0.8, fontVariantNumeric: 'tabular-nums',
              }}>
                {formatAmount(amount)} <span style={{ fontSize: 20, color: theme.primary }}>{RU.som}</span>
              </div>
              <div style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 500, color: theme.ink500, marginTop: 2, textTransform: 'uppercase', letterSpacing: 0.5 }}>{RU.currentAmount}</div>
            </div>
            <div style={{
              marginTop: 28, background: theme.card, borderRadius: 14, padding: '14px 18px',
              width: '100%', display: 'flex', flexDirection: 'column', gap: 10,
              border: `1px solid ${theme.ink100}`,
            }}>
              <DetailRow theme={theme} label={RU.startedAt} value={formatTime(table.startedAt)} />
              <DetailRow theme={theme} label={RU.duration} value={formatDuration(elapsed)} />
              <DetailRow theme={theme} label={RU.hourly} value={`${table.rate} ${RU.som}`} />
            </div>
            {canCancel && (
              <button onClick={cancel} style={{
                marginTop: 16, background: 'transparent', border: `1.5px solid ${theme.warning}`,
                color: theme.warning, padding: '10px 18px', borderRadius: 10, cursor: 'pointer',
                fontFamily: 'Inter', fontWeight: 600, fontSize: 14,
              }}>{RU.wrongStart}</button>
            )}
          </>
        ) : (
          <>
            <div style={{ marginTop: 28 }}>
              <TableIllustration theme={theme} size={180} />
            </div>
            <div style={{ fontFamily: 'Inter', fontSize: 24, fontWeight: 800, color: theme.ink900, marginTop: 16 }}>{table.name}</div>
            {table.sub && <div style={{ fontFamily: 'Inter', fontSize: 14, color: theme.ink500, marginTop: 2 }}>« {table.sub} »</div>}
            <div style={{
              fontFamily: 'Inter', fontSize: 32, fontWeight: 800,
              color: theme.primary, marginTop: 20, letterSpacing: -0.8,
            }}>{table.rate} <span style={{ fontSize: 16, color: theme.ink500, fontWeight: 600 }}>{RU.som}{RU.perHour}</span></div>
            <div style={{
              marginTop: 24, background: theme.card, borderRadius: 14, padding: '14px 18px',
              width: '100%', display: 'flex', flexDirection: 'column', gap: 10,
              border: `1px solid ${theme.ink100}`,
            }}>
              <DetailRow theme={theme} label={RU.lastSession} value="1 ч 15 мин · 250 сом" />
              <DetailRow theme={theme} label={RU.todayTotal} value="4" />
            </div>
          </>
        )}
      </div>

      <div style={{ padding: 20, background: theme.card, borderTop: `1px solid ${theme.ink100}` }}>
        {isBusy ? (
          <TFButton theme={theme} kind="danger" size="xl" onClick={finish}>{RU.stopAndFinish}</TFButton>
        ) : (
          <TFButton theme={theme} kind="success" size="xl" onClick={start}>{RU.start}</TFButton>
        )}
      </div>
    </div>
  );
}
