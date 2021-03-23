inputHandler = function(){
    kh = {
        keys :{},
        handlers:{}
    };

    function keyPress(e){
        kh.keys[e.key] = e.timeStamp;
        console.log('pressed');
        console.log(e.key);
    };

    function keyRelease(e){
        delete kh.keys[e.key];
       // console.log('released');
        //console.log(e.key);
    };

    kh.registerCommand = function(key, handler){
        kh.handlers[key] = handler;
        console.log('handlers');
        console.log(kh.handlers);
    };

    kh.findKey = function(handler){
        for(i in kh.handlers){
            if(kh.handlers[i] === handler){
                return i;
            }
        }

    }
    kh.unregisterCommand = function(handler){
        for(i in kh.handlers){
            if(kh.handlers[i] === handler){
                delete kh.handlers[i];
            }
        }
    }
    kh.registerThrust = function(e){
        registerCommand(e.key, thrust);
    }

    kh.registerNewKey = function(handler){
        kh.unregisterCommand(handler);
        let chosen = false;
        //kh.keys.length = 0; //clears the key that are currently there
        let key = 0;  
        //The idea with this is to wait until the user selects a key
        window.addEventListener('keydown', function(e){chosen = true; kh.registerCommand(e)})
        while(!chosen){

           /* console.log('muhahaha')
            //if(kh.keys.leng >0){
            console.log(kh.keys);
                *//*for (i in kh.keys){
                    if(kh.keys.hasOwnProperty(i)){
                        key = i; 
                    chosen = true; 
                    break
                    }
                }*/
        }
        
        kh.registerCommand(key,handler);
    }



    function update(elapsedTime){
        console.log("I'm still runnin! ")
        for (let key in kh.keys ){
            if (kh.keys.hasOwnProperty(key)){
                if(kh.handlers[key]){
                    kh.handlers[key](elapsedTime);
                }

            }
        }

    }

    function initialize(){
        kh.registerCommand('w', spec.landerInput.thrust)
        kh.registerCommand('d', spec.landerInput.rotateRight);
        kh.registerCommand('a', spec.landerInput.rotateLeft);
    }

    window.addEventListener('keydown', keyPress);
    window.addEventListener('keyup', keyRelease);
    
    return {
        update: update,
        kh: kh,
        initialize: initialize,
    }

}();