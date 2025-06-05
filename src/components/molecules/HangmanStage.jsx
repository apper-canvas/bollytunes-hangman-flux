import React from 'react'
      import { motion } from 'framer-motion'
      import Text from '../atoms/Text'

      const HANGMAN_STAGES = [
        { emoji: '🎭', description: 'Empty stage with curtains' },
        { emoji: '🎪🪢', description: 'Rope appears with spotlight' },
        { emoji: '🎪🪢🪑', description: 'Platform appears' },
        { emoji: '🎪🪢🪑🕴️', description: 'Stick figure appears' },
        { emoji: '🎪🪢🪑💀', description: 'Game over - dramatic end!' }
      ]

      const HangmanStage = ({ wrongAttempts }) => {
        const stageIndex = wrongAttempts || 0
        const stage = HANGMAN_STAGES[stageIndex]

        return (
          <div className="text-center">
            <motion.div
              className="text-6xl mb-4"
              key={stageIndex}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, ease: "back.out" }}
            >
              {stage?.emoji}
            </motion.div>
            <Text className="text-gray-300 text-sm">
              {stage?.description}
            </Text>
          </div>
        )
      }

      export default HangmanStage