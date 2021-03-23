inputHandler = function(){
    kh = {
        keys :{},
        handlers:{}
    };

    function keyPress(e){
        kh.keys[e.key] = e.timeStamp;
        //console.log('pressed');
        //console.log(e.key);
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


    //The following code comes from https://stackoverflow.com/questions/17176046/pause-function-until-enter-key-is-pressed-javascript
    //This code returns a promise and waits until the key has been pressed then assigns that key to the proper handle
    function awaitingKeyPress(handler, id, normalPhrase){
        return new Promise((resolve) =>{
            window.addEventListener('keydown', handle);
            function handle(e){
                
                window.removeEventListener('keydown', handle);
                kh.registerCommand(e.key, handler);
                document.getElementById(id).innerHTML = normalPhrase + e.key;
                resolve();

            }
        }) 
    }

    async function registerNewKey(handler, id, normalPhrase){
        document.getElementById(id).innerHTML = normalPhrase + 'Please push a new key'
        kh.unregisterCommand(handler);
        //let chosen = false;
        awaitingKeyPress(handler, id, normalPhrase);
        console.log('all Done!')
          
        
    }



    function update(elapsedTime){
        //console.log("I'm still runnin! ")
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
        registerNewKey: registerNewKey,
    }

}();