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



    function update(elapsedTime){
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