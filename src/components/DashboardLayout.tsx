import { useAuth } from '../hooks/useAuth';
import { Navigate, Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Smile, Trophy, LogOut } from 'lucide-react';
import clsx from 'clsx';

export default function DashboardLayout() {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const navItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
    { icon: Smile, label: 'Mood Tracker', path: '/dashboard/mood' },
    { icon: Trophy, label: 'Leaderboard', path: '/dashboard/leaderboard' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            TeamClick
          </h1>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={clsx(
                  'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors',
                  isActive
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center p-2 mb-4 space-x-3 rounded-lg bg-gray-50">
             <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                {user?.name.charAt(0)}
             </div>
             <div>
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.role}</p>
             </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center space-x-3 px-4 py-2 w-full text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10 md:hidden flex justify-between items-center">
             <h1 className="text-xl font-bold">TeamClick</h1>
             <button onClick={logout}><LogOut size={20} /></button>
        </header>
        <div className="p-8">
            <Outlet />
        </div>
      </main>
    </div>
  );
}
