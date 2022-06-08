import * as THREE from "three"

class Cubie {
    constructor(matrix) {
        this.material = new THREE.MeshLambertMaterial()
        const size = 0.98
        this.geometry = new THREE.BoxGeometry(size, size, size)
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.matrixAutoUpdate = false
        this.mesh.applyMatrix4(matrix)
    }

    addToScene(scene) {
        scene.add(this.mesh)
    }
}

export default Cubie
