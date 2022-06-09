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

planetOne = new Path.Circle({
    position: new Point( planetStartX,  planetStartY),
    fillColor: 'purple',
    radius: 75
})

function movePlanet(){
    angle *= 0.01;
    if (angle > 2 * Math.PI)
       angle -= 2 * Math.PI;
    planetX = planetStartX + 300 * Math.cos(angle);
    planetY = planetStartY + 300 * Math.sin(angle);
    planetOne.position = new Point( planetX, planetY);
}
