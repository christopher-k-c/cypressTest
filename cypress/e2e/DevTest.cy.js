// One test file can have any number of describe blocks/suites

describe('My First Test', () => {
    function checkTheWeather() {
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
                // select ten of the 76 random cities strting from 1

                const cities = Math.floor(Math.random()*length) + 1
                // Randomly select the row and specify the first td element in that row then stroe that as a var called cityName
                cy.get('tr:nth-child(' + cities + ') > td:first-child > a').then(($cityName) => {
                    const cityNameText = $cityName.text().replace(/ *\([^)]*\) */g, "")

                    // Use replace() to remove parentheses from cityNameText
                    // Not sure why it is not working?
                    const cutVar = cityNameText
                    // cy.log(cutVar, "Splice Test")
        
                    // Had to make clear which url i wanted to manipulate by using origin
                    cy.origin('https://www.bbc.co.uk', { args: { cityName: cityNameText } }, ({ cityName }) => {
                        /* Because I am using origin I have to pass the origin function variables as arguments, which means I have to pass the city name 
                        variable / dom anchor text content as a key pair value instead of passing it as the dom content because it is not serializable according 
                        to the error i was receiving */
                        cy.visit('https://www.bbc.co.uk/weather')

                        // Type name of city into weather location input field
                        cy.get("#ls-c-search__input-label").type(cityName)

                        // Target the ul with the id of location-list plus select the first li element in the ul and the a tag
                        const test = cy.get('#location-list').find('li:first-child > a')
                        
                        // Navigate to that web page
                        test.click()
                        
                        // Get cloud coverage forecast
                        const sunCheck = cy.get('[data-pos="6"] > #daylink-6 > .wr-day__body > .wr-day__details-container > .wr-day__details > .wr-day__weather-type > .wr-weather-type > .wr-weather-type__icon')
                        // If weather is equal to Sleet Showers pass the assertion 
                        sunCheck.invoke('attr', 'title').should('eq', 'Sleet Showers').then(() => {
                            // Get Temperature forecast
                            const checkTemp = cy.get('[data-pos="6"] > #daylink-6 > .wr-day__body > .wr-day__details-container > .wr-day__details > .wr-day__temperature > .wr-day-temperature > .wr-day-temperature__high > .wr-day-temperature__high-value > .wr-value--temperature > .wr-value--temperature--c')
                            cy.wait(1000)
                            // If Temperature is greater than 1 pass the assertion 
                            checkTemp.invoke('text') .should('be.a', 'string').then(parseInt).should('be.a', 'number').should('be.greaterThan', 1)
                            .then(() => {
                                // If both tests pass log the success
                                cy.log('Both Assertions have passed!')
                                // return "Test Completed! Both Assertions have passed!"
                            })
                        })
                        
                    })
                })
            });    
        })
    }


    function checkTestOutcome(numberOfTests) {
        if (numberOfTests > 0) {
            checkTheWeather();
            checkTestOutcome(numberOfTests - 1);
        }

        
    }
    checkTestOutcome(10);
      



})