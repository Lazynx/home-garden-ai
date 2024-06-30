import { Router } from 'express'
import { authMiddleware } from '../../middlewares/auth-middleware'
import PlantService from './plant-service'
import PlantController from './plant-controller'
import multer from 'multer'

const plantRouter = Router()
const storage = multer.memoryStorage()
const upload = multer({ storage })

const plantService = new PlantService()
const plantController = new PlantController(plantService)

plantRouter.post(
  '/create',
  upload.fields([{ name: 'plant', maxCount: 1 }]),
  plantController.createPlant
)
plantRouter.get('/get_all', plantController.getAllPlants)
plantRouter.get('/:id', plantController.getPlant)
plantRouter.put('/plants/:id', plantController.updatePlant)
plantRouter.delete('/plants/:id', plantController.deletePlant)

export default plantRouter
