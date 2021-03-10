
/*
This is going to be what is launched when clicking new Game. Right now it is going to look disgustingly blank. 
Nothing exciting here but it will look great when we get there. 
*/
myGame.screens['newGame']= function(){
    let previousTimeStamp = performance.now();
    function initialize(){

    }
    function run(){
        previousTimeStamp = performance.now();
        spec.game.looping = true; 
        requestAnimationFrame(gameLoop)
    }

    function processInput(){
        //console.log('Process Input checking in')
    }
    function update(){
        //console.log('Update Checking in')

    }
    function render(){
       // console.log('render checking in')

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