//									INITIALISATION
//				STARS PROPERTIES

var stars = [];
// factor for movement speed
var velocity = 2;

//  Number of stars
var starCount = 200;

//  Colors
var color1 = "red";         //  60%
var color2 = "orange";      //  30%
var color3 = "yellow";      //  else

//				PLANET PROPERTIES
var count = 0;
var posPrevx = 0;
var posPrevy = 0;
var moveDotX = 480;
var moveDoty = 680;

var planetStartY = 450
var planetStartX = 750
var planetX = planetStartX;
var planetY = planetStartY;

var rghandposPrevx = 0;
var rghandposPrevy = 0;
var rghandmoveDotX = 880;
var rghandmoveDoty = 680;
var angle = 0.1;

var planetOne;




//									FUNCTIONS
//				STARS FUNCTIONS

//	FUNCTION - generate stars
function starsGenerate(){
	for(var i = 0; i <= starCount; i++){
	var circle = new Path.Circle(new Point(view.size.width, view.size.height) * Point.random(), randomInt(0.5, 2));
	stars.push(circle);
    circle.fillColor = color3;
	}
}

//	FUNCTION - Randomize color
function starsColorRandomize(){
	for(var i = 0; i <= starCount; i++){
    var chance = Math.random();
    if (chance <= 0.7){
        stars[i].fillColor = color1;
    }
    if (chance <= 0.3){
        stars[i].fillColor = color2;
    }
	}
}

//	FUNCTION - Translation/Animation
function starsTranslate(){
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

//	FUNCTION - randomizer for int
function randomInt(min, max){
    return Math.floor(Math.random()*(max-min+1)+min)
}

//	FUNCTION - Assign and randomize movement Speed
function starsAssignRate(){
    for (var i = 0; i < stars.length; i++ ){
        var assignedRate = Math.random() * velocity;
        stars[i].rate = assignedRate;
    }
}

//	FUNCTION - change velocity with keys A or D
function onKeyDown(event){
    if(event.key == 'd'){
        velocity += 2;
        starsAssignRate();
    }
    else if(event.key == 'a'){
        velocity -= 2;
        starsAssignRate();
    }
}

//				PLANET FUNCTIONS

function movePlanet(){
    angle *= 0.01;
    if (angle > 2 * Math.PI)
       angle -= 2 * Math.PI;
    planetX = planetStartX + 300 * Math.cos(angle);
    planetY = planetStartY + 300 * Math.sin(angle);
    planetOne.position = new Point( planetX, planetY);
}

function planetCreate(){
	planetOne = new Path.Circle({
    position: new Point( planetStartX,  planetStartY),
    fillColor: 'purple',
    radius: 75
})
}

//									MAIN EXECUTION

starsGenerate();
starsColorRandomize();
// run function once in order to have a dynamic image from beginning
starsAssignRate();

//  Animation on event (each frame)
view.onFrame = function(event){
	starsTranslate();
	if (!(event.count % 3)){
		movePlanet();
	}
}
