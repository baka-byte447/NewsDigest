import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Moon, 
  Sun, 
  Settings, 
  User, 
  LogOut, 
  Flame,
  BookOpen,
  Menu,
  X
} from 'lucide-react';
import { getReadingStreak, getDailyReads } from '../utils/storage';

const Navbar = ({ 
  darkMode, 
  setDarkMode, 
  user, 
  onSettingsClick, 
  onLogout,
  categories,
  activeCategory,
  onCategoryChange 
}) => {
  const [streak, setStreak] = useState({ streak: 0 });
  const [dailyReads, setDailyReads] = useState({ count: 0 });
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    setStreak(getReadingStreak());
    setDailyReads(getDailyReads());
  }, []);

  const categoryLabels = {
    general: 'General',
    technology: 'Technology',
    science: 'Science',
    health: 'Health',
    sports: 'Sports',
    business: 'Business',
    entertainment: 'Entertainment',
    politics: 'Politics'
  };

  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                NewsDigest
              </h1>
            </div>

            {/* Desktop Categories */}
            <div className="hidden lg:flex items-center gap-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => onCategoryChange(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeCategory === category
                      ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {categoryLabels[category]}
                </button>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              {/* Reading Stats */}
              {user && (
                <div className="hidden sm:flex items-center gap-4 mr-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Flame className="w-4 h-4 text-orange-500" />
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {streak.streak}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">streak</span>
                  </div>
                  <div className="w-px h-4 bg-gray-300 dark:bg-gray-600" />
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {dailyReads.count}
                    </span> read today
                  </div>
                </div>
              )}

              {/* Theme Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="lg:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {showMobileMenu ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>

              {/* User Menu */}
              {user && (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    {user.picture ? (
                      <img
                        src={user.picture}
                        alt={user.name}
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </button>

                  {/* User Dropdown */}
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2"
                    >
                      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {user.email}
                        </p>
                      </div>
                      
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          onSettingsClick();
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </button>
                      
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          onLogout();
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700"
        >
          <div className="max-w-7xl mx-auto px-4 py-4">
            {/* Mobile Categories */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    onCategoryChange(category);
                    setShowMobileMenu(false);
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeCategory === category
                      ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {categoryLabels[category]}
                </button>
              ))}
            </div>

            {/* Mobile Stats */}
            {user && (
              <div className="flex items-center justify-center gap-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 text-sm">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {streak.streak}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">streak</span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {dailyReads.count}
                  </span> read today
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Navbar;