
import { BusinessSector, Module } from './types';

export const SECTOR_CONFIGS: Record<BusinessSector, string[]> = {
  [BusinessSector.CYBER]: ['time', 'printing', 'cashier', 'employees', 'reports'],
  [BusinessSector.SHOP]: ['inventory', 'sales', 'cashier', 'employees', 'reports'],
  [BusinessSector.SERVICES]: ['appointments', 'crm', 'cashier', 'employees', 'reports'],
  [BusinessSector.SCHOOL]: ['students', 'tuition', 'attendance', 'employees', 'reports'],
  [BusinessSector.OFFICE]: ['employees', 'expenses', 'reports', 'cashier']
};

export const ALL_MODULES: Module[] = [
  { id: 'dashboard', name: 'Painel', icon: 'fa-house', enabled: true, path: '/' },
  { id: 'time', name: 'Gestão de Tempo', icon: 'fa-stopwatch', enabled: false, path: '/time' },
  { id: 'inventory', name: 'Produtos/Stock', icon: 'fa-boxes-stacked', enabled: false, path: '/inventory' },
  { id: 'cashier', name: 'Financeiro', icon: 'fa-wallet', enabled: false, path: '/finances' },
  { id: 'employees', name: 'Funcionários', icon: 'fa-user-tie', enabled: false, path: '/employees' },
  { id: 'crm', name: 'Clientes', icon: 'fa-users', enabled: false, path: '/crm' },
  { id: 'reports', name: 'Relatórios', icon: 'fa-chart-line', enabled: true, path: '/reports' },
  { id: 'settings', name: 'Definições', icon: 'fa-gear', enabled: true, path: '/settings' }
];
