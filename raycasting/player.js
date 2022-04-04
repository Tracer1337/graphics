class Player {
    constructor(x, y) {
        this.raycaster = new Raycaster(createVector(x, y), 100, 40)
    }

    move(dir) {
        this.raycaster.pos.add(dir)
    }

    lookAt(point) {
        this.raycaster.dir.x = point.x - this.raycaster.pos.x
        this.raycaster.dir.y = point.y - this.raycaster.pos.y
        this.raycaster.dir.normalize()
    }
    
    update() {
        this.raycaster.update()
    }

    draw() {
        this.raycaster.cast(walls)
        this.raycaster.draw()
    }
}
