// eslint-disable-next-line no-unused-vars
exports.lambdaHandler = async (event, context) => {
    let response
    try {
        response = {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Poetry Parser',
            }),
        }
    } catch (err) {
        console.error(err) // eslint-disable-line no-console
        return err
    }

    return response
}
