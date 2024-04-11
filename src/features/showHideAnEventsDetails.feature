
Feature: Show/Hide Event Details

  Scenario: The event element is collapsed by default.
    Given the main page is open
    When the app displays a list of events
    Then the event details are hidden by default

  Scenario: User clicks to expand event details.
    Given event details are hidden
    When the user clicks on the event to show details
    Then the app displays the details of the event

  Scenario: User clicks to collapse event details.
    Given event details are displayed
    When the user clicks on the event to hide details again
    Then the app hides the details of the event
