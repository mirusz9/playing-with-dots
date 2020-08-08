const width = 500;
const height = 500;
const pop = 30;
const res = 2;

const dots = new Array(pop);
const randomSpot = {
	x: Math.floor(Math.random() * width),
	y: Math.floor(Math.random() * height),
	type: 1,
};

function setup() {
	createCanvas(width, height);
	for (let i = 0; i < dots.length; i++) {
		dots[i] = {
			x: Math.floor(Math.random() * width),
			y: Math.floor(Math.random() * height),
			type: i % 2,
		};
	}

	strokeWeight(res * 1.5);
	background(50);

	for (let i = 0; i < width; i += res) {
		for (let j = 0; j < height; j += res) {
			dotsC = [...dots, randomSpot, { x: i, y: j, type: 0 }];

			let good = false;
			while (dotsC.length > 0) {
				pairI = findpair(dotsC);

				pairI.sort((a, b) => b - a);

				dotsC.splice(pairI[0], 1);
				dotsC.splice(pairI[1], 1);
				if (pairI[0] === pop - 1 && pairI[1] === pop - 2) good = true;
			}
			if (good) {
				stroke('#ff0');
				point(i, j);
			}
		}
	}
}

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

function draw() {
	strokeWeight(3);
	for (const dot of dots) {
		stroke(colors[dot.type]);
		point(dot.x, dot.y, 5);
	}
	strokeWeight(6);
	point(randomSpot.x, randomSpot.y);

	dotsC = [...dots]; // , { x: mouseX, y: mouseY, type: 1 }
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
		pairI.sort((a, b) => b - a);

		dotsC.splice(pairI[0], 1);
		dotsC.splice(pairI[1], 1);
	}

	noLoop();
}
