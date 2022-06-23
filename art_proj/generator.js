
let net;
let video;
paper.install(window);



// olores
let pink42 = '#d101bf';

let count = 0;
let posPrevx = 0;
let posPrevy = 0;
let moveDotX = 480;
let moveDoty = 680;

let planetStartY = 450
let planetStartX = 750
let planetX = planetStartX;
let planetY = planetStartY;
let planetX2 = planetStartX;
let planetY2 = planetStartY;
let planetX3 = planetStartX;
let planetY3 = planetStartY;


let rghandposPrevx = 0;
let rghandposPrevy = 0;
let rghandmoveDotX = 880;
let rghandmoveDoty = 680;

let angle = (3 * Math.PI) / 2;
let movingpart = 0.15;
let angle2 = (3 * Math.PI) / 2;
let movingpart2 = 0.1;
let angle3 = (3 * Math.PI) / 2;
let movingpart3 = 0.15;

let nosePoint, leftHandPoint, rightHandPoint;

// planets
let speed = 1; // setting the speed of the rotation smaller number slowing it down larger number makes it faster
let planetOne;
let speed2 = 0.1; // setting the speed of the rotation smaller number slowing it down larger number makes it faster
let planetTwo;
let speed3 = 10; // setting the speed of the rotation smaller number slowing it down larger number makes it faster
let planet3;

let sunThemidle;

window.onload = function() {
    
    

    paper.setup('myCanvas')
    
    
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
        radius: 0
    });
    
    leftHandPoint = new Path.Circle({
        fillColor: 'blue',
        center: paper.view.center,
        radius: 0
    });
    
    rightHandPoint = new Path.Circle({
        fillColor: 'green',
        center: paper.view.center,
        radius: 0
    });

	// planetOne = new Path.Circle(new Point( planetStartX,  planetStartY), 80);
    // planetOne.fillColor = 'brown';

	// planetTwo = new Path.Circle(new Point( planetStartX,  planetStartY), 80);
    // planetTwo.fillColor = 'blue';


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

	
	ccircle2 = Path.Circle(new Point( moveDotX, moveDoty), 10);
	
	let ccircle = Path.Circle(new Point( rghandmoveDotX, rghandmoveDoty), 10);
	
	// planetCreate();

    video.onloadeddata = function() {
		setupNet();
        getPose();
		
        view.onFrame = function(event){
			
			// new version
			// planetMove(event);
            // end new

			// onFrame(event);
            
            
            // function onFrame(event) {
				//     // Each frame, rotate the path by 3 degrees:
				//     // if (!(event.count % 6))
				//       path.rotate(45);
				// 	}
				//if you want to do something every frame, do it here :)
				// let rect = Path.Rectangle(new Point(moveDotX, moveDoty), new Size(70, 50));
				// rect.strokeColor = 'black';
				// rect.strokeWidth = 2;
				// rect.fillColor = 'blue';
				// if (!(event.count % 6))
				// project.activeLayer.removeChildren(); 
				
				// rect.rotate(3); // rotating rectangle
				
				// xn = r * cos(a) and yn = r * sin(a)
				// if (!(event.count % 6))
                    movePlanet();
                    movePlanet2();
                    movePlanet3();
				// {
				// 	// angle += 0.01;
				// 	// if (angle > 2 * Math.PI)
				// 	// 	angle -= 2 * Math.PI;
				// 	// planetX = planetStartX + 300 * Math.cos(angle);
				// 	// planetY = planetStartY + 300 * Math.sin(angle);
				// 	// planetOne.position = new Point( planetX, planetY);
				// }
					
				
				
				// ccircle2.position = new Point(moveDotX, moveDoty);
				// ccircle.position = new Point(rghandmoveDotX, rghandmoveDoty);
				
				// ccircle2.fillColor = Color.random();
				// ccircle.fillColor = Color.random();
				
				// count++;
				// if (nosePoint)
				// 	console.log(nosePoint._position.x);
				getPose();
				

			movementsOneCircleSec();
			movementsOneCircle();
        }
    }

}


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




