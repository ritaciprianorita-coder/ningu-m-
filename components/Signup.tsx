
import React, { useState } from 'react';
import { User } from '../types';

interface SignupProps {
  onSignup: (user: User) => void;
}

const Signup: React.FC<SignupProps> = ({ onSignup }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    companyName: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.companyName) return;

    const newUser: User = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      companyName: formData.companyName
    };
    onSignup(newUser);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center font-bold text-3xl text-white mx-auto mb-6 shadow-2xl shadow-blue-500/20">
            O
          </div>
          <h1 className="text-3xl font-black text-white mb-2">Criar sua Conta</h1>
          <p className="text-slate-400">Junte-se à maior plataforma de gestão em Angola.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-slate-800 p-8 rounded-[2rem] border border-slate-700 shadow-2xl space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Nome Completo</label>
            <div className="relative">
              <i className="fa-solid fa-user absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
              <input 
                required
                type="text" 
                placeholder="Ex: Manuel Afonso"
                className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-slate-700 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Email Profissional</label>
            <div className="relative">
              <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
              <input 
                required
                type="email" 
                placeholder="exemplo@empresa.ao"
                className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-slate-700 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Nome da Empresa / Negócio</label>
            <div className="relative">
              <i className="fa-solid fa-building absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
              <input 
                required
                type="text" 
                placeholder="Ex: Cyber Speed Lda"
                className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-slate-700 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                value={formData.companyName}
                onChange={e => setFormData({...formData, companyName: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Palavra-passe</label>
            <div className="relative">
              <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
              <input 
                required
                type="password" 
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-slate-700 rounded-2xl text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 transition-all active:scale-95 mt-4"
          >
            Criar Conta e Continuar
          </button>
        </form>

        <p className="mt-8 text-center text-slate-500 text-sm">
          Já tem uma conta? <button className="text-blue-400 font-bold hover:underline">Iniciar Sessão</button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
