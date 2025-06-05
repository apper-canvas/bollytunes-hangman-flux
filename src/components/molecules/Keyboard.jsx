import React from 'react'
      import { motion } from 'framer-motion'
      import Button from '../atoms/Button'

      const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

      const Keyboard = ({ gameState, onLetterGuess }) => {
        return (
          <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2 max-w-4xl mx-auto">
            {ALPHABET.map((letter) => {
              const isGuessed = gameState?.guessedLetters.includes(letter)
              const isCorrect = gameState?.currentMovie?.title.toUpperCase().includes(letter)
              const isDisabled = isGuessed || gameState?.gameStatus !== 'playing'
              
              return (
                <Button
                  key={letter}
                  onClick={() => onLetterGuess(letter)}
                  disabled={isDisabled}
                  className={`
                    h-10 sm:h-12 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 transform
                    ${isDisabled 
                      ? isCorrect 
                        ? 'bg-green-500 text-white scale-105 shadow-glow' 
                        : 'bg-red-500 text-white opacity-50 line-through'
                      : 'bg-gradient-to-br from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white hover:scale-105 shadow-card'
                    }
                    ${!isDisabled ? 'hover:shadow-bollywood active:scale-95' : ''}
                  `}
                  whileHover={!isDisabled ? { scale: 1.05 } : {}}
                  whileTap={!isDisabled ? { scale: 0.95 } : {}}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: ALPHABET.indexOf(letter) * 0.02 }}
                >
                  {letter}
                </Button>
              )
            })}
          </div>
        )
      }

      export default Keyboard