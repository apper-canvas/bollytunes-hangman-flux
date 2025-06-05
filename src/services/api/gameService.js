import { movieService } from './movieService'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Game statistics storage
let gameStats = {
  totalScore: 0,
  currentRound: 1,
  gamesPlayed: 0,
  moviesGuessed: 0,
  averageScore: 0,
  currentStreak: 0,
  bestStreak: 0
}

export const gameService = {
  async startNewGame(continueRound = false) {
    await delay(400)
    
    try {
      const randomMovie = await movieService.getRandomMovie()
      
      if (!continueRound) {
        gameStats.currentRound = 1
        gameStats.totalScore = 0
        gameStats.currentStreak = 0
      }
      
      return {
        id: `game_${Date.now()}`,
        currentMovie: randomMovie,
        guessedLetters: [],
        wrongAttempts: 0,
        maxAttempts: 6,
        gameStatus: 'playing', // 'playing', 'won', 'lost'
        startTime: new Date().toISOString(),
        hints: randomMovie.hints || [],
        difficulty: randomMovie.difficulty || 'medium',
        score: 0,
        round: gameStats.currentRound,
        totalScore: gameStats.totalScore,
        stats: { ...gameStats }
      }
    } catch (error) {
      throw new Error('Failed to start new game: ' + error.message)
    }
  },

  async guessLetter(gameId, letter, currentGameState) {
    await delay(200)
    
    try {
      if (!gameId || !letter || !currentGameState) {
        throw new Error('Game ID, letter, and current game state are required')
      }
      
      const letterUpper = letter.toUpperCase()
      const movieTitle = currentGameState.currentMovie.title.toUpperCase()
      const isCorrectGuess = movieTitle.includes(letterUpper)
      
      // Update guessed letters
      const updatedGuessedLetters = [...currentGameState.guessedLetters, letterUpper]
      
      // Update wrong attempts
      let updatedWrongAttempts = currentGameState.wrongAttempts
      if (!isCorrectGuess) {
        updatedWrongAttempts += 1
      }
      
      // Check if word is complete
      const isWordComplete = movieTitle.split('').every(char => {
        return !char.match(/[A-Z]/) || updatedGuessedLetters.includes(char)
      })
      
      // Determine game status
      let gameStatus = 'playing'
      if (isWordComplete) {
        gameStatus = 'won'
        gameStats.currentStreak += 1
        gameStats.moviesGuessed += 1
        if (gameStats.currentStreak > gameStats.bestStreak) {
          gameStats.bestStreak = gameStats.currentStreak
        }
      } else if (updatedWrongAttempts >= currentGameState.maxAttempts) {
        gameStatus = 'lost'
        gameStats.currentStreak = 0
      }
      
      // Calculate score for this round
      let roundScore = 0
      if (gameStatus === 'won') {
        const baseScore = 100
        const livesBonus = (currentGameState.maxAttempts - updatedWrongAttempts) * 20
        const difficultyMultiplier = currentGameState.difficulty === 'hard' ? 2 : 
                                   currentGameState.difficulty === 'medium' ? 1.5 : 1
        roundScore = Math.floor((baseScore + livesBonus) * difficultyMultiplier)
        gameStats.totalScore += roundScore
      }
      
      // Update game statistics
      if (gameStatus !== 'playing') {
        gameStats.gamesPlayed += 1
        gameStats.averageScore = Math.floor(gameStats.totalScore / gameStats.gamesPlayed)
      }
      
      return {
        ...currentGameState,
        guessedLetters: updatedGuessedLetters,
        wrongAttempts: updatedWrongAttempts,
        gameStatus,
        score: roundScore,
        totalScore: gameStats.totalScore,
        stats: { ...gameStats }
      }
    } catch (error) {
      throw new Error('Failed to process guess: ' + error.message)
    }
  },

  async getNextMovie() {
    await delay(300)
    
    try {
      const nextMovie = await movieService.getRandomMovie()
      gameStats.currentRound += 1
      
      return {
        id: `game_${Date.now()}`,
        currentMovie: nextMovie,
        guessedLetters: [],
        wrongAttempts: 0,
        maxAttempts: 6,
        gameStatus: 'playing',
        startTime: new Date().toISOString(),
        hints: nextMovie.hints || [],
        difficulty: nextMovie.difficulty || 'medium',
        score: 0,
        round: gameStats.currentRound,
        totalScore: gameStats.totalScore,
        stats: { ...gameStats }
      }
    } catch (error) {
      throw new Error('Failed to get next movie: ' + error.message)
    }
  },

  async getGameStats() {
    await delay(150)
    return { ...gameStats }
  },

  async resetStats() {
    await delay(100)
    gameStats = {
      totalScore: 0,
      currentRound: 1,
      gamesPlayed: 0,
      moviesGuessed: 0,
      averageScore: 0,
      currentStreak: 0,
      bestStreak: 0
    }
    return { ...gameStats }
  },

  async getGameState(gameId) {
    await delay(150)
    
    try {
      if (!gameId) {
        throw new Error('Game ID is required')
      }
      
      return {
        id: gameId,
        gameStatus: 'playing',
        guessedLetters: [],
        wrongAttempts: 0,
        stats: { ...gameStats }
      }
    } catch (error) {
      throw new Error('Failed to get game state: ' + error.message)
    }
  },

  async saveScore(gameId, score) {
    await delay(300)
    
    try {
      if (!gameId || typeof score !== 'number') {
        throw new Error('Game ID and valid score are required')
      }
      
      const scoreEntry = {
        gameId,
        score,
        timestamp: new Date().toISOString(),
        stats: { ...gameStats }
      }
      
      return scoreEntry
    } catch (error) {
      throw new Error('Failed to save score: ' + error.message)
    }
  },

  async getLeaderboard() {
    await delay(250)
    
    try {
      const mockLeaderboard = [
        { player: 'Bollywood Master', score: 2500, date: '2024-01-15', streak: 8 },
        { player: 'Movie Buff', score: 2100, date: '2024-01-14', streak: 6 },
        { player: 'Film Fanatic', score: 1800, date: '2024-01-13', streak: 5 },
        { player: 'Cinema Lover', score: 1500, date: '2024-01-12', streak: 4 },
        { player: 'Song Detective', score: 1200, date: '2024-01-11', streak: 3 }
      ]
      
      return [...mockLeaderboard]
    } catch (error) {
      throw new Error('Failed to get leaderboard: ' + error.message)
    }
  },

  async endGame(gameId, finalScore) {
    await delay(300)
    
    try {
      if (!gameId) {
        throw new Error('Game ID is required')
      }
      
      return {
        gameId,
        finalScore: finalScore || gameStats.totalScore,
        endTime: new Date().toISOString(),
        status: 'completed',
        stats: { ...gameStats }
      }
    } catch (error) {
throw new Error('Failed to end game: ' + error.message)
    }
  }
}