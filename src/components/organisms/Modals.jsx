import React from 'react'
      import { motion, AnimatePresence } from 'framer-motion'
      import Button from '../atoms/Button'
      import Text from '../atoms/Text'

      const Modal = ({ show, onDismiss, title, message, buttonText, icon, colorClass, borderClass }) => {
        return (
          <AnimatePresence>
            {show && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  className={`${colorClass} rounded-2xl p-8 text-center max-w-md w-full border ${borderClass} shadow-2xl`}
                >
                  <div className="text-6xl mb-4">{icon}</div>
                  <Text as="h2" className="text-3xl font-heading font-bold text-white mb-4">{title}</Text>
                  <Text className="text-white/90 mb-6">{message}</Text>
                  <Button
                    onClick={onDismiss}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-xl transition-all"
                  >
                    {buttonText}
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        )
      }

      export const VictoryModal = ({ show, onPlayAgain, movieTitle }) => (
        <Modal
          show={show}
          onDismiss={onPlayAgain}
          title="Fantastic!"
          message={`You correctly guessed "${movieTitle}"!`}
          buttonText="Play Again"
          icon="🎉"
          colorClass="bg-gradient-to-br from-green-500 to-emerald-600"
          borderClass="border-green-400/50"
        />
      )

      export const DefeatModal = ({ show, onTryAgain, movieTitle }) => (
        <Modal
          show={show}
          onDismiss={onTryAgain}
          title="Game Over!"
          message={`The correct answer was "${movieTitle}"`}
          buttonText="Try Again"
          icon="💀"
          colorClass="bg-gradient-to-br from-red-500 to-rose-600"
          borderClass="border-red-400/50"
        />
      )