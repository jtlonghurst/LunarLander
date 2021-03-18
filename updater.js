updater = function (){
    //This function makes sure that the point that we are drawing the lander from is in the right place. 

    function updateLander(){
        
        //This is where we want to adjust the location of the lander.
        let vectorX = spec.lander.vector.magnitude * Math.cos(lander.vector.direction);
        let vectorY = spec.lander.vector.magnitude * Math.sin(lander.vector.direction);

        spec.lander.x += vectorX;
        spec.lander.y += vectorY; 

       /* console.log('x and y')
        console.log(spec.lander.x)
        console.log(spec.lander.y)
        console.log('magnitude');
        console.log(spec.lander.magnitude);
        console.log('direction')
        console.log(spec.lander.direction);
*/
        spec.lander.cornerX = spec.lander.x - ((1/2)* spec.lander.width);
        spec.lander.cornerY = spec.lander.y - ((1/2)* spec.lander.height);
    }

    //This function is useful for adding two vectors together 
    //It is useful for adding force vectors to the lander. 
    function vectorAdder(vector1, vector2){
       /* console.log('vectors 1')
        console.log(vector1);
        console.log(vector2);*/
        //vector1.direction = vector1.direction%(2*Math.PI);
        //vector2.direction = vector2.direction%(2*Math.PI);

//Converts to cartesian 
        let y1 = vector1.magnitude * Math.sin(vector1.direction);
        let x1 = vector1.magnitude * Math.cos(vector1.direction);
        
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
        let newX = x1 + x2 
        let newY = y1 + y2

        /*console.log('vectors 4');
        console.log(newX);
        console.log(newY);*/
        
//converts back to polar         
        let magnitude = (Math.sqrt((newX**2)+ (newY**2)));
        if(newX ===0){
            newX = .00000000001//This keeps the lander from popping out of existance if newX == 0
        }
        let direction = Math.atan(newY/newX);

        if (magnitude < 0){
            magnitude = Math.abs(magnitude);
            direction = -direction;
        } 
        /*
        console.log('vectors 5');
        console.log (magnitude);
        console.log(direction);
        */
        return{
            magnitude:magnitude,
            direction:direction
        }
    }

    return {
        updateLander: updateLander,
        vectorAdder: vectorAdder
        
    }
}();