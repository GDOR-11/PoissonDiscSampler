# PoissonDiscSampler.js
simple library for poisson disc sampling

<h1>How to use</h1>
<code>
    var r = 3; // minimum distance between points
    <br>
    var k = 8; // number of trials before removing point from active list. you just have to know that bigger is better, but slower
    <br>
    var width = 100; // maximum x coordinate to sample points
    <br>
    var height = 100; // maximum y coordinate to sample points
    <br>
    var poissonDiscSampler = new PoissonDiscSampler(r, k, width, height);
    <br>
    var points = poissonDiscSampler.sample();
    <br>
    console.log(points);
    <br>
    // [{x, y}, {x, y}, {x, y}, ...]
</code>
