
var getDateString = function(date) {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    return year + "-" + month + "-" + day;
};

var getPercentIncrease = function(data) {
	//console.log(data);
  var prices = _.map(data, function(value) { return value['Close']; });
  var latest = prices[0];
  var earliest = prices[prices.length-1];

  return Math.round(((latest - earliest)/earliest) * 100);
};

/* ripped off directly from mbostock's example */

var displayGraph = function(error, ticker, data) {

	var margin = {top: 20, right: 40, bottom: 30, left: 50},
	width = 480 - margin.left - margin.right,
	height = 250 - margin.top - margin.bottom;

	var parseDate = d3.time.format("%y-%b-%d").parse;

	var x = d3.time.scale()
	.range([0, width]);

	var y = d3.scale.linear()
	.range([height, 0]);

	var xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom");
	//.ticks(d3.time.months, 2)
  //.tickFormat(d3.time.format("%b"));

	var yAxis = d3.svg.axis()
	.scale(y)
	.orient("left");

	var area = d3.svg.area()
	.x(function(d) { return x(d.Date); })
	.y0(height)
	.y1(function(d) { return y(d.Close); });

	//var $table = $("table");
	//var $trow = $("<tr id=\""+ticker+"\"></tr>");
	//var $tdata = $("<td></td>");

	//$table.append($trow);
	//$trow.append($tdata);

	$("#container").append("<div id=\""+ticker+"\" class=\"col-md-4\"></div>");

	var svg = d3.select("#"+ticker).append("svg")
	.attr("id", ticker)
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


	data.forEach(function(d) {
		d.Date = new Date(d.Date);
		d.Close = +d.Close;
	});

	x.domain(d3.extent(data, function(d) { return d.Date; }));
	y.domain([d3.min(data, function(d) { return d.Close; }),
						d3.max(data, function(d) { return d.Close; })]);

	svg.append("path")
	.datum(data)
	.attr("class", "area")
	.attr("d", area);

	svg.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + height + ")")
	.call(xAxis);

	svg.append("g")
	.attr("class", "y axis")
	.call(yAxis)
	.append("text")
	.attr("transform", "rotate(-90)")
	.attr("y", 6)
	.attr("dy", ".71em")
	.style("text-anchor", "end")
	.text("Price ($)");

	var $change = $("<div class=\"col-md-2\"></div>");
	$change.text(ticker+": "+getPercentIncrease(data) + "%");
	// $trow.append($change);

	//$("#"+ticker).append($change);
	$("#container").append($change);



};
