import React from 'react'
      import { motion } from 'framer-motion'
      import Icon from '../atoms/Icon'
      import Text from '../atoms/Text'

      const AppLogo = ({ className = '' }) => {
        return (
          <motion.div 
            className={`flex items-center space-x-3 ${className}`}
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-bollywood">
              <Icon name="Music" className="w-7 h-7 text-white" />
            </div>
            <div>
              <Text as="h1" className="text-xl sm:text-2xl font-heading font-bold text-white text-shadow">
                BollyTunes
              </Text>
              <Text className="text-xs sm:text-sm text-gray-300">Hangman</Text>
            </div>
          </motion.div>
        )
      }

      export default AppLogo