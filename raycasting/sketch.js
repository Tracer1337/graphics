let walls = []
let controls
let raycaster
let renderer
let dim2d

function setup() {
    createCanvas(innerWidth, innerHeight)

    dim2d = createVector(250, 250)

    for (let i = 0; i < 7; i++) {
        walls.push(new Boundary(
            createVector(random(dim2d.x), random(dim2d.y)),
            createVector(random(dim2d.x), random(dim2d.y))
        ))
    }

    walls.push(new Boundary(createVector(0, 0), createVector(dim2d.x, 0)))
    walls.push(new Boundary(createVector(dim2d.x, 0), createVector(dim2d.x, dim2d.y)))
    walls.push(new Boundary(createVector(dim2d.x, dim2d.y), createVector(0, dim2d.y)))
    walls.push(new Boundary(createVector(0, dim2d.y), createVector(0, 0)))

    raycaster = new Raycaster(createVector(dim2d.x / 2, dim2d.y / 2), 100, 40)
    renderer = new Renderer3D(raycaster, 100)
    controls = new Controls(raycaster, 4)
}

function draw() {
    background(0)

    walls.forEach((w) => w.draw())

    controls.update()

    raycaster.update()
    raycaster.draw(walls)

    renderer.draw(walls)
}
