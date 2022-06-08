import WebGL from "webgl"
import Cube from "./Cube.js"

if (WebGL.isWebGLAvailable()) {
    new Cube().init()
} else {
	const warning = WebGL.getWebGLErrorMessage()
	document.body.appendChild(warning)
}
