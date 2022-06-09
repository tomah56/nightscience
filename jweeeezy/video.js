
//									INITIALISATION
paper.install(window);

//				STARS
var starsArray = [];

//  Number of stars
var starCount = 200;

// factor for movement speed
var velocity = 2;

//  Colors
var color1 = "red";         //  60%
var color2 = "orange";      //  30%
var color3 = "yellow";      //  else

//				PLANET

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

//				TRACKING

let net;
let video;
let nosePoint, leftHandPoint, rightHandPoint

//									FUNCTIONS
//				STARS FUNCTIONS

//	FUNCTION - generate stars
function starsGenerate(){
	for(var i = 0; i <= starCount; i++){
	var starSingle = new Path.Circle(new Point(paper.view.size.width, paper.view.size.height) * Point.random(), randomInt(0.5, 2));
	starsArray.push(starSingle);
    starSingle.fillColor = color3;
	}
}

//	FUNCTION - Randomize color
function starsColorRandomize(){
	for(var i = 0; i <= starCount; i++){
		var chance = Math.random();
		if (chance <= 0.7){
			starsArray[i].fillColor = color1;
		}
		if (chance <= 0.3){
			starsArray[i].fillColor = color2;
		}
	}
}

//	FUNCTION - Translation/Animation
function starsTranslate(){
	for(var i = 0; i < starsArray.length; i++){
		starsArray[i].translate(starsArray[i].rate, 0);
		if(starsArray[i].position.x > paper.view.size.width){
			starsArray[i].position.x = 0;
		}
		else if(starsArray[i].position.x < 0){
			starsArray[i].position.x = paper.view.size.width
		}
	}
}

//	FUNCTION - randomizer for int
function randomInt(min, max){
    return Math.floor(Math.random()*(max-min+1)+min)
}

//	FUNCTION - Assign and randomize movement Speed
function starsAssignRate(){
    for (var i = 0; i < starsArray.length; i++ ){
        var assignedRate = Math.random() * velocity;
        starsArray[i].rate = assignedRate;
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

function planetCreate(){
	planetOne = new Path.Circle({
    position: new Point(planetStartX,  planetStartY),
    fillColor: 'purple',
    radius: 45
	})
}

function planetMove(){
    angle *= 0.01;
    if (angle > 2 * Math.PI)
       angle -= 2 * Math.PI;
    planetX = planetStartX + 300 * Math.cos(angle);
    planetY = planetStartY + 300 * Math.sin(angle);
    planetOne.position = new Point( planetX, planetY);
}

//				TRACKING FUNCTIONS

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

//									MAIN EXECUTION
window.onload = function() {
    paper.setup('tracking')
    video = document.getElementById('video');
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                video.srcObject = stream
                video.play()
            })
    }

    nosePoint = new Path.Circle({
        fillColor: 'red',
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

	planetCreate();
	starsGenerate();
	starsColorRandomize();
// run function once in order to have a dynamic image from beginning
	starsAssignRate();

    video.onloadeddata = function() {
        setupNet();
        getPose();

        view.onFrame = function(event){
            starsTranslate();
			getPose();
			planetMove();
        }
    }
}
