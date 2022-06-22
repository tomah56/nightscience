paper.install(window);


window.onload = function() {
	
	paper.setup('can1');
	
	//requred for each galaxy
	var position1 = new Point(paper.view.center);
	var position2 = new Point(300, 400);
	var galaxyStars1 = [];
	var galaxyStars2 = [];
	
	drawGalaxy(position1, galaxyStars1);
	drawGalaxy(position2, galaxyStars2);
	
	var count = 0;
	var dir = new Point(1, 0);
	var rot = 0.2;

	view.onFrame = function(event){
		galaxyRotate(rot, position1, galaxyStars1);
		galaxyRotate(rot, position2, galaxyStars2);
		galaxyTranslate(dir, galaxyStars1);
		galaxyTranslate(dir, galaxyStars2);

		count++;
			if (count > 250){
					dir.x *= -1;
					dir.y *= -1;
					count = 0;
					rot *= -1;
				}
			view.update();
		}
		
	}
	
function randomInt(min, max){
		return Math.floor(Math.random()*(max-min+1)+min)
	}

//	COLORS
let blue42 = '#00babc';
let pink42 = '#d101bf';
let yellow42 = '#f1ca37';

//	FUNCTION - rotates the galaxy;
function galaxyRotate(deg, pos, galaxyStars) {
	var rad = deg / 180 * Math.PI;
	var cosa = Math.cos(rad);
	var sina = Math.sin(rad);
	for (var i = 0; i < galaxyStars.length; i++) {
		var x = galaxyStars[i].position.x - pos.x;
		var y = galaxyStars[i].position.y - pos.y;

		// maybe fancy direction
		// var dis = Math.sqrt(x * x + y * y);
		// cosa = Math.cos((rad / dis) * 200);
		// sina = Math.sin((rad / dis) * 200);
		
		galaxyStars[i].position.x = cosa * x - sina * y + pos.x;
		galaxyStars[i].position.y = sina * x + cosa * y + pos.y;
	}

}


//	FUNCTION - translates te galaxy in direction vec
function galaxyTranslate(vec, galaxyStars) {
	for (var i = 0; i < galaxyStars.length; i++) {
		galaxyStars[i].position.x += vec.x;
		galaxyStars[i].position.y += vec.y;
	}
}


//	FUNCTION - draws a Galaxy with the center at center
function drawGalaxy(center, galaxyStars) {
	drawSpiral(center, 0, 1, 1, galaxyStars);
	drawSpiral(center, 1, 1, 1, galaxyStars);
}

//	FUNCTION - draw a spiral with center position
function drawSpiral(position, offset, width, height, galaxyStars) {

	for (var i = 0; i < 108; i++) {
		var np = new Point();
		var rad = (i + Math.random() / 0.5) * Math.PI / 24 + offset * Math.PI;
		np.x = position.x + Math.sin(rad) * width;
		np.y = position.y + Math.cos(rad) * height;
		np.x = (np.x - position.x) * i * i / 30 + position.x;
		np.y = (np.y - position.y) * i * i / 30 + position.y;
		randCircle(np, galaxyStars);
		randCircle(np, galaxyStars);
		randCircle(np, galaxyStars);
	}
}

//	FUNCTION - places a circle of random size and color near position
function randCircle(position, galaxyStars){
	var circle = new Path.Circle({
		center: new Point(
		position.x + randomInt(-5, 5),
		position.y + randomInt(-5, 5)),
		radius: randomInt(1, 5)});
	var chance = randomInt(1, 3);
	if (chance == 1)
		circle.fillColor = blue42;
	else if (chance == 2)
		circle.fillColor = yellow42;
	else if (chance == 3)
		circle.fillColor = pink42;
	galaxyStars.push(circle);
}