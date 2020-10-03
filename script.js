

window.addEventListener('load', function() {

    let dataURL = "junk.json";

    fetch(dataURL)
    .then(response => response.json())
    .then(data => {        
        junk = data;
    })
    .catch(error => {
        console.log("Nope : " + error);
    });

});

let junk;
let apogeeRang = [];
let periodRange = [];
let spaceObjects = [];
let earth = new Orbiter(window.innerHeight * 2, 0, 0, "lightblue");

function setup() {
    console.log("setting up");
    createCanvas(windowWidth,windowHeight);
    background(200,180,10);

    let apogees = [];
    let periods = [];

    for (let i=0; i < junk.length; i++) {

        append(apogees,junk[i].APOGEE);
        append(periods,junk[i].PERIOD);
        console.log(junk[i].OBJECT_TYPE);

    }

    apogeeRange = getMinMax(apogees);
    periodRange = getMinMax(periods);

    console.log()

    for (let i=0; i < junk.length; i++) {

        let x = map(junk[i].APOGEE, apogeeRange.min, apogeeRange.max, windowHeight + 100, windowHeight * 2);
        let speed = map(junk[i].PERIOD, periodRange.min, periodRange.max, 2000, 5000);

        let r;

        if(junk[i].RCS_SIZE == 'LARGE') {
            r = 30;
        }
        else if (junk[i].RCS_SIZE == 'MEDIUM') {
            r = 20;
        }
        else {
            r = 10;
        }
        
        let color;

        if(junk[i].OBJECT_TYPE == 'DEBRIS') {
            color = "magenta";
        }
        else if (junk[i].OBJECT_TYPE == 'ROCKET BODY') {
            color = "orange";
        }
        else if (junk[i].OBJECT_TYPE == 'PAYLOAD') {
            color = "blue";
        }
        else {
            color = "white";
        }

        let j = new Orbiter(r, x, speed, color);

        spaceObjects.push(j);
    }

}

function draw() {
    background(200,180,10);
    earth.display();
    if(junk) {
        for (junk of spaceObjects) {
            junk.orbit(earth);
            junk.display();
        }
    }
    else {
        console.log("no junk yet");
    }
}

function getMinMax(numbers) {
    return {"min":min(numbers), "max": max(numbers)};
}

