//									VARIABLE INITIALISATION AND DECLARATION
let net;
let video;
paper.install(window);

// initialised as paper.view.size.* in main function
var viewSizeHeight;
var viewSizeWidth;

let blue42 = '#00babc';
let pink42 = '#d101bf';
let yellow42 = '#f1ca37';

//																					Variables - Stars

var starsArray = [];
var starsCount = 500;
var starsVelocity = 1;
var starsColor = 'white';
var starsKeyDownCounter = 0;


//																					Variables - Planet
// insert by Tom
let planetStartY = 450
let planetStartX = 750
let planetX = planetStartX;
let planetY = planetStartY;
let planetX2 = planetStartX;
let planetY2 = planetStartY;
let planetX3 = planetStartX;
let planetY3 = planetStartY;
let angle = (3 * Math.PI) / 2;
let movingpart = 0.15;
let angle2 = (3 * Math.PI) / 2;
let movingpart2 = 0.1;
let angle3 = (3 * Math.PI) / 2;
let movingpart3 = 0.15;


// planets
let speed = 1; // setting the speed of the rotation smaller number slowing it down larger number makes it faster
let planetOne;
let speed2 = 0.1; // setting the speed of the rotation smaller number slowing it down larger number makes it faster
let planetTwo;
let speed3 = 10; // setting the speed of the rotation smaller number slowing it down larger number makes it faster
let planet3;


// end planet
//	initialised in planetCreate
// var planetOne;
var planetOrbit;

//	initialised onFrame
var planetMoveTime;

var planetRadius = 100;
var planetColor = pink42;
var planetVelocity = 750;

//																					Variables - Galaxy

var galaxyArray1 = [];
var galaxyArray2 = [];

var galaxyRotateCounter = 0;
var galaxyDirection = new Point(1, 1);
var galaxyRotationFactor = 0.2;

//	initialised later in main function
var galaxyPosition1;
var galaxyPosition2;

//																			Variables - Motion Tracking


let nosePoint, leftHandPoint, rightHandPoint

let cam_x = 630; //just by messurement, maybe find them somewhere
let cam_y = 460; //

// Variables - MovementTracking

let movementBuffer = [];
let movementSampleSize = 15;
let snapFlag = false;

// Variables - StarSign

let lastID = 0
let bodyPoints = []
let signStarts = []
let connectionLines = []

let signStarBuffer = [];
let signStarLines = [];
//												FUNCTIONS

function randomCoordinate(min, max) {
	return Math.random() * (max - min) + min;
}

function randomInt(min, max){
    return Math.floor(Math.random() * (max - min + 0.1) + min);
}

//moves the motiontracking to the screen center
function centerPoint(pos) {
	pos.x = pos.x + paper.view.size.width / 2 - cam_x / 2;
	pos.y = pos.y + paper.view.size.height / 2 - cam_y / 2;
	return pos
};

//reverses the mirroring of the webcam
function mirrorPoint(point) {
	point.x = cam_x - point.x;
	return point
};

//shuffle an array inplace
function shuffle(array) {
	let currentIndex = array.length,  randomIndex;

	// While there remain elements to shuffle.
	while (currentIndex != 0) {

	  // Pick a remaining element.
	  randomIndex = Math.floor(Math.random() * currentIndex);
	  currentIndex--;

	  // And swap it with the current element.
	  [array[currentIndex], array[randomIndex]] = [
		array[randomIndex], array[currentIndex]];
	}

	return array;
  }

//																					Functions - Stars

function starsGenerate(){
	for(var i = 0; i <= starsCount; i++){
		var starSingle = new Path.Circle({
			center: new Point(randomCoordinate(0, viewSizeWidth), randomCoordinate(0, viewSizeHeight)),
			radius: randomInt(0.1, 4)});
    	starSingle.fillColor = starsColor;
		starsOrbit = new Path.Ellipse({
			position: paper.view.center,
			size: [randomInt(0, 100), randomInt(0, 100)],
			rotation: 1
		})
		starsArray.push(starSingle);
		starsRotationPoint = new Point (viewSizeWidth / 2, viewSizeHeight * 2);
	}
}

function starsAssignRateRandom(){
    for (var i = 0; i < starsArray.length; i++ ){
		starsArray[i].rate = randomInt(0.1, 1) + starsVelocity;
    }
}

function starsRotate(){
	for(var i = 0; i < starsArray.length; i++){
		starsArray[i].rotate(starsArray[i].rate * 0.005, starsRotationPoint);
		if(starsArray[i].position.x > viewSizeWidth){
			starsArray[i].position.x = 0;
		}
		else if(starsArray[i].position.x < 0){
			starsArray[i].position.x = viewSizeWidth;
		}
		if (starsArray[i].position.y > viewSizeHeight){
			starsArray[i].position.y = 0;
		}
		else if(starsArray[i].position.y < 0){
			starsArray[i].position.y = viewSizeHeight;
		}
	}
}

function starsChangeDirectionOnKeyDown(){
	if(starsKeyDownCounter < 15 && event.key == 'd'){
		starsVelocity += 1;
		starsAssignRateRandom();
		starsKeyDownCounter++;
	}
	if(starsKeyDownCounter > -15 && event.key == 'a'){
		starsVelocity -= 1;
		starsAssignRateRandom();
		starsKeyDownCounter--;
	}
}

//																					Functions - Planet

function planetCreate(){
	planetOne = new Path.Circle({
    position: new Point (800, 1000),
    fillColor: planetColor,
    radius: planetRadius,
	applyMatrix: false
	})
	planetOrbit = new Path.Ellipse({
		position: paper.view.center,
		size: [800, 350],
		rotation: 5
	});
}

function planetMove(event){
	planetMoveTime = event.count % planetVelocity / planetVelocity;
	var offset = planetMoveTime * planetOrbit.length;
	var point = planetOrbit.getPointAt(offset);
	var tangent = planetOrbit.getTangentAt(offset);
	planetOne.position = point;
	planetOne.rotation = tangent.angle;
}

//																					Functions - Galaxy

//	FUNCTION - places a circle of random size and color near position
function galaxyRandomizeCircle(position, galaxyStars){
	var galaxyRandomCircle = new Path.Circle({
		center: new Point(
		position.x + randomInt(-5, 5),
		position.y + randomInt(-5, 5)),
		radius: randomInt(1, 5)});
	var galaxyCircleChance = randomInt(1, 3);
	if (galaxyCircleChance == 1)
		galaxyRandomCircle.fillColor = blue42;
	else if (galaxyCircleChance == 2)
		galaxyRandomCircle.fillColor = yellow42;
	else if (galaxyCircleChance == 3)
		galaxyRandomCircle.fillColor = pink42;
	galaxyStars.push(galaxyRandomCircle);
}

//	FUNCTION - draw a spiral with center position
function galaxyDrawSpiral(position, offset, width, height, galaxyStars){

	for (var i = 0; i < 108; i++) {
		var np = new Point();
		var galaxySpiralRadius = (i + Math.random() / 0.5) * Math.PI / 24 + offset * Math.PI;
		np.x = position.x + Math.sin(galaxySpiralRadius) * width;
		np.y = position.y + Math.cos(galaxySpiralRadius) * height;
		np.x = (np.x - position.x) * i * i / 30 + position.x;
		np.y = (np.y - position.y) * i * i / 30 + position.y;
		galaxyRandomizeCircle(np, galaxyStars);
		galaxyRandomizeCircle(np, galaxyStars);
		galaxyRandomizeCircle(np, galaxyStars);
	}
}

//	FUNCTION - draws a Galaxy with the center at center
function galaxyDraw(center, galaxyStars){
	galaxyDrawSpiral(center, 0, 1, 1, galaxyStars);
	galaxyDrawSpiral(center, 1, 1, 1, galaxyStars);
}


//	FUNCTION - rotates the galaxy;
function galaxyRotate(deg, pos, galaxyStars){
	var galaxyRadius = deg / 180 * Math.PI;
	var cosa = Math.cos(galaxyRadius);
	var sina = Math.sin(galaxyRadius);
	for (var i = 0; i < galaxyStars.length; i++) {
		var x = galaxyStars[i].position.x - pos.x;
		var y = galaxyStars[i].position.y - pos.y;

		galaxyStars[i].position.x = cosa * x - sina * y + pos.x;
		galaxyStars[i].position.y = sina * x + cosa * y + pos.y;
	}
}

//	FUNCTION - translates te galaxy in direction vec
function galaxyTranslate(vec, galaxyStars){
	for (var i = 0; i < galaxyStars.length; i++){
		galaxyStars[i].position.x += vec.x;
		galaxyStars[i].position.y += vec.y;
	}
}

//																			Functions - Motion Tracking

async function setupNet(){

    const detectorConfig = {
                    modelType: poseDetection.movenet.modelType.MULTIPOSE_LIGHTNING,
                    enableTracking: true,
                    trackerType: poseDetection.TrackerType.BoundingBox
    };
    net = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);

    getPose();
}

async function getPose(){
	if(net){
		const poses = await net.estimatePoses(video, {flipHorizontal: true});


		if(poses[0]){ //is there a person?

			if(poses[0].id != lastID || snapFlag ){ //we have a new person here because we have not seen this persons ID yet
				lastID = poses[0].id //let's remember the current id/person

				snapFlag = false;
				let possiblePoints = shuffle([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]) //mix up the order of these point IDs so I can later get a random subset from them. this is a nice trick to draw random numbers from a certain set where I want to make sure to not get the same number twice :)
				//let possiblePoints = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16] //mix up the order of these point IDs so I can later get a random subset from them. this is a nice trick to draw random numbers from a certain set where I want to make sure to not get the same number twice :)

				//let possiblePoints = [0, 5, 6, 7, 8, 9, 10] //handpicked points

				//relove all stars and lines from the old person
				for(let i = 0; i<signStarts.length; i++){
					signStarts[i].remove()
				}
				for(let i = 0; i<connectionLines.length; i++){
					connectionLines[i].remove()
				}
				bodyPoints = [];
				signStarts = [];
				connectionLines = [];

				// //create new stars and lines for the new person
				for(let i = 0; i < Math.random() * 4 + 4; i++){ //i want to have 3-7 points
					bodyPoints.push(possiblePoints[i]) //so I take the first n points from the previously shuffled array

					let s = new Path.Circle(centerPoint(mirrorPoint(poses[0].keypoints[possiblePoints[i]])), 15);
					s.fillColor = 'white';
					signStarts.push( s ); //also safe the star/cicle shapes somewhere so I can move them around later on
				}


				for(let i = 0; i<signStarts.length-1; i++){ //iterating over the stars
					for(let j = i+1; j<signStarts.length; j++){ //second loop to get star pairs. starting with i+1 makes sure I don't get the same pairs twice (as in a-b and b-a)
						let line = new Path.Line(signStarts[i].position, signStarts[j].position)
						line.style = {
							strokeColor: 'white',
							strokeWidth: 3,
							dashArray: [40, 10]
						}
						line.opacity = 0.5
						line.star1 = i //additionally saving the star IDs that belong to this line. makes it easier later on
						line.star2 = j
						connectionLines.push(line) //also saving the line shape to change it later
					}
				}


			}else{ //no new person, just update position from tracking
				let movement = 0;

				for(let i = 0; i<bodyPoints.length; i++){
					//ok this one is a bit tricky to read:
					// bodyPoints stores the random point IDs from tracking f.e. 0=left_eye or something
					//with the loop I now go through all these saved IDs and set them as the position of the matching star/circle


					let p = new Point();
					p = centerPoint(mirrorPoint(poses[0].keypoints[bodyPoints[i]]));
					movement += Math.abs(p.x - signStarts[i].position.x) + Math.abs(p.y - signStarts[i].position.y);
					p.x = (p.x + signStarts[i].position.x) / 2;
					p.y = (p.y + signStarts[i].position.y) / 2;

					signStarts[i].position = p;
				}

				//tracking the overall movement of the person
				//if they stand still, the starSign will be saved
				trackMovement(movement);

				//I don't want all connection lines to be visible. I only want a few lines and in the best case its the shorter connected lines. that looks more like a star sign I think :)
				//so I sort the lines by length
				//this might be a new concept for you:
				//in javascript you can use functions as parameter inputs ("lambda function"). this is first a bit weird to wrap your head around but allows for some really cool stuff.
				//in this case this allows us to write a comparison function that defines by what attribute our objects should be sorted
				//the function has to return either 1, -1 or 0 depending on which of the two elements a or b should come first.
				//the ? : you see here are a short version of an if-statement. it is often used in inline functions as you can see here :) it works like: <boolen statement> ? <when true> : <else...>
				//here there are even two of these statements stacked into each other. that makes it even more confusing, so take a moment to think it through. thats a really tough line of code!
				connectionLines.sort(function(a,b) {return (a.length > b.length) ? 1 : ((b.length > a.length) ? -1 : 0)} )

				//so now lets go over all lines
				for(let i = 0; i<connectionLines.length; i++){
					if(signStarts[connectionLines[i].star2]){ //and update their position to the tracking data
						connectionLines[i].firstSegment.point = signStarts[connectionLines[i].star1].position
						connectionLines[i].lastSegment.point = signStarts[connectionLines[i].star2].position
					}
					if(i<connectionLines.length/2){ //when its in the shorter half make it visible
						connectionLines[i].strokeWidth = 3
					}else{
						connectionLines[i].strokeWidth = 0 //when not, make it invisible
					}
				}
			}

		}
	}
}

function starSignSnap() {
	for(var i = 0; i < signStarts.length; i++){
		var starSingle = new Path.Circle({
			center: new Point (signStarts[i].position.x, signStarts[i].position.y),
			radius: 15 });
		starSingle.radius = signStarts[i].radius;
		starSingle.fillColor = starsColor;
		signStarBuffer.push(starSingle);
	}
	for(var i = 0; i < connectionLines.length; i++){
		let newLine = new Path.Line(connectionLines[i].firstSegment.point, connectionLines[i].lastSegment.point);
		newLine.style = {
			strokeColor: 'white',
			strokeWidth: connectionLines[i].strokeWidth,
			dashArray: [40, 10]
		};
		newLine.opacity = 0.5;
		signStarLines.push(newLine);
	}

}

//acts as a timer
function setUpMovement() {
	for (let i = 0; i < movementSampleSize; i++)
		movementBuffer[i] = 1000;
}

function trackMovement(movement) {
	movementBuffer.shift();
	movementBuffer.push(movement);
	let avg = 0;
	for (let i = 0; i < movementBuffer.length; i++) {
		avg += movementBuffer[i];
	}
	avg /= movementBuffer.length;

	if (avg <= 8)
	{
		console.log(connectionLines.lenght);
		starSignSnap();
		snapFlag = true;
		setUpMovement();
	}
}

//moves the Saved starsigns around
function starsSignTranslate(rate){
	for(var i = 0; i < signStarBuffer.length; i++){
		signStarBuffer[i].translate(rate, 0);
	}
	for (let i = 0; i < signStarLines.length; i++) {
		signStarLines[i].translate(rate, 0);
	}
}


//											MAIN EXECUTION


window.onload = function() {
	paper.setup('tracking');
	viewSizeWidth = paper.view.size.width;
	viewSizeHeight = paper.view.size.height;

	setUpMovement();

//	Video Setup
    video = document.getElementById('video');
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                video.srcObject = stream
                video.play()
            })
    }

//	Stars Setup
	starsGenerate();
	starsAssignRateRandom();

//	Galaxy Setup
	galaxyPosition1 = new Point(randomCoordinate(200, viewSizeWidth), randomCoordinate(200, viewSizeHeight));
	//galaxyPosition2 = new Point(randomCoordinate(200, viewSizeWidth), randomCoordinate(200, viewSizeHeight));
	galaxyDraw(galaxyPosition1, galaxyArray1);
	//galaxyDraw(galaxyPosition2, galaxyArray2);

//	Planet Setup
	// planetCreate();
	loadPlanets();

    video.onloadeddata = function() {
        setupNet();
        getPose();

//																					Event - On Key Press

		view.onKeyDown = function(event){
			starsChangeDirectionOnKeyDown();
		}

//																					Event - each Frame

		view.onFrame = function(event){
			getPose();
			// starsTranslate();
			// planetMove(event);
			galaxyRotate(galaxyRotationFactor * 0.5, galaxyPosition1, galaxyArray1);
			galaxyRotate(galaxyRotationFactor * -0.3, galaxyPosition2, galaxyArray2);
			galaxyRotateCounter++;
			if (galaxyRotateCounter > 1500){
				galaxyDirection.x *= -1;
				galaxyDirection.y *= -1;
				galaxyRotateCounter = 0;
				galaxyRotationFactor *= -1;
			}
			movePlanet();
			movePlanet2();
			movePlanet3();
        }
    }
}
