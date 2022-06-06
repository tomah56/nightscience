//	currently not working!



paper.install(window);

// array of stars
var stars = []

// factor for movement speed of stars
var velocity = 2


// randomizer for int
function randomInt(min, max){
    return Math.floor(Math.random()*(max-min+1)+min)
}

// generate stars
for(var i = 0; i <= 2000; i++){
	var circle = new Path.Circle(new Point(400, 400) * Point.random(), randomInt(0.5, 2));
	stars.push(circle);

}

// randomize color of stars
for(var i = 0; i <= 2000; i++){
    var chance = Math.random();
    if (chance <= 0.7){
        stars[i].fillColor = 'blue';
    }
    if (chance <= 0.3){
        stars[i].fillColor = 'purple';
    }
    if (chance <= 0.1){
    circle.fillColor = "yellow";
    }
}


// function to assign and randomize movement speed
function assignRate(){
    for (var i = 0; i < stars.length; i++ ){
        var assignedRate = Math.random() * velocity / 8;
        stars[i].rate = assignedRate;
    }
}

// run function once in order to have a dynamic image from beginning
assignRate()

// on Event Keypress event
// on Event Keypress event
// on Event Keypress event

video.onloadeddata = function() {
	setupNet();
	getPose();
	view.onFrame = function(event){
		//if you want to do something every frame, do it here :)
		//genStars();
		getPose();
}
}
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

// actual implementation of animation
function onFrame(event)
{
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
