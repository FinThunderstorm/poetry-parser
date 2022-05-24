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
