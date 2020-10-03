// orbiter class was taken from this SO answer and modified a little:
// https://codereview.stackexchange.com/questions/211796/basic-orbiting-planets-in-p5-js

class Orbiter {
    constructor(sizeRadius, orbitRadius, orbitSpeed, color, orbitAngle=0) {
        this.sizeRadius = sizeRadius;
        this.orbitRadius = orbitRadius;
        this.orbitSpeed = orbitSpeed;
        this.orbitAngle = 0; // degrees relative to x axis

        // The -1.5 exponent is due to Kepler's 3rd Law
        this.orbitAngleDelta = orbitSpeed * Math.pow(orbitRadius, -1.5);
        this.x = 0 - window.innerHeight / 1.4;
        this.y = window.innerHeight / 2;
        this.color = color;
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
}