// orbiter class was taken from this SO answer and modified a little:
// https://codereview.stackexchange.com/questions/211796/basic-orbiting-planets-in-p5-js

class Orbiter {
    constructor(sizeRadius, orbitRadius, orbitSpeed, junkType, orbitAngle=0) {
        
        this.sizeRadius = sizeRadius;
        this.orbitRadius = orbitRadius;
        this.orbitSpeed = orbitSpeed;
        this.type = junkType;
        this.orbitAngle = orbitAngle; // degrees relative to x axis

        this.flipped = false;

        this.color = this.getColor();

        

        // The -1.5 exponent is due to Kepler's 3rd Law
        this.orbitAngleDelta = orbitSpeed * Math.pow(orbitRadius, -1.5);
        this.x = window.innerWidth / 2;
        this.y = window.innerHeight * 2.6;
        
    }

    orbit(primary) {
        this.x = primary.x + this.orbitRadius * cos(radians(this.orbitAngle));
        this.y = primary.y + this.orbitRadius * sin(radians(this.orbitAngle));
        this.orbitAngle = (this.orbitAngle + this.orbitAngleDelta) % 360;
    }

    display() {
        noStroke();
        fill(this.color);
        return ellipse(this.x, this.y, this.sizeRadius, this.sizeRadius);
    }

    getColor() {
        if(this.type == "DEBRIS") {
            return "springgreen"; //"orange";
        }
        else if (this.type == "EARTH") {
            return "pink";
        }
        else {
            return "magenta";
        }
    }

    inView() {

        //console.log(this.x,this.previousX )
        let dur = 2;
        let time = 0;
        let vel = 0.1;
        let note;
        let octaveIn = 4;
        let octaveOut = 3;
        let notes = ['D', 'E', 'F', 'G', 'A'];

        if(this.sizeRadius == 10) {
            octaveIn = 5;
            octaveOut = 4;
        }
        else if(this.sizeRadius == 20) {
            octaveIn = 4;
            octaveOut = 3;
        }
        else {
            octaveIn = 3;
            octaveOut = 2;
        }

        if (this.x > 0 && this.previousX < 0 ) {
            console.log("appeared");
            let appSynth = new p5.PolySynth();
            appSynth.play(random(notes)+octaveIn, vel, 0, dur);
            
        }

        if(this.x > width && this.previousX < width ) {
            console.log("disappeared");
            let disSynth = new p5.PolySynth();
            disSynth.play(random(notes)+octaveOut, vel, 0, dur);   
        }

        this.previousX = this.x;
        this.previousY = this.y;

    }

    clicked() {

        if (dist(mouseX, mouseY, this.x, this.y) < this.sizeRadius) {
            this.flipped = !this.flipped;

            if(this.flipped) {
                this.color = "orange";
            } 
            else {
                this.color = this.getColor();
            }

        }
    }

}