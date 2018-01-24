projectOne.factory('Data', function($rootScope) {
	this.index=0;
	this.peopleList=[];
	//Initialformation
	this.formatData = function() {
		var object = {};
		d3.csv('data.csv',function(rows){
			$rootScope.unfiltered = rows;
			var index = 0;
			var labels = [];
			angular.forEach(rows[0],function(key,value){
				if (index<=5) {
					index+=1;
				}
				else{
					labels.push(value);	
					object[value]={
						1:[],
						2:[],
						3:[],
						4:[],
						5:[],
						6:[],
						7:[],
						8:[],
						9:[],
						10:[]};
				}
			});
			angular.forEach(object,function(key,value){
				for (var i=0; i<rows.length;i++) {
					object[value][rows[i][value]].push(rows[i]);	
				}
			});
			$rootScope.questions = [object];
			$rootScope.labels = labels;
			

		});
	}
	//Filters the nodes
	this.filter = function(array) {
		var object = {};
		var index = 0;
		var labels = [];
		angular.forEach(array[0],function(key,value){
			if (index<=5) {
				index+=1;
			}
			else{	
				object[value]={
					1:[],
					2:[],
					3:[],
					4:[],
					5:[],
					6:[],
					7:[],
					8:[],
					9:[],
					10:[]};
			}
		});
		angular.forEach(object,function(key,value){
			for (var i=0; i<array.length;i++) {

				if (object[value][array[i][value]] == undefined) {

				}
				else {
					object[value][array[i][value]].push(array[i]);
				}
				
				
			}
		});		
		$rootScope.questions.push(object);
	}
	return this;
});