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