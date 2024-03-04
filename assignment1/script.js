import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"

/**********
** SETUP **
***********/
// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
}

/**********
** SCENE **
***********/
// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
camera.position.set(9.9, 3.5, 10.5)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/***********
** MESHES **
************/
const caveMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('white'),
    side: THREE.DoubleSide
})

// caveWall
const caveWallGeometry = new THREE.PlaneGeometry(10, 5)
const caveWall = new THREE.Mesh(caveWallGeometry, caveMaterial)
caveWall.rotation.y = Math.PI * 0.5
caveWall.position.set(-5, 0, 0)
caveWall.receiveShadow = true
scene.add(caveWall)

// barrierWall
const barrierWallGeometry = new THREE.PlaneGeometry(10, 2)
const barrierWall = new THREE.Mesh(barrierWallGeometry, caveMaterial)
barrierWall.rotation.y = Math.PI * 0.5
barrierWall.position.set(5, -1.5, 0)
scene.add(barrierWall)

// caveFloor
const caveFloorGeometry = new THREE.PlaneGeometry(10, 10)
const caveFloor = new THREE.Mesh(caveFloorGeometry, caveMaterial)
caveFloor.rotation.x = Math.PI * 0.5
caveFloor.position.set(0, -2.5, 0)
scene.add(caveFloor)

// OBJECTS
// sphere
const sphereGeometry = new THREE.SphereGeometry(0.5)
const material = new THREE.MeshNormalMaterial()
const Sphere = new THREE.Mesh(sphereGeometry, material)
scene.add(Sphere)
Sphere.position.set(8.4, 1.5, 0)
Sphere.castShadow = true

// cube
const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
const Cube = new THREE.Mesh(cubeGeometry, material)
scene.add(Cube)
Cube.position.set(6.5, 0, 6)
Cube.castShadow = true

// diamond
const diamondGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
const Diamond = new THREE.Mesh(diamondGeometry, material)
scene.add(Diamond)
Diamond.position.set(6.5, 0.25, 6)
Diamond.rotation.set(45,0,0)
Diamond.castShadow = true

// pyramid
const pyramidGeometry = new THREE.CylinderGeometry(0, 0.5, 1, 4, 3)
const Pyramid = new THREE.Mesh(pyramidGeometry, material)
scene.add(Pyramid)
Pyramid.position.set(9.5, 0.5, 6)
Pyramid.castShadow = true

// torusKnot
const torusKnotGeometry = new THREE.TorusKnotGeometry(0.25, 0.075)
const torusKnot = new THREE.Mesh(torusKnotGeometry, material)
scene.add(torusKnot)
torusKnot.position.set(8, 0.5, 6)
torusKnot.castShadow = true

// SUN
const sunGeometry = new THREE.SphereGeometry(0.5)
const sunMaterial = new THREE.MeshLambertMaterial({
    emissive: new THREE.Color('orange'),
    emissiveIntensity: 20
})
const sun = new THREE.Mesh(sunGeometry, sunMaterial)
scene.add(sun)

/***********
** LIGHTS **
************/
/*
// Ambient Light
const ambientLight = new THREE.AmbientLight(
    new THREE.Color('white')
)
scene.add(ambientLight)
*/

// Direcional Light
const directionalLight = new THREE.DirectionalLight(
    new THREE.Color('white'),
    0.5
)
directionalLight.target = caveWall
directionalLight.position.set(10, 3, 0)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024
scene.add(directionalLight)

// Directional Light Helper
//const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
//scene.add(directionalLightHelper)

/*******
** UI **
********/
/*
const ui = new dat.GUI()

const uiObject = {}

uiObject.reset = () =>
{
    directionalLight.position.set(8.6, 1.7, 0)
}

// Directional Light
const lightPositionFolder = ui.addFolder('Directional Light Position')

lightPositionFolder
    .add(directionalLight.position, 'x')
    .min(-10)
    .max(20)
    .step(0.1)

lightPositionFolder
    .add(directionalLight.position, 'y')
    .min(-10)
    .max(10)
    .step(0.1)

lightPositionFolder
    .add(directionalLight.position, 'z')
    .min(-10)
    .max(10)
    .step(0.1)

lightPositionFolder
    .add(uiObject, 'reset')
    .name('Reset position')

lightPositionFolder
    .add(torusKnot.position, 'y')
    .min(-5)
    .max(5)
    .step(0.1)
*/


/*********************
** DOM INTERACTIONS **
**********************/
//  domObject

const domObject = {
    part: 1,
    firstChange: false,
    secondChange: false,
    thirdChange: false,
    fourthChange: false,
    fifthChange: false,
    finalChange: false,
}


//  continue-reading

document.querySelector('#continue-reading').onclick = function(){
    document.querySelector('#part-two').classList.remove('hidden')
    document.querySelector('#part-one').classList.add('hidden')
    domObject.part = 2
}


//  restart

document.querySelector('#restart').onclick = function(){
    document.querySelector('#part-two').classList.add('hidden')
    document.querySelector('#part-one').classList.remove('hidden')
    domObject.firstChange = false
    domObject.secondChange = false
    domObject.thirdChange = false
    domObject.fourthChange = false
    domObject.fifthChange = false
    domObject.finalChange = false
    domObject.part = 1
    Sphere.position.set(8.4, 1.5, 0)
    Cube.position.set(6.5, 0, 6)
    Diamond.position.set(6.5, 0.25, 6)
    Pyramid.position.set(9.5, 0.5, 6)
    torusKnot.position.set(8, 0.5, 6)
    directionalLight.position.set(10, 3, 0)
}

//  first change
document.querySelector('#first-change').onclick = function(){
    domObject.firstChange = true
}

//  second change (Cube)
document.querySelector('#second-change').onclick = function(){
    domObject.secondChange = true
    domObject.thirdChange = false
    domObject.fourthChange = false
    domObject.fifthChange = false
    Diamond.position.set(6.5, 0.25, 6)
    Pyramid.position.set(9.5, 0.5, 6)
    torusKnot.position.set(8, 0.5, 6)
}
//  third change (Diamond)
document.querySelector('#third-change').onclick = function(){
    domObject.thirdChange = true
    domObject.secondChange = false
    domObject.fourthChange = false
    domObject.fifthChange = false
    Cube.position.set(6.5, 0, 6)
    Pyramid.position.set(9.5, 0.5, 6)
    torusKnot.position.set(8, 0.5, 6)
}
//  fourth change (Pyramid)
document.querySelector('#fourth-change').onclick = function(){
    domObject.fourthChange = true
    domObject.secondChange = false
    domObject.thirdChange = false
    domObject.fifthChange = false
    Cube.position.set(6.5, 0, 6)
    Diamond.position.set(6.5, 0.25, 6)
    torusKnot.position.set(8, 0.5, 6)
}
//  fifth change (Pretzal)
document.querySelector('#fifth-change').onclick = function(){
    domObject.fifthChange = true
    domObject.secondChange = false
    domObject.thirdChange = false
    domObject.fourthChange = false
    Cube.position.set(6.5, 0, 6)
    Diamond.position.set(6.5, 0.25, 6)
    Pyramid.position.set(9.5, 0.5, 6)
}

// final change (birds eye view)
document.querySelector('#final-change').onclick = function(){
    domObject.finalChange = true
    domObject.secondChange = false
    domObject.thirdChange = false
    domObject.fourthChange = false
    domObject.fifthChange = false
    Cube.position.set(6.5, 0, 6)
    Diamond.position.set(6.5, 0.25, 6)
    Pyramid.position.set(9.5, 0.5, 6)
    torusKnot.position.set(8, 0.5, 6)
}



/*******************
** ANIMATION LOOP **
********************/
const clock = new THREE.Clock()

// Animate
const animation = () =>
{
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    // Update directionalLightHelper
    //directionalLightHelper.update()

    // Update sun position to match directionalLight position
    sun.position.copy(directionalLight.position)

    console.log(camera.position)

    // Controls
    controls.update()

    //  DOM INTERACTIONS

    // part one
    if(domObject.part === 1){
        camera.position.set(2, -1, 0)
        camera.lookAt(caveWall.position)
    }

    // part two
    if(domObject.part === 2){
        camera.position.set(9.9, 3.5, 10.5)
        camera.lookAt(0, 0, 0)
    }

    // first-change (Circle/Sun)
    if(domObject.firstChange){
        Sphere.position.y = Math.sin(elapsedTime * 0.25 ) * 4.3
    }
    // second-change (Cube)
    if(domObject.secondChange){
        Cube.position.z = Math.sin(elapsedTime * 0.75 ) * 6

    }
    // third-change (Diamond)
    if(domObject.thirdChange){
        Diamond.position.z = Math.sin(elapsedTime * 0.75 ) * 6
    }
    // fourth-change (Triangle)
    if(domObject.fourthChange){
        Pyramid.position.z = Math.sin(elapsedTime * 0.75 ) * 6
    }
    // fifth-change (Pretzel)
    if(domObject.fifthChange){
        torusKnot.position.z = Math.sin(elapsedTime * 0.75 ) * 6
        torusKnot.rotation.y = elapsedTime
    }
    // final-change (birds eye view)
    if(domObject.finalChange){
        Cube.position.z = Math.sin(elapsedTime * 0.75 ) * 6
        Diamond.position.z = Math.sin(elapsedTime * 0.75 ) * 6
        //Diamond and Cube combined to represent that they are the same shape//
        Pyramid.position.z = Math.sin(elapsedTime * 0.75 ) * 6 + 3
        torusKnot.position.z = Math.cos(elapsedTime * 0.75 ) * 6 + 2
        torusKnot.rotation.y = elapsedTime
    }


    // Renderer
    renderer.render(scene, camera)

    // Request next frame
    window.requestAnimationFrame(animation)
}

animation()