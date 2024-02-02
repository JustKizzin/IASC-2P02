import * as THREE from "three"
import * as dat from 'lil-gui'
import { OrbitControls } from 'OrbitControls'




/**********
** SETUP **
***********/

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
}


/***********
 ** SCENE **
 ***********/
// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color("black")

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)

camera.position.set(2, 2, 4)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enableClipping = true

/***********
** MESHES **
************/

// plane
const planeGeometry = new THREE.PlaneGeometry(10, 10, 50, 50)
const planeMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color('aqua'),
    side: THREE.DoubleSide,
    wireframe: true
})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)


plane.rotation.x = Math.PI * 0.51
scene.add(plane)
// testSphere
const geometry = new THREE.SphereGeometry(1)
const material = new THREE.MeshNormalMaterial()
const testSphere = new THREE.Mesh(geometry, material)

testSphere.position.y = 0
scene.add(testSphere)

//scene.add(knot)

/********
 ** UI ** 
 ********/

// UI
const ui = new dat.GUI()

// UI Object
const uiObject = {}
uiObject.play = false

uiObject.reset = () =>
{
    testSphere.position.y = 0
}

// Plane UI
const planeFolder = ui.addFolder('Plane')

planeFolder
    .add(planeMaterial, 'wireframe')

const sphereFolder = ui.addFolder('Sphere')

sphereFolder
    .add(testSphere.position, 'y')
    .min(-5)
    .max(5)
    .step(0.1)
    .name('Height')
    .listen()

sphereFolder
    .add(uiObject, 'play')
    .name('Animate sphere')

sphereFolder
    .add(uiObject, 'reset')

    
/*******************
** ANIMATION LOOP **
********************/
const clock = new THREE.Clock()

// Animate
const animation = () =>
{
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime() 

    // Animate sphere
    if(uiObject.play)
    {
        testSphere.position.y = Math.sin(elapsedTime * 0.5) * 2
    }
    // Controls
    controls.update()

    // Rotate plane
    //plane.rotation.x = Math.PI * elapsedTime * 0.1

    // Renderer
    renderer.render(scene, camera)

    // Request next frame
    window.requestAnimationFrame(animation)
}

animation()
