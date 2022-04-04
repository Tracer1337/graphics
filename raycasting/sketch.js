let walls = []
let raycaster

function setup() {
    createCanvas(600, 600)

    for (let i = 0; i < 10; i++) {
        walls.push(new Boundary(
            createVector(random(width), random(height)),
            createVector(random(width), random(height))
        ))
    }

    walls.push(new Boundary(createVector(0, 0), createVector(width, 0)))
    walls.push(new Boundary(createVector(width, 0), createVector(width, height)))
    walls.push(new Boundary(createVector(width, height), createVector(0, height)))
    walls.push(new Boundary(createVector(0, height), createVector(0, 0)))

    raycaster = new Raycaster(createVector(width / 2, height / 2))
}

function draw() {
    background(0)

    walls.forEach((w) => w.draw())

    raycaster.update(mouseX, mouseY)
    raycaster.cast(walls)
    raycaster.draw()
}
