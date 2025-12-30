
import React, { useState } from 'react';
import { Employee } from '../../types';

const EmployeesModule: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([
    { id: '1', name: 'Afonso Dala', role: 'Caixa / Atendimento', status: 'active', lastCheckIn: '08:00', performance: 92 },
    { id: '2', name: 'Beatriz Manuel', role: 'Vendas', status: 'active', lastCheckIn: '08:15', performance: 85 },
    { id: '3', name: 'Carlos Pedro', role: 'Gestor de Stock', status: 'active', lastCheckIn: '07:55', performance: 98 },
    { id: '4', name: 'Dário Kassoma', role: 'Suporte Técnico', status: 'inactive', performance: 70 },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">Gestão de Equipa</h2>
        <button className="bg-slate-900 text-white px-6 py-2 rounded-xl font-bold shadow-lg hover:bg-slate-800 transition-all">
          <i className="fa-solid fa-plus mr-2"></i> Novo Funcionário
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Presença Hoje</p>
          <p className="text-2xl font-black text-slate-800">3 / 4</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Pontualidade</p>
          <p className="text-2xl font-black text-emerald-600">88%</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Faltas no Mês</p>
          <p className="text-2xl font-black text-rose-600">2</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Média Performance</p>
          <p className="text-2xl font-black text-blue-600">86 pts</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-[10px] text-slate-400 font-black uppercase tracking-widest">
              <tr>
                <th className="px-8 py-5">Funcionário</th>
                <th className="px-6 py-5">Cargo / Função</th>
                <th className="px-6 py-5">Presença</th>
                <th className="px-6 py-5">Desempenho</th>
                <th className="px-8 py-5 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {employees.map(emp => (
                <tr key={emp.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">
                        {emp.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-bold text-slate-800">{emp.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-slate-600">{emp.role}</td>
                  <td className="px-6 py-5">
                    {emp.status === 'active' ? (
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                        <span className="text-xs font-bold text-slate-800">Entrou às {emp.lastCheckIn}</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-slate-300 rounded-full"></span>
                        <span className="text-xs font-bold text-slate-400">Ausente</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-5">
                    <div className="w-24 bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${emp.performance > 80 ? 'bg-emerald-500' : emp.performance > 60 ? 'bg-amber-500' : 'bg-rose-500'}`}
                        style={{ width: `${emp.performance}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="text-slate-400 hover:text-blue-600 transition-colors">
                      <i className="fa-solid fa-ellipsis-vertical"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeesModule;
