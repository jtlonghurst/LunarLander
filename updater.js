updater = function (){
    function updateLander(){
        spec.lander.cornerX = lander.x - ((1/2)* lander.width);
        spec.lander.cornerY = lander.y - ((1/2)* lander.height);
        //This is where we want to adjust the location of the lander.
        let vectorX = lander.vector.magnitude * Math.cos(lander.vector.direction);
        let vectorY = lander.vector.magnitude * Math.sin(lander.vector.direction);

        spec.lander.x += vectorX;
        spec.lander.y += vectorY; 
        
    }

    function vectorAdder(vector1, vector2){
        let y1 = vector1.magnitude * Math.sin(vector1.direction);
        let x1 = vector1.magnitude * Math.cos(vector1.direction);

        let y2 = vector2.magnitude * Math.sin(vector2.direction);
        let x2 = vector2.magnitude * Math.cos(vector2.direction);

        let newX = x1 + x2 
        let newY = y1 + y2

        let magnitude = Math.sqrt((newX**2)+ (newY**2));
        let direction = Math.atan(newY/newX);
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