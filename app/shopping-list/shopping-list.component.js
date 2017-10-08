'use strict';

// Register `shoppingList` component, along with its associated controller and template
angular
.module('shoppingList')
.component('shoppingList', {
  restrict: 'E',
  scope: {},
  templateUrl: 'shopping-list/shopping-list.template.html',
  controller: ShoppingListController,
  controllerAs: 'vm'
});

function ShoppingListController() {
  var vm = this;

  // Bindable members
  vm.shoppingList = [];
  vm.totalItems = 0;
  vm.errorMsg = '';

  // Methods definition
  vm.addItem = addItem;
  vm.removeItem = removeItem;
  vm.addToBasket = addToBasket;
  vm.updateQuantity = updateQuantity;
  vm.removeFromBasket = removeFromBasket;
  vm.purchase = purchase;
  vm.emptyBasket = emptyBasket;

  // Adds an item to the shopping list
  function addItem() {
    vm.items = {
      'name': vm.items.name,
      'quantity': vm.items.quantity,
      'inBasket': false,
      'purchased': false
    }

    var newItem = true;
    var newItemName = angular.lowercase(vm.items.name);

    // Checks for dupes items in the shopping list
    if(vm.shoppingList.length > 0) {
      angular.forEach(vm.shoppingList, function(obj, key) {
        if(newItemName === angular.lowercase(obj.name)) {
          newItem = false;
        }
      });
      if(!newItem) {
        vm.errorMsg = 'Item already added to the shopping list!';
      } else {
        vm.shoppingList.push(vm.items);
        vm.errorMsg = '';
      }
    } else {
      vm.shoppingList.push(vm.items);
    }

    // Resets the form's state and input fields
    vm.addItemForm.$setPristine();
    vm.addItemForm.$setUntouched();
    vm.items = {};
  }

  // Updates the item's quantity in the shopping list
  function updateQuantity(item) {
    var index = vm.shoppingList.indexOf(item);
    vm.shoppingList[index].quantity = item.quantity;
  }

  // Removes an item from the shopping list
  function removeItem(item) { //console.log(vm.shoppingList)
    var index = vm.shoppingList.indexOf(item);
    vm.shoppingList.splice(index, 1);
  }

  // Adds an item to the basket
  function addToBasket(item) {
    var index = vm.shoppingList.indexOf(item);
    vm.shoppingList[index].inBasket = true;
    vm.totalItems += 1;
  }

  // Removes an item from the basket and puts it back in the shopping list
  function removeFromBasket(item) {
    var index = vm.shoppingList.indexOf(item);
    vm.shoppingList[index].inBasket = false;
    vm.totalItems -= 1;
  }

  //
  function purchase(item) {
    var index = vm.shoppingList.indexOf(item);
    vm.shoppingList[index].purchased = true;
    vm.shoppingList[index].inBasket = false;
    vm.totalItems -= 1;
    console.log(vm.shoppingList)
  }

  // Clears all the items from the basket and puts them back in the shopping list
  function emptyBasket() {
    for(var i=0; i<vm.shoppingList.length; i++) {
      vm.shoppingList[i].inBasket = false;
    }
    vm.totalItems = 0;
  }
}