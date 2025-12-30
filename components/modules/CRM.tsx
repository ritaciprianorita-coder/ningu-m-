
import React, { useState } from 'react';
import { Client } from '../../types';

const CRMModule: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([
    { id: '1', name: 'Helder Gonçalves', phone: '923 456 789', email: 'helder@email.ao', balance: -2500 },
    { id: '2', name: 'Maria João', phone: '944 112 334', balance: 0 },
    { id: '3', name: 'Carlos Santos', phone: '912 000 111', email: 'carlos@gmail.com', balance: 1500 },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">Base de Clientes</h2>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold">
           Novo Cliente
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map(client => (
          <div key={client.id} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:border-blue-300 transition-all">
             <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-500">
                   {client.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                   <h3 className="font-bold text-slate-800">{client.name}</h3>
                   <p className="text-xs text-slate-400">{client.phone}</p>
                </div>
             </div>
             
             <div className="bg-slate-50 rounded-xl p-3 flex justify-between items-center">
                <span className="text-xs text-slate-500 uppercase font-bold tracking-tight">Saldo</span>
                <span className={`font-bold ${client.balance < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                   {client.balance.toLocaleString()} Kz
                </span>
             </div>
             
             <div className="mt-4 flex space-x-2">
                <button className="flex-1 bg-slate-100 text-slate-700 py-2 rounded-lg text-xs font-bold hover:bg-slate-200">
                   Ver Histórico
                </button>
                <button className="w-10 h-10 bg-blue-100 text-blue-600 flex items-center justify-center rounded-lg">
                   <i className="fa-brands fa-whatsapp"></i>
                </button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CRMModule;
