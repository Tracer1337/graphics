import * as THREE from "three"

class Cubie {
    constructor(matrix, x, y, z) {
        this.matrix = matrix
        this.x = x
        this.y = y
        this.z = z
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

    highlight(color) {
        this.material.color = new THREE.Color(color)
    }

    update(x, y, z) {
        this.mesh.matrix = new THREE.Matrix4()
        this.matrix.identity()
        this.matrix.makeTranslation(x, y, z)
        this.mesh.applyMatrix4(this.matrix)
        this.x = x
        this.y = y
        this.z = z
    }
}

export default Cubie
