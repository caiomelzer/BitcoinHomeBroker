angular.module('yapp')
    .controller('HomebrokerChartCtrl', function ($scope, $http) {
    	$scope.btc = {
			preco:[],
			data:[]
		};

    	function cotacaoUpdate(){
    		$http({
				method: 'GET',
				url: 'https://www.mercadobitcoin.net/api/BTC/trades/'
			}).then(function successCallback(response) {
				angular.forEach(response.data, function(value, key) {
					$scope.btc.preco.push(value.price);
				  	$scope.btc.data.push(value.date);
				});
			});
    	}

    	cotacaoUpdate();

		var config = {
            type: 'line',
            data: {
                labels: $scope.btc.data,
                datasets: [{
                    label: "Bitcoin",
                    data: $scope.btc.preco
                }]
            },
            options: {
                responsive: true,
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                }
            }
        };
        var ctx = document.getElementById("canvas").getContext("2d");
		window.myLine = new Chart(ctx, config);

	});
    //