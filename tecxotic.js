import * as THREE from './three/build/three.module.js'
import {GLTFLoader} from './three/examples/jsm/loaders/GLTFLoader.js'
import {OrbitControls} from './three/examples/jsm/controls/OrbitControls.js'



const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()
//Load background texture
const loader_texture = new THREE.TextureLoader();
loader_texture.load('https://images.pexels.com/photos/1205301/pexels-photo-1205301.jpeg' , function(texture){
  scene.background = texture;  
});
            
var KOLOP;
const KOLOP_size = 0.4
const loader = new GLTFLoader()
loader.load("src_models/Rov.glb", function(glb){
  console.log(glb)
  const root = glb.scene
  root.scale.set(KOLOP_size,KOLOP_size,KOLOP_size)
  scene.add(root)
  KOLOP = root

},function(xhr){
  console.log((xhr.loaded/xhr.total * 100)+"% loaded")
}, function(error){
  console.log("An error occurred")
})


const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(2,0.3,2)
scene.add(light)





const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1,100)
camera.position.set(0,1,2) //X,Y,Z
scene.add(camera)

const renderer = new THREE.WebGLRenderer({
  canvas:canvas
})
// const controls = new OrbitControls(camera, renderer.domElement)
// controls.update()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

renderer.shadowMap.enabled = true
renderer.gameOutput = true
renderer.render(scene, camera) 



function animate(){
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  light.position.copy(camera.position)
  const currentTimeLine = window.pageYOffset / 3000
  const page_movement = currentTimeLine * Math.PI * 2
  console.log(page_movement)
  const sine_movement = Math.sin(page_movement)
  const cosine_movement = Math.cos(page_movement)
  KOLOP.position.set(sine_movement,1,cosine_movement-1)

  KOLOP.rotation.set(1,0,0)

  light.rotation.set(0,page_movement,0)


  
}
animate()


