/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   sketch.c                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jwillert <jwillert@student.42heilbronn.de> +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/06/06 09:22:28 by jwillert          #+#    #+#             */
/*   Updated: 2022/06/07 17:10:45 by jwillert         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

__BACKGROUND__
YouTube Tutorial: Starry Eyed Night Scene -- Code

// array of stars
var stars = []

// factor for movement speed of stars
var velocity = 3

// randomizer for int
function randomInt(min, max){
    return Math.floor(Math.random()*(max-min+1)+min)
}

// generate stars
for(var i = 0; i <= 2000; i++){
	var circle = new Path.Circle(new Point(view.size.width, view.size.height) * Point.random(), randomInt(0.5, 2));
	stars.push(circle);
	circle.fillColor = 'white';
}

// randomize color of stars
for(var i = 0; i <= 2000; i++){
    var chance = Math.random();
    if (chance <= 0.7){
        stars[i].fillColor = 'yellow';
    }
    if (chance <= 0.3){
        stars[i].fillColor = 'blue';
    }
    if (chance <= 0.1){
    circle.fillColor = "purple";
    }
}

// function to assign and randomize movement speed
function assignRate(){
    for (var i = 0; i < stars.length; i++ ){
        var assignedRate = Math.random() * velocity;
        stars[i].rate = assignedRate;
    }
}

// run function once in order to have a dynamic image from beginning
assignRate()

// on Event Keypress event
function onKeyDown(event){
    if(event.key == 'd'){
        velocity += 1;
        assignRate();
    }
    else if(event.key == 'a'){
        velocity -= 1;
        assignRate();
    }
}

// actual implementation of animation
function onFrame(event)
{
    for(var i = 0; i < stars.length; i++){
        stars[i].translate(stars[i].rate, 0);
        if(stars[i].position.x > view.size.width){
            stars[i].position.x = 0;
        }
        else if(stars[i].position.x < 0){
            stars[i].position.x = view.size.width
        }
    }
}


__TRACKING__




// array of stars
var stars = []

// factor for movement speed of stars
var velocity = 3

// randomizer for int
function randomInt(min, max){
	return Math.floor(Math.random()*(max-min+1)+min)
}

// generate stars
for(var i = 0; i <= 500; i++){
	var circle = new Path.Circle(new Point(view.size.width, view.size.height) * Point.random(), randomInt(0.5, 2));
	stars.push(circle);
}

// randomize color of stars
for(var i = 0; i <= 500; i++){
	var chance = Math.random();
	if (chance <= 0.6){
		stars[i].fillColor = 'white';
	}
	if (chance <= 0.3){
		stars[i].fillColor = 'yellow';
	}
	if (chance <= 0.2){
	circle.fillColor = "purple";
	}
}

// function to assign and randomize movement speed
function assignRate(){
	for (var i = 0; i < stars.length; i++ ){
		var assignedRate = Math.random() * velocity / 8;
		stars[i].rate = assignedRate;
	}
}

// run function once in order to have a dynamic image from beginning
assignRate()

// on Event Keypress event
function onKeyDown(event){
	if(event.key == 'd'){
		velocity += 1;
		assignRate();
	}
	else if(event.key == 'a'){
		velocity -= 1;
		assignRate();
	}
}

// actual implementation of animation
function onFrame(event)
{
	for(var i = 0; i < stars.length; i++){
		stars[i].translate(stars[i].rate, 0);
		if(stars[i].position.x > view.size.width){
			stars[i].position.x = 0;
		}
		else if(stars[i].position.x < 0){
			stars[i].position.x = view.size.width
		}
	}
}
