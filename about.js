myGame.screens['about'] = function(){
    function initialize(){
        console.log('about is being initted')
        document.getElementById('aboutBackButton').addEventListener('click', function(){menu.showScreen('mainMenu')})
    }

    function run(){

    }
    return{
        initialize: initialize,
        run: run 
    }
}