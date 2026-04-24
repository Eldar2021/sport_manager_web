import { useState } from 'react';
import { Icon } from '../components/Icon';
import { TFButton } from '../components/Button';
import { TFInput } from '../components/Input';
import { TFChip } from '../components/Chip';
import { SimpleHeader } from '../components/SectionHeader';
import { RU } from '../tokens';

export function ScreenTableDetail({ theme, go, tables, setTables, editTable }) {
  const isNew = !editTable;
  const [name, setName] = useState(editTable?.name || '');
  const [sub, setSub] = useState(editTable?.sub || '');
  const [rate, setRate] = useState(String(editTable?.rate || '200'));
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const valid = name.trim().length > 0 && parseInt(rate) > 0;

  const save = () => {
    if (!valid) return;
    if (isNew) {
      const newTable = { id: 't' + Date.now(), name: name.trim(), sub: sub.trim() || 'Основной', rate: parseInt(rate), state: 'free' };
      setTables(ts => [...ts, newTable]);
    } else {
      setTables(ts => ts.map(t => t.id === editTable.id ? { ...t, name: name.trim(), sub: sub.trim(), rate: parseInt(rate) } : t));
    }
    go('tableMgmt');
  };

  const deleteTable = () => {
    setTables(ts => ts.filter(t => t.id !== editTable.id));
    setShowDeleteConfirm(false);
    go('home');
  };

  return (
    <div style={{ height: '100%', background: theme.bg, display: 'flex', flexDirection: 'column' }}>
      <SimpleHeader
        theme={theme}
        onBack={() => go('tableMgmt')}
        title={isNew ? 'Новый стол' : 'Редактировать стол'}
        right={!isNew && (
          <button onClick={() => setShowDeleteConfirm(true)} style={{
            background: theme.dangerLight, border: 'none', color: theme.danger,
            padding: '8px 10px', borderRadius: 10, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 4,
            fontFamily: 'Inter', fontSize: 13, fontWeight: 600,
          }}>
            <Icon.trash /> Удалить
          </button>
        )}
      />

      <div style={{ flex: 1, overflow: 'auto', padding: 20 }}>
        <div style={{
          background: theme.card, borderRadius: 16, padding: 20, marginBottom: 24,
          border: `1.5px solid ${theme.ink100}`,
          display: 'flex', alignItems: 'center', gap: 16,
        }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: theme.primaryLight, color: theme.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon.ball />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Inter', fontSize: 18, fontWeight: 800, color: theme.ink900 }}>
              {name || <span style={{ color: theme.ink300 }}>Название стола</span>}
            </div>
            <div style={{ fontFamily: 'Inter', fontSize: 13, color: theme.ink500, marginTop: 3 }}>
              {sub || <span style={{ color: theme.ink300 }}>Описание</span>}
            </div>
          </div>
          <div style={{ padding: '6px 12px', background: theme.primaryLight, borderRadius: 10, fontFamily: 'Inter', fontSize: 15, fontWeight: 800, color: theme.primary }}>
            {parseInt(rate) > 0 ? rate : '—'} <span style={{ fontSize: 11, fontWeight: 600 }}>сом/ч</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <TFInput theme={theme} label="Название стола" placeholder="Стол 1" value={name} onChange={e => setName(e.target.value)} />
          <TFInput theme={theme} label="Описание (ярлык)" placeholder="VIP зал, у окна, снукер..." value={sub} onChange={e => setSub(e.target.value)} />
          <div>
            <label style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 500, color: theme.ink500, display: 'block', marginBottom: 8 }}>
              Тариф (сом / час)
            </label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
              {['150','200','250','300','350','400'].map(r => (
                <TFChip key={r} theme={theme} active={rate === r} onClick={() => setRate(r)}>{r}</TFChip>
              ))}
            </div>
            <TFInput theme={theme} placeholder="Другая сумма..." value={rate} onChange={e => setRate(e.target.value.replace(/\D/g, ''))} />
          </div>
        </div>
      </div>

      <div style={{ padding: 20, background: theme.card, borderTop: `1px solid ${theme.ink100}` }}>
        <TFButton theme={theme} disabled={!valid} onClick={save}>
          {isNew ? 'Создать стол' : 'Обновить'}
        </TFButton>
      </div>

      {showDeleteConfirm && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.45)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <div style={{ background: theme.card, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: '24px 20px 32px' }}>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{ width: 56, height: 56, borderRadius: 999, background: theme.dangerLight, color: theme.danger, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', fontSize: 24 }}>
                <Icon.trash />
              </div>
              <div style={{ fontFamily: 'Inter', fontSize: 18, fontWeight: 800, color: theme.ink900 }}>Удалить {editTable?.name}?</div>
              <div style={{ fontFamily: 'Inter', fontSize: 14, color: theme.ink500, marginTop: 6, lineHeight: 1.5 }}>
                История сессий сохранится, но стол исчезнет с главной страницы.
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <TFButton theme={theme} kind="danger" onClick={deleteTable}>Удалить</TFButton>
              <TFButton theme={theme} kind="ghost" size="md" onClick={() => setShowDeleteConfirm(false)}>{RU.cancel}</TFButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
