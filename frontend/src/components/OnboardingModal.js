import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Check,
  Globe,
  Clock,
  Newspaper
} from 'lucide-react';

const OnboardingModal = ({ isOpen, onClose, onComplete, initialPreferences }) => {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState(initialPreferences || {
    categories: [],
    language: 'en',
    updateFrequency: 'daily'
  });

  const categories = [
    { id: 'technology', label: 'Technology', icon: '💻', desc: 'Latest tech news and innovations' },
    { id: 'science', label: 'Science', icon: '🔬', desc: 'Scientific discoveries and research' },
    { id: 'health', label: 'Health', icon: '🏥', desc: 'Health and medical news' },
    { id: 'sports', label: 'Sports', icon: '⚽', desc: 'Sports updates and scores' },
    { id: 'business', label: 'Business', icon: '📈', desc: 'Business and finance news' },
    { id: 'entertainment', label: 'Entertainment', icon: '🎬', desc: 'Movies, music, and celebrity news' },
    { id: 'politics', label: 'Politics', icon: '🏛️', desc: 'Political news and updates' },
    { id: 'general', label: 'General', icon: '📰', desc: 'General news and current events' }
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
    { id: 'hourly', label: 'Hourly', desc: 'Get updates every hour' },
    { id: 'daily', label: 'Daily', desc: 'Perfect for daily catch-up' },
    { id: 'weekly', label: 'Weekly', desc: 'Weekly digest of top stories' }
  ];

  const handleCategoryToggle = (categoryId) => {
    setPreferences(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId]
    }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete(preferences);
      onClose();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1: return preferences.categories.length > 0;
      case 2: return preferences.language;
      case 3: return preferences.updateFrequency;
      default: return true;
    }
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
        className="relative w-full max-w-2xl mx-4 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="relative p-6 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
              <Newspaper className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Welcome to NewsDigest
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Let's customize your news experience
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`flex-1 h-1 rounded-full transition-colors ${
                  i <= step ? 'bg-primary-500' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          <AnimatePresence mode="wait">
            {/* Step 1: Categories */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="space-y-4"
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    What interests you?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Select the categories you'd like to follow
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {categories.map((category) => (
                    <motion.button
                      key={category.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleCategoryToggle(category.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        preferences.categories.includes(category.id)
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{category.icon}</span>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {category.label}
                            </h4>
                            {preferences.categories.includes(category.id) && (
                              <Check className="w-5 h-5 text-primary-500" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {category.desc}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Language */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="space-y-4"
              >
                <div className="text-center mb-6">
                  <Globe className="w-12 h-12 text-primary-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Choose your language
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Articles will be translated to your preferred language
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setPreferences(prev => ({ ...prev, language: lang.code }))}
                      className={`p-3 rounded-lg text-left transition-all ${
                        preferences.language === lang.code
                          ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 border-2 border-primary-500'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800 border-2 border-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{lang.name}</span>
                        {preferences.language === lang.code && (
                          <Check className="w-5 h-5 text-primary-500" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Frequency */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="space-y-4"
              >
                <div className="text-center mb-6">
                  <Clock className="w-12 h-12 text-primary-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    How often do you want updates?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Choose your preferred update frequency
                  </p>
                </div>

                <div className="space-y-3">
                  {frequencies.map((freq) => (
                    <button
                      key={freq.id}
                      onClick={() => setPreferences(prev => ({ ...prev, updateFrequency: freq.id }))}
                      className={`w-full p-4 rounded-xl text-left transition-all ${
                        preferences.updateFrequency === freq.id
                          ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 border-2 border-primary-500'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800 border-2 border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {freq.label}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {freq.desc}
                          </p>
                        </div>
                        {preferences.updateFrequency === freq.id && (
                          <Check className="w-5 h-5 text-primary-500" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-between">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>

          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            Step {step} of 3
          </div>

          <button
            onClick={handleNext}
            disabled={!isStepValid()}
            className="flex items-center gap-2 px-6 py-2 bg-primary-500 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
          >
            {step === 3 ? 'Get Started' : 'Next'}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default OnboardingModal;