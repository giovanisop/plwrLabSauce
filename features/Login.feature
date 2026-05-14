Feature: Login

    Scenario: Successful login 
        Given I am on the login page
        When I enter valid "<username>" and "<password>"
        And I click the login button
        Then I should be redirected to the inventory page "<inventoryPageUrl>"
    Examples:
    | username      | password      | inventoryPageUrl                            |
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
