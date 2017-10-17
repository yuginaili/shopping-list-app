(function () {
	'use strict';

	var app = angular.module('app', ['ngStorage']);

	app.component('shoppingList', {
		restrict: 'E',
		templateUrl: 'templates/shoppingList.template.html',
		controller: ShoppingListController,
		controllerAs: 'vm'
	});

	function ShoppingListController($localStorage) {
		var vm = this;

		// Bindable members
		vm.storedList = localStorage.getItem('shoppingList');
		vm.shoppingList = (localStorage.getItem('shoppingList') !== null) ? JSON.parse(vm.storedList) : [];
		localStorage.setItem('shoppingList', JSON.stringify(vm.shoppingList));
		vm.errorMsg = '';
		vm.cartDetails = 'templates/cartDetails.template.html';

		// Methods definition
		vm.addItem = addItem;
		vm.updateQuantity = updateQuantity;
		vm.removeItem = removeItem;
		vm.addToBasket = addToBasket;
		vm.removeFromBasket = removeFromBasket;
		vm.countBasket = countBasket;
		vm.purchase = purchase;
		vm.clearList = clearList;
		vm.emptyBasket = emptyBasket;

		// Adds an item to the shopping list
		function addItem() {
			vm.items = {
				'name': vm.items.name,
				'quantity': vm.items.quantity,
				'inBasket': false,
				'purchased': false
			};

			var newItem = true;
			var newItemName = angular.lowercase(vm.items.name);

			// Checks for dupes items in the shopping list
			if (vm.shoppingList.length > 0) {
				angular.forEach(vm.shoppingList, function (obj, key) {
					if (newItemName === angular.lowercase(obj.name)) {
						newItem = false;
					}
				});
				if (!newItem) {
					vm.errorMsg = 'Item already added to the shopping list!';
				} else {
					vm.shoppingList.push(vm.items);
					localStorage.setItem('shoppingList', JSON.stringify(vm.shoppingList));
					vm.errorMsg = '';
				}
			} else {
				vm.shoppingList.push(vm.items);
				localStorage.setItem('shoppingList', JSON.stringify(vm.shoppingList));
			}

			// Resets the form's state and input fields
			vm.addItemForm.$setPristine();
			vm.addItemForm.$setUntouched();
			vm.items = {};
		}

		// Updates the item's quantity in the shopping list
		function updateQuantity(i) {
			vm.shoppingList[i].quantity = item.quantity;
		}

		// Removes an item from the shopping list
		function removeItem(i) {
			vm.shoppingList.splice(i, 1);
			localStorage.setItem('shoppingList', JSON.stringify(vm.shoppingList));
		}

		// Adds an item to the basket
		function addToBasket(i) {
			vm.shoppingList[i].inBasket = true;
			localStorage.setItem('shoppingList', JSON.stringify(vm.shoppingList));
		}

		// Removes an item from the basket and puts it back in the shopping list
		function removeFromBasket(i) {
			vm.shoppingList[i].inBasket = false;
			localStorage.setItem('shoppingList', JSON.stringify(vm.shoppingList));
		}

		// Marks an item as purchased
		function purchase(i) {
			vm.shoppingList[i].purchased = true;
			vm.shoppingList[i].inBasket = false;
			localStorage.setItem('shoppingList', JSON.stringify(vm.shoppingList));
		}

		// Clears all the items from the shopping list
		function clearList() {
			vm.shoppingList = [];
			localStorage.setItem('shoppingList', JSON.stringify(vm.shoppingList));
		}

		// Counts items in the basket and returns total items
		function countBasket() {
			var count = 0;
			for (var i = 0; i < vm.shoppingList.length; i++) {
				if (vm.shoppingList[i].inBasket === true) {
					count++;
				}
			}
			return count;
		}

		// Clears all the items from the basket and puts them back in the shopping list
		function emptyBasket() {
			for (var i = 0; i < vm.shoppingList.length; i++) {
				vm.shoppingList[i].inBasket = false;
			}
		}
	}

})();