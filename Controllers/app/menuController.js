app.controller('menuController',[
    '$scope',
    function($scope){
       $scope.model = { title : 'our menu'};

      $scope.$watch('model.mainDish',function(newValue,oldValue){
          if(newValue == 'BBQ Chicken Pizza'){
              alert('You have selected BBQ chiken Pizza!');
          }
      });
       $scope.changeMainDish = function(item){
           $scope.model.mainDish = item;

       }
    }
]);