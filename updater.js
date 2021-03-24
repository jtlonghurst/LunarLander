updater = function (){
    //This function makes sure that the point that we are drawing the lander from is in the right place. 

    function updateLander(){

        //Add Gravity first
        if(!spec.lander.landed) 
        spec.lander.vector = vectorAdder(spec.lander.vector, {magnitude: .01, direction: Math.PI/2})
        
        //This is where we want to adjust the location of the lander.
        //let vectorX = spec.lander.vector.magnitude * Math.cos(lander.vector.direction);
        //let vectorY = spec.lander.vector.magnitude * Math.sin(lander.vector.direction);
        spec.lander.x += spec.lander.vector.x;
        spec.lander.y += spec.lander.vector.y; 
       /* console.log('x and y')
        console.log(spec.lander.x)
        console.log(spec.lander.y)
        console.log('magnitude');
        console.log(spec.lander.magnitude);
        console.log('direction')
        console.log(spec.lander.direction);*/
        spec.lander.cornerX = spec.lander.x - ((1/2)* spec.lander.width);
        spec.lander.cornerY = spec.lander.y - ((1/2)* spec.lander.height);
        spec.lander.circle.center.x = spec.lander.x;
        spec.lander.circle.center.y = spec.lander.y;  
    }
    //This is going to be a self made function that determines how all the collision detection fits in. 
    function collisionDetection(level){
        //first we will check to see if it is a safe zone with the right requirements
        // * is it a safe zone
        // * are  you going a low enough speed
        // * is the lander facing the right direction?
        let landingLength;
            if (level ===1){
                landingLength = spec.landscape.lv1LandingLength
            }
            else{
                landingLength = spec.landscape.lv2LandingLength;
            }
        //See if it meets the landing criteria 
        for (let j = 0; j < spec.landscape.safeList.length; j++){
            
            //See if it is on a safe zone.
            let check = lineCircleIntersection(
                spec.landscape.safeList[j], 
                [spec.landscape.safeList[j][0]+landingLength, spec.landscape.safeList[j][1]],
                spec.lander.circle);

            //for checking the angle 
            let lowerBoundsRad = (355 * Math.pi)/180; 
            let upperBoundsRad = (5 * Math.pi)/180;
            let deg = Math.abs(Math.floor((spec.lander.rotation * 180)/Math.PI));
            //THE IF STATEMENT 
            if (check 
                && Math.abs(Math.floor(spec.lander.vector.y))<2 
                && Math.abs(Math.floor(spec.lander.vector.x))<2 
                &&( deg >355||deg < 5 )
                && !spec.lander.landed){
                    landShip(level);
                    spec.lander.landed = true; 
                }   
        } 

        //console.log(spec.landscape.landLine);
        //if those conditions aren't met, then we just see if it collides with anything and print game over if it does. 
        for (let i=0; i < spec.landscape.landLine.length -1; i ++){
           // console.log('HELLLLOOOOOOOOOO')
            let check = lineCircleIntersection(spec.landscape.landLine[i], spec.landscape.landLine[i+1], spec.lander.circle);
           // console.log(check);
            if (check&& !spec.lander.landed){
                
                crashShip();
                spec.lander.landed = true; 
            }
        }
    }

    //code posted in the lecture 
    // Reference: https://stackoverflow.com/questions/37224912/circle-line-segment-collision
    function lineCircleIntersection(pt1, pt2, circle) {
       /* console.log('pt1');
        console.log(pt1);
        console.log('pt2');
        console.log(pt2);
        console.log('circle');
        console.log(circle);*/
        let v1 = { x: pt2[0] - pt1[0], y: pt2[1] - pt1[1] };
        let v2 = { x: pt1[0] - circle.center.x, y: pt1[1] - circle.center.y };
        let b = -2 * (v1.x * v2.x + v1.y * v2.y);
        let c =  2 * (v1.x * v1.x + v1.y * v1.y);
        let d = Math.sqrt(b * b - 2 * c * (v2.x * v2.x + v2.y * v2.y - circle.radius * circle.radius));
        if (isNaN(d)) { // no intercept
            //console.log('yeah Im not getting anything here');
            return false;
            
        }
        // These represent the unit distance of point one and two on the line
        let u1 = (b - d) / c;  
        let u2 = (b + d) / c;
        if (u1 <= 1 && u1 >= 0) {  // If point on the line segment
            return true;
        }
        if (u2 <= 1 && u2 >= 0) {  // If point on the line segment
            return true;
        }
        return false;
    }
    function updateCountDown(elapsedTime){
        if(spec.lander.landed){
            spec.landscape.countDown -= (elapsedTime/1000);
            if(spec.landscape.countDown <= 0){
                toNextLevel(spec.landscape.nextLevel);
            }
        }
    }

    function crashShip(){
        console.log('crash');
        spec.lander.sounds['boom'].play();
        spec.lander.crashed = true; 
        spec.lander.vector.x = 0;
        spec.lander.vector.y = 0;
        spec.kaboom.makeParticles(400, [0, 2*Math.PI]);
        spec.landscape.countDown = 4;
        spec.landscape.nextLevel = 1; 
    }
    function landShip(){
        console.log('level Complete!');
        spec.lander.sounds['yay'].play();
        spec.lander.vector.x = 0;
        spec.lander.vector.y = 0;
        //put the countdown here; 
        spec.landscape.countDown = 4;
        spec.landscape.nextLevel = 2;
        spec.highScores.add(Math.floor(spec.game.timer.time/1000)); 
    }
    function toNextLevel(level){
        spec.game.timer.time = 0;
        spec.lander.landed = false;
        spec.lander.crashed = false;
        spec.lander.fuel = spec.lander.default.fuel; 
        spec.lander.x = spec.lander.default.x;
        spec.lander.y = spec.lander.default.y;
        spec.lander.rotation = spec.lander.default.rotation;
        spec.landscape.landLine = [];
        spec.landscape.safeList = [];
        if(level == 1){
            creator.levelOne();
        } 
        if(level === 2){
            creator.levelTwo();
        }
    }


    //This function is useful for adding two vectors together 
    //It is useful for adding force vectors to the lander. 
    function vectorAdder(landerVector, vector2){
       

//Converts to cartesian

        let y2 = vector2.magnitude * Math.sin(vector2.direction);
        let x2 = vector2.magnitude * Math.cos(vector2.direction);


//Adds vectors together
        let newX = landerVector.x + x2 
        let newY = landerVector.y + y2

        return{
            x:newX,
            y:newY
        }
    }
    function updateTimer(elapsedTime){
        if(!spec.lander.landed){
            spec.game.timer.time += elapsedTime;
        }
        let deg = Math.abs(Math.floor((spec.lander.rotation * 180)/Math.PI));
        if( deg >355||deg < 5 ){
            spec.rot.fillStyle = 'green';
            spec.rot.strokeStyle = 'green';
        }
        else{
            spec.rot.fillStyle = 'white';
            spec.rot.strokeStyle = 'white';

        }
        if(Math.abs(spec.lander.vector.y) < 2){
            spec.yVel.fillStyle = 'green';
            spec.yVel.strokeStyle = 'green';
        }
        else{
            spec.yVel.fillStyle = 'white';
            spec.yVel.strokeStyle = 'white';
        }
        if(Math.abs(spec.lander.vector.x) < 2){
            spec.xVel.fillStyle = 'green';
            spec.xVel.strokeStyle = 'green';
        }
        else{
            spec.xVel.fillStyle = 'white';
            spec.xVel.strokeStyle = 'white';
        }
        if(spec.lander.fuel > 0){
            spec.ful.fillStyle = 'green';
            spec.ful.strokeStyle = 'green';
        }
        else{
            spec.ful.fillStyle = 'white';
            spec.ful.strokeStyle = 'white';
        }

    }

    return {
        updateLander: updateLander,
        vectorAdder: vectorAdder,
        collisionDetection: collisionDetection,
        updateCountDown: updateCountDown,
        updateTimer: updateTimer,
        
    }
}();