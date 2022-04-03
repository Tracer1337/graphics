class Spritesheet {
    constructor(image, spriteSize) {
        this.image = image
        this.image.loadPixels()
        this.spriteSize = spriteSize
        this.n = (image.width / spriteSize) ** 2
    }

    random() {
        return this.get(floor(random(this.n)))
    }

    get(i) {
        const x = (i % sqrt(this.n)) * this.spriteSize
        const y = floor(i / sqrt(this.n)) * this.spriteSize
        return this.image.get(x, y, this.spriteSize, this.spriteSize)
    }
}
