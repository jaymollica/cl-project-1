# Junk Minimalism

After decade of activity in space, humanity has littered Earth's orbit with thousands of pieces of space junk. A [recent article in the New Yorker](https://www.newyorker.com/magazine/2020/09/28/the-elusive-peril-of-space-junk) outlines the implications this junk has on our exploration of space.

In this visualization I have tried to flip the perception of junk from eccessive to minimalist. Using data from space-track.org, I have mapped the orbits of 27 pieces of sapce junk into a minimalist wind chime. Each green circle is a piece of debris that will chime as it enters or exits the browser window. Their radius is determined by the size classification from the data (small, medium, large), their speed is determined by their period (the time it takes them to orbit the Earth), and the radius of the orbit is determined by their apogee, or the furthest point their obit takes them from Earth.

Clicking on a piece of debris will freeze it in time, with a second click it will resume its orbit.

The equation for calculating the path of an orbit was taken from [this Stack Exchange answer](// https://codereview.stackexchange.com/questions/211796/basic-orbiting-planets-in-p5-js).

h/t to Craig for setting me straight with the preprocessing / order of operations.

## Data

The data was taken from the [Geosynchronous Report](https://www.space-track.org/basicspacedata/query/class/satcat/format/html/orderby/NORAD_CAT_ID/PERIOD/1430--1450/CURRENT/Y/DECAY/null-val) on [space-track.org](https://www.space-track.org/) and preprocessed to only include objects classified as "DEBRIS". (A login is required to access the report.)


