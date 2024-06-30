import mongoose from 'mongoose'
import Garden, { IGarden } from './models/Garden'

class GardenService {
  async createGarden(
    name: string,
    userIds: mongoose.Types.ObjectId[],
    plantIds: mongoose.Types.ObjectId[]
  ): Promise<IGarden> {
    const garden = new Garden({ name, users: userIds, plants: plantIds })
    await garden.save()
    return garden
  }

  async getUserGarden(userId: string): Promise<IGarden | null> {
    try {
      console.log('getUserGarden service', userId)
      const garden = await Garden.findOne({ users: userId })
        .populate('users')
        .populate('plants')
        .exec()
      return garden
    } catch (error) {
      console.error('Error retrieving garden', error)
      throw new Error('Error retrieving garden')
    }
  }

  async getAllGardens(): Promise<IGarden[]> {
    return Garden.find().populate('users').populate('plants').exec()
  }

  async getGarden(id: string): Promise<IGarden | null> {
    return Garden.findById(id).populate('users').populate('plants').exec()
  }

  async addUserToGarden(
    gardenId: string,
    userId: string
  ): Promise<IGarden | null> {
    const garden = await Garden.findById(gardenId)
    if (garden) {
      const objectId = new mongoose.Types.ObjectId(userId)
      garden.users.push(objectId as any)
      await garden.save()
    }
    return garden
  }

  async addPlantToGarden(
    gardenId: string,
    plantId: string
  ): Promise<IGarden | null> {
    const garden = await Garden.findById(gardenId)
    if (garden) {
      const objectId = new mongoose.Types.ObjectId(plantId)
      garden.plants.push(objectId as any)
      await garden.save()
    }
    return garden
  }
}

export default GardenService
