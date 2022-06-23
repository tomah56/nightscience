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

function shrinkValueCalculator(angle)
{
	

		if ( angle > 0 /* &&  (angle < 180 || angle > 0) */) // up part
		{
			// shrinkPlanet *= 0.018;
			shrinkPlanet += 0.4;
		}
		else if (angle < 0 /* && (angle < 0 || angle > -180) */) // up part
		{
			// shrinkPlanet /= 0.018;
			shrinkPlanet -= 0.4;
		}
		// movingpart += trythis/10;
		
}

function planetMove(event){
	planetMoveTime = event.count % planetVelocity / planetVelocity;
	var offset = planetMoveTime * planetOrbit.length;
	var point = planetOrbit.getPointAt(offset);
	var tangent = planetOrbit.getTangentAt(offset);
	// planetOne.position = point;
	// planetOne.rotation = tangent.angle;
	// console.log(tangent);
	// console.log(planetOrbit.getCurvatureAt(offset));
	// curveture under 0.0012
	console.log(planetMoveTime);
	console.log(offset);


	
	// version shrinking
	// closest -180egree
	//  lllll 0 
	//   -1       --> ++
	// 				-->180
	//  -180 <--
	if (planetOrbit.getCurvatureAt(offset) > 0.0012)
		shrinkValueCalculator(tangent.angle);
	planetOne.remove();
	planetOne = new Path.Circle( point, shrinkPlanet);
	planetOne.rotation = tangent.angle;
    planetOne.fillColor = planetColor;
	// planetOne.rotation = 



}