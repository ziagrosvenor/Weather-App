function getMap(data) {

	var map;

	var mapOptions = {
		zoom: 8,
		center: new google.maps.LatLng(51.468489 , -2.5907094)
	};

	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	for (var i = 0; i <= 500; i++) {

		var lat = data[i].lat;
		var lng = data[i].lng;
		var weatherType = data[i].period[0].dayTime.weatherType;

		var shape = {
			coords: [1,1,1,20,18,20,18,1],
			type: 'poly'
		};

		var position = new google.maps.LatLng( lat, lng);

		var marker = new google.maps.Marker({
			position: position,
			icon: '/weather-icons/w'+ weatherType +'.png',
			map: map
		});

		marker.setTitle((i + 1).toString());
	}
}

$(document).ready(function(){
	mapData = $.ajax({
		url: "/api/map",
		type: "GET",
		success: function(data, status) {
			console.log(data);
			getMap(data);
		}
	});

	$( "#slider" ).slider({
		range: true,
		values: [ 17, 67 ]
	});
});