

window.addEventListener('load', function() {

    fetch("junk.json")
    .then(response => response.json())
    .then(data => { 
        
        //load the json data
        junk = data;
        dataIsReady = true;
    })
    .catch(error => {
        console.log("Nope : " + error);
    });

});


//initialize global variables
let junk;
let apogeeRange = [];
let periodRange = [];
let spaceObjects = [];

// init body that junk will orbit around
let earth = new Orbiter(window.innerWidth * 2, 0, 0, "EARTH");

//GLobal boolean values to help manage timing of p5 code
let dataIsReady = false;
let animationIsReady = false;

function setup() {
    console.log("setting up");
    createCanvas(windowWidth,windowHeight);
}

function draw(){
    background(200,180,10);
    earth.display();

    if (dataIsReady){
        prepData();    
    }

    if (animationIsReady){
        animateData();
    }
}

//This will be called only once in draw()
function prepData(){
    console.log("Preparing the data");

    //Add logic here to parse/organize the data
    let apogees = [];
    let periods = [];
    // get range of some properties before we create objects
    for (let i=0; i < junk.length; i++) {

        if(junk[i].OBJECT_TYPE == "DEBRIS" && junk[i].APOGEE < 40000) {

            append(apogees,junk[i].APOGEE);
            append(periods,junk[i].PERIOD);

        }

    }

    //  get min max for certain properties
    apogeeRange = getMinMax(apogees);
    periodRange = getMinMax(periods);

    console.log(apogees);

    // 2nd loop create / add objects to array
    for (let i=0; i < junk.length; i++) {

        // the distance from orbited body (place in range between min max of apogee)
        let x = map(junk[i].APOGEE, apogeeRange.min, apogeeRange.max, (earth.sizeRadius / 2) + 100, (earth.sizeRadius / 2) + 500);
        // set the speed of the orbit (place in range between min max of period [need to invert this])
        let speed = map(junk[i].PERIOD, periodRange.min, periodRange.max, 1000, 3000);

        // set radius according to size property of object
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
        
        // set color based on type property of object
        let junkType = junk[i].OBJECT_TYPE;

        // create new object for eaech junk
        let j = new Orbiter(r, x, speed, junkType, random(0,360));
        spaceObjects.push(j);

    }

    //Flip first boolean value back to false
    console.log("Flipping first boolean value back to false");
    dataIsReady = false;
    //Flip second boolean value to true
    console.log("Flipping second boolean value to true");
    animationIsReady = true;    
}

//This will be called repeatedly in draw()
function animateData() {

    if(junk) {
        for (junk of spaceObjects) {

            if(junk.type == "DEBRIS") {
                junk.orbit(earth);
                junk.inView();
                junk.display();
            }
        }
    }
    else {
        console.log("no junk yet");
    }

}

function mousePressed() {
    for (junk of spaceObjects) {
        junk.clicked();
    }
}

// create function for getting min max because we might use it more than a few times
function getMinMax(numbers) {
    return {"min":min(numbers), "max": max(numbers)};
}

