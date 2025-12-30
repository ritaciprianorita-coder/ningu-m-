
export enum BusinessSector {
  CYBER = 'Cyber / Lan House',
  SHOP = 'Loja / Comércio',
  SERVICES = 'Serviços / Freelancer',
  SCHOOL = 'Escola / Formação',
  OFFICE = 'Escritório / Empresa'
}

export interface User {
  id: string;
  name: string;
  email: string;
  companyName: string;
}

export interface Module {
  id: string;
  name: string;
  icon: string;
  enabled: boolean;
  path: string;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  isService?: boolean;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'inactive';
  lastCheckIn?: string;
  performance: number; // 0-100
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  email?: string;
  balance: number;
}

export interface CompanySettings {
  name: string;
  logo?: string;
  nif?: string;
  address?: string;
}

export interface PCStatus {
  id: number;
  name: string;
  status: 'free' | 'occupied' | 'maintenance';
  startTime?: string;
  user?: string; // Each PC MUST have a user when occupied
}

export interface PrintingJob {
  id: string;
  pcId?: number;
  clientName: string;
  pages: number;
  type: 'B&W' | 'Color';
  pricePerUnit: number;
  total: number;
  timestamp: string;
  status: 'pending' | 'paid';
}

export interface PrintConfig {
  priceBW: number;
  priceColor: number;
}
