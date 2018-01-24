projectOne.controller('detailViewCtrl', ['$scope','$rootScope','Data','$window', function($scope,$rootScope,Data,$window) {
    $scope.openChart = function(input) {
        var test = $rootScope.filtered[input];
        var ringObject = { 
            "type":"ring",  
            "title":{  
                "text":input ,
                "margin-right": "50px",
                "color":'white'
            },
            "tooltip": {
                "text": "%vt People"
            },
            "legend":{
                "x":"90%",
                "y":"25%",
                "backgroundColor":'white',
                "color":'white'
            },
            "backgroundColor":'none' , 
            "plotarea":{
                "margin-left":"125px",
                "backgroundColor":'transparent'
            },    
            "item":{  
                    "offset-x":"10px" }, 
            "series":[]
        };
        angular.forEach(test, function(key,value){
            if (key.length==0) {

            }
            else {
                ringObject.series.push({"values": [key.length], "text":value});
            }
        });   
        zingchart.render({ 
            id : "detailView", 
            data : ringObject, 
            height: "100%", 
            width: "100%"
        });   
    }
}]);