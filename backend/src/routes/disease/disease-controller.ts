import { Request, Response } from 'express'
import DiseaseService from './disease-service'

class DiseaseController {
  constructor(private diseaseService: DiseaseService) {}

  diagnosePlantDisease = async (req: Request, res: Response) => {
    const { file } = req
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    try {
      const result = await this.diseaseService.diagnosePlantDisease(
        file.buffer,
        file.originalname
      )
      res.json({
        questions: result.questions,
        questionsEn: result.questionsEn,
        initialDiagnosis: result.initialDiagnosis,
        initialDiagnosisEn: result.initialDiagnosisEn,
        context: result.context
      })
    } catch (err) {
      console.error('Error in diagnosePlantDisease:', err)
      res.status(500).json({ error: 'Error diagnosing plant disease' })
    }
  }

  continueDiagnosis = async (req: Request, res: Response) => {
    const { userAnswer, previousContext } = req.body

    if (!userAnswer || !previousContext) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    try {
      const result = await this.diseaseService.continueDiagnosis(
        userAnswer,
        previousContext
      )
      res.json({
        questions: result.questions,
        questionsEn: result.questionsEn,
        finalDiagnosis: result.finalDiagnosis,
        finalDiagnosisEn: result.finalDiagnosisEn,
        context: result.context
      })
    } catch (err) {
      console.error('Error in continueDiagnosis:', err)
      res.status(500).json({ error: 'Error continuing diagnosis' })
    }
  }
}

export default DiseaseController
