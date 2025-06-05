import movies from '../mockData/movies.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let currentGameId = 1
let gameSession = {
  totalGames: 0,
  wins: 0,
  losses: 0,
  currentStreak: 0,
  highScore: 0
}

const generateGameId = () => {
  return `game_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

const getRandomMovie = () => {
  if (!movies || movies.length === 0) {
    throw new Error('No movies available')
  }
  const randomIndex = Math.floor(Math.random() * movies.length)
  return { ...movies[randomIndex] }
}

const calculateScore = (wrongAttempts, movieLength) => {
  const baseScore = 100
  const lengthBonus = movieLength * 10
  const wrongPenalty = wrongAttempts * 20
  return Math.max(10, baseScore + lengthBonus - wrongPenalty)
}

export const gameService = {
  async startNewGame() {
    await delay(300)
    
    try {
      const movie = getRandomMovie()
      const gameId = generateGameId()
      
      const newGame = {
        id: gameId,
        currentMovie: movie,
        guessedLetters: [],
        wrongAttempts: 0,
        gameStatus: 'playing', // playing, won, lost
        score: 0,
        startTime: Date.now()
      }
      
      gameSession.totalGames += 1
      
      return { ...newGame }
    } catch (error) {
      throw new Error('Failed to start new game: ' + error.message)
    }
  },

  async guessLetter(gameId, letter) {
    await delay(250)
    
    try {
      if (!gameId || !letter) {
        throw new Error('Game ID and letter are required')
      }
      
      // In a real app, you'd fetch the current game state from storage
      // For this demo, we'll simulate getting the current game
      const movie = getRandomMovie() // This would be the current game's movie
      
      // Simulate current game state - in reality this would come from your game state management
      const currentGame = {
        id: gameId,
        currentMovie: movie,
        guessedLetters: [], // This would be the actual current guessed letters
        wrongAttempts: 0, // This would be the actual current wrong attempts
        gameStatus: 'playing',
        score: 0
      }
      
      const upperLetter = letter.toUpperCase()
      const movieTitle = currentGame.currentMovie.title.toUpperCase()
      
      // Add letter to guessed letters
      const newGuessedLetters = [...currentGame.guessedLetters, upperLetter]
      
      // Check if letter is correct
      const isCorrect = movieTitle.includes(upperLetter)
      let newWrongAttempts = currentGame.wrongAttempts
      
      if (!isCorrect) {
        newWrongAttempts += 1
      }
      
      // Check win condition
      const titleLetters = movieTitle.replace(/[^A-Z]/g, '')
      const guessedTitleLetters = titleLetters.split('').filter(char => 
        newGuessedLetters.includes(char)
      )
      const hasWon = titleLetters.split('').every(char => 
        newGuessedLetters.includes(char)
      )
      
      // Check lose condition
      const hasLost = newWrongAttempts >= 5
      
      // Determine game status
      let gameStatus = 'playing'
      let score = currentGame.score
      
      if (hasWon) {
        gameStatus = 'won'
        score = calculateScore(newWrongAttempts, movieTitle.length)
        gameSession.wins += 1
        gameSession.currentStreak += 1
        if (score > gameSession.highScore) {
          gameSession.highScore = score
        }
      } else if (hasLost) {
        gameStatus = 'lost'
        gameSession.losses += 1
        gameSession.currentStreak = 0
      }
      
      const updatedGame = {
        ...currentGame,
        guessedLetters: newGuessedLetters,
        wrongAttempts: newWrongAttempts,
        gameStatus,
        score
      }
      
      return { ...updatedGame }
    } catch (error) {
      throw new Error('Failed to process guess: ' + error.message)
    }
  },

  async getGameStats() {
    await delay(200)
    
    try {
      return { ...gameSession }
    } catch (error) {
      throw new Error('Failed to get game stats: ' + error.message)
    }
  },

  async resetStats() {
    await delay(200)
    
    try {
      gameSession = {
        totalGames: 0,
        wins: 0,
        losses: 0,
        currentStreak: 0,
        highScore: 0
      }
      
      return { ...gameSession }
    } catch (error) {
      throw new Error('Failed to reset stats: ' + error.message)
    }
  }
}