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
    //the specs for the lander
    lander = {
        x:200,
        y:200,
        width: 50,
        height: 50, 
        src:'images/lander.png',
        rotateRate: Math.PI,
        rotation: (Math.PI/2),
        vector:{x:0,y:0}
    }

    //The input handlers for the lander 
    landerInput = function() {
        function thrust(elapsedTime){
            console.log('lander vector before')
            console.log(lander.vector);
            console.log('other before vector');
            console.log({magnitude: .02, direction: (lander.rotation - (Math.PI/2))});
            //.02 is a good acceleration rate
            //The direction -pi/2 just makes it look like the thrust is coming out of the bottom of the lander. 
            //I think it is having a problem with negative numbers. 
            lander.vector = updater.vectorAdder(lander.vector, {magnitude: .0175 , direction: (lander.rotation- (Math.PI/2))})
             
            console.log('vector');
            console.log(lander.vector)
           // console.log('boom')
           //The problem I've found is that when you go in the opposite the direction of the one you are going, 
           //the lander will get stuck jumping back and forth between negative and positive values, just stuck, and I don't know why.
           //This happens whether or not the modifier is applied
        }
        function rotateRight(elapsedTime){
            lander.rotation += lander.rotateRate * (elapsedTime/1000);  
           // console.log('rotating right');
            //console.log(lander.rotation)

        }
        function rotateLeft(elapsedTime){
            lander.rotation -= lander.rotateRate * (elapsedTime/1000);
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