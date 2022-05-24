/** parseDependency is used to parse information for one dependency in package
 *
 * @param {string} content - parsed string containing one dependency information
 * @returns {Object} - parsed dependency
 */
const parseDependency = (content) => {
    const dependency = {
        name: content.split(/ = /)[0],
        optional: false,
    }

    if (content.search(/ = {/) !== -1) {
        const optionalRe = /optional = (?:true|false)/
        dependency.optional =
            content.search(optionalRe) !== -1
                ? content.match(optionalRe)[0].replace(/optional = /, '') ===
                  'true'
                : false
    }
    return dependency
}

/** parsePackage is used to parse information for one package
 *
 * @param {string} content - parsed string containing one package information
 * @returns {Object} - parsed package
 */
const parsePackage = (content) => {
    const nameRe = /name = "[^"]*"\n/
    const descriptionRe = /description = "(?:[^\\"]|\\")*"\n/
    const optionalRe = /optional = [\w]*\n/
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

    const parsed = {
        name,
        description,
        optional,
        dependencies: {},
        reverseDependencies: [],
    }

    if (content.search(dependenciesRe) !== -1) {
        content
            .split(dependenciesRe)[1]
            .split(/\n\n/)[0]
            .split(/\n/)
            .filter((value) => value !== '')
            .forEach((value) => {
                const dep = parseDependency(value)
                dep.source = 'dependencies'
                parsed.dependencies[dep.name] = dep
            })
    }

    if (content.search(extrasRe) !== -1) {
        content
            .split(extrasRe)[1]
            .replace(/\n\n/, '')
            .split(/\n/)
            .filter((value) => value !== '')
            .forEach((value) => {
                const splited = value.split(/ = /)
                if (splited.length > 1) {
                    const packages = JSON.parse(splited[1])

                    packages.forEach((subvalue) => {
                        const subname = subvalue.split(/ /)[0]
                        parsed.dependencies[subname] = {
                            name: subname,
                            category: splited[0],
                            optional: true,
                            source: 'extras',
                        }
                    })
                }
            })
    }

    return parsed
}

/** parseRawPackages is used to parse all packages
 *
 * @param {string} content - parsed string containing all package information
 * @returns {Object} - parsed packages
 */
const parseRawPackages = (rawPackages) => {
    const packageRe = /\[\[package\]\]/g
    const packages = {}

    rawPackages
        .split(packageRe)
        .filter((value) => value !== '')
        .forEach((value) => {
            const p = parsePackage(value)
            packages[p.name] = p
        })

    return packages
}

/** parseFile is used to parse poetry.lock -file
 *
 * @param {string} content - parsed string containing poetry.lock -file
 * @returns {Array} - parsed packages and lock-file's version
 */
const parseFile = (content) => {
    const metadataRe = /\[metadata\]/g
    const metadataPackagesRe = /\[metadata.files\]/g
    const [rawPackages, metadata] = content.split(metadataRe)

    const lockVersion = metadata
        .split(metadataPackagesRe)[0]
        .match(/lock-version = "[^"]*"\n/)[0]
        .replace(/lock-version = "/, '')
        .replace(/["]*\n/, '')

    const packages = parseRawPackages(rawPackages)

    Object.values(packages).forEach((parent) => {
        Object.values(parent.dependencies).forEach((dependency) => {
            if (dependency.name in packages) {
                packages[parent.name].dependencies[
                    dependency.name
                ].installed = true
                packages[dependency.name].reverseDependencies = [
                    ...packages[dependency.name].reverseDependencies,
                    {
                        name: parent.name,
                        installed: dependency.name in packages,
                    },
                ]
            } else {
                packages[parent.name].dependencies[
                    dependency.name
                ].installed = false
            }
        })
    })
    return [packages, lockVersion]
}

module.exports = {
    parseDependency,
    parsePackage,
    parseRawPackages,
    parseFile,
}
