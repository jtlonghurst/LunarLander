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
        document.getElementById('aboutButton').addEventListener('click',function (){ menu.showScreen('about');});
        console.log('Main Menu Initialized');

    }
    function run(){
        //I know this is empty this is also to show that I know the sctucture of how this menuer should work. 

    }
    return{
        initialize,
        run }
}