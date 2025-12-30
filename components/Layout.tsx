
import React, { useState } from 'react';
import { Module, BusinessSector, User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (id: string) => void;
  modules: Module[];
  sector: BusinessSector;
  onReset: () => void;
  onLogout: () => void;
  user: User;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, modules, sector, onReset, onLogout, user }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Sidebar */}
      <aside 
        className={`${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out bg-slate-900 text-white flex flex-col`}
      >
        <div className="p-4 flex items-center justify-between border-b border-slate-800">
          <div className={`flex items-center space-x-2 ${!isSidebarOpen && 'hidden'}`}>
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold">O</div>
            <span className="font-bold text-xl tracking-tight">OmniBiz</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <i className={`fa-solid ${isSidebarOpen ? 'fa-angle-left' : 'fa-bars'}`}></i>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-2 space-y-1">
          {modules.filter(m => m.enabled).map(mod => (
            <button
              key={mod.id}
              onClick={() => setActiveTab(mod.id)}
              className={`w-full flex items-center p-3 rounded-xl transition-all ${
                activeTab === mod.id 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <i className={`fa-solid ${mod.icon} ${isSidebarOpen ? 'w-6 mr-3' : 'w-full text-center'} text-lg`}></i>
              {isSidebarOpen && <span className="font-medium text-sm">{mod.name}</span>}
            </button>
          ))}
        </nav>

        <div className="p-2 border-t border-slate-800 space-y-1">
          <button
            onClick={onLogout}
            className={`w-full flex items-center p-3 rounded-xl text-rose-400 hover:bg-rose-900/20 transition-all`}
          >
            <i className={`fa-solid fa-right-from-bracket ${isSidebarOpen ? 'w-6 mr-3' : 'w-full text-center'}`}></i>
            {isSidebarOpen && <span className="font-medium text-sm">Sair</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shadow-sm z-10">
          <div className="hidden sm:block">
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{sector}</h2>
            <p className="text-lg font-black text-slate-800 tracking-tight">
              {modules.find(m => m.id === activeTab)?.name || 'Bem-vindo'}
            </p>
          </div>
          
          <div className="flex-1 sm:hidden">
             <p className="text-sm font-black text-blue-600">{user.companyName}</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="p-2 text-slate-400 hover:text-slate-600">
                <i className="fa-solid fa-bell"></i>
                <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
              </button>
            </div>
            <div className="flex items-center space-x-3 pl-4 border-l border-slate-200">
              <div className="text-right hidden md:block">
                <p className="text-xs font-black text-slate-800">{user.name}</p>
                <p className="text-[9px] text-slate-400 uppercase font-bold tracking-tighter">Admin Principal</p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 font-black shadow-sm border border-slate-200">
                {user.name[0]}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <section className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Layout;
