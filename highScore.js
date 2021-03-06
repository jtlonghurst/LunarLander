/*
This is the HighScore Page it will display the top scores 
and persist them in the browser.  
For now there is not much to see.
*/ 
myGame.screens['highScore']= function(){

    function initialize(){
        document.getElementById('highScoreBackButton').addEventListener('click', function(){menu.showScreen('mainMenu');});

    }

    function run(){
        //This might be empty as well
    }
    return{
        initialize: initialize,
        run: run
    }
}
