

paper.install(window);

let video;


window.onload = function(){
    paper.setup("universe");

    video = document.getElementById('video');
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                video.srcObject = stream
                video.play()
            })
    }

    video.onloadeddata = function(){

        view.onFrame = function(event){
            if (!(event.count % 3)){
                movePlanet();
            }
        }
    }
}
