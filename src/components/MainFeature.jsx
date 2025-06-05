import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import { gameService } from '../services'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const HANGMAN_STAGES = [
  { emoji: '🎭', description: 'Empty stage with curtains' },
  { emoji: '🎪🪢', description: 'Rope appears with spotlight' },
  { emoji: '🎪🪢🪑', description: 'Platform appears' },
  { emoji: '🎪🪢🪑🕴️', description: 'Stick figure appears' },
  { emoji: '🎪🪢🪑💀', description: 'Game over - dramatic end!' }
]

const MainFeature = () => {
  const [gameState, setGameState] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.7)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [showVictory, setShowVictory] = useState(false)
  const [showDefeat, setShowDefeat] = useState(false)
  
  const audioRef = useRef(null)
  const progressInterval = useRef(null)

  // Initialize game
  useEffect(() => {
    startNewGame()
  }, [])

  // Audio progress tracking
  useEffect(() => {
    if (isPlaying && audioRef.current) {
      progressInterval.current = setInterval(() => {
        const audio = audioRef.current
        if (audio && audio.duration) {
          setCurrentTime(audio.currentTime)
          setProgress((audio.currentTime / audio.duration) * 100)
        }
      }, 100)
    } else {
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
      }
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
      }
    }
  }, [isPlaying])

  const startNewGame = async () => {
    setLoading(true)
    setError(null)
    try {
      const newGame = await gameService.startNewGame()
      setGameState(newGame)
      setShowVictory(false)
      setShowDefeat(false)
      setProgress(0)
      setCurrentTime(0)
      setIsPlaying(false)
      
      // Load audio
      if (audioRef.current && newGame.currentMovie) {
        audioRef.current.src = newGame.currentMovie.songFile
        audioRef.current.onloadedmetadata = () => {
          setDuration(audioRef.current.duration)
        }
        audioRef.current.volume = volume
      }
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
        
        // Check if won
        if (updatedGame.gameStatus === 'won') {
          setShowVictory(true)
          toast.success("🎉 Incredible! You guessed the movie!")
        }
      } else {
        toast.error(`Oops! "${letter}" is not in the movie`, {
          icon: '💔'
        })
        
        // Check if lost
        if (updatedGame.gameStatus === 'lost') {
          setShowDefeat(true)
          toast.error(`Game Over! The movie was "${updatedGame.currentMovie.title}"`)
        }
      }
    } catch (err) {
      toast.error("Failed to make guess")
    }
  }

  const toggleAudio = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  const handleProgressClick = (e) => {
    if (!audioRef.current || !duration) return

    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const newTime = (clickX / rect.width) * duration
    
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
    setProgress((newTime / duration) * 100)
  }

  const replayAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      setCurrentTime(0)
      setProgress(0)
      if (!isPlaying) {
        audioRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const renderMovieTitle = () => {
    if (!gameState?.currentMovie) return null

    const title = gameState.currentMovie.title.toUpperCase()
    return title.split('').map((char, index) => {
      if (char === ' ') {
        return (
          <div key={index} className="w-4 h-12 sm:h-16 flex items-center justify-center">
            <div className="w-2 h-2 bg-secondary rounded-full"></div>
          </div>
        )
      }
      
      const isGuessed = gameState.guessedLetters.includes(char) || !/[A-Z]/.test(char)
      
      return (
        <motion.div
          key={index}
          className={`w-10 h-12 sm:w-12 sm:h-16 border-2 border-secondary rounded-lg flex items-center justify-center mx-1 mb-2 ${
            isGuessed ? 'bg-gradient-to-br from-accent to-secondary' : 'bg-white/10'
          }`}
          initial={{ rotateY: 0 }}
          animate={{ rotateY: isGuessed ? [0, 90, 0] : 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className={`text-lg sm:text-xl font-bold ${isGuessed ? 'text-white' : 'text-transparent'}`}>
            {isGuessed ? char : '?'}
          </span>
        </motion.div>
      )
    })
  }

  const renderKeyboard = () => {
    return (
      <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2 max-w-4xl mx-auto">
        {ALPHABET.map((letter) => {
          const isGuessed = gameState?.guessedLetters.includes(letter)
          const isCorrect = gameState?.currentMovie?.title.toUpperCase().includes(letter)
          const isDisabled = isGuessed || gameState?.gameStatus !== 'playing'
          
          return (
            <motion.button
              key={letter}
              onClick={() => handleLetterGuess(letter)}
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
            </motion.button>
          )
        })}
      </div>
    )
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
      {/* Audio Player Section */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20 shadow-bollywood"
      >
        <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-6">
          {/* Play Controls */}
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={toggleAudio}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                isPlaying 
                  ? 'bg-gradient-to-br from-red-500 to-red-600 animate-pulse-glow' 
                  : 'bg-gradient-to-br from-primary to-secondary hover:shadow-bollywood'
              }`}
            >
              <ApperIcon 
                name={isPlaying ? "Pause" : "Play"} 
                className="w-8 h-8 text-white" 
              />
            </motion.button>
            
            <motion.button
              onClick={replayAudio}
              whileHover={{ scale: 1.05, rotate: 360 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
            >
              <ApperIcon name="RotateCcw" className="w-5 h-5 text-white" />
            </motion.button>
          </div>

          {/* Progress Bar */}
          <div className="flex-1 w-full lg:w-auto">
            <div className="flex items-center space-x-3 text-white text-sm mb-2">
              <span>{formatTime(currentTime)}</span>
              <span className="text-gray-300">|</span>
              <span>{formatTime(duration)}</span>
            </div>
            <div 
              className="h-3 bg-white/20 rounded-full cursor-pointer relative overflow-hidden"
              onClick={handleProgressClick}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                style={{ width: `${progress}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>

          {/* Volume Control */}
          <div className="flex items-center space-x-3">
            <ApperIcon name="Volume2" className="w-5 h-5 text-white" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 h-2 bg-white/20 rounded-full appearance-none cursor-pointer slider"
            />
          </div>
        </div>
        
        <audio
          ref={audioRef}
          onEnded={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      </motion.div>

      {/* Game Board */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
        {/* Movie Title Display */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="lg:col-span-3 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-bollywood"
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-2 text-shadow">
              Guess the Movie! 🎬
            </h2>
            <p className="text-gray-300">Listen to the song and guess the Bollywood movie name</p>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-1 mb-8 min-h-[80px]">
            {renderMovieTitle()}
          </div>
          
          {/* Hint Button */}
          <div className="text-center mb-6">
            <div className="relative inline-block group">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowHint(!showHint)}
                className="bg-accent hover:bg-accent/80 text-white px-6 py-2 rounded-lg transition-all font-medium"
              >
                <ApperIcon name="Lightbulb" className="w-4 h-4 inline mr-2" />
                Hint
              </motion.button>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-surface-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap">
                Hints feature - Rolling out next update!
              </div>
            </div>
          </div>
        </motion.div>

        {/* Hangman Visualization */}
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-bollywood"
        >
          <h3 className="text-xl font-heading font-bold text-white mb-4 text-center text-shadow">
            Lives Remaining
          </h3>
          
          {/* Hearts Display */}
          <div className="flex justify-center space-x-2 mb-6">
            {[...Array(5)].map((_, index) => (
              <motion.div
                key={index}
                className={`text-2xl ${
                  index < (gameState?.wrongAttempts || 0) ? 'grayscale' : ''
                }`}
                animate={index < (gameState?.wrongAttempts || 0) ? { scale: [1, 0.8, 1] } : {}}
                transition={{ duration: 0.5 }}
              >
                {index < (gameState?.wrongAttempts || 0) ? '💔' : '❤️'}
              </motion.div>
            ))}
          </div>
          
          {/* Hangman Stage */}
          <div className="text-center">
            <motion.div
              className="text-6xl mb-4"
              key={gameState?.wrongAttempts || 0}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, ease: "back.out" }}
            >
              {HANGMAN_STAGES[gameState?.wrongAttempts || 0]?.emoji}
            </motion.div>
            <p className="text-gray-300 text-sm">
              {HANGMAN_STAGES[gameState?.wrongAttempts || 0]?.description}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Keyboard */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-bollywood mb-8"
      >
        <h3 className="text-xl font-heading font-bold text-white mb-6 text-center text-shadow">
          Choose Your Letters
        </h3>
        {renderKeyboard()}
      </motion.div>

      {/* Game Controls */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-col sm:flex-row items-center justify-between bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-bollywood"
      >
        <div className="flex items-center space-x-6 mb-4 sm:mb-0">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{gameState?.score || 0}</div>
            <div className="text-gray-300 text-sm">Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{gameState?.wrongAttempts || 0}/5</div>
            <div className="text-gray-300 text-sm">Wrong</div>
          </div>
          <div className="text-center relative group">
            <div className="text-2xl font-bold text-white">--:--</div>
            <div className="text-gray-300 text-sm">Timer</div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-surface-800 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap">
              Timed mode coming soon!
            </div>
          </div>
        </div>
        
        <motion.button
          onClick={startNewGame}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white font-semibold py-3 px-8 rounded-xl transition-all shadow-bollywood"
        >
          <ApperIcon name="RefreshCw" className="w-5 h-5 inline mr-2" />
          New Game
        </motion.button>
      </motion.div>

      {/* Victory Modal */}
      <AnimatePresence>
        {showVictory && (
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
              className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 text-center max-w-md w-full border border-green-400/50 shadow-2xl"
            >
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-heading font-bold text-white mb-4">Fantastic!</h2>
              <p className="text-white/90 mb-6">
                You correctly guessed <span className="font-bold">"{gameState?.currentMovie?.title}"</span>!
              </p>
              <motion.button
                onClick={startNewGame}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-xl transition-all"
              >
                Play Again
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Defeat Modal */}
      <AnimatePresence>
        {showDefeat && (
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
              className="bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl p-8 text-center max-w-md w-full border border-red-400/50 shadow-2xl"
            >
              <div className="text-6xl mb-4">💀</div>
              <h2 className="text-3xl font-heading font-bold text-white mb-4">Game Over!</h2>
              <p className="text-white/90 mb-6">
                The correct answer was <span className="font-bold">"{gameState?.currentMovie?.title}"</span>
              </p>
              <motion.button
                onClick={startNewGame}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-xl transition-all"
              >
                Try Again
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature