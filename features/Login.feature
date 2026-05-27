Feature: Login

    @login
    Scenario: Invalid User 
        Given I am on the login page
        When I enter an username "<username>" and password "<password>"
        And I click the login button
        Then I should be able to see error message "<loginMessage>"
    Examples:
    | username          | password      | loginMessage                                                               |
    | locked_out_user   | secret_sauce  | Epic sadface: Sorry, this user has been locked out.                        |
    | invalid           | invalid       | Epic sadface: Username and password do not match any user in this service  |

    @login
    Scenario: No User inserted but password inserted
        Given I am on the login page
        When I enter an username "<username>" and password "<password>"
        And I click the login button
        Then I should be able to see error message "<loginMessage>"
    Examples:
    | username      | password      | loginMessage                       |
    |               | secret_sauce  | Epic sadface: Username is required | 

    @login
    Scenario: No information inserted
        Given I am on the login page
        When I enter an username "<username>" and password "<password>"
        And I click the login button
        Then I should be able to see error message "<loginMessage>"
    Examples:
    | username      | password      | loginMessage                       |
    |               |               | Epic sadface: Username is required | 

    @login
    Scenario: No password inserted
        Given I am on the login page
        When I enter an username "<username>" and password "<password>"
        And I click the login button
        Then I should be able to see error message "<loginMessage>"
    Examples:
    | username      | password      | loginMessage                       |
    | standard_user |               | Epic sadface: Password is required | 

    @login
    Scenario: Successful login 
        Given I am on the login page
        When I enter an username "<username>" and password "<password>"
        And I click the login button
        Then I should be redirected to the inventory page "<inventoryPageUrl>"
    Examples:
    | username      | password      | inventoryPageUrl                          |
    | standard_user | secret_sauce  | https://www.saucedemo.com/inventory.html  | 
