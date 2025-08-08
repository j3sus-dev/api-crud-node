export class MovieParams {
  private readonly DEFAULT_PAGE: number = 1
  private readonly DEFAULT_LIMIT: number = 10

  constructor(public page: number, public limit: number) {
    this.transform()
  }

  private transform(): void {
    if (isNaN(this.page)) {
      this.page = this.DEFAULT_PAGE
    }

    if (isNaN(this.limit)) {
      this.limit = this.DEFAULT_LIMIT
    }

    if (this.page <= 0) {
      this.page = this.DEFAULT_PAGE
    }

    if (this.limit <= 0) {
      this.limit = this.DEFAULT_LIMIT
    }
  }
}
