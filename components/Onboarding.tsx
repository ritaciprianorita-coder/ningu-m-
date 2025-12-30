
import React from 'react';
import { BusinessSector, User } from '../types';

interface OnboardingProps {
  onSelect: (sector: BusinessSector) => void;
  user: User;
}

const Onboarding: React.FC<OnboardingProps> = ({ onSelect, user }) => {
  const options = [
    { type: BusinessSector.CYBER, icon: 'fa-desktop', color: 'bg-indigo-500', desc: 'PCs, Tempo, Impressões' },
    { type: BusinessSector.SHOP, icon: 'fa-store', color: 'bg-emerald-500', desc: 'Vendas, Stock, Produtos' },
    { type: BusinessSector.SERVICES, icon: 'fa-scissors', color: 'bg-amber-500', desc: 'Agenda, Clientes, Pagamentos' },
    { type: BusinessSector.SCHOOL, icon: 'fa-graduation-cap', color: 'bg-blue-500', desc: 'Alunos, Mensalidades, Presenças' },
    { type: BusinessSector.OFFICE, icon: 'fa-building', color: 'bg-slate-600', desc: 'Funcionários, Salários, Despesas' },
  ];

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6">
      <div className="max-w-3xl w-full text-center mb-12">
        <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center font-bold text-4xl text-white mx-auto mb-6 shadow-2xl shadow-blue-500/20">
          O
        </div>
        <h1 className="text-4xl font-extrabold text-white mb-4 italic">Quase lá, {user.name.split(' ')[0]}!</h1>
        <p className="text-slate-400 text-lg">O seu perfil foi criado com sucesso. Agora, selecione o ramo para configurar o seu painel da <b>{user.companyName}</b>.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl w-full">
        {options.map((opt) => (
          <button
            key={opt.type}
            onClick={() => onSelect(opt.type)}
            className="group relative bg-slate-800 border border-slate-700 p-6 rounded-[2rem] text-left hover:border-blue-500 hover:bg-slate-800/50 transition-all duration-300"
          >
            <div className={`w-12 h-12 ${opt.color} rounded-xl flex items-center justify-center text-xl text-white mb-4 group-hover:scale-110 transition-transform`}>
              <i className={`fa-solid ${opt.icon}`}></i>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{opt.type}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{opt.desc}</p>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <i className="fa-solid fa-arrow-right text-blue-500"></i>
            </div>
          </button>
        ))}
      </div>

      <footer className="mt-16 text-slate-500 text-sm">
        OmniBiz Manager &bull; Configurando {user.companyName}
      </footer>
    </div>
  );
};

export default Onboarding;
