class Renderer3D {
    constructor(raycaster, max) {
        this.raycaster = raycaster
        this.max = max
    }

    draw(walls) {
        fill(255)
        noStroke()
        const cellWidth = width / this.raycaster.rays.length
        this.raycaster.rays.forEach((ray, i) => {
            const p = ray.cast(walls)
            if (p) {
                const d = p5.Vector.dist(ray.pos, p)
                if (d === 0) {
                    return
                }
                const cellHeight = this.max / d * 100
                rect(i * cellWidth, height / 2 - cellHeight / 2, cellWidth, cellHeight)
            }
        })
    }
}
