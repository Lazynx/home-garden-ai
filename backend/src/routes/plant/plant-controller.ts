import { Request, Response } from 'express'
import PlantService from './plant-service'

class PlantController {
  private plantService: PlantService

  constructor(plantService: PlantService) {
    this.plantService = plantService
  }

  createPlant = async (req: Request, res: Response): Promise<void> => {
    try {
      const plantData = req.body
      const files = req.files as { [fieldname: string]: Express.Multer.File[] }

      const plantFile = files['plant'] ? files['plant'][0] : null

      console.log('Received plant data:', plantData)
      console.log('Received plant file:', plantFile)

      if (!plantFile) {
        res.status(400).json({ message: 'Plant file is required' })
        return
      }

      const newPlant = await this.plantService.createPlant(
        plantData,
        plantFile.buffer,
        plantFile.originalname
      )

      res.status(201).json(newPlant)
    } catch (error) {
      console.error('Error creating plant:', error)
      res.status(500).json({ message: 'Error creating plant', error })
    }
  }

  getPlant = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params
      console.log(`Fetching plant with id: ${id}`)
      const plant = await this.plantService.getPlant(id)

      if (plant) {
        res.status(200).json(plant)
      } else {
        res.status(404).json({ message: 'Plant not found' })
      }
    } catch (err) {
      console.error('Error getting plant:', err)
      res.status(500).json({ message: 'Error getting plant', error: err })
    }
  }

  getAllPlants = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log('Fetching all plants')
      const plants = await this.plantService.getAllPlants()
      res.status(200).json(plants)
    } catch (err) {
      console.error('Error getting plants:', err)
      res.status(500).json({ message: 'Error getting plants', error: err })
    }
  }

  updatePlant = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params
      const plantUpdate = req.body
      const files = req.files as { [fieldname: string]: Express.Multer.File[] }

      const plantFile = files['plant'] ? files['plant'][0] : null

      console.log('Received plant update data:', plantUpdate)
      console.log('Received plant file:', plantFile)

      const updatedPlant = await this.plantService.updatePlant(
        id,
        plantUpdate,
        plantFile ? plantFile.buffer : undefined,
        plantFile ? plantFile.originalname : undefined
      )

      if (updatedPlant) {
        res.status(200).json(updatedPlant)
      } else {
        res.status(404).json({ message: 'Plant not found' })
      }
    } catch (error) {
      console.error('Error updating plant:', error)
      res.status(500).json({ message: 'Error updating plant', error })
    }
  }

  deletePlant = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params
      const plant = await this.plantService.deletePlant(id)

      if (plant) {
        res.status(200).json(plant)
      } else {
        res.status(404).json({ message: 'Plant not found' })
      }
    } catch (err) {
      res.status(500).json({ message: 'Error deleting plant' })
    }
  }
}

export default PlantController
