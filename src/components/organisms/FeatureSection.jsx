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
  const [nextMovie, setNextMovie] = useState(null)

  useEffect(() => {
    startNewGame()
    
    // Add keyboard event listener
    const handleKeyPress = (event) => {
      const letter = event.key.toUpperCase()
      if (letter.match(/[A-Z]/) && letter.length === 1) {
        handleLetterGuess(letter)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  useEffect(() => {
    // Preload next movie when game starts
    if (gameState && gameState.gameStatus === 'playing') {
      loadNextMovie()
    }
  }, [gameState])

  const loadNextMovie = async () => {
    try {
      const next = await gameService.getNextMovie()
      setNextMovie(next.currentMovie)
    } catch (err) {
      console.log('Failed to preload next movie')
    }
  }

  const startNewGame = async (continueRound = false) => {
    setLoading(true)
    setError(null)
    try {
      const newGame = await gameService.startNewGame(continueRound)
      setGameState(newGame)
      setShowVictory(false)
      setShowDefeat(false)
      setIsPlaying(false)
      await loadNextMovie()
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
      const updatedGame = await gameService.guessLetter(gameState.id, letter, gameState)
      setGameState(updatedGame)

      const isCorrect = updatedGame.currentMovie.title.toUpperCase().includes(letter)
      
      if (isCorrect) {
        toast.success(`Great! "${letter}" is in the movie!`, {
          icon: '⭐'
        })
        
        if (updatedGame.gameStatus === 'won') {
          setShowVictory(true)
          toast.success(`🎉 Incredible! You guessed "${updatedGame.currentMovie.title}"! Score: ${updatedGame.score}`)
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

  const handleNextRound = async () => {
    try {
      const nextGame = await gameService.getNextMovie()
      setGameState(nextGame)
      setShowVictory(false)
      setIsPlaying(false)
      await loadNextMovie()
      toast.info(`Round ${nextGame.round} - Let's keep going!`, { icon: '🎬' })
    } catch (err) {
      toast.error("Failed to start next round")
    }
  }

  const handleHintClick = () => {
    setShowHint(!showHint)
    if (!showHint && gameState?.hints?.length > 0) {
      toast.info(`Hint: ${gameState.hints[0]}`, { icon: '💡' })
    }
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
          onClick={() => startNewGame()}
          className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-lg hover:shadow-bollywood transition-all"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto py-8">
      {/* Game Statistics Display */}
      <motion.div 
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/20"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-white">{gameState?.totalScore || 0}</div>
            <div className="text-sm text-white/70">Total Score</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{gameState?.round || 1}</div>
            <div className="text-sm text-white/70">Round</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{gameState?.stats?.currentStreak || 0}</div>
            <div className="text-sm text-white/70">Current Streak</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{gameState?.stats?.moviesGuessed || 0}</div>
            <div className="text-sm text-white/70">Movies Guessed</div>
          </div>
        </div>
        
        {nextMovie && (
          <div className="mt-4 pt-4 border-t border-white/20">
            <div className="text-center">
              <div className="text-sm text-white/70 mb-1">Next Movie Preview:</div>
              <div className="text-lg font-semibold text-accent">{nextMovie.title}</div>
              <div className="text-xs text-white/50">Difficulty: {nextMovie.difficulty}</div>
            </div>
          </div>
        )}
      </motion.div>

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
          Choose Your Letters (or use your keyboard!)
        </h3>
        <Keyboard 
          gameState={gameState} 
          onLetterGuess={handleLetterGuess} 
        />
      </motion.div>
      <GameControls 
        gameState={gameState} 
        onNewGame={() => startNewGame()} 
      />

      <VictoryModal 
        show={showVictory} 
        onPlayAgain={() => startNewGame()}
        onNextRound={handleNextRound}
        movieTitle={gameState?.currentMovie?.title}
        score={gameState?.score || 0}
        totalScore={gameState?.totalScore || 0}
        round={gameState?.round || 1}
      />
      <DefeatModal 
        show={showDefeat} 
        onTryAgain={() => startNewGame()} 
        movieTitle={gameState?.currentMovie?.title}
        totalScore={gameState?.totalScore || 0}
      />
    </div>
  )
}

      export default FeatureSection