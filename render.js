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
            if(!spec.lander.crashed){
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
    function drawAnnouncement(){
        if(spec.lander.landed){
            if(spec.lander.crashed){
                context.save();
                context.fillStyle = spec.badEnd.fillStyle;
                context.strokeStyle = spec.badEnd.strokeStyle;
                context.font = spec.badEnd.font;
                context.baseline = 'top'
                context.fillText("Well at least it's on the moon now.", spec.badEnd.x, spec.badEnd.y);
                context.restore();

            }
            else{
                context.save();
                context.fillStyle = spec.goodEnd.fillStyle;
                context.strokeStyle = spec.goodEnd.strokeStyle;
                context.font = spec.goodEnd.font;
                context.baseline = 'top'
                context.fillText("Mission Accomplished", spec.goodEnd.x, spec.goodEnd.y);
                context.restore();
            }
            context.save()
            context.fillSytle = spec.countDown.fillStyle;
            context.strokeStyle = spec.countDown.strokeStyle;
            context.font = spec.countDown.font;
            context.baseline = 'top';
            context.fillText('Next Level in: '+ Math.floor(spec.landscape.countDown), spec.countDown.x, spec.countDown.y);
            context.restore();
        }
        
    }

    function drawTexture(image, size, center, rotation){
       // console.log('i am drawing')
        context.save(); 
        context.translate(center.x, center.y);
        context.rotate(rotation);
        context.translate(-center.x, -center.y);

        context.drawImage(
            image, 
            center.x - size.x/2,
            center.y - size.y/2,
            size.x, 
            size.y
        );

        context.restore(); 

    }
    return{
        drawLine: drawLine,
        clear: clear,
        drawLander: drawLander,
        drawBackground: drawBackground,
        drawHud: drawHud,
        drawAnnouncement: drawAnnouncement,
        drawTexture: drawTexture,
    }
}();

ParticleSystemRenderer = function(system, imageSrc){

    let image = new Image();
    let isReady = false; 
    
    image.onload = function(){
        isReady = true;
        //console.log('ready')
    }

    image.src = imageSrc; 

    function render(){
        if(isReady){
            particle = system.getParticles
            //console.log('particle length');
            //console.log(particle.length);
            for (let i = 0; i < particle.length; i++){
                //console.log('I should be drawing things.')
                Draw.drawTexture(image, particle[i].size, particle[i].center, particle[i].rotation);
            }
        }

    }
    return {render:render,}

}