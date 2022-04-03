class Snowflake {
    static spritesheet = null
    
    get vel() {
        return 1 / this.z * 10
    }

    get size() {
        return this.v * 32
    }

    update() {
        this.y += this.vel

        this.noiseY += this.noiseVel
        this.x += (noise(this.noiseX, this.noiseY) - 0.5) * this.vel

        if (this.y > height) {
            this.randomize()
            this.y = -this.sprite.height * 2
        }
    }

    draw() {
        image(this.sprite, this.x, this.y, this.size, this.size)
    }

    randomize() {
        this.x = random(width)
        this.y = random(height)
        this.z = random(1, 5)

        this.noiseX = random(1000)
        this.noiseY = 0
        this.noiseVel = 0.01

        this.sprite = Snowflake.spritesheet.random()
    }
}
