import { Movie } from './Movie'
import { MovieId } from './MovieId'
import { MovieMeta } from './MovieMeta'
import { MovieParams } from './MovieParams'

export interface MovieRepository {
  getAllMovies(params: MovieParams): Promise<{ meta: MovieMeta; data: Movie[] }>
  getByMovieId(id: MovieId): Promise<Movie | null>
  createMovie(movie: Movie): Promise<Movie>
  updateMovie(movie: Movie): Promise<Movie>
  deleteMovie(id: MovieId): Promise<void>
}
