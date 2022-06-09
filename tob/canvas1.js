paper.install(window);

let blue42 = '#00babc';
let pink42 = '#d101bf';
let yellow42 = '#f1ca37';

var stars = [];
window.onload = function() {

	paper.setup('can1');

	var myPath1 = new Path();
	var myPath2 = new Path();
	var count;

	var position = new Point(paper.view.center);
	

	drawSpiral(myPath1, position, 0, 1, 1.2);
	drawSpiral(myPath2, position, 1, 1, 1.2);
	randCircle(position);
	view.onFrame = function(event){
		view.update();
	}
	
}


function randomInt(min, max){
	return Math.floor(Math.random()*(max-min+1)+min)
}



function drawSpiral(myPath, position, offset, width, height) {

	myPath.strokeColor = 'white';
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
	stars.push(circle);
}