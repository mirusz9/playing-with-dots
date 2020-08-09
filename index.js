const width = 500;
const height = 500;
const pop = 20;
const res = 6;

const dots = new Array(pop);
const randomSpot = {
	x: Math.floor(Math.random() * width),
	y: Math.floor(Math.random() * height),
	target: true,
	type: 1,
};

const goodPoints = [];

const colors = {
	0: '#00bbff',
	1: '#ff7777',
};

function findpair(dots) {
	shortestDist = Infinity;
	shortestIndexes = [0, 0];
	for (let i = 0; i < dots.length; i++) {
		for (let j = 0; j < dots.length; j++) {
			if (dots[i].type !== dots[j].type) {
				const dist =
					Math.abs(dots[i].x - dots[j].x) ** 2 +
					Math.abs(dots[i].y - dots[j].y) ** 2;
				if (dist < shortestDist) {
					shortestDist = dist;
					shortestIndexes[dots[i].type] = i;
					shortestIndexes[dots[j].type] = j;
				}
			}
		}
	}
	return shortestIndexes;
}

function setup() {
	createCanvas(width, height);
	// generating random points
	for (let i = 0; i < dots.length; i++) {
		dots[i] = {
			x: Math.floor(Math.random() * width),
			y: Math.floor(Math.random() * height),
			type: i % 2,
		};
	}

	// searching for yellow regions
	for (let i = 0; i < width; i += res) {
		for (let j = 0; j < height; j += res) {
			dotsC = [...dots, randomSpot, { x: i, y: j, target: true, type: 0 }];

			let good = false;
			while (dotsC.length > 0) {
				pairI = findpair(dotsC);

				if (pairI[0] < pairI[1]) {
					pairI.reverse();
				}

				if (dotsC[pairI[0]].target && dotsC[pairI[1]].target) good = true;
				dotsC.splice(pairI[0], 1);
				dotsC.splice(pairI[1], 1);
			}
			if (good) {
				goodPoints.push({ x: i, y: j });
			}
		}
	}
}

function drawYellowRegions() {
	strokeWeight(res * 1.5);
	stroke('#990');
	for (goodPoint of goodPoints) {
		point(goodPoint.x, goodPoint.y);
	}
}

function drawRegDots() {
	strokeWeight(6);
	for (const dot of dots) {
		stroke(colors[dot.type]);
		point(dot.x, dot.y, 5);
	}
}

function draw() {
	background(50);
	//drawYellowRegions();

	drawRegDots();
	// strokeWeight(10);
	// point(randomSpot.x, randomSpot.y);

	dotsC = [
		...dots,
		// randomSpot,
		// { x: mouseX, y: mouseY, target: true, type: 0 },
	];
	strokeWeight(1);
	stroke('#0f0');

	while (dotsC.length > 0) {
		pairI = findpair(dotsC);

		line(
			dotsC[pairI[0]].x,
			dotsC[pairI[0]].y,
			dotsC[pairI[1]].x,
			dotsC[pairI[1]].y
		);
		if (pairI[0] < pairI[1]) {
			pairI.reverse();
		}

		dotsC.splice(pairI[0], 1);
		dotsC.splice(pairI[1], 1);
	}
}

function mousePressed() {
	noLoop();
}
