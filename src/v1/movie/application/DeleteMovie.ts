import { MovieId } from '../domain/MovieId'
import { MovieNotFound } from '../domain/MovieNotFound'
import { MovieRepository } from '../domain/MovieRepository'

export class DeleteMovie {
  constructor(private readonly repository: MovieRepository) {}

  public async run(id: number): Promise<void> {
    const movie = await this.repository.getByMovieId(new MovieId(id))

    if (!movie) {
      throw new MovieNotFound('La película no pudo ser encontrada')
    }

    await this.repository.deleteMovie(new MovieId(id))
  }
}
