import mongoose, { Document, Schema } from 'mongoose'

export interface IGarden extends Document {
  name: string
  users: mongoose.Schema.Types.ObjectId[]
  plants: mongoose.Schema.Types.ObjectId[]
}

const GardenSchema: Schema = new Schema({
  name: { type: String, required: true },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  plants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Plant' }]
})

export default mongoose.model<IGarden>('Garden', GardenSchema)
