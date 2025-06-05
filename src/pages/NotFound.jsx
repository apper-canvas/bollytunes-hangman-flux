import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
<motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "backOut" }}
          className="mb-8"
        >
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-bollywood">
            <ApperIcon name="Film" className="w-12 h-12 text-white" />
          </div>
          
          <motion.h1 
            className="text-6xl sm:text-7xl font-heading font-bold text-white mb-4 text-shadow"
            animate={{ rotate: [0, -2, 2, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            404
          </motion.h1>
          
          <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-white mb-4">
            Scene Not Found!
          </h2>
          
          <p className="text-gray-300 mb-8 text-lg">
            Looks like this page went off-script. Let's get you back to the main show!
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-bollywood"
          >
            <ApperIcon name="Home" className="w-5 h-5" />
            <span>Back to Game</span>
          </Link>
        </motion.div>

        {/* Animated elements */}
        <div className="absolute top-20 left-20 opacity-20 pointer-events-none">
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-4xl"
          >
            🎬
          </motion.div>
        </div>
        
        <div className="absolute bottom-20 right-20 opacity-20 pointer-events-none">
          <motion.div
            animate={{ x: [0, 20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-3xl"
          >
            🎭
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default NotFound