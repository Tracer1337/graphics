import * as THREE from "three"

class Cubie {
    constructor() {
        this.material = new THREE.MeshLambertMaterial()
        this.geometry = new THREE.BoxGeometry(1, 1, 1)
        this.mesh = new THREE.Mesh(this.geometry, this.material)
    }

    addToScene(scene) {
        scene.add(this.mesh)
    }
}

export default Cubie
