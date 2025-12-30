
import React from 'react';
import { BusinessSector } from '../../types';

interface SettingsProps {
  sector: BusinessSector;
  onReset: () => void;
}

const SettingsModule: React.FC<SettingsProps> = ({ sector, onReset }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Dados da Empresa</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-slate-400 tracking-widest">Nome do Negócio</label>
            <input type="text" placeholder="Ex: Meu Negócio Lda" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-slate-400 tracking-widest">NIF</label>
            <input type="text" placeholder="000000000LA000" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-slate-400 tracking-widest">Email Comercial</label>
            <input type="email" placeholder="contacto@empresa.ao" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-slate-400 tracking-widest">Telefone</label>
            <input type="text" placeholder="+244 9XX XXX XXX" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
        <div className="mt-8 flex justify-end">
           <button className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-slate-800 transition-all">
              Guardar Alterações
           </button>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Tipo de Ramo</h2>
        <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-100 rounded-2xl">
          <div>
            <p className="font-bold text-blue-900">{sector}</p>
            <p className="text-xs text-blue-700 opacity-70">Os seus módulos foram configurados para este ramo.</p>
          </div>
          <button 
            onClick={onReset}
            className="text-xs font-black uppercase tracking-widest text-rose-600 bg-rose-50 px-4 py-2 rounded-lg border border-rose-100 hover:bg-rose-100 transition-all"
          >
            Mudar Ramo
          </button>
        </div>
      </div>

      <div className="bg-rose-50 p-8 rounded-3xl border border-rose-100">
        <h2 className="text-xl font-bold text-rose-900 mb-2">Zona de Perigo</h2>
        <p className="text-sm text-rose-700 mb-6">Estas ações são irreversíveis e podem apagar todos os dados da empresa.</p>
        <button className="bg-rose-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-rose-200 hover:bg-rose-700 transition-all">
          Apagar Todos os Dados
        </button>
      </div>
    </div>
  );
};

export default SettingsModule;
