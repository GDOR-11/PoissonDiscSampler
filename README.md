# PoissonDiscSampler.js
simple library for poisson disc sampling

<h2>How to use</h2>
<pre>
    <code>
        var r = 3; // minimum distance between points
        var k = 8; // number of trials before removing point from active list. you just have to know that bigger is better, but slower
        var width = 100; // maximum x coordinate to sample points
        var height = 100; // maximum y coordinate to sample points
        <br>
        var poissonDiscSampler = new PoissonDiscSampler(r, k, width, height);
        var points = poissonDiscSampler.sample();
        <br>
        console.log(points);
        // [{x, y}, {x, y}, {x, y}, ...]
    </code>
</pre>
<h2>specifications</h2>
