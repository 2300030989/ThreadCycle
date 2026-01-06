import { useState, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Truck,
  History,
  Settings,
  LogOut,
  LogIn,
  Leaf,
  Award,
  Bell,
  Menu,
} from 'lucide-react';
import Chatbot from './Chatbot';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside
        className={`bg-green-900 text-white transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-20'
        } hidden md:flex flex-col fixed h-full z-10`}
      >
        <div className="h-16 flex items-center justify-center border-b border-green-800">
          <h1 className={`font-bold text-xl ${!sidebarOpen && 'hidden'}`}>
            DonateThread
          </h1>
          {!sidebarOpen && <Leaf className="h-8 w-8 text-green-400" />}
        </div>

        <nav className="flex-1 py-6 space-y-2 px-4">
          <Link to="/dashboard">
            <NavItem 
              icon={<LayoutDashboard />} 
              label="Dashboard" 
              active={isActive('/dashboard')} 
              isOpen={sidebarOpen} 
            />
          </Link>
          <Link to="/schedule-pickup">
            <NavItem 
              icon={<Truck />} 
              label="Schedule Pickup" 
              active={isActive('/schedule-pickup')} 
              isOpen={sidebarOpen} 
            />
          </Link>
          <Link to="/history">
            <NavItem 
              icon={<History />} 
              label="History" 
              active={isActive('/history')} 
              isOpen={sidebarOpen} 
            />
          </Link>
          <Link to="/impact-rewards">
            <NavItem 
              icon={<Award />} 
              label="Impact Rewards" 
              active={isActive('/impact-rewards')} 
              isOpen={sidebarOpen} 
            />
          </Link>
          <Link to="/settings">
            <NavItem 
              icon={<Settings />} 
              label="Settings" 
              active={isActive('/settings')} 
              isOpen={sidebarOpen} 
            />
          </Link>
        </nav>

        <div className="p-4 border-t border-green-800">
          {isAuthenticated ? (
            <button onClick={logout} className="w-full text-left">
               <NavItem icon={<LogOut />} label="Logout" isOpen={sidebarOpen} />
            </button>
          ) : (
            <Link to="/login">
               <NavItem icon={<LogIn />} label="Login" isOpen={sidebarOpen} />
            </Link>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? 'md:ml-64' : 'md:ml-20'
        } p-8`}
      >
        {/* Top Header */}
        <header className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden"
            >
              <Menu />
            </Button>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Hi, {user ? user.name : 'Guest'}
              </h2>
              <p className="text-gray-500 text-sm">Welcome back to your eco-dashboard.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="rounded-full relative">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full border-2 border-white"></span>
            </Button>
            <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold">
              {user ? user.name.charAt(0).toUpperCase() : 'G'}
            </div>
          </div>
        </header>

        {children}
      </main>
      <Chatbot />
    </div>
  );
};

// Helper Components
const NavItem = ({ icon, label, active = false, isOpen }: { icon: ReactNode; label: string; active?: boolean; isOpen: boolean }) => (
  <div
    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
      active ? 'bg-green-800 text-white' : 'text-green-100 hover:bg-green-800/50'
    }`}
  >
    {icon}
    {isOpen && <span className="text-sm font-medium">{label}</span>}
  </div>
);

export default DashboardLayout;
