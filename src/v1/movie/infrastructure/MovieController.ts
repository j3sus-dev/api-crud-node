import { Request, Response } from 'express'
import { Log } from '../../../common/Log'
import { CreateMovie } from '../application/CreateMovie'
import { DeleteMovie } from '../application/DeleteMovie'
import { GetAllMovies } from '../application/GetAllMovies'
import { GetByMovieId } from '../application/GetByMovieId'
import { UpdateMovie } from '../application/UpdateMovie'
import { InvalidEntryError } from '../domain/InvalidEntryError'
import { MovieNotFound } from '../domain/MovieNotFound'
import { PostgreSQLRepository } from './PostgreSQLRepository'

export class MovieController {
  constructor(private readonly repository: PostgreSQLRepository) {}

  public getAllMovie = (req: Request, res: Response) => {
    const { page, limit } = req.query

    new GetAllMovies(this.repository)
      .run(Number(page), Number(limit))
      .then((_res) => {
        const data = _res.data.map((movie) => movie.toPrimitive())
        return res.status(200).json({ ..._res, data })
      })
      .catch((err) => {
        Log.error(err.message)
        return res
          .status(500)
          .json({ message: 'Lo sentimos, ocurrió un error' })
      })
  }

  public getByMovieId = (req: Request, res: Response) => {
    const { id } = req.params

    new GetByMovieId(this.repository)
      .run(Number(id))
      .then((movie) => {
        return res.status(200).json(movie.toPrimitive())
      })
      .catch((err) => {
        if (err instanceof InvalidEntryError) {
          return res.status(400).json({ message: err.message })
        }

        if (err instanceof MovieNotFound) {
          return res.status(404).json({ message: err.message })
        }

        Log.error(err.message)
        return res
          .status(500)
          .json({ message: 'Lo sentimos, ocurrió un error' })
      })
  }

  public createMovie = (req: Request, res: Response) => {
    const { title, description } = req.body

    new CreateMovie(this.repository)
      .run(title, description)
      .then((movie) => {
        return res.status(201).json(movie.toPrimitive())
      })
      .catch((err) => {
        if (err instanceof InvalidEntryError) {
          return res.status(400).json({ message: err.message })
        }

        Log.error(err.message)
        return res
          .status(500)
          .json({ message: 'Lo sentimos, ocurrió un error' })
      })
  }

  public updateMovie = (req: Request, res: Response) => {
    const { id } = req.params
    const { title, description } = req.body

    new UpdateMovie(this.repository)
      .run(Number(id), title, description)
      .then((movie) => {
        return res.status(200).json(movie.toPrimitive())
      })
      .catch((err) => {
        if (err instanceof InvalidEntryError) {
          return res.status(400).json({ message: err.message })
        }

        if (err instanceof MovieNotFound) {
          return res.status(404).json({ message: err.message })
        }

        Log.error(err.message)
        return res
          .status(500)
          .json({ message: 'Lo sentimos, ocurrió un error' })
      })
  }

  public deleteMovie = (req: Request, res: Response) => {
    const { id } = req.params

    new DeleteMovie(this.repository)
      .run(Number(id))
      .then(() => {
        return res.status(204).send()
      })
      .catch((err) => {
        if (err instanceof InvalidEntryError) {
          return res.status(400).json({ message: err.message })
        }

        if (err instanceof MovieNotFound) {
          return res.status(404).json({ message: err.message })
        }

        Log.error(err.message)
        return res
          .status(500)
          .json({ message: 'Lo sentimos, ocurrió un error' })
      })
  }
}
