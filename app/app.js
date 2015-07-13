angular.module('Eggly', ['ngStorage'
])
.controller('MainCtrl', function($scope, $localStorage){
	$scope.hello = 'World';
	$scope.formDate = {
		expenseDate: new Date()
	};
	$scope.categories =[
    {"id": 0, "name": "Cheltuieli Logs"},
    {"id": 1, "name": "TODOs"},
    {"id": 2, "name": "Places"}
	]
	$scope.bookmarks = 
	[
    {"id":0, "title": "AngularJS", "url": "http://angularjs.org", "category": "Development" },
    {"id":1, "title": "Egghead.io", "url": "http://angularjs.org", "category": "Development" },
    {"id":2, "title": "A List Apart", "url": "http://alistapart.com/", "category": "Design" },
    {"id":3, "title": "One Page Love", "url": "http://onepagelove.com/", "category": "Design" },
    {"id":4, "title": "MobilityWOD", "url": "http://www.mobilitywod.com/", "category": "Exercise" },
    {"id":5, "title": "Robb Wolf", "url": "http://robbwolf.com/", "category": "Exercise" },
    {"id":6, "title": "Senor Gif", "url": "http://memebase.cheezburger.com/senorgif", "category": "Humor" },
    {"id":7, "title": "Wimp", "url": "http://wimp.com", "category": "Humor" },
    {"id":8, "title": "Dump", "url": "http://dump.com", "category": "Humor" }
	]
	$scope.expenses = [
		{"title": "", "sum": ""}
	]
	$scope.expense = {
		date: $scope.formDate,
		subExpenses: $scope.expenses
	};
	$scope.currentCategory = null;
	$scope.allExpenses = [];
	
	function setCurrentCategory(category){
		$scope.currentCategory = category;
		cancelCreating();
		cancelEditing();
	}
	function isCurrentCategory(category){
		return $scope.currentCategory != null && category.name === $scope.currentCategory.name;
	}
	$scope.setCurrentCategory = setCurrentCategory;
	$scope.isCurrentCategory = isCurrentCategory;
	
	//CREATE & EDIT
	$scope.isCreating = false;
	$scope.isEditing = false;
	
	function startCreating(){
		$scope.isCreating = true;
		$scope.isEditing = false;
		resetCreateForm();
	}
	function cancelCreating(){
		$scope.isCreating = false;
		//reset default creating values
		$scope.expenses = [];
		$scope.formDate.expenseDate = new Date();
		$scope.extraRows = 0;
	}
	
	function startEditing(){
		$scope.isCreating = false;
		$scope.isEditing = true;
	}
	function cancelEditing(){
		$scope.isEditing = false;
		$scope.editedBookmark = null;;
	}
	
	function shouldShowAddingExpense(){
		return $scope.currentCategory != null && !$scope.isEditing;
	}
	
	function shouldShowEditing(){
		return !$scope.isCreating && $scope.isEditing;
	}
	$scope.shouldShowAddingExpense = shouldShowAddingExpense;
	$scope.shouldShowEditing = shouldShowEditing;	
	$scope.startCreating = startCreating;
	$scope.cancelCreating = cancelCreating;
	$scope.startEditing = startEditing;
	$scope.cancelEditing = cancelEditing;
	
	//CRUD
	function resetCreateForm(){
		$scope.newBookmark={
			title: '',
			url: '',
			category: $scope.currentCategory.name
			
		}
	}
	function onError(){
		alert("Error caught");
	}
	

	
	
	function isSelectedBookmark(bookmarkId){
		return $scope.editedBookmark != null && bookmarkId === $scope.editedBookmark.id;
	}
	$scope.isSelectedBookmark = isSelectedBookmark;
	
	 
	//--------------------------------------------------------
	//MULTIPLE INPUT LINES 
	function registrationCompl(expense){
		
		if(expense == undefined || expense.sum == undefined || expense.title == "" || expense.sum == ""){				
				return false;
		}
		return true;		
	}
	$scope.registrationCompl  = registrationCompl;
	$scope.extraRows = 0;
	function showOneMoreEntry(){
		$scope.extraRows = $scope.extraRows + 1;
		$scope.expenses[$scope.extraRows] = {"title": "", "sum": ""};
	}
	$scope.showOneMoreEntry = showOneMoreEntry;
	
	$scope.getNumber = function(num) {
		return new Array(num);   
	}
	
	if($localStorage.allExpenses == undefined){
		$localStorage.allExpenses = [];
	}else{
		$scope.allExpenses = $localStorage.allExpenses;
	}
	//SAVE expense
	$scope.saveExpense = function(formDate, expenses){
		$scope.expense.date = formDate.expenseDate.toLocaleDateString();
		$scope.expense.subExpenses = expenses;
		$localStorage.allExpenses.push($scope.expense);		
		console.log($localStorage.allExpenses);
		cancelCreating();
	}
	//REMOVE expense
	$scope.removeExpense = function(expense){
		//prima varianta de remove
		/*var length = $localStorage.allExpenses.length;
		for(var i = 0; i < length; i++){
			if(expense.date == $localStorage.allExpenses[i].date)
				$localStorage.allExpenses.splice(i, 1);
		}*/
		_.remove($localStorage.allExpenses, function(e){
			return e.date == expense.date;
		});
	}
	
	//EDIT expense
	$scope.editedExpense = null;
	$scope.setEditedExpense = function setEditedExpense(expense){
		$scope.editedExpense = angular.copy(expense);
	}	
	
	$scope.updateExpense = function updateExpense(expense){
		var index = _.findIndex($localStorage.allExpenses, function(e){
			return e.date == expense.date;
		})
		$localStorage.allExpenses[index] = expense;
		$scope.editedExpense = null;
		$scope.isEditing = false;
	}
	
	$scope.testClick = function testClick(){
		console.log("Test click");
	}
	
});


