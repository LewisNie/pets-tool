/**
 * Created by luyuannie on 16/6/20.
 */
(function(){
    var pets=angular.module('entirelyPets',['ui.router','ngResource','ui.bootstrap','ngAnimate']);

    pets.controller("petsController",['$scope','dataResource','dogResource',function($scope,dataResource,dogResource){
        $scope.currentPage = 1;
        $scope.selectedCategory={ id :-1};
        $scope.selectedSubCategory={id:-1};
        $scope.pageChanged = function() {
            console.log('Page changed to: ' + $scope.currentPage);
        };
        dataResource.data.getData(function(data){
                $scope.datas = data;
                $scope.totalProduct= data.length;
        });
        $scope.PetConditionChange=function(data){
            $scope.petType=data;
            dataResource.PetConditionSend.getPetType({petType:data,selectedCategory:-1,selectedSubCategory:-1},{},function(data){
                $scope.datas= data.result;
                $scope.totalProduct= $scope.datas.length;
            },function(err){
                console.log(err);
            })
        };

        $scope.$watch("petType",function(oldValue,newValue){
            if(oldValue != newValue) {
                if (oldValue == 'dog') {
                    $scope.Categories = [{
                        id: 0,
                        label: 'Flea & Tick Supplies',
                        subCategory: [{
                            id: 0,
                            label: 'Topicals'
                        }, {
                            id: 1,
                            label: 'Oral Treatments & Supplements'
                        }, {
                            id: 2,
                            label: 'Collars'
                        }]
                    }, {
                        id: 1,
                        label: 'Joint Supplements',
                        subCategory: [{
                            id: 0,
                            label: 'Hip & Joint Maintenance'
                        }, {
                            id: 1,
                            label: 'Extra Strength Joint Support'
                        }, {
                            id: 2,
                            label: 'Senior Joint Supplements'
                        }]
                    }, {
                        id: 2,
                        label: 'Dental Products',
                        subCategory: [{
                            id: 0,
                            label: 'Dental Water Additives'
                        }, {
                            id: 1,
                            label: 'Other Dental Products'
                        }, {
                            id: 2,
                            label: 'Dental Supplements'
                        }]
                    }];
                }
                else {
                    $scope.Categories = [{
                        id: 0,
                        label: 'Cat Toys',
                        subCategory: [{
                            id: 0,
                            label: 'Cat Balls'
                        }, {
                            id: 1,
                            label: 'Catnip Toys'
                        }, {
                            id: 2,
                            label: 'Cat Scratchers'
                        }]
                    }, {
                        id: 1,
                        label: 'Cat Food',
                        subCategory: [{
                            id: 0,
                            label: 'Dry Cat Food'
                        }, {
                            id: 1,
                            label: 'Freeze Dried Cat Food'
                        }, {
                            id: 2,
                            label: 'Kitten Milk Replacer'
                        }]
                    }, {
                        id: 2,
                        label: 'Cat Treats & Chews',
                        subCategory: [{
                            id: 0,
                            label: 'Catnip Treats'
                        }, {
                            id: 1,
                            label: 'Dental Cat Treats'
                        }, {
                            id: 2,
                            label: 'Freeze Dried Cat Treats'
                        }]
                    }]
                }
            }
        });
        $scope.$watch("selectedCategory",function(oldValue,newValue){
            if(oldValue!=newValue){
                dataResource.PetConditionSend.getPetType({petType:$scope.petType,selectedCategory:$scope.selectedCategory.id,selectedSubCategory:-1},{},function(data){
                    $scope.datas= data.result;
                    $scope.totalProduct= $scope.datas.length;
                },function(err){
                    console.log(err);
                })
            }
        });
        $scope.$watch("selectedSubCategory",function(oldValue,newValue){
            if(oldValue!=newValue){
                dataResource.PetConditionSend.getPetType({petType:$scope.petType,selectedCategory:$scope.selectedCategory.id,selectedSubCategory:$scope.selectedSubCategory.id},{},function(data){
                    $scope.datas= data.result;
                    $scope.totalProduct= $scope.datas.length;
                },function(err){
                    console.log(err);
                })
            }
        });

        $scope.sortby=[{
            id:0,
            label:'name'
        },{
            id:1,
            label:'price'
        }];
        $scope.$watch("sortType",function(oldValue,newValue){
           if(oldValue!=newValue){
               if(oldValue.id==1){
                   $scope.datas.sort(function(a,b){
                       return a.price- b.price;
                   });
               }
               if(oldValue.id==0){
                   $scope.datas.sort(function(a,b){
                        if(a.product_name< b.product_name){
                            return -1;
                        }
                       if(a.product_name> b.product_name){
                           return 1;
                       }
                       return 0;
                   })
               }
           }
        });
        $scope.reset=function(){
            location.reload();
        }

    }]);

    pets.factory("dataResource",['$resource',function($resource){
        return {
            data:$resource('/data.json',{},{
                getData:{method:'GET', isArray:'false'}
            }),
            PetConditionSend:$resource('/api/public/:petType/:selectedCategory/:selectedSubCategory',{petType:"@petType",selectedCategory:"@selectedCategory",selectedSubCategory:"@selectedSubCategory"},{
                getPetType:{method:'get',isArray:false}
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
                start = +start; //parse to int
                return input.slice(start);
            }
            return [];
        }
    });
})();