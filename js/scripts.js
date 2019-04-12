function Order() {
  this.pizzas = [],
  this.currentId = -1,
  this.orderTotal = 0
}

function Pizza(){
  this.pizzaId = 0,
  this.size = "",
  this.toppings = [],
  this.pizzaTotal = 0
}

Order.prototype.addPizza = function (pizza){
  this.currentId ++;
  pizza.pizzaId = this.currentId;
  this.pizzas.push(pizza);
};

Pizza.prototype.getPizzaTotal = function(){
  var price = 0;
  this.toppings.forEach(function(topping){
    if(premiumToppings.includes(topping)){
      price += 2;
    }
    if(meats.includes(topping)){
      price += 2;
    }
    if(regularToppings.includes(topping)){
      price += 1;
    }
  });
  this.pizzaTotal = price;
}

var meats = ["pepperoni", "chicken", "suasgae", "anchovey", "bacon"];
var premiumToppings = ["artichoke","truffles","hot-peppers"];
var regularToppings = ["olives","mushrooms","garlic","extra-cheese"];
var pizza1 = new Pizza();
var pizza2 = new Pizza();
var pizza3 = new Pizza();
var testToppings1 = ["bacon", "extra-cheese", "garlic"];
var testToppings2 = ["chicken", "artichoke","truffles","mushrooms"];
var testToppings3 = ["hot-peppers", "anchovey", "olives"];

pizza1.toppings = testToppings1;
pizza2.toppings = testToppings2;
pizza3.toppings = testToppings3;
pizza1.getPizzaTotal();
pizza2.getPizzaTotal();
pizza3.getPizzaTotal();

console.log(pizza1);
console.log(pizza2);
console.log(pizza3);

var order = new Order();
order.addPizza(pizza1);
order.addPizza(pizza2);
order.addPizza(pizza3);
console.log(order);


// document.ready  ----------------------------------------//
$(document).ready(function(){

})
