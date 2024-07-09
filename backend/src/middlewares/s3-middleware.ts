import { S3 } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'

export const s3 = new S3({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  }
})

export const uploadFile = async (
  bucketName: string,
  fileBuffer: Buffer,
  key: string
): Promise<string | undefined> => {
  try {
    const upload = new Upload({
      client: s3,
      params: {
        Bucket: bucketName,
        Key: key,
        Body: fileBuffer
      }
    })

    upload.on('httpUploadProgress', (progress) => {
      console.log(progress)
    })

    const result = await upload.done()
    console.log(`File uploaded successfully to ${bucketName}/${key}`)
    return result.Location
  } catch (err) {
    console.error('Error uploading file:', err)
    throw err
  }
}

export const deleteFile = async (
  bucketName: string,
  key: string
): Promise<void> => {
  try {
    await s3.deleteObject({
      Bucket: bucketName,
      Key: key
    })
    console.log(`File deleted successfully from ${bucketName}/${key}`)
  } catch (err) {
    console.error('Error deleting file:', err)
    throw err
  }
}
