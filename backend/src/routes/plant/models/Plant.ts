import mongoose, { Document, Schema } from 'mongoose'

export interface IPlant extends Document {
  name: string
  description: string
  location?: string
  soilComposition?: string
  userSoilComposition?: string
  homeTemperature?: string
  sunlightExposure?: string
  userSunlightExposure?: string
  image: string
  createdAt: Date
  lastWateredDate: Date
  nextWateringDate: Date
  wateringFrequency: number
  userSideType: string
  fertilizer: string
  fertilizerFrequency: string
}

const PlantSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: false },
  soilComposition: { type: String, required: false },
  userSoilComposition: { type: String, required: false },
  homeTemperature: { type: String, required: false },
  sunlightExposure: { type: String, required: false },
  userSunlightExposure: { type: String, required: false },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  lastWateredDate: { type: Date, required: true, default: Date.now },
  nextWateringDate: { type: Date, required: false, default: Date.now },
  wateringFrequency: { type: Number, required: false, default: 1 },
  userSideType: { type: String, required: false },
  fertilizer: { type: String, required: false },
  fertilizerFrequency: { type: String, required: false }
})

export default mongoose.model<IPlant>('Plant', PlantSchema)
