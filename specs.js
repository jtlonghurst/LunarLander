specs = function(){
    game = {
        looping : false,
        size : 1000
    }
    landscape = {
        height: 500,
        landingBoarder: 15, //specifies how far from the edge the landing zone has to be. 
        startPathX: 0,
        endPathX:999,
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