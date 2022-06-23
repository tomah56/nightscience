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
var starsCount = 200;
var starsVelocity = 0;
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

//												FUNCTIONS

function randomCoordinate(min, max) {
	return Math.random() * (max - min) + min;
}

function randomInt(min, max){
    return Math.floor(Math.random() * (max - min + 0.1) + min);
}

//																					Functions - Stars

function starsGenerate(){
	for(var i = 0; i <= starsCount; i++){
		var starSingle = new Path.Circle({
			center: new Point(randomCoordinate(0, viewSizeWidth), randomCoordinate(0, viewSizeHeight)),
			radius: randomInt(0.1, 4)});
    	starSingle.fillColor = starsColor;
		starsArray.push(starSingle);
	}
}

function starsAssignRateRandom(){
    for (var i = 0; i < starsArray.length; i++ ){
		starsArray[i].rate = Math.random() + starsVelocity;
    }
}

function starsTranslate(){
	for(var i = 0; i < starsArray.length; i++){
		starsArray[i].translate(starsArray[i].rate, 0);
		if(starsArray[i].position.x > viewSizeWidth){
			starsArray[i].position.x = 0;
		}
		else if(starsArray[i].position.x < 0){
			starsArray[i].position.x = viewSizeWidth;
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

		// maybe fancy direction
		// var dis = Math.sqrt(x * x + y * y);
		// cosa = Math.cos((galaxyRadius / dis) * 200);
		// sina = Math.sin((galaxyRadius / dis) * 200);

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

            if(poses[0]){
                nosePoint.position = poses[0].keypoints.find(obj => {
                    return obj.name == "nose"
                })
                leftHandPoint.position = poses[0].keypoints.find(obj => {
                    return obj.name == "left_wrist"
                })
                rightHandPoint.position = poses[0].keypoints.find(obj => {
                    return obj.name == "right_wrist"
                })
            }
        }
}

//											MAIN EXECUTION


window.onload = function() {
	paper.setup('tracking');
	viewSizeWidth = paper.view.size.width;
	viewSizeHeight = paper.view.size.height;

//	Video Setup
    video = document.getElementById('video');
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                video.srcObject = stream
                video.play()
            })
    }

//	Motion Tracking Setup -- Later we should put them into functions
    nosePoint = new Path.Circle({
        fillColor: 'green',
        center: paper.view.center,
        radius: 10
    })
    leftHandPoint = new Path.Circle({
        fillColor: 'lightgreen',
        center: paper.view.center,
        radius: 10
    })
    rightHandPoint = new Path.Circle({
        fillColor: 'lightgreen',
        center: paper.view.center,
        radius: 10
    })

//	Stars Setup
	starsGenerate();

//	Galaxy Setup
	galaxyPosition1 = new Point(randomCoordinate(200, viewSizeWidth), randomCoordinate(200, viewSizeHeight));
	galaxyPosition2 = new Point(randomCoordinate(200, viewSizeWidth), randomCoordinate(200, viewSizeHeight));
	galaxyDraw(galaxyPosition1, galaxyArray1);
	galaxyDraw(galaxyPosition2, galaxyArray2);

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
			starsTranslate();
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
