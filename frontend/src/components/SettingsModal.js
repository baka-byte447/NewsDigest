import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  Save,
  Globe,
  Clock,
  Newspaper,
  Palette,
  Moon,
  Sun
} from 'lucide-react';

const SettingsModal = ({ isOpen, onClose, preferences, onSave, darkMode, setDarkMode }) => {
  const [tempPreferences, setTempPreferences] = useState(preferences);

  const categories = [
    { id: 'technology', label: 'Technology', icon: '💻' },
    { id: 'science', label: 'Science', icon: '🔬' },
    { id: 'health', label: 'Health', icon: '🏥' },
    { id: 'sports', label: 'Sports', icon: '⚽' },
    { id: 'business', label: 'Business', icon: '📈' },
    { id: 'entertainment', label: 'Entertainment', icon: '🎬' },
    { id: 'politics', label: 'Politics', icon: '🏛️' },
    { id: 'general', label: 'General', icon: '📰' }
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'zh', name: 'Chinese' }
  ];

  const frequencies = [
    { id: 'hourly', label: 'Hourly' },
    { id: 'daily', label: 'Daily' },
    { id: 'weekly', label: 'Weekly' }
  ];

  const handleCategoryToggle = (categoryId) => {
    setTempPreferences(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId]
    }));
  };

  const handleSave = () => {
    onSave({ ...tempPreferences, theme: darkMode ? 'dark' : 'light' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-2xl max-h-[90vh] mx-4 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Settings
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto space-y-8">
          {/* Theme */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Palette className="w-5 h-5 text-primary-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Appearance
              </h3>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setDarkMode(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${
                  !darkMode
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <Sun className="w-5 h-5" />
                <span className="font-medium">Light</span>
              </button>
              
              <button
                onClick={() => setDarkMode(true)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${
                  darkMode
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <Moon className="w-5 h-5" />
                <span className="font-medium">Dark</span>
              </button>
            </div>
          </div>

          {/* Categories */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Newspaper className="w-5 h-5 text-primary-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Categories
              </h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryToggle(category.id)}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${
                    tempPreferences.categories.includes(category.id)
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{category.icon}</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {category.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Language */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-5 h-5 text-primary-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Language
              </h3>
            </div>
            
            <select
              value={tempPreferences.language}
              onChange={(e) => setTempPreferences(prev => ({ ...prev, language: e.target.value }))}
              className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          {/* Update Frequency */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-5 h-5 text-primary-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Update Frequency
              </h3>
            </div>
            
            <div className="space-y-2">
              {frequencies.map((freq) => (
                <button
                  key={freq.id}
                  onClick={() => setTempPreferences(prev => ({ ...prev, updateFrequency: freq.id }))}
                  className={`w-full p-3 rounded-xl text-left transition-all ${
                    tempPreferences.updateFrequency === freq.id
                      ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 border-2 border-primary-500'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800 border-2 border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <span className="font-medium">{freq.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Cancel
          </button>
          
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default SettingsModal;