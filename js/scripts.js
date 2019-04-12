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

//getPizzaTotal() sets each pizza object price according size and
//topping modifiers passed by a Modifier() object
Pizza.prototype.getPizzaTotal = function(modifiers){
  var total = 0;
  var size = this.size;

  this.toppings.forEach(function(topping){
    modifiers.modTypes.forEach(function(modType){
      var modPrice = modType.modPrice;
      if(modType.mods.includes(topping)){
        total += modPrice;
      }
    })
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

// Modifiers and ModType objects and methods ---------------------//
function Modifiers() {
  this.modTypes = [];
}

function ModType(name, modPrice) {
  this.name = name,
  this.modPrice = modPrice,
  this.mods = []
}

Modifiers.prototype.addModtype = function(modType){
  this.modTypes.push(modType);
}

//enter in different topping options here!!!
// Meats
var meats = new ModType("meats", 2);
meats.mods = ["pepperoni", "chicken", "suasage", "anchovey", "bacon"];
//Premium Priced Toppings
var premTops = new ModType("premiumToppings", 2);
premTops.mods = ["artichoke","truffles","hot-peppers"];
//Regular Priced Toppings
var regTops = new ModType("regularToppings", 1);
regTops.mods = ["olives","mushrooms","garlic","extra-cheese"];

//Initiate Modifiers and Order -----------------------//
var modifiers = new Modifiers();
modifiers.addModtype(premTops);
modifiers.addModtype(regTops);
modifiers.addModtype(meats);
var order = new Order();

//Display Builder and Display methods -----------------//
function DisplayBuilder() {
  this.p = "<p>",
  this.cp = "</p>"
  this.ul = "<ul>",
  this.cul = "</u>",
  this.li = "<li>",
  this.cli = "</li>"
}
var db = new DisplayBuilder();

Pizza.prototype.previewDisplay = function (db) {
  var size = db.p + "Size: " +  this.size + db.cp;
  var toppingsCount = db.p + this.toppings.length + " Toppings:" + db.cp;
  var toppingsText =  "";
  var total = db.p + "Pizza Total: $" +  this.pizzaTotal + db.cp;
  this.toppings.forEach(function(topping){
    toppingsText += db.li + topping + db.cli;
  });
  $("#modalPreviewDisplay").empty();
  $("#modalPreviewDisplay").append(size, toppingsCount, db.ul+toppingsText+db.cul, total);
};

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
    pizza.getPizzaTotal(modifiers);
    userPizza = pizza;
    pizza.previewDisplay(db);
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
