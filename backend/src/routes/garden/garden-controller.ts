import { Request, Response } from 'express'
import GardenService from './garden-service'

class GardenController {
  private gardenService: GardenService

  constructor(gardenService: GardenService) {
    this.gardenService = gardenService
  }

  createGarden = async (req: Request, res: Response): Promise<void> => {
    const { name, userIds, plantIds } = req.body
    try {
      const garden = await this.gardenService.createGarden(
        name,
        userIds,
        plantIds
      )
      res.status(201).json(garden)
    } catch (error) {
      res.status(400).json({ error: error })
    }
  }

  getUserGarden = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.params
      console.log('getUserGarden controller', userId)

      const garden = await this.gardenService.getUserGarden(userId)
      if (!garden) {
        res.status(404).json({ message: 'Garden not found' })
        return
      }
      res.status(200).json(garden)
    } catch (error) {
      console.error('Error retrieving garden', error)
      res.status(500).json({ message: 'Error retrieving garden', error: error })
    }
  }

  getAllGardens = async (req: Request, res: Response): Promise<void> => {
    try {
      const gardens = await this.gardenService.getAllGardens()
      res.status(200).json(gardens)
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }

  getGarden = async (req: Request, res: Response): Promise<void> => {
    try {
      const garden = await this.gardenService.getGarden(req.params.id)
      if (!garden) {
        res.status(404).json({ error: 'Garden not found' })
        return
      }
      res.status(200).json(garden)
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }

  addUserToGarden = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.body
    try {
      const garden = await this.gardenService.addUserToGarden(
        req.params.id,
        userId
      )
      if (!garden) {
        res.status(404).json({ error: 'Garden not found' })
        return
      }
      res.status(200).json(garden)
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }

  addPlantToGarden = async (req: Request, res: Response): Promise<void> => {
    const { plantId, gardenId } = req.body
    try {
      const garden = await this.gardenService.addPlantToGarden(
        gardenId,
        plantId
      )
      if (!garden) {
        res.status(404).json({ error: 'Garden not found' })
        return
      }
      res.status(200).json(garden)
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }
}

export default GardenController
