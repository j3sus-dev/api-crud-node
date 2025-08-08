import { Router } from 'express'
import { MovieController } from './MovieController'
import { PostgreSQLRepository } from './PostgreSQLRepository'

const controller = new MovieController(new PostgreSQLRepository())

const router = Router()
router.get('/', controller.getAllMovie)
router.get('/:id', controller.getByMovieId)
router.post('/', controller.createMovie)
router.put('/:id', controller.updateMovie)
router.delete('/:id', controller.deleteMovie)

export default router
