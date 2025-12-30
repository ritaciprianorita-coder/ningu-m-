
import React, { useState } from 'react';

const FinancesModule: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'entries' | 'exits'>('entries');

  return (
    <div className="space-y-8 animate-fadeIn">
       {/* High Level Balance */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-emerald-600 p-8 rounded-3xl text-white shadow-xl shadow-emerald-200 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-20 text-6xl">
                <i className="fa-solid fa-money-bill-trend-up"></i>
             </div>
             <p className="text-emerald-100 text-xs font-black uppercase tracking-widest mb-1">Entradas Hoje</p>
             <p className="text-3xl font-black">45.500 Kz</p>
             <div className="mt-4 inline-flex items-center px-2 py-1 bg-white/20 rounded text-[10px] font-bold">
                <i className="fa-solid fa-arrow-up mr-1"></i> +12%
             </div>
          </div>
          <div className="bg-rose-600 p-8 rounded-3xl text-white shadow-xl shadow-rose-200 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-20 text-6xl">
                <i className="fa-solid fa-arrow-trend-down"></i>
             </div>
             <p className="text-rose-100 text-xs font-black uppercase tracking-widest mb-1">Saídas Hoje</p>
             <p className="text-3xl font-black">12.200 Kz</p>
             <div className="mt-4 inline-flex items-center px-2 py-1 bg-white/20 rounded text-[10px] font-bold">
                <i className="fa-solid fa-arrow-down mr-1"></i> -5%
             </div>
          </div>
          <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl shadow-slate-200 relative overflow-hidden border-4 border-white">
             <div className="absolute top-0 right-0 p-4 opacity-20 text-6xl">
                <i className="fa-solid fa-wallet"></i>
             </div>
             <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Saldo Líquido</p>
             <p className="text-3xl font-black">33.300 Kz</p>
             <p className="text-[10px] text-slate-500 mt-4 uppercase font-bold tracking-widest">Em Caixa Ativo</p>
          </div>
       </div>

       {/* Detailed Records */}
       <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex border-b border-slate-100">
             <button 
               onClick={() => setActiveSubTab('entries')}
               className={`flex-1 py-5 text-sm font-black uppercase tracking-widest transition-all ${activeSubTab === 'entries' ? 'text-emerald-600 border-b-4 border-emerald-600 bg-emerald-50/50' : 'text-slate-400 hover:text-slate-600'}`}
             >
                <i className="fa-solid fa-arrow-up-long mr-2"></i> Entradas / Vendas
             </button>
             <button 
               onClick={() => setActiveSubTab('exits')}
               className={`flex-1 py-5 text-sm font-black uppercase tracking-widest transition-all ${activeSubTab === 'exits' ? 'text-rose-600 border-b-4 border-rose-600 bg-rose-50/50' : 'text-slate-400 hover:text-slate-600'}`}
             >
                <i className="fa-solid fa-arrow-down-long mr-2"></i> Saídas / Despesas
             </button>
          </div>

          <div className="p-8">
             <div className="flex justify-between items-center mb-6">
                <div className="relative flex-1 max-w-sm">
                   <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                   <input type="text" placeholder="Pesquisar histórico..." className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <button className={`px-6 py-3 rounded-xl text-white font-bold shadow-lg transition-all ${activeSubTab === 'entries' ? 'bg-emerald-600 shadow-emerald-200' : 'bg-rose-600 shadow-rose-200'}`}>
                   {activeSubTab === 'entries' ? 'Nova Entrada' : 'Nova Saída'}
                </button>
             </div>

             <div className="space-y-4">
                {[1, 2, 3, 4].map(i => (
                   <div key={i} className="flex items-center justify-between p-5 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                      <div className="flex items-center space-x-4">
                         <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${activeSubTab === 'entries' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                            <i className={`fa-solid ${activeSubTab === 'entries' ? 'fa-cart-shopping' : 'fa-receipt'}`}></i>
                         </div>
                         <div>
                            <p className="font-black text-slate-800">{activeSubTab === 'entries' ? 'Venda Ref. #00'+i : 'Compra de Material'}</p>
                            <p className="text-xs text-slate-400">Hoje, 10:4{i} • Atendido por Afonso D.</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <p className={`text-lg font-black ${activeSubTab === 'entries' ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {activeSubTab === 'entries' ? '+' : '-'} {(i * 2500).toLocaleString()} Kz
                         </p>
                         <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded font-black uppercase">Multicaixa</span>
                      </div>
                   </div>
                ))}
             </div>
          </div>
       </div>

       {/* Footer Chart Mockup */}
       <div className="bg-slate-900 text-white p-8 rounded-3xl">
          <div className="flex items-center justify-between mb-8">
             <div>
                <h3 className="text-xl font-bold">Desempenho Semanal</h3>
                <p className="text-slate-400 text-sm">Comparativo de fluxo de caixa</p>
             </div>
             <div className="flex space-x-4 text-xs font-bold uppercase tracking-widest">
                <div className="flex items-center space-x-2"><span className="w-2 h-2 bg-emerald-500 rounded-full"></span> <span>Entradas</span></div>
                <div className="flex items-center space-x-2"><span className="w-2 h-2 bg-rose-500 rounded-full"></span> <span>Saídas</span></div>
             </div>
          </div>
          <div className="h-32 flex items-end justify-between space-x-4">
             {[30, 45, 25, 60, 50, 80, 70].map((v, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end space-y-1">
                   <div className="w-full bg-rose-500/30 rounded-t-sm" style={{ height: `${v*0.4}%` }}></div>
                   <div className="w-full bg-emerald-500 rounded-t-sm" style={{ height: `${v}%` }}></div>
                </div>
             ))}
          </div>
       </div>
    </div>
  );
};

export default FinancesModule;
