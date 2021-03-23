/*
On this screen you will be able to set which controls you will be using to 
control the lander. 
defaults: 
w is thrust
a is rotate left 
d is rotate right
*/
myGame.screens['setControls'] = function(){
    function initialize(){
       // console.log("HELLLLLLOOOOOOOOOOOO!");
        //console.log(spec.lander);
        document.getElementById('thrust').innerHTML = 'Thrust Button: ' + inputHandler.kh.findKey(spec.landerInput.thrust);
        document.getElementById('thrustButt').addEventListener('click', function(){inputHandler.registerNewKey(spec.landerInput.thrust, 'thrust', 'Thrust Button: ')});

        document.getElementById('rotateRight').innerHTML = 'Rotate Right Button: ' + inputHandler.kh.findKey(spec.landerInput.rotateRight);
        document.getElementById('rrButton').addEventListener('click', function(){inputHandler.registerNewKey(spec.landerInput.rotateRight, 'rotateRight', 'Rotate Right Button: ')});
        
        document.getElementById('rotateLeft').innerHTML = 'Rotate Left Button: ' + inputHandler.kh.findKey(spec.landerInput.rotateLeft);
        document.getElementById('rlButton').addEventListener('click', function(){inputHandler.registerNewKey(spec.landerInput.rotateLeft, 'rotateLeft','Rotate Left Button: ')});

        document.getElementById('setControlsBackButton').addEventListener('click', function(){menuer.showScreen('mainMenu');});

    }
    function run(){
        //This one might also be empty

    }
    return {
        initialize: initialize,
        run: run
    }
}