app.controller('labController', [
    '$scope', '$timeout','$q', '$http','gitHub',
    function ($scope,$timeout,$q,$http,$gitHub) {
        $scope.model={
            number : 0,
            result : 'Ready',
        };
        $scope.checkOddNumber = checkOddNumber;
        $scope.getRepos = getRepos;
        $scope.loadDetail = loadDetail;

        function loadDetail(name) {
            $scope.model.detail = gitHub.getDetail({ id: name });
        }
       

        function getRepos(){
                $scope.model.repos = gitHub.getAll();
            }
        
        function checkOddNumber(input){
            $scope.model.result = 'Working...';
            checkOddNumberHandler(input).then(function(result){
                $scope.model.result = 'Success: '+result; 
            },function(result){
                $scope.model.result = 'Error' + result;
            })
        }
        //checkOddNumberHandler function returns a promise. The .then() method works 
        //off of that $promise. The first function passed into the 
        //.then() method gets called when the promise is resolved 
        //successfully. The second function gets called if the promise
        //gets rejected for some reason.
        function checkOddNumberHandler(input){
           var defer = $q.defer();

           $timeout(function(){
               if(isNumberOdd(input)){
                   defer.resolve('Yes, an odd number');
               } else{
                   defer.reject('Not an odd number');
               }
           },1000);
           return defer.promise;
           //This is a function where the $promise is actually being created
           //and delivered. The $q.defer() method sets up the $promise object
           //which is then returned instead of the return value by the function.
           //Handler functions designed to work with promises use this returned
           //object to bind to the incoming value when it is asynchronously
           //resolved by this function via the .resolve() or .reject() methods
           //on the $promise object created by $q.defer().

           //We are using timeout to simulate a delayed response of 1 second
           //from a server. 
        }
        function isNumberOdd(input){
            return !isNaN(input) && input % 2 == 1;
        }
    }
]);