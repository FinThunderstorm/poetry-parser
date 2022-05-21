const { parseFile } = require('./utils/parser')

class BodyException extends Error {
    constructor(message) {
        super(message)
        this.name = 'BodyException'
        this.statusCode = 400
        this.extMessage = '400 Bad Request'
    }
}

// eslint-disable-next-line no-unused-vars
exports.lambdaHandler = async (event, context) => {
    let response

    try {
        if (event.body === null || event.body === undefined) {
            throw new BodyException('Empty Body')
        }

        let lockFile = event.body
        if (event.isBase64Encoded) {
            lockFile = Buffer.from(lockFile, 'base64').toString('utf-8')
        }

        const packages = parseFile(lockFile)

        response = {
            statusCode: 200,
            body: JSON.stringify(
                {
                    packages,
                },
                null,
                4
            ),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
        }
    } catch (err) {
        console.error(err) // eslint-disable-line no-console
        response = {
            statusCode: err.statusCode,
            body: JSON.stringify(
                {
                    error: err.extMessage,
                },
                null,
                4
            ),
        }
    }

    return response
}
