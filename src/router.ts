import { Router } from 'express'
import swagger from 'swagger-ui-express'
import v1Docs from '../docs/v1.json'
import movie from './v1/movie/infrastructure/router'

const router = Router()
router.use('/api/v1/docs', swagger.serve, swagger.setup(v1Docs))
router.use('/api/v1/movies', movie)

export default router
