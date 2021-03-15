creator = function(){
    /**
     * Starting at the point given and going to the point
     * this will split the line in half and decide a new height for the line. 
     * This will set the landLine to be the new mountain range.
     * @param {int} startPoint these are the x's y's are not needed in this function 
     * @param {int} endPoint the ending xs 
     * @param {int} numIter the layer of depth that you want 
     */
    function spikyLine(startPoint, endPoint, numIter){
        return spikyRecurse(startPoint, endPoint, 0, numIter);

    }
    
    /**
     * This function does the recursion that is necessary for the spikyLine function.
     * It will split the line into as many segments as you wish. 
     * @param {int} startPoint the start and end point are the xs of the line
     * @param {int} endPoint 
     * @param {int} depth current depth
     * @param {int} goalDepth where to stop
     * @returns a list of all the points in the now spiky line
     */
    function spikyRecurse(startPoint, endPoint, depth, goalDepth){
        //set up boundaries for height
        let marginSize = spec.landscape.maxHeight - spec.landscape.minHeight;
        //Select a random height for half of the distance
        let y = Math.floor(Math.random()*marginSize) + spec.landscape.minHeight;
        let x = (Math.abs(endPoint - startPoint)/2) + startPoint;

        //console.log(x);
        //If you are at the right amount of spikiness return 
        if(depth == goalDepth){
            return [[x,y]] 
        }
        //if not go deeper
        let begin = spikyRecurse(startPoint,x, depth+1, goalDepth);
        let end = spikyRecurse(x,endPoint, depth+1, goalDepth);
        return begin.concat([[x,y]], end);
        
    }

    //the purpose of this is to allow the safe zones to be sorted in the list so they don't come out in the wrong order 
    function insertionSort(insert, location, index = null){
        let placed = false; 
        for (let i = 0; i < location.length; i++){
            //This makes it reusable. 
            //I'm going to use it to sort arrays 
            if(index != null){
                if(insert[index] < location[i][index] ){
                    location.splice(i,0,insert);
                    placed = true; 
                    break;
                }
            }
            //this is if it isn't an array
            else{
                if(insert < location[i]){
                    location.splice(i, 0, insert);
                    placed = true; 
                    break; 
                }
            }

        }
        if(!placed){
            location.splice(location.length, 0, insert);
        }

    }

    function selectSafeZones(numSafeSpots, lengthSafeSpots){
        //setting up the boundaries 
            let maxSafeNum = spec.landscape.endPathX - spec.landscape.landingBorder;
            maxSafeNum = maxSafeNum - lengthSafeSpots;
            let minSafeNum  = spec.landscape.startPathX + spec.landscape.landingBorder;
            let difference = maxSafeNum - minSafeNum;// this governs the xs 
            let marginSize = spec.landscape.maxHeight - spec.landscape.minHeight; //this governs the ys 
        //selecting the random numbers
        for (let i = 0; i < numSafeSpots; i++){
            
            let y = Math.floor(Math.random()*marginSize) + spec.landscape.minHeight;
            //nothing in the safeList yet
            if(spec.landscape.safeList.length == 0){
                let selection = Math.floor(Math.random() * difference) + minSafeNum;
                spec.landscape.safeList = spec.landscape.safeList.concat([[selection,y]]);
            }
            //The safeList has things in it, we need to make sure that we don't pick something that has already been picked. 
            else{
                let doAgain = false; 
                do{
                    doAgain = false; 
                    let size = spec.landscape.safeList.length;
                    let selection = Math.floor(Math.random() * (size+1));
                    let current = minSafeNum;
                    let location = 0; 
                        for (let i = 0; i < size + 1; i++){
                            if  (selection === i){
                                //if it is the last one make the last location the last spot
                                if (i === size){
                                    location = maxSafeNum;
                                }
                                else{
                                    location = spec.landscape.safeList[i][0];
                                }
                                //checking to make sure the area selected is big enough 
                                if((location - current) > lengthSafeSpots){
                                    selection = Math.floor(Math.random() * ((location-lengthSafeSpots) - current))+ current; 
                                    //spec.landscape.safeList = spec.landscape.safeList.concat([[selection,y]]);
                                    insertionSort([selection, y], spec.landscape.safeList, 0);
                                }
                                else{
                                    doAgain = true; 
                                }
                                break; 
                            }
 
                            else{
                                current = spec.landscape.safeList[i][0] + spec.landscape.lengthSafeSpots;
                            }
                        }
                }while(doAgain);
            }
            //spec.landscape.safeList = spec.landscape.safeList.concat([[selection, y]]); 
        }
        console.log('safeZones: ');
        console.log(spec.landscape.safeList);
    }

    function makeLevel(spikiness, numSafeSpots, lengthSafeSpots){
        //resetting 
        spec.landscape.landLine = [];
        spec.landscape.safeList = [];
        let current = spec.landscape.startPathX;
        //making new safe spots 
        selectSafeZones(numSafeSpots, lengthSafeSpots);
        for(let i =0; i < spec.landscape.safeList.length; i++){
            console.log('current');
            console.log(current);
            //Jagged line to safe spot
            let jagged = spikyLine(current, spec.landscape.safeList[i][0],spikiness); 
            spec.landscape.landLine = spec.landscape.landLine.concat(jagged);//spikyLine(current, spec.landscape.safeList[i][0],spikiness));
            console.log('jagged ' + i);
            console.log(jagged)

            //Making the safe spot
            spec.landscape.landLine = spec.landscape.landLine.concat([spec.landscape.safeList[i]]);
            console.log('safe Spot '+ i);
            console.log(spec.landscape.safeList[i])
            spec.landscape.landLine = spec.landscape.landLine.concat([[spec.landscape.safeList[i][0]+ lengthSafeSpots, spec.landscape.safeList[i][1]]]);
            console.log('end Safe Spot '+ i);
            console.log([spec.landscape.safeList[i][0] + lengthSafeSpots, spec.landscape.safeList[i][1]]);

            //setting up for the next round 
            current = spec.landscape.safeList[i][0]+lengthSafeSpots;
        }
        //finishing up
        spec.landscape.landLine = spec.landscape.landLine.concat(spikyLine(current, spec.landscape.endPathX,spikiness));
    } 

    function levelOne(){
        makeLevel(3, 2, 150);
    }
    return{
        spikyLine: spikyLine,
        levelOne: levelOne,
    }
}();