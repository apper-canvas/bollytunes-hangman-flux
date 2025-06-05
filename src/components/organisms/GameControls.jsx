import React from 'react'
      import { motion } from 'framer-motion'
      import Button from '../atoms/Button'
      import Icon from '../atoms/Icon'
      import { GameStatusDisplay } from '../molecules/GameStatusDisplay'

      const GameControls = ({ gameState, onNewGame }) => {
        return (
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col sm:flex-row items-center justify-between bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-bollywood"
          >
            <GameStatusDisplay 
              score={gameState?.score} 
              wrongAttempts={gameState?.wrongAttempts} 
            />
            
            <Button
              onClick={onNewGame}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white font-semibold py-3 px-8 rounded-xl transition-all shadow-bollywood"
            >
              <Icon name="RefreshCw" className="w-5 h-5 inline mr-2" />
              New Game
            </Button>
          </motion.div>
        )
      }

      export default GameControls