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
        minHeight: 0,//These will help determine the highest peak and the lowestValley
        landLine: [], 
        strokeStyle: 'rgb(85, 243, 243)',
        fillStyle : 'rgb(85,243,243)',
    }
    lander = {

    }
    return{
        game,
        landscape,
        lander
    }
}