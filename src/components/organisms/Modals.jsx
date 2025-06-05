import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Sparkles, RotateCcw, X, Play, Star } from 'lucide-react'
import Button from '../atoms/Button'

export const VictoryModal = ({ show, onPlayAgain, onNextRound, movieTitle, score, totalScore, round }) => {
  if (!show) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.5, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.5, y: 50 }}
          className="bg-gradient-to-br from-yellow-400/20 to-orange-500/20 backdrop-blur-md rounded-3xl p-8 max-w-md w-full border border-yellow-400/30 shadow-bollywood"
        >
          <div className="text-center">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="inline-block mb-6"
            >
              <Trophy className="w-20 h-20 text-yellow-400 mx-auto" />
            </motion.div>
            
            <h2 className="text-3xl font-heading font-bold text-white mb-4 text-shadow">
              🎉 Congratulations! 🎉
            </h2>
            
            <p className="text-white/90 text-lg mb-2">
              You correctly guessed:
            </p>
            
            <p className="text-2xl font-bold text-yellow-400 mb-4 text-shadow">
              "{movieTitle}"
            </p>

            {/* Score Display */}
            <div className="bg-white/10 rounded-xl p-4 mb-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-accent">{score}</div>
                  <div className="text-xs text-white/70">Round Score</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-400">{totalScore}</div>
                  <div className="text-xs text-white/70">Total Score</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">{round}</div>
                  <div className="text-xs text-white/70">Round</div>
                </div>
              </div>
            </div>
            
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex justify-center mb-6"
            >
              <Sparkles className="w-8 h-8 text-accent mr-2" />
              <span className="text-xl text-accent font-bold">Bollywood Master!</span>
              <Sparkles className="w-8 h-8 text-accent ml-2" />
            </motion.div>
            
            <div className="space-y-3">
              <Button
                onClick={onNextRound}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-bollywood transition-all"
              >
                <Play className="w-5 h-5 mr-2" />
                Next Round
              </Button>
              
              <Button
                onClick={onPlayAgain}
                className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-xl font-bold hover:shadow-bollywood transition-all"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                New Game
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export const DefeatModal = ({ show, onTryAgain, movieTitle, totalScore }) => {
  if (!show) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.5, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.5, y: 50 }}
          className="bg-gradient-to-br from-red-500/20 to-pink-500/20 backdrop-blur-md rounded-3xl p-8 max-w-md w-full border border-red-400/30 shadow-bollywood"
        >
          <div className="text-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-6xl mb-6"
            >
              💔
            </motion.div>
            
            <h2 className="text-3xl font-heading font-bold text-white mb-4 text-shadow">
              Game Over
            </h2>
            
            <p className="text-white/90 text-lg mb-2">
              The movie was:
            </p>
            
            <p className="text-2xl font-bold text-red-400 mb-4 text-shadow">
              "{movieTitle}"
            </p>

            {/* Final Score Display */}
            <div className="bg-white/10 rounded-xl p-4 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-1">{totalScore}</div>
                <div className="text-sm text-white/70">Final Score</div>
              </div>
            </div>
            
            <p className="text-white/70 mb-6">
              Don't worry! Even the best Bollywood fans need a few tries. 
              Try again and show your movie knowledge!
            </p>
            
            <Button
              onClick={onTryAgain}
              className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-xl font-bold text-lg hover:shadow-bollywood transition-all"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Try Again
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export const HintModal = ({ show, onClose, hints }) => {
  if (!show) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.5, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.5, y: 50 }}
          className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-md rounded-3xl p-8 max-w-md w-full border border-blue-400/30 shadow-bollywood"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-heading font-bold text-white text-shadow">
              💡 Hints
            </h2>
            <Button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </Button>
          </div>
          
          <div className="space-y-4">
            {hints && hints.map((hint, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/10 rounded-xl p-4 border border-white/20"
              >
                <div className="flex items-start space-x-3">
                  <Star className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <p className="text-white/90 text-sm leading-relaxed">{hint}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}