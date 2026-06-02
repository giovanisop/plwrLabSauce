Feature: Checkout

    Scenario: Go to Checkout
        Given I have inserted The item "<item1>" to the cart
        When I click on the checkout button
        Then I should be redirected to the "<Checkout>" page "<checkoutPageUrl>"
    Examples:
    | item1               | Checkout                    | checkoutPageUrl                                 |
    | Sauce Labs Backpack | Checkout: Your Information  |https://www.saucedemo.com/checkout-step-one.html |

    Scenario: Perform checkout with success for one item 
        Given I have inserted The item "<item1>" to the cart
        When I click on the checkout button
        Then I should be redirected to the "<Checkout>" page "<checkoutPageUrl>"
        When I enter the first name "<firstName>", last name "<lastName>" and postal code "<postalCode>"
        And I click on the continue button
        Then I should be redirected to the "<CheckoutOverview>" page "<checkoutOverviewPageUrl>"
        And I should be able to see the item "<item1>" in the page
        And I should be able to see the total price of the order in the checkout overview page
        When I click on the finish button
        Then I should be redirected to the "<CheckoutComplete>" page "<checkoutCompletePageUrl>" 
        And I should be able to see the message "<Message>" in the checkout complete page
        When I click on the back home button
        Then I should be redirected to the "<Inventory>" page "<inventoryPageUrl>" 

    Examples:
    | item1               | Checkout                   | checkoutPageUrl                                   | firstName | lastName | postalCode | CheckoutOverview           | checkoutOverviewPageUrl                           | CheckoutComplete           | checkoutCompletePageUrl                           | Message                   | Inventory   | inventoryPageUrl                         |
    | Sauce Labs Backpack | Checkout: Your Information | https://www.saucedemo.com/checkout-step-one.html  | Giovani   | Ouro     | 12345      | Checkout: Overview         | https://www.saucedemo.com/checkout-step-two.html  | Checkout: Complete!        | https://www.saucedemo.com/checkout-complete.html  | Thank you for your order! | Products    | https://www.saucedemo.com/inventory.html |

    Scenario: Perform checkout with success for two items
        Given I have inserted The item "<item1>" to the cart
        And I have inserted The item "<item2>" to the cart
        When I click on the checkout button
        Then I should be redirected to the "<Checkout>" page "<checkoutPageUrl>"
        When I enter the first name "<firstName>", last name "<lastName>" and postal code "<postalCode>"
        And I click on the continue button
        Then I should be redirected to the "<CheckoutOverview>" page "<checkoutOverviewPageUrl>"
        And I should be able to see the item "<item1>" in the page
        And I should be able to see the item "<item2>" in the page
        And I should be able to see the total price of the order in the checkout overview page
        When I click on the finish button
        Then I should be redirected to the "<CheckoutComplete>" page "<checkoutCompletePageUrl>" 
        And I should be able to see the message "<Message>" in the checkout complete page
        When I click on the back home button
        Then I should be redirected to the "<Inventory>" page "<inventoryPageUrl>" 

    Examples:
    | item1               | item2                   | Checkout                   | checkoutPageUrl                                   | firstName | lastName | postalCode | CheckoutOverview           | checkoutOverviewPageUrl                           | CheckoutComplete           | checkoutCompletePageUrl                           | Message                   | Inventory   | inventoryPageUrl                         |
    | Sauce Labs Backpack | Sauce Labs Bolt T-Shirt | Checkout: Your Information | https://www.saucedemo.com/checkout-step-one.html  | Giovani   | Ouro     | 12345      | Checkout: Overview         | https://www.saucedemo.com/checkout-step-two.html  | Checkout: Complete!        | https://www.saucedemo.com/checkout-complete.html  | Thank you for your order! | Products    | https://www.saucedemo.com/inventory.html |

    Scenario: Cancel checkout from user information page
        Given I have inserted The item "<item1>" to the cart
        When I click on the checkout button
        Then I should be redirected to the "<Checkout>" page "<checkoutPageUrl>"
        When I click on the cancel button
        Then I should be redirected to the "<CartPage>" page "<cartPageUrl>"
        And I should be able to see the item "<item1>" in the page
    Examples:
    | item1               | Checkout                   | checkoutPageUrl                                   | CartPage     | cartPageUrl                         |
    | Sauce Labs Backpack | Checkout: Your Information | https://www.saucedemo.com/checkout-step-one.html  | Your Cart    | https://www.saucedemo.com/cart.html |


    Scenario: Cancel checkout from checkout overview page
        Given I have inserted The item "<item1>" to the cart
        When I click on the checkout button
        Then I should be redirected to the "<Checkout>" page "<checkoutPageUrl>"
        When I enter the first name "<firstName>", last name "<lastName>" and postal code "<postalCode>"
        And I click on the continue button
        Then I should be redirected to the "<CheckoutOverview>" page "<checkoutOverviewPageUrl>"
        And I should be able to see the item "<item1>" in the page
        And I should be able to see the total price of the order in the checkout overview page
        When I click on the cancel button
        Then I should be redirected to the "<Inventory>" page "<inventoryPageUrl>"
        And I should be able to see the item "<item1>" in the page
    Examples:
    | item1               | Checkout                   | checkoutPageUrl                                   | firstName | lastName | postalCode | CheckoutOverview           | checkoutOverviewPageUrl                           | Inventory   | inventoryPageUrl                         |
    | Sauce Labs Backpack | Checkout: Your Information | https://www.saucedemo.com/checkout-step-one.html  | Giovani   | Ouro     | 12345      | Checkout: Overview         | https://www.saucedemo.com/checkout-step-two.html  | Products    | https://www.saucedemo.com/inventory.html |
