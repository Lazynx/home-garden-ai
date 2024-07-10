import openai from '../../openai'
import { uploadFile, deleteFile } from '../../middlewares/s3-middleware'

class DiseaseService {
  private async askQuestion(
    question: string,
    previousContext: any
  ): Promise<string> {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `
            Вы ботаник, специализирующийся на болезнях растений. Задайте уточняющий вопрос или выдай диагноз. В диагнозе распиши подробно проблему и чем она возможна была вызвана. Кроме того, если нужны удобрения - ВЫДАЙ ТОЧНЫЕ НАЗВАНИЯ УДОБРЕНИЙ для решения проблемы.  Ответ в формате JSON:
              [
                {
                  "question": "Ваш уточняющий вопрос",
                  "diagnosis": "Диагноз, если все вопросы заданы"
                }
              ]
            `
          },
          ...previousContext,
          {
            role: 'user',
            content: question
          }
        ],
        stream: false
      })

      const messageContent = response.choices[0]?.message?.content || null
      console.log('Received message content:', messageContent)

      if (!messageContent) {
        throw new Error('No content received from OpenAI')
      }

      const formattedContent = messageContent.replace(/```json|```/g, '').trim()
      console.log('Formatted message content:', formattedContent)
      return formattedContent
    } catch (error) {
      console.error('Error in askQuestion:', error)
      throw error
    }
  }

  async diagnosePlantDisease(
    imageBuffer: Buffer,
    imageFileName: string
  ): Promise<{ questions: string[]; initialDiagnosis?: string; context: any }> {
    const bucketName = process.env.AWS_BUCKET_NAME!
    const imageKey = `plant-disease-images/${Date.now().toString()}-${imageFileName}`

    try {
      console.log('Uploading image file to S3:', { bucketName, imageKey })
      const imageUrl = await uploadFile(bucketName, imageBuffer, imageKey)
      console.log('Image file uploaded to S3:', imageUrl)

      const base64Image = imageBuffer.toString('base64')

      const userPrompt = `Опишите болезнь растения на изображении.`
      const initialResponse = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `
            Вы ботаник, специализирующийся на болезнях растений. Задайте уточняющий вопрос или выдай диагноз. В диагнозе распиши подробно проблему и чем она возможна была вызвана. Кроме того, если нужны удобрения - ВЫДАЙ ТОЧНЫЕ НАЗВАНИЯ УДОБРЕНИЙ для решения проблемы.  Ответ в формате JSON:
              [
                {
                  "question": "Ваш уточняющий вопрос",
                  "diagnosis": "Диагноз, если все вопросы заданы"
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

      const messageContent =
        initialResponse.choices[0]?.message?.content || null
      console.log('Received message content:', messageContent)

      if (!messageContent) {
        throw new Error('No content received from OpenAI')
      }

      const formattedContent = messageContent.replace(/```json|```/g, '').trim()
      console.log('Formatted message content:', formattedContent)

      const questionData = JSON.parse(formattedContent)
      console.log('Parsed question data:', questionData)

      if (
        !Array.isArray(questionData) ||
        questionData.length === 0 ||
        (!questionData[0].question && !questionData[0].diagnosis)
      ) {
        throw new Error('Invalid response format from OpenAI')
      }

      return {
        questions: questionData.map((item: any) => item.question),
        initialDiagnosis: questionData[0].diagnosis,
        context: [
          {
            role: 'system',
            content: `
              Вы ботаник, специализирующийся на болезнях растений. Задайте уточняющий вопрос или выдай диагноз. В диагнозе распиши подробно проблему и чем она возможна была вызвана. Кроме того, если нужны удобрения - ВЫДАЙ ТОЧНЫЕ НАЗВАНИЯ УДОБРЕНИЙ для решения проблемы. Ответ в формате JSON:
              [
                {
                  "question": "Ваш уточняющий вопрос",
                  "diagnosis": "Диагноз, если все вопросы заданы"
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
          },
          ...questionData.map((item: any) => ({
            role: 'assistant',
            content: item.question
          }))
        ]
      }
    } catch (err) {
      console.error('Error diagnosing plant disease:', err)
      await deleteFile(bucketName, imageKey) // Delete the file if there is an error
      throw err
    }
  }

  async continueDiagnosis(
    userAnswer: string,
    previousContext: any
  ): Promise<{ questions: string[]; finalDiagnosis?: string; context: any }> {
    try {
      const response = await this.askQuestion(userAnswer, previousContext)
      console.log('Continue diagnosis response:', response)

      const questionData = JSON.parse(response)
      console.log('Parsed continue diagnosis data:', questionData)

      if (
        !Array.isArray(questionData) ||
        questionData.length === 0 ||
        (!questionData[0].question && !questionData[0].diagnosis)
      ) {
        throw new Error('Invalid response format from OpenAI')
      }

      return {
        questions: questionData.map((item: any) => item.question),
        finalDiagnosis: questionData[0].diagnosis,
        context: [
          ...previousContext,
          {
            role: 'user',
            content: userAnswer
          },
          ...questionData.map((item: any) => ({
            role: 'assistant',
            content: item.question
          }))
        ]
      }
    } catch (err) {
      console.error('Error continuing diagnosis:', err)
      throw err
    }
  }
}

export default DiseaseService
