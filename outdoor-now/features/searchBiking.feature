Feature: Mountain Biking Trail Searching

    User Story: "As a frequent mountain biker, I want the ability to search for biking trails based on my preferred location so that I can find the perfect trail for my next outdoor activity."

    Scenario: Search for biking trails within a certain radius
        Given the user "testAdminUser123" exists
        And the user has "biking" as one of their preferred activities
        And the user's profile has a preferred location set
        And the user's profile has a valid radius set
        When the user selects "biking" as their preferred activity and selects search
        Then the system should return a list of biking trails within the radius around the user's preferred location


