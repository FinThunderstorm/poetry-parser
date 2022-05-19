const { parseFile } = require('./utils/parser')

const ContentTypeException = (message) => {
    this.message = message
    this.name = 'ContentTypeException'
}

// eslint-disable-next-line no-unused-vars
exports.lambdaHandler = async (event, context) => {
    let response

    try {
        const contentTypeHeader = event.headers['Content-Type'].split(/; /)
        const contentType = contentTypeHeader[0]

        if (contentType !== 'multipart/form-data') {
            throw new ContentTypeException('Illegal Content-Type')
        }

        const boundary = contentTypeHeader[1].replace(/boundary=/, '')

        const lockFile = event.body
            .split(`--${boundary}`)
            .filter((value) => value !== '' && value !== '--\r\n')[0]
            .split(/\r\n/)
            .filter((value) => value !== '')
            .at(-1)

        // eslint-disable-next-line no-console
        console.log(JSON.stringify(lockFile, null, 2))
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
        }
    } catch (err) {
        console.error(err) // eslint-disable-line no-console
        return err
    }

    return response
}
