import { MovieDescription } from './MovieDescription'
import { MovieId } from './MovieId'
import { MovieTitle } from './MovieTitle'

export class Movie {
  constructor(
    public readonly id: MovieId,
    public readonly title: MovieTitle,
    public readonly description: MovieDescription
  ) {}

  public toPrimitive() {
    return {
      id: this.id.value(),
      title: this.title.value(),
      description: this.description.value(),
    }
  }
}
