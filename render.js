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
            context.save();
            
            context.translate(spec.lander.x, spec.lander.y);
            context.rotate(spec.lander.rotation);
            context.translate(-spec.lander.x, -spec.lander.y);

            context.drawImage(
                spec.lander.image,
                spec.lander.cornerX,
                spec.lander.cornerY,
                spec.lander.width,
                spec.lander.height
                );
            context.restore();
        }
    }

    function drawBackground(){
        if(spec.background.ready){
            context.drawImage(
                spec.background.image,
                spec.background.x,
                spec.background.y,
                spec.background.width,
                spec.background.height
            );
        }
    }

    function drawHud(){
        context.save();
        context.fillStyle = spec.yVel.fillStyle;
        context.strokeStyle = spec.yVel.strokeStyle;
        context.font = spec.yVel.font;
        context.baseline = 'top'
        context.fillText('Vertical velocity: '+ -(Math.floor(spec.lander.vector.y)), spec.yVel.x, spec.yVel.y);
        context.restore();

        context.save();
        context.fillStyle = spec.xVel.fillStyle;
        context.strokeStyle = spec.xVel.strokeStyle;
        context.font = spec.xVel.font;
        context.baseline = 'top'
        context.fillText('Horizontal velocity: '+ Math.abs(Math.floor(spec.lander.vector.x)), spec.xVel.x, spec.xVel.y);
        context.restore();

        context.save();
        context.fillStyle = spec.rot.fillStyle;
        context.strokeStyle = spec.rot.strokeStyle;
        context.font = spec.rot.font;
        context.baseline = 'top'
        context.fillText('Rotation: '+ Math.floor(Math.abs(((spec.lander.rotation % (2* Math.PI)) * 180)/Math.PI)), spec.rot.x, spec.rot.y);
        context.restore();

        
    }
    return{
        drawLine: drawLine,
        clear: clear,
        drawLander: drawLander,
        drawBackground: drawBackground,
        drawHud: drawHud
    }
}();