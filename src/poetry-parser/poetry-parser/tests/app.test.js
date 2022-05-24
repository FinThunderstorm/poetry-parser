const app = require('../app')

const poetryLockFileEvent = require('../../events/poetryslockfileEvent.json')
const poetryLockFileEventEmptyBody = require('../../events/poetryslockfileEventEmptyBody.json')
const poetryLockFileResult = require('./mocks/poetryLockFileOutput.json')

let context

describe('Lambda returns answer', () => {
    test('Body is normal and successful response', async () => {
        const result = await app.lambdaHandler(poetryLockFileEvent, context)
        expect(typeof result).toBe('object')
        expect(result.statusCode).toBe(200)
        expect(typeof result.body).toMatch('string')
        const response = JSON.parse(result.body)
        expect(typeof response).toMatch('object')
        expect(typeof response.packages).toMatch('object')
        expect(response.packages).toStrictEqual(poetryLockFileResult)
    })

    test('Empty body and error response', async () => {
        const result = await app.lambdaHandler(
            poetryLockFileEventEmptyBody,
            context
        )
        expect(typeof result).toBe('object')
        expect(result.statusCode).toBe(400)
        expect(typeof result.body).toMatch('string')
        const response = JSON.parse(result.body)
        expect(typeof response).toMatch('object')
        expect(response.error).toMatch('400 Bad request')
    })
})
