class Renderer3D {
    constructor(raycaster, max) {
        this.raycaster = raycaster
        this.max = max
    }

    draw(walls) {
        noStroke()
        const cellWidth = width / this.raycaster.rays.length
        this.raycaster.rays.forEach((ray, i) => {
            const p = ray.cast(walls)
            if (p) {
                const d = p5.Vector.dist(ray.pos, p)
                if (d === 0) {
                    return
                }
                const r = this.max / d
                fill(155 * r + 100)
                const cellHeight = r * 100
                rect(i * cellWidth, height / 2 - cellHeight / 2, cellWidth, cellHeight)
            }
        })
    }
}
