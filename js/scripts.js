//Order Object and Methods -----------------------------------//
function Order() {
  this.orderId,
  this.pizzas = [],
  this.currentPizzaId = -1,
  this.orderTotal = 0
}

//addPizza() pushes pizza objects into an order object
Order.prototype.addPizza = function (pizza){
  this.currentPizzaId ++;
  pizza.pizzaId = this.currentPizzaId;
  this.pizzas.push(pizza);
};

//getOrderTotal() sets the orderTotal to the total price of all pizzas in order
Order.prototype.getOrderTotal = function() {
  var total = 0;
  this.pizzas.forEach(function(pizza){
    total += pizza.pizzaTotal;
  });
  this.orderTotal = total;
};

//Pizza Constructor and Methods -------------------------------//
function Pizza(){
  this.pizzaId = 0,
  this.size = "",
  this.toppings = [],
  this.pizzaTotal = 0
}

//getPizzaTotal() sets each pizza object price according to topping and size modifiers
Pizza.prototype.getPizzaTotal = function(){
  var total = 0;
  var size = this.size;
  this.toppings.forEach(function(topping){
    if(premiumToppings.includes(topping)){
      total += 2;
    }
    if(meats.includes(topping)){
      total += 2;
    }
    if(regularToppings.includes(topping)){
      total += 1;
    }
  })
  if(size === "small"){
    total += 8;
  } else if (size === "medium") {
    total += 10;
  } else if (size === "large") {
    total += 12;
  } else if (size === "xlarge"){
    total += 14;
  }
  this.pizzaTotal = total;
}

var meats = ["pepperoni", "chicken", "suasage", "anchovey", "bacon"];
var premiumToppings = ["artichoke","truffles","hot-peppers"];
var regularToppings = ["olives","mushrooms","garlic","extra-cheese"];
var pizza1 = new Pizza();
var pizza2 = new Pizza();
var pizza3 = new Pizza();
var testToppings1 = ["bacon", "extra-cheese", "garlic"];
var testToppings2 = ["chicken", "artichoke","truffles","mushrooms"];
var testToppings3 = ["hot-peppers", "anchovey", "olives"];

// var userSize = [];
// var userPremiumToppings = [];
// var userRegularToppings = [];
// var userMeats = [];
//
// pizza1.toppings = testToppings1;
// pizza2.toppings = testToppings2;
// pizza3.toppings = testToppings3;
// pizza1.getPizzaTotal();
// pizza2.getPizzaTotal();
// pizza3.getPizzaTotal();
//
// console.log(pizza1);
// console.log(pizza2);
// console.log(pizza3);

var order = new Order();

// click events -------------------------------------//
function attachEventListeners() {
  var userPizza;
  //orderPreview inserts data into new pizza object -- TODO: trigger preview window
  $("#orderPreview").on("click", function(event){
    var pizza = new Pizza();
    pizza.size = $("input[name='pizzaSize']:checked").val();
    $.each($("input[type=checkbox]:checked"), function() {
      pizza.toppings.push($(this).val());
    });
    pizza.getPizzaTotal();
    userPizza = pizza;
  });
  //orderConfirm pushes new pizza object into the orderObject.
  $("#orderConfirm").on("click", function(event){
    order.addPizza(userPizza);
    order.getOrderTotal();
    console.log(order);
  })

}


// document.ready  ----------------------------------------//
$(document).ready(function(){
  attachEventListeners();
})
