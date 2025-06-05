import movies from '../mockData/movies.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const movieService = {
  async getAll() {
    await delay(300)
    
    try {
      if (!movies || !Array.isArray(movies)) {
        throw new Error('No movies data available')
      }
      
      return [...movies]
    } catch (error) {
      throw new Error('Failed to fetch movies: ' + error.message)
    }
  },

  async getById(id) {
    await delay(250)
    
    try {
      if (!id) {
        throw new Error('Movie ID is required')
      }
      
      const movie = movies.find(m => m.id === id)
      if (!movie) {
        throw new Error('Movie not found')
      }
      
      return { ...movie }
    } catch (error) {
      throw new Error('Failed to fetch movie: ' + error.message)
    }
  },

  async getByDifficulty(difficulty) {
    await delay(300)
    
    try {
      if (!difficulty) {
        throw new Error('Difficulty level is required')
      }
      
      const filteredMovies = movies.filter(m => m.difficulty === difficulty)
      return [...filteredMovies]
    } catch (error) {
      throw new Error('Failed to fetch movies by difficulty: ' + error.message)
    }
  },

  async getRandomMovie() {
    await delay(200)
    
    try {
      if (!movies || movies.length === 0) {
        throw new Error('No movies available')
      }
      
      const randomIndex = Math.floor(Math.random() * movies.length)
      return { ...movies[randomIndex] }
    } catch (error) {
      throw new Error('Failed to get random movie: ' + error.message)
    }
  },

  async create(movieData) {
    await delay(400)
    
    try {
      if (!movieData || !movieData.title) {
        throw new Error('Movie title is required')
      }
      
      const newMovie = {
        id: `movie_${Date.now()}`,
        title: movieData.title,
        songFile: movieData.songFile || '',
        year: movieData.year || new Date().getFullYear(),
        hints: movieData.hints || [],
        difficulty: movieData.difficulty || 'medium',
        createdAt: new Date().toISOString()
      }
      
      // In a real app, this would save to a database
      // For now, we'll just return the created movie
      return { ...newMovie }
    } catch (error) {
      throw new Error('Failed to create movie: ' + error.message)
    }
  },

  async update(id, movieData) {
    await delay(350)
    
    try {
      if (!id) {
        throw new Error('Movie ID is required')
      }
      
      if (!movieData) {
        throw new Error('Movie data is required')
      }
      
      // In a real app, this would update the database
      // For now, we'll simulate an update
      const updatedMovie = {
        id,
        ...movieData,
        updatedAt: new Date().toISOString()
      }
      
      return { ...updatedMovie }
    } catch (error) {
      throw new Error('Failed to update movie: ' + error.message)
    }
  },

  async delete(id) {
    await delay(300)
    
    try {
      if (!id) {
        throw new Error('Movie ID is required')
      }
      
      // In a real app, this would delete from database
      // For now, we'll just return success
      return { success: true, id }
    } catch (error) {
      throw new Error('Failed to delete movie: ' + error.message)
    }
  }
}