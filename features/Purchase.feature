Feature: Purchase

    
    Scenario: Add an item to cart
        Given I am on the inventory page
        And I have "<ItemQty>" item in the cart
        And I find the item "<ItemDescription>"
        When I click the add to cart button for the item "<ItemDescription>"
        Then I should be able to see the cart icon displaying "<CurrentItemQty>" items 
        When I click on the cart icon
        Then I should be able to see the item "<ItemDescription>" in the page
    Examples:
    | ItemDescription          | ItemQty | CurrentItemQty   |  
    | Sauce Labs Bolt T-Shirt  | 0       | 1                |

    Scenario: Return to inventory page from cart page
        Given I am on the inventory page
        And I have "<ItemQty>" item in the cart
        And I find the item "<ItemDescription>"
        When I click the add to cart button for the item "<ItemDescription>"
        Then I should be able to see the cart icon displaying "<CurrentItemQty>" items 
        When I click on the cart icon
        And I should be able to see the item "<ItemDescription>" in the page
        When I click on the continue shopping button
        Then I should be redirected to the "<page>" page "<inventoryPageUrl>"
        Then I should be able to see the cart icon displaying "<CurrentItemQty>" items 
        When I click on the cart icon
        Then I should be able to see the item "<ItemDescription>" in the page
    Examples:
    | ItemDescription          | ItemQty | page      | inventoryPageUrl                          | CurrentItemQty   | 
    | Sauce Labs Bolt T-Shirt  | 0       | Products  | https://www.saucedemo.com/inventory.html  | 1                | 

    Scenario: Remove an item from cart on product page
        Given I am on the inventory page
        And I have "<ItemQty>" item in the cart
        And I find the item "<ItemDescription>"
        When I click the add to cart button for the item "<ItemDescription>"
        Then I should be able to see the cart icon displaying "<AddedItemQty>" items
        When I click on the Remove button of the item "<ItemDescription>"
        Then I should be able to see the cart icon displaying "<CurrentItemQty>" items
        When I click on the cart icon
        Then I should be able to see no items in the cart page
    Examples:
    | ItemDescription          | ItemQty | AddedItemQty   | CurrentItemQty   |
    | Sauce Labs Bolt T-Shirt  | 0       | 1              | 0                |

    Scenario: Remove an item from cart on cart page
        Given I am on the inventory page
        And I have "<ItemQty>" item in the cart
        And I find the item "<ItemDescription>"
        When I click the add to cart button for the item "<ItemDescription>"
        Then I should be able to see the cart icon displaying "<AddedItemQty>" items
        When I click on the cart icon
        And I should be able to see the item "<ItemDescription>" in the page
        When I click on the Remove button of the item "<ItemDescription>"
        Then I should be able to see the cart icon displaying "<CurrentItemQty>" items
    Examples:
    | ItemDescription          | ItemQty | AddedItemQty   | CurrentItemQty   |
    | Sauce Labs Bolt T-Shirt  | 0       | 1              | 0                |

    Scenario: Add two items to cart
        Given I am on the inventory page
        And I have "<ItemQty>" item in the cart
        And I find the item "<ItemDescription>"
        When I click the add to cart button for the item "<ItemDescription>"
        Then I should be able to see the cart icon displaying "<FirstItemQty>" items
        When I find the item "<SecondItemDescription>"
        And I click the add to cart button for the item "<SecondItemDescription>"
        Then I should be able to see the cart icon displaying "<CurrentItemQty>" items
        When I click on the cart icon
        Then I should be able to see the item "<ItemDescription>" in the page
        And I should be able to see the item "<SecondItemDescription>" in the page
    Examples:
    | ItemDescription          | ItemQty | SecondItemDescription     | FirstItemQty   | CurrentItemQty   |
    | Sauce Labs Bolt T-Shirt  | 0       | Sauce Labs Fleece Jacket  | 1              | 2                |