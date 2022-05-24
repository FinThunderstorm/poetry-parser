describe('Welcome', () => {
    it('front page can be opened', () => {
        cy.visit('http://localhost:3000')
        cy.contains('Welcome to poetry-parser!')
        cy.contains(
            'Begin explorating your poetry.lock -file by uploading file.'
        )
    })
})
