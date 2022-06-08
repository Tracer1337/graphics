import * as THREE from "three"
import { OrbitControls } from "orbit-controls"
import Cubie from "./Cubie.js"

class Cube {
    constructor() {}

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

        this.renderer = new THREE.WebGLRenderer()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(this.renderer.domElement)

        this.controls = new OrbitControls(this.camera, this.renderer.domElement)

        this.axesHelper = new THREE.AxesHelper(10)
        this.scene.add(this.axesHelper)

        new Cubie().addToScene(this.scene)
    
        this.animate()
    }

    animate() {
        this.renderer.render(this.scene, this.camera)
    
        requestAnimationFrame(this.animate.bind(this))
    }
}

export default Cube
