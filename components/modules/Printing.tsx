
import React, { useState, useMemo } from 'react';
import { PrintingJob, PrintConfig } from '../../types';

const PrintingModule: React.FC = () => {
  // Simulating data received from the "Rule of Gold" PC agents - Now with User linkage
  const [jobs, setJobs] = useState<PrintingJob[]>([
    { id: '1', clientName: 'Helder G.', pages: 12, type: 'B&W', pricePerUnit: 50, total: 600, timestamp: '10:15', status: 'paid', pcId: 1 },
    { id: '2', clientName: 'Maria J.', pages: 2, type: 'Color', pricePerUnit: 150, total: 300, timestamp: '11:45', status: 'pending', pcId: 3 },
    { id: '3', clientName: 'Visitante', pages: 5, type: 'B&W', pricePerUnit: 50, total: 250, timestamp: '14:20', status: 'paid', pcId: 1 },
    { id: '4', clientName: 'Carlos S.', pages: 15, type: 'Color', pricePerUnit: 150, total: 2250, timestamp: '15:10', status: 'paid', pcId: 2 },
    { id: '5', clientName: 'Ana B.', pages: 8, type: 'B&W', pricePerUnit: 50, total: 400, timestamp: '16:05', status: 'pending', pcId: 4 },
  ]);

  const [prices] = useState<PrintConfig>({
    priceBW: 50,
    priceColor: 150
  });

  const [showAdd, setShowAdd] = useState(false);
  const [newJob, setNewJob] = useState({ clientName: '', pages: 1, type: 'B&W' as 'B&W' | 'Color', pcId: 1 });

  // Calculate stats per PC (Rule of Gold: Each PC is identified)
  const pcStats = useMemo(() => {
    const stats: Record<number, { bw: number, color: number, totalKz: number }> = {};
    jobs.forEach(job => {
      const pc = job.pcId || 0;
      if (!stats[pc]) stats[pc] = { bw: 0, color: 0, totalKz: 0 };
      if (job.type === 'B&W') stats[pc].bw += job.pages;
      else stats[pc].color += job.pages;
      stats[pc].totalKz += job.total;
    });
    return stats;
  }, [jobs]);

  // Hourly distribution for the chart
  const hourlyData = useMemo(() => {
    const hours = Array(8).fill(0).map((_, i) => ({ hour: 9 + i, count: 0 }));
    jobs.forEach(job => {
      const h = parseInt(job.timestamp.split(':')[0]);
      const index = h - 9;
      if (index >= 0 && index < 8) hours[index].count += job.pages;
    });
    return hours;
  }, [jobs]);

  const handleAddJob = (e: React.FormEvent) => {
    e.preventDefault();
    const pricePerUnit = newJob.type === 'B&W' ? prices.priceBW : prices.priceColor;
    const job: PrintingJob = {
      id: Date.now().toString(),
      pcId: newJob.pcId,
      clientName: newJob.clientName || 'Visitante',
      pages: newJob.pages,
      type: newJob.type,
      pricePerUnit,
      total: newJob.pages * pricePerUnit,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'pending'
    };
    setJobs([job, ...jobs]);
    setShowAdd(false);
    setNewJob({ clientName: '', pages: 1, type: 'B&W', pcId: 1 });
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header & Status Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Monitor de Impressões</h2>
          <div className="flex items-center space-x-2 mt-1">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Sincronização Ativa com Postos & Usuários</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button 
            className="px-5 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all flex items-center space-x-2 shadow-sm"
          >
            <i className="fa-solid fa-file-invoice"></i>
            <span>Relatório por Usuário</span>
          </button>
          <button 
            onClick={() => setShowAdd(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center space-x-2"
          >
            <i className="fa-solid fa-plus"></i>
            <span>Lançamento Manual</span>
          </button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm col-span-1">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-center">Volume Geral</p>
          <div className="flex flex-col items-center">
            <p className="text-5xl font-black text-slate-800 mb-2">{jobs.reduce((a,b)=>a+b.pages,0)}</p>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-tighter">Folhas Totais</p>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-6">
            <div className="bg-slate-50 p-3 rounded-2xl text-center border border-slate-100">
               <p className="text-[9px] font-black text-slate-400 uppercase mb-1">B&W</p>
               <p className="font-black text-slate-800">{jobs.filter(j => j.type === 'B&W').reduce((a,b)=>a+b.pages,0)}</p>
            </div>
            <div className="bg-indigo-50 p-3 rounded-2xl text-center border border-indigo-100">
               <p className="text-[9px] font-black text-indigo-400 uppercase mb-1">Cores</p>
               <p className="font-black text-indigo-600">{jobs.filter(j => j.type === 'Color').reduce((a,b)=>a+b.pages,0)}</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-3 bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <i className="fa-solid fa-print text-9xl"></i>
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-black text-lg uppercase tracking-widest">Picos de Atividade</h3>
              <p className="text-xs text-slate-400">Distribuição horária das impressões</p>
            </div>
            <div className="flex items-end justify-between h-32 space-x-2">
              {hourlyData.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center group">
                  <div 
                    className="w-full bg-blue-500/20 group-hover:bg-blue-500 transition-all rounded-t-lg relative"
                    style={{ height: `${Math.max(10, (d.count / (jobs.reduce((a,b)=>a+b.pages,0) || 1)) * 100)}%` }}
                  >
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {d.count} fls
                    </div>
                  </div>
                  <span className="text-[9px] font-black text-slate-500 mt-2">{d.hour}h</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Activity Logs showing User Identities */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden mt-8">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
           <div>
              <h3 className="font-black text-slate-800 text-lg">Histórico Auditável</h3>
              <p className="text-xs text-slate-400 font-medium">Todas as impressões vinculadas a um Posto e um Usuário.</p>
           </div>
           <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-sm">
              <i className="fa-solid fa-magnifying-glass text-slate-400 text-xs"></i>
              <input type="text" placeholder="Filtrar Usuário..." className="bg-transparent text-xs font-bold text-slate-800 outline-none w-32" />
           </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/80 text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">
              <tr>
                <th className="px-8 py-5">Hora</th>
                <th className="px-6 py-5">Posto</th>
                <th className="px-6 py-5">Usuário (Dono)</th>
                <th className="px-6 py-5 text-center">Volume</th>
                <th className="px-6 py-5">Tipo</th>
                <th className="px-6 py-5">Custo Total</th>
                <th className="px-6 py-5 text-center">Status</th>
                <th className="px-8 py-5 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {jobs.map(job => (
                <tr key={job.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-5 text-xs font-bold text-slate-400">{job.timestamp}</td>
                  <td className="px-6 py-5">
                    <span className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-[9px] font-black uppercase shadow-sm">
                      PC {job.pcId?.toString().padStart(2, '0') || '--'}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center space-x-3">
                       <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs text-slate-500 font-black">
                          {job.clientName[0]}
                       </div>
                       <span className="font-black text-slate-800 text-sm">{job.clientName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="text-xl font-black text-slate-800">{job.pages}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest ${job.type === 'Color' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-600'}`}>
                      {job.type}
                    </span>
                  </td>
                  <td className="px-6 py-5 font-black text-slate-800">{job.total.toLocaleString()} Kz</td>
                  <td className="px-6 py-5 text-center">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${job.status === 'paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700 animate-pulse'}`}>
                      {job.status === 'paid' ? 'Liquidado' : 'Pendente'}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="text-slate-300 hover:text-blue-600 transition-colors">
                      <i className="fa-solid fa-eye"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Entry for adjustments - Always requiring a User */}
      {showAdd && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[120] flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-md rounded-[3rem] shadow-2xl overflow-hidden animate-slideUp border border-white/20">
             <div className="bg-slate-900 p-8 text-white flex justify-between items-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                  <div className="grid grid-cols-4 gap-2 p-4">
                     {[...Array(8)].map((_, i) => <i key={i} className="fa-solid fa-keyboard"></i>)}
                  </div>
                </div>
                <div className="relative z-10">
                   <h3 className="text-xl font-black italic tracking-tight uppercase">Entrada Manual</h3>
                   <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Ajuste de Impressora</p>
                </div>
                <button onClick={() => setShowAdd(false)} className="relative z-10 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors">
                   <i className="fa-solid fa-xmark"></i>
                </button>
             </div>
             <form onSubmit={handleAddJob} className="p-10 space-y-6">
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-1">Usuário / Dono do Job</label>
                   <input 
                     type="text" 
                     placeholder="Nome do Cliente ou Usuário"
                     className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 font-black text-slate-800 transition-all"
                     value={newJob.clientName}
                     onChange={e => setNewJob({...newJob, clientName: e.target.value})}
                     required
                   />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-1">Páginas</label>
                      <input 
                        type="number" 
                        min="1" 
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 font-black text-slate-800 transition-all text-center text-xl" 
                        value={newJob.pages}
                        onChange={e => setNewJob({...newJob, pages: parseInt(e.target.value) || 1})}
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-1">Modalidade</label>
                      <select 
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 font-black text-slate-700 transition-all"
                        value={newJob.type}
                        onChange={e => setNewJob({...newJob, type: e.target.value as 'B&W' | 'Color'})}
                      >
                         <option value="B&W">Preto & Branco</option>
                         <option value="Color">Cores (Prémio)</option>
                      </select>
                   </div>
                </div>
                <div className="bg-blue-600 p-8 rounded-3xl text-white shadow-xl shadow-blue-500/20 flex flex-col items-center justify-center space-y-2">
                   <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Faturação Direta</p>
                   <p className="text-4xl font-black">
                     {(newJob.pages * (newJob.type === 'B&W' ? prices.priceBW : prices.priceColor)).toLocaleString()} Kz
                   </p>
                </div>
                <button type="submit" className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl hover:bg-slate-800 transition-all active:scale-95">
                   Confirmar & Lançar
                </button>
             </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrintingModule;
