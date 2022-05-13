import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/controls/OrbitControls.js';
import { Gyroscope } from "https://cdn.skypack.dev/three@0.136/examples/jsm/misc/Gyroscope.js";
import { MTLLoader } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/loaders/OBJLoader.js';
import {buildPart, editPart, buildGrass, buildBackground} from "./BuildTheParts.js"
import {Agent, Obstacle, findNbhd} from "./agent.js"

var turn = false
var renderer, scene, camera, clock;
var cameraHelper, cameraHelper1st, cameraHelper3rd, cameraGyro, camera1st, camera3rd, use3rd = 2;
var cameraHelper, cameraHelper1st, cameraHelper3rd, camera1st, camera3rd, use3rd = 2;
var gyro = new Gyroscope();
var pointlight=[], BusLight=[];
var check=0, checklight='on';

var pursuit = new THREE.Vector3();
var mouse = new THREE.Vector2();
var raycaster;
var pickables = [];
var target;
var plane;
var theObject;
//var keyboard = new KeyboardState();
//var speed, angle, vel;
var pos = new THREE.Vector3();
var loader = new THREE.TextureLoader();
var Claratexture, Zombietexture, Skeletontexture, Herobrinetexture, grasstexture, treemap;
var parts, zombie, skeleton, herobrine, tree;
var HuTao, Bus, Busstop, chuchu;
var agents=[]

var T = 1;
var clock = new THREE.Clock();
var ts = clock.getElapsedTime();
/*var pose1 = {
	lThigh: Math.PI/6,
    rThigh: -Math.PI/6
}
var pose2 = {
	lThigh: -Math.PI/6,
    rThigh: Math.PI/6
}
var keys = [
  [0, pose1],
  [0.5, pose2],
  [1, pose1]
];
*/

$('#switchgod').click ( function () {
	use3rd = 2;
})
$('#switch1').click ( function () {
	use3rd = 1;
})
$('#switch3').click ( function () {
	use3rd = 3;
})
$('#switchgyro').click ( function () {
	use3rd = 4;
});
$('#switchlight').click ( function () {
	turn = !turn;
	if (!turn){
		$("#switchlight").text ('turn off the lights');
		checklight='on';
	}
	else{
		$("#switchlight").text ('turn on the lights');
		checklight='off';
	}
});

/*(function() {
  Math.clamp = function(val,min,max){
    return Math.min(Math.max(val,min),max);
    
  }})();*/
/*  
function calcPose(ext) {
  pose1 = {
    lThigh: Math.min(speed*T*ext*0.03, Math.PI/2.4),
    rThigh: Math.max(-speed*T*ext*0.03, -Math.PI/2.4)
  }
  pose2 = {
    lThigh: Math.max(-speed*T*ext*0.03, -Math.PI/2.4),
    rThigh: Math.min(speed*T*ext*0.03, Math.PI/2.4)
  }

 keys = [
  [0, pose1],
  [0.5, pose2],
  [1, pose1]
];
}

function keyframe(t) {
  var s = ((t - ts) % T) / T;

  for (var i = 1; i < keys.length; i++) {
    if (keys[i][0] > s) break;
  }
  var ii = i - 1;
  var a = (s - keys[ii][0]) / (keys[ii + 1][0] - keys[ii][0]);
  let intKey = [keys[ii][1].lThigh * (1 - a) + keys[ii + 1][1].lThigh * a,
            keys[ii][1].rThigh * (1 - a) + keys[ii + 1][1].rThigh * a
  ];
	return intKey;
}
*/

function onWindowResize() {
  var width = window.innerWidth;
  var height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

function makeCameraHelper() {
  var cameraModel = new THREE.Group();
  var body = new THREE.Mesh (new THREE.BoxGeometry(1,1,1), new THREE.MeshNormalMaterial({
				transparent: true,
				opacity: 0}));
  cameraModel.add (body);
  return cameraModel;
}

function readModel (modelName, targetSize) { //想分另一個js，不過因return出來的theObject都會是null不知道怎麼辦

  var onProgress = function(xhr) {
    if (xhr.lengthComputable) {
      var percentComplete = xhr.loaded / xhr.total * 100;
      console.log(Math.round(percentComplete, 2) + '% downloaded');
    }
  };

  var onError = function(xhr) {};

  var mtlLoader = new MTLLoader();
  mtlLoader.setPath('models/');
  mtlLoader.load(modelName+'.mtl', function(materials) {

    materials.preload();

    var objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('models/');
    objLoader.load(modelName+'.obj', function(object) {
		
		theObject =  unitize (object, targetSize);
		theObject.name = 'OBJ'
		scene.add (theObject);		
		if(modelName == 'HuTao') theObject.setRotationFromEuler (new THREE.Euler (0, Math.PI, 0, 'ZYX'));
		if(modelName == 'Bus') theObject.setRotationFromEuler (new THREE.Euler (0, Math.PI, 0, 'ZYX'));
		if(modelName == 'Busstop') theObject.setRotationFromEuler (new THREE.Euler (0, Math.PI, 0, 'ZYX'));
		theObject.position.y=10
		if(modelName == 'HuTao') HuTao=theObject
		if(modelName == 'Bus') Bus=theObject
		if(modelName == 'Busstop') Busstop=theObject
		if(modelName == 'chuchu') chuchu=theObject
    }, onProgress, onError);
  });

}

function unitize (object, targetSize) {  
	
	var box3 = new THREE.Box3();
	box3.setFromObject (object);
	var size = new THREE.Vector3();
	size.subVectors (box3.max, box3.min);
	var center = new THREE.Vector3();
	center.addVectors(box3.max, box3.min).multiplyScalar (0.5);
	
	console.log ('center: ' + center.x + ', '+center.y + ', '+center.z );
	console.log ('size: ' + size.x + ', ' +  size.y + ', '+size.z );
	
	var objSize = Math.max (size.x, size.y, size.z);
	var scaleSet = targetSize/objSize;
				
	var theObject =  new THREE.Object3D();
	theObject.add (object);
	object.scale.set (scaleSet, scaleSet, scaleSet);
	object.position.set (-center.x*scaleSet, -center.y*scaleSet, -center.z*scaleSet);
	
	return theObject;
			
}

function agentMesh () {
  let points = [];
  
  points.push (new THREE.Vector3(10,0,0), new THREE.Vector3(0,0,-3), 
  		new THREE.Vector3(0,0,3), new THREE.Vector3(0,3,0));
	let geometry = new THREE.BufferGeometry().setFromPoints (points);

	let indices = [];
  indices.push (0,3,2, 0,2,1, 1,3,0, 1,2,3);
	geometry.setIndex (indices);
  geometry.computeVertexNormals();
	return new THREE.Mesh (geometry, 
  new THREE.MeshBasicMaterial({color:'cyan', wireframe:true}))  
}

function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay){}
}

function init (body) {
	clock = new THREE.Clock();
	scene = new THREE.Scene();
	//模組化後背景無法透明，因'http://cdn.skypack.dev/three@0.136'的關係
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(0xECFFFF, 1);
	document.body.appendChild(renderer.domElement);
	document.getElementById("body").style.backgroundImage = "url(https://i.imgur.com/EVjpH3e.jpg)"; 
	
	camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.set (-50,40,0);
	camera3rd  = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 1000);
	camera1st  = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 1000);
	cameraGyro = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 1000);
	let controls = new OrbitControls(camera, renderer.domElement);
	////////////////////////////////////////////////////////////////
	readModel("HuTao", 20);
	readModel("Busstop", 40);
	readModel("Bus", 80);
	readModel("chuchu", 30);
	//speed = 0.0;
	//angle = 0.0;
	loader.setCrossOrigin('');
	Claratexture = loader.load ('https://i.imgur.com/wW1j06A.png');
	Zombietexture = loader.load ('https://i.imgur.com/zZiPV5H.png');
	Skeletontexture = loader.load ('https://i.imgur.com/tOUMOzM.png');
	Herobrinetexture = loader.load ('https://i.imgur.com/74joVJc.png');
	grasstexture = loader.load ('https://i.imgur.com/MUvFN2X.png');
	treemap = loader.load('https://i.imgur.com/2toNMWA.png');
	var floor = buildGrass(300, 300, 300, grasstexture)
	floor.position.y=-150
	scene.add(floor)
	
	pointlight[0] = new THREE.PointLight(0xFFFFFF, 1);
	pointlight[0].position.set(0, 151, 0);
	scene.add( pointlight[0] );
	pointlight[1] = new THREE.PointLight(0xFFFFFF, 1);
	pointlight[1].position.set(151, 0, 0);
	scene.add( pointlight[1] );
	pointlight[2] = new THREE.PointLight(0xFFFFFF, 1);
	pointlight[2].position.set(0, 0, 151);
	scene.add( pointlight[2] );
	pointlight[3] = new THREE.PointLight(0xFFFFFF, 1);
	pointlight[3].position.set(-151, 0, 0);
	scene.add( pointlight[3] );
	pointlight[4] = new THREE.PointLight(0xFFFFFF, 1);
	pointlight[4].position.set(0, 0, -151);
	scene.add( pointlight[4] );
	pointlight[5] = new THREE.PointLight(0xFFFFFF, 1);
	pointlight[5].position.set(0, -151, 0);
	scene.add( pointlight[5] );
	BusLight[0] = new THREE.PointLight(0xFFFFFF, 1);
	scene.add( BusLight[0] );
	BusLight[1] = new THREE.PointLight(0xFFFFFF, 2);
	scene.add( BusLight[1] );
	BusLight[2] = new THREE.PointLight(0xFFFFFF, 2);
	scene.add( BusLight[2] );
	/*lightHelper = makeCameraHelper();
    scene.add (lightHelper);*/
	tree = buildBackground(treemap);
	
	parts = buildPart(Claratexture);
	editPart(parts);
	zombie = buildPart(Zombietexture);
	editPart(zombie);
	zombie[0].position.z=-40
	zombie[1].rotation.x=-0.5*Math.PI
	zombie[2].rotation.x=-0.5*Math.PI
	skeleton = buildPart(Skeletontexture);
	editPart(skeleton);
	skeleton[0].position.z=-50
	skeleton[0].position.x=-10
	herobrine = buildPart(Herobrinetexture);
	editPart(herobrine);
	herobrine[0].rotation.y=Math.PI
	herobrine[0].position.z=58
	herobrine[0].position.x=24.5
	
	cameraHelper3rd = makeCameraHelper();
    scene.add (cameraHelper3rd);
	cameraHelper1st = makeCameraHelper();
	scene.add (cameraHelper1st);
	
    parts[5].add (gyro);
    gyro.add (cameraGyro);
	
    cameraGyro.position.set (-35,10,-20); 
    cameraGyro.lookAt (0,0,0);  
}

function onDocumentMouseDown(event) {

  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  // find intersections
  raycaster.setFromCamera(mouse, camera);
  var intersects = raycaster.intersectObjects(pickables);
  if (intersects.length > 0) {
    target.position.copy(intersects[0].point);
	agents[0].setTarget(intersects[0].point)
    target.position.y = 0.5;
  }
}

/*function updatee(dt) {

  keyboard.update();
	if ( keyboard.pressed("up") |  keyboard.pressed("W") )  
		speed += 0.5; 
	else 
		speed -= 0.5;
	if ( keyboard.pressed("left") |  keyboard.pressed("A") ) 
		angle += 0.025;               
	if ( keyboard.pressed("right") |  keyboard.pressed("D") )
		angle -= 0.025;                      
	if ( keyboard.pressed("down") |  keyboard.pressed("S") )  
		speed -= 5;    
	speed = Math.clamp (speed, 0, 100.0);		//(速度, 最低達到速, 最高達到速)
	vel = new THREE.Vector3(0,0,speed);
	
	vel.applyAxisAngle (new THREE.Vector3(0,1,0), angle);
	if(pos.z <= 151) {
		pos.add (vel.clone().multiplyScalar(dt));
		}
	else {
		pos.z=151
	}
}*/

function animate() {

  //var dt = clock.getDelta();
  //updatee(dt)
  //calcPose(Math.PI/6)
  //NPC.position.copy(pos);
  //NPC.rotation.y = angle;


	/*let intKey = keyframe(clock.getElapsedTime());
	parts[1].rotation.x=intKey[1]
	parts[2].rotation.x=intKey[0]
	parts[3].rotation.x=intKey[0]
	parts[4].rotation.x=intKey[1]
	parts[8].rotation.x=intKey[1]
	parts[9].rotation.x=intKey[0]
	parts[10].rotation.x=intKey[0]
	parts[11].rotation.x=intKey[1]*/

  ///////////////////////////////////////////////////////////////////////
  rotateBillboard(tree)
  ///////////////////////////////////////////////////////////////////////
  
  if(HuTao != undefined && Busstop != undefined && Bus != undefined && chuchu != undefined) {
	  if(check==0){ //obj要等載入好才能放進agent或obstacle所以放這
		  plane = new THREE.Mesh(new THREE.PlaneGeometry(300, 300), new THREE.MeshBasicMaterial({ //滑鼠點擊範圍用
		  transparent: true,
		  opacity: 0.5,
		  visible: true
		  }));
		  scene.add(plane);
		  plane.material.visible = false
		  plane.rotation.x = -Math.PI / 2;
		  pickables = [plane];
		  let tex = loader.load ("https://i.imgur.com/KQD8jH7.png");
		  target = new THREE.Mesh(new THREE.CircleGeometry(10,20), new THREE.MeshBasicMaterial({
		  map: tex,
		  transparent:true
		  }));
		  scene.add(target);
		  target.position.y=0.5
		  target.rotation.x = -Math.PI/2
		  target.rotation.z = -Math.PI/2
		  raycaster = new THREE.Raycaster();
		  document.addEventListener('pointerdown', onDocumentMouseDown, false);
		  //let mesh = agentMesh ();
		  agents.push(new Agent('Bus', new THREE.Vector3(13, 12.7, 15), Bus));
		  agents[0].setRotation(-0.5*Math.PI, 0, -0.5*Math.PI)
		  agents.push(new Agent('Clara', new THREE.Vector3(-140 + 280 * Math.random(), -0.35, -140 + 280 * Math.random()), parts[0]));
		  scene.obstacles = [];
		  scene.obstacles.push ( new Obstacle ('zombie', new THREE.Vector3(-140 + 280 * Math.random(), -0.35, -140 + 280 * Math.random()),15,zombie[0]) )//0
		  scene.obstacles.push ( new Obstacle ('skeleton', new THREE.Vector3(-140 + 280 * Math.random(), -0.35, -140 + 280 * Math.random()),15,skeleton[0]) )//1
		  scene.obstacles.push ( new Obstacle ('herobrine', new THREE.Vector3(-140 + 280 * Math.random(), -0.35, -140 + 280 * Math.random()),15,herobrine[0]) )//2
		  scene.obstacles.push ( new Obstacle ('Busstop', new THREE.Vector3(34, 11.5, 17),15, Busstop) )//3
		  scene.obstacles[3].setRotation(-0.5*Math.PI, 0, Math.PI);
		  scene.obstacles.push ( new Obstacle ('HuTao', new THREE.Vector3(30, 10, -12), 15, HuTao) )//4
		  scene.obstacles[4].setRotation(0, 0.5*Math.PI, 0);
		  scene.obstacles.push ( new Obstacle ('chuchu', new THREE.Vector3(-140 + 280 * Math.random(), 15, -140 + 280 * Math.random()), 15, chuchu) )//5
		  scene.obstacles[5].setRotation(0, Math.PI, 0);
		  
		  check=1;
	  }
	  findNbhd(agents);
  
	  var dt = clock.getDelta();
	  let leaderspeed = agents[0].update(dt)
      //agent.update(dt);
	  //NPC.update(dt);
	  //scene.obstacles[3].update(dt, agents[0]);
	  let TARGET_SPEED = 40;
	  let leaderpos = agents[0].returnPos()
	  let leadervel = agents[0].returnVel()
	  let leadertarget = agents[0].returnTarget()
      const c = .02
      var TT = agents[0].distanceTo(agents[1])*c  // T = Dc
      pursuit.copy (leaderpos)
      pursuit.add (new THREE.Vector3 (TARGET_SPEED,0,0).multiplyScalar(TT))
	  pursuit.y=-0.35
	  //如果NPC追蹤公車追得夠近，NPC會開始找公車的右邊
	  if(agents[0].distanceTo(agents[1])<40 && leaderspeed < 5){ 
		if(leadervel.x==0&&leadervel.z==0) leadervel.z=1 //利用向量尋找公車的右側
		let leaderangle = Math.acos(leadervel.z / Math.sqrt(leadervel.x * leadervel.x + leadervel.z * leadervel.z)); //取起點角度
		if (leadervel.x>0) leaderangle = 2*Math.PI - leaderangle
		let righttarget = new THREE.Vector3(leadertarget.x-15*Math.cos(leaderangle), -0.35, leadertarget.z-15*Math.sin(leaderangle));
		agents[1].setTarget(righttarget);
	  }
	  else agents[1].setTarget (pursuit) ;
	  agents[1].update(dt, parts);
	  scene.obstacles[0].update(dt, agents[1]);
	  scene.obstacles[1].update(dt, agents[1]);
	  scene.obstacles[2].update(dt, agents[1]);
	  scene.obstacles[5].update(dt, agents[1]);
	  var BusLightPos=[];
	  BusLightPos[0] = Bus.localToWorld (new THREE.Vector3(0,0,0));
	  BusLight[0].position.copy (BusLightPos[0]);
	  BusLightPos[1] = Bus.localToWorld (new THREE.Vector3(40,5,-5));
	  BusLight[1].position.copy (BusLightPos[1]);	
	  BusLightPos[2] = Bus.localToWorld (new THREE.Vector3(40,-5,-5));
	  BusLight[2].position.copy (BusLightPos[2]); 
  }
  requestAnimationFrame(animate);
  var thirdPos = parts[5].localToWorld (new THREE.Vector3(0,10,-20));
  var thirdAt = parts[5].localToWorld (new THREE.Vector3(0,0,60));
  camera3rd.position.copy (thirdPos);
  camera3rd.lookAt (thirdAt);
  var firstPos = parts[5].localToWorld (new THREE.Vector3(0,0,3.2));
  var firstAt = parts[5].localToWorld (new THREE.Vector3(0,0,60));
  camera1st.position.copy (firstPos);
  camera1st.lookAt (firstAt);
  cameraHelper3rd.position.copy (camera3rd.position);
  cameraHelper3rd.quaternion.copy (camera3rd.quaternion);
  cameraHelper1st.position.copy (camera1st.position);
  cameraHelper1st.quaternion.copy (camera1st.quaternion);
  
  if(checklight == 'on'){
	  pointlight.forEach(function(light){light.visible=true});
	  BusLight.forEach(function(light){light.visible=false});
	  renderer.setClearColor(0xECFFFF, 1)
  }
  else if(checklight == 'off'){
	  pointlight.forEach(function(light){light.visible=false});
	  BusLight.forEach(function(light){light.visible=true});
	  renderer.setClearColor(0x000000, 1)
  } 
  if (use3rd==2)
		renderer.render (scene, camera);
  else if(use3rd==1){
		renderer.render (scene, camera1st);}
  else if(use3rd==3)
		renderer.render (scene, camera3rd);
  else if(use3rd==4)
		renderer.render (scene, cameraGyro);
	
	
}


function render() {
	
	renderer.render(scene, camera);
	
}

function rotateBillboard(mesh) {
  var b = mesh.position.clone(); 
  var rotaxis = new THREE.Vector3();
  var v, yhat, n;
  
  if (use3rd==2)
    {v = camera.position.clone();}
  else if(use3rd==1){
    v = camera1st.position.clone(); }
  else if(use3rd==3){
    v = camera3rd.position.clone(); }
  else if(use3rd==4){
    v = cameraGyro.position.clone(); }
		
  yhat = new THREE.Vector3(0, 1, 0); 
  n = new THREE.Vector3(0, 0, 1); 

  v.subVectors(v, b); 
  v.sub(yhat.clone().multiplyScalar(v.dot(yhat)));
  v.normalize(); 

  let rotangle = Math.acos(v.dot(n));
  rotaxis.crossVectors(n, v);
  if (rotaxis.dot(yhat) < 0) rotangle *= -1;

  mesh.rotation.y = rotangle;
}

export {init, animate, scene, render, camera};