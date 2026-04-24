import { TFPill } from '../components/Pill';
import { SimpleHeader } from '../components/SectionHeader';
import { RU } from '../tokens';
import { TF_VENUES } from '../data';
import { formatAmount } from '../utils';

function DetailRow({ theme, label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontFamily: 'Inter', fontSize: 14, color: theme.ink500, fontWeight: 500 }}>{label}</span>
      <span style={{ fontFamily: 'Inter', fontSize: 15, fontWeight: 600, color: theme.ink900, fontVariantNumeric: 'tabular-nums' }}>{value}</span>
    </div>
  );
}

export function ScreenSubscription({ theme, go }) {
  return (
    <div style={{ height: '100%', background: theme.bg, display: 'flex', flexDirection: 'column' }}>
      <SimpleHeader theme={theme} onBack={() => go('settings')} title={RU.subscription} />
      <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
        <div style={{
          background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`,
          color: '#fff', borderRadius: 20, padding: 24, marginBottom: 16,
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: 999, background: 'rgba(255,255,255,0.08)' }} />
          <TFPill color="#fff" bg="rgba(255,255,255,0.2)" dot>{RU.active}</TFPill>
          <div style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 500, opacity: 0.85, marginTop: 20, textTransform: 'uppercase', letterSpacing: 0.5 }}>{RU.currentPlan}</div>
          <div style={{ fontFamily: 'Inter', fontSize: 28, fontWeight: 800, marginTop: 4, letterSpacing: -0.6 }}>{RU.plan1000}</div>
          <div style={{ fontFamily: 'Inter', fontSize: 13, marginTop: 16, opacity: 0.85 }}>
            × {TF_VENUES.length} залов = {TF_VENUES.length * 1000} сом / месяц
          </div>
        </div>

        <div style={{ background: theme.card, borderRadius: 14, padding: 16, display: 'flex', flexDirection: 'column', gap: 12, border: `1px solid ${theme.ink100}` }}>
          <DetailRow theme={theme} label={RU.nextPayment} value="15 мая 2026" />
          <DetailRow theme={theme} label={RU.lastPayment} value="15 апр 2026 · 3 000 сом" />
          <DetailRow theme={theme} label={RU.status} value={RU.paid} />
        </div>

        <div style={{ padding: '16px 0 8px', fontFamily: 'Inter', fontSize: 13, fontWeight: 600, color: theme.ink500, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          История платежей
        </div>
        <div style={{ background: theme.card, borderRadius: 14, border: `1px solid ${theme.ink100}`, overflow: 'hidden' }}>
          {['15 апр 2026', '15 мар 2026', '15 фев 2026'].map((d, i) => (
            <div key={d} style={{
              padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              borderBottom: i < 2 ? `1px solid ${theme.ink100}` : 'none',
            }}>
              <div>
                <div style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 600, color: theme.ink900 }}>{d}</div>
                <div style={{ fontFamily: 'Inter', fontSize: 12, color: theme.ink500, marginTop: 2 }}>Подписка × 3 зала</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 700, color: theme.ink900, fontVariantNumeric: 'tabular-nums' }}>3 000 сом</div>
                <TFPill color={theme.success} bg={theme.successLight}>✓</TFPill>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
