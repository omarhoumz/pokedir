context('Home page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('loads 20 elements on first load', () => {
    // Wait for the data to load
    cy.wait(4000)
    cy.get('[data-testid=cards-wrapper]').children().should('have.length', 20)
  })

  it('loads 20 more elements when clicking on the "load more" button', () => {
    // Wait for the data to load
    cy.wait(4000)
    cy.get('[data-testid=btn-loadmore]').click()
    cy.wait(4000)
    cy.get('[data-testid=cards-wrapper]').children().should('have.length', 40)
  })
})
