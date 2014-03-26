var app = angular.module('gradstate', ['mongolab_service']);

app.config(function($routeProvider) {
  
  $routeProvider.when('/add/gradstate', {
    controller:CreategradstateController, 
    templateUrl:'static/state_form.html'
  });    	
  
  
  $routeProvider.when('/edit/gradstate/:gradstateId', {
    controller:gradstateController, 
    templateUrl:'static/state_form.html'
  });    	
  
  $routeProvider.when('/projects/:year', {
    controller:gradstateListByYearController, 
    templateUrl:'static/index.html'
  });    
  
  $routeProvider.when('/projects/:faculty', {
    controller:gradstateListByFacultyController, 
    templateUrl:'static/mainn.html'
  });    	
  	
  
  $routeProvider.when('/', {
    controller:gradstateListController, 
    templateUrl:'static/index.html'
  });   
  
   $routeProvider.when('/main', {
    controller:gradstateListController, 
    templateUrl:'static/main.html'
  });   
  
  $routeProvider.when('/mainn', {
    controller:gradstateListController, 
    templateUrl:'static/mainn.html'
  });   
   	
  $routeProvider.when('/engi', {
    controller:gradstateListController, 
    templateUrl:'static/engi.html'
  });   
    
   $routeProvider.when('/sci', {
    controller:gradstateListController, 
    templateUrl:'static/sci.html'
  });      
 
    $routeProvider.when('/insti', {
    controller:gradstateListController, 
    templateUrl:'static/insti.html'
  });
  
    $routeProvider.when('/med', {
    controller:gradstateListController, 
    templateUrl:'static/med.html'
  });  
  
    $routeProvider.when('/ahs', {
    controller:gradstateListController, 
    templateUrl:'static/ahs.html'
  });  
    
    $routeProvider.when('/dent', {
    controller:gradstateListController, 
    templateUrl:'static/dent.html'
  });  
        
    
});

function gradstateController($scope, $routeParams, $location, gradstate) {
  var self = this;
  
  gradstate.get({id:$routeParams.gradstateId}, function(response) {
    self.original = response;
    $scope.gradstate = new gradstate(self.original);
    //console.log(response);
  }); 
  
  $scope.save = function() {        
    $scope.gradstate.update(function() {
      $location.path('/');
    });    
  };     
  
  $scope.destroy = function() {
    self.original.destroy(function(response) {
      console.log(response);
      $location.path('/');
    });
  };
}

function CreategradstateController($scope, $location, gradstate) {
  $scope.save = function() {    
    gradstate.save($scope.gradstate, function(response) {
      $location.path('/');
    });    
  };  
}

function gradstateListController($scope, gradstate) {
  $scope.gradstate_list = gradstate.query();    
}

function gradstateListByYearController($scope, $routeParams, gradstate) {
  gradstate.query(function(response) {
    var gradstate_list = [];
    for(var idx=0;idx<response.length;idx++) {      
      var gradstate = response[idx];
      if(gradstate.year == $routeParams.year) {
        gradstate_list.push(gradstate);
      }
    }
    $scope.gradstate_list = gradstate_list;
  });
}



function YearListController($scope, $location, gradstate) {
  gradstate.query(function(response) {
    var years = {}; // {'2556':1}
    var year_list = [];
    
    for(var idx=0;idx<response.length;idx++) {      
      var gradstate = response[idx];
      if(gradstate.year && !years[gradstate.year]) {
        years[gradstate.year] = 1;
        year_list.push(gradstate.year);             
      }      
    }    
    year_list.sort();
    //console.log(year_list);
    $scope.year_list = year_list;    
  });  
  
  $scope.filter = function(year) {
    $location.path('/projects/'+year);
  };
  
}

function FacultyListController($scope, $location, gradstate) {
  gradstate.query(function(response) {
    var facultys = {}; // {'2556':1}
    var faculty_list = [];
    
    for(var idx=0;idx<response.length;idx++) {      
      var gradstate = response[idx];
      if(gradstate.faculty && !facultys[gradstate.faculty]) {
        facultys[gradstate.faculty] = 1;
        faculty_list.push(gradstate.faculty);             
      }      
    }    
    faculty_list.sort();
    console.log(faculty_list);
    $scope.faculty_list = faculty_list;    
  });  
  
  $scope.filter = function(faculty) {
    $location.path('/projects/'+faculty);
  };
  
}

function gradstateListByFacultyController($scope, $routeParams, gradstate) {
  consol.log("OK");
  gradstate.query(function(response) {
    var gradstate_list = [];
    for(var idx=0;idx<response.length;idx++) {      
      var gradstate = response[idx];
      if(gradstate.faculty== $routeParams.faculty) {
        gradstate_list.push(gradstate);
      }
    }
    $scope.gradstate_list = gradstate_list;
    console.log(gradstate_list);
  });
}

