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

    function crashShip(){
        console.log('crash');
        spec.lander.crashed = true; 
        spec.lander.vector.x = 0;
        spec.lander.vector.y = 0;
    }
    function landShip(level){
        console.log('level Complete!');
        spec.lander.vector.x = 0;
        spec.lander.vector.y = 0;
        
    }
    //function toLevelTwo(){ 
    //}


    //This function is useful for adding two vectors together 
    //It is useful for adding force vectors to the lander. 
    function vectorAdder(landerVector, vector2){
       /* console.log('vectors 1')
        console.log(vector1);
        console.log(vector2);*/
        //vector1.direction = vector1.direction%(2*Math.PI);
        //vector2.direction = vector2.direction%(2*Math.PI);

//Converts to cartesian
        
        /*console.log('vectors 2');
        console.log(x1);
        console.log(y1);
        console.log(vector2);*/

        let y2 = vector2.magnitude * Math.sin(vector2.direction);
        let x2 = vector2.magnitude * Math.cos(vector2.direction);

       /* console.log('vectors 3');
        console.log(x1);
        console.log(y1);
        console.log(x2);
        console.log(y2);*/

//Adds vectors together
        let newX = landerVector.x + x2 
        let newY = landerVector.y + y2

        /*console.log('vectors 4');
        console.log(newX);
        console.log(newY);*/
        
//converts back to polar         
       /* let magnitude = (Math.sqrt((newX**2)+ (newY**2)));
        if(newX ===0){
            newX = .00000000001//This keeps the lander from popping out of existance if newX == 0
        }
        let direction = Math.atan(newY/newX);

        if (magnitude < 0){
            magnitude = Math.abs(magnitude);
            direction = -direction;
        }*/ 
        /*
        console.log('vectors 5');
        console.log (magnitude);
        console.log(direction);
        */
        return{
            x:newX,
            y:newY
        }
    }

    return {
        updateLander: updateLander,
        vectorAdder: vectorAdder,
        collisionDetection: collisionDetection
        
    }
}();