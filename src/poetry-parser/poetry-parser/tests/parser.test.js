const {
    parsePackage,
    parseFile,
    parseDependency,
    parseRawPackages,
} = require('../utils/parser')

const atomicwritesResult = require('./mocks/atomicwrites.json')
const attrsResult = require('./mocks/attrs.json')
const cachecontrolResult = require('./mocks/cachecontrol.json')
const idnaResult = require('./mocks/idna.json')
const importlibmetadataResult = require('./mocks/importlib-metadata.json')
const pexpectResult = require('./mocks/pexpect.json')
const platformDirsResult = require('./mocks/platformdirs.json')
const pluggyResult = require('./mocks/pluggy.json')
const poetryPluginExportResult = require('./mocks/poetry-plugin-export.json')
const shellinghamResult = require('./mocks/shellingham.json')

const poetryInput = require('./mocks/poetryLockFileInput.json')
const poetryOutput = require('./mocks/poetryLockFileOutput.json')
const poetryRawOutput = require('./mocks/poetryLockFileOutputRaw.json')

describe('parseDependency works correctly', () => {
    test('basic dependency with just version info works', () => {
        const result = parseDependency('msgpack = ">=0.5.2"')
        expect(result).toStrictEqual({
            name: 'msgpack',
            optional: false,
        })
    })
    test('basic dependency with flag optional works', () => {
        const result = parseDependency(
            'lockfile = {version = ">=0.9", optional = true, markers = "extra == "filecache""}'
        )
        expect(result).toStrictEqual({
            name: 'lockfile',
            optional: true,
        })
    })
    test('basic dependency with flags but no optional works', () => {
        const result = parseDependency(
            'typing-extensions = {version = ">=3.6.4", markers = "python_version < "3.8""}'
        )
        expect(result).toStrictEqual({
            name: 'typing-extensions',
            optional: false,
        })
    })
})

describe('parsePackage works correctly', () => {
    test('parsePackage works with no extras', () => {
        const content =
            '\nname = "atomicwrites"\nversion = "1.4.0"\ndescription = "Atomic file writes."\ncategory = "dev"\noptional = false\npython-versions = ">=2.7, !=3.0.*, !=3.1.*, !=3.2.*, !=3.3.*"\n\n'
        const result = parsePackage(content)
        expect(result).toStrictEqual(atomicwritesResult)
    })
    test('parsePackage works with dependencies', () => {
        const content =
            '\nname = "pexpect"\nversion = "4.8.0"\ndescription = "Pexpect allows easy control of interactive console applications."\ncategory = "main"\noptional = false\npython-versions = "*"\n\n[package.dependencies]\nptyprocess = ">=0.5"\n\n'
        const result = parsePackage(content)
        expect(result).toStrictEqual(pexpectResult)
    })
    test('parsePackage works with extras', () => {
        const content =
            '\nname = "attrs"\nversion = "21.4.0"\ndescription = "Classes Without Boilerplate"\ncategory = "dev"\noptional = false\npython-versions = ">=2.7, !=3.0.*, !=3.1.*, !=3.2.*, !=3.3.*, !=3.4.*"\n\n[package.extras]\ndev = ["coverage[toml] (>=5.0.2)", "hypothesis", "pympler", "pytest (>=4.3.0)", "six", "mypy", "pytest-mypy-plugins", "zope.interface", "furo", "sphinx", "sphinx-notfound-page", "pre-commit", "cloudpickle"]\ndocs = ["furo", "sphinx", "zope.interface", "sphinx-notfound-page"]\ntests = ["coverage[toml] (>=5.0.2)", "hypothesis", "pympler", "pytest (>=4.3.0)", "six", "mypy", "pytest-mypy-plugins", "zope.interface", "cloudpickle"]\ntests_no_zope = ["coverage[toml] (>=5.0.2)", "hypothesis", "pympler", "pytest (>=4.3.0)", "six", "mypy", "pytest-mypy-plugins", "cloudpickle"]\n\n'
        const result = parsePackage(content)
        expect(result).toStrictEqual(attrsResult)
    })

    test('parsePackage works with special characters in description', () => {
        const content =
            '\nname = "idna"\nversion = "3.3"\ndescription = "Internationalized Domain Names in Applications (IDNA)"\ncategory = "main"\noptional = false\npython-versions = ">=3.5"\n\n'
        const result = parsePackage(content)
        expect(result).toStrictEqual(idnaResult)
    })

    test('parsePackage works with " in description', () => {
        const content =
            '\nname = "platformdirs"\nversion = "2.5.2"\ndescription = "A small Python module for determining appropriate platform-specific dirs, e.g. a \\"user data dir\\"."\ncategory = "main"\noptional = false\npython-versions = ">=3.7"\n\n[package.extras]\ndocs = ["furo (>=2021.7.5b38)", "proselint (>=0.10.2)", "sphinx-autodoc-typehints (>=1.12)", "sphinx (>=4)"]\ntest = ["appdirs (==1.4.4)", "pytest-cov (>=2.7)", "pytest-mock (>=3.6)", "pytest (>=6)"]\n\n'
        const result = parsePackage(content)
        expect(result).toStrictEqual(platformDirsResult)
    })

    test('parsePackage works both dependencies and extras', () => {
        const content =
            '\nname = "pluggy"\nversion = "1.0.0"\ndescription = "plugin and hook calling mechanisms for python"\ncategory = "dev"\noptional = false\npython-versions = ">=3.6"\n\n[package.dependencies]\nimportlib-metadata = {version = ">=0.12", markers = "python_version < \\"3.8\\""}\n\n[package.extras]\ndev = ["pre-commit", "tox"]\ntesting = ["pytest", "pytest-benchmark"]\n\n'
        const result = parsePackage(content)
        expect(result).toStrictEqual(pluggyResult)
    })

    test('parsePackage works with special characters in name', () => {
        const content =
            '\nname = "poetry-plugin-export"\nversion = "1.0.2"\ndescription = "Poetry plugin to export the dependencies to various formats"\ncategory = "main"\noptional = false\npython-versions = ">=3.7,<4.0"\n\n[package.dependencies]\npoetry = ">=1.2.0b1dev0,<2.0.0"\n\n'
        const result = parsePackage(content)
        expect(result).toStrictEqual(poetryPluginExportResult)
    })

    test('parsePackage works with no space after comma in Python Version', () => {
        const content =
            '\nname = "shellingham"\nversion = "1.4.0"\ndescription = "Tool to Detect Surrounding Shell"\ncategory = "main"\noptional = false\npython-versions = "!=3.0,!=3.1,!=3.2,!=3.3,>=2.6"\n\n'
        const result = parsePackage(content)
        expect(result).toStrictEqual(shellinghamResult)
    })

    test('parsePackage works with optionals in two places', () => {
        const content =
            '\nname = "cachecontrol"\nversion = "0.12.11"\ndescription = "httplib2 caching for requests"\ncategory = "main"\noptional = false\npython-versions = ">=3.6"\n\n[package.dependencies]\nlockfile = {version = ">=0.9", optional = true, markers = "extra == "filecache""}\nmsgpack = ">=0.5.2"\nrequests = "*"\n\n[package.extras]\nfilecache = ["lockfile (>=0.9)"]\nredis = ["redis (>=2.10.5)"]'
        const result = parsePackage(content)
        expect(result).toStrictEqual(cachecontrolResult)
    })

    test('parsePackage works when no optional, but other attributes given in dependency flags', () => {
        const content =
            '\nname = "importlib-metadata"\nversion = "4.11.3"\ndescription = "Read metadata from Python packages"\ncategory = "main"\noptional = false\npython-versions = ">=3.7"\n\n[package.dependencies]\ntyping-extensions = {version = ">=3.6.4", markers = "python_version < "3.8""}\nzipp = ">=0.5"\n\n[package.extras]\ndocs = ["sphinx", "jaraco.packaging (>=9)", "rst.linker (>=1.9)"]\nperf = ["ipython"]\ntesting = ["pytest (>=6)", "pytest-checkdocs (>=2.4)", "pytest-flake8", "pytest-cov", "pytest-enabler (>=1.0.1)", "packaging", "pyfakefs", "flufl.flake8", "pytest-perf (>=0.9.2)", "pytest-black (>=0.3.7)", "pytest-mypy (>=0.9.1)", "importlib-resources (>=1.3)"]\n'
        const result = parsePackage(content)
        expect(result).toStrictEqual(importlibmetadataResult)
    })
})

describe('parseFile works correctly', () => {
    test('parseFile works correctly', () => {
        const result = parseFile(poetryInput.lockFile)
        expect(result).toStrictEqual([poetryOutput, '1.1'])
    })
})

describe('parseRawPackages works correctly', () => {
    test('parseRawPackages works correctly', () => {
        const result = parseRawPackages(poetryInput.lockFileRaw)
        expect(result).toStrictEqual(poetryRawOutput)
    })
})
