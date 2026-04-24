// Screens part 3: Settings, Venue Mgmt, Table Mgmt, Manager Mgmt, Subscription,
// Reset Password, Reports Detail, plus small helpers.

// ─── Settings ─────────────────────────────────────────────────
function ScreenSettings({ theme, go, role }) {
  const [showLogoutConfirm, setShowLogoutConfirm] = React.useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);

  const row = (icon, label, target, color, sub) => (
    <button onClick={() => go(target)} style={{
      width: '100%', background: theme.card, border: 'none',
      padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14,
      cursor: 'pointer', textAlign: 'left',
      borderBottom: `1px solid ${theme.ink100}`,
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 9, background: color + '22',
        color, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: 'Inter', fontSize: 15, fontWeight: 600, color: theme.ink900 }}>{label}</div>
        {sub && <div style={{ fontFamily: 'Inter', fontSize: 12, color: theme.ink500, marginTop: 2 }}>{sub}</div>}
      </div>
      <span style={{ color: theme.ink300 }}><Icon.chevron/></span>
    </button>
  );

  return (
    <div data-screen-label="10 Settings" style={{ height: '100%', background: theme.bg, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{
        padding: '60px 16px 16px', background: theme.card,
        borderBottom: `1px solid ${theme.ink100}`,
      }}>
        <div style={{ fontFamily: 'Inter', fontSize: 20, fontWeight: 800, color: theme.ink900, padding: '0 4px' }}>{RU.settings}</div>
      </div>

      <div style={{ flex: 1, overflow: 'auto', paddingBottom: 24 }}>
        {/* User card */}
        <div style={{ padding: 16 }}>
          <div style={{
            background: theme.card, borderRadius: 16, padding: 16,
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div style={{
              width: 52, height: 52, borderRadius: 999,
              background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`,
              color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Inter', fontWeight: 700, fontSize: 18,
            }}>{role === 'owner' ? 'БС' : 'АА'}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'Inter', fontSize: 16, fontWeight: 700, color: theme.ink900 }}>
                {role === 'owner' ? 'Бакыт Сулайманов' : 'Айбек Асанов'}
              </div>
              <div style={{ marginTop: 4 }}>
                <TFPill
                  color={role === 'owner' ? theme.primary : theme.success}
                  bg={role === 'owner' ? theme.primaryLight : theme.successLight}>
                  {role === 'owner' ? <Icon.crown/> : <Icon.users/>}
                  {role === 'owner' ? RU.owner : RU.manager}
                </TFPill>
              </div>
            </div>
          </div>
        </div>

        {role === 'owner' && (
          <>
            <SectionHeader theme={theme}>Управление</SectionHeader>
            <div style={{ borderRadius: 14, overflow: 'hidden', margin: '0 16px' }}>
              {row(<Icon.pin/>, RU.venueMgmt, 'venueMgmt', theme.primary, `${TF_VENUES.length} залов`)}
              {row(<Icon.ball/>, RU.tableMgmt, 'tableMgmt', theme.warning, '6 столов · 200-400 сом/час')}
              {row(<Icon.users/>, RU.managerMgmt, 'managerMgmt', theme.success, `${TF_MANAGERS.length} менеджеров`)}
            </div>
          </>
        )}

        <SectionHeader theme={theme}>Аккаунт</SectionHeader>
        <div style={{ borderRadius: 14, overflow: 'hidden', margin: '0 16px' }}>
          {role === 'owner' && row(<Icon.card/>, RU.subscription, 'subscription', theme.primary, 'Активна · до 15 мая')}
          {row(<Icon.lock/>, RU.changePassword, 'resetPassword', theme.ink700)}
        </div>

        <div style={{ padding: 16, marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button onClick={() => setShowLogoutConfirm(true)} style={{
            width: '100%', background: theme.card, border: 'none',
            padding: 14, borderRadius: 14, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            color: theme.danger, fontFamily: 'Inter', fontSize: 15, fontWeight: 600,
          }}>
            <Icon.logout/> {RU.logout}
          </button>
          <button onClick={() => setShowDeleteConfirm(true)} style={{
            width: '100%', background: 'transparent', border: `1.5px solid ${theme.ink300}`,
            padding: 14, borderRadius: 14, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            color: theme.ink500, fontFamily: 'Inter', fontSize: 14, fontWeight: 600,
          }}>
            <Icon.trash/> Удалить аккаунт
          </button>
        </div>

        <div style={{ textAlign: 'center', fontFamily: 'Inter', fontSize: 12, color: theme.ink500, padding: 16 }}>
          TableFlow v1.0 · MVP
        </div>
      </div>

      {/* Logout confirmation */}
      {showLogoutConfirm && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 200,
          background: 'rgba(0,0,0,0.45)',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        }}>
          <div style={{
            background: theme.card, borderTopLeftRadius: 24, borderTopRightRadius: 24,
            padding: '24px 20px 32px',
          }}>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{
                width: 56, height: 56, borderRadius: 999,
                background: theme.dangerLight, color: theme.danger,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 14px',
              }}><Icon.logout/></div>
              <div style={{ fontFamily: 'Inter', fontSize: 18, fontWeight: 800, color: theme.ink900 }}>Выйти из аккаунта?</div>
              <div style={{ fontFamily: 'Inter', fontSize: 14, color: theme.ink500, marginTop: 6, lineHeight: 1.5 }}>
                Вы будете перенаправлены на экран входа. Данные сохранятся.
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <TFButton theme={theme} kind="danger" onClick={() => { setShowLogoutConfirm(false); go('welcome'); }}>Выйти</TFButton>
              <TFButton theme={theme} kind="ghost" size="md" onClick={() => setShowLogoutConfirm(false)}>{RU.cancel}</TFButton>
            </div>
          </div>
        </div>
      )}

      {/* Delete account confirmation */}
      {showDeleteConfirm && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 200,
          background: 'rgba(0,0,0,0.45)',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        }}>
          <div style={{
            background: theme.card, borderTopLeftRadius: 24, borderTopRightRadius: 24,
            padding: '24px 20px 32px',
          }}>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{
                width: 56, height: 56, borderRadius: 999,
                background: theme.dangerLight, color: theme.danger,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 14px',
              }}><Icon.trash/></div>
              <div style={{ fontFamily: 'Inter', fontSize: 18, fontWeight: 800, color: theme.ink900 }}>Удалить аккаунт?</div>
              <div style={{ fontFamily: 'Inter', fontSize: 14, color: theme.ink500, marginTop: 6, lineHeight: 1.55 }}>
                Все данные, сессии и настройки будут <b style={{ color: theme.danger }}>безвозвратно удалены</b>. Это действие нельзя отменить.
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <TFButton theme={theme} kind="danger" onClick={() => { setShowDeleteConfirm(false); go('welcome'); }}>Удалить навсегда</TFButton>
              <TFButton theme={theme} kind="ghost" size="md" onClick={() => setShowDeleteConfirm(false)}>{RU.cancel}</TFButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Venue Management ─────────────────────────────────────────
function ScreenVenueMgmt({ theme, go }) {
  return (
    <div data-screen-label="11 Venue Mgmt" style={{ height: '100%', background: theme.bg, display: 'flex', flexDirection: 'column' }}>
      <SimpleHeader theme={theme} onBack={() => go('settings')} title={RU.venueMgmt}/>
      <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
        {TF_VENUES.map(v => (
          <div key={v.id} style={{
            background: theme.card, borderRadius: 14, padding: 16, marginBottom: 10,
            border: `1px solid ${theme.ink100}`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 11, background: theme.primaryLight,
                color: theme.primary, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}><Icon.pin/></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Inter', fontSize: 16, fontWeight: 700, color: theme.ink900 }}>{v.name}</div>
                <div style={{ fontFamily: 'Inter', fontSize: 13, color: theme.ink500, marginTop: 2 }}>{v.code} · {v.address}</div>
              </div>
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
              <button style={{ background: theme.ink100, border: 'none', padding: 10, borderRadius: 10, cursor: 'pointer', color: theme.ink700 }}>
                <Icon.chevron/>
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: 16, background: theme.card, borderTop: `1px solid ${theme.ink100}` }}>
        <TFButton theme={theme} icon={<Icon.plus/>}>{RU.newVenue}</TFButton>
      </div>
    </div>
  );
}

// ─── Table Management ─────────────────────────────────────────
function ScreenTableMgmt({ theme, go, tables, setTables, setEditTable }) {
  return (
    <div data-screen-label="12 Table Mgmt" style={{ height: '100%', background: theme.bg, display: 'flex', flexDirection: 'column' }}>
      <SimpleHeader theme={theme} onBack={() => go('settings')} title={RU.tableMgmt}/>
      <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
        <div style={{ background: theme.card, borderRadius: 14, border: `1px solid ${theme.ink100}`, overflow: 'hidden' }}>
          {tables.map((t, i) => (
            <button key={t.id} onClick={() => { setEditTable(t); go('tableDetail'); }} style={{
              width: '100%', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12,
              borderBottom: i < tables.length - 1 ? `1px solid ${theme.ink100}` : 'none',
              background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left',
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10, background: theme.ink100,
                color: theme.ink700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}><Icon.ball/></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Inter', fontSize: 15, fontWeight: 700, color: theme.ink900 }}>{t.name}</div>
                <div style={{ fontFamily: 'Inter', fontSize: 12, color: theme.ink500, marginTop: 2 }}>«{t.sub}»</div>
              </div>
              <div style={{
                padding: '5px 10px', background: theme.primaryLight, color: theme.primary,
                borderRadius: 8, fontFamily: 'Inter', fontSize: 13, fontWeight: 700, flexShrink: 0,
              }}>{t.rate} сом</div>
              <span style={{ color: theme.ink300 }}><Icon.chevron/></span>
            </button>
          ))}
        </div>
      </div>
      <div style={{ padding: 16, background: theme.card, borderTop: `1px solid ${theme.ink100}` }}>
        <TFButton theme={theme} icon={<Icon.plus/>} onClick={() => { setEditTable(null); go('tableDetail'); }}>Добавить стол</TFButton>
      </div>
    </div>
  );
}

// ─── Table Detail / Edit ───────────────────────────────────────
function ScreenTableDetail({ theme, go, tables, setTables, editTable }) {
  const isNew = !editTable;
  const [name, setName] = React.useState(editTable?.name || '');
  const [sub, setSub] = React.useState(editTable?.sub || '');
  const [rate, setRate] = React.useState(String(editTable?.rate || '200'));
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);

  const valid = name.trim().length > 0 && parseInt(rate) > 0;

  const save = () => {
    if (!valid) return;
    if (isNew) {
      const newTable = {
        id: 't' + Date.now(),
        name: name.trim(),
        sub: sub.trim() || 'Основной',
        rate: parseInt(rate),
        state: 'free',
      };
      setTables(ts => [...ts, newTable]);
    } else {
      setTables(ts => ts.map(t => t.id === editTable.id
        ? { ...t, name: name.trim(), sub: sub.trim(), rate: parseInt(rate) }
        : t
      ));
    }
    go('tableMgmt');
  };

  const deleteTable = () => {
    setTables(ts => ts.filter(t => t.id !== editTable.id));
    go('tableMgmt');
  };

  return (
    <div data-screen-label="12b Table Detail" style={{ height: '100%', background: theme.bg, display: 'flex', flexDirection: 'column' }}>
      <SimpleHeader
        theme={theme}
        onBack={() => go('tableMgmt')}
        title={isNew ? 'Новый стол' : 'Изменить стол'}
        right={!isNew && (
          <button onClick={() => setShowDeleteConfirm(true)} style={{
            background: theme.dangerLight, border: 'none', color: theme.danger,
            padding: '8px 10px', borderRadius: 10, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 4,
            fontFamily: 'Inter', fontSize: 13, fontWeight: 600,
          }}>
            <Icon.trash/> Удалить
          </button>
        )}
      />

      <div style={{ flex: 1, overflow: 'auto', padding: 20 }}>
        {/* Preview card */}
        <div style={{
          background: theme.card, borderRadius: 16, padding: 20, marginBottom: 24,
          border: `1.5px solid ${theme.ink100}`,
          display: 'flex', alignItems: 'center', gap: 16,
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: 14,
            background: theme.primaryLight, color: theme.primary,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><Icon.ball/></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Inter', fontSize: 18, fontWeight: 800, color: theme.ink900 }}>
              {name || <span style={{ color: theme.ink300 }}>Название стола</span>}
            </div>
            <div style={{ fontFamily: 'Inter', fontSize: 13, color: theme.ink500, marginTop: 3 }}>
              {sub || <span style={{ color: theme.ink300 }}>Описание</span>}
            </div>
          </div>
          <div style={{
            padding: '6px 12px', background: theme.primaryLight,
            borderRadius: 10, fontFamily: 'Inter', fontSize: 15, fontWeight: 800, color: theme.primary,
          }}>{parseInt(rate) > 0 ? rate : '—'} <span style={{ fontSize: 11, fontWeight: 600 }}>сом/ч</span></div>
        </div>

        {/* Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <TFInput theme={theme} label="Название стола" placeholder="Стол 1" value={name} onChange={e => setName(e.target.value)}/>
          <TFInput theme={theme} label="Описание (ярлык)" placeholder="VIP зал, у окна, снукер..." value={sub} onChange={e => setSub(e.target.value)}/>

          <div>
            <label style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 500, color: theme.ink500, display: 'block', marginBottom: 8 }}>
              Тариф (сом / час)
            </label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
              {['150','200','250','300','350','400'].map(r => (
                <TFChip key={r} theme={theme} active={rate === r} onClick={() => setRate(r)}>{r}</TFChip>
              ))}
            </div>
            <TFInput theme={theme} placeholder="Другая сумма..." value={rate} onChange={e => setRate(e.target.value.replace(/\D/g, ''))}/>
          </div>
        </div>
      </div>

      <div style={{ padding: 20, background: theme.card, borderTop: `1px solid ${theme.ink100}` }}>
        <TFButton theme={theme} disabled={!valid} onClick={save}>
          {isNew ? 'Создать стол' : 'Сохранить изменения'}
        </TFButton>
      </div>

      {/* Delete confirmation */}
      {showDeleteConfirm && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 200,
          background: 'rgba(0,0,0,0.45)',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        }}>
          <div style={{
            background: theme.card, borderTopLeftRadius: 24, borderTopRightRadius: 24,
            padding: '24px 20px 32px',
          }}>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{
                width: 56, height: 56, borderRadius: 999,
                background: theme.dangerLight, color: theme.danger,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 14px', fontSize: 24,
              }}><Icon.trash/></div>
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

// ─── Manager Management ───────────────────────────────────────
function ScreenManagerMgmt({ theme, go, showToast }) {
  const [copied, setCopied] = React.useState(false);
  const handleCopy = () => {
    setCopied(true);
    showToast && showToast('Код скопирован');
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div data-screen-label="14 Manager Mgmt" style={{ height: '100%', background: theme.bg, display: 'flex', flexDirection: 'column' }}>
      <SimpleHeader theme={theme} onBack={() => go('settings')} title={RU.managerMgmt}/>
      <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
        {/* Invite code card */}
        <div style={{
          background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`,
          color: '#fff', borderRadius: 16, padding: 20, marginBottom: 20,
        }}>
          <div style={{ fontFamily: 'Inter', fontSize: 12, fontWeight: 600, opacity: 0.85, textTransform: 'uppercase', letterSpacing: 0.5 }}>{RU.activeInviteCode}</div>
          <div style={{
            fontFamily: 'Inter', fontSize: 32, fontWeight: 800, marginTop: 8,
            letterSpacing: 2, fontVariantNumeric: 'tabular-nums',
          }}>TF-48X2KD</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            <button onClick={handleCopy} style={{
              flex: 1, background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff',
              padding: '10px 14px', borderRadius: 10, cursor: 'pointer',
              fontFamily: 'Inter', fontSize: 14, fontWeight: 600,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
              {copied ? <><Icon.check/> {RU.copied}</> : <><Icon.copy/> {RU.copy}</>}
            </button>
            <button style={{
              flex: 1, background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff',
              padding: '10px 14px', borderRadius: 10, cursor: 'pointer',
              fontFamily: 'Inter', fontSize: 14, fontWeight: 600,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}><Icon.refresh/> {RU.refresh}</button>
          </div>
        </div>

        <SectionHeader theme={theme}>{RU.registeredManagers}</SectionHeader>
        {TF_MANAGERS.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 20px', textAlign: 'center', gap: 12, background: theme.card, borderRadius: 14, border: `1px solid ${theme.ink100}` }}>
            <EmptyIllustration theme={theme} size={80}/>
            <div style={{ fontFamily: 'Inter', fontSize: 16, fontWeight: 700, color: theme.ink900 }}>Менеджеров пока нет</div>
            <div style={{ fontFamily: 'Inter', fontSize: 13, color: theme.ink500, lineHeight: 1.6 }}>{RU.emptyManagers}</div>
          </div>
        ) : (
        <div style={{ background: theme.card, borderRadius: 14, border: `1px solid ${theme.ink100}`, overflow: 'hidden' }}>
          {TF_MANAGERS.map((m, i) => (
            <div key={m.id} style={{
              padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12,
              borderBottom: i < TF_MANAGERS.length - 1 ? `1px solid ${theme.ink100}` : 'none',
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 999,
                background: [theme.primary, theme.success, theme.warning][i % 3],
                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Inter', fontWeight: 700, fontSize: 14,
              }}>{m.name.split(' ').map(s=>s[0]).join('')}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Inter', fontSize: 15, fontWeight: 700, color: theme.ink900 }}>{m.name}</div>
                <div style={{ fontFamily: 'Inter', fontSize: 12, color: theme.ink500, marginTop: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
                  @{m.username}
                  <span style={{ width: 3, height: 3, borderRadius: 999, background: theme.ink500 }}/>
                  {RU.lastSeen} {m.unit === 'min' ? RU.minAgo(m.lastSeen) : RU.daysAgo(m.lastSeen)}
                </div>
              </div>
              <button style={{ background: 'none', border: 'none', color: theme.danger, padding: 8, cursor: 'pointer' }}><Icon.trash/></button>
            </div>
          ))}
        </div>
        )}
      </div>
      <div style={{ padding: 16, background: theme.card, borderTop: `1px solid ${theme.ink100}` }}>
        <TFButton theme={theme} icon={<Icon.plus/>}>{RU.inviteManager}</TFButton>
      </div>
    </div>
  );
}

// ─── Subscription ─────────────────────────────────────────────
function ScreenSubscription({ theme, go }) {
  return (
    <div data-screen-label="15 Subscription" style={{ height: '100%', background: theme.bg, display: 'flex', flexDirection: 'column' }}>
      <SimpleHeader theme={theme} onBack={() => go('settings')} title={RU.subscription}/>
      <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
        <div style={{
          background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`,
          color: '#fff', borderRadius: 20, padding: 24, marginBottom: 16,
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: -40, right: -40, width: 160, height: 160,
            borderRadius: 999, background: 'rgba(255,255,255,0.08)',
          }}/>
          <TFPill color="#fff" bg="rgba(255,255,255,0.2)" dot>{RU.active}</TFPill>
          <div style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 500, opacity: 0.85, marginTop: 20, textTransform: 'uppercase', letterSpacing: 0.5 }}>{RU.currentPlan}</div>
          <div style={{ fontFamily: 'Inter', fontSize: 28, fontWeight: 800, marginTop: 4, letterSpacing: -0.6 }}>{RU.plan1000}</div>
          <div style={{ fontFamily: 'Inter', fontSize: 13, marginTop: 16, opacity: 0.85 }}>× {TF_VENUES.length} залов = {TF_VENUES.length * 1000} сом / месяц</div>
        </div>

        <div style={{ background: theme.card, borderRadius: 14, padding: 16, display: 'flex', flexDirection: 'column', gap: 12, border: `1px solid ${theme.ink100}` }}>
          <DetailRow theme={theme} label={RU.nextPayment} value="15 мая 2026"/>
          <DetailRow theme={theme} label={RU.lastPayment} value="15 апр 2026 · 3 000 сом"/>
          <DetailRow theme={theme} label={RU.status} value={RU.paid}/>
        </div>

        <SectionHeader theme={theme}>История платежей</SectionHeader>
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

// ─── Reset Password ───────────────────────────────────────────
function ScreenResetPassword({ theme, go }) {
  return (
    <div data-screen-label="16 Reset Password" style={{ height: '100%', background: theme.bg, display: 'flex', flexDirection: 'column' }}>
      <SimpleHeader theme={theme} onBack={() => go('settings')} title={RU.changePassword}/>
      <div style={{ flex: 1, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{
          padding: 14, background: theme.primaryLight, borderRadius: 12,
          fontFamily: 'Inter', fontSize: 13, color: theme.primaryDark, lineHeight: 1.5,
          display: 'flex', gap: 10, alignItems: 'flex-start',
        }}>
          <span style={{ color: theme.primary, marginTop: 2 }}><Icon.lock/></span>
          Минимум 8 символов. Используйте буквы, цифры и спецсимволы.
        </div>
        <TFInput theme={theme} label="Текущий пароль" type="password" value="••••••••" onChange={()=>{}}/>
        <TFInput theme={theme} label="Новый пароль" type="password" placeholder="" onChange={()=>{}}/>
        <TFInput theme={theme} label="Повторите новый пароль" type="password" placeholder="" onChange={()=>{}}/>
      </div>
      <div style={{ padding: 24 }}>
        <TFButton theme={theme} onClick={() => go('settings')}>{RU.save}</TFButton>
      </div>
    </div>
  );
}

// ─── Simple header ────────────────────────────────────────────
function SimpleHeader({ theme, onBack, title, right }) {
  return (
    <div style={{
      padding: '60px 16px 12px', background: theme.card,
      borderBottom: `1px solid ${theme.ink100}`,
      display: 'flex', alignItems: 'center', gap: 8,
    }}>
      <button onClick={onBack} style={{ background: 'none', border: 'none', color: theme.primary, padding: 8, cursor: 'pointer' }}><Icon.back/></button>
      <div style={{ flex: 1, fontFamily: 'Inter', fontSize: 20, fontWeight: 800, color: theme.ink900 }}>{title}</div>
      {right}
    </div>
  );
}

Object.assign(window, {
  ScreenSettings, ScreenVenueMgmt, ScreenTableMgmt, ScreenTableDetail,
  ScreenManagerMgmt, ScreenSubscription, ScreenResetPassword,
  SimpleHeader,
});
