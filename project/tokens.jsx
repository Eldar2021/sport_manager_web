// Design tokens + theme variations for TableFlow
// 3 themes: classic (doc default), warm (amber/red), ink (mono + green)

const TF_THEMES = {
  classic: {
    name: 'Классическая',
    primary: '#1E88E5',
    primaryDark: '#1565C0',
    primaryLight: '#E3F2FD',
    success: '#22C55E',
    successDark: '#16A34A',
    successLight: '#DCFCE7',
    danger: '#EF4444',
    dangerDark: '#DC2626',
    dangerLight: '#FEE2E2',
    warning: '#F59E0B',
    ink900: '#0F172A',
    ink700: '#334155',
    ink500: '#64748B',
    ink300: '#CBD5E1',
    ink100: '#F1F5F9',
    ink50: '#F8FAFC',
    bg: '#F2F2F7',
    card: '#FFFFFF',
    accent: '#1E88E5',
  },
  warm: {
    name: 'Тёплая',
    primary: '#D97706', // amber-700
    primaryDark: '#B45309',
    primaryLight: '#FEF3C7',
    success: '#65A30D', // olive
    successDark: '#4D7C0F',
    successLight: '#ECFCCB',
    danger: '#DC2626',
    dangerDark: '#B91C1C',
    dangerLight: '#FEE2E2',
    warning: '#F59E0B',
    ink900: '#1C1917',
    ink700: '#44403C',
    ink500: '#78716C',
    ink300: '#D6D3D1',
    ink100: '#F5F5F4',
    ink50: '#FAFAF9',
    bg: '#FAF6F0',
    card: '#FFFFFF',
    accent: '#D97706',
  },
  ink: {
    name: 'Графит',
    primary: '#0F172A',
    primaryDark: '#020617',
    primaryLight: '#E2E8F0',
    success: '#059669',
    successDark: '#047857',
    successLight: '#D1FAE5',
    danger: '#E11D48',
    dangerDark: '#BE123C',
    dangerLight: '#FFE4E6',
    warning: '#CA8A04',
    ink900: '#020617',
    ink700: '#1E293B',
    ink500: '#64748B',
    ink300: '#CBD5E1',
    ink100: '#F1F5F9',
    ink50: '#F8FAFC',
    bg: '#EEF0F3',
    card: '#FFFFFF',
    accent: '#0F172A',
  },
};

// Russian locale strings
const RU = {
  // Nav / common
  back: 'Назад',
  settings: 'Настройки',
  save: 'Сохранить',
  cancel: 'Отмена',
  delete: 'Удалить',
  edit: 'Изменить',
  add: 'Добавить',
  confirm: 'Подтвердить',
  close: 'Закрыть',
  retry: 'Повторить',

  // Welcome
  tagline: 'Цифровое управление залом',
  login: 'Войти',
  register: 'Регистрация',
  language: 'Язык',

  // Login
  username: 'Логин или email',
  password: 'Пароль',
  forgotPassword: 'Забыли пароль?',
  noAccount: 'Нет аккаунта?',
  loginError: 'Неверный логин или пароль',

  // Register
  chooseRole: 'Кто вы?',
  iAmOwner: 'Владелец зала',
  iAmOwnerSub: 'Управляю одним или несколькими залами',
  iAmManager: 'Менеджер зала',
  iAmManagerSub: 'Работаю на смене, нужен код приглашения',
  name: 'Имя',
  phone: 'Телефон',
  email: 'Email',
  inviteCode: 'Код приглашения',
  passwordAgain: 'Повторите пароль',
  agreeTerms: 'Согласен с условиями',
  createAccount: 'Создать аккаунт',

  // Home
  venue: 'Зал',
  tables: 'Столы',
  free: 'СВОБОДЕН',
  busy: 'ЗАНЯТ',
  perHour: '/ час',
  som: 'сом',
  today: 'Сегодня',
  activeTables: 'Активных',
  todayRevenue: 'Выручка',

  // Venue picker
  selectVenue: 'Выберите зал',
  newVenue: 'Новый зал',
  numTables: (n) => `${n} ${n === 1 ? 'стол' : n < 5 ? 'стола' : 'столов'}`,

  // Table detail
  start: 'НАЧАТЬ',
  stopAndFinish: 'ОСТАНОВИТЬ И ЗАКРЫТЬ',
  elapsed: 'прошло',
  currentAmount: 'текущая сумма',
  startedAt: 'Начало',
  duration: 'Длительность',
  hourly: 'Тариф',
  wrongStart: 'Ошибочный запуск',
  lastSession: 'Прошлая сессия',
  todayTotal: 'Сегодня сессий',

  // Payment
  paymentSummary: 'Итоги оплаты',
  subtotal: 'Подытог',
  discount: 'Скидка',
  toPay: 'К ОПЛАТЕ',
  confirmAndClose: 'ПОДТВЕРДИТЬ И ЗАКРЫТЬ',

  // Reports
  reports: 'Отчёты',
  allVenues: 'Все залы',
  thisMonth: 'Этот месяц',
  thisWeek: 'Эта неделя',
  thisYear: 'Этот год',
  custom: 'Период',
  totalRevenue: 'Общая выручка',
  vsLastMonth: 'к прошлому месяцу',
  sessionCount: 'Всего сессий',
  avgDuration: 'Средняя длительность',
  dailyRevenue: 'Выручка по дням',
  tablePerf: 'Топ столов',
  managerPerf: 'По менеджерам',
  hourDist: 'Часы пик',

  // Settings
  venueMgmt: 'Управление залами',
  tableMgmt: 'Столы и цены',
  managerMgmt: 'Менеджеры',
  subscription: 'Подписка',
  changePassword: 'Сменить пароль',
  logout: 'Выйти',

  // Managers
  activeInviteCode: 'Активный код приглашения',
  copy: 'Копировать',
  refresh: 'Обновить',
  copied: 'Скопировано',
  registeredManagers: 'Менеджеры',
  lastSeen: 'был(а)',
  minAgo: (n) => `${n} мин назад`,
  daysAgo: (n) => `${n} ${n === 1 ? 'день' : n < 5 ? 'дня' : 'дней'} назад`,
  inviteManager: 'Пригласить менеджера',

  // Subscription
  currentPlan: 'Текущий план',
  plan1000: '1 000 сом / зал / месяц',
  nextPayment: 'Следующий платёж',
  lastPayment: 'Последний платёж',
  paid: 'Оплачено',
  status: 'Статус',
  active: 'Активна',
  trial: 'Пробный период',
  trialDaysLeft: (n) => `Осталось ${n} дней`,

  // Empty states
  emptyTables: 'Пока нет столов. Добавьте первый.',
  emptyReports: 'Пока нет сессий. После первой сессии данные появятся здесь.',
  emptyManagers: 'Пока нет менеджеров. Поделитесь кодом приглашения.',
  emptyVenues: 'Пока нет залов. Добавьте первый зал.',

  // Roles
  role: 'Роль',
  owner: 'Владелец',
  manager: 'Менеджер',

  // Months
  months: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],
  weekdays: ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'],
};

// Sample data (Bishkek-flavoured: Kyrgyz names, som, real-feeling venues)
const TF_VENUES = [
  { id: 'v1', name: 'Центральный филиал', code: '№ 1', tables: 6, address: 'ул. Чуй 142' },
  { id: 'v2', name: 'Ботаника', code: '№ 2', tables: 4, address: 'мкр. Асанбай' },
  { id: 'v3', name: 'Ош', code: '№ 3', tables: 8, address: 'ул. Ленина 88' },
];

const TF_TABLES = [
  { id: 't1', name: 'Стол 1', sub: 'Основной',   rate: 200, state: 'free' },
  { id: 't2', name: 'Стол 2', sub: 'VIP зал',    rate: 350, state: 'busy', startedAt: Date.now() - 1000 * 60 * 83 }, // 1h 23m
  { id: 't3', name: 'Стол 3', sub: 'Основной',   rate: 200, state: 'free' },
  { id: 't4', name: 'Стол 4', sub: 'У окна',     rate: 200, state: 'busy', startedAt: Date.now() - 1000 * 60 * 27 }, // 27m
  { id: 't5', name: 'Стол 5', sub: 'Снукер',     rate: 400, state: 'free' },
  { id: 't6', name: 'Стол 6', sub: 'Основной',   rate: 200, state: 'free' },
];

const TF_MANAGERS = [
  { id: 'm1', name: 'Айбек Асанов',   username: 'aibek',   lastSeen: 10, unit: 'min', sessions: 142 },
  { id: 'm2', name: 'Нурлан Беков',   username: 'nurlan',  lastSeen: 2,  unit: 'day', sessions: 98 },
  { id: 'm3', name: 'Данияр Токтогул',username: 'daniyar', lastSeen: 1,  unit: 'day', sessions: 67 },
];

Object.assign(window, { TF_THEMES, RU, TF_VENUES, TF_TABLES, TF_MANAGERS });
