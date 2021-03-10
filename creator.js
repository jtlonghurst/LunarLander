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
        spec.landscape.landLine = spikyRecurse(startPoint, endPoint, 0, numIter);

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
        let marginSize = spec.landscape.maxHeight - spec.landscape.minHeight;
        let y = Math.floor(Math.random()*marginSize) + spec.landscape.minHeight;
        let x = (Math.abs(endPoint - startPoint)/2) + startPoint;
        console.log(x);
        if(depth == goalDepth){
            return [[x,y]] 
        }
        let begin = spikyRecurse(startPoint,x, depth+1, goalDepth);
        let end = spikyRecurse(x,endPoint, depth+1, goalDepth);
        return begin.concat([[x,y]], end);
        
    }

    return{
        spikyLine: spikyLine,
    }
}();