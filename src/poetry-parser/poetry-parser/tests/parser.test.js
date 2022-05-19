const { parsePackage, parseFile } = require('../utils/parser')

const atomicwritesResult = require('./mocks/atomicwrites.json')
const attrsResult = require('./mocks/attrs.json')
const idnaResult = require('./mocks/idna.json')
const pexpectResult = require('./mocks/pexpect.json')
const platformDirsResult = require('./mocks/platformdirs.json')
const pluggyResult = require('./mocks/pluggy.json')
const poetryPluginExportResult = require('./mocks/poetry-plugin-export.json')
const shellinghamResult = require('./mocks/shellingham.json')

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
})

describe('parseFile works correctly', () => {
    test('parseFile works with correctly', () => {
        const content =
            '[[package]]\nname = "atomicwrites"\nversion = "1.4.0"\ndescription = "Atomic file writes."\ncategory = "dev"\noptional = false\npython-versions = ">=2.7, !=3.0.*, !=3.1.*, !=3.2.*, !=3.3.*"\n\n[[package]]\nname = "attrs"\nversion = "21.4.0"\ndescription = "Classes Without Boilerplate"\ncategory = "dev"\noptional = false\npython-versions = ">=2.7, !=3.0.*, !=3.1.*, !=3.2.*, !=3.3.*, !=3.4.*"\n\n[package.extras]\ndev = ["coverage[toml] (>=5.0.2)", "hypothesis", "pympler", "pytest (>=4.3.0)", "six", "mypy", "pytest-mypy-plugins", "zope.interface", "furo", "sphinx", "sphinx-notfound-page", "pre-commit", "cloudpickle"]\ndocs = ["furo", "sphinx", "zope.interface", "sphinx-notfound-page"]\ntests = ["coverage[toml] (>=5.0.2)", "hypothesis", "pympler", "pytest (>=4.3.0)", "six", "mypy", "pytest-mypy-plugins", "zope.interface", "cloudpickle"]\ntests_no_zope = ["coverage[toml] (>=5.0.2)", "hypothesis", "pympler", "pytest (>=4.3.0)", "six", "mypy", "pytest-mypy-plugins", "cloudpickle"]\n\n[[package]]\nname = "pexpect"\nversion = "4.8.0"\ndescription = "Pexpect allows easy control of interactive console applications."\ncategory = "main"\noptional = false\npython-versions = "*"\n\n[package.dependencies]\nptyprocess = ">=0.5"\n\n[metadata]\nlock-version = "1.1"\npython-versions = "^3.7"\ncontent-hash = "2faf18664a94b0dc94c937c24fe8fdbf95aefe3e6bc85e2346fe935047bca353"\n\n[metadata.files]\natomicwrites = [\n    {file = "atomicwrites-1.4.0-py2.py3-none-any.whl", hash = "sha256:6d1784dea7c0c8d4a5172b6c620f40b6e4cbfdf96d783691f2e1302a7b88e197"},\n    {file = "atomicwrites-1.4.0.tar.gz", hash = "sha256:ae70396ad1a434f9c7046fd2dd196fc04b12f9e91ffb859164193be8b6168a7a"},\n]\n'
        const result = parseFile(content)
        expect(result).toStrictEqual([
            atomicwritesResult,
            attrsResult,
            pexpectResult,
        ])
    })
})
