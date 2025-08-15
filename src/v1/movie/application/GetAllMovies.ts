import { Movie } from '../domain/Movie'
import { MovieMeta } from '../domain/MovieMeta'
import { MovieParams } from '../domain/MovieParams'
import { MovieRepository } from '../domain/MovieRepository'

export class GetAllMovies {
  constructor(private readonly repository: MovieRepository) {}

  public async run(
    page: number,
    limit: number
  ): Promise<{ meta: MovieMeta; data: Movie[] }> {
    return await this.repository.getAllMovies(new MovieParams(page, limit))
  }
}
