updater = function (){
    function updateLander(){
        spec.lander.cornerX = lander.x - ((1/2)* lander.width);
        spec.lander.cornerY = lander.y = ((1/2)* lander.height);
        
    }
    return {
        updateLander: updateLander,
        
    }
}();