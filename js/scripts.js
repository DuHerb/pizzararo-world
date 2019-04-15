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
}

//getOrderTotal() sets the orderTotal to the total price of all pizzas in order
Order.prototype.getOrderTotal = function() {
  var total = 0;

  this.pizzas.forEach(function(pizza){
    total += pizza.pizzaTotal;
  });
  this.orderTotal = total;
}

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
  } else if (size === "extra-large"){
    total += 14;
  }
  this.pizzaTotal = total;
}

// Modifiers and ModType objects and methods ---------------------//
function Modifiers() {
  this.modTypes = [];
}

function ModType(name, inputName, modPrice) {
  this.name = name,
  this.inputName = inputName,
  this.modPrice = modPrice,
  this.mods = []
}

Modifiers.prototype.addModtype = function(modType){
  this.modTypes.push(modType);
}

//enter in different topping options here!!!
// Meats
var meats = new ModType("Meats:", "meats", 2);
meats.mods = ["pepperoni", "chicken", "suasage", "anchovey", "bacon"];
//Premium Priced Toppings
var premTops = new ModType("Premium Toppings:", "premiumToppings", 2);
premTops.mods = ["artichoke","truffles","hot-peppers"];
//Regular Priced Toppings
var regTops = new ModType("Regular Toppings:", "regularToppings", 1);
regTops.mods = ["olives","mushrooms","garlic","extra-cheese"];

//Initiate Modifiers and Order -----------------------//
var modifiers = new Modifiers();
modifiers.addModtype(meats);
modifiers.addModtype(premTops);
modifiers.addModtype(regTops);
var order = new Order();

//Display Builder Object and Display methods -----------------//
//DisplayBuilder assists in creating output strings for display methods
function DisplayBuilder() {
  this.p = "<p>",
  this.cp = "</p>"
  this.ul = "<ul>",
  this.cul = "</u>",
  this.li = "<li>",
  this.cli = "</li>",
  this.div = "<div>",
  this.cdiv = "</div>",
  this.h3 = "<h3>",
  this.ch3 = "</h3>"
}
var db = new DisplayBuilder();

//previewPizza() displays the users order for single Pizza before user confirmation
Pizza.prototype.previewPizza = function (db) {
  var size = db.p + "Size: " +  this.size + db.cp;
  var toppingsCount = db.p + this.toppings.length + " Toppings:" + db.cp;
  var toppingsText =  "";
  var total = db.p + "Price: $" +  this.pizzaTotal + db.cp;

  this.toppings.forEach(function(topping){
    toppingsText += db.li + topping + db.cli;
  })
  $("#modalDisplay").append(size, toppingsCount, db.ul+toppingsText+db.cul, total);
}

//previewOrder displays user's complete order before confirmation
Order.prototype.previewOrder = function () {
  var db = new DisplayBuilder();
  var grandTotal = db.p + "Grand Total: $" + this.orderTotal + db.cp;

  $("#modalDisplay").empty();
  this.pizzas.forEach(function(pizza){
    var pizzaCount = db.p + "Pizza #" +  (pizza.pizzaId + 1) + ":" + db.cp;
    this.orderTotal += pizza.pizzaTotal;
    $("#modalDisplay").append(pizzaCount);
    pizza.previewPizza(db);
    $("#modalDisplay").append("---------------------");
  })
  $("#modalDisplay").append(grandTotal);
}

//buildToppingsList() creates the html tags and content for the modifier arrays
Modifiers.prototype.buildToppingsList = function () {
  this.modTypes.forEach(function(modType){
    var html = "<h3 class='from-heading'>" + modType.name + " ($" + modType.modPrice + " each)</h3>" + db.div + db.cdiv;

    $("form div").addClass('form-group');
    $("form").append(html);
    modType.mods.forEach(function(mod){
      var name = modType.inputName;
      var modHtml = "<input type='checkbox' name='" + name + "' value='" + mod + "'>";
      $("form div").append(modHtml);
    })
  })
}

var goodBye = "Enjoyo Your Pizzaro!"

// Helper Functions ---------------------------------//
function clearForm() {
  // $("form").trigger('reset');
  $("form").trigger('reset');
}

// click events -------------------------------------//
function attachEventListeners() {
  var userPizza;
  var isUniquePizza = false;
  //previewPizza inserts data into new pizza object -- TODO: trigger preview window
  $("#previewPizza").on("click", function(event){
    var pizza = new Pizza();
    isUniquePizza = true;
    pizza.size = $("input[name='pizzaSize']:checked").val();
    $.each($("input[type=checkbox]:checked"), function() {
      pizza.toppings.push($(this).val());
    });
    pizza.getPizzaTotal(modifiers);
    userPizza = pizza;
    $("#modalDisplay").empty();
    pizza.previewPizza(db);
    console.log(order);
  });

  //addPizza pushes new pizza object into the orderObject.
  $("#addPizza").on("click", function(event){
    if (isUniquePizza){
      order.addPizza(userPizza);
    };
    isUniquePizza = false;
    $("#modalPreviewPizza").on("hidden.bs.modal",function(e){
      $("#addS").removeClass('hidden');
    })
    clearForm();
    $("#previewOrder").removeClass('hidden');
    $("#confirmOrder").addClass('hidden');
    console.log(order);

  })

  //previewOrder shows user entire order before submitting
  $("#previewOrder").on("click", function(event){
    $("#modalDisplay").empty();
    if (isUniquePizza){
      order.addPizza(userPizza);
    };
    isUniquePizza = false;
    order.getOrderTotal();
    order.previewOrder();
    $("h5 span").toggleClass('hidden');
    $("#goBack").addClass('hidden');
    $("#modalPreviewPizza").on("hidden.bs.modal",function(e){
      $("#pizzaSpan").removeClass('hidden');
      $("#orderSpan").addClass('hidden');
      $("#goBack").removeClass('hidden');
    })
    $("#previewOrder").addClass('hidden');
    $("#confirmOrder").removeClass('hidden');

    console.log(order);
  })

  //goBack button returns user to order form without adding pizza to order
  $("#goBack").on("click", function(){
    clearForm();
    $("#previewOrder").removeClass('hidden');
    $("#confirmOrder").addClass('hidden');
  })

  //confirmOrder will eomplete order process. For test purposes, it will refresh the page.
  $("#confirmOrder").on("click", function(){
    window.location.reload();
  })

}//end attachEventListeners()

// document.ready  ----------------------------------------//
$(document).ready(function(){
  attachEventListeners();
  // modifiers.buildToppingsList();

})
