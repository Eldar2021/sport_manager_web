import { useState, useEffect, useCallback } from 'react';
import { TF_THEMES } from './tokens';
import { TF_VENUES, TF_TABLES } from './data';
import { IOSDevice } from './components/IOSDevice';

import { ScreenWelcome } from './screens/Welcome';
import { ScreenLogin } from './screens/Login';
import { ScreenRoleSelect } from './screens/RoleSelect';
import { ScreenRegisterOwner, ScreenRegisterManager } from './screens/Register';
import { ScreenHome } from './screens/Home';
import { ScreenVenuePicker } from './screens/VenuePicker';
import { ScreenFirstVenueSetup } from './screens/FirstVenueSetup';
import { ScreenTable } from './screens/Table';
import { ScreenPayment } from './screens/Payment';
import { ScreenReports } from './screens/Reports';
import { ScreenSettings } from './screens/Settings';
import { ScreenVenueMgmt } from './screens/VenueMgmt';
import { ScreenVenueDetail } from './screens/VenueDetail';
import { ScreenTableMgmt } from './screens/TableMgmt';
import { ScreenTableDetail } from './screens/TableDetail';
import { ScreenManagerMgmt } from './screens/ManagerMgmt';
import { ScreenSubscription } from './screens/Subscription';
import { ScreenResetPassword } from './screens/ResetPassword';

const INITIAL_ROLE = 'manager';
const INITIAL_THEME = 'classic';

export function App() {
  const [role, setRole] = useState(INITIAL_ROLE);
  const [themeName, setThemeName] = useState(INITIAL_THEME);
  const [screen, setScreen] = useState('home');
  const [showVenuePicker, setShowVenuePicker] = useState(false);
  const [currentVenue, setCurrentVenue] = useState(TF_VENUES[0]);
  const [tables, setTables] = useState(TF_TABLES);
  const [activeTableId, setActiveTableId] = useState(null);
  const [editTable, setEditTable] = useState(null);
  const [showDeleteTable, setShowDeleteTable] = useState(null);
  const [hasVenue, setHasVenue] = useState(true);
  const [venues, setVenues] = useState(TF_VENUES);
  const [editVenue, setEditVenue] = useState(null);
  const [activeVenueId, setActiveVenueId] = useState(null);
  const [showDeleteVenue, setShowDeleteVenue] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const [now, setNow] = useState(Date.now());
  const [tweaksOpen, setTweaksOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((msg) => {
    setToast({ msg, id: Date.now() });
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast?.id]);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const go = useCallback((target) => {
    if (target === 'venuePicker') {
      setShowVenuePicker(true);
      setScreen('home');
    } else {
      setScreen(target);
      setShowVenuePicker(false);
    }
  }, []);

  const theme = TF_THEMES[themeName];
  const activeTable = tables.find(t => t.id === activeTableId) || null;
  const activeVenue = venues.find(v => v.id === activeVenueId) || null;

  const renderScreen = () => {
    const common = { theme, go, role };
    switch (screen) {
      case 'welcome':      return <ScreenWelcome {...common} />;
      case 'login':        return <ScreenLogin {...common} />;
      case 'role':         return <ScreenRoleSelect {...common} setRole={setRole} />;
      case 'registerOwner': return <ScreenRegisterOwner {...common} />;
      case 'registerManager': return <ScreenRegisterManager {...common} />;
      case 'home':         return (
        <ScreenHome {...common}
          tables={tables} setTables={setTables}
          currentVenue={currentVenue}
          now={now}
          openVenuePicker={() => setShowVenuePicker(true)}
          setActiveTableId={setActiveTableId}
          hasVenue={hasVenue} setHasVenue={setHasVenue}
        />
      );
      case 'table':        return (
        <ScreenTable {...common}
          table={activeTable}
          setTables={setTables} now={now}
          setPaymentData={setPaymentData}
          setEditTable={setEditTable}
          setShowDeleteTable={setShowDeleteTable}
        />
      );
      case 'payment':      return (
        <ScreenPayment {...common}
          paymentData={paymentData}
          tables={tables} setTables={setTables}
          showToast={showToast}
        />
      );
      case 'reports':      return (
        <ScreenReports {...common}
          currentVenue={currentVenue}
          setCurrentVenue={setCurrentVenue}
        />
      );
      case 'settings':     return <ScreenSettings {...common} />;
      case 'venueMgmt':    return (
        <ScreenVenueMgmt {...common}
          venues={venues} setVenues={setVenues}
          setEditVenue={setEditVenue}
          setActiveVenueId={setActiveVenueId}
        />
      );
      case 'venueDetail':  return (
        <ScreenVenueDetail {...common}
          venue={activeVenue}
          tables={tables}
          setEditVenue={setEditVenue}
          setShowDeleteVenue={setShowDeleteVenue}
          setEditTable={setEditTable}
        />
      );
      case 'firstVenueSetup': return (
        <ScreenFirstVenueSetup {...common}
          editVenue={editVenue}
          setVenues={setVenues}
        />
      );
      case 'tableMgmt':    return (
        <ScreenTableMgmt {...common}
          tables={tables} setTables={setTables}
          setEditTable={setEditTable}
        />
      );
      case 'tableDetail':  return (
        <ScreenTableDetail {...common}
          tables={tables} setTables={setTables}
          editTable={editTable}
        />
      );
      case 'managerMgmt':  return <ScreenManagerMgmt {...common} showToast={showToast} />;
      case 'subscription': return <ScreenSubscription {...common} />;
      case 'resetPassword': return <ScreenResetPassword {...common} />;
      default:             return <ScreenHome {...common} tables={tables} setTables={setTables} currentVenue={currentVenue} now={now} openVenuePicker={() => setShowVenuePicker(true)} setActiveTableId={setActiveTableId} hasVenue={hasVenue} setHasVenue={setHasVenue} />;
    }
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#EDEEF1',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '40px 20px',
      fontFamily: 'Inter, -apple-system, system-ui, sans-serif',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
        {/* App title */}
        <div style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: 28, color: '#0F172A', letterSpacing: -0.5 }}>
          Ymyrkai
        </div>

        <IOSDevice>
          <div style={{ height: '100%', position: 'relative' }}>
            {/* Main screen — fills device, screens manage internal scroll */}
            <div style={{ height: '100%' }}>
              {renderScreen()}
            </div>

            {/* Venue picker overlay */}
            {showVenuePicker && (
              <ScreenVenuePicker
                theme={theme} role={role}
                currentVenue={currentVenue}
                setCurrentVenue={setCurrentVenue}
                close={() => setShowVenuePicker(false)}
              />
            )}

            {/* Delete table confirm */}
            {showDeleteTable && (
              <div style={{ position: 'absolute', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.45)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                <div style={{ background: theme.card, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: '24px 20px 32px' }}>
                  <div style={{ textAlign: 'center', marginBottom: 20 }}>
                    <div style={{ width: 56, height: 56, borderRadius: 999, background: theme.dangerLight, color: theme.danger, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', fontSize: 24 }}>🗑</div>
                    <div style={{ fontFamily: 'Inter', fontSize: 18, fontWeight: 800, color: theme.ink900 }}>Удалить {showDeleteTable.name}?</div>
                    <div style={{ fontFamily: 'Inter', fontSize: 14, color: theme.ink500, marginTop: 6, lineHeight: 1.5 }}>
                      История сессий сохранится, но стол исчезнет с главной страницы.
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <button onClick={() => {
                      setTables(ts => ts.filter(t => t.id !== showDeleteTable.id));
                      setShowDeleteTable(null);
                      go('home');
                    }} style={{ height: 56, width: '100%', borderRadius: 12, background: theme.danger, color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'Inter', fontWeight: 600, fontSize: 17 }}>
                      Удалить
                    </button>
                    <button onClick={() => setShowDeleteTable(null)} style={{ height: 44, width: '100%', borderRadius: 12, background: 'transparent', color: theme.primary, border: 'none', cursor: 'pointer', fontFamily: 'Inter', fontWeight: 600, fontSize: 15 }}>
                      Отмена
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Delete venue confirm */}
            {showDeleteVenue && (
              <div style={{ position: 'absolute', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.45)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                <div style={{ background: theme.card, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: '24px 20px 32px' }}>
                  <div style={{ textAlign: 'center', marginBottom: 20 }}>
                    <div style={{ width: 56, height: 56, borderRadius: 999, background: theme.dangerLight, color: theme.danger, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', fontSize: 24 }}>🗑</div>
                    <div style={{ fontFamily: 'Inter', fontSize: 18, fontWeight: 800, color: theme.ink900 }}>Удалить «{showDeleteVenue.name}»?</div>
                    <div style={{ fontFamily: 'Inter', fontSize: 14, color: theme.ink500, marginTop: 6, lineHeight: 1.5 }}>
                      Зал и все его столы будут удалены.
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <button onClick={() => {
                      setVenues(vs => vs.filter(v => v.id !== showDeleteVenue.id));
                      setShowDeleteVenue(null);
                      go('venueMgmt');
                    }} style={{ height: 56, width: '100%', borderRadius: 12, background: theme.danger, color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'Inter', fontWeight: 600, fontSize: 17 }}>
                      Удалить
                    </button>
                    <button onClick={() => setShowDeleteVenue(null)} style={{ height: 44, width: '100%', borderRadius: 12, background: 'transparent', color: theme.primary, border: 'none', cursor: 'pointer', fontFamily: 'Inter', fontWeight: 600, fontSize: 15 }}>
                      Отмена
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Toast */}
            {toast && (
              <div className="toast" style={{
                position: 'absolute', bottom: 80, left: '50%', transform: 'translateX(-50%)',
                zIndex: 300,
                background: theme.ink900, color: '#fff',
                padding: '10px 20px', borderRadius: 99,
                fontFamily: 'Inter', fontSize: 14, fontWeight: 600,
                whiteSpace: 'nowrap',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
              }}>
                {toast.msg}
              </div>
            )}
          </div>
        </IOSDevice>

        {/* Tweaks panel */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 440 }}>
          {/* Role switcher */}
          <div style={{ background: '#fff', borderRadius: 12, padding: '8px 12px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', display: 'flex', gap: 6, alignItems: 'center' }}>
            <span style={{ fontFamily: 'Inter', fontSize: 12, fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.4 }}>Роль</span>
            {['manager', 'owner'].map(r => (
              <button key={r} onClick={() => setRole(r)} style={{
                padding: '6px 14px', borderRadius: 8, border: 'none', cursor: 'pointer',
                background: role === r ? '#0F172A' : '#F1F5F9',
                color: role === r ? '#fff' : '#64748B',
                fontFamily: 'Inter', fontSize: 13, fontWeight: 600,
              }}>
                {r === 'owner' ? 'Владелец' : 'Менеджер'}
              </button>
            ))}
          </div>

          {/* Theme switcher */}
          <div style={{ background: '#fff', borderRadius: 12, padding: '8px 12px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', display: 'flex', gap: 6, alignItems: 'center' }}>
            <span style={{ fontFamily: 'Inter', fontSize: 12, fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.4 }}>Тема</span>
            {Object.entries(TF_THEMES).map(([key, t]) => (
              <button key={key} onClick={() => setThemeName(key)} style={{
                width: 26, height: 26, borderRadius: 999, border: themeName === key ? '3px solid #0F172A' : '2px solid #E2E8F0',
                background: t.primary, cursor: 'pointer', outline: 'none',
              }} title={t.name} />
            ))}
          </div>

          {/* Screen navigator */}
          <div style={{ background: '#fff', borderRadius: 12, padding: '8px 12px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', display: 'flex', gap: 6, alignItems: 'center' }}>
            <span style={{ fontFamily: 'Inter', fontSize: 12, fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.4 }}>Экран</span>
            <select
              value={screen}
              onChange={e => go(e.target.value)}
              style={{ border: 'none', background: '#F1F5F9', borderRadius: 8, padding: '6px 10px', fontFamily: 'Inter', fontSize: 13, fontWeight: 600, color: '#0F172A', cursor: 'pointer', outline: 'none' }}>
              {(role === 'owner' ? SCREENS_OWNER : SCREENS_MANAGER).map(([id, label]) => (
                <option key={id} value={id}>{label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

const SCREENS_OWNER = [
  ['welcome', '01 Приветствие'],
  ['login', '02 Вход'],
  ['role', '03 Выбор роли'],
  ['registerOwner', '04 Регистрация · Владелец'],
  ['firstVenueSetup', '04c Первый зал'],
  ['home', '05 Главная'],
  ['venuePicker', '06 Выбор зала'],
  ['table', '07/08 Карточка стола'],
  ['payment', '09 Итоги оплаты'],
  ['settings', '10 Настройки'],
  ['venueMgmt', '11 Залы'],
  ['venueDetail', '11a Зал · Детали'],
  ['tableMgmt', '12 Столы'],
  ['tableDetail', '12b Редактировать стол'],
  ['reports', '13 Отчёты'],
  ['managerMgmt', '14 Менеджеры'],
  ['subscription', '15 Подписка'],
  ['resetPassword', '16 Смена пароля'],
];

const SCREENS_MANAGER = [
  ['welcome', '01 Приветствие'],
  ['login', '02 Вход'],
  ['registerManager', '03 Регистрация · Менеджер'],
  ['home', '04 Главная'],
  ['table', '05 Карточка стола'],
  ['payment', '06 Итоги оплаты'],
  ['settings', '07 Профиль'],
  ['resetPassword', '08 Смена пароля'],
];
