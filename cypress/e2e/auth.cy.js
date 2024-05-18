describe('testing register component', () => {
  it('should create a new user', () => {
    cy.request('POST', `/api/user`, { email: 'test00@gmail.com', username: 'test00', denomination: 'No denomination', password: 'Password@123?' }).then(response => {
      console.log('...Response:', response)
      expect(response.status).to.equal(201)
    })
  })
})

describe('testing auth component', () => {
  it('should log in user', () => {
    cy.request('POST', `/api/auth`, { email: 'eokuchukwu95@gmail.com', password: 'Password@123?' }).then(response => {
      console.log('...Response:', response)
      expect(response.status).to.equal(200)
    })
  })
})