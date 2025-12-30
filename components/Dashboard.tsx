
import React, { useState } from 'react';
import { BusinessSector, User } from '../types';
import { getAIInsights } from '../services/geminiService';

interface DashboardProps {
  sector: BusinessSector;
  setActiveTab: (id: string) => void;
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ sector, setActiveTab, user }) => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);

  // Business stats
  const stats = {
    monthlyProfit: 1250000,
    monthlyExpenses: 450000,
    activeStaff: 6,
    activeProducts: 48
  };

  const fetchInsights = async () => {
    setLoadingAI(true);
    const result = await getAIInsights(stats, sector);
    setInsight(result);
    setLoadingAI(false);
  };

  return (
    <div className="animate-fadeIn space-y-8">
      {/* Welcome & AI Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Olá, {user.name.split(' ')[0]}! 👋</h1>
          <p className="text-slate-500 text-sm">Painel de Controlo: <span className="font-bold text-blue-600">{user.companyName}</span></p>
        </div>
        <button 
          onClick={fetchInsights}
          disabled={loadingAI}
          className="flex items-center justify-center space-x-2 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-xl hover:bg-slate-800 transition-all disabled:opacity-50 group"
        >
          {loadingAI ? (
            <i className="fa-solid fa-circle-notch fa-spin"></i>
          ) : (
            <i className="fa-solid fa-wand-magic-sparkles group-hover:rotate-12 transition-transform"></i>
          )}
          <span className="font-black uppercase tracking-widest text-[10px]">{loadingAI ? 'A processar...' : 'Gerar Insights IA'}</span>
        </button>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Faturação Mensal" 
          value={`${stats.monthlyProfit.toLocaleString()} Kz`} 
          icon="fa-money-bill-trend-up" 
          color="text-emerald-600" 
          bg="bg-emerald-50"
          trend="+15%"
        />
        <StatCard 
          title="Total Despesas" 
          value={`${stats.monthlyExpenses.toLocaleString()} Kz`} 
          icon="fa-arrow-trend-down" 
          color="text-rose-600" 
          bg="bg-rose-50"
          trend="-2%"
        />
        <StatCard 
          title="Staff Ativo" 
          value={stats.activeStaff.toString()} 
          icon="fa-user-tie" 
          color="text-blue-600" 
          bg="bg-blue-50"
        />
        <StatCard 
          title="Stock / Itens" 
          value={stats.activeProducts.toString()} 
          icon="fa-boxes-stacked" 
          color="text-indigo-600" 
          bg="bg-indigo-50"
        />
      </div>

      {/* AI Insight Box */}
      {insight && (
        <div className="bg-slate-900 text-white rounded-[2rem] p-8 relative overflow-hidden shadow-2xl border border-white/5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px] pointer-events-none"></div>
          <div className="relative z-10 flex flex-col md:flex-row gap-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center text-4xl shrink-0 shadow-lg shadow-blue-500/20">
              <i className="fa-solid fa-robot"></i>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-xl font-black tracking-tight">
                  Relatório Inteligente para {user.companyName}
                </h3>
                <span className="px-2 py-1 bg-white/10 text-white/60 text-[8px] font-black uppercase tracking-[0.2em] rounded">Powered by Gemini</span>
              </div>
              <div className="text-slate-300 leading-relaxed text-sm md:text-base space-y-4">
                {insight}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Access Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-lg font-black text-slate-800 tracking-tight">Fluxo de Caixa Recente</h2>
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden">
            {[1, 2, 3].map(i => (
              <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-sm ${i % 2 === 0 ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
                    <i className={`fa-solid ${i % 2 === 0 ? 'fa-arrow-down' : 'fa-arrow-up'}`}></i>
                  </div>
                  <div>
                    <p className="font-black text-slate-800 text-sm">{i % 2 === 0 ? 'Fornecedor de Mercadoria' : 'Venda Concluída'}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Há {i * 12} minutos &bull; {user.companyName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-black ${i % 2 === 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                    {i % 2 === 0 ? '-' : '+'} {(i * 5500).toLocaleString()} Kz
                  </p>
                </div>
              </div>
            ))}
            <button 
              onClick={() => setActiveTab('cashier')}
              className="w-full py-5 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 hover:bg-blue-50 transition-colors"
            >
              Consultar Histórico Completo
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-lg font-black text-slate-800 tracking-tight">Equipa em Serviço</h2>
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-100 rounded-2xl">
              <div className="flex items-center space-x-3">
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-sm shadow-emerald-500"></div>
                <span className="text-xs font-black text-emerald-800 uppercase tracking-widest">4 Presentes</span>
              </div>
              <button onClick={() => setActiveTab('employees')} className="p-2 hover:bg-emerald-100 rounded-lg transition-colors text-emerald-600">
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
            <div className="space-y-4">
              <TeamMember name="Afonso D." role="Caixa" active />
              <TeamMember name="Beatriz M." role="Vendas" active />
              <TeamMember name="Carlos P." role="Stock" active />
              <TeamMember name="Dário K." role="Suporte" inactive />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ title: string; value: string; icon: string; color: string; bg: string; trend?: string }> = ({ title, value, icon, color, bg, trend }) => (
  <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm group hover:border-slate-300 hover:shadow-xl transition-all relative overflow-hidden">
    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
       <i className={`fa-solid ${icon} text-5xl`}></i>
    </div>
    <div className="flex justify-between items-center mb-6">
      <div className={`w-14 h-14 ${bg} ${color} rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-sm`}>
        <i className={`fa-solid ${icon}`}></i>
      </div>
      {trend && (
        <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-tighter ${trend.startsWith('+') ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
          {trend}
        </span>
      )}
    </div>
    <h4 className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{title}</h4>
    <p className="text-2xl font-black text-slate-800 tracking-tight">{value}</p>
  </div>
);

const TeamMember: React.FC<{ name: string; role: string; active?: boolean; inactive?: boolean }> = ({ name, role, active }) => (
  <div className="flex items-center justify-between group">
    <div className="flex items-center space-x-4">
      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xs font-black transition-all ${active ? 'bg-blue-100 text-blue-600 shadow-sm' : 'bg-slate-100 text-slate-400'}`}>
        {name[0]}
      </div>
      <div>
        <p className={`text-sm font-black ${active ? 'text-slate-800' : 'text-slate-400'}`}>{name}</p>
        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">{role}</p>
      </div>
    </div>
    <div className={`w-2 h-2 rounded-full ${active ? 'bg-emerald-500 shadow-sm shadow-emerald-500' : 'bg-slate-300'}`}></div>
  </div>
);

export default Dashboard;
