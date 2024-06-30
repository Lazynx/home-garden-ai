import { Router } from 'express'
import authRouter from './auth/auth-router'
import plantRouter from './plant/plant-router'
import gardenRouter from './garden/garden-router'

const globalRouter = Router()

globalRouter.use('/auth', authRouter)
globalRouter.use('/plants', plantRouter)
globalRouter.use('/gardens', gardenRouter)

export default globalRouter
