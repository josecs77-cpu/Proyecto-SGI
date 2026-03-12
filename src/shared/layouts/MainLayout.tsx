import React, { ReactNode } from 'react';
import { LayoutDashboard, Users, School, BrainCircuit, Settings, Map as MapIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', to: '/' },
    { icon: School, label: 'Planteles', to: '/schools' },
    { icon: Users, label: 'Personal', to: '/staff' },
    { icon: MapIcon, label: 'GeoMapa', to: '/map' },
    { icon: BrainCircuit, label: 'Jules AI', to: '/ai-insights' },
    { icon: Settings, label: 'Configuración', to: '/settings' },
  ];

  return (
    <div className="flex h-screen w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300 z-50">
        <div className="h-16 flex items-center justify-center border-b border-gray-200 dark:border-gray-700 shrink-0">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            SGI V9
          </h1>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => (
              <li key={item.label}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-medium'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-100'
                    }`
                  }
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700 shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-700 dark:text-blue-400 font-semibold">
              AD
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Admin User</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">admin@sgi.edu</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden flex flex-col">
        {/* Top Header */}
        <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-6 justify-between shrink-0 z-40">
          <h2 className="text-lg font-semibold">Sistema de Gestión Integral</h2>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 relative">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
