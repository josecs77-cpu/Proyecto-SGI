import React, { ReactNode, useState, useEffect } from 'react';
import { LayoutDashboard, Users, School, BrainCircuit, Settings, Map as MapIcon, Layers, GraduationCap, Menu, X, Building, Zap, Server, ChevronLeft, ChevronRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // For desktop

  // Close sidebar on mobile when route changes
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [window.location.pathname]);

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarCollapsed(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', to: '/' },
    { icon: School, label: 'Planteles', to: '/schools' },
    { icon: GraduationCap, label: 'Matrícula', to: '/matricula' },
    { icon: Users, label: 'Personal', to: '/staff' },
    { icon: Layers, label: 'Cuadratura', to: '/cuadratura' },
    { icon: Building, label: 'Bienes Nacionales', to: '/bienes' },
    { icon: Zap, label: 'CNAE', to: '/cnae' },
    { icon: Server, label: 'FEDE', to: '/fede' },
    { icon: School, label: 'Fundabit', to: '/fundabit' },
    { icon: Settings, label: 'Mantenimiento', to: '/mantenimiento' },
    { icon: Users, label: 'Usuarios', to: '/usuarios' },
    { icon: MapIcon, label: 'GeoMapa', to: '/map' },
    { icon: BrainCircuit, label: 'Jules AI', to: '/ai-insights' },
  ];

  return (
    <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 overflow-hidden">

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-full bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col shadow-lg lg:shadow-sm transition-all duration-300 z-50
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isSidebarCollapsed ? 'w-20' : 'w-72'}
        `}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100 dark:border-slate-700 shrink-0">
          {!isSidebarCollapsed && (
            <h1 className="text-xl font-black tracking-tight text-slate-800 dark:text-slate-100 truncate">
              SGI <span className="text-blue-600 font-light">Anzoátegui</span>
            </h1>
          )}
          {isSidebarCollapsed && (
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-black text-sm mx-auto">
              SGI
            </div>
          )}

          <button
            className="lg:hidden text-slate-500 hover:text-slate-700"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-hide">
          {!isSidebarCollapsed && (
            <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3 mt-2">
              Módulos Principales
            </p>
          )}
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              title={isSidebarCollapsed ? item.label : undefined}
              className={({ isActive }) =>
                `flex items-center gap-3 py-2.5 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-semibold shadow-sm border border-blue-100/50 dark:border-blue-800/50'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200 font-medium'
                } ${isSidebarCollapsed ? 'px-0 justify-center' : 'px-4'}`
              }
            >
              <item.icon className={`shrink-0 ${isSidebarCollapsed ? 'w-6 h-6' : 'w-5 h-5'}`} strokeWidth={isSidebarCollapsed ? 1.5 : 2} />
              {!isSidebarCollapsed && <span className="text-sm truncate">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-slate-100 dark:border-slate-700 shrink-0">
          <button className={`flex items-center gap-3 w-full p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left ${isSidebarCollapsed ? 'justify-center' : ''}`}>
            <div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-sm shrink-0">
              AD
            </div>
            {!isSidebarCollapsed && (
              <>
                <div className="flex flex-col truncate">
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">Admin General</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 truncate">Configuración</span>
                </div>
                <Settings className="w-4 h-4 text-slate-400 ml-auto shrink-0" />
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen w-full min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center px-4 justify-between shrink-0 z-30 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 rounded-md text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Desktop Collapse Toggle */}
            <button
              className="hidden lg:flex p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              title={isSidebarCollapsed ? "Expandir menú" : "Colapsar menú"}
            >
              {isSidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>

            <h2 className="text-base font-semibold text-slate-700 dark:text-slate-200 hidden sm:block truncate">Sistema de Gestión Integral V9</h2>
          </div>

          <div className="flex items-center gap-2">
            {/* You can add top bar actions here like notifications, profile, etc */}
            <div className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full hidden md:block">
              Estado: Anzoátegui
            </div>
          </div>
        </header>

        {/* Content Area - Changed padding to ensure maps/tables can use full space if needed,
            or inner components can add padding */}
        <div className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 dark:bg-slate-900 relative">
          <div className="h-full min-h-full p-2 sm:p-4 lg:p-6 pb-20 flex flex-col">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
