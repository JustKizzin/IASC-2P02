import * as THREE from "three"

/**
 ** SCENE **
**/
// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color("darkblue")

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
)
camera.position.set(0, 0, 5)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(window.innerWidth, window.innerHeight)

/**
** MESHES **
**/
// testSphere
const sphereGeometry = new THREE.SphereGeometry(1)
const sphereMaterial = new THREE.MeshNormalMaterial()
const testSphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

scene.add(testSphere)

// testDiamond
const cubeGeometry = new THREE.SphereGeometry(1, 1, 1, 1)
const cubeMaterial = new THREE.MeshNormalMaterial()
const testDiamond = new THREE.Mesh(cubeGeometry, cubeMaterial)

scene.add(testDiamond)

/**
** ANIMATION LOOP **
**/
const clock = new THREE.Clock()

// Animate
const animation = () =>
{
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime() 

    // Animate testSphere
    testSphere.position.x = Math.sin(elapsedTime)
    testSphere.position.z = Math.cos(elapsedTime) * -2.5
    testSphere.position.y = Math.cos(elapsedTime) * -0.5

    // Animate testDiamond
    testDiamond.position.x = Math.sin(elapsedTime)
    testDiamond.position.z = Math.cos(elapsedTime) * 2.5
    testDiamond.position.y = Math.cos(elapsedTime) * 0.5

    // Renderer
    renderer.render(scene, camera)

    // Request next frame
    window.requestAnimationFrame(animation)
}

animation()