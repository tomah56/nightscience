
let net;
let video;
paper.install(window);
let count = 0;
let posPrevx = 0;
let posPrevy = 0;
let moveDotX = 480;
let moveDoty = 680;


let rghandposPrevx = 0;
let rghandposPrevy = 0;
let rghandmoveDotX = 880;
let rghandmoveDoty = 680;

let nosePoint, leftHandPoint, rightHandPoint


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
    })
    
    leftHandPoint = new Path.Circle({
        fillColor: 'blue',
        center: paper.view.center,
        radius: 0
    })
    
    rightHandPoint = new Path.Circle({
        fillColor: 'green',
        center: paper.view.center,
        radius: 0
    })
    
	var rect = new Path.Rectangle({
		point: [475, 575],
		size: [75, 75],
		strokeColor: 'white'
	});


	ccircle2 = Path.Circle(new Point( moveDotX, moveDoty), 10);
	
	let ccircle = Path.Circle(new Point( rghandmoveDotX, rghandmoveDoty), 10);
	
    video.onloadeddata = function() {
		setupNet();
        getPose();
		
        view.onFrame = function(event){
			
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
				
				rect.rotate(3);
				
				
				ccircle2.position = new Point(moveDotX, moveDoty);
				ccircle.position = new Point(rghandmoveDotX, rghandmoveDoty);
				
				ccircle2.fillColor = Color.random();
				ccircle.fillColor = Color.random();
				
				// count++;
				// if (nosePoint)
				// 	console.log(nosePoint._position.x);
				getPose();
				

			movementsOneCircleSec();
			movementsOneCircle();
			
        }
       
    }
    
   


}



async function movementsOneCircle(){

	if (rightHandPoint != undefined && rightHandPoint._position != undefined)
	{
		if ((rghandposPrevx - rightHandPoint._position.x + 10) < 0)
		{
			// console.log("left\n");
			rghandmoveDotX -= 30;
			rghandposPrevx = rightHandPoint._position.x;
		}
		else if ((rightHandPoint._position.x - rghandposPrevx + 10) < 0)
		{
			// console.log("right\n");
			rghandmoveDotX += 30;
			rghandposPrevx = rightHandPoint._position.x;
		}
		if ((rghandposPrevy - rightHandPoint._position.y + 5) < 0)
		{
			// console.log("down\n");
			rghandmoveDoty += 30;
			rghandposPrevy = rightHandPoint._position.y;
		}
		else if ((rightHandPoint._position.y - rghandposPrevy + 5) < 0)
		{
			// console.log("up\n");
			rghandmoveDoty -= 30;
			rghandposPrevy = rightHandPoint._position.y;
		}
		// count = 0;
	}
}
async function movementsOneCircleSec()
{

	if (nosePoint != undefined && nosePoint._position != undefined)
	{
		if ((posPrevx - nosePoint._position.x + 10) < 0)
		{
			// console.log("left\n");
			moveDotX -= 30;
			posPrevx = nosePoint._position.x;
		}
		else if ((nosePoint._position.x - posPrevx + 10) < 0)
		{
			// console.log("right\n");
			moveDotX += 30;
			posPrevx = nosePoint._position.x;
		}
		if ((posPrevy - nosePoint._position.y + 5) < 0)
		{
			// console.log("down\n");
			moveDoty += 30;
			posPrevy = nosePoint._position.y;
		}
		else if ((nosePoint._position.y - posPrevy + 5) < 0)
		{
			// console.log("up\n");
			moveDoty -= 30;
			posPrevy = nosePoint._position.y;
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




