function movePlanet()
{
	angle += 0.01;
	if (angle > 2 * Math.PI)
		angle -= 2 * Math.PI;
	planetX = planetStartX + 300 * Math.cos(angle);
	planetY = planetStartY + 300 * Math.sin(angle);
	planetOne.position = new Point( planetX, planetY);
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