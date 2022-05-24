describe('Welcome', () => {
    it('front page can be opened', () => {
        cy.visit('http://localhost:3000')
        cy.contains('Welcome to poetry-parser!')
        cy.contains(
            'Begin explorating your poetry.lock -file by uploading file.'
        )
    })
})

describe('Upload', () => {
    it('Upload is reached from front page', () => {
        cy.visit('http://localhost:3000')
        cy.contains('Welcome to poetry-parser!')
        cy.contains('Upload').click()
        cy.contains('Upload poetry.lock -file')
    })
    it('Upload file works', () => {
        cy.intercept('POST', '*/parse', {
            fixture: 'poetryLockFileOutput.json',
        })
        cy.visit('http://localhost:3000/upload')
        cy.contains('Upload poetry.lock -file')
        cy.fixture('poetry.lock').then((file) => {
            cy.get('input[type="file"]').attachFile({
                fileContent: file.toString(),
                fileName: 'poetry.lock',
                mimeType: 'text/plain',
            })
        })
        cy.contains('Submit').click()
        cy.contains('Packages:')
        cy.contains('atomicwrites')
        cy.contains('attrs')
    })
})

describe('PackageList', () => {
    it('PackageList works', () => {
        cy.intercept('POST', '*/parse', {
            fixture: 'poetryLockFileOutput.json',
        })
        cy.visit('http://localhost:3000/upload')
        cy.contains('Upload poetry.lock -file')
        cy.fixture('poetry.lock').then((file) => {
            cy.get('input[type="file"]').attachFile({
                fileContent: file.toString(),
                fileName: 'poetry.lock',
                mimeType: 'text/plain',
            })
        })
        cy.contains('Submit').click()
        cy.contains('Packages:')
        cy.contains('atomicwrites')
        cy.contains('attrs').click()
        cy.contains('Classes Without Boilerplate')
        cy.contains('pympler')
        cy.contains('zipp').click()
        cy.contains(
            'Backport of pathlib-compatible object wrapper for zip files'
        )
        cy.contains('pytest-checkdocs')
    })
})

describe('Package', () => {
    it('Package works', () => {
        cy.intercept('POST', '*/parse', {
            fixture: 'poetryLockFileOutput.json',
        })
        cy.visit('http://localhost:3000/upload')
        cy.contains('Upload poetry.lock -file')
        cy.fixture('poetry.lock').then((file) => {
            cy.get('input[type="file"]').attachFile({
                fileContent: file.toString(),
                fileName: 'poetry.lock',
                mimeType: 'text/plain',
            })
        })
        cy.contains('Submit').click()
        cy.contains('Packages:')
        cy.contains('atomicwrites')
        cy.contains('attrs').click()
        cy.contains('Classes Without Boilerplate')
        cy.contains('pympler')
        cy.get('a[title="dependency-mypy"]').click()
        cy.contains('Optional static typing for Python')
        cy.get('a[title="reverseDependency-ordered-set"]').click()
        cy.contains(
            'An OrderedSet is a custom MutableSet that remembers its order, so that every'
        )
    })
})

describe('NotFound', () => {
    it('NotFound works', () => {
        cy.visit('http://localhost:3000/toot')
        cy.contains('404 NOT FOUND')
    })
})
