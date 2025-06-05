import React from 'react'
      import Text from '../atoms/Text'
      import Icon from '../atoms/Icon'
      import { motion } from 'framer-motion'

      const GameStatusDisplay = ({ score, wrongAttempts }) => {
        return (
          <div className="flex items-center space-x-6 mb-4 sm:mb-0">
            <div className="text-center">
              <Text className="text-2xl font-bold text-white">{score || 0}</Text>
              <Text className="text-gray-300 text-sm">Score</Text>
            </div>
            <div className="text-center">
              <Text className="text-2xl font-bold text-white">{wrongAttempts || 0}/5</Text>
              <Text className="text-gray-300 text-sm">Wrong</Text>
            </div>
            <div className="text-center relative group">
              <Text className="text-2xl font-bold text-white">--:--</Text>
              <Text className="text-gray-300 text-sm">Timer</Text>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-surface-800 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap">
                Timed mode coming soon!
              </div>
            </div>
          </div>
        )
      }

      const HeartsDisplay = ({ wrongAttempts }) => {
        return (
          <div className="flex justify-center space-x-2 mb-6">
            {[...Array(5)].map((_, index) => (
              <motion.div
                key={index}
                className={`text-2xl ${
                  index < (wrongAttempts || 0) ? 'grayscale' : ''
                }`}
                animate={index < (wrongAttempts || 0) ? { scale: [1, 0.8, 1] } : {}}
                transition={{ duration: 0.5 }}
              >
                {index < (wrongAttempts || 0) ? '💔' : '❤️'}
              </motion.div>
            ))}
          </div>
        )
      }

      export { GameStatusDisplay, HeartsDisplay }