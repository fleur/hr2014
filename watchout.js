// start slingin' some d3 here.
//var gameboardWidth = 700;
//var gameboardHeight = 450;
var gameboardWidth = window.innerWidth;
var gameboardHeight = window.innerHeight;

// so what I think needs to be done to generate some number of asteroids
// is have an array of data to bind to each one
// i don't see the point of having values here, but maybe
// use the data to make the asterpods different sizes?
// does SVG scale graphics for you?
var dataset = [];
//var count = Math.round(Math.random()*100);
for (var i=0; i<20; i++) {
	dataset.push(20);
}

// function to find a random x,y coordinate for enemies
// that lies within the gameboard
// http://stackoverflow.com/questions/21205273/randomly-generating-coordinates-inside-a-bounded-region
// Find the bounding box of the polygon (easy, just find maxX maxY minX minY).
// Generate random coordinate inside the bounding box x=rand()%(maxX-minX)+minX (and same for Y)
var generateEnemyLocation = function(whichOne) {
	var rv = 0;
	
	if (whichOne === "x") {
		rv = Math.random()*5000 % gameboardWidth;
	} else if (whichOne === "y") {
		rv = Math.random()*5000 % gameboardHeight;
	}
	
	return rv;
};

// generate gameboard
var svg = d3.select("body")
	          .append("svg")
						.attr("class", "gameboard")
						.style("width", gameboardWidth+"px")
						.style("height", gameboardHeight+"px");

// shuirken pattern
d3.select("svg").append("pattern")
	 							.attr("id", "image")
								.attr("height", "20px")
								.attr("width", "20px");
d3.select("pattern").append("image")
									  .attr("height", "40px")
                    .attr("width", "40px")
										.attr("xlink:href","vortex-shuriken.jpg");
							      

// generate some asteroids				
var circles = svg.selectAll("circle")
    						.data(dataset)
    						.enter()
    						.append("circle")
								.attr("class", "enemy");

circles.attr("fill", "url(#image)")
		   .attr("cx", function(d, i) {
					return generateEnemyLocation("x");
				})
				.attr("cy", function(d, i) {
					return generateEnemyLocation("y");
				})
        .attr("r", function(d) {
            return d;
        })
				.attr("id", function(d, i) {
					return i;
				});

// set up dragging
// http://ssun.azurewebsites.net/creating-a-draggable-object-in-d3/
// HackReactor student!  :-)
var drag = d3.behavior.drag()  
             .on('dragstart', function() { player.style('fill', 'blue'); })
             .on('drag', function() { player.attr('cx', d3.event.x)
                                            .attr('cy', d3.event.y); })
             .on('dragend', function() { player.style('fill', 'red'); });

// generate the player in the center of the screen
var player = svg.append("circle")
	              .attr("id", "player")
								.attr("r", "15")
								.attr("cx", gameboardWidth/2 + "px")
								.attr("cy", gameboardHeight/2 + "px")
								.style("fill", "red")
								.call(drag);
								

// keep current score incrementing
var incrementCurrentScore = function() {
	var span = d3.select(".current").select("span");
	var curr = Number(span.text());
	span.text(curr+1);		
};
								
						
						
// on a collision, reset score to 0, increment collisions, possibly set high score
var highScore = 0;
var onCollision = function() {
}		
								

var transitionEnemies = function() {
	d3.selectAll(".enemy").each(function(d,i) {
			var enemy = d3.select(this)
										.transition()
			             	.duration(3000)
									 	.attr("cx", generateEnemyLocation("x"))
									 	.attr("cy", generateEnemyLocation("y"));
	});
}

var detectCollisions = function() {
	d3.selectAll(".enemy").each(function(d,i) {
			var enemy      = d3.select(this);
			var radiusSum  = parseFloat(enemy.attr('r')) + parseFloat(player.attr("r"));
			var xDiff      = parseFloat(enemy.attr('cx')) - parseFloat(player.attr("cx"));
			var yDiff      = parseFloat(enemy.attr('cy')) - parseFloat(player.attr("cy"));
			var separation = Math.sqrt( Math.pow(xDiff,2) + Math.pow(yDiff,2) )
			
			if (separation < radiusSum) {

					var highNode = d3.select(".high").select("span");
					var currentNode = d3.select(".current").select("span");
					var collisionsNode = d3.select(".collisions").select("span");

					var high = Number(highNode.text());
					var current = Number(currentNode.text());
					var collisions = Number(collisionsNode.text());

					currentNode.text(0);
					collisionsNode.text(collisions+1);
					highNode.text((current > high) ? current : high);
				}
		});	
}

setInterval(incrementCurrentScore, 100);
setInterval(transitionEnemies, 3000);
setInterval(detectCollisions, 20);