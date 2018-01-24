projectOne.controller('homeCtrl', ['$scope','$rootScope','Data','$window','$interval', function($scope,$rootScope,Data,$window,$interval) {
    document.getElementById("defaultValue").selected=true;
    Data.peopleList.push($rootScope.unfiltered);
    //Back button
    $scope.back = function() {
        $rootScope.questions.pop(Data.index);
        Data.peopleList.pop(Data.index);
        Data.index-=1;
        $scope.openChart();
        if (Data.index==0) {
            document.getElementById("backButton").style.display='none';
            $scope.peopleList = [];
        }   
    }
    //Start
    $scope.start = function() {
        Data.index = 0;
        $window.location.href="#!/start";
    } 
    //Plots chart
	$scope.openChart = function() {	
		var data = $rootScope.questions[Data.index][$rootScope.labels[Data.index]];
        $scope.displayList="";
        $scope.displayList = Data.peopleList[Data.index];
        console.log($scope.displayList);
		var ringObject = { 
            "type":"hbar",  
            "title":{  
                "text":$rootScope.labels[Data.index] + " from 1 to 10",
                "margin-right": "50px",
                "color":'white'
            },
            "tooltip": {
      			"text": " %vt People; Skill level %t",
                "font-size":"20px"
    		},
            "legend":{
            	"x":"90%",
    			"y":"25%",
    			"backgroundColor":'white',
    			"color":'white'
            },
            "scale-x":[],
            "backgroundColor":'none' , 
            "plotarea":{
                "margin-left":"125px",
                "backgroundColor":'transparent'
            },    
            "item":{  
                    "offset-x":"10px" }, 
            "series":[]
    	};
        var amount = 0;
    	angular.forEach(data, function(key,value){
    		if (key.length==0) {

    		}
    		else {
    			ringObject.series.push({"values": [key.length], "text":value});
                amount+=key.length;
    		}
    		
    	});
    	zingchart.render({ 
			id : "ringbar", 
			data : ringObject, 
			height: "60%", 
			width: "100%"
		});
		zingchart.bind("ringbar","node_click",function(p){
			var series = ringObject["series"];
			var num = parseInt(series[p["plotindex"]]["text"]);
            if (Data.index == $rootScope.labels.length-1) {
                $window.alert("You are out of questions");
            }
            else {
                $scope.filter(num);
            }
			
    	});
        document.getElementById("numPeople").textContent=amount;
	}
    //Filters plotts
    $scope.filter = function(number){
        var array = $rootScope.questions[Data.index][$rootScope.labels[Data.index]][number];
        Data.filter(array);
        Data.index+=1;
        $scope.amountPeople=0;
        document.getElementById("defaultValue").selected=true;
        Data.peopleList.push(array);
        $scope.openChart();
        document.getElementById("backButton").style.display='';
    }
    //Refilters 
    $scope.refilter = function(label) {
        var oldIndex = $rootScope.labels.indexOf(label);
        var current = $rootScope.labels[Data.index];
        $rootScope.labels[Data.index] = label;
        $rootScope.labels[oldIndex] = current;
        $scope.openChart();
    }
    $interval(function() {
        $scope.displayList = Data.peopleList[Data.index];
        $scope.group = $rootScope.labels[Data.index];
    }, 500);
    $scope.openChart();
}]);