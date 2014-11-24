function getMap(data) {

	var map;

	var mapOptions = {
		zoom: 6,
		center: new google.maps.LatLng(64.661517 , -17.907715)
	
	};

	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	for (var i = 0; i <= 500; i++) {

		var lat = data[i].lat;
		var lng = data[i].lng;
		console.log(data[i].period[0].dayTime.weatherType);
		var shape = {
			coords: [1,1,1,20,18,20,18,1],
			type: 'poly'
		};

		var position = new google.maps.LatLng( lat, lng);

		var marker = new google.maps.Marker({
			position: position,
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
});
		