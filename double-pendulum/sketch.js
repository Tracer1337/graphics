// https://www.myphysicslab.com/pendulum/double-pendulum-en.html

let m1 = 20
let L1 = 100
let a1 = 0
let a1_v = 0
let a1_a = 0

let m2 = 20
let L2 = 100
let a2 = 0
let a2_v = 0
let a2_a = 0

let g = 1

let cx, cy

let d = 0.99999

function setup() {
    createCanvas(400, 400)
    a1 = -QUARTER_PI
    a2 = QUARTER_PI / 2

    cx = width / 2
    cy = 50
}

function draw() {
    if (mouseIsPressed) {
        a1 = Math.atan2(mouseY - cy, mouseX - cx) - HALF_PI
    } else {
        update()
    }

    background(0)
    fill(255)
    stroke(255)
    strokeWeight(2)

    translate(cx, cy)

    let x1 = sin(-a1) * L1
    let y1 = cos(-a1) * L1
    line(0, 0, x1, y1)
    ellipse(x1, y1, m1)

    let x2 = x1 + sin(-a2) * L2
    let y2 = y1 + cos(-a2) * L2
    line(x1, y1, x2, y2)
    ellipse(x2, y2, m2)

    resetMatrix()
}

function update() {
    let num1, num2, num3, num4, den

    num1 = -g * (2 * m1 + m2) * sin(a1)
    num2 = -m2 * g * sin(a1 - 2 * a2)
    num3 = -2 * sin(a1 - a2) * m2
    num4 = a2_v ** 2 * L2 + a1_v ** 2 * L1 * cos(a1 - a2)
    den = L1 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2))
    a1_a = (num1 + num2 + num3 * num4) / den

    num1 = 2 * sin(a1 - a2)
    num2 = a1_v ** 2 * L1 * (m1 + m2)
    num3 = g * (m1 + m2) * cos(a1)
    num4 = a2_v ** 2 * L2 * m2 * cos(a1 - a2)
    den = L2 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2))
    a2_a = (num1 * (num2 + num3 + num4)) / den

    a1_v += a1_a
    a1_v *= d
    a1 += a1_v

    a2_v += a2_a
    a2_v *= d
    a2 += a2_v
}
