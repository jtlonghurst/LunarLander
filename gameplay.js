
/*
This is going to be what is launched when clicking new Game. Right now it is going to look disgustingly blank. 
Nothing exciting here but it will look great when we get there. 
*/
myGame.screens['newGame']= function(){
    let previousTimeStamp = performance.now();
    function initialize(){

        //https://freesound.org/people/V-ktor/sounds/435413/
        creator.loadSound('sound/boom.wav', 'boom');

        //https://freesound.org/people/LimitSnap_Creations/sounds/318688/
        creator.loadSound('sound/thrust.wav', 'thrust');

        //https://freesound.org/people/Topschool/sounds/443493/
        creator.loadSound('sound/yay.mp3', 'yay');

        spec.lander.sounds['yay'].volume = .50;

    }
    function run(){
        previousTimeStamp = performance.now();
        spec.game.looping = true;
        creator.levelOne();
       // creator.spikyLine(spec.landscape.startPathX,spec.landscape.endPathX,4);
        requestAnimationFrame(gameLoop)
    }

    function processInput(elapsedTime){
        //console.log('Process Input checking in')
        inputHandler.update(elapsedTime);
    }
    function update(elapsedTime){
        //console.log('Update Checking in')
        updater.updateLander();
        spec.thruster.update(elapsedTime);
        spec.kaboom.update(elapsedTime);
        updater.collisionDetection(spec.landscape.currentLevel);
        updater.updateCountDown(elapsedTime);
        updater.updateTimer(elapsedTime);

    }
    function render(){
       // console.log('render checking in')
       Draw.clear(spec.game.size);
       Draw.drawBackground();
      // console.log(spec.landscape.landLine);
       Draw.drawLine(spec.landscape.landLine);
       Draw.drawHud();
       spec.thrusterRender.render();
       spec.kaboomRender.render();
       Draw.drawLander();
       Draw.drawAnnouncement();

    }


    function gameLoop(time){
        let elapsedTime = time - previousTimeStamp;
        previousTimeStamp = time; 
        processInput(elapsedTime);
        update(elapsedTime);
        render()
        if(spec.game.looping){
            requestAnimationFrame(gameLoop)
        }
    }

    
    return {
        initialize: initialize,
        run: run,
    }
}