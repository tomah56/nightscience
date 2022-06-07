
// array of stars
var stars = []

// factor for movement speed of stars
var velocity = 3

//	MAIN FUNCTION
// run function once in order to have a dynamic image from beginning
paper.setup('scenery');
starsGenerate();
assignRate();
function onFrame(event){
	// actual implementation of animation
	for(var i = 0; i < stars.length; i++){
		stars[i].translate(stars[i].rate, 0);
		if(stars[i].position.x > view.size.width){
			stars[i].position.x = 0;
		}
		else if(stars[i].position.x < 0){
			stars[i].position.x = view.size.width
		}
	}
}

// FUNCTION - randomizer for int
function randomInt(min, max){
	return Math.floor(Math.random()*(max-min+1)+min)
}

// FUNCTION - assign and randomize movement speed
function assignRate(){
	for (var i = 0; i < stars.length; i++ ){
		var assignedRate = Math.random() * velocity / 8;
		stars[i].rate = assignedRate;
	}
}

// FUNCTION - change velocity with keys A & D
function onKeyDown(event){
	if(event.key == 'd'){
		velocity += 1;
		assignRate();
	}
	else if(event.key == 'a'){
		velocity -= 1;
		assignRate();
	}
}

// FUNCTION - generate stars
function starsGenerate(){
	for(var i = 0; i <= 500; i++){
		var circle = new Path.Circle(new Point(view.size.width, view.size.height) * Point.random(), randomInt(0.5, 2));
		stars.push(circle);
	}
}

// FUNCTION - randomize color of stars
function starsRandomizeColors(){
	for(var i = 0; i <= 500; i++){
		var chance = Math.random();
		if (chance <= 0.6){
			stars[i].fillColor = 'white';
		}
		if (chance <= 0.3){
			stars[i].fillColor = 'yellow';
		}
		if (chance <= 0.2){
		circle.fillColor = "purple";
		}
	}
}
