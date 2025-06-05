import React, { useState, useEffect } from 'react'
      import { motion } from 'framer-motion'
      import { toast } from 'react-toastify'
      import AudioPlayer from './AudioPlayer'
      import GameBoard from './GameBoard'
      import Keyboard from '../molecules/Keyboard'
      import GameControls from './GameControls'
      import { VictoryModal, DefeatModal } from './Modals'
      import { gameService } from '../../services'

      const FeatureSection = () => {
        const [gameState, setGameState] = useState(null)
        const [loading, setLoading] = useState(true)
        const [error, setError] = useState(null)
        const [isPlaying, setIsPlaying] = useState(false)
        const [showHint, setShowHint] = useState(false)
        const [showVictory, setShowVictory] = useState(false)
        const [showDefeat, setShowDefeat] = useState(false)

        useEffect(() => {
          startNewGame()
        }, [])

        const startNewGame = async () => {
          setLoading(true)
          setError(null)
          try {
            const newGame = await gameService.startNewGame()
            setGameState(newGame)
            setShowVictory(false)
            setShowDefeat(false)
            setIsPlaying(false)
          } catch (err) {
            setError(err.message)
            toast.error("Failed to start new game")
          } finally {
            setLoading(false)
          }
        }

        const handleLetterGuess = async (letter) => {
          if (!gameState || gameState.guessedLetters.includes(letter) || gameState.gameStatus !== 'playing') {
            return
          }

          try {
            const updatedGame = await gameService.guessLetter(gameState.id, letter)
            setGameState(updatedGame)

            const isCorrect = updatedGame.currentMovie.title.toUpperCase().includes(letter)
            
            if (isCorrect) {
              toast.success(`Great! "${letter}" is in the movie!`, {
                icon: '⭐'
              })
              
              if (updatedGame.gameStatus === 'won') {
                setShowVictory(true)
                toast.success("🎉 Incredible! You guessed the movie!")
              }
            } else {
              toast.error(`Oops! "${letter}" is not in the movie`, {
                icon: '💔'
              })
              
              if (updatedGame.gameStatus === 'lost') {
                setShowDefeat(true)
                toast.error(`Game Over! The movie was "${updatedGame.currentMovie.title}"`)
              }
            }
          } catch (err) {
            toast.error("Failed to make guess")
          }
        }

        const handleHintClick = () => {
          setShowHint(!showHint)
          // Implement hint logic here when it's ready
        }

        if (loading) {
          return (
            <div className="flex items-center justify-center min-h-[60vh]">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
              />
            </div>
          )
        }

        if (error) {
          return (
            <div className="text-center py-12">
              <div className="text-red-400 text-xl mb-4">{error}</div>
              <button
                onClick={startNewGame}
                className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-lg hover:shadow-bollywood transition-all"
              >
                Try Again
              </button>
            </div>
          )
        }

        return (
          <div className="max-w-6xl mx-auto py-8">
            <AudioPlayer 
              songFile={gameState?.currentMovie?.songFile} 
              isPlaying={isPlaying} 
              setIsPlaying={setIsPlaying} 
            />
            <GameBoard 
              gameState={gameState} 
              onHintClick={handleHintClick} 
            />
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-bollywood mb-8"
            >
              <h3 className="text-xl font-heading font-bold text-white mb-6 text-center text-shadow">
                Choose Your Letters
              </h3>
              <Keyboard 
                gameState={gameState} 
                onLetterGuess={handleLetterGuess} 
              />
            </motion.div>
            <GameControls 
              gameState={gameState} 
              onNewGame={startNewGame} 
            />

            <VictoryModal 
              show={showVictory} 
              onPlayAgain={startNewGame} 
              movieTitle={gameState?.currentMovie?.title} 
            />
            <DefeatModal 
              show={showDefeat} 
              onTryAgain={startNewGame} 
              movieTitle={gameState?.currentMovie?.title} 
            />
          </div>
        )
      }

      export default FeatureSection