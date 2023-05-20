Feature: Sharing a plan

    User Story: "As a user, I want to be able to share my plans with friends to see if we can go together."

    Scenario: Share a plan 
        Given user "testAdminUser123" exists
        And the user "testAdminUser123" has a plans
        And the user "testAdminUser123" has a valid start date
        And the user "testAdminUser123" has a valid end date
        And the user "testAdminUser123" end date is after the start date
        When the user "testAdminUser123" has a plan and sends an invite to an email
        Then the system should send the invite

    Scenario: Share plan through api
        Given the user enters a plan and an invitee email