
import React, { useState } from 'react';
import { Product } from '../../types';

const InventoryModule: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'Coca-Cola 330ml', price: 450, stock: 24, category: 'Bebidas' },
    { id: '2', name: 'Lays Batatas 45g', price: 600, stock: 12, category: 'Snacks' },
    { id: '3', name: 'Papel A4 Resma', price: 4500, stock: 4, category: 'Escritório' },
    { id: '4', name: 'Caneta Azul Bic', price: 150, stock: 50, category: 'Escritório' },
    { id: '5', name: 'Água Pura 500ml', price: 200, stock: 48, category: 'Bebidas' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-slate-800">Stock & Inventário</h2>
        <div className="flex items-center space-x-2">
           <button className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-bold hover:bg-slate-300 transition-colors">
              <i className="fa-solid fa-file-export mr-2"></i> Exportar
           </button>
           <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors">
              <i className="fa-solid fa-plus mr-2"></i> Novo Produto
           </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center">
          <div className="relative flex-1 max-w-md">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input 
              type="text" 
              placeholder="Pesquisar produto ou categoria..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-xs uppercase tracking-wider font-bold border-b border-slate-200">
                <th className="px-6 py-4">Produto</th>
                <th className="px-6 py-4">Categoria</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Preço (Kz)</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-800">{p.name}</td>
                  <td className="px-6 py-4">
                    <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-md text-xs font-medium">
                      {p.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className={`font-bold ${p.stock <= 5 ? 'text-rose-600' : 'text-slate-700'}`}>
                        {p.stock}
                      </span>
                      {p.stock <= 5 && (
                        <span className="bg-rose-100 text-rose-700 px-2 py-0.5 rounded text-[10px] font-bold">BAIXO</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-700 font-medium">{p.price.toLocaleString()} Kz</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button className="p-2 text-slate-400 hover:text-rose-600 transition-colors">
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Rapid POS Entry */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="md:col-span-2 bg-gradient-to-br from-indigo-600 to-blue-700 p-6 rounded-2xl text-white shadow-xl">
            <h3 className="text-lg font-bold mb-4">Venda Rápida (PDV)</h3>
            <div className="flex space-x-4 mb-6">
                <input 
                  type="text" 
                  placeholder="Código de barras ou Nome..."
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl outline-none focus:bg-white/20 placeholder-white/50"
                />
                <button className="bg-white text-blue-700 px-6 py-3 rounded-xl font-bold hover:bg-slate-100 transition-all">
                  Adicionar
                </button>
            </div>
            <div className="bg-white/10 rounded-xl p-4 min-h-[100px] flex items-center justify-center border border-dashed border-white/30">
               <p className="text-white/60 text-sm">Nenhum item no carrinho.</p>
            </div>
         </div>
         
         <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
            <div>
               <h3 className="font-bold text-slate-800 mb-2">Total do Carrinho</h3>
               <p className="text-3xl font-black text-blue-600">0,00 Kz</p>
            </div>
            <button disabled className="w-full mt-6 py-4 bg-slate-100 text-slate-400 rounded-xl font-bold cursor-not-allowed">
               Finalizar Venda
            </button>
         </div>
      </div>
    </div>
  );
};

export default InventoryModule;
