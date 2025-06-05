import React from 'react'
import { motion } from 'framer-motion'
import Button from '../atoms/Button'

const Keyboard = ({ gameState, onLetterGuess }) => {
  // QWERTY keyboard layout
  const keyboardRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ]

  const getLetterStatus = (letter) => {
    const isGuessed = gameState?.guessedLetters?.includes(letter)
    const isCorrect = gameState?.currentMovie?.title?.toUpperCase().includes(letter) && isGuessed
    const isWrong = isGuessed && !isCorrect
    
    return { isGuessed, isCorrect, isWrong }
  }

  const getLetterStyle = (letter) => {
    const { isGuessed, isCorrect, isWrong } = getLetterStatus(letter)
    
    if (isCorrect) {
      return 'bg-green-500 text-white shadow-glow border-green-400'
    } else if (isWrong) {
      return 'bg-red-500 text-white border-red-400'
    } else if (isGuessed) {
      return 'bg-gray-400 text-gray-600 cursor-not-allowed border-gray-500'
    } else {
      return 'bg-white/20 hover:bg-white/30 text-white hover:shadow-bollywood hover:scale-105 border-white/30'
    }
  }

  return (
    <div className="space-y-3">
      {keyboardRows.map((row, rowIndex) => (
        <div 
          key={rowIndex} 
          className={`flex justify-center gap-2 ${rowIndex === 1 ? 'px-6' : rowIndex === 2 ? 'px-12' : ''}`}
        >
          {row.map((letter, letterIndex) => {
            const { isGuessed } = getLetterStatus(letter)
            const totalIndex = rowIndex * 10 + letterIndex

            return (
              <motion.div
                key={letter}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  delay: totalIndex * 0.02,
                  type: "spring",
                  stiffness: 500,
                  damping: 30
                }}
                whileHover={{ scale: isGuessed ? 1 : 1.05 }}
                whileTap={{ scale: isGuessed ? 1 : 0.95 }}
              >
                <Button
                  onClick={() => onLetterGuess(letter)}
                  disabled={isGuessed || gameState?.gameStatus !== 'playing'}
                  className={`
                    w-12 h-12 sm:w-14 sm:h-14 text-lg font-bold rounded-lg 
                    transition-all duration-200 border-2
                    ${getLetterStyle(letter)}
                    ${isGuessed ? '' : 'hover:transform hover:rotate-3'}
                  `}
                >
                  {letter}
                </Button>
              </motion.div>
            )
          })}
        </div>
      ))}
      
      <div className="text-center mt-4">
        <p className="text-sm text-white/60">
          💡 Pro tip: You can also use your physical keyboard to make guesses!
        </p>
      </div>
    </div>
  )
}

export default Keyboard