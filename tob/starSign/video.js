//									VARIABLE INITIALISATION AND DECLARATION

paper.install(window);

function randomInt(min, max){
    return Math.floor(Math.random() * (max - min + 0.1) + min);
}

//star sign variables
let lastID = 0
let bodyPoints = []
let signStarts = []
let connectionLines = []

let movement = [];



let net;
let video;
let nosePoint, leftHandPoint, rightHandPoint

let cam_x = 630; //just by messurement, maybe find them somewhere 
let cam_y = 460; //

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

			console.log(poses.lenght);
            if(poses[0]){ //is there a person?
				
				if(poses[0].id != lastID){ //we have a new person here because we have not seen this persons ID yet
					lastID = poses[0].id //let's remember the current id/person
					//let possiblePoints = shuffle([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]) //mix up the order of these point IDs so I can later get a random subset from them. this is a nice trick to draw random numbers from a certain set where I want to make sure to not get the same number twice :)
					//let possiblePoints = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16] //mix up the order of these point IDs so I can later get a random subset from them. this is a nice trick to draw random numbers from a certain set where I want to make sure to not get the same number twice :)
					
					let possiblePoints = [0, 5, 6, 7, 8, 9, 10]

					//relove all stars and lines from the old person
					for(let i = 0; i<signStarts.length; i++){
						signStarts[i].remove()
					}
					for(let i = 0; i<connectionLines.length; i++){
						connectionLines[i].remove()
					}
					bodyPoints = []
					signStarts = []
					
					// //create new stars and lines for the new person
					// for(let i = 0; i< Math.random()*4+4; i++){ //i want to have 3-7 points
					// 	bodyPoints.push(possiblePoints[i]) //so I take the first n points from the previously shuffled array
						
					// 	console.log("keypoint: ", possiblePoints[i], poses[0].keypoints[possiblePoints[i]])
					// 	let s = new Path.Circle(poses[0].keypoints[possiblePoints[i]], 15)
					// 	s.fillColor = 'white'
					// 	signStarts.push( s ) //also safe the star/cicle shapes somewhere so I can move them around later on
					// }

					for(let i = 0; i< possiblePoints.length; i++){ //i want to have 3-7 points
						bodyPoints.push(possiblePoints[i]) //so I take the first n points from the previously shuffled array
						
						//console.log("keypoint: ", possiblePoints[i], poses[0].keypoints[possiblePoints[i]])

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
					let mov = 0;
					for(let i = 0; i<bodyPoints.length; i++){
						//ok this one is a bit tricky to read:
						// bodyPoints stores the random point IDs from tracking f.e. 0=left_eye or something
						//with the loop I now go through all these saved IDs and set them as the position of the matching star/circle

						let p = new Point();
						p = centerPoint(mirrorPoint(poses[0].keypoints[bodyPoints[i]]));
						mov += Math.abs(p.x - signStarts[i].position.x) + Math.abs(p.y - signStarts[i].position.y)
						p.x = (p.x + signStarts[i].position.x) / 2;
						p.y = (p.y + signStarts[i].position.y) / 2;

						signStarts[i].position = p;

						//console.log(poses[0].keypoints[10])
					}

					if (movement.length < 10) {
						movement.push(mov);
					}
					else {
						movement.shift();
						movement.push(mov);
					}
					let avg = 0;
					for (let i = 0; i < movement.length; i++) {
						avg += movement[i];
					}


					console.log(avg/movement.length);
				
					
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

//create a rocket ship
function createRocket(pos){
    let rocketbody = new Path({fillColor: 'orange', closed: true});
    let handle = new Point(randomInt(12,30), 0);
    handle = handle.rotate(randomInt(10,45));
    let handle2 = handle.rotate( (90-handle.angle)*2 );
    rocketbody.add([-6,0]);
    rocketbody.add(new Segment([0,-55], handle2, handle));
    rocketbody.add([6, 0]);
    rocketbody.position = pos;
    
    let wingcurve = randomInt(0,20);
    let wings = new Path({fillColor: 'orange', closed: true});
    wings.add([-16,0]);
    wings.add(new Segment([0,-rocketbody.bounds.height/2], [-wingcurve,0], [wingcurve,0]));
    wings.add([16, 0]);
    wings.bounds.bottomCenter = rocketbody.bounds.bottomCenter.subtract([0,5]);
    
    let eye = new Path.Circle(rocketbody.bounds.topCenter.add([0,rocketbody.bounds.height/3]), rocketbody.bounds.width/4);
    eye.fillColor = 'black';
    
    let tmp = rocketbody.unite(wings);
    let rocket = tmp.subtract(eye);
    rocketbody.remove();
    wings.remove();
    eye.remove();
    tmp.remove();
    rocket.fillColor = 'pink';
    
    return rocket;
    
}

//											MAIN EXECUTION

window.onload = function() {
	paper.setup('tracking');
	viewSizeWidth = paper.view.size.width;
	viewSizeHeight = paper.view.size.height;
	
	// let rocket = createRocket(view.bounds.center)
	// rocket.rotate(randomInt(1,360));
	// rocket.scale(4)

//	Video Setup
    video = document.getElementById('video');
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                video.srcObject = stream
                video.play()
            })
    }


    video.onloadeddata = function() {
        setupNet();
        getPose();

		view.onFrame = function(event){
			getPose();
        }
    }
}
