import * as THREE from 'http://cdn.skypack.dev/three@0.136';
import {scene} from "./main.js"

var T = 1;
var clock = new THREE.Clock();
var ts = clock.getElapsedTime();
var pose1 = {
	lThigh: Math.PI/6,
	rThigh: -Math.PI/6
}
var pose2 = {
	lThigh: -Math.PI/6,
	rThigh: Math.PI/6
}

export class Obstacle {
	constructor (name,center,size,mesh) {
		this.name = name;
		this.center = center.clone();  
		this.mesh = mesh
		this.mesh.position.copy (center);
		this.size = size;
		scene.add (this.mesh)
	}
	update(dt,agent){
		if(this.name == 'chuchu'){ //obj的lookAt不知道為什麼怪怪的(可能要直接調整模型的面向，目前不會)
			this.mesh.rotation.z=Math.PI
			this.mesh.lookAt(agent.mesh.position.x, agent.mesh.position.y+15.35, agent.mesh.position.z)
		}
		else this.mesh.lookAt(agent.mesh.position.x, agent.mesh.position.y, agent.mesh.position.z)

		
	}
	setRotation(rx, ry, rz){
		this.mesh.rotation.set(rx, ry, rz)
	}
}

export class Agent {
  constructor(name, pos, mesh) {
	this.name=name;
    this.pos = pos.clone();
    this.vel = new THREE.Vector3(2*Math.PI * Math.random(), 0, 2*Math.PI * Math.random());
    this.force = new THREE.Vector3();
    this.target = pos.clone();
    this.size = 3;  // half width
    this.mesh = mesh;
    scene.add (mesh);
    
	this.nbhd = [];
	this.keys = [
		[0, pose1],
		[0.5, pose2],
		[1, pose1]
	];
    this.MAXSPEED = 80;
    this.ARRIVAL_R = 30;
    
    // for orientable agent
    this.angle = 0;

  }
  update(dt, parts) {
    this.accumulateForce();
    let obs = scene.obstacles;
    let theOne = null;
    let dist = 1e10;
    let vhat = this.vel.clone().normalize();
    const REACH = 50
    const K = 12
    let perp;
    for (let i = 0; i < obs.length; i++) {
      let point = obs[i].center.clone().sub (this.pos) // c-p
      let proj  = point.dot(vhat);
      if (proj > 0 && proj < REACH) {
        perp = new THREE.Vector3();
        perp.subVectors (point, vhat.clone().setLength(proj));
        let overlap = obs[i].size + this.size - perp.length()
        if (overlap > 0 && proj < dist) {
            theOne = obs[i]
            dist = proj
            perp.setLength (K*overlap);
            perp.negate()
        }
      }
    }
    if (theOne) this.force.add (perp);
    this.vel.add(this.force.clone().multiplyScalar(dt));

    // ARRIVAL: velocity modulation

	if (this.target !== null) {
		let diff = this.target.clone().sub(this.pos)
		let dst = diff.length();
		if (dst < this.ARRIVAL_R) {
			this.vel.setLength(dst);
		}
	}  
		
    this.pos.add(this.vel.clone().multiplyScalar(dt))
    this.mesh.position.copy(this.pos)
	//if(this.name=='HuTao') this.mesh.position.y=10
	if(this.name=='Bus') this.mesh.position.y=12.7
    // for orientable agent
    // non PD version
    if (this.vel.length() > 0.1) {
			/*if(this.name=='HuTao'){
				this.angle = Math.atan2 (this.vel.z, this.vel.x)
				this.mesh.rotation.y = this.angle-0.5*Math.PI;
				
			}*/
			if(this.name=='Clara') {
				this.mesh.position.y=-0.35 //有時會被擠到飛起來，得硬設
				this.angle = Math.atan2 (this.vel.z, -this.vel.x)
				this.mesh.rotation.y = this.angle-0.5*Math.PI;
				
				pose1, pose2 = calcPose(Math.PI/6, this.vel.length())
				this.setKeys(pose1, pose2)
				let intKey = keyframe(clock.getElapsedTime(), this.keys);
				
				parts[1].rotation.x=intKey[1]
				parts[2].rotation.x=intKey[0]
				parts[3].rotation.x=intKey[0]
				parts[4].rotation.x=intKey[1]
				parts[8].rotation.x=intKey[1]
				parts[9].rotation.x=intKey[0]
				parts[10].rotation.x=intKey[0]
				parts[11].rotation.x=intKey[1]
			}
			if(this.name=='Bus'){ 
				this.angle = Math.atan2 (this.vel.z, this.vel.x)
				this.mesh.rotation.z = -this.angle;
			}
			
   	}
	return this.vel.length();
  }
  returnPos(){
	  return this.pos;
  }
  returnVel(){
	  return this.vel;
  }
  returnTarget(){
	  return this.target;
  }
  setTarget(target) {
  	if (target!== null) this.target = target
  }
  setRotation(rx, ry, rz){
		this.mesh.rotation.set(rx, ry, rz)
  }
  setKeys(pose1, pose2){
	this.keys=[
		[0, pose1],
		[0.5, pose2],
		[1, pose1]
	]
  }
  targetInducedForce(targetPos) { // seek
    return targetPos.clone().sub(this.pos).normalize().multiplyScalar(this.MAXSPEED).sub(this.vel)
  }

  distanceTo(otherAgent) {
    return this.pos.distanceTo(otherAgent.pos)
  }
  addNbr(otherAgent) {
    this.nbhd.push(otherAgent)
  }

  accumulateForce() {
 
    if (this.target !== null) this.force.copy(this.targetInducedForce(this.target));
	
		// coherence
    if (this.nbhd.length > 0) { // 如果this.nbhd有其他agents
      let sum = new THREE.Vector3();
	  for(let i=0; i<this.nbhd.length; i++)
		sum.add(this.nbhd[i].pos);// 算出 nbhd的平均位置
      sum.divideScalar(this.nbhd.length)// 利用 targetInducedForce （來吸引 this 往平均位置靠近）	
      this.force.add(this.targetInducedForce(sum))// 將此力加到 this.force
    }
	//separation
	let push = new THREE.Vector3()
    for (let i = 0; i < this.nbhd.length; i++) {
      let point = this.pos.clone().sub(this.nbhd[i].pos);
      push.add(point.setLength(120 / point.length()))
    }
    this.force.add(push)
  }

}

export function findNbhd(agents) {
    let i, j, dst;
    let nAgents = agents.length;
  
    // 這樣的 double-for-loop對嗎？
    agents.forEach(function(agent){agent.nbhd=[]});
  
    for (i = 0; i < nAgents - 1; i++) {
      for (j = i + 1; j < nAgents; j++) {
        dst = agents[i].distanceTo(agents[j])
        if (dst < 14.8) { // NBHD = 20
          if(agents[i].name == 'NPC')agents[i].addNbr(agents[j])
          if(agents[j].name == 'NPC')agents[j].addNbr(agents[i])
        }
      }
    }
}

function keyframe(t, keys) {
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

function calcPose(ext, speed) {
  pose1 = {
    lThigh: Math.min(speed*T*ext*0.03, Math.PI/2.4),
    rThigh: Math.max(-speed*T*ext*0.03, -Math.PI/2.4)
  }
  pose2 = {
    lThigh: Math.max(-speed*T*ext*0.03, -Math.PI/2.4),
    rThigh: Math.min(speed*T*ext*0.03, Math.PI/2.4)
  }
 return pose1, pose2;
}

