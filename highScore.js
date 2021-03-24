/*
This is the HighScore Page it will display the top scores 
and persist them in the browser.  
For now there is not much to see.
*/ 
myGame.screens['highScore']= function(){

    function initialize(){
        console.log(spec.highScores.highS)
        let hs = spec.highScores.highS;
        document.getElementById('1').innerHTML = '1: '+ hs[1];
        document.getElementById('2').innerHTML = '2: '+ hs[2];
        document.getElementById('3').innerHTML = '3: '+ hs[3];
        document.getElementById('4').innerHTML = '4: '+ hs[4];
        document.getElementById('5').innerHTML = '5: '+ hs[5];
        document.getElementById('highScoreBackButton').addEventListener('click', function(){menuer.showScreen('mainMenu');});

    }

    function run(){
        //This might be empty as well
    }
    return{
        initialize: initialize,
        run: run
    }
}
