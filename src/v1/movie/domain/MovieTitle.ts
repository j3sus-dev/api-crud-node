import { InvalidEntryError } from './InvalidEntryError'

export class MovieTitle {
  constructor(private readonly title: string) {
    this.validate()
  }

  private validate(): void {
    if (this.title.length === 0) {
      throw new InvalidEntryError('El título es requerido')
    }
  }

  public value(): string {
    return this.title
  }
}
