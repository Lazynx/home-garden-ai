import { Router } from 'express'
import { authMiddleware } from '../../middlewares/auth-middleware'
import DiseaseService from './disease-service'
import DiseaseController from './disease-controller'
import multer from 'multer'

const diseaseRouter = Router()
const storage = multer.memoryStorage()
const upload = multer({ storage })

const diseaseService = new DiseaseService()
const diseaseController = new DiseaseController(diseaseService)

diseaseRouter.post(
  '/diagnose',
  upload.single('file'),
  diseaseController.diagnosePlantDisease
)
diseaseRouter.post('/continue', diseaseController.continueDiagnosis)

export default diseaseRouter
