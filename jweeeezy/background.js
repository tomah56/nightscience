// initialisation array of stars
var stars = [];

//      ADJUSTABLE PROPERTIES

// factor for movement speed
var velocity = 3;

//  Number of stars
var starCount = 500;

//  Colors
var color1 = "red";         //  60%
var color2 = "orange";      //  30%
var color3 = "yellow";      //  else

//      HELPER FUNCTIONS

// FUNCTION - randomizer for int
function randomInt(min, max){
    return Math.floor(Math.random()*(max-min+1)+min)
}

// FUNCTION - Assign and randomize movement Speed
function assignRate(){
    for (var i = 0; i < stars.length; i++ ){
        var assignedRate = Math.random() * velocity;
        stars[i].rate = assignedRate;
    }
}

// FUNCTION - change velocity with keys A or D
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

//      MAIN FUNCTION

// generate stars
for(var i = 0; i <= starCount; i++){
	var circle = new Path.Circle(new Point(view.size.width, view.size.height) * Point.random(), randomInt(0.5, 2));
	stars.push(circle);
    circle.fillColor = color3;
}

// Randomize color
for(var i = 0; i <= starCount; i++){
    var chance = Math.random();
    if (chance <= 0.7){
        stars[i].fillColor = color1;
    }
    if (chance <= 0.3){
        stars[i].fillColor = color2;
    }
}

// run function once in order to have a dynamic image from beginning
assignRate();

//  Animation on event (each frame)
function onFrame(event){
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

