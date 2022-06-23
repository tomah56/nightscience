function loadPlanets()
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


function movePlanet()
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
}

function movePlanet2()
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
}

function movePlanet3()
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

		// sunThemidle.insertBelow(planet3);

}



function movementsOneCircle(){

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
function movementsOneCircleSec()
{

	if (nosePoint != undefined && nosePoint._position != undefined)
	{
		if ((posPrevx - nosePoint._position.x + 10) < 0)
		{
			// console.log("left\n");
			planetStartX -= 10;
			// moveDotX -= 30;
			posPrevx = nosePoint._position.x;
		}
		else if ((nosePoint._position.x - posPrevx + 10) < 0)
		{
			planetStartX += 10;
			// console.log("right\n");
			// moveDotX += 30;
			posPrevx = nosePoint._position.x;
		}
		if ((posPrevy - nosePoint._position.y + 5) < 0)
		{
			planetStartX += 10;
			// console.log("down\n");
			// moveDoty += 30;
			posPrevy = nosePoint._position.y;
		}
		else if ((nosePoint._position.y - posPrevy + 5) < 0)
		{
			planetStartX -= 10;
			// console.log("up\n");
			// moveDoty -= 30;
			posPrevy = nosePoint._position.y;
		}
	}
}