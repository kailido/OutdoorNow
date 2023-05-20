Feature: plan a hike
  Scenario: user successfully plans a hike within 10k
    Given the user "testAdminUser123" has signed up and logged in
    And "hiking" is selected as the activity
    And any spot within '10' km is selected
    And user chooses to plan the activity on '2023-04-05' at '9:00' until '12:00'
    Then their activity can be planned for 3 hours