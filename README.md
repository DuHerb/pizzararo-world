# Pizzaro World

#### This is a code-review project for the Epicodus Intro-to-Programming tract

### Version 1.0 --- 4/12/2019

### Author: Dustin Herboldshimer

## Description

This weeks focus was on objects and prototypes.  Pizzaro World is a webpage that
utilizes these concepts to allow a user to order custom pizzas.  The page will take
user from the input to build an order, take a delivery address, and return a total
order price.

##Specifications

|                              Behavior                              |                     Input                     |                                                                                                    Expected Output                                                                                                    |
|:------------------------------------------------------------------:|:---------------------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| User chooses pizza size                                            | Small, Medium, Large or XL                    | Size: Small = $10                                                                                                                                                                                                     |
| User chooses meats(premium toppings-first topping free)            | Chicken, Artichoke, Sausage                   | Prem.Tops: Chk, Arti, Suas = 2 extras @$2each = $4                                                                                                                                                                    |
| User chooses veggies(regular toppings- first topping free)         | Mushroom, olive                               | Reg.Tops: Mush, Olv = 1 extra @$1each = $1                                                                                                                                                                            |
| User can enter address for delivery (no address for pickup option) | Name:... Address... City... Zip... Phone#:... | Deliver To: *Name* *Address* *City* *Zip* *Phone Number*                                                                                                                                                              |
| After order is complete, final price is totaled.                   | Click "Place Order" button                    | Thanks for ordering from Pizzaro World!  1:med pizza @ $10  Prem.Tops: chk, arti, suas @$2each = $4   Reg.Tops: mush, olv @$1each = $1                               === $15 2...."next pizza"....  Order Total:  $15 |

## Setup/Installation Requirements

1.  clone this repo into a local directory
2.  open in your preferred browser

<!-- ## Known Bugs -->


## Support and contact details

Contact Dustin Herboldshimer at dustnpdx@gmail.com

## Technologies Used

#### Bootstrap v4.3.1
#### Jquery v3.3.1

### License

Protected under the <a href="https://opensource.org/licenses/MIT">MIT License</a>

Copyright (c) 2019 **Dustin Herboldshimer**
