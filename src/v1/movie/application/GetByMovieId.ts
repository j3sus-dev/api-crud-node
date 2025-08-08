import { Movie } from '../domain/Movie'
import { MovieId } from '../domain/MovieId'
import { MovieNotFound } from '../domain/MovieNotFound'
import { MovieRepository } from '../domain/MovieRepository'

export class GetByMovieId {
  constructor(private readonly repository: MovieRepository) {}

  public async run(id: number): Promise<Movie> {
    const movie = await this.repository.getByMovieId(new MovieId(id))

    if (!movie) {
      throw new MovieNotFound('La película no pudo ser encontrada')
    }

    return movie
  }
}
