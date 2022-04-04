class Raycaster {
    constructor(pos, rays, fov) {
        this.pos = pos
        this.dir = createVector(0, 0)
        this.rays = []
        this.fov = radians(fov)

        for (let i = 0; i < rays; i++) {
            const angle = i / rays * this.fov
            this.rays[i] = new Ray(this.pos, angle)
        }
    }

    update() {
        this.rays.forEach((ray) => {
            ray.dir = this.dir.copy().rotate(ray.angle - this.fov / 2)
        })
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
