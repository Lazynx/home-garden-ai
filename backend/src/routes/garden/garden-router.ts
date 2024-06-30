import { Router } from 'express'
import GardenService from './garden-service'
import GardenController from './garden-controller'

const gardenRouter = Router()

const gardenService = new GardenService()
const gardenController = new GardenController(gardenService)

gardenRouter.post('/create', gardenController.createGarden)
gardenRouter.get('/get_all', gardenController.getAllGardens)
gardenRouter.get('/:id', gardenController.getGarden)
gardenRouter.get('/user/:userId', gardenController.getUserGarden)
gardenRouter.post('/add_user', gardenController.addUserToGarden)
gardenRouter.post('/add_plant', gardenController.addPlantToGarden)

export default gardenRouter
