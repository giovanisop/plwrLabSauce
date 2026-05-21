Feature: Purchase

    Scenario: Add an item to cart
        Given I am on the inventory page
        And I have "<ItemQty>" item in the cart
        When I find the item "<ItemDescription>"
        And I click the add to cart button for the item "<ItemDescription>"
        Then I should be able to see the cart icon displaying one item was added
        And I should be able to see the item "<ItemDescription>" in the cart page
    Examples:
    | ItemDescription          | ItemQty |   
    | Sauce Labs Bolt T-Shirt  | 0       | 

    Scenario: Return to inventory page from cart page
        Given I am on the inventory page
        And I have "<ItemQty>" item in the cart
        And I click on the cart icon
        And I see the item "<ItemDescription>" in the cart page
        When I click on the continue shopping button
        Then I should be redirected to the inventory page "<inventoryPageUrl>"
        And I should be able to see the cart icon still displaying "<ItemQty>" items 
        When I click on the cart icon
        Then I should be able to see the item "<ItemDescription>" in the cart page
    Examples:
    | ItemDescription          | ItemQty | inventoryPageUrl                          |
    | Sauce Labs Bolt T-Shirt  | 1       | https://www.saucedemo.com/inventory.html  | 