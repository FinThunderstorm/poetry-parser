const app = require('../app')

let event
let context

describe('Lambda returns answer', () => {
    test('Response can be successful', async () => {
        const result = await app.lambdaHandler(event, context)

        expect(typeof result).toBe('object')
        expect(result.statusCode).toBe(200)
        expect(typeof result.body).toMatch('string')

        const response = JSON.parse(result.body)

        expect(typeof response).toMatch('object')
        expect(response.message).toMatch('Poetry Parser')
    })
})
