// Equaluate input as either even (true) or (uneven) false
function isEven (value) {
	if (value%2 === 0)
		return true;
	else
		return false;
}

// Use D3.js to make a pie chart
// - data = Int
// - id = String
// - doRebuild = boolean
function makePie (data, id, doRebuild) {
	var width = 300,
    height = 300,
    radius = Math.min(width, height) / 2;

	var color = d3.scale.category20();

	var pie = d3.layout.pie()
	    .sort(null);

	var arc = d3.svg.arc()
	    .innerRadius(radius - 90)
	    .outerRadius(radius - 50);

	if(doRebuild === true) {
		d3.select("#" + id).selectAll("svg").remove();
	}

	svg = d3.select("#" + id).append("svg")
	    .attr("width", width)
	    .attr("height", height)
	    .append("g")
	    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	    var path = svg.selectAll("path")
	    .data(pie(data))
	    .enter().append("path")
	    .attr("fill", function(d, i) { return color(i); })
	    .attr("d", arc);

	return svg;
}

// Loops through weather data and returns array of marker objects
// markers defined by the period value passed in argument
function populateMap (isEven, period, weather) {
	var sliderValue = period;
	var markersTemp = [];
	var weatherPeriods = [];

	if (isEven(sliderValue) === true) {
		sliderValue = (sliderValue / 2) - 1;
	}
	else {
		sliderValue = ((sliderValue - 1) / 2) - 1;
	}

	for(var i = 0; i < 75; i++) {

		if(isEven(period))
		{
			weatherPeriod = {
				location: weather[i].location,
				country: weather[i].country,
				lat: weather[i].lat,
				lng: weather[i].lng,
				icon: weather[i].period[sliderValue].dayTime.weatherType,
				rainChance: weather[i].period[sliderValue].dayTime.rainChance,
				windSpeed: weather[i].period[sliderValue].dayTime.windSpeed,
				temp: weather[i].period[sliderValue].dayTime.temp,
				date: weather[i].period[sliderValue].date
			};
		}
		else {
			weatherPeriod = {
				location: weather[i].location,
				country: weather[i].country,
				lat: weather[i].lat,
				lng: weather[i].lng,
				icon: weather[i].period[sliderValue].nightTime.weatherType,
				rainChance: weather[i].period[sliderValue].nightTime.rainChance,
				windSpeed: weather[i].period[sliderValue].nightTime.windSpeed,
				temp: weather[i].period[sliderValue].nightTime.temp,
				date: weather[i].period[sliderValue].date
			};
		}
		weatherPeriods.push(weatherPeriod);
	}

	for(i = 0; i < weatherPeriods.length; i++) {
		icon = weatherPeriods[i].icon;
		title = 'm' + i;

		var marker = {
			id: i,
			latitude: weatherPeriods[i].lat,
			longitude: weatherPeriods[i].lng,
			icon: '/assets/weather-icons/w'+ icon +'.png',
			title: title,
			location: weatherPeriods[i].location,
			country: weatherPeriods[i].country,
			temp: weatherPeriods[i].temp,
			rainChance: weatherPeriods[i].rainChance,
			windSpeed: weatherPeriods[i].windSpeed,
			date: weatherPeriods[i].date
		};

		markersTemp.push(marker);
	}

	return markersTemp;
}