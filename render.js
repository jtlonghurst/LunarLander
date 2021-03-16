//All the rendering should happen here hopefully 
Draw = function(){
    let canvas = document.getElementById('gameplayCanvas');
    let context = canvas.getContext('2d');

    function clear(size){
        context.clearRect(0,0,size,size);
    }

    /**
     * This will take a list of points and draw the landscape.
     * The fill and color will be according to the details in spec.landscape. 
     * @param {List} path 
     */
    function drawLine(path){
        context.beginPath();
        context.moveTo(spec.landscape.startPathX, spec.landscape.height);
        //console.log('moveTo location: ')
        //console.log(spec.landscape.beginPathX)
        //console.log(spec.landscape.height)
        for (let dot = 0; dot < path.length; dot++){
            context.lineTo(path[dot][0],path[dot][1]);
        }
        //console.log('I  am running in drawLine')
        //context.lineTo(500,500);
        context.lineTo(spec.landscape.endPathX, spec.landscape.height);
        //Closing the shape so that I can get a good fill 
        context.lineTo(spec.landscape.endPathX, spec.landscape.endPathX);
        context.lineTo(spec.landscape.startPathX, spec.landscape.endPathX);
        context.closePath();
        context.strokeStyle = spec.landscape.strokeStyle;
        context.fillStyle = spec.landscape.fillStyle;
        context.stroke();
        context.fill();
    }

    /**
     * Does what it says 
     */
    function drawLander(){
        if(spec.lander.ready){
            context.drawImage(
                spec.lander.image,
                spec.lander.cornerX,
                spec.lander.cornerY,
                spec.lander.width,
                spec.lander.height
                );
        }
    }
    return{
        drawLine: drawLine,
        clear: clear,
        drawLander: drawLander
    }
}();