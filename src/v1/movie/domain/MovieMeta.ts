export class MovieMeta {
  constructor(
    public readonly totalItems: number,
    public readonly totalPages: number,
    public readonly currentPage: number,
    public readonly nextPage: number | null,
    public readonly prevPage: number | null
  ) {}
}
