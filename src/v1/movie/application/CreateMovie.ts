import { Movie } from '../domain/Movie'
import { MovieDescription } from '../domain/MovieDescription'
import { MovieId } from '../domain/MovieId'
import { MovieRepository } from '../domain/MovieRepository'
import { MovieTitle } from '../domain/MovieTitle'

export class CreateMovie {
  constructor(private readonly repository: MovieRepository) {}

  public async run(title: string, description: string): Promise<Movie> {
    return await this.repository.createMovie(
      new Movie(
        new MovieId(null),
        new MovieTitle(title),
        new MovieDescription(description)
      )
    )
  }
}
