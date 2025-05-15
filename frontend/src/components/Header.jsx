import { useState } from 'react';
import { 
  FiUser, 
  FiSettings, 
  FiLogOut, 
  FiMenu, 
  FiX
} from 'react-icons/fi';

function Header({ user }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-primary-600 font-bold text-xl">Fitness Tracker</span>
            </div>
            <nav className="hidden md:ml-8 md:flex md:space-x-8">
              <a 
                href="#" 
                className="text-primary-600 font-medium border-b-2 border-primary-500 px-1 pb-2 pt-4"
              >
                Dashboard
              </a>
              <a 
                href="#" 
                className="text-gray-500 hover:text-gray-700 font-medium px-1 pb-2 pt-4 hover:border-b-2 hover:border-gray-300"
              >
                Meals
              </a>
              <a 
                href="#" 
                className="text-gray-500 hover:text-gray-700 font-medium px-1 pb-2 pt-4 hover:border-b-2 hover:border-gray-300"
              >
                Goals
              </a>
              <a 
                href="#" 
                className="text-gray-500 hover:text-gray-700 font-medium px-1 pb-2 pt-4 hover:border-b-2 hover:border-gray-300"
              >
                Reports
              </a>
            </nav>
          </div>
          <div className="hidden md:flex items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="flex-shrink-0">
                  <img 
                    className="h-8 w-8 rounded-full object-cover" 
                    src={user.avatar} 
                    alt={user.name} 
                  />
                </div>
                <div className="text-sm font-medium text-gray-700">{user.name}</div>
              </div>
              <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100">
                <FiSettings className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100">
                <FiLogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="flex md:hidden items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden py-2 border-t border-gray-200">
          <div className="px-4 space-y-1">
            <a 
              href="#" 
              className="block py-2 px-3 text-primary-600 font-medium bg-primary-50 rounded-md"
            >
              Dashboard
            </a>
            <a 
              href="#" 
              className="block py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-md"
            >
              Meals
            </a>
            <a 
              href="#" 
              className="block py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-md"
            >
              Goals
            </a>
            <a 
              href="#" 
              className="block py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-md"
            >
              Reports
            </a>
          </div>
          <div className="mt-3 border-t border-gray-200 pt-3">
            <div className="px-4 flex items-center">
              <div className="flex-shrink-0">
                <img 
                  className="h-10 w-10 rounded-full object-cover" 
                  src={user.avatar} 
                  alt={user.name} 
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">{user.name}</div>
              </div>
            </div>
            <div className="mt-3 px-4 space-y-1">
              <a 
                href="#" 
                className="block py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-md flex items-center"
              >
                <FiUser className="mr-3 h-5 w-5 text-gray-500" />
                Your Profile
              </a>
              <a 
                href="#" 
                className="block py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-md flex items-center"
              >
                <FiSettings className="mr-3 h-5 w-5 text-gray-500" />
                Settings
              </a>
              <a 
                href="#" 
                className="block py-2 px-3 text-gray-700 hover:bg-gray-50 rounded-md flex items-center"
              >
                <FiLogOut className="mr-3 h-5 w-5 text-gray-500" />
                Sign out
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;