const request = require('supertest')
const app = require('../../src/app')

describe('Welcome Route', () => {
	it('should return proper response', async () => {
		const { status, body } = await request(app).get('/nepaltoday-podcast/api/v1')

		expect(status).toBe(200)
		expect(body).toHaveProperty('message', 'UHUL! The API is UP && RUNNING!!!')
	})
})
