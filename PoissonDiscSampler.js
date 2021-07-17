const PoissonDiscSampler = (function() {
	let TWO_PI = 2 * Math.PI;
	function validateNumber(number, errorMessage) {
		number = Number(number);
		if(!isNaN(number)) {
			return number;
		} else {
			throw TypeError(errorMessage);
		}
	}
	return class {
		#r = 1;
		#k = 1;
		#sqrt2_r = Math.SQRT2;
		#width = 1;
		#height = 1;
		#grid = [];
		#activeList = [];
		#points = [];
		constructor(r, k, width, height) {
			this.r = r;
			this.k = k;
			this.width = width;
			this.height = height;
			for(let i = 0;i < Math.SQRT2 * this.#width / this.#r;i++) {
				this.#grid.push([]);
				for(let j = 0;j < Math.SQRT2 * this.#height / this.#r;j++) {
					this.#grid[i].push(-1);
				}
			}
		}
		sample(initialPoint = {x: Math.random() * this.#width, y: Math.random() * this.#height}) {
			this.addPoint(initialPoint);
			while(this.#activeList.length > 0) {
				this.sampleStep();
			}
			return this.#points;
		}
		sampleStep() {
			if(this.#activeList.length == 0) {
				return;
			}
			let index = Math.floor(Math.random() * this.#activeList.length);
			let point = this.#activeList[index];
			let found = false;
			let newPoint;
			loop: for(let n = 0;n < this.#k;n++) {
				let angle = Math.random() * TWO_PI;
				let length = (1 + Math.random()) * this.#r;
				newPoint = {
					x: length * Math.cos(angle) + point.x,
					y: length * Math.sin(angle) + point.y
				}
				if(newPoint.x < 0 || newPoint.x > this.#width || newPoint.y < 0 || newPoint.y > this.#height) {
					continue loop;
				}
				let indexNewPoint = {i: Math.floor(newPoint.x * this.#sqrt2_r), j: Math.floor(newPoint.y * this.#sqrt2_r)};
				for(let di = -2;di <= 2;di++) {
					let i = di + indexNewPoint.i;
					if(i >= 0 && i < this.#grid.length) {
						for(let dj = -2;dj <= 2;dj++) {
							let j = dj + indexNewPoint.j;
							if(j >= 0 && j < this.#grid[0].length) {
								let comparationPoint = this.#grid[i][j];
								let dx = comparationPoint.x - newPoint.x;
								let dy = comparationPoint.y - newPoint.y;
								if(dx * dx + dy * dy < this.#r * this.#r) {
									continue loop;
								}
							}
						}
					}
				}
				this.addPoint(newPoint, indexNewPoint.i, indexNewPoint.j);
				found = true;
			}
			if(!found) {
				this.#activeList.splice(index, 1);
			}
			return newPoint;
		}
		addPoint(newPoint, i = Math.floor(newPoint.x * this.#sqrt2_r), j = Math.floor(newPoint.y * this.#sqrt2_r)) {
			validateNumber(newPoint.x, 'newPoint.x should be a number');
			validateNumber(newPoint.y, 'newPoint.y should be a number');
			validateNumber(i, 'i should be a number');
			validateNumber(j, 'j should be a number');
			this.#activeList.push(newPoint);
			this.#grid[i][j] = newPoint;
			this.#points.push(newPoint);
		}
		get r() {
			return this.#r;
		}
		set r(r) {
			this.#r = validateNumber(r, 'r should be a number');
			this.#sqrt2_r = Math.SQRT2 / this.#r;
		}
		get k() {
			return this.#k;
		}
		set k(k) {
			this.#k = validateNumber(k, 'k should be a number');
		}
		get width() {
			return this.#width;
		}
		set width(w) {
			this.#width = validateNumber(w, 'width should be a number');
		}
		get height() {
			return this.#height;
		}
		set height(h) {
			this.#height = validateNumber(h, 'height should be a number');
		}
		get grid() {
			return this.#grid;
		}
		get activeList() {
			return this.#activeList;
		}
		get points() {
			return this.#points;
		}
	}
})();
