import React from 'react'
      import { motion } from 'framer-motion'
      import MovieTitleDisplay from '../molecules/MovieTitleDisplay'
      import HangmanStage from '../molecules/HangmanStage'
      import { HeartsDisplay } from '../molecules/GameStatusDisplay'

      const GameBoard = ({ gameState, onHintClick }) => {
        return (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
            <motion.div 
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="lg:col-span-3 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-bollywood"
            >
              <MovieTitleDisplay 
                movieTitle={gameState?.currentMovie?.title} 
                guessedLetters={gameState?.guessedLetters || []} 
                onHintClick={onHintClick} 
              />
            </motion.div>

            <motion.div 
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-bollywood"
            >
              <h3 className="text-xl font-heading font-bold text-white mb-4 text-center text-shadow">
                Lives Remaining
              </h3>
              <HeartsDisplay wrongAttempts={gameState?.wrongAttempts} />
              <HangmanStage wrongAttempts={gameState?.wrongAttempts} />
            </motion.div>
          </div>
        )
      }

      export default GameBoard