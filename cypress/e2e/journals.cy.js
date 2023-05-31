describe('template spec', () => {
  it('passes', () => {
    cy.request('GET', `/api/journal`).then(response => {
      console.log('...Response:', response)
      expect(response.status).to.equal(200)
      expect(response.body[0].title).to.exist
    })
  })
})
