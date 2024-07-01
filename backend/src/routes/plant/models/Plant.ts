import mongoose, { Document, Schema } from 'mongoose'

export interface IPlant extends Document {
  name: string
  description: string
  location?: string
  soilComposition?: string
  homeTemperature?: string
  sunlightExposure?: string
  image: string
  createdAt: Date
}

const PlantSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: false },
  soilComposition: { type: String, required: false },
  homeTemperature: { type: String, required: false },
  sunlightExposure: { type: String, required: false },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model<IPlant>('Plant', PlantSchema)
