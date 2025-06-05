import React from 'react'
      import { motion } from 'framer-motion'
      import Button from '../atoms/Button'
      import Icon from '../atoms/Icon'
      import Text from '../atoms/Text'

      const MovieTitleDisplay = ({ movieTitle, guessedLetters, onHintClick }) => {
        const renderTitle = () => {
          if (!movieTitle) return null

          const title = movieTitle.toUpperCase()
          return title.split('').map((char, index) => {
            if (char === ' ') {
              return (
                <div key={index} className="w-4 h-12 sm:h-16 flex items-center justify-center">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                </div>
              )
            }
            
            const isGuessed = guessedLetters.includes(char) || !/[A-Z]/.test(char)
            
            return (
              <motion.div
                key={index}
                className={`w-10 h-12 sm:w-12 sm:h-16 border-2 border-secondary rounded-lg flex items-center justify-center mx-1 mb-2 ${
                  isGuessed ? 'bg-gradient-to-br from-accent to-secondary' : 'bg-white/10'
                }`}
                initial={{ rotateY: 0 }}
                animate={{ rotateY: isGuessed ? [0, 90, 0] : 0 }}
                transition={{ duration: 0.6 }}
              >
                <Text as="span" className={`text-lg sm:text-xl font-bold ${isGuessed ? 'text-white' : 'text-transparent'}`}>
                  {isGuessed ? char : '?'}
                </Text>
              </motion.div>
            )
          })
        }

        return (
          <>
            <div className="text-center mb-6">
              <Text as="h2" className="text-2xl sm:text-3xl font-heading font-bold text-white mb-2 text-shadow">
                Guess the Movie! 🎬
              </Text>
              <Text className="text-gray-300">Listen to the song and guess the Bollywood movie name</Text>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-1 mb-8 min-h-[80px]">
              {renderTitle()}
            </div>
            
            <div className="text-center mb-6">
              <div className="relative inline-block group">
                <Button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onHintClick}
                  className="bg-accent hover:bg-accent/80 text-white px-6 py-2 rounded-lg transition-all font-medium"
                >
                  <Icon name="Lightbulb" className="w-4 h-4 inline mr-2" />
                  Hint
                </Button>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-surface-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap">
                  Hints feature - Rolling out next update!
                </div>
              </div>
            </div>
          </>
        )
      }

      export default MovieTitleDisplay