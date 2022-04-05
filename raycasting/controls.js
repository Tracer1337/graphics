class Controls {
    constructor(raycaster, moveVel, rotateVel, sens) {
        this.moveVel = moveVel
        this.rotateVel = rotateVel
        this.sens = sens * 500
        this.raycaster = raycaster
    }

    update() {
        let angle = 0
        if (document.pointerLockElement) {
            angle += movedX / this.sens
        } else {
            if (keyIsDown(LEFT_ARROW)) {
                angle -= 1
            }
            if (keyIsDown(RIGHT_ARROW)) {
                angle += 1
            }
            angle *= this.rotateVel
        }
        this.raycaster.rotate(angle)

        const dir = createVector(0, 0)
        if (keyIsDown(65)) {
            dir.x -= 1
        }
        if (keyIsDown(68)) {
            dir.x += 1
        }
        if (keyIsDown(87)) {
            dir.y += 1
        }
        if (keyIsDown(83)) {
            dir.y -= 1
        }
        dir.setMag(this.moveVel)
        this.raycaster.move(dir)
    }
}
