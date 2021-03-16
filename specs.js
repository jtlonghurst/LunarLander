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
        src:'images/lander.png'
    }

    lander.ready = false;
    lander.image = new Image();
    lander.image.onload = function() {
        lander.ready = true; 
    }
    lander.image.src = lander.src; 
    return{
        game,
        landscape,
        lander
    }
}