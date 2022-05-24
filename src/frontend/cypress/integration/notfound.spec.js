describe('NotFound', () => {
    it('NotFound works', () => {
        cy.visit('http://localhost:3000/toot')
        cy.contains('404 NOT FOUND')
    })
})
