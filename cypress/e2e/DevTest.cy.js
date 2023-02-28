// One test file can have any number of describe blocks/suites

describe('My First Test', () => {
    
    // A describe block can have multiple it blocks
    
    it('Test1', () => {
        // Every it block represents one test
        // Visit Wiki
        cy.visit("https://en.wikipedia.org/wiki/List_of_cities_in_the_United_Kingdom#List_of_cities")
        // Confirm correct wiki page
        cy.title().should('eq', 'List of cities in the United Kingdom - Wikipedia')
        // cy.get('.wikitable > tbody > tr > td:first-child')
        // Select the first table on the wiki page
        cy.get('table > tbody').first()
            // Find each city name in the table
            .find('tr > td:first-child')
            // Work out how many cities there are
            .its('length')
            .then((length) => {
                // select ten of the 76 random cities
                // cy.log(length)
                const cities = Math.floor(Math.random()*length)
                cy.get('tr:nth-child(' + cities + ') > td:first-child > a').then(($cityName) => {
                    const cityNameText = $cityName.text()
                    cy.log(cityNameText)
                })
                
            });
            
    })

})