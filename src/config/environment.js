require('dotenv').config({
	path: process.env.NODE_ENV === 'production' ? '.env' : `.env.${process.env.NODE_ENV}`,
	// path: process.env.NODE_ENV === 'production' ? '.env' : `.env.test`,
})

const config = {
	DATABASE_URL: process.env.DATABASE_URL,
	PORT: process.env.PORT,
	AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
	AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
	AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME
}

module.exports = config
