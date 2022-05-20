/* eslint-disable max-classes-per-file */
const { parseFile } = require('./utils/parser')

// class ContentTypeException extends Error {
//     constructor(message) {
//         super(message)
//         this.name = 'ContentTypeException'
//         this.statusCode = 400
//         this.extMessage = '400 Bad Request'
//     }
// }

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

    // eslint-disable-next-line no-console
    // console.log(
    //     'Body:',
    //     typeof event.body,
    //     '-',
    //     JSON.stringify(event.body, null, 2)
    // )

    // eslint-disable-next-line no-console
    console.log('Event keys:')
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(event)) {
        // eslint-disable-next-line no-console
        console.log(`  - ${key}`)
        // eslint-disable-next-line no-console
        console.log(`  > ${JSON.stringify(value)}`)
    }

    // eslint-disable-next-line no-console
    console.log('Headers:')
    if (event.headers) {
        // eslint-disable-next-line no-restricted-syntax
        for (const [key, value] of Object.entries(event.headers)) {
            // eslint-disable-next-line no-console
            console.log(`  - ${key}: ${value}`)
        }
    }

    try {
        if (event.body === null || event.body === undefined) {
            throw new BodyException('Empty Body')
        }

        // if (event.headers['Content-Type'] === undefined) {
        //     throw new ContentTypeException('Content-Type Header Missing')
        // }
        // const contentTypeHeader = event.headers['Content-Type'].split(/; /)

        // if (contentTypeHeader.length !== 2) {
        //     throw new ContentTypeException(
        //         'Content-Type Header Information Incorrect'
        //     )
        // }

        // const contentType = contentTypeHeader[0]

        // if (contentType !== 'multipart/form-data') {
        //     throw new ContentTypeException('Illegal Content-Type')
        // }

        // const boundary = contentTypeHeader[1].replace(/boundary=/, '')

        const lockFile = event.body
        // .split(`--${boundary}`)
        // .filter((value) => value !== '' && value !== '--\r\n')[0]
        // .split(/\r\n/)
        // .filter((value) => value !== '')
        // .at(-1)

        // eslint-disable-next-line no-console
        // console.log(JSON.stringify(lockFile, null, 2))
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
