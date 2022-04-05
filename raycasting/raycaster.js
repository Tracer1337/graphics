class Raycaster {
    constructor(pos, rays, fov) {
        this.pos = pos
        this.dir = createVector(1, 1)
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

    move(dir) {
        if (dir.mag() > 0) {
            const angle = dir.angleBetween(createVector(1, 0)) + HALF_PI
            this.pos.add(this.dir.copy().rotate(angle).setMag(dir.mag()))
        }
    }

    lookAt(point) {
        this.dir.x = point.x - this.pos.x
        this.dir.y = point.y - this.pos.y
        this.dir.normalize()
    }

    rotate(angle) {
        this.dir.rotate(angle)
    }

    draw(walls) {
        stroke(255, 100)
        strokeWeight(2)
        this.rays.forEach((ray) => {
            const p = ray.cast(walls)
            if (p) {
                line(ray.pos.x, ray.pos.y, p.x, p.y)
            }
        })
        fill(255)
        ellipse(this.pos.x, this.pos.y, 10)
    }
}
