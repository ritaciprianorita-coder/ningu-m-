
import React, { useState } from 'react';
import { PCStatus } from '../../types';

const CyberModule: React.FC = () => {
  const [pcs, setPcs] = useState<PCStatus[]>([
    { id: 1, name: 'PC 01', status: 'occupied', startTime: '14:20', user: 'Helder G.' },
    { id: 2, name: 'PC 02', status: 'free' },
    { id: 3, name: 'PC 03', status: 'occupied', startTime: '15:10', user: 'Maria J.' },
    { id: 4, name: 'PC 04', status: 'free' },
    { id: 5, name: 'PC 05', status: 'maintenance' },
    { id: 6, name: 'PC 06', status: 'free' },
  ]);

  const [showOpenSession, setShowOpenSession] = useState<number | null>(null);
  const [newUserName, setNewUserName] = useState('');

  const openSession = (id: number) => {
    if (!newUserName.trim()) return;
    
    setPcs(pcs.map(pc => {
      if (pc.id === id) {
        return { 
          ...pc, 
          status: 'occupied', 
          startTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
          user: newUserName 
        };
      }
      return pc;
    }));
    setShowOpenSession(null);
    setNewUserName('');
  };

  const closeSession = (id: number) => {
    if (confirm("Deseja encerrar a sessão deste usuário e libertar o PC?")) {
      setPcs(pcs.map(pc => {
        if (pc.id === id) {
          return { ...pc, status: 'free', startTime: undefined, user: undefined };
        }
        return pc;
      }));
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-800 tracking-tight uppercase">Controlo de Postos (PCs)</h2>
          <p className="text-sm text-slate-500 font-medium">Gestão individual por usuário em cada máquina.</p>
        </div>
        <div className="flex space-x-2">
          <div className="flex items-center space-x-2 text-xs text-slate-500 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100 font-bold">
            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            <span>Disponíveis: {pcs.filter(p => p.status === 'free').length}</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-slate-500 bg-rose-50 px-4 py-2 rounded-full border border-rose-100 font-bold">
            <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
            <span>Ocupados: {pcs.filter(p => p.status === 'occupied').length}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {pcs.map((pc) => (
          <div 
            key={pc.id}
            className={`bg-white border p-6 rounded-[2rem] transition-all group shadow-sm hover:shadow-xl relative overflow-hidden ${
              pc.status === 'occupied' ? 'border-rose-100 ring-4 ring-rose-50/30' : 'border-slate-100'
            }`}
          >
            {pc.status === 'occupied' && (
              <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
            )}

            <div className="flex items-start justify-between mb-6">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-transform group-hover:scale-110 shadow-sm ${
                pc.status === 'occupied' ? 'bg-rose-600 text-white' : 
                pc.status === 'maintenance' ? 'bg-slate-100 text-slate-300' : 'bg-emerald-600 text-white'
              }`}>
                <i className={`fa-solid ${pc.status === 'maintenance' ? 'fa-screwdriver-wrench' : 'fa-desktop'}`}></i>
              </div>
              <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                pc.status === 'occupied' ? 'bg-rose-100 text-rose-700' : 
                pc.status === 'maintenance' ? 'bg-slate-100 text-slate-600' : 'bg-emerald-100 text-emerald-700'
              }`}>
                {pc.status === 'free' ? 'Disponível' : pc.status === 'occupied' ? 'Em Uso' : 'Manutenção'}
              </div>
            </div>

            <h3 className="text-xl font-black text-slate-800 flex items-center">
              {pc.name}
            </h3>
            
            <div className="mt-4 space-y-3 mb-8 min-h-[70px]">
              {pc.status === 'occupied' ? (
                <>
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-600">
                      <i className="fa-solid fa-user"></i>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">Usuário</p>
                      <p className="font-black text-slate-800">{pc.user}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                      <i className="fa-solid fa-clock"></i>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">Início</p>
                      <p className="font-black text-slate-800">{pc.startTime}</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-300 py-2">
                  <i className="fa-solid fa-user-plus text-xl mb-1 opacity-20"></i>
                  <p className="text-[10px] font-black uppercase tracking-widest italic">Aguardando Usuário</p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              {pc.status === 'occupied' ? (
                <>
                  <button 
                    onClick={() => closeSession(pc.id)}
                    className="w-full py-4 bg-rose-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-rose-200 hover:bg-rose-700 transition-all active:scale-95"
                  >
                    Encerrar Sessão
                  </button>
                  <button className="w-full py-3 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all border border-dashed border-slate-200">
                    <i className="fa-solid fa-print mr-2"></i> Lançar Impressão ({pc.user})
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => pc.status !== 'maintenance' && setShowOpenSession(pc.id)}
                  disabled={pc.status === 'maintenance'}
                  className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                    pc.status === 'maintenance' 
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-emerald-600 text-white shadow-lg shadow-emerald-100 hover:bg-emerald-700 active:scale-95'
                  }`}
                >
                  Identificar Usuário
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal to Open Session with User Assignment */}
      {showOpenSession !== null && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[110] flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl p-8 animate-slideUp">
            <h3 className="text-xl font-black text-slate-800 mb-2">Novo Usuário - Posto #{showOpenSession}</h3>
            <p className="text-sm text-slate-500 mb-6">Cada PC deve ter um usuário identificado para segurança e faturação.</p>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nome do Usuário</label>
                <div className="relative">
                  <i className="fa-solid fa-user-tag absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                  <input 
                    autoFocus
                    type="text" 
                    placeholder="Ex: Helder Gonçalves"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 font-bold text-slate-800 transition-all"
                    value={newUserName}
                    onChange={e => setNewUserName(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && openSession(showOpenSession)}
                  />
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button 
                  onClick={() => setShowOpenSession(null)}
                  className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all"
                >
                  Cancelar
                </button>
                <button 
                  onClick={() => openSession(showOpenSession)}
                  disabled={!newUserName.trim()}
                  className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all disabled:opacity-50"
                >
                  Abrir Tempo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Live Printing Sync Banner */}
      <div className="bg-slate-900 text-white p-8 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="grid grid-cols-6 gap-4 p-8">
            {[...Array(12)].map((_, i) => <i key={i} className="fa-solid fa-user-check text-4xl"></i>)}
          </div>
        </div>
        <div className="relative z-10 mb-6 md:mb-0 text-center md:text-left">
          <div className="inline-flex items-center space-x-2 bg-blue-500/20 text-blue-300 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
             <i className="fa-solid fa-shield-halved"></i>
             <span>Sessões Identificadas</span>
          </div>
          <h3 className="text-2xl font-black mb-2">Rastreio por Usuário</h3>
          <p className="text-slate-400 text-sm max-w-sm italic">
            "Regra de Ouro: Cada PC reporta o usuário ativo, garantindo que cada impressão tenha um dono."
          </p>
        </div>
        <div className="relative z-10 grid grid-cols-2 gap-4">
           <div className="text-center bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-3xl min-w-[140px]">
              <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">Sessões Ativas</p>
              <p className="text-3xl font-black text-emerald-400">{pcs.filter(p=>p.status==='occupied').length}</p>
           </div>
           <div className="text-center bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-3xl min-w-[140px]">
              <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">Total Hoje</p>
              <p className="text-3xl font-black text-blue-400">24</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CyberModule;
