// Screens part 2: Table Detail (Free/Active), Payment, Reports, Reports Detail

// ─── Table Detail ─────────────────────────────────────────────
function ScreenTable({ theme, go, table, setTables, now, setPaymentData, role, setEditTable, setShowDeleteTable }) {
  if (!table) return null;
  const isBusy = table.state === 'busy';
  const elapsed = isBusy && table.startedAt ? now - table.startedAt : 0;
  const amount = isBusy ? calcAmount(table.rate, elapsed) : 0;
  const canCancel = isBusy && elapsed < 60 * 1000;
  const [menuOpen, setMenuOpen] = React.useState(false);

  const start = () => setTables(ts => ts.map(t => t.id === table.id ? { ...t, state: 'busy', startedAt: Date.now() } : t));
  const cancel = () => setTables(ts => ts.map(t => t.id === table.id ? { ...t, state: 'free', startedAt: null } : t));
  const finish = () => {
    setPaymentData({ tableId: table.id, startedAt: table.startedAt, endedAt: Date.now(), rate: table.rate });
    go('payment');
  };

  return (
    <div data-screen-label={isBusy ? '08 Table Active' : '07 Table Free'} style={{
      height: '100%', background: theme.bg, display: 'flex', flexDirection: 'column',
    }}>
      <div style={{
        padding: '60px 16px 12px', background: theme.card,
        borderBottom: `1px solid ${theme.ink100}`,
        display: 'flex', alignItems: 'center', gap: 8,
        position: 'relative',
      }}>
        <button onClick={() => go('home')} style={{ background: 'none', border: 'none', color: theme.primary, padding: 8, cursor: 'pointer' }}><Icon.back/></button>
        <div style={{ flex: 1, fontFamily: 'Inter', fontSize: 17, fontWeight: 700, color: theme.ink900 }}>{table.name}</div>
        {role === 'owner' && (
          <button onClick={() => setMenuOpen(o => !o)} style={{
            background: 'none', border: 'none', color: theme.ink700, padding: 8, cursor: 'pointer',
          }}><Icon.more/></button>
        )}
        {menuOpen && role === 'owner' && (
          <>
            <div onClick={() => setMenuOpen(false)} style={{ position: 'absolute', inset: 0, zIndex: 10 }}/>
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
                <Icon.edit style={{ color: theme.primary }}/> Редактировать
              </button>
              <button onClick={() => { setMenuOpen(false); setShowDeleteTable && setShowDeleteTable(table); }} style={{
                width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10,
                fontFamily: 'Inter', fontSize: 14, fontWeight: 500, color: theme.danger,
              }}>
                <Icon.trash/> Удалить
              </button>
            </div>
          </>
        )}
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '24px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* state pill */}
        <TFPill dot
          color={isBusy ? theme.danger : theme.success}
          bg={isBusy ? theme.dangerLight : theme.successLight}>
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
                color: theme.primary, letterSpacing: -0.8,
                fontVariantNumeric: 'tabular-nums',
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
              <DetailRow theme={theme} label={RU.startedAt} value={formatTime(table.startedAt)}/>
              <DetailRow theme={theme} label={RU.duration} value={formatDuration(elapsed)}/>
              <DetailRow theme={theme} label={RU.hourly} value={`${table.rate} ${RU.som}`}/>
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
              <TableIllustration theme={theme} size={180}/>
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
              <DetailRow theme={theme} label={RU.lastSession} value="1 ч 15 мин · 250 сом"/>
              <DetailRow theme={theme} label={RU.todayTotal} value="4"/>
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

function DetailRow({ theme, label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontFamily: 'Inter', fontSize: 14, color: theme.ink500, fontWeight: 500 }}>{label}</span>
      <span style={{ fontFamily: 'Inter', fontSize: 15, fontWeight: 600, color: theme.ink900, fontVariantNumeric: 'tabular-nums' }}>{value}</span>
    </div>
  );
}

// ─── Payment Summary ──────────────────────────────────────────
function ScreenPayment({ theme, go, paymentData, tables, setTables, showToast }) {
  const [discount, setDiscount] = React.useState(0);
  const [displayTotal, setDisplayTotal] = React.useState(0);
  if (!paymentData) return null;
  const table = tables.find(t => t.id === paymentData.tableId);
  const elapsed = paymentData.endedAt - paymentData.startedAt;
  const subtotal = calcAmount(paymentData.rate, elapsed);
  const total = subtotal * (1 - discount / 100);

  // Count-up animation whenever total changes
  React.useEffect(() => {
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
    <div data-screen-label="09 Payment" style={{
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
          <div style={{ width: 36, height: 5, background: theme.ink300, borderRadius: 999 }}/>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 20px 16px',
        }}>
          <div style={{ fontFamily: 'Inter', fontSize: 22, fontWeight: 800, color: theme.ink900 }}>{RU.paymentSummary}</div>
          <button onClick={() => go('table')} style={{ background: theme.ink100, border: 'none', color: theme.ink700, padding: 8, borderRadius: 999, cursor: 'pointer' }}><Icon.close/></button>
        </div>

        <div style={{ padding: '0 20px 16px' }}>
          <div style={{ fontFamily: 'Inter', fontSize: 15, fontWeight: 600, color: theme.ink900 }}>{table.name} · «{table.sub}»</div>
          <div style={{ fontFamily: 'Inter', fontSize: 13, color: theme.ink500, marginTop: 2 }}>
            {formatTime(paymentData.startedAt)} → {formatTime(paymentData.endedAt)}
          </div>
        </div>

        <div style={{ margin: '0 16px', padding: 16, background: theme.ink50, borderRadius: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <DetailRow theme={theme} label={RU.duration} value={formatDuration(elapsed)}/>
          <DetailRow theme={theme} label={RU.hourly} value={`${paymentData.rate} ${RU.som}`}/>
          <div style={{ height: 1, background: theme.ink300, opacity: 0.5 }}/>
          <DetailRow theme={theme} label={RU.subtotal} value={`${formatAmount(subtotal)} ${RU.som}`}/>
        </div>

        <div style={{ padding: '20px 20px 8px' }}>
          <div style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 600, color: theme.ink700, marginBottom: 10 }}>{RU.discount}</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {[0, 5, 10, 20].map(d => (
              <TFChip key={d} active={discount === d} onClick={() => setDiscount(d)} theme={theme}>
                {d}%
              </TFChip>
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

// ─── Reports Dashboard (Owner) ────────────────────────────────
function ScreenReports({ theme, go, currentVenue, setCurrentVenue }) {
  const [period, setPeriod] = React.useState('month');
  const [venueSheetOpen, setVenueSheetOpen] = React.useState(false);
  const allVenuesOption = { id: 'all', name: 'Все залы', code: '', tables: 0 };
  const venueOptions = [allVenuesOption, ...TF_VENUES];
  const selectedVenue = currentVenue.id === 'all' ? allVenuesOption : (TF_VENUES.find(v => v.id === currentVenue.id) || allVenuesOption);
  const daily = [45,62,38,71,88,52,64,40,76,58,63,44,39,75,91,68,54,41,77,82,50,46,71,85,58,62,73,88,94,78];
  const maxDaily = Math.max(...daily);
  const hourly = [0,0,0,0,0,0,0,0,0,0,5,12,18,22,28,32,38,52,68,85,92,78,45,22];
  const maxHourly = Math.max(...hourly);
  const tableStats = [
    { name: 'Стол 2', sub: 'VIP зал', revenue: 45200, pct: 1.0 },
    { name: 'Стол 5', sub: 'Снукер',  revenue: 38400, pct: 0.85 },
    { name: 'Стол 1', sub: 'Основной', revenue: 32100, pct: 0.71 },
    { name: 'Стол 4', sub: 'У окна',  revenue: 26800, pct: 0.59 },
  ];
  const managerStats = [
    { name: 'Айбек Асанов', revenue: 65000, pct: 1.0 },
    { name: 'Нурлан Беков', revenue: 42000, pct: 0.65 },
    { name: 'Данияр Токтогул', revenue: 35500, pct: 0.55 },
  ];

  return (
    <div data-screen-label="13 Reports" style={{ height: '100%', background: theme.bg, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{
        padding: '60px 16px 12px', background: theme.card,
        borderBottom: `1px solid ${theme.ink100}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: 'Inter', fontSize: 20, fontWeight: 800, color: theme.ink900 }}>{RU.reports}</div>
          {/* Venue dropdown button */}
          <button onClick={() => setVenueSheetOpen(true)} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: theme.ink100, border: 'none', borderRadius: 10,
            padding: '8px 12px', cursor: 'pointer',
          }}>
            <Icon.pin style={{ color: theme.primary, width: 14, height: 14 }}/>
            <span style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 600, color: theme.ink900, maxWidth: 110, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {selectedVenue.name}
            </span>
            <Icon.chevronDown style={{ color: theme.ink500 }}/>
          </button>
        </div>
      </div>

      <div style={{ padding: '12px 16px 0', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {[['day','Сегодня'],['week','Неделя'],['month','Месяц'],['year','Год']].map(([k,label]) => (
          <TFChip key={k} theme={theme} active={period === k} onClick={() => setPeriod(k)}>{label}</TFChip>
        ))}
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '12px 16px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* KPI cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <KpiCard theme={theme} label={RU.totalRevenue} value={`${formatAmount(142500)}`} unit={RU.som} delta="+12%" positive/>
          <KpiCard theme={theme} label={RU.sessionCount} value="384" unit="" delta="+8%" positive/>
          <KpiCard theme={theme} label={RU.avgDuration} value="1 ч 23" unit="мин" small/>
          <KpiCard theme={theme} label={RU.activeTables} value="4" unit="/ 6" small/>
        </div>

        {/* Daily revenue chart */}
        <Card theme={theme}>
          <div style={{ fontFamily: 'Inter', fontSize: 15, fontWeight: 700, color: theme.ink900 }}>{RU.dailyRevenue}</div>
          <div style={{ fontFamily: 'Inter', fontSize: 12, color: theme.ink500, marginTop: 2 }}>Последние 30 дней</div>
          <div style={{ height: 120, display: 'flex', alignItems: 'flex-end', gap: 3, marginTop: 16 }}>
            {daily.map((v, i) => (
              <div key={i} style={{
                flex: 1, height: `${(v / maxDaily) * 100}%`, minHeight: 4,
                background: i === daily.length - 1 ? theme.primary : theme.primaryLight,
                borderRadius: 3,
              }}/>
            ))}
          </div>
        </Card>

        {/* Table performance */}
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
                  <div style={{ width: `${t.pct * 100}%`, height: '100%', background: theme.primary, borderRadius: 999 }}/>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Manager performance */}
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
                }}>{m.name.split(' ').map(s=>s[0]).join('')}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 600, color: theme.ink900 }}>{m.name}</div>
                  <div style={{ height: 4, background: theme.ink100, borderRadius: 999, marginTop: 6, overflow: 'hidden' }}>
                    <div style={{ width: `${m.pct * 100}%`, height: '100%', background: theme.success, borderRadius: 999 }}/>
                  </div>
                </div>
                <div style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 700, color: theme.ink900, fontVariantNumeric: 'tabular-nums' }}>{formatAmount(m.revenue)}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Hour distribution */}
        <Card theme={theme}>
          <div style={{ fontFamily: 'Inter', fontSize: 15, fontWeight: 700, color: theme.ink900 }}>{RU.hourDist}</div>
          <div style={{ height: 80, display: 'flex', alignItems: 'flex-end', gap: 2, marginTop: 14 }}>
            {hourly.map((v, i) => (
              <div key={i} style={{
                flex: 1, height: `${Math.max((v / maxHourly) * 100, 4)}%`,
                background: v > 60 ? theme.primary : v > 30 ? theme.primary + '99' : theme.primaryLight,
                borderRadius: 2,
              }}/>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontFamily: 'Inter', fontSize: 11, color: theme.ink500 }}>
            <span>00</span><span>06</span><span>12</span><span>18</span><span>23</span>
          </div>
        </Card>
      </div>

      {/* Venue picker bottom sheet */}
      {venueSheetOpen && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 100,
          background: 'rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        }} onClick={() => setVenueSheetOpen(false)}>
          <div onClick={e => e.stopPropagation()} style={{
            background: theme.card, borderTopLeftRadius: 24, borderTopRightRadius: 24,
            padding: '8px 0 32px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0 4px' }}>
              <div style={{ width: 36, height: 5, background: theme.ink300, borderRadius: 999 }}/>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px 12px' }}>
              <div style={{ fontFamily: 'Inter', fontSize: 18, fontWeight: 700, color: theme.ink900 }}>Выберите зал</div>
              <button onClick={() => setVenueSheetOpen(false)} style={{ background: theme.ink100, border: 'none', color: theme.ink700, padding: 8, borderRadius: 999, cursor: 'pointer' }}><Icon.close/></button>
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
                    }}><Icon.pin/></div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'Inter', fontSize: 15, fontWeight: 700, color: theme.ink900 }}>{v.name}</div>
                      {v.tables > 0 && <div style={{ fontFamily: 'Inter', fontSize: 12, color: theme.ink500, marginTop: 2 }}>{RU.numTables(v.tables)}</div>}
                    </div>
                    {active && <span style={{ color: theme.primary }}><Icon.check/></span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function KpiCard({ theme, label, value, unit, delta, positive, small }) {
  return (
    <div style={{
      background: theme.card, borderRadius: 14, padding: 14,
      border: `1px solid ${theme.ink100}`,
    }}>
      <div style={{ fontFamily: 'Inter', fontSize: 12, fontWeight: 600, color: theme.ink500, textTransform: 'uppercase', letterSpacing: 0.4 }}>{label}</div>
      <div style={{
        fontFamily: 'Inter', fontSize: small ? 22 : 26, fontWeight: 800,
        color: theme.ink900, letterSpacing: -0.6, marginTop: 6,
        fontVariantNumeric: 'tabular-nums',
      }}>
        {value} <span style={{ fontSize: 13, color: theme.ink500, fontWeight: 600 }}>{unit}</span>
      </div>
      {delta && (
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 2, marginTop: 6,
          fontFamily: 'Inter', fontSize: 12, fontWeight: 700,
          color: positive ? theme.success : theme.danger,
        }}>
          <Icon.arrowUp/> {delta}
        </div>
      )}
    </div>
  );
}

function Card({ theme, children, style }) {
  return (
    <div style={{
      background: theme.card, borderRadius: 14, padding: 16,
      border: `1px solid ${theme.ink100}`, ...style,
    }}>{children}</div>
  );
}

Object.assign(window, { ScreenTable, ScreenPayment, ScreenReports, KpiCard, Card, DetailRow });
