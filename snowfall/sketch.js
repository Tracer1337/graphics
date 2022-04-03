const n = 200

let img
let snowflakes = []

function preload() {
    img = loadImage("flakes32.png")
}

function setup() {
    createCanvas(innerWidth, innerHeight)
    Snowflake.spritesheet = new Spritesheet(img, 32)

    for (let i = 0; i < n; i++) {
        const s = new Snowflake()
        s.randomize()
        snowflakes.push(s)
    }
}

function draw() {
    background(0)

    snowflakes.forEach((s) => {
        s.update()
        s.draw()
    })
}
