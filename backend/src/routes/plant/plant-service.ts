import PlantModel, { IPlant } from './models/Plant'
import { uploadFile } from '../../middlewares/s3-middleware'
import mongoose from 'mongoose'
import openai from '../../openai'
import dayjs from 'dayjs'

class PlantService {
  private async getWateringFrequency(
    name: string,
    description: string,
    soilComposition: string,
    lightType: string
  ): Promise<number> {
    console.log('getWateringFrequency called with:', {
      name,
      description,
      soilComposition,
      lightType
    })

    const userPrompt = `Пожалуйста, выдай мне сколько раз в неделю мне нужно поливать мое растение.`
    const prompt = `
      Вы профессиональный ботаник. На основе предоставленного описания растения, условий почвы и типа освещения, создайте JSON массив, который включает объект с следующими данными:
      "wateringFrequency": количество раз в неделю, когда растение следует поливать.
      Название растения: ${name}
      Описание растения: ${description}
      Условия почвы: ${soilComposition}
      Тип освещения: ${lightType}
      Ответ должен строго соответствовать формату JSON массива и не должен содержать дополнительного текста.
      JSON массив должен выглядеть следующим образом:
      [
        {
          "wateringFrequency": 3
        }
      ]
    `

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: prompt
        },
        {
          role: 'user',
          content: userPrompt
        }
      ],
      stream: false
    })

    let messageContent = response.choices[0]?.message?.content
    console.log('OpenAI response:', messageContent)

    if (!messageContent) {
      throw new Error('No content received from OpenAI')
    }

    // Remove Markdown code block delimiters if present
    messageContent = messageContent.replace(/```json|```/g, '').trim()

    try {
      const data = JSON.parse(messageContent)
      if (Array.isArray(data) && data.length > 0 && data[0].wateringFrequency) {
        console.log('Parsed wateringFrequency:', data[0].wateringFrequency)
        return data[0].wateringFrequency
      } else {
        throw new Error('Invalid response format')
      }
    } catch (error) {
      console.error('Error parsing JSON from OpenAI response:', error)
      throw new Error('Error parsing JSON from OpenAI response')
    }
  }

  async createPlant(
    plant: Partial<IPlant>,
    imageBuffer: Buffer,
    imageFileName: string
  ): Promise<IPlant> {
    try {
      const bucketName = process.env.AWS_BUCKET_NAME!
      const imageKey = `plant-images/${Date.now().toString()}-${imageFileName}`

      console.log('Uploading image file to S3:', { bucketName, imageKey })
      const imageUrl = await uploadFile(bucketName, imageBuffer, imageKey)
      console.log('Image file uploaded to S3:', imageUrl)

      const base64Image = imageBuffer.toString('base64')

      const userPrompt = `Пожалуйста, опишите растение на следующем изображении.`
      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `
              Вы профессиональный ботаник, который занимается определением растений. На основе предоставленного изображения создайте JSON массив, который включает объект с следующими данными:
              имя, описание, местоположение (необязательно), состав почвы (необязательно), температура в доме (необязательно), и солнечное освещение (необязательно). Ответ должен строго соответствовать формату JSON массива и не должен содержать дополнительного текста.
              JSON массив должен выглядеть следующим образом:
              [
                {
                  "name": "Название растения",
                  "description": "Подробное описание растения",
                  "location": "Необязательное местоположение",
                  "soilComposition": "Необязательный состав почвы",
                  "homeTemperature": "Необязательная температура в доме",
                  "sunlightExposure": "Необязательное солнечное освещение"
                }
              ]
            `
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: userPrompt
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${base64Image}`
                }
              }
            ]
          }
        ],
        stream: false
      })

      let messageContent = response.choices[0]?.message?.content || null
      console.log('Received message content:', messageContent)

      if (!messageContent) {
        throw new Error('No content received from OpenAI')
      }

      messageContent = messageContent.replace(/```json|```/g, '').trim()
      const plantDescriptions = JSON.parse(messageContent)

      if (!Array.isArray(plantDescriptions) || plantDescriptions.length === 0) {
        throw new Error('Invalid response format from OpenAI')
      }

      const plantDescription = plantDescriptions[0]

      const newPlant = new PlantModel({
        ...plant,
        image: imageUrl,
        name: plantDescription.name,
        description: plantDescription.description,
        location: plantDescription.location,
        soilComposition: plantDescription.soilComposition,
        homeTemperature: plantDescription.homeTemperature,
        sunlightExposure: plantDescription.sunlightExposure
      })
      console.log('Saving plant to database:', newPlant)
      const savedPlant = await newPlant.save()

      return savedPlant
    } catch (err) {
      console.error('Error creating plant:', err)
      throw err
    }
  }

  async getPlant(id: string): Promise<IPlant | null> {
    try {
      return PlantModel.findById(id)
    } catch (err) {
      console.error('Error getting plant:', err)
      throw err
    }
  }

  async getAllPlants(): Promise<IPlant[]> {
    try {
      return PlantModel.find()
    } catch (err) {
      console.error('Error getting plants:', err)
      throw err
    }
  }

  private calculateNextWateringDates(
    lastWateredDate: Date,
    wateringFrequency: number
  ): Date[] {
    const wateringDates: Date[] = []
    const daysBetweenWatering = Math.floor(7 / wateringFrequency)
    let nextWatering = dayjs(lastWateredDate)

    for (let i = 0; i < wateringFrequency; i++) {
      nextWatering = nextWatering.add(daysBetweenWatering, 'day')
      wateringDates.push(nextWatering.toDate())
    }

    return wateringDates
  }

  async updatePlant(
    id: string,
    plantUpdate: Partial<IPlant>
  ): Promise<IPlant | null> {
    try {
      const plant = await PlantModel.findById(id)
      console.log('updatePlant called with:', { id, plantUpdate })
      if (!plant) throw new Error('Plant not found')

      if (
        plantUpdate.name &&
        plantUpdate.description &&
        plantUpdate.userSoilComposition &&
        plantUpdate.userSunlightExposure
      ) {
        console.log('if statement entered')
        const wateringFrequency = await this.getWateringFrequency(
          plantUpdate.name,
          plantUpdate.description,
          plantUpdate.userSoilComposition,
          plantUpdate.userSunlightExposure
        )
        plantUpdate.wateringFrequency = wateringFrequency

        const lastWateredDate = new Date(
          plantUpdate.lastWateredDate || new Date()
        )

        const nextWateringDates = this.calculateNextWateringDates(
          lastWateredDate,
          wateringFrequency
        )
        plantUpdate.nextWateringDate = nextWateringDates[0]
      }

      Object.assign(plant, plantUpdate)
      const updatedPlant = await plant.save()
      console.log('Plant updated:', updatedPlant)

      return updatedPlant
    } catch (err) {
      console.error('Error updating plant:', err)
      throw err
    }
  }

  async deletePlant(id: string): Promise<IPlant | null> {
    try {
      return PlantModel.findByIdAndDelete(id)
    } catch (err) {
      console.error('Error deleting plant:', err)
      throw err
    }
  }
}

export default PlantService
