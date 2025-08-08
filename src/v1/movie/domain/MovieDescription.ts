import { InvalidEntryError } from './InvalidEntryError'

export class MovieDescription {
  constructor(private readonly description: string) {
    this.validate()
  }

  private validate(): void {
    if (this.description.length === 0) {
      throw new InvalidEntryError('La descripción es requerido')
    }
  }

  public value(): string {
    return this.description
  }
}
