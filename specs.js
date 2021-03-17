specs = function(){
    game = {
        looping : false,
        size : 1000
    }
    landscape = {
        height: 500,
        landingBorder: 15, //specifies how far from the edge the landing zone has to be. 
        startPathX: 0,
        endPathX:999,
        maxHeight: 999,
        minHeight: 400,//These will help determine the highest peak and the lowestValley
        landLine: [], 
        strokeStyle: 'rgb(85, 243, 243)',
        fillStyle : 'rgb(85,243,243)',
        lv1Spikiness: 4,//This determines the depth of the spiky line function. 
        lv2Spikiness: 5, 
        lv1LandingLength: 100,
        lv2landingLength: 75,
        lv1PlatformNumber:2,
        lv2PlatformNumber:1,
        safeList : [] 

    }
    //lander = {}
    lander = {
        x:200,
        y:200,
        width: 75,
        height: 75, 
        src:'images/lander.png',
        rotateRate: Math.PI,
        rotation: (Math.PI/2),
        vector:{magnitude:0,direction:0}
    }

    landerInput = function() {
        function thrust(){
            spec.lander.vector = updater.vectorAdder(lander.vector, {magnitude: 2, direction: lander.rotation})
            console.log('vector');
            console.log(lander.vector)
           // console.log('boom')
        }
        function rotateRight(elapsedTime){
            lander.rotation -= lander.rotateRate * (elapsedTime/1000);  
           // console.log('rotating right');
            //console.log(lander.rotation)

        }
        function rotateLeft(elapsedTime){
            lander.rotation += lander.rotateRate * (elapsedTime/1000);
            //console.log('rotating Left');
            
        }
        return{
            thrust: thrust,
            rotateRight: rotateRight,
            rotateLeft:rotateLeft
        }
    }();

    lander.ready = false;
    lander.image = new Image();
    lander.image.onload = function() {
        lander.ready = true; 
    }
    lander.image.src = lander.src; 
    return{
        game,
        landscape,
        lander,
        landerInput
    }
}