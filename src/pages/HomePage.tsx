import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Users, Search, UserPlus, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-700 to-indigo-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Teacher Profile Management System
                </h1>
                <p className="text-lg mb-8 text-purple-100">
                  A comprehensive platform to manage and showcase teacher profiles,
                  including their skills, language proficiency, and interests.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/teachers">
                    <Button
                      variant="primary"
                      size="lg"
                      className="bg-white text-purple-700 hover:bg-gray-100"
                      icon={<Users size={20} />}
                    >
                      View Teachers
                    </Button>
                  </Link>
                  {isAuthenticated && (
                    <Link to="/admin">
                      <Button
                        variant="outline"
                        size="lg"
                        className="border-white text-white hover:bg-white hover:text-purple-700"
                        icon={<Settings size={20} />}
                      >
                        Admin Panel
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
              <div className="hidden md:block">
                <div className="relative">
                  <div className="absolute -top-10 -right-10 w-72 h-72 bg-white opacity-10 rounded-full"></div>
                  <div className="absolute bottom-10 left-10 w-40 h-40 bg-purple-400 opacity-20 rounded-full"></div>
                  <div className="relative z-10 bg-white p-8 rounded-lg shadow-xl">
                    <div className="grid grid-cols-2 gap-6">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-purple-50 p-4 rounded-lg">
                          <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full mb-3"></div>
                          <div className="h-4 bg-purple-200 rounded mb-2"></div>
                          <div className="h-3 bg-purple-100 rounded w-3/4"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-800">Key Features</h2>
              <p className="mt-4 text-xl text-gray-600">
                Everything you need to manage teacher profiles efficiently
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                  <Users size={24} className="text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Comprehensive Profiles</h3>
                <p className="text-gray-600">
                  Detailed teacher profiles with language proficiency, skills, hobbies, and interests
                  displayed in an intuitive interface.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                  <Search size={24} className="text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Advanced Search & Filtering</h3>
                <p className="text-gray-600">
                  Powerful search capabilities to filter teachers by name, skills, language
                  proficiency, and other attributes.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                  <UserPlus size={24} className="text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Admin Management</h3>
                <p className="text-gray-600">
                  Secure admin panel to add, edit, or remove teacher profiles with validation
                  and auto-save functionality.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl shadow-xl overflow-hidden">
              <div className="px-6 py-12 sm:px-12 lg:py-16 lg:px-16 lg:flex lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                    <span className="block">Ready to get started?</span>
                    <span className="block text-purple-200">Explore our teacher database today.</span>
                  </h2>
                  <p className="mt-4 text-lg text-purple-100">
                    Find teachers with the right skills and language proficiency for your needs.
                  </p>
                </div>
                <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                  <div className="inline-flex rounded-md shadow">
                    <Link to="/teachers">
                      <Button
                        variant="primary"
                        size="lg"
                        className="bg-white text-purple-700 hover:bg-gray-100"
                      >
                        View All Teachers
                      </Button>
                    </Link>
                  </div>
                  <div className="ml-3 inline-flex rounded-md shadow">
                    <Link to="/search">
                      <Button
                        variant="outline"
                        size="lg"
                        className="border-white text-white hover:bg-white hover:text-purple-700"
                        icon={<Search size={18} />}
                      >
                        Advanced Search
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;