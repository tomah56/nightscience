//									VARIABLE INITIALISATION AND DECLARATION

paper.install(window);

//

// track nose
// let nosePoint;

// initialised as paper.view.size.* in main function
var viewSizeHeight;
var viewSizeWidth;

let blue42 = '#00babc';
let pink42 = '#d101bf';
let yellow42 = '#f1ca37';

var universeVelocity = -4;
var universeRotationPoint;

//																					Variables - Stars

var starsArray = [];
var starsCount = 650;
var starsColor = 'white';
var starsKeyDownCounter = 0;


//																					Variables - Planet

let posPrevx = 0;
let posPrevy = 0;
let planetStartY = 450
let planetStartX = 750

//	planetOne properties
let planetX = planetStartX;
let planetY = planetStartY;
let angle = (3 * Math.PI) / 2;
let movingpart = 0.15;
let speed = 1;
let planetOne;

//	planetTwo properties
let planetX2 = planetStartX;
let planetY2 = planetStartY;
let angle2 = (3 * Math.PI) / 2;
let movingpart2 = 0.1;
let speed2 = 0.1;
let planetTwo;

//	planetThree properties
let planetX3 = planetStartX;
let planetY3 = planetStartY;
let angle3 = (3 * Math.PI) / 2;
let movingpart3 = 0.15;
let speed3 = 10;
let planet3;

//																					Variables - Galaxy

//	galaxyOne properties
var galaxyArray1 = [];
var galaxyPosition1;
var galaxySizeFactor1 = 0.9;
var galaxyRotationFactor1 = galaxySizeFactor1 * 0.01;
var	galaxyVariance1 = 16;

//	galaxyTwo properties
var galaxyArray2 = [];
var galaxyPosition2;
var galaxySizeFactor2 = 0.35;
var galaxyRotationFactor2 = galaxySizeFactor2 * 0.02;
var	galaxyVariance2 = 300;

//	galaxyThree properties
var	galaxyArray3 = [];
var	galaxyPosition3;
var galaxySizeFactor3 = 0.58;
var	galaxyRotationFactor3 = galaxySizeFactor3 * 0.03;
var	galaxyVariance3 = 45;

//	galaxyFour properties
var	galaxyArray4 = [];
var	galaxyPosition4;
var galaxySizeFactor4 = 0.6;
var	galaxyRotationFactor4 = galaxySizeFactor4 * 0.015;
var	galaxyVariance4 = 25;

//																			Variables - Motion Tracking

let net;
let video;
let nosePoint;

//just by messurement, maybe find them somewhere
let cam_x = 630;
let cam_y = 460;

//	Variables - MovementTracking
let movementBuffer = [];
let movementSampleSize = 15;
let snapFlag = false;

//	Variables - StarSign
let x_offset = 0;
let y_offset = 0;

let lastID = 0
let bodyPoints = []
let signStarts = []
let connectionLines = []

let signStarBuffer = [];
let signStarLines = [];
let signRotationCenter;

let signStarsCount = 10;
let signCount = 5;
let signLinesCount = signStarsCount * (signStarsCount - 1) / 2;
let motionTrigger = 20;

let fullCircle = 0;

//												FUNCTIONS

function randomCoordinate(min, max) {
	return Math.random() * (max - min + 0.1) + min;
}

function randomInt(min, max){
    return Math.floor(Math.random() * (max - min + 0.1) + min);
}

function randomColor() {
	let i = randomInt(0, 3);
	if (i > 3)
		return 'white';
	else if (i == 0)
		return yellow42;
	else if (i == 1)
		return pink42;
	else if (i == 2)
		return blue42;
}

function assignRateRandom(Array){
    for (var i = 0; i < Array.length; i++ ){
		Array[i].rate = randomInt(0.1, 1) + universeVelocity;
    }
}

function shuffleArray(array) {
	let currentIndex = array.length,  randomIndex;
	while (currentIndex != 0) {
	  randomIndex = Math.floor(Math.random() * currentIndex);
	  currentIndex--;
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
			radius: randomInt(0.01, 2)});
    	starSingle.fillColor = starsColor;
		starsOrbit = new Path.Ellipse({
			position: paper.view.center,
			size: [randomInt(0, 100), randomInt(0, 100)],
			rotation: 1
		})
		starsArray.push(starSingle);
	}
}

function starsRotateUniverse(){
	for(var i = 0; i < starsArray.length; i++){
		starsArray[i].rotate(starsArray[i].rate * 0.005, universeRotationPoint);
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
	if(starsKeyDownCounter < 1000 && event.key == 'd'){
		universeVelocity += 1;
		assignRateRandom(starsArray);
		starsKeyDownCounter++;
	}
	if(starsKeyDownCounter > -1000 && event.key == 'a'){
		universeVelocity -= 1;
		assignRateRandom(starsArray);
		starsKeyDownCounter--;
	}
}

//																					Functions - Planet


function planetsCreate()
{
	planetOne = new Path.Circle({
		position: new Point( planetStartX,  planetStartY),
        fillColor: 'brown',
        radius: 30
    })

	planetTwo = new Path.Circle({
		position: new Point( planetStartX,  planetStartY),
        fillColor: '#d101bf',
        radius: 90
    })

	planet3 = new Path.Circle({
		position: new Point( planetStartX,  planetStartY),
        fillColor: '#d845bf',
        radius: 40
    })

    sunThemidle = new Path.Circle({
		position: new Point( planetStartX,  planetStartY),
        fillColor: 'yellow',
        radius: 90
    })
}


function planetsMove()
{
	let pbigA = 200;
	let pbigB = 150;

	let radius = 80;

	let curvature;
	let distanceX;
	let distanceY;

	//set the resolution of the movment
	angle += 0.005 * speed;
	if (angle > 2 * Math.PI)
		angle -= 2 * Math.PI;
	// elliptic movment
	planetX = planetStartX + 500 * Math.cos(angle);
	planetY = planetStartY + 180 * Math.sin(angle);

	if (planetStartX < planetX)
		distanceX = planetX - planetStartX;
	else
		distanceX = planetStartX - planetX;

	if (planetStartY < planetY)
		distanceY = planetY - planetStartY;
	else
		distanceY = planetStartY - planetY;

	curvature = (distanceX / distanceY); // determing the position based curvature in the elliptic orbit
	curvature = 1.1 - Math.exp(-curvature); //makes the shrinking/growth smoot on the edges based on the curvature

	if (angle < Math.PI / 2 || angle > (3 * Math.PI) / 2) // up part
		movingpart += 0.0018 * curvature * speed;
	else if (angle > Math.PI / 2 && angle < (3 * Math.PI) / 2)
	{
		movingpart -= 0.0018 * curvature * speed;
		if (movingpart < 0)
			movingpart *=-1;
	}

	planetOne.remove();

	radius *= movingpart;

	planetOne = new Path.Circle( new Point( planetX, planetY), radius);
	planetOne.fillColor = 'brown';
	if (angle < 0 || angle > Math.PI)
		planetOne.insertBelow(sunThemidle);
}

function planetsMove2()
{
	let pbigA = 200;
	let pbigB = 150;

	let radius = 90;

	let curvature;
	let distanceX;
	let distanceY;

	//set the resolution of the movment
	angle2 += 0.005 * speed2;
	if (angle2 > 2 * Math.PI)
		angle2 -= 2 * Math.PI;
	// elliptic movment
	planetX2 = planetStartX + 1000 * Math.cos(angle2);
	planetY2 = planetStartY + 200 * Math.sin(angle2);

	if (planetStartX < planetX2)
		distanceX = planetX2 - planetStartX;
	else
		distanceX = planetStartX - planetX2;

	if (planetStartY < planetY2)
		distanceY = planetY2 - planetStartY;
	else
		distanceY = planetStartY - planetY2;

	curvature = (distanceX / distanceY); // determing the position based curvature in the elliptic orbit
	curvature = 1.1 - Math.exp(-curvature); //makes the shrinking/growth smoot on the edges based on the curvature

	if (angle2 < Math.PI / 2 || angle2 > (3 * Math.PI) / 2) // up part
		movingpart2 += 0.0016 * curvature * speed2;
	else if (angle2 > Math.PI / 2 && angle2 < (3 * Math.PI) / 2)
	{
		movingpart2 -= 0.0016 * curvature * speed2;
		if (movingpart2 < 0)
			movingpart2 *=-1;
	}

	planetTwo.remove();

	radius *= movingpart2;

	planetTwo = new Path.Circle( new Point( planetX2, planetY2), radius);
	planetTwo.fillColor = pink42;
	if (angle2 < 0 || angle2 > Math.PI)
		planetTwo.insertBelow(sunThemidle);
}

function planetsMove3()
{
	let pbigA = 200;
	let pbigB = 150;

	let radius = 40;

	let curvature;
	let distanceX;
	let distanceY;

	//set the resolution of the movment
	angle3 += 0.005 * speed3;
	if (angle3 > 2 * Math.PI)
		angle3 -= 2 * Math.PI;
	// elliptic movment
	planetX3 = planetStartX + 180 * Math.cos(angle3);
	planetY3 = planetStartY + 50 * Math.sin(angle3);

	if (planetStartX < planetX3)
		distanceX = planetX3 - planetStartX;
	else
		distanceX = planetStartX - planetX3;

	if (planetStartY < planetY3)
		distanceY = planetY3 - planetStartY;
	else
		distanceY = planetStartY - planetY3;

	curvature = (distanceX / distanceY); // determing the position based curvature in the elliptic orbit
	curvature = 1.1 - Math.exp(-curvature); //makes the shrinking/growth smoot on the edges based on the curvature

	if (angle3 < Math.PI / 2 || angle3 > (3 * Math.PI) / 2) // up part
		movingpart3 += 0.0016 * curvature * speed3;
	else if (angle3 > Math.PI / 2 && angle3 < (3 * Math.PI) / 2)
	{
		movingpart3 -= 0.0016 * curvature * speed3;
		if (movingpart3 < 0)
			movingpart3 *=-1;
	}

	planet3.remove();

	radius *= movingpart3;

	planet3 = new Path.Circle( new Point( planetX3, planetY3), radius);
	planet3.fillColor = '#d845bf';

	if (angle3 < 0 || angle3 > Math.PI)
		planet3.insertBelow(sunThemidle);
}

let setSteppPlanetGrav = 1;
let sensibilityLefRigth = 5;
let sensibilityUpDown = 5;

function planetsMoveOnNosePoint()
{
	if (nosePoint != undefined && nosePoint._position != undefined)
	{
		if ((posPrevx - nosePoint._position.x + sensibilityLefRigth) < 0)
		{
			// console.log("left\n");
			planetStartX -= setSteppPlanetGrav;
			// moveDotX -= 30;
			posPrevx = nosePoint._position.x;
		}
		else if ((nosePoint._position.x - posPrevx + sensibilityLefRigth) < 0)
		{
			planetStartX += setSteppPlanetGrav;
			// console.log("right\n");
			// moveDotX += 30;
			posPrevx = nosePoint._position.x;
		}
		if ((posPrevy - nosePoint._position.y + sensibilityUpDown) < 0)
		{
			planetStartX += setSteppPlanetGrav;
			// console.log("down\n");
			// moveDoty += 30;
			posPrevy = nosePoint._position.y;
		}
		else if ((nosePoint._position.y - posPrevy + sensibilityUpDown) < 0)
		{
			planetStartX -= setSteppPlanetGrav;
			// console.log("up\n");
			// moveDoty -= 30;
			posPrevy = nosePoint._position.y;
		}
	}
}

//																					Functions - Galaxy

//	FUNCTION - places a circle of random size and color near position
function galaxyRandomizeCircle(position, galaxyArray, galaxySizeFactor){
	var galaxyRandomCircle = new Path.Circle({
		center: new Point(
		position.x + randomInt(-5, 5),
		position.y + randomInt(-5, 5)),
		radius: randomInt(0.5, 3) * galaxySizeFactor});
	var galaxyCircleChance = randomInt(1, 3);
	if (galaxyCircleChance == 1)
		galaxyRandomCircle.fillColor = blue42;
	else if (galaxyCircleChance == 2)
		galaxyRandomCircle.fillColor = yellow42;
	else if (galaxyCircleChance == 3)
		galaxyRandomCircle.fillColor = pink42;
	galaxyArray.push(galaxyRandomCircle);
}

//	FUNCTION - draw a spiral with center position
function galaxyDrawSpiral(position, offset, width, height, galaxyArray, galaxySizeFactor, galaxyVariance){

	for (var i = 0; i < 100 + (galaxyVariance * galaxySizeFactor); i++) {
		var np = new Point();
		var galaxySpiralRadius = (i + Math.random() / 0.5) * Math.PI / 24 + offset * Math.PI;
		np.x = position.x + Math.sin(galaxySpiralRadius) * width  * galaxySizeFactor / 2;
		np.y = position.y + Math.cos(galaxySpiralRadius) * height  * galaxySizeFactor / 2;
		np.x = (np.x - position.x) * i * i / 30 + position.x + (randomInt(1, galaxyVariance) * galaxySizeFactor);
		np.y = (np.y - position.y) * i * i / 30 + position.y + (randomInt(1, galaxyVariance) * galaxySizeFactor);
		galaxyRandomizeCircle(np, galaxyArray, galaxySizeFactor);
		galaxyRandomizeCircle(np, galaxyArray, galaxySizeFactor);
		galaxyRandomizeCircle(np, galaxyArray, galaxySizeFactor);
	}
}

//	FUNCTION - draws a Galaxy with the center at center
function galaxyDraw(galaxyPosition, galaxyArray, galaxySizeFactor, galaxyVariance){
	var offset = Math.random();
	galaxyDrawSpiral(galaxyPosition, offset, 1, 1, galaxyArray, galaxySizeFactor, galaxyVariance);
	galaxyDrawSpiral(galaxyPosition, offset + 1, 1, 1, galaxyArray, galaxySizeFactor, galaxyVariance);
}

//	FUNCTION - rotates the galaxy around universeRotationPoint;
function galaxyRotateUniverse(galaxyRotationFactor, galaxyArray){
		for (var i = 0; i < galaxyArray.length; i++) {
		galaxyArray[i].rotate(galaxyRotationFactor * universeVelocity, universeRotationPoint);
	}
	return(galaxyArray[0].position);
}

function galaxyRotateCenter(galaxyArray, galaxyRotationFactor, galaxyPosition){
		for (var i = 0; i < galaxyArray.length; i++) {
		galaxyArray[i].rotate(galaxyRotationFactor * universeVelocity * 2.5, galaxyPosition);
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

function cleanMotionCapture() {
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
}

function findLastPerson(poses) {
	for (let i = 0; i < poses.length; i++) {
		if( lastID == poses[i].id)
			return i;
	}
	return 0;
}

async function getPose(){
	if(net){
		const poses = await net.estimatePoses(video, {flipHorizontal: true});

		starSignRotateCenter(-0.1);

		if (fullCircle >= signCount){
			cleanMotionCapture();
			return;
		}
		// console.log("N Personen: " + poses.length);
		// for (let i = 0; i < poses.length; i++) {
		// 	console.log("ID:" + poses[i].id);
		// }
		if(poses[0]){ //is there a person?

			let index = findLastPerson(poses);
			if(poses[index].id != lastID || snapFlag ){ //we have a new person here because we have not seen this persons ID yet
				lastID = poses[index].id //let's remember the current id/person

				snapFlag = false; // after a snap we initialze a new starsign

				let possiblePoints = shuffleArray([5,6,7,8,9,10,11,12,13,14]) //mix up the order of these point IDs so I can later get a random subset from them. this is a nice trick to draw random numbers from a certain set where I want to make sure to not get the same number twice :)

				cleanMotionCapture();

				//create new stars and lines for the new person
				for(let i = 0; i < signStarsCount; i++){ //i want to have 3-7 points
					bodyPoints.push(possiblePoints[i]) //so I take the first n points from the previously shuffled array

					let s = new Path.Circle(centerPoint(mirrorPoint(poses[0].keypoints[possiblePoints[i]]), signRotationCenter), randomInt(3, 15));
					if (possiblePoints[i] == 13 || possiblePoints[i] == 14){
						s.fillColor = blue42;
						// 13,14
					}
					else if (possiblePoints[i] < 11 && possiblePoints[i] > 6){
						s.fillColor = yellow42;
						// 7,8,9,10
					}
					else {
						s.fillColor = pink42;
						// 5,6,11,12
					}
					// s.fillColor = randomColor();
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
						line.insertBelow(signStarts[i])
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
					p = centerPoint(mirrorPoint(poses[index].keypoints[bodyPoints[i]]), signRotationCenter);
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

//moves the motiontracking to the screen center
function centerPoint(pos, center) {
	pos.x = pos.x + (center.x - cam_x / 2);
	pos.y = pos.y + (center.y - cam_y / 2);
	return pos
};


//	Function - reverses the mirroring of the webcam
function mirrorPoint(point) {
	point.x = cam_x - point.x;
	return point
}

//	Function - acts as a timer
function setUpMovement() {
	for (let i = 0; i < movementSampleSize; i++)
		movementBuffer[i] = 1000;
}

function trackMovement(movement) {

	//add the newest movement, removes the oldest
	movementBuffer.shift();
	movementBuffer.push(movement);

	//calculate the average
	let avg = 0;
	for (let i = 0; i < movementBuffer.length; i++) {
		avg += movementBuffer[i];
	}
	avg /= movementBuffer.length;

	//snap the sign when person standing still
	if (avg <= motionTrigger)
	{
		starSignSnap();
		snapFlag = true;
		setUpMovement();
		starSignRotateCenter(360/signCount);
	}
}

function cleanStarSigns() {
	for (let i = 0; i < signCount * signStarsCount; i++) {
		signStarBuffer[0].remove();
		signStarBuffer.shift();
	}
	for (let i = 0; i < signLinesCount * signCount; i++) {
		signStarLines[0].remove();
		signStarLines.shift();
	}
}

function starSignRollingCleanup() {
	if (signStarBuffer.length >= (signCount - 1) * signStarsCount)
	{
		for (let i = 0; i < signStarsCount; i++) {
			signStarBuffer[0].remove();
			signStarBuffer.shift();
		}
	}
	if (signStarLines.length >= (signCount - 1) * signLinesCount)
	{
		for (let i = 0; i < signLinesCount; i++) {
			signStarLines[0].remove();
			signStarLines.shift();
		}
	}
}

function resetStarSigns() {
	if (event.key == 'q') {
		cleanStarSigns();
		fullCircle = 0;
	}
}

function starSignSnap() {
	fullCircle += 1;
	for(var i = 0; i < signStarts.length; i++){
		var starSingle = new Path.Circle({
			center: new Point (signStarts[i].position.x, signStarts[i].position.y),
			radius: signStarts[i].bounds.width/2 });
		starSingle.radius = signStarts[i].radius;
		starSingle.fillColor = signStarts[i].fillColor;
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
		newLine.insertBelow(signStarBuffer[0]);
		signStarLines.push(newLine);
	}
}

//rotates the starsigns around the canvas center
function starSignRotate(rate){
	for(var i = 0; i < signStarBuffer.length; i++){
		signStarBuffer[i].rotate(rate, paper.view.center);
	}
	for (let i = 0; i < signStarLines.length; i++) {
		signStarLines[i].rotate(rate, paper.view.center);
	}
}

function starSignRotateCenter(deg) {
	var radians = (Math.PI / 180) * deg;
	cos = Math.cos(radians);
	sin = Math.sin(radians);
	let nx = (cos * (signRotationCenter.x - viewSizeWidth / 2))
		+ (sin * (signRotationCenter.y - viewSizeHeight / 2)) + viewSizeWidth / 2;
	let ny = (cos * (signRotationCenter.y - viewSizeHeight / 2))
		- (sin * (signRotationCenter.x - viewSizeWidth / 2)) + viewSizeHeight / 2;
	signRotationCenter.x = nx;
	signRotationCenter.y = ny;
}

//											MAIN EXECUTION


window.onload = function() {
	paper.setup('tracking');
	viewSizeWidth = paper.view.size.width;
	console.log("viewSizeWidth:", viewSizeWidth);
	viewSizeHeight = paper.view.size.height;
	console.log("viewSizeHeight:", viewSizeHeight);
	console.log("paper.view.center:", paper.view.center);


	universeRotationPoint = paper.view.center;
	signRotationCenter = new Point (viewSizeWidth / 2 - viewSizeHeight / 4, viewSizeHeight / 4);

	nosePoint = new Path.Circle({
        radius: 0
    });

	setUpMovement();

//	Logo Setup
	let item = paper.project.importSVG('http://127.0.0.1:5500/nightscience/resources/42logo.svg',
		function(foo) {
			let scaleFactor = 1.3;
			foo.scale(scaleFactor);
			foo.position = new paper.Point(
				viewSizeWidth - foo.bounds.width + 100 * scaleFactor,
				viewSizeHeight - foo.bounds.height + 70 * scaleFactor)
		}
	);

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
	assignRateRandom(starsArray);

//	Galaxy Setup
	galaxyPosition1 = new Point(200,200);
	galaxyPosition2 = new Point(paper.view.center.x, paper.view.center.y);
	galaxyPosition3 = new Point (1600,1200);
	galaxyPosition4 = new Point (2500,500);
	galaxyDraw(galaxyPosition1, galaxyArray1, galaxySizeFactor1, galaxyVariance1);
	galaxyDraw(galaxyPosition2, galaxyArray2, galaxySizeFactor2, galaxyVariance2);
	galaxyDraw(galaxyPosition3, galaxyArray3, galaxySizeFactor3, galaxyVariance3);
	galaxyDraw(galaxyPosition4, galaxyArray4, galaxySizeFactor4, galaxyVariance4);

//	Planet Setup
	//planetsCreate();

    video.onloadeddata = function() {
        setupNet();
        getPose();

//																					Event - On Key Press

		view.onKeyDown = function(event){
			starsChangeDirectionOnKeyDown();
			resetStarSigns();
		}

//																					Event - each Frame

		view.onFrame = function(event){
			getPose();
			starsRotateUniverse();
			starSignRotate(0.1);
			galaxyRotateCenter(galaxyArray1, galaxyRotationFactor1, galaxyRotateUniverse(galaxyRotationFactor1, galaxyArray1));
			galaxyRotateCenter(galaxyArray2, galaxyRotationFactor2, galaxyRotateUniverse(galaxyRotationFactor2, galaxyArray2));
			galaxyRotateCenter(galaxyArray3, galaxyRotationFactor3, galaxyRotateUniverse(galaxyRotationFactor3, galaxyArray3));
			galaxyRotateCenter(galaxyArray4, galaxyRotationFactor4, galaxyRotateUniverse(galaxyRotationFactor4, galaxyArray4));
			//planetsMove();
			//planetsMove2();
			//planetsMove3();
			//sunThemidle.position = new Point( planetStartX,  planetStartY);
			//planetsMoveOnNosePoint();
		}

    }
}
