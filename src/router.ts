import { Router } from 'express'
import movie from './v1/movie/infrastructure/router'

const router = Router()
router.use('/api/v1/movies', movie)

export default router
