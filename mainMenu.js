/*
This is the main menu page.
From this page you can:
 start the game, 
view the credits,
look at high scores, 
and change the controls
*/
myGame.screens['mainMenu'] = function(){

    function initialize(){
        document.getElementById('newGameButton').addEventListener('click', function(){menuer.showScreen('newGame');});
        document.getElementById('aboutButton').addEventListener('click',function (){ menuer.showScreen('about');});
        document.getElementById('highScoreButton').addEventListener('click', function(){menuer.showScreen('highScore');});
        document.getElementById('controlsButton').addEventListener('click', function(){menuer.showScreen('setControls');});
        console.log('Main Menu Initialized');


    }
    function run(){
        //I know this is empty this is also to show that I know the sctucture of how this menuer should work. 

    }
    return{
        initialize,
        run }
}