import { Movie } from '../domain/Movie'
import { MovieDescription } from '../domain/MovieDescription'
import { MovieId } from '../domain/MovieId'
import { MovieNotFound } from '../domain/MovieNotFound'
import { MovieRepository } from '../domain/MovieRepository'
import { MovieTitle } from '../domain/MovieTitle'

export class UpdateMovie {
  constructor(private readonly repository: MovieRepository) {}

  public async run(
    id: number,
    title: string,
    description: string
  ): Promise<Movie> {
    const movie = await this.repository.getByMovieId(new MovieId(id))

    if (!movie) {
      throw new MovieNotFound('La película no pudo ser encontrada')
    }

    return await this.repository.updateMovie(
      new Movie(
        new MovieId(id),
        new MovieTitle(title),
        new MovieDescription(description)
      )
    )
  }
}
