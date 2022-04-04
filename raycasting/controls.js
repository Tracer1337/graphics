class Controls {
    constructor(player, vel) {
        this.vel = vel
        this.player = player
    }

    update() {
        const dir = createVector(0, 0)
        if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
            dir.x -= this.vel
        }
        if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
            dir.x += this.vel
        }
        if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
            dir.y -= this.vel
        }
        if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
            dir.y += this.vel
        }
        this.player.move(dir)

        this.player.lookAt(createVector(mouseX, mouseY))
    }
}
