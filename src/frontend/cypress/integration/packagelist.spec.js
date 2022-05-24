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
