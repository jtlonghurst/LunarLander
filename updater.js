updater = function (){
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