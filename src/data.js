export const TF_VENUES = [
  { id: 'v1', name: 'Центральный филиал', code: '№ 1', tables: 6, address: 'ул. Чуй 142' },
  { id: 'v2', name: 'Ботаника', code: '№ 2', tables: 4, address: 'мкр. Асанбай' },
  { id: 'v3', name: 'Ош', code: '№ 3', tables: 8, address: 'ул. Ленина 88' },
];

export const TF_TABLES = [
  { id: 't1', name: 'Стол 1', sub: 'Основной',  rate: 200, state: 'free' },
  { id: 't2', name: 'Стол 2', sub: 'VIP зал',   rate: 350, state: 'busy', startedAt: Date.now() - 1000 * 60 * 83 },
  { id: 't3', name: 'Стол 3', sub: 'Основной',  rate: 200, state: 'free' },
  { id: 't4', name: 'Стол 4', sub: 'У окна',    rate: 200, state: 'busy', startedAt: Date.now() - 1000 * 60 * 27 },
  { id: 't5', name: 'Стол 5', sub: 'Снукер',    rate: 400, state: 'free' },
  { id: 't6', name: 'Стол 6', sub: 'Основной',  rate: 200, state: 'free' },
];

export const TF_MANAGERS = [
  { id: 'm1', name: 'Айбек Асанов',    username: 'aibek',   lastSeen: 10, unit: 'min', sessions: 142 },
  { id: 'm2', name: 'Нурлан Беков',    username: 'nurlan',  lastSeen: 2,  unit: 'day', sessions: 98 },
  { id: 'm3', name: 'Данияр Токтогул', username: 'daniyar', lastSeen: 1,  unit: 'day', sessions: 67 },
];
