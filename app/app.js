angular.module('explog', ['ngStorage'
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
	
	$scope.currentCategory = null;
	$scope.allExpenses = [];
	$scope.sumRequestedExpenses = 0;
	
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
		var expense = {
			date: "",
			subExpenses: []
		};
		expense.date = formDate.expenseDate.toLocaleDateString();
		expense.subExpenses = expenses;
		$localStorage.allExpenses.push(expense);
		//$scope.allExpenses.push($scope.expense);		
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
		expense.date = expense.newDate.toLocaleDateString();
		$localStorage.allExpenses[index] = expense;
		$scope.editedExpense = null;
		$scope.isEditing = false;
	}
	
	$scope.testClick = function testClick(){
		var itterDate = $scope.startDate;
		var endDate = $scope.endDate.getDate();
		var  index, itterDateCopy;
		var expensesIndex;
		var sum = 0;
		$scope.sumRequestedExpenses = 0;
				
		while(itterDate <= $scope.endDate){
			itterDateCopy = itterDate.toLocaleDateString();		
			index = _.findIndex($localStorage.allExpenses, function(e){
				return e.date == itterDateCopy;
			})
							console.log(itterDate);
			expensesIndex = $localStorage.allExpenses[index];
			if(expensesIndex != undefined){
				angular.forEach(expensesIndex.subExpenses, function(value, key) {
					sum = sum + parseInt(value.sum); 
					});											
			}
			itterDate.setDate(itterDate.getDate() +  1);
		}
		$scope.startDate = null; $scope.endDate =  null;
		$scope.sumRequestedExpenses = sum;
		$('#calculate').modal('hide');
		$('#result').modal('show');
		
	}
	
});


[{"date":"1/15/2016","subExpenses":[{"title":"HDD extern","sum":"300"},{"title":"Student pub","sum":"7"}]},{"date":"1/18/2016","subExpenses":[{"title":"rochie","sum":"30"}]},{"date":"1/17/2016","subExpenses":[{"title":"george","sum":"14"}]},{"date":"1/16/2016","subExpenses":[{"title":"movie","sum":"24"},{"title":"mc","sum":"3"},{"title":"biserica","sum":"7"}]},{"date":"1/19/2016","subExpenses":[{"title":"stud pub","sum":"7"},{"title":"apa + biscu","sum":"4..5"},{"title":"abonam sala","sum":"50"}]},{"date":"1/20/2016","subExpenses":[{"title":"sandwhich facultate","sum":"4"},{"title":"apa","sum":"3"},{"title":"dulciuri","sum":"2"}]},{"date":"1/23/2016","subExpenses":[{"title":"apa + biscuiti","sum":"5"},{"title":"chez gabi","sum":"11"}]},{"date":"1/24/2016","subExpenses":[{"title":"chez gabi","sum":"12"},{"title":"sandwhich","sum":"6"},{"title":"dulce","sum":"2"}]},{"date":"1/28/2016","subExpenses":[{"title":"ape + dulce + banana","sum":"10"},{"title":"cartela","sum":"5"},{"title":"abonament","sum":"35"},{"title":"mancare(mc+covrig)","sum":"5"}]},{"date":"1/29/2016","subExpenses":[{"title":"cadou cata","sum":"50"},{"title":"balerini","sum":"90"},{"title":"fes","sum":"25"}]},{"date":"2016-01-31T22:00:00.000Z","subExpenses":[{"title":"costum ski","sum":"140"}],"newDate":"2016-01-31T22:00:00.000Z"},{"date":"2016-02-04T22:00:00.000Z","subExpenses":[{"title":"Prajturi","sum":"10"},{"title":"apa","sum":"3"}],"newDate":"2016-02-04T22:00:00.000Z"},{"date":"2016-02-05T22:00:00.000Z","subExpenses":[{"title":"taxi hospice","sum":"18"}],"newDate":"2016-02-05T22:00:00.000Z"},{"date":"7/2/2016","subExpenses":[{"title":"chez gabi","sum":"12"},{"title":"rest chinezesc","sum":"145"},{"title":"apa","sum":"3"}]}]