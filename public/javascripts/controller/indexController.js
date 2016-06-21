/**
 * Created by luyuannie on 16/6/20.
 */
(function(){
    var pets=angular.module('entirelyPets',['ui.router','ngResource','ui.bootstrap','ngAnimate']);
    pets.run(function($rootScope) {
        $rootScope.totalProduct = 0;
    });
    pets.config(function($stateProvider){
        $stateProvider
            .state('dog',{
                url:'/dog',
                templateUrl:'dog',
                controller:'dogController'
            })
            .state('cat',{
                url:'/cat',
                templateUrl:'cat',
                controller:'catController'
            })
    });
    pets.controller("petsController",['$scope','catResource','dogResource',function($scope,catResource,dogResource){
        $scope.name='luyuan';
        /*$scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
            console.log("page number is: "+$scope.currentPage);
        };*/
        $scope.changeCatTotalProducts = function(){
            catResource.catData.getData(function(datas){
                $scope.totalProduct= datas.length;
                console.log("product is"+$scope.totalProduct);
            });
        };
        $scope.changedogTotalProducts = function(){
            dogResource.dogData.getData(function(datas){
                $scope.totalProduct= datas.length;
                console.log("product is"+$scope.totalProduct);
            });
        }

    }]);

    pets.controller("catController",['$scope','catResource',function($scope,catResource){
        $scope.currentPage = 1;
        $scope.pageChanged = function() {
            console.log('Page changed to: ' + $scope.currentPage);
        };
        catResource.catData.getData(function(data){
            $scope.datas = data;
            $scope.totalProduct= data.length;
        });
    }]);

    pets.controller("dogController",['$scope','dogResource',function($scope,dogResource){
        $scope.currentPage = 1;
        $scope.pageChanged = function() {
            console.log('Page changed to: ' + $scope.currentPage);
        };
        dogResource.dogData.getData(function(data){
            $scope.datas = data;
            $scope.totalProduct= data.length;
        });
    }]);

    pets.factory("catResource",['$resource',function($resource){
        return {
            catData:$resource('/cat.json',{},{
                getData:{method:'GET', isArray:'false'}
            })
        }
    }]);

    pets.factory("dogResource",['$resource',function($resource){
        return {
            dogData:$resource('/dog.json',{},{
                getData:{method:'GET', isArray:'false'}
            })
        }
    }]);
    pets.filter('startFrom', function() {
        return function(input, start) {
            if(input) {
                console.log(input);
                console.log(start);
                start = +start; //parse to int
                return input.slice(start);
            }
            return [];
        }
    });
})();