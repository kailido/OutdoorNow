Feature: create a plan helper
  Scenario: user can save a plan for future reference
    Given the user "testAdminUser123" has selected a "hiking" spot for "2023-05-09" at "12:30" for "Lime Kiln Point State Park"
    When the share plan button is clicked with shared email "brentmachado7@gmail.com"
    Then a new plan request is created starting at "12:30" and ending at "16:30" at the location "Lime Kiln Point State Park"