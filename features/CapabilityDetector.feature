Feature: Registry
  As a user of the capability.js lib
  I want to use a capability registry
  So I will be able to define and detect capabilities

  Scenario: defining a new capability
    When I try to define a capability with a name and a test
    Then a new capability should be defined

  Scenario: failing to define a new capability using insufficient parameters
    When I try to define a capability without enough parameters
    Then I should get an error

  Scenario: failing to define a new capability using duplicated name
    When I try to define a capability with the same name I already used
    Then I should get an error

  Scenario: testing supported capability
    When I have a supported capability defined
    Then I should get true by testing this capability

  Scenario: testing unsupported capability
    When I have an unsupported capability defined
    Then I should get false by testing this capability

  Scenario: failing to test undefined capability
    When I try to test a capability I did not define previously
    Then I should get an error

  Scenario: checking supported capability
    When I have a supported capability defined
    Then I should not get error by checking this capability

  Scenario: checking unsupported capability
    When I have an unsupported capability defined
    Then I should get error by checking this capability

  Scenario: failing to check undefined capability
    When I try to check a capability I did not define previously
    Then I should get an error