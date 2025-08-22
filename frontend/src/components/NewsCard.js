import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ExternalLink } from 'lucide-react';

const NewsCard = ({ article, onClick, className = '' }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={`group cursor-pointer ${className}`}
      onClick={() => onClick(article)}
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
          {article.urlToImage ? (
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ExternalLink className="w-12 h-12 text-gray-400" />
            </div>
          )}
          
          {/* Source badge */}
          <div className="absolute top-3 left-3">
            <span className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
              {article.source}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 mb-3 leading-snug">
            {article.translatedTitle || article.title}
          </h3>
          
          {(article.translatedDescription || article.description) && (
            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3 leading-relaxed">
              {article.translatedDescription || article.description}
            </p>
          )}

          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(article.publishedAt)}</span>
            </div>
            
            {article.originalLanguage && article.originalLanguage !== 'en' && (
              <span className="bg-accent-50 dark:bg-accent-900/20 text-accent-600 dark:text-accent-400 px-2 py-1 rounded-full text-xs">
                Translated
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsCard;
