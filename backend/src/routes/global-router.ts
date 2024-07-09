import { Router } from 'express'
import authRouter from './auth/auth-router'
import plantRouter from './plant/plant-router'
import gardenRouter from './garden/garden-router'
import diseaseRouter from './disease/disease-router'

const globalRouter = Router()

globalRouter.use('/auth', authRouter)
globalRouter.use('/plants', plantRouter)
globalRouter.use('/gardens', gardenRouter)
globalRouter.use('/diseases', diseaseRouter)

export default globalRouter
