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
    landerInput = function() {
        function stopThrust(){
            let key = inputHandler.kh.findKey(thrust)
            //console.log(key);
            return new Promise((resolve)=>{
                window.addEventListener('keyup', stopIt);
                function stopIt(e){
                   // console.log(e.key);
                    if(e.key === key){
                        lander.sounds['thrust'].pause();
                        lander.thruster = false; 
                        resolve();
                    }

                }

            })
        }

        async function thrust(elapsedTime){
           /* console.log('lander vector before')
            console.log(lander.vector);
            console.log('other before vector');
            console.log({magnitude: .02, direction: (lander.rotation - (Math.PI/2))});*/
            //.02 is a good acceleration rate
            //The direction -pi/2 just makes it look like the thrust is coming out of the bottom of the lander. 
            //I think it is having a problem with negative numbers. 
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
                //lander.sounds['thrust'].pause();
            }
            /*console.log('vector');
            console.log(lander.vector)*/
           // console.log('boom')
           //The problem I've found is that when you go in the opposite the direction of the one you are going, 
           //the lander will get stuck jumping back and forth between negative and positive values, just stuck, and I don't know why.
           //This happens whether or not the modifier is applied
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

    highScores = function(){
        let highS = {1:null, 2:null, 3:null, 4:null, 5:null }
        let previousScores = localStorage.getItem('lunarLander.highScores');
        console.log(highS);

        if (previousScores !== null&& previousScores !== undefined) {
            console.log('I am sinning!')
            highS = JSON.parse(previousScores);
        }

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