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
        <div className="mb-4">
          <div className="flex flex-wrap justify-between items-center mb-3">
            <div className="text-sm text-white/70">
              Round {gameState?.round || 1} • Difficulty: {gameState?.difficulty || 'medium'}
            </div>
            <div className="text-sm text-accent font-bold">
              Score: {gameState?.score || 0} | Total: {gameState?.totalScore || 0}
            </div>
          </div>
        </div>
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
        
        {/* Game Statistics */}
        <div className="mt-6 pt-4 border-t border-white/20">
          <h4 className="text-sm font-semibold text-white mb-3 text-center">Game Stats</h4>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-white/70">
              <span>Current Streak:</span>
              <span className="text-accent font-bold">{gameState?.stats?.currentStreak || 0}</span>
            </div>
            <div className="flex justify-between text-white/70">
              <span>Best Streak:</span>
              <span className="text-yellow-400 font-bold">{gameState?.stats?.bestStreak || 0}</span>
            </div>
            <div className="flex justify-between text-white/70">
              <span>Movies Guessed:</span>
              <span className="text-green-400 font-bold">{gameState?.stats?.moviesGuessed || 0}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

      export default GameBoard