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

const parseFile = (content) => {
    const metadataRe = /\[metadata\]/g
    // const metadataPackagesRe = /\[metadata.files\]/g
    const rawPackages = content.split(metadataRe)[0]
    // const lockVersion = metadata
    //     .split(metadataPackagesRe)[0]
    //     .match(/lock-version = "[^"]*"\n/)[0]
    //     .replace(/lock-version = "/, '')
    //     .replace(/["]*\n/, '')
    const packages = parseRawPackages(rawPackages)

    const installed = new Set(Object.keys(packages))
    Object.values(packages).forEach((pack) => {
        Object.values(pack.dependencies).forEach((value) => {
            if (installed.has(value.name)) {
                packages[pack.name].dependencies[value.name].installed = true
                packages[value.name].reverseDependencies = [
                    ...packages[value.name].reverseDependencies,
                    { name: pack.name, installed: installed.has(pack.name) },
                ]
            } else {
                packages[pack.name].dependencies[value.name].installed = false
            }
        })
    })
    return packages
}

module.exports = {
    parseDependency,
    parsePackage,
    parseRawPackages,
    parseFile,
}
