# PoissonDiscSampler.js
a simple library for poisson disc sampling, maybe i will add a .min

<h1>PoissonDiscSampler class</h1>
<h2>constructor</h2>
<pre>
    <code>
        var r = 3; // minimum distance between points
        var k = 8; // number of trials before removing a point from the active list. you just have to know that bigger is better, but slower
        var width = 100; // width of the rectanle to sample points
        var height = 100; // height of the rectanle to sample points
        <br>
        var poissonDiscSampler = new PoissonDiscSampler(r, k, width, height);
        var points = poissonDiscSampler.sample();
        <br>
        console.log(points);
        // [{x, y}, {x, y}, {x, y}, ...]
    </code>
</pre>
<h2>attributes</h2>
<h3>r</h3>
the minimum distance between points
<h3>sqrt2_r (private)</h3>
the value of r/sqrt(2)
<h3>k</h3>
the number of trials before removing a point from the active list. you just have to know that bigger is better, but slower
<h3>width</h3>
the width of the rectanle to sample points
<h3>height</h3>
the height of the rectangle to sample points
<h3>grid (getter only)</h3>
it represents a grid that stores the points
<h3>activeList (getter only)</h3>
the points witch are currently in the active list
<h3>points (getter only)</h3>
all of the points that were sampled
<h2>methods</h2>
<h3>sample(?initialPoint = {x, y})</h3>
sample all the points until the active list is empty. basically when the rectangle is full for large enough k
<h3>sampleStep()</h3>
does one step of the sample method, only use when animating
<h3>addPoint(newPoint = {x, y}, ?i = number, ?j = number)</h3>
adds a point to activeList, grid and points
