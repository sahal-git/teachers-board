import React from 'react';
import { Link } from 'react-router-dom';
import Button from './ui/Button';
import { useAuth } from '../contexts/AuthContext';
import { BookOpen, Users, LogOut, LogIn, Search } from 'lucide-react';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <BookOpen size={28} className="text-purple-600 mr-2" />
              <span className="text-xl font-bold text-gray-800">
                Teacher Profiles
              </span>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-4 items-center">
            <Link 
              to="/" 
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50"
            >
              Home
            </Link>
            <Link 
              to="/teachers" 
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50"
            >
              Teachers
            </Link>
            <Link 
              to="/search" 
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50"
            >
              Advanced Search
            </Link>
          </nav>
          
          <div className="flex items-center">
            {isAuthenticated ? (
              <>
                <Link to="/admin">
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={<Users size={16} />}
                    className="mr-2"
                  >
                    Admin
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  icon={<LogOut size={16} />}
                  onClick={logout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button
                  variant="outline"
                  size="sm"
                  icon={<LogIn size={16} />}
                >
                  Admin Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;