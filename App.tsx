
import React, { useState, useEffect } from 'react';
import { BusinessSector, Module, User } from './types';
import { ALL_MODULES, SECTOR_CONFIGS } from './constants';
import Onboarding from './components/Onboarding';
import Signup from './components/Signup';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import CyberModule from './components/modules/Cyber';
import InventoryModule from './components/modules/Inventory';
import FinancesModule from './components/modules/Finances';
import CRMModule from './components/modules/CRM';
import EmployeesModule from './components/modules/Employees';
import SettingsModule from './components/modules/Settings';
import PrintingModule from './components/modules/Printing';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('omni_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [sector, setSector] = useState<BusinessSector | null>(() => {
    const saved = localStorage.getItem('omni_sector');
    return saved ? (saved as BusinessSector) : null;
  });
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [modules, setModules] = useState<Module[]>([]);

  useEffect(() => {
    if (sector) {
      const config = SECTOR_CONFIGS[sector];
      const updatedModules = ALL_MODULES.map(mod => ({
        ...mod,
        enabled: mod.id === 'dashboard' || mod.id === 'reports' || mod.id === 'settings' || config.includes(mod.id)
      }));
      setModules(updatedModules);
      localStorage.setItem('omni_sector', sector);
    }
  }, [sector]);

  const handleSignup = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('omni_user', JSON.stringify(newUser));
  };

  const handleSelectSector = (s: BusinessSector) => {
    setSector(s);
  };

  const logout = () => {
    if (confirm("Deseja terminar a sessão?")) {
      localStorage.removeItem('omni_user');
      localStorage.removeItem('omni_sector');
      setUser(null);
      setSector(null);
      setActiveTab('dashboard');
    }
  };

  const resetSector = () => {
    if (confirm("Deseja mesmo mudar o ramo? Isso redefinirá os módulos visíveis.")) {
      localStorage.removeItem('omni_sector');
      setSector(null);
    }
  };

  // Stage 1: Registration
  if (!user) {
    return <Signup onSignup={handleSignup} />;
  }

  // Stage 2: Sector Selection
  if (!sector) {
    return <Onboarding onSelect={handleSelectSector} user={user} />;
  }

  // Stage 3: Management App
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard sector={sector} setActiveTab={setActiveTab} user={user} />;
      case 'time':
        return <CyberModule />;
      case 'printing':
        return <PrintingModule />;
      case 'inventory':
        return <InventoryModule />;
      case 'cashier':
        return <FinancesModule />;
      case 'employees':
        return <EmployeesModule />;
      case 'crm':
        return <CRMModule />;
      case 'settings':
        return <SettingsModule sector={sector} onReset={resetSector} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <i className="fa-solid fa-person-digging text-5xl mb-4"></i>
            <h2 className="text-xl font-medium">Módulo "{activeTab}" em desenvolvimento</h2>
          </div>
        );
    }
  };

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      modules={modules} 
      sector={sector}
      onReset={resetSector}
      onLogout={logout}
      user={user}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
