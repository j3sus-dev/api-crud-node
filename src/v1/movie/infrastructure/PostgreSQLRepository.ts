import { PostgreSQL } from '../../../common/PostgreSQL'
import { Movie } from '../domain/Movie'
import { MovieDescription } from '../domain/MovieDescription'
import { MovieId } from '../domain/MovieId'
import { MovieMeta } from '../domain/MovieMeta'
import { MovieParams } from '../domain/MovieParams'
import { MovieRepository } from '../domain/MovieRepository'
import { MovieTitle } from '../domain/MovieTitle'

export class PostgreSQLRepository implements MovieRepository {
  public async getAllMovies(
    params: MovieParams
  ): Promise<{ meta: MovieMeta; data: Movie[] }> {
    const connection = await PostgreSQL.connection()
    const result = await connection.query(
      'SELECT id, title, description FROM movies ORDER BY id LIMIT $1 OFFSET $2',
      [params.limit, (params.page - 1) * params.limit]
    )
    const countResult = await connection.query('SELECT COUNT(*) FROM movies')
    const totalMovies = parseInt(countResult.rows[0].count, 10)
    connection.release()

    const totalPages = Math.ceil(totalMovies / params.limit)
    const hasNextPage = params.page < totalPages
    const hasPrevPage = params.page > 1
    const nextPage = hasNextPage ? params.page + 1 : null
    const prevPage = hasPrevPage ? params.page - 1 : null

    const movies = result.rows.map(
      (movie) =>
        new Movie(
          new MovieId(movie.id),
          new MovieTitle(movie.title),
          new MovieDescription(movie.description)
        )
    )

    const meta = new MovieMeta(
      totalMovies,
      totalPages,
      params.page,
      nextPage,
      prevPage
    )

    return {
      meta: meta,
      data: movies,
    }
  }

  public async getByMovieId(id: MovieId): Promise<Movie | null> {
    const connection = await PostgreSQL.connection()
    const result = await connection.query(
      'SELECT id, title, description FROM movies WHERE id = $1',
      [id.value()]
    )
    connection.release()

    if (result.rows.length === 0) {
      return null
    }

    return new Movie(
      new MovieId(result.rows[0].id),
      new MovieTitle(result.rows[0].title),
      new MovieDescription(result.rows[0].description)
    )
  }

  public async createMovie(movie: Movie): Promise<Movie> {
    const connection = await PostgreSQL.connection()
    const insert = await connection.query(
      'INSERT INTO movies (title, description) VALUES ($1, $2) RETURNING id;',
      [movie.title.value(), movie.description.value()]
    )
    connection.release()

    return new Movie(
      new MovieId(insert.rows[0].id),
      new MovieTitle(movie.title.value()),
      new MovieDescription(movie.description.value())
    )
  }

  public async updateMovie(movie: Movie): Promise<Movie> {
    const connection = await PostgreSQL.connection()
    await connection.query(
      'UPDATE movies SET title = $1, description = $2 WHERE id = $3',
      [movie.title.value(), movie.description.value(), movie.id.value()]
    )
    connection.release()

    return new Movie(
      new MovieId(movie.id.value()),
      new MovieTitle(movie.title.value()),
      new MovieDescription(movie.description.value())
    )
  }

  public async deleteMovie(id: MovieId): Promise<void> {
    const connection = await PostgreSQL.connection()
    await connection.query('DELETE FROM movies WHERE id = $1', [id.value()])
    connection.release()
  }
}
