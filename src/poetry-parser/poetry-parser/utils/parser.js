const parsePackage = (content) => {
    const nameRe = /name = "[^"]*"\n/
    const descriptionRe = /description = "(?:[^\\"]|\\")*"\n/
    const optionalRe = /optional = [\w]*\n/
    const pythonVersionsRe = /python-versions = "[^"]*"\n/
    const dependenciesRe = /\[package\.dependencies\]/
    const extrasRe = /\[package\.extras\]/

    const name = content
        .match(nameRe)[0]
        .replace(/name = "/, '')
        .replace(/["]*\n/, '')

    const description = content
        .match(descriptionRe)[0]
        .replace(/description = "/, '')
        .replace(/\\"/g, '"')
        .replace(/["]*\n/, '')

    const optional = content
        .match(optionalRe)[0]
        .replace(/optional = /, '')
        .replace(/\n/, '')

    const pythonVersions = content
        .match(pythonVersionsRe)[0]
        .replace(/python-versions = "/, '')
        .replace(/["]*\n/, '')
        .split(/,/)
        .map((value) => value.trim())

    const parsed = {
        name,
        description,
        optional,
        pythonVersions,
    }

    if (content.search(dependenciesRe) !== -1) {
        parsed.dependencies = content
            .split(dependenciesRe)[1]
            .split(/\n\n/)[0]
            .split(/\n/)
            .map((value) => value.split(/ = /)[0])
            .filter((value) => value !== '')
    }
    if (content.search(extrasRe) !== -1) {
        parsed.extras = content
            .split(extrasRe)[1]
            .replace(/\n\n/, '')
            .split(/\n/)
            .filter((value) => value !== '')
            .map((value) => {
                const object = {}
                const splited = value.split(/ = /)
                if (splited.length > 1) {
                    const packages = JSON.parse(splited[1])

                    object[splited[0]] = packages.map(
                        (subvalue) => subvalue.split(/ /)[0]
                    )
                }
                return object
            })
    }

    return parsed
}

const parseFile = (content) => {
    const packageRe = /\[\[package\]\]/g
    const metadataRe = /\[metadata\]/g
    // const metadataPackagesRe = /\[metadata.files\]/g
    const packages = content.split(metadataRe)[0]
    // const lockVersion = metadata
    //     .split(metadataPackagesRe)[0]
    //     .match(/lock-version = "[^"]*"\n/)[0]
    //     .replace(/lock-version = "/, '')
    //     .replace(/["]*\n/, '')

    return packages
        .split(packageRe)
        .filter((value) => value !== '')
        .map((value) => parsePackage(value))
}

module.exports = {
    parsePackage,
    parseFile,
}
