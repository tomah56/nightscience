paper.install(window);

let blue42 = '#00babc';
let pink42 = '#d101bf';
let yellow42 = '#f1ca37';

var galaxyStars = [];

window.onload = function() {

	paper.setup('can1');

	var position = new Point(paper.view.center);
	
	drawGalaxy(position)

	var count = 0;
	var dir = new Point(1, 0);
	var rot = 0.2;

	view.onFrame = function(event){
		galaxyRotate(rot, position);
	// 	galaxyTranslate(dir);
	// count++;
	// 	if (count > 250){
	// 		dir.x *= -1;
	// 		dir.y *= -1;
	// 		count = 0;
	// 		rot *= -1;
	// 	}
		view.update();
	}
	
}

function galaxyRotate(deg, pos) {
	var rad = deg / 180 * Math.PI;
	var cosa = Math.cos(rad);
	var sina = Math.sin(rad);
	for (var i = 0; i < galaxyStars.length; i++) {
		var x = galaxyStars[i].position.x - pos.x;
		var y = galaxyStars[i].position.y - pos.y;

		// var dis = Math.sqrt(x * x + y * y);
		// cosa = Math.cos((rad / dis) * 200);
		// sina = Math.sin((rad / dis) * 200);
		
		galaxyStars[i].position.x = cosa * x - sina * y + pos.x;
		galaxyStars[i].position.y = sina * x + cosa * y + pos.y;
	}

}

function galaxyTranslate(vec) {
	for (var i = 0; i < galaxyStars.length; i++) {
		galaxyStars[i].position.x += vec.x;
		galaxyStars[i].position.y += vec.y;
	}
}


function randomInt(min, max){
	return Math.floor(Math.random()*(max-min+1)+min)
}

function drawGalaxy(center) {
	drawSpiral(center, 0, 1, 1.5);
	drawSpiral(center, 1, 1, 1.5);
}

function drawSpiral(position, offset, width, height) {

	for (var i = 0; i < 108; i++) {
		var np = new Point();
		var rad = (i + Math.random() / 0.5) * Math.PI / 24 + offset * Math.PI;
		np.x = position.x + Math.sin(rad) * width;
		np.y = position.y + Math.cos(rad) * height;
		np.x = (np.x - position.x) * i * i / 30 + position.x;
		np.y = (np.y - position.y) * i * i / 30 + position.y;
		randCircle(np);
		randCircle(np);
		randCircle(np);
	}
}

function randCircle(position){
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