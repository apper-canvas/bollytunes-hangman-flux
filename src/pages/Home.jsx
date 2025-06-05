import React from 'react'
import { motion } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

const Home = () => {
  return (
    <div className="min-h-screen relative">
      {/* Navigation Bar */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 px-4 sm:px-6 lg:px-8 py-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-bollywood">
                <ApperIcon name="Music" className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-heading font-bold text-white text-shadow">
                  BollyTunes
                </h1>
                <p className="text-xs sm:text-sm text-gray-300">Hangman</p>
              </div>
            </motion.div>

            {/* Navigation Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-white hover:text-secondary transition-colors font-medium">
                Home
              </a>
              <div className="relative group">
                <button className="text-gray-300 hover:text-white transition-colors font-medium flex items-center space-x-1">
                  <span>Difficulty</span>
                  <ApperIcon name="ChevronDown" className="w-4 h-4" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-surface-800/90 backdrop-blur-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-primary/20">
                  <div className="p-4 text-center text-gray-300 text-sm">
                    Choose your challenge<br />
                    <span className="text-secondary font-medium">Coming Soon!</span>
                  </div>
                </div>
              </div>
              <div className="relative group">
                <button className="text-gray-300 hover:text-white transition-colors font-medium flex items-center space-x-1">
                  <span>Leaderboard</span>
                  <ApperIcon name="Trophy" className="w-4 h-4" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-surface-800/90 backdrop-blur-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-primary/20">
                  <div className="p-4 text-center text-gray-300 text-sm">
                    Track your stardom<br />
                    <span className="text-secondary font-medium">Launching Soon!</span>
                  </div>
                </div>
              </div>
              <div className="relative group">
                <button className="text-gray-300 hover:text-white transition-colors font-medium flex items-center space-x-1">
                  <span>Achievements</span>
                  <ApperIcon name="Award" className="w-4 h-4" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-surface-800/90 backdrop-blur-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-primary/20">
                  <div className="p-4 text-center text-gray-300 text-sm">
                    Collect badges<br />
                    <span className="text-secondary font-medium">In Development!</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Settings */}
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors backdrop-blur-sm border border-white/20"
                >
                  <ApperIcon name="Settings" className="w-5 h-5 text-white" />
                </motion.button>
                <div className="absolute top-full right-0 mt-2 w-64 bg-surface-800/90 backdrop-blur-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-primary/20 z-50">
                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm">Sound Effects</span>
                      <span className="text-secondary text-xs">Coming Soon!</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm">Themes</span>
                      <span className="text-secondary text-xs">In Production!</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm">Languages</span>
                      <span className="text-secondary text-xs">Planned!</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors backdrop-blur-sm border border-white/20"
                >
                  <ApperIcon name="Menu" className="w-5 h-5 text-white" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main Game Area */}
      <main className="relative z-10 px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <MainFeature />
        </div>
      </main>

      {/* Decorative Film Reels */}
      <div className="absolute top-20 left-4 opacity-10 pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-secondary rounded-full relative"
        >
          <div className="absolute inset-2 border-2 border-secondary rounded-full"></div>
          <div className="absolute inset-4 bg-secondary rounded-full"></div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-20 right-4 opacity-10 pointer-events-none">
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 border-4 border-primary rounded-full relative"
        >
          <div className="absolute inset-2 border-2 border-primary rounded-full"></div>
          <div className="absolute inset-4 bg-primary rounded-full"></div>
        </motion.div>
      </div>
    </div>
  )
}

export default Home