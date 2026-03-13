import React, { ReactNode } from 'react';
import { LayoutDashboard, Users, School, BrainCircuit, Settings, Map as MapIcon, Layers, GraduationCap } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', to: '/' },
    { icon: School, label: 'Planteles', to: '/schools' },
    { icon: GraduationCap, label: 'Matrícula', to: '/matricula' },
    { icon: Users, label: 'Personal', to: '/staff' },
    { icon: Layers, label: 'Cuadratura', to: '/cuadratura' },
    { icon: School, label: 'Bienes Nacionales', to: '/bienes' },
    { icon: School, label: 'CNAE', to: '/cnae' },
    { icon: School, label: 'FEDE', to: '/fede' },
    { icon: School, label: 'Fundabit', to: '/fundabit' },
    { icon: Settings, label: 'Mantenimiento', to: '/mantenimiento' },
    { icon: Users, label: 'Usuarios', to: '/usuarios' },
    { icon: MapIcon, label: 'GeoMapa', to: '/map' },
    { icon: BrainCircuit, label: 'Jules AI', to: '/ai-insights' },
  ];

  return (
    <div className="flex h-screen w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar - Ahora usa diseño corporativo claro */}
      <aside className="w-72 bg-white border-r border-slate-200 h-screen flex flex-col shadow-sm transition-all duration-300 z-50">
        <div className="h-20 flex items-center px-8 border-b border-slate-100 shrink-0">
          <h1 className="text-2xl font-black tracking-tight text-slate-800">
            SGI <span className="text-blue-600 font-light">Anzoátegui</span>
          </h1>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5">
          <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">
            Menú Principal
          </p>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-semibold shadow-sm border border-blue-100/50'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'
                }`
              }
            >
              <item.icon className="w-5 h-5 shrink-0" strokeWidth={2} />
              <span className="text-sm">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100 shrink-0">
          <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-slate-50 transition-colors text-left">
            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              AD
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-800">Admin General</span>
              <span className="text-xs text-slate-500">Configuración</span>
            </div>
            <Settings className="w-4 h-4 text-slate-400 ml-auto" />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden flex flex-col">
        {/* Top Header */}
        <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-6 justify-between shrink-0 z-40 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-700">Sistema de Gestión Integral V9</h2>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto bg-slate-50 relative">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;