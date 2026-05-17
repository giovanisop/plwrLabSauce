Feature: Login

    Scenario: Successful login 
        Given I am on the login page
        When I enter valid "<username>" and "<password>"
        And I click the login button
        Then I should be redirected to the inventory page "<inventoryPageUrl>"
    Examples:
    | username      | password      | inventoryPageUrl                          |
    | standard_user | secret_sauce  | https://www.saucedemo.com/inventory.html  | 

    Scenario: Invalid User 
        Given I am on the login page
        When I enter an invalid "<username>" and "<password>"
        And I click the login button
        Then I should be able to see error message "<loginMessage>"
    Examples:
    | username          | password      | loginMessage                                                               |
    | locked_out_user   | secret_sauce  | Epic sadface: Sorry, this user has been locked out.                        |
    | invalid           | invalid       | Epic sadface: Username and password do not match any user in this service  |

    Scenario: No User inserted but password inserted
        Given I am on the login page
        When I enter password "<password>" and leave username empty
        And I click the login button
        Then I should be able to see error message "<loginMessage>"
    Examples:
    | password      | loginMessage                       |
    | secret_sauce  | Epic sadface: Username is required | 

    Scenario: No information inserted
        Given I am on the login page
        When I leave username and password empty
        And I click the login button
        Then I should be able to see error message "<loginMessage>"
    Examples:
    | loginMessage                       |
    | Epic sadface: Username is required | 

    Scenario: No password inserted
        Given I am on the login page
        When I enter username "<username>" and leave password empty
        And I click the login button
        Then I should be able to see error message "<loginMessage>"
    Examples:
    | username      | loginMessage                       |
    | standard_user | Epic sadface: Password is required | 