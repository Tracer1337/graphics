// https://observablehq.com/@toja/4d-hypercube

const s = 50
const offset = [-s/2, -s/2, 0, 0]

let cam

let labels = []
let coords = []
let edges = []

function setup() {
    createCanvas(innerWidth, innerHeight, WEBGL)

    cam = createCamera()
    cam.setPosition(0, 0, 300)

    for (let i = 0; i < 16; i++) {
        coords[i] = []
        let k = i
        for (let j = 3; j >= 0; j--) {
            coords[i][j] = (k & 1) == 0 ? -1 : 1
            k >>= 1
        }
        labels[i] = coords[i].join("")
    }

    for (let i = 0; i < coords.length; i++) {
        for (let j = 0; j < coords.length; j++) {
            if (j <= i) continue
            if (hammingDistance(i, j) === 1) {
                edges.push([i, j])
            }
        }
    }
}

function draw() {
    background(0)
    
    rotateY(HALF_PI-0.5)

    const angle = frameCount * 0.01

    const projected = coords.map((c) => {
        c = math.matrix(c)
        c = math.multiply(c, rotateXZW(angle))
        c = math.multiply(c, project(c.get([3])))
        c = math.multiply(c, s)
        c = math.add(c, offset)
        return c.resize([3]).toArray()
    })

    fill(255)
    noStroke()

    projected.forEach((p) => {
        translate(...p)
        sphere(3)
        translate(...math.multiply(p, -1))
    })

    stroke(255)

    edges.forEach((e) => {
        let from = projected[e[0]]
        let to = projected[e[1]]
        line(...from, ...to)
    })
}

function project(w) {
    const d = 2
    const p = 1 / (d - w)
    return math.matrix([
        [p, 0, 0, 0],
        [0, p, 0, 0],
        [0, 0, p, 0],
        [0, 0, 0, 0]
    ])
}

function rotateXZW(angle) {
    return math.matrix([
        [cos(angle), -sin(angle), 0, 0],
        [sin(angle), cos(angle), 0, 0],
        [0, 0, cos(angle), -sin(angle)],
        [0, 0, sin(angle), cos(angle)]
    ])
}

function hammingDistance(x, y) {
    let i = x ^ y
    let distance = 0
    while (i > 0) {
        if (i & 1) {
            distance++
        }
        i >>= 1
    }
    return distance
}
