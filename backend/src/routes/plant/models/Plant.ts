import mongoose, { Document, Schema } from 'mongoose'

export interface IPlant extends Document {
  name: string
  nameEn: string
  description: string
  descriptionEn: string
  location?: string
  locationEn?: string
  soilComposition?: string
  soilCompositionEn?: string
  userSoilComposition?: string
  userSoilCompositionEn?: string
  homeTemperature?: string
  homeTemperatureEn?: string
  sunlightExposure?: string
  sunlightExposureEn?: string
  userSunlightExposure?: string
  userSunlightExposureEn?: string
  image: string
  createdAt: Date
  lastWateredDate: Date
  nextWateringDate: Date
  wateringFrequency: number
  userSideType: string
  userSideTypeEn: string
  fertilizer: string
  fertilizerEn: string
  fertilizerFrequency: string
  fertilizerFrequencyEn: string
}

const PlantSchema: Schema = new Schema({
  name: { type: String, required: true },
  nameEn: { type: String, required: true },
  description: { type: String, required: true },
  descriptionEn: { type: String, required: true },
  location: { type: String, required: false },
  locationEn: { type: String, required: false },
  soilComposition: { type: String, required: false },
  soilCompositionEn: { type: String, required: false },
  userSoilComposition: { type: String, required: false },
  userSoilCompositionEn: { type: String, required: false },
  homeTemperature: { type: String, required: false },
  homeTemperatureEn: { type: String, required: false },
  sunlightExposure: { type: String, required: false },
  sunlightExposureEn: { type: String, required: false },
  userSunlightExposure: { type: String, required: false },
  userSunlightExposureEn: { type: String, required: false },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  lastWateredDate: { type: Date, required: true, default: Date.now },
  nextWateringDate: { type: Date, required: false, default: Date.now },
  wateringFrequency: { type: Number, required: false, default: 1 },
  userSideType: { type: String, required: false },
  userSideTypeEn: { type: String, required: false },
  fertilizer: { type: String, required: false },
  fertilizerEn: { type: String, required: false },
  fertilizerFrequency: { type: String, required: false },
  fertilizerFrequencyEn: { type: String, required: false }
})

export default mongoose.model<IPlant>('Plant', PlantSchema)
