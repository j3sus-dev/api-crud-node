import { InvalidEntryError } from './InvalidEntryError'

export class MovieId {
  constructor(private readonly id: number | null) {
    this.validate()
  }

  private validate(): void {
    if (this.id !== null && (isNaN(this.id) || !Number.isInteger(this.id))) {
      throw new InvalidEntryError('El id debe ser un número entero')
    }
  }

  public value(): number | null {
    return this.id
  }
}
