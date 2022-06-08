import * as THREE from "three"
import { OrbitControls } from "orbit-controls"
import Stats from "stats"
import Cubie from "./Cubie.js"

class Cube {
    constructor() {
        this.cube = []
    }
    
    init() {
        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        )
        this.camera.position.z = 10

        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
        this.scene.add(this.ambientLight)

        this.pointLight = new THREE.PointLight()
        this.pointLight.position.set(5, 5, 10)
        this.scene.add(this.pointLight)

        this.scene.add(new THREE.PointLightHelper(this.pointLight, .5))

        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(this.renderer.domElement)

        this.controls = new OrbitControls(this.camera, this.renderer.domElement)

        this.axesHelper = new THREE.AxesHelper(10)
        this.scene.add(this.axesHelper)

        this.stats = new Stats()
        document.body.appendChild(this.stats.dom)

        this.createCubies()

        this.cube[0].highlight(0x00ff00)
        this.cube[2].highlight(0x0000ff)

        console.log(this)

        document.addEventListener("keydown", this.handleKeyDown.bind(this))
    
        this.animate()
    }

    animate() {
        this.renderer.render(this.scene, this.camera)

        this.stats.update()
    
        requestAnimationFrame(this.animate.bind(this))
    }

    createCubies() {
        let index = 0
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                for (let z = -1; z <= 1; z++) {
                    const matrix = new THREE.Matrix4()
                    matrix.makeTranslation(x, y, z)
                    const cubie = new Cubie(matrix, x, y, z)
                    cubie.addToScene(this.scene)
                    this.cube[index++] = cubie
                }
            }
        }
    }

    rotateX(index) {
        this.cube
            .filter((qb) => qb.x === index)
            .forEach((qb) => {
                const matrix = new THREE.Matrix3()
                matrix.translate(qb.y, qb.z)
                matrix.rotate(Math.PI / 2)
                qb.update(
                    qb.x,
                    Math.round(matrix.elements[6]),
                    Math.round(matrix.elements[7])
                )
            })
    }

    rotateY(index) {
        this.cube
            .filter((qb) => qb.y === index)
            .forEach((qb) => {
                const matrix = new THREE.Matrix3()
                matrix.translate(qb.x, qb.z)
                matrix.rotate(Math.PI / 2)
                qb.update(
                    Math.round(matrix.elements[6]),
                    qb.y,
                    Math.round(matrix.elements[7])
                )
            })
    }

    rotateZ(index) {
        this.cube
            .filter((qb) => qb.z === index)
            .forEach((qb) => {
                const matrix = new THREE.Matrix3()
                matrix.translate(qb.x, qb.y)
                matrix.rotate(Math.PI / 2)
                qb.update(
                    Math.round(matrix.elements[6]),
                    Math.round(matrix.elements[7]),
                    qb.z
                )
            })
    }

    handleKeyDown(event) {
        switch(event.key) {
            case "x":
                this.rotateX(-1)
                break
            case "X":
                this.rotateX(1)
                break
            case "y":
                this.rotateY(-1)
                break
            case "Y":
                this.rotateY(1)
                break
            case "z":
                this.rotateZ(-1)
                break
            case "Z":
                this.rotateZ(1)
                break
        }
    }
}

export default Cube
