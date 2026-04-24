// Screens part 1: Welcome, Login, Role Select, Register, Home, Venue Picker

// ─── Welcome ──────────────────────────────────────────────────
function ScreenWelcome({ theme, go, lang, setLang, role }) {
  return (
    <div data-screen-label="01 Welcome" style={{
      height: '100%', background: theme.card,
      display: 'flex', flexDirection: 'column',
      padding: '60px 24px 32px',
    }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
        {/* Logo */}
        <div style={{
          width: 88, height: 88, borderRadius: 24,
          background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 12px 24px ${theme.primary}44`,
          color: '#fff',
        }}>
          <Icon.cue />
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'Inter', fontSize: 36, fontWeight: 800, letterSpacing: -0.8, color: theme.ink900 }}>
            TableFlow
          </div>
          <div style={{ fontFamily: 'Inter', fontSize: 16, color: theme.ink500, marginTop: 8, maxWidth: 260 }}>
            {RU.tagline}
          </div>
        </div>
        <TableIllustration theme={theme} size={200} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <TFButton theme={theme} kind="primary" onClick={() => go('login')}>{RU.login}</TFButton>
        <TFButton theme={theme} kind="secondary" onClick={() => go(role === 'manager' ? 'registerManager' : 'role')}>{RU.register}</TFButton>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 8, color: theme.ink500 }}>
          <Icon.globe/>
          <span style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 500 }}>RU · KG · TR</span>
        </div>
      </div>
    </div>
  );
}

// ─── Login ────────────────────────────────────────────────────
function ScreenLogin({ theme, go }) {
  const [u, setU] = React.useState('aibek');
  const [p, setP] = React.useState('••••••••');
  const [show, setShow] = React.useState(false);
  return (
    <div data-screen-label="02 Login" style={{ height: '100%', background: theme.bg, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '60px 16px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
        <button onClick={() => go('welcome')} style={{ background: 'none', border: 'none', color: theme.primary, padding: 8, cursor: 'pointer' }}>
          <Icon.back/>
        </button>
      </div>
      <div style={{ padding: '24px 24px 16px' }}>
        <div style={{ fontFamily: 'Inter', fontSize: 32, fontWeight: 800, color: theme.ink900, letterSpacing: -0.8 }}>{RU.login}</div>
        <div style={{ fontFamily: 'Inter', fontSize: 15, color: theme.ink500, marginTop: 6 }}>Введите данные для входа</div>
      </div>
      <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
        <TFInput theme={theme} label={RU.username} value={u} onChange={(e)=>setU(e.target.value)} />
        <TFInput theme={theme} label={RU.password} type={show ? 'text' : 'password'} value={p} onChange={(e)=>setP(e.target.value)}
          right={<button onClick={()=>setShow(s=>!s)} style={{ background:'none', border:'none', color: theme.ink500, cursor:'pointer' }}><Icon.eye/></button>}
        />
        <button style={{ background:'none', border:'none', color: theme.primary, fontFamily:'Inter', fontSize: 14, fontWeight: 600, cursor:'pointer', alignSelf:'flex-start', padding: 0 }}>
          {RU.forgotPassword}
        </button>
      </div>
      <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <TFButton theme={theme} onClick={() => go('home')}>{RU.login}</TFButton>
        <div style={{ textAlign: 'center', fontFamily: 'Inter', fontSize: 15, color: theme.ink500 }}>
          {RU.noAccount} <button onClick={()=>go(role === 'manager' ? 'registerManager' : 'role')} style={{ background:'none', border:'none', color: theme.primary, fontWeight:600, cursor:'pointer', padding:0, fontSize: 15 }}>{RU.register}</button>utton>
        </div>
      </div>
    </div>
  );
}

// ─── Role Select ──────────────────────────────────────────────
function ScreenRoleSelect({ theme, go, setRole, role }) {
  // If already in manager context, skip role choice and go straight to manager reg
  React.useEffect(() => {
    if (role === 'manager') { setRole('manager'); go('registerManager'); }
  }, []);

  const card = (icon, title, sub, next, roleVal) => (
    <button onClick={() => { setRole(roleVal); go(next); }} style={{
      background: theme.card, border: `1.5px solid ${theme.ink300}`,
      borderRadius: 16, padding: 20, textAlign: 'left',
      display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer',
      width: '100%',
    }}>
      <div style={{
        width: 56, height: 56, borderRadius: 14,
        background: theme.primaryLight, color: theme.primary,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: 'Inter', fontSize: 17, fontWeight: 700, color: theme.ink900 }}>{title}</div>
        <div style={{ fontFamily: 'Inter', fontSize: 13, color: theme.ink500, marginTop: 4 }}>{sub}</div>
      </div>
      <div style={{ color: theme.ink300 }}><Icon.chevron/></div>
    </button>
  );
  return (
    <div data-screen-label="03 Role Select" style={{ height: '100%', background: theme.bg, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '60px 16px 0', display: 'flex', alignItems: 'center' }}>
        <button onClick={() => go('welcome')} style={{ background: 'none', border: 'none', color: theme.primary, padding: 8, cursor: 'pointer' }}><Icon.back/></button>
      </div>
      <div style={{ padding: '24px 24px 8px' }}>
        <div style={{ fontFamily: 'Inter', fontSize: 32, fontWeight: 800, color: theme.ink900, letterSpacing: -0.8 }}>{RU.chooseRole}</div>
        <div style={{ fontFamily: 'Inter', fontSize: 15, color: theme.ink500, marginTop: 6 }}>Это определит доступные функции</div>
      </div>
      <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        {card(<Icon.crown/>, RU.iAmOwner, RU.iAmOwnerSub, 'registerOwner', 'owner')}
        {card(<Icon.users/>, RU.iAmManager, RU.iAmManagerSub, 'registerManager', 'manager')}
      </div>
    </div>
  );
}

// ─── Register Owner ───────────────────────────────────────────
function ScreenRegisterOwner({ theme, go }) {
  return (
    <div data-screen-label="04 Register Owner" style={{ height: '100%', background: theme.bg, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '60px 16px 0' }}>
        <button onClick={() => go('role')} style={{ background: 'none', border: 'none', color: theme.primary, padding: 8, cursor: 'pointer' }}><Icon.back/></button>
      </div>
      <div style={{ padding: '16px 24px 8px' }}>
        <div style={{ fontFamily: 'Inter', fontSize: 28, fontWeight: 800, color: theme.ink900, letterSpacing: -0.8 }}>Регистрация владельца</div>
        <TFPill color={theme.primary} bg={theme.primaryLight} style={{ marginTop: 10 }}>
          <Icon.crown/> {RU.owner}
        </TFPill>
      </div>
      <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 14, flex: 1, overflow: 'auto' }}>
        <TFInput theme={theme} label={RU.name} placeholder="Бакыт" value="Бакыт Сулайманов" onChange={()=>{}}/>
        <TFInput theme={theme} label={RU.phone} placeholder="+996 ..." value="+996 555 12 34 56" onChange={()=>{}}/>
        <TFInput theme={theme} label={RU.email} value="bakyt@example.kg" onChange={()=>{}}/>
        <TFInput theme={theme} label={RU.password} type="password" value="••••••••••" onChange={()=>{}}/>
        <TFInput theme={theme} label={RU.passwordAgain} type="password" value="••••••••••" onChange={()=>{}}/>
        <label style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4, fontFamily: 'Inter', fontSize: 14, color: theme.ink700 }}>
          <span style={{ width: 22, height: 22, borderRadius: 6, background: theme.primary, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon.check/></span>
          {RU.agreeTerms}
        </label>
      </div>
      <div style={{ padding: 24 }}>
        <TFButton theme={theme} onClick={() => go('firstVenueSetup')}>{RU.createAccount}</TFButton>
      </div>
    </div>
  );
}

// ─── Register Manager ─────────────────────────────────────────
function ScreenRegisterManager({ theme, go }) {
  return (
    <div data-screen-label="04b Register Manager" style={{ height: '100%', background: theme.bg, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '60px 16px 0' }}>
        <button onClick={() => go('role')} style={{ background: 'none', border: 'none', color: theme.primary, padding: 8, cursor: 'pointer' }}><Icon.back/></button>
      </div>
      <div style={{ padding: '16px 24px 8px' }}>
        <div style={{ fontFamily: 'Inter', fontSize: 28, fontWeight: 800, color: theme.ink900, letterSpacing: -0.8 }}>Регистрация менеджера</div>
        <TFPill color={theme.success} bg={theme.successLight} style={{ marginTop: 10 }}>
          <Icon.users/> {RU.manager}
        </TFPill>
      </div>
      <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
        <div style={{
          padding: 14, background: theme.primaryLight, borderRadius: 12,
          fontFamily: 'Inter', fontSize: 13, color: theme.primaryDark, lineHeight: 1.5,
        }}>
          <Icon.sparkle/> Получите код приглашения у владельца зала
        </div>
        <TFInput theme={theme} label={RU.inviteCode} placeholder="TF-XXXXX" value="TF-48X2KD" onChange={()=>{}}/>
        <TFInput theme={theme} label="Логин" value="aibek" onChange={()=>{}}/>
        <TFInput theme={theme} label={RU.name} value="Айбек Асанов" onChange={()=>{}}/>
        <TFInput theme={theme} label={RU.password} type="password" value="••••••••" onChange={()=>{}}/>
      </div>
      <div style={{ padding: 24 }}>
        <TFButton theme={theme} onClick={() => go('home')}>{RU.createAccount}</TFButton>
      </div>
    </div>
  );
}

// ─── Table Card (for Home grid) ───────────────────────────────
function TableCard({ table, theme, now, onClick }) {
  const isBusy = table.state === 'busy';
  const justFreed = !isBusy && table.justFreed && (now - table.justFreed < 5000);
  const elapsed = isBusy && table.startedAt ? now - table.startedAt : 0;
  const bg = isBusy ? theme.dangerLight : theme.card;
  return (
    <button onClick={onClick} className={justFreed ? 'just-freed' : ''}  style={{
      background: bg, border: `1.5px solid ${isBusy ? theme.danger : justFreed ? theme.success : theme.ink300}`,
      borderRadius: 16, padding: 14, textAlign: 'left', cursor: 'pointer',
      display: 'flex', flexDirection: 'column', gap: 6, minHeight: 128,
      position: 'relative', overflow: 'hidden', transition: 'border-color 300ms',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: 'Inter', fontSize: 17, fontWeight: 700, color: theme.ink900 }}>{table.name}</div>
        <span className={isBusy ? 'dot-pulse' : ''} style={{
          width: 10, height: 10, borderRadius: 999,
          background: justFreed ? theme.success : isBusy ? theme.danger : theme.success,
        }}/>
      </div>
      <div style={{ fontFamily: 'Inter', fontSize: 12, color: theme.ink500, fontWeight: 500 }}>
        {table.sub}
      </div>
      <div style={{ flex: 1 }}/>
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
          <div style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 600, color: justFreed ? theme.success : theme.success, textTransform: 'uppercase', letterSpacing: 0.4 }}>
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

// ─── Home ─────────────────────────────────────────────────────
function ScreenHome({ theme, go, role, tables, setTables, currentVenue, now, openVenuePicker, setActiveTableId }) {
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(t);
  }, []);

  const todayRevenue = 14280;
  return (
    <div data-screen-label="05 Home" style={{ height: '100%', background: theme.bg, display: 'flex', flexDirection: 'column' }}>
      {/* AppBar */}
      <div style={{
        padding: '60px 16px 12px', background: theme.card,
        borderBottom: `1px solid ${theme.ink100}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={openVenuePicker} style={{
            background: 'none', border: 'none', padding: '6px 10px 6px 8px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 8, borderRadius: 10,
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8, background: theme.primaryLight,
              color: theme.primary, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}><Icon.pin/></div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontFamily: 'Inter', fontSize: 15, fontWeight: 700, color: theme.ink900, display: 'flex', alignItems: 'center', gap: 4 }}>
                {currentVenue.name} <span style={{ color: theme.ink500 }}><Icon.chevronDown/></span>
              </div>
              <div style={{ fontFamily: 'Inter', fontSize: 11, color: theme.ink500, fontWeight: 500 }}>
                {currentVenue.code} · {RU.numTables(currentVenue.tables)}
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Tables grid */}
      <div style={{ flex: 1, overflow: 'auto', padding: 16, paddingBottom: 24, position: 'relative' }}>
        <SectionHeader theme={theme}>{RU.tables} · {tables.length}</SectionHeader>
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[1,2,3,4].map(i => (
              <div key={i} className="skeleton" style={{ minHeight: 128, borderRadius: 16 }}/>
            ))}
          </div>
        ) : tables.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px', textAlign: 'center', gap: 16 }}>
            <EmptyIllustration theme={theme} size={100}/>
            <div style={{ fontFamily: 'Inter', fontSize: 17, fontWeight: 700, color: theme.ink900 }}>Столов пока нет</div>
            <div style={{ fontFamily: 'Inter', fontSize: 14, color: theme.ink500, lineHeight: 1.6, maxWidth: 240 }}>{RU.emptyTables}</div>
            {role === 'owner' && (
              <TFButton theme={theme} kind="primary" size="md" style={{ maxWidth: 200 }} onClick={() => go('tableMgmt')}>
                Добавить стол
              </TFButton>
            )}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {tables.map(t => (
              <TableCard key={t.id} table={t} theme={theme} now={now}
                onClick={() => { setActiveTableId(t.id); go('table'); }}/>
            ))}
          </div>
        )}
        {/* FAB — owner only */}
        {role === 'owner' && (
          <button onClick={() => go('tableMgmt')} style={{
            position: 'absolute', bottom: 16, right: 16,
            width: 56, height: 56, borderRadius: 999,
            background: theme.primary, color: '#fff', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 8px 20px ${theme.primary}55`,
          }}>
            <Icon.plus/>
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Venue Picker (bottom sheet) ──────────────────────────────
function ScreenVenuePicker({ theme, role, currentVenue, setCurrentVenue, close }) {
  return (
    <div data-screen-label="06 Venue Picker" style={{
      position: 'absolute', inset: 0, zIndex: 100,
      background: 'rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
    }} onClick={close}>
      <div onClick={e => e.stopPropagation()} style={{
        background: theme.card, borderTopLeftRadius: 24, borderTopRightRadius: 24,
        padding: '8px 0 32px', maxHeight: '75%', overflow: 'auto',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}>
          <div style={{ width: 36, height: 5, background: theme.ink300, borderRadius: 999 }}/>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 20px 8px',
        }}>
          <div style={{ fontFamily: 'Inter', fontSize: 20, fontWeight: 700, color: theme.ink900 }}>{RU.selectVenue}</div>
          <button onClick={close} style={{ background: theme.ink100, border: 'none', color: theme.ink700, padding: 8, borderRadius: 999, cursor: 'pointer' }}><Icon.close/></button>
        </div>
        <div style={{ padding: '8px 16px' }}>
          {TF_VENUES.map((v, i) => {
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
                }}><Icon.pin/></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'Inter', fontSize: 16, fontWeight: 700, color: theme.ink900 }}>{v.name}</div>
                  <div style={{ fontFamily: 'Inter', fontSize: 13, color: theme.ink500 }}>{v.code} · {RU.numTables(v.tables)}</div>
                </div>
                {active && <span style={{ color: theme.primary }}><Icon.check/></span>}
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
              <Icon.plus/> {RU.newVenue}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── First Venue Setup (owner onboarding) ────────────────────
function ScreenFirstVenueSetup({ theme, go }) {
  const [name, setName] = React.useState('');
  const [code, setCode] = React.useState('');
  const [tables, setTablesCount] = React.useState('4');
  const [step, setStep] = React.useState(1); // 1 = venue info, 2 = success
  const valid = name.trim().length > 0 && tables > 0;

  if (step === 2) return (
    <div data-screen-label="05 First Venue Setup — Done" style={{
      height: '100%', background: theme.bg,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: 32, textAlign: 'center',
    }}>
      <div style={{
        width: 88, height: 88, borderRadius: 999,
        background: theme.successLight, color: theme.success,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 24, fontSize: 44,
      }}>✓</div>
      <div style={{ fontFamily: 'Inter', fontSize: 28, fontWeight: 800, color: theme.ink900, letterSpacing: -0.6 }}>
        Зал создан!
      </div>
      <div style={{ fontFamily: 'Inter', fontSize: 15, color: theme.ink500, marginTop: 10, maxWidth: 280, lineHeight: 1.6 }}>
        «{name || 'Мой зал'}» готов к работе. Теперь добавьте столы и пригласите менеджера.
      </div>
      <div style={{ marginTop: 40, width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <TFButton theme={theme} kind="success" onClick={() => go('home')}>Перейти на главную</TFButton>
        <TFButton theme={theme} kind="ghost" size="md" onClick={() => go('tableMgmt')}>Настроить столы</TFButton>
      </div>
    </div>
  );

  return (
    <div data-screen-label="05 First Venue Setup" style={{
      height: '100%', background: theme.bg, display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ padding: '60px 16px 0' }}>
        <button onClick={() => go('registerOwner')} style={{ background: 'none', border: 'none', color: theme.primary, padding: 8, cursor: 'pointer' }}><Icon.back/></button>
      </div>

      <div style={{ padding: '16px 24px 8px' }}>
        <div style={{ fontFamily: 'Inter', fontSize: 28, fontWeight: 800, color: theme.ink900, letterSpacing: -0.6 }}>Создайте первый зал</div>
        <div style={{ fontFamily: 'Inter', fontSize: 14, color: theme.ink500, marginTop: 6, lineHeight: 1.5 }}>
          Дайте название вашему залу. Потом можно будет добавить ещё.
        </div>
      </div>

      <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
        <TFInput theme={theme} label="Название зала" placeholder="Центральный филиал" value={name} onChange={e => setName(e.target.value)}/>
        <TFInput theme={theme} label="Короткий код / номер" placeholder="№ 1 или ЦФ" value={code} onChange={e => setCode(e.target.value)}/>

        {/* Table count selector */}
        <div>
          <label style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 500, color: theme.ink500, display: 'block', marginBottom: 8 }}>
            
          </label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['2','3','4','5','6','8','10'].map(n => (
              <TFChip key={n} theme={theme} active={tables === n} onClick={() => setTablesCount(n)}>{n}</TFChip>
            ))}
          </div>
          <div style={{ fontFamily: 'Inter', fontSize: 12, color: theme.ink500, marginTop: 8 }}>
            Можно добавить или убрать столы позже
          </div>
        </div>

        {/* Info box */}
        <div style={{
          padding: 14, background: theme.primaryLight, borderRadius: 12,
          fontFamily: 'Inter', fontSize: 13, color: theme.primaryDark, lineHeight: 1.6,
          display: 'flex', gap: 10,
        }}>
          <span style={{ color: theme.primary, flexShrink: 0 }}><Icon.sparkle/></span>
          <span>Столы создадутся автоматически со стандартным тарифом <b>200 сом/час</b>. Цену можно изменить в настройках.</span>
        </div>
      </div>

      <div style={{ padding: 24 }}>
        <TFButton theme={theme} disabled={!valid} onClick={() => setStep(2)}>
          Создать зал →
        </TFButton>
      </div>
    </div>
  );
}

Object.assign(window, {
  ScreenWelcome, ScreenLogin, ScreenRoleSelect,
  ScreenRegisterOwner, ScreenRegisterManager,
  ScreenFirstVenueSetup,
  ScreenHome, ScreenVenuePicker, TableCard,
});
