import PlantModel, { IPlant } from './models/Plant'
import { uploadFile } from '../../middlewares/s3-middleware'
import mongoose from 'mongoose'
import openai from '../../openai'
import axios from 'axios'

class PlantService {
  private async *processStreamedJsonArray(
    stream: AsyncIterable<any>
  ): AsyncGenerator<string> {
    let accumulator = '' // Accumulate JSON object characters
    let depth = 0 // Depth of nested JSON structures
    let isInString = false // Whether the current context is within a string

    for await (const part of stream) {
      const chunk = part.choices[0]?.delta?.content // Extract content from the stream part

      if (chunk) {
        for (const char of chunk) {
          // Toggle isInString when encountering a quote that isn't escaped
          if (char === '"' && (accumulator.slice(-1) !== '\\' || isInString)) {
            isInString = !isInString
          }

          // Accumulate characters if within an object or string
          if (isInString || depth > 0) {
            accumulator += char
          }

          // Adjust depth based on the current character if not within a string
          if (!isInString) {
            if (char === '{') {
              depth++ // Increase depth at the start of an object
              if (depth === 1) {
                accumulator = '{' // Ensure accumulator starts with an opening brace for a new object
              }
            } else if (char === '}') {
              depth-- // Decrease depth at the end of an object
            }
          }

          // Attempt to parse when depth returns to 0, indicating the end of an object
          if (depth === 0 && !isInString && accumulator.trim() !== '') {
            try {
              const parsedObject = JSON.parse(accumulator) // Parse the accumulated string as JSON
              yield parsedObject // Yield the parsed JSON object
            } catch (e) {
              console.error('Error parsing JSON:', e) // Log parsing errors
            }
            accumulator = '' // Reset accumulator for the next JSON object
          }
        }
      }
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

      // Конвертация изображения в base64 строку
      const base64Image = imageBuffer.toString('base64')

      // Отправка изображения в ChatGPT для получения описания
      // const userPrompt = `Please describe the plant in the following image.`
      // const response = await openai.chat.completions.create({
      //   model: 'gpt-4o',
      //   messages: [
      //     {
      //       role: 'system',
      //       content: `
      //         You are a professional plant identifier. Based on the image provided, generate a JSON array that includes an object with the following details:
      //         name, description, location (optional), soilComposition (optional), homeTemperature (optional), and sunlightExposure (optional). The response should be strictly JSON array formatted and include no additional text.
      //         The JSON array should look like this:
      //         [
      //           {
      //             "name": "Plant Name",
      //             "description": "Detailed description of the plant",
      //             "location": "Optional location",
      //             "soilComposition": "Optional soil composition",
      //             "homeTemperature": "Optional home temperature",
      //             "sunlightExposure": "Optional sunlight exposure"
      //           }
      //         ]
      //       `
      //     },
      //     {
      //       role: 'user',
      //       content: [
      //         {
      //           type: 'text',
      //           text: userPrompt
      //         },
      //         {
      //           type: 'image_url',
      //           image_url: {
      //             url: `data:image/jpeg;base64,${base64Image}`
      //           }
      //         }
      //       ]
      //     }
      //   ],
      //   stream: false
      // })
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

      // Удаление возможных форматирующих символов
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

  async updatePlant(
    id: string,
    plantUpdate: Partial<IPlant>,
    imageBuffer?: Buffer,
    imageFileName?: string
  ): Promise<IPlant | null> {
    try {
      let imageUrl: string | undefined
      if (imageBuffer && imageFileName) {
        const bucketName = process.env.AWS_BUCKET_NAME!
        const imageKey = `plants/${Date.now().toString()}-${imageFileName}`

        console.log('Uploading image file to S3:', { bucketName, imageKey })
        imageUrl = await uploadFile(bucketName, imageBuffer, imageKey)
        console.log('Image file uploaded to S3:', imageUrl)
      }

      const plant = await PlantModel.findById(id)
      if (!plant) throw new Error('Plant not found')

      if (imageUrl) {
        plantUpdate.image = imageUrl
      }

      Object.assign(plant, plantUpdate)
      const updatedPlant = await plant.save()

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
