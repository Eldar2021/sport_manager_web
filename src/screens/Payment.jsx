import { useState, useEffect } from 'react';
import { Icon } from '../components/Icon';
import { TFButton } from '../components/Button';
import { TFChip } from '../components/Chip';
import { RU } from '../tokens';
import { calcAmount, formatAmount, formatDuration, formatTime } from '../utils';

function DetailRow({ theme, label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontFamily: 'Inter', fontSize: 14, color: theme.ink500, fontWeight: 500 }}>{label}</span>
      <span style={{ fontFamily: 'Inter', fontSize: 15, fontWeight: 600, color: theme.ink900, fontVariantNumeric: 'tabular-nums' }}>{value}</span>
    </div>
  );
}

export function ScreenPayment({ theme, go, paymentData, tables, setTables, showToast }) {
  const [discount, setDiscount] = useState(0);
  const [displayTotal, setDisplayTotal] = useState(0);
  if (!paymentData) return null;

  const table = tables.find(t => t.id === paymentData.tableId);
  const elapsed = paymentData.endedAt - paymentData.startedAt;
  const subtotal = calcAmount(paymentData.rate, elapsed);
  const total = subtotal * (1 - discount / 100);

  useEffect(() => {
    const start = Date.now();
    const from = displayTotal;
    const to = total;
    const dur = 500;
    let raf;
    const tick = () => {
      const p = Math.min((Date.now() - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplayTotal(from + (to - from) * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [total]);

  const confirm = () => {
    setTables(ts => ts.map(t => t.id === paymentData.tableId
      ? { ...t, state: 'free', startedAt: null, justFreed: Date.now() }
      : t
    ));
    showToast && showToast('Сессия закрыта');
    go('home');
  };

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 100,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
    }}>
      <div style={{
        background: theme.card, borderTopLeftRadius: 24, borderTopRightRadius: 24,
        padding: '8px 0 24px', maxHeight: '90%', overflow: 'auto',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}>
          <div style={{ width: 36, height: 5, background: theme.ink300, borderRadius: 999 }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px 16px' }}>
          <div style={{ fontFamily: 'Inter', fontSize: 22, fontWeight: 800, color: theme.ink900 }}>{RU.paymentSummary}</div>
          <button onClick={() => go('table')} style={{ background: theme.ink100, border: 'none', color: theme.ink700, padding: 8, borderRadius: 999, cursor: 'pointer' }}>
            <Icon.close />
          </button>
        </div>

        <div style={{ padding: '0 20px 16px' }}>
          <div style={{ fontFamily: 'Inter', fontSize: 15, fontWeight: 600, color: theme.ink900 }}>{table.name} · «{table.sub}»</div>
          <div style={{ fontFamily: 'Inter', fontSize: 13, color: theme.ink500, marginTop: 2 }}>
            {formatTime(paymentData.startedAt)} → {formatTime(paymentData.endedAt)}
          </div>
        </div>

        <div style={{ margin: '0 16px', padding: 16, background: theme.ink50, borderRadius: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <DetailRow theme={theme} label={RU.duration} value={formatDuration(elapsed)} />
          <DetailRow theme={theme} label={RU.hourly} value={`${paymentData.rate} ${RU.som}`} />
          <div style={{ height: 1, background: theme.ink300, opacity: 0.5 }} />
          <DetailRow theme={theme} label={RU.subtotal} value={`${formatAmount(subtotal)} ${RU.som}`} />
        </div>

        <div style={{ padding: '20px 20px 8px' }}>
          <div style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 600, color: theme.ink700, marginBottom: 10 }}>{RU.discount}</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {[0, 5, 10, 20].map(d => (
              <TFChip key={d} active={discount === d} onClick={() => setDiscount(d)} theme={theme}>{d}%</TFChip>
            ))}
            <TFChip theme={theme}>✏️</TFChip>
          </div>
        </div>

        <div style={{
          margin: '16px 16px 20px', padding: '18px 20px',
          background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`,
          color: '#fff', borderRadius: 16,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, opacity: 0.9 }}>{RU.toPay}</div>
          <div style={{ fontFamily: 'Inter', fontSize: 32, fontWeight: 800, letterSpacing: -0.8, fontVariantNumeric: 'tabular-nums' }}>
            {formatAmount(displayTotal)} <span style={{ fontSize: 16, opacity: 0.85 }}>{RU.som}</span>
          </div>
        </div>

        <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <TFButton theme={theme} kind="primary" onClick={confirm}>{RU.confirmAndClose}</TFButton>
          <TFButton theme={theme} kind="ghost" size="md" onClick={() => go('table')}>{RU.cancel}</TFButton>
        </div>
      </div>
    </div>
  );
}
