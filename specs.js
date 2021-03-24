specs = function(){
    game = {
        looping : false,
        size : 1000,
        timer: {time: 0,
            font:'bold 15pt arial',
            x:750,
            y:80,
            strokeStyle: 'white',
            fillStyle: 'white', },
        newHighscore: [],
        highScores: [null, null, null, null,null ]
    }
    //This has all the details for the actual landscape of the moon. 
    landscape = {
        height: 750,
        landingBorder: 15, //specifies how far from the edge the landing zone has to be. 
        startPathX: 0,
        endPathX:999,
        maxHeight: 900,
        minHeight: 400,//These will help determine the highest peak and the lowestValley
        smallHillDiff: 20,
        bigHillDiff: 200,
        landLine: [], 
        strokeStyle: 'rgb(85, 243, 243)',
        fillStyle : 'darkslategray',
        lv1Spikiness: 4,//This determines the depth of the spiky line function. 
        lv2Spikiness: 5, 
        lv1LandingLength: 100,
        lv2landingLength: 75,
        lv1PlatformNumber:2,
        lv2PlatformNumber:1,
        safeList : [], 
        currentLevel:1,
        countDown: 0,
        nextLevel:1,

    }
    //the specs for the lander
    lander = {
        x:200,
        y:200,
        width: 50,
        height: 50, 
        src:'images/lander.png',
        rotateRate: Math.PI,
        rotation: (Math.PI/2),
        vector:{x:0,y:0},
        circle:{
            center:{
            x: 200,
            y: 200,
            },
            radius: 25//update this is the size of the lander changes.
        },
        landed : false,
        crashed: false, 
        thrusterWidth: Math.PI/8,
        default: {x: 200, y: 200, rotation: Math.PI/2, fuel: 20},
        sounds: {},
        thruster : false,
        fuel :20, 
    }

    thruster = particleGen({
        size: {mean: 10, stdev: 1},
        lifetime: {mean: 3, stdev: 1},
        vel: {mean: 50, stdev:2},
        lander: lander,
    })

    thrusterRender = ParticleSystemRenderer(thruster, 'images/smoke-2.png');

    

    //The input handlers for the lander 

    //This is a promise function that will stop the thrust noise when the user releases thrust
    landerInput = function() {
        function stopThrust(){
            let key = inputHandler.kh.findKey(thrust)
           
            return new Promise((resolve)=>{
                window.addEventListener('keyup', stopIt);
                function stopIt(e){
                   
                    if(e.key === key){
                        lander.sounds['thrust'].pause();
                        lander.thruster = false; 
                        resolve();
                    }

                }

            })
        }

        //This is the go juice 
        async function thrust(elapsedTime){
           
            if(!lander.landed){
                if(lander.fuel > 0){
                    if(!lander.thruster){
                        lander.sounds['thrust'].play();
                        lander.thruster = true;
                        stopThrust();
                    }
                    lander.vector = updater.vectorAdder(lander.vector, {magnitude: .0175 , direction: (lander.rotation- (Math.PI/2))});
                    let min = (lander.rotation + (Math.PI/2))- lander.thrusterWidth;
                    let max = (lander.rotation + (Math.PI/2))+ lander.thrusterWidth;
                    thruster.makeParticles(5, [min, max]);
                    lander.fuel -= .05;
                }
                
            }
           
        }
        function rotateRight(elapsedTime){
            if(!lander.landed){
                lander.rotation += lander.rotateRate * (elapsedTime/1000);
            }  
           // console.log('rotating right');
            //console.log(lander.rotation)

        }
        function rotateLeft(elapsedTime){
            if(!lander.landed){
                lander.rotation -= lander.rotateRate * (elapsedTime/1000);
            }
            //console.log('rotating Left');
            
        }
        return{
            thrust: thrust,
            rotateRight: rotateRight,
            rotateLeft:rotateLeft
        }
    }();

    //kaboom is when the ship explodes
    //I'm not completely sure why the thrust is fire 
    kaboom = particleGen({
        size: {mean: 10, stdev: 1},
        lifetime: {mean: 3, stdev: 1},
        vel: {mean: 100, stdev:2},
        lander: lander,
    })

    kaboomRender = ParticleSystemRenderer(kaboom, 'images/fire.png');

    lander.ready = false;
    lander.image = new Image();
    lander.image.onload = function() {
        lander.ready = true; 
    }
    lander.image.src = lander.src; 

    background = {
        src:'images/background.png',
        width : 1000,
        height : 1000,
        x : 0,
        y : 0
    }
    background.ready = false;
    background.image = new Image();
    background.image.onload = function(){
        background.ready = true;
    }
    background.image.src = background.src;

    yVel = {
        font: 'bold 15pt arial',
        x:750,
        y:20,
        strokeStyle: 'white',
        fillStyle: 'white',
        text: 'Vertical Velocity: '+ lander.vector.y,

    }
    xVel = {
        font: 'bold 15pt arial',
        x: 750,
        y: 40,
        strokeStyle: 'white',
        fillStyle: 'white',
        text: 'Horizontal Velocity: '+ lander.vector.x,
    }
    rot = {
        font:'bold 15pt arial',
        x:750,
        y:60,
        strokeStyle: 'white',
        fillStyle: 'white',
        text: 'Rotation :' +(lander.rotation*180)/Math.PI 
    }
    ful = {
        font:'bold 15pt arial',
        x:750,
        y:100,
        strokeStyle: 'white',
        fillStyle: 'white',
        text: 'Rotation :' +(lander.rotation*180)/Math.PI 
    }
    goodEnd = {
        font:'bold 30pt arial',
        x:300,
        y:200,
        strokeStyle: 'white',
        fillStyle: 'white',

    }
    badEnd = {
        font:'bold 30pt arial',
        x:150,
        y:200,
        strokeStyle: 'white',
        fillStyle: 'white',
    }
    countDown= {
        font: 'bold 30pt arial',
        x:150,
        y:300, 
        strokeStyle: 'white',
        fillStyle: 'white'
    }

    //This is the function that handles persisting to the browser. 
    highScores = function(){
        let highS = {1:null, 2:null, 3:null, 4:null, 5:null }
        let previousScores = localStorage.getItem('lunarLander.highScores');
        console.log(highS);

        if (previousScores !== null&& previousScores !== undefined) {
            console.log('I am sinning!')
            highS = JSON.parse(previousScores);
        }

        //puts a new high score in and sorts it
        function add(newHighScore){
            let temp; 
            for (i in highS){
                if(highS[i] === null|| newHighScore < highS[i]){
                    temp = highS[i];
                    highS[i] = newHighScore;
                    newHighScore = temp;
                    if(newHighScore === null){
                        break;
                    }
                }

            }
            localStorage['lunarLander.highScores'] = JSON.stringify(highS);
        }

        return {
            add: add,
            highS: highS,
        }
    }();

    return{
        game,
        landscape,
        lander,
        landerInput,
        xVel,
        yVel,
        rot, 
        background,
        goodEnd,
        badEnd,
        thruster, 
        thrusterRender,
        kaboom,
        kaboomRender,
        countDown,
        highScores,
        ful
    }

}