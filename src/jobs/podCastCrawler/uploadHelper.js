const AWS = require('aws-sdk')
const request = require('request-promise')
const { v4: uuidv4 } = require('uuid')

module.exports = async (podcast) => {
    const s3bucket = new AWS.S3({
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	})

    const options = {
        uri: podcast.audioUrl,
        encoding: null
    };

    const body = await request(options)

    const params = {
		Bucket: process.env.AWS_S3_BUCKET_NAME,
		Key: uuidv4(),
		Body: body,
		ACL: 'public-read',
		ContentType: 'audio/mp3',
	}

    try {
        const s3Response = await s3bucket.upload(params).promise()
        return {success: true, response: s3Response}
    } catch(error) {
        console.log("Err in uploading", error)
        return {success: false}
    }
}