import { Movie } from './Movie'
import { MovieId } from './MovieId'
import { MovieParams } from './MovieParams'

export interface MovieRepository {
  getAllMovies(params: MovieParams): Promise<Movie[]>
  getByMovieId(id: MovieId): Promise<Movie | null>
  createMovie(movie: Movie): Promise<Movie>
  updateMovie(movie: Movie): Promise<Movie>
  deleteMovie(id: MovieId): Promise<void>
}
