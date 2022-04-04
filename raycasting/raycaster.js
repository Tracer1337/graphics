class Raycaster {
    constructor(pos, rays = 360) {
        this.pos = pos
        this.rays = []
        for (let i = 0; i < rays; i++) {
            const angle = i / rays * TWO_PI
            this.rays[i] = new Ray(this.pos, angle)
        }
    }

    update(x, y) {
        this.pos.set(x, y)
    }

    cast(walls) {
        stroke(255, 100)
        strokeWeight(2)
        this.rays.forEach((ray) => {
            let closest, minDist = Infinity
            walls.forEach((wall) => {
                const [point, dist] = ray.cast(wall)
                if (point && dist < minDist) {
                    minDist = dist
                    closest = point
                }
            })
            if (closest) {
                line(ray.pos.x, ray.pos.y, closest.x, closest.y)
            }
        })
    }

    draw() {
        fill(255)
        ellipse(this.pos.x, this.pos.y, 10)
    }
}
