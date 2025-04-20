import React from 'react';
import { BookOpen, Heart, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center">
              <BookOpen size={24} className="text-purple-400 mr-2" />
              <span className="text-xl font-bold">Teacher Profiles</span>
            </div>
            <p className="mt-4 text-gray-300 text-sm">
              A comprehensive platform for managing and showcasing teacher profiles,
              their skills, languages, and interests.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/teachers" className="text-gray-300 hover:text-white transition-colors">
                  All Teachers
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-gray-300 hover:text-white transition-colors">
                  Advanced Search
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <p className="text-gray-300 text-sm mb-4">
              Our teacher profile system helps educational institutions manage
              their staff information efficiently, with powerful search and filtering
              capabilities.
            </p>
            <div className="flex items-center text-gray-300 text-sm">
              <Heart size={14} className="text-red-400 mr-1" />
              <span>Made with love in 2025</span>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            &copy; {new Date().getFullYear()} Teacher Profiles. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Github"
            >
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;