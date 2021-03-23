let particleGen = function(mySpec){
    particles = [];
    systemLoc = {x: mySpec.lander.x, y: mySpec.lander.y}; 

    function createP(d = mySpec.dirRange){
        let p;
        //console.log('d')
        //console.log(d);
        let dir = (Math.random() * (d[1]-d[0]))+ d[0];
        //console.log('dir');
        //console.log(dir);
        let direction = {x: Math.cos(dir), y: Math.sin(dir)};
        let size = creator.nextGaussian(mySpec.size.mean, mySpec.size.stdev )

        p = {
            center: {x: systemLoc.x, y: systemLoc.y},
            size: {x: size, y: size},
            lifetime: Math.abs(creator.nextGaussian(mySpec.lifetime.mean,mySpec.lifetime.stdev)),
            velocity: Math.abs(creator.nextGaussian(mySpec.vel.mean,mySpec.vel.stdev)),
            direction: {x: direction.x, y: direction.y},
            alive: 0, 
            rotation: 0
            //texture: mySpec.image,
            //think about adding rotation
        }        
        return p 
    }

    function update(elapsedTime){
        //console.log('I am updateing')
        systemLoc.x = mySpec.lander.x;
        systemLoc.y = mySpec.lander.y;
        let dead =0; 
        let time = elapsedTime/1000;
        //console.log(particles.length)
        
        for (let i = 0; i < particles.length; i++){
           // console.log(particles[i-dead].velocity);
            //Update the location of the particles.

            
           /* console.log('particles.velocity')
            console.log(particles[i-dead].velocity * particles[i-dead].direction.x);
            console.log('elapsedTime')
            console.log(elapsedTime)
            console.log('before adding')
            console.log((particles.velocity * particles[i-dead].direction.x));
            */

            particles[i-dead].center.x  += (time * particles[i-dead].velocity * particles[i-dead].direction.x);
            particles[i-dead].center.y += (time * particles[i-dead].velocity * particles[i-dead].direction.y);
            //console.log('after adding')
            //console.log(particles[i-dead].center.x)

            particle.rotation += particles[i-dead].velocity/500;

            /*console.log('Hello threr')
            console.log('lifetime');
            console.log(particles[i-dead].lifetime);
            console.log('alive');
            console.log(particles[i-dead].alive);*/
            //Discover whether it needs to die. 
            particles[i-dead].alive += time; 
            if (particles[i-dead].alive > particles[i-dead].lifetime){
               // console.log('knock knock housekeeping')
                particles.splice(i-dead, 1);
                dead = dead + 1; 
                continue; 
            } 
            
        }
        //Go through particles and remove those that aren't necessary
        //Update the locations of the particles
    }

    function makeParticles(number, d){
        for (let i = 0; i <number; i++){
            //console.log('d before')
           // console.log(d);
            let p = createP(d);
            particles.push(p);
        }
    }

    return{
        update: update, 
        makeParticles: makeParticles,
        getParticles: particles,
    }

};