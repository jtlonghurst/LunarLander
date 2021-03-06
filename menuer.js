let menuer = function(){


function initialize(screens){
    //Screens is a list of all the different screens that have been added. 
    for (screen in screens){
        if(screens.hasOwnProperty(screen)){
           // console.log(screens[screen])

            screens[screen]().initialize();
        }
    }

    showScreen('mainMenu');
    //document.getElementById('mainMenu').classList.add('active');
    
}

function showScreen(id){
    let active = document.getElementsByClassName('active');
    console.log(active);
    for(i= 0; i < active.length; i++){
        active[i].classList.remove('active');
    }
    console.log(id + ' is being called in show screen');
    document.getElementById(id).classList.add('active');
    console.log(document.getElementById(id).classList);
    console.log(document.getElementById('mainMenu').classList);

}

return {
    initialize: initialize, 
    showScreen: showScreen
}

};