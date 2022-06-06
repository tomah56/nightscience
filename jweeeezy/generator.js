let net;
let video;
paper.install(window);

window.onload = function() {
    paper.setup('trackingCanvas')

	    video = document.getElementById('video');
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                video.srcObject = stream
                video.play()
            })
    }

	nosePoint = new Path.Circle({
		fillColor: 'white',
		center: paper.view.center,
		radius: 5
	})

    leftHandPoint = new Path.Circle({
        fillColor: 'white',
        center: paper.view.center,
        radius: 5
    })

    rightHandPoint = new Path.Circle({
        fillColor: 'white',
        center: paper.view.center,
		radius: 5
	})
	leftKneePoint = new Path.Circle({
        fillColor: 'white',
        center: paper.view.center,
		radius: 5
    })
	rightKneePoint = new Path.Circle({
        fillColor: 'white',
        center: paper.view.center,
		radius: 5
    })


    video.onloadeddata = function() {
		setupNet();
        getPose();
        view.onFrame = function(event){
			//if you want to do something every frame, do it here :)
			//genStars();
            getPose();
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
				leftKneePoint.position = poses[0].keypoints.find(obj => {
					return obj.name == "left_knee"
				})
				rightKneePoint.position = poses[0].keypoints.find(obj => {
					return obj.name == "right_knee"
				})
            }
        }

}
}
