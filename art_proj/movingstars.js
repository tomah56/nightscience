function movePlanet()
{
	let pbigA = 200;
	let pbigB = 150;

	let radius = 80;


	angle += 0.05;
	if (angle > 2 * Math.PI)
		angle -= 2 * Math.PI;
	// elliptic movment

		planetX = planetStartX + 500 * Math.cos(angle);
		planetY = planetStartY + 180 * Math.sin(angle);
	
	planetX2 = planetX;
	planetY2 = planetY;
	// circle movments
	// planetX = planetStartX + 300 * Math.cos(angle);
	// planetY = planetStartY + 300 * Math.sin(angle);

	// let trythis = Math.sqrt( 1 - Math.pow( (angle / (2 * Math.PI)) - 1, 2))
	// console.log(angle, " second ",trythis);

	// if (angle <= (Math.PI / 2 ) + 0.1 && angle >= (Math.PI / 2) - 0.1)
	// 	movingpart = 1.0;
	if (angle < Math.PI / 2 || angle > (3 * Math.PI) / 2) // up part
	{
		// movingpart += trythis/10;
		movingpart += 0.018;
		
		// console.log("first ");
		// console.log(angle);
	}
	else if (angle > Math.PI / 2 && angle < (3 * Math.PI) / 2)
	{
		// if (angle > (2 * Math.PI) / 3 || angle < Math.PI / 3)
		// {
		// }
			movingpart -= 0.018;
			// console.log("second ");
			// movingpart -= trythis/10;
			if (movingpart < 0)
				movingpart *=-1;
	}

	// planetOne.remove();
	// planetTwo.remove();
	// radius = 80;
	// console.log(movingpart);
	// console.log(movingpart);
	// radius *= movingpart;
	let bob = 0.2 + Math.sqrt( 1 - Math.pow( movingpart - 1, 2));
	// console.log(bob);
	radius *= bob;
	// radius *= (trythis + 0.5);
	// radius *= movingpart;
	// movingpart = (duration * 3) / Math.pow(range, 3)) * Math.pow(movingpart, 2)

	// sqrt(1 - pow(x - 1, 2))
	// planetY = planetY + planetY / radius; 

	planetOne = new Path.Circle( new Point( planetX, planetY), radius);
    planetOne.fillColor = 'brown';
	// planetTwo = new Path.Circle( new Point( planetX2 + 20, planetY2 + 20), radius);
    // planetTwo.fillColor = 'blue';
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