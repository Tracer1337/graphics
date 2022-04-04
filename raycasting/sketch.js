let walls = []
let player
let controls

function setup() {
    createCanvas(innerWidth, innerHeight)

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

    player = new Player(width / 2, height / 2)
    controls = new Controls(player, 4)
}

function draw() {
    background(0)

    walls.forEach((w) => w.draw())

    controls.update()

    player.update()
    player.draw()
}
