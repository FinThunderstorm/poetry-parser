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
