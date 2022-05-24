const { parseFile } = require('./utils/parser')

/** lambdaHandler parses poetry.lock -file into JSON based on binary file input
 *
 * @param {*} event - AWS Lambda event
 * @param {*} context - AWS Lamba context
 * @returns {Object} - parsed file as JSON
 */
// eslint-disable-next-line no-unused-vars
exports.lambdaHandler = async (event, context) => {
    let response

    try {
        if (event.body === null || event.body === undefined) {
            throw new Error('Empty Body')
        }

        let lockFile = event.body
        if (event.isBase64Encoded) {
            lockFile = Buffer.from(lockFile, 'base64').toString('utf-8')
        }

        const [packages, lockVersion] = parseFile(lockFile)

        response = {
            statusCode: 200,
            body: JSON.stringify(
                {
                    packages,
                    lockVersion,
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
        console.log(err) // eslint-disable-line no-console
        response = {
            statusCode: 400,
            body: JSON.stringify(
                {
                    error: '400 Bad request',
                },
                null,
                4
            ),
        }
    }

    return response
}
