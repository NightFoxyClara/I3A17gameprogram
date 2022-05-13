import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import {scene} from "./main.js";
function buildHead(WW, HH, DD, texture) {

  var geometry = new THREE.BufferGeometry();	
  var vertices = [];
  var indices = [];
  var uvs = [];
  const ww = 1;
  const hh = 3;
  const UU = 16*ww;
  const VV = 3*hh + 7*ww;
  
  var a = {u: 2*ww, v: hh+5*ww+(2*ww+2*hh)};
  var b = {u: 4*ww, v: hh+5*ww+(2*ww+2*hh)};
  var c = {u: 6*ww, v: hh+5*ww+(2*ww+2*hh)};
  var d = {u: 0, v: hh+3*ww+(2*ww+2*hh)};
  var e = {u: 2*ww, v: hh+3*ww+(2*ww+2*hh)};
  var f = {u: 4*ww, v: hh+3*ww+(2*ww+2*hh)};
  var g = {u: 6*ww, v: hh+3*ww+(2*ww+2*hh)};
  var h = {u: 8*ww, v: hh+3*ww+(2*ww+2*hh)};
  var i = {u: 0, v: hh+ww+(2*ww+2*hh)};
  var j = {u: 2*ww, v: hh+ww+(2*ww+2*hh)};
  var k = {u: 4*ww, v: hh+ww+(2*ww+2*hh)};
  var l = {u: 6*ww, v: hh+ww+(2*ww+2*hh)};
  var m = {u: 8*ww, v: hh+ww+(2*ww+2*hh)};

  // PZ
  vertices.push(-WW/2,HH/2,DD/2, -WW/2,-HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,HH/2,DD/2 ); // 0,3,2,1
  indices.push(0,1,2, 0,2,3);
	uvs.push (e.u/UU,e.v/VV, j.u/UU,j.v/VV, k.u/UU,k.v/VV, f.u/UU,f.v/VV); // e,j,k,f

	// PX
  vertices.push(WW/2,HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,-HH/2,-DD/2, WW/2,HH/2,-DD/2 ); // 1,2,6,5
  indices.push (4,5,6, 4,6,7); // [0,1,2, 0,2,3] + 4
	uvs.push (f.u/UU,f.v/VV, k.u/UU,k.v/VV, l.u/UU,l.v/VV, g.u/UU,g.v/VV); // f,k,l,g
	
	// NX
  vertices.push(-WW/2,HH/2,-DD/2, -WW/2,-HH/2,-DD/2, -WW/2,-HH/2,DD/2, -WW/2,HH/2,DD/2 ); // 4,7,3,0
  indices.push (8,9,10, 8,10,11); // [0,1,2, 0,2,3] + 8
	uvs.push (d.u/UU,d.v/VV, i.u/UU,i.v/VV, j.u/UU,j.v/VV, e.u/UU,e.v/VV); // d,i,j,e

	// NZ
  vertices.push(WW/2,HH/2,-DD/2, WW/2,-HH/2,-DD/2, -WW/2,-HH/2,-DD/2, -WW/2,HH/2,-DD/2 ); // 5,6,7,4
  indices.push (12,13,14, 12,14,15); // [0,1,2, 0,2,3] + 12
	uvs.push (g.u/UU,g.v/VV, l.u/UU,l.v/VV, m.u/UU,m.v/VV, h.u/UU,h.v/VV); // g,l,m,h
	//PY
  vertices.push(-WW/2,HH/2,-DD/2, -WW/2,HH/2,DD/2, WW/2,HH/2,DD/2, WW/2,HH/2,-DD/2 );  // 4 0 1 5
  indices.push (16,17,18, 16,18,19); // [0,1,2, 0,2,3] + 16
	uvs.push (a.u/UU,a.v/VV, e.u/UU,e.v/VV, f.u/UU,f.v/VV, b.u/UU,b.v/VV); // a,e,f,b
	//NY
  vertices.push(-WW/2,-HH/2,-DD/2, -WW/2,-HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,-HH/2,-DD/2 );  // 7 3 2 6
  indices.push (20,21,22, 20,22,23); // [0,1,2, 0,2,3] + 20
	uvs.push (b.u/UU,b.v/VV, f.u/UU,f.v/VV, g.u/UU,g.v/VV, c.u/UU,c.v/VV); // b,f,g,c

	geometry.setIndex(indices);  
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));	
	
  let head = new THREE.Mesh (geometry, new THREE.MeshBasicMaterial({map: texture, transparent: true, side:THREE.DoubleSide}));
	return head;
}

function buildHeadArmor(WW, HH, DD, texture) {

  var geometry = new THREE.BufferGeometry();	
  var vertices = [];
  var indices = [];
  var uvs = [];
  const ww = 1;
  const hh = 3;
  const UU = 16*ww;
  const VV = 3*hh + 7*ww;
  
  var a = {u: 2*ww+8*ww, v: hh+5*ww+(2*ww+2*hh)};
  var b = {u: 4*ww+8*ww, v: hh+5*ww+(2*ww+2*hh)};
  var c = {u: 6*ww+8*ww, v: hh+5*ww+(2*ww+2*hh)};
  var d = {u: 0+8*ww, v: hh+3*ww+(2*ww+2*hh)};
  var e = {u: 2*ww+8*ww, v: hh+3*ww+(2*ww+2*hh)};
  var f = {u: 4*ww+8*ww, v: hh+3*ww+(2*ww+2*hh)};
  var g = {u: 6*ww+8*ww, v: hh+3*ww+(2*ww+2*hh)};
  var h = {u: 8*ww+8*ww, v: hh+3*ww+(2*ww+2*hh)};
  var i = {u: 0+8*ww, v: hh+ww+(2*ww+2*hh)};
  var j = {u: 2*ww+8*ww, v: hh+ww+(2*ww+2*hh)};
  var k = {u: 4*ww+8*ww, v: hh+ww+(2*ww+2*hh)};
  var l = {u: 6*ww+8*ww, v: hh+ww+(2*ww+2*hh)};
  var m = {u: 8*ww+8*ww, v: hh+ww+(2*ww+2*hh)};

  // PZ
  vertices.push(-WW/2,HH/2,DD/2, -WW/2,-HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,HH/2,DD/2 ); // 0,3,2,1
  indices.push(0,1,2, 0,2,3);
	uvs.push (e.u/UU,e.v/VV, j.u/UU,j.v/VV, k.u/UU,k.v/VV, f.u/UU,f.v/VV); // e,j,k,f

	// PX
  vertices.push(WW/2,HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,-HH/2,-DD/2, WW/2,HH/2,-DD/2 ); // 1,2,6,5
  indices.push (4,5,6, 4,6,7); // [0,1,2, 0,2,3] + 4
	uvs.push (f.u/UU,f.v/VV, k.u/UU,k.v/VV, l.u/UU,l.v/VV, g.u/UU,g.v/VV); // f,k,l,g
	
	// NX
  vertices.push(-WW/2,HH/2,-DD/2, -WW/2,-HH/2,-DD/2, -WW/2,-HH/2,DD/2, -WW/2,HH/2,DD/2 ); // 4,7,3,0
  indices.push (8,9,10, 8,10,11); // [0,1,2, 0,2,3] + 8
	uvs.push (d.u/UU,d.v/VV, i.u/UU,i.v/VV, j.u/UU,j.v/VV, e.u/UU,e.v/VV); // d,i,j,e

	// NZ
  vertices.push(WW/2,HH/2,-DD/2, WW/2,-HH/2,-DD/2, -WW/2,-HH/2,-DD/2, -WW/2,HH/2,-DD/2 ); // 5,6,7,4
  indices.push (12,13,14, 12,14,15); // [0,1,2, 0,2,3] + 12
	uvs.push (g.u/UU,g.v/VV, l.u/UU,l.v/VV, m.u/UU,m.v/VV, h.u/UU,h.v/VV); // g,l,m,h
	//PY
  vertices.push(-WW/2,HH/2,-DD/2, -WW/2,HH/2,DD/2, WW/2,HH/2,DD/2, WW/2,HH/2,-DD/2 );  // 4 0 1 5
  indices.push (16,17,18, 16,18,19); // [0,1,2, 0,2,3] + 16
	uvs.push (a.u/UU,a.v/VV, e.u/UU,e.v/VV, f.u/UU,f.v/VV, b.u/UU,b.v/VV); // a,e,f,b
	//NY
  vertices.push(-WW/2,-HH/2,-DD/2, -WW/2,-HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,-HH/2,-DD/2 );  // 7 3 2 6
  indices.push (20,21,22, 20,22,23); // [0,1,2, 0,2,3] + 20
	uvs.push (b.u/UU,b.v/VV, f.u/UU,f.v/VV, g.u/UU,g.v/VV, c.u/UU,c.v/VV); // b,f,g,c

	geometry.setIndex(indices);  
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));	
	
  let head = new THREE.Mesh (geometry, new THREE.MeshBasicMaterial({map: texture, transparent: true, side:THREE.DoubleSide}));
	return head;
}

function buildBody(WW, HH, DD, texture) {
 
	var geometry = new THREE.BufferGeometry();	
  var vertices = [];
  var indices = [];
	var uvs = [];

  const ww = 1;
  const hh = 3;
	const UU = 16*ww;
  const VV = 3*hh + 7*ww;
  
  var a = {u: 5*ww, v:hh+ww+2*ww+2*hh};
  var b = {u: 7*ww, v:hh+ww+2*ww+2*hh};
  var c = {u: 9*ww, v:hh+ww+2*ww+2*hh};
  var d = {u: 4*ww, v:hh+2*ww+2*hh};
  var e = {u: 5*ww, v:hh+2*ww+2*hh};
  var f = {u: 7*ww, v:hh+2*ww+2*hh};
  var g = {u: 8*ww, v:hh+2*ww+2*hh};
  var h = {u: 10*ww, v:hh+2*ww+2*hh};
  var i = {u: 4*ww, v:0+2*ww+2*hh};
  var j = {u: 5*ww, v:0+2*ww+2*hh};
  var k = {u: 7*ww, v:0+2*ww+2*hh};
  var l = {u: 8*ww, v:0+2*ww+2*hh};
  var m = {u: 10*ww, v:0+2*ww+2*hh};
  var x = {u: 9*ww, v: hh+2*ww+2*hh};

	// PZ
  vertices.push(-WW/2,HH/2,DD/2, -WW/2,-HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,HH/2,DD/2 ); // 0,3,2,1
  indices.push(0,1,2, 0,2,3);
	uvs.push (e.u/UU,e.v/VV, j.u/UU,j.v/VV, k.u/UU,k.v/VV, f.u/UU,f.v/VV); // e,j,k,f

	// PX
  vertices.push(WW/2,HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,-HH/2,-DD/2, WW/2,HH/2,-DD/2 ); // 1,2,6,5
  indices.push (4,5,6, 4,6,7); // [0,1,2, 0,2,3] + 4
	uvs.push (f.u/UU,f.v/VV, k.u/UU,k.v/VV, l.u/UU,l.v/VV, g.u/UU,g.v/VV); // f,k,l,g
	
	// NX
  vertices.push(-WW/2,HH/2,-DD/2, -WW/2,-HH/2,-DD/2, -WW/2,-HH/2,DD/2, -WW/2,HH/2,DD/2 ); // 4,7,3,0
  indices.push (8,9,10, 8,10,11); // [0,1,2, 0,2,3] + 8
	uvs.push (d.u/UU,d.v/VV, i.u/UU,i.v/VV, j.u/UU,j.v/VV, e.u/UU,e.v/VV); // d,i,j,e

	// NZ
  vertices.push(WW/2,HH/2,-DD/2, WW/2,-HH/2,-DD/2, -WW/2,-HH/2,-DD/2, -WW/2,HH/2,-DD/2 ); // 5,6,7,4
  indices.push (12,13,14, 12,14,15); // [0,1,2, 0,2,3] + 12
	uvs.push (g.u/UU,g.v/VV, l.u/UU,l.v/VV, m.u/UU,m.v/VV, h.u/UU,h.v/VV); // g,l,m,h
	//PY
  vertices.push(-WW/2,HH/2,-DD/2, -WW/2,HH/2,DD/2, WW/2,HH/2,DD/2, WW/2,HH/2,-DD/2 );  // 4 0 1 5
  indices.push (16,17,18, 16,18,19); // [0,1,2, 0,2,3] + 16
	uvs.push (a.u/UU,a.v/VV, e.u/UU,e.v/VV, f.u/UU,f.v/VV, b.u/UU,b.v/VV); // a,e,f,b
	//NY
  vertices.push(-WW/2,-HH/2,-DD/2, -WW/2,-HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,-HH/2,-DD/2 );  // 7 3 2 6
  indices.push (20,21,22, 20,22,23); // [0,1,2, 0,2,3] + 20
	uvs.push (b.u/UU,b.v/VV, f.u/UU,f.v/VV, g.u/UU,g.v/VV, c.u/UU,c.v/VV); // b,f,g,c

	geometry.setIndex(indices);  
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));	
	
  let body = new THREE.Mesh (geometry, new THREE.MeshBasicMaterial({map: texture, transparent: true, side:THREE.DoubleSide}));
	return body;
}

function buildBodyArmor(WW, HH, DD, texture) {
 
	var geometry = new THREE.BufferGeometry();	
  var vertices = [];
  var indices = [];
	var uvs = [];

  const ww = 1;
  const hh = 3;
	const UU = 16*ww;
  const VV = 3*hh + 7*ww;
  
  var a = {u: 5*ww, v:hh+ww+ww+hh};
  var b = {u: 7*ww, v:hh+ww+ww+hh};
  var c = {u: 9*ww, v:hh+ww+ww+hh};
  var d = {u: 4*ww, v:hh+ww+hh};
  var e = {u: 5*ww, v:hh+ww+hh};
  var f = {u: 7*ww, v:hh+ww+hh};
  var g = {u: 8*ww, v:hh+ww+hh};
  var h = {u: 10*ww, v:hh+ww+hh};
  var i = {u: 4*ww, v:0+ww+hh};
  var j = {u: 5*ww, v:0+ww+hh};
  var k = {u: 7*ww, v:0+ww+hh};
  var l = {u: 8*ww, v:0+ww+hh};
  var m = {u: 10*ww, v:0+ww+hh};
  var x = {u: 9*ww, v: hh+ww+hh};

	// PZ
  vertices.push(-WW/2,HH/2,DD/2, -WW/2,-HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,HH/2,DD/2 ); // 0,3,2,1
  indices.push(0,1,2, 0,2,3);
	uvs.push (e.u/UU,e.v/VV, j.u/UU,j.v/VV, k.u/UU,k.v/VV, f.u/UU,f.v/VV); // e,j,k,f

	// PX
  vertices.push(WW/2,HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,-HH/2,-DD/2, WW/2,HH/2,-DD/2 ); // 1,2,6,5
  indices.push (4,5,6, 4,6,7); // [0,1,2, 0,2,3] + 4
	uvs.push (f.u/UU,f.v/VV, k.u/UU,k.v/VV, l.u/UU,l.v/VV, g.u/UU,g.v/VV); // f,k,l,g
	
	// NX
  vertices.push(-WW/2,HH/2,-DD/2, -WW/2,-HH/2,-DD/2, -WW/2,-HH/2,DD/2, -WW/2,HH/2,DD/2 ); // 4,7,3,0
  indices.push (8,9,10, 8,10,11); // [0,1,2, 0,2,3] + 8
	uvs.push (d.u/UU,d.v/VV, i.u/UU,i.v/VV, j.u/UU,j.v/VV, e.u/UU,e.v/VV); // d,i,j,e

	// NZ
  vertices.push(WW/2,HH/2,-DD/2, WW/2,-HH/2,-DD/2, -WW/2,-HH/2,-DD/2, -WW/2,HH/2,-DD/2 ); // 5,6,7,4
  indices.push (12,13,14, 12,14,15); // [0,1,2, 0,2,3] + 12
	uvs.push (g.u/UU,g.v/VV, l.u/UU,l.v/VV, m.u/UU,m.v/VV, h.u/UU,h.v/VV); // g,l,m,h
	//PY
  vertices.push(-WW/2,HH/2,-DD/2, -WW/2,HH/2,DD/2, WW/2,HH/2,DD/2, WW/2,HH/2,-DD/2 );  // 4 0 1 5
  indices.push (16,17,18, 16,18,19); // [0,1,2, 0,2,3] + 16
	uvs.push (a.u/UU,a.v/VV, e.u/UU,e.v/VV, f.u/UU,f.v/VV, b.u/UU,b.v/VV); // a,e,f,b
	//NY
  vertices.push(-WW/2,-HH/2,-DD/2, -WW/2,-HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,-HH/2,-DD/2 );  // 7 3 2 6
  indices.push (20,21,22, 20,22,23); // [0,1,2, 0,2,3] + 20
	uvs.push (b.u/UU,b.v/VV, f.u/UU,f.v/VV, g.u/UU,g.v/VV, c.u/UU,c.v/VV); // b,f,g,c

	geometry.setIndex(indices);  
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));	
	
  let body = new THREE.Mesh (geometry, new THREE.MeshBasicMaterial({map: texture, transparent: true, side:THREE.DoubleSide}));
	return body;
}

function buildArm1(WW, HH, DD, texture) {

  var geometry = new THREE.BufferGeometry();	
  var vertices = [];
  var indices = [];
  var uvs = [];
  const ww = 1;
  const hh = 3;
  const UU = 16*ww;
  const VV = 3*hh + 7*ww;
  
  var a = {u: ww+10*ww, v: hh+ww+(2*ww+2*hh)};
  var b = {u: 2*ww+10*ww, v: hh+ww+(2*ww+2*hh)};
  var c = {u: 3*ww+10*ww, v: hh+ww+(2*ww+2*hh)};
  var d = {u: 0+10*ww, v: hh+(2*ww+2*hh)};
  var e = {u: ww+10*ww, v: hh+(2*ww+2*hh)};
  var f = {u: 2*ww+10*ww, v: hh+(2*ww+2*hh)};
  var g = {u: 3*ww+10*ww, v: hh+(2*ww+2*hh)};
  var h = {u: 4*ww+10*ww, v: hh+(2*ww+2*hh)};
  var i = {u: 0+10*ww, v: (2*ww+2*hh)};
  var j = {u: ww+10*ww, v: (2*ww+2*hh)};
  var k = {u: 2*ww+10*ww, v: (2*ww+2*hh)};
  var l = {u: 3*ww+10*ww, v: (2*ww+2*hh)};
  var m = {u: 4*ww+10*ww, v: (2*ww+2*hh)};

  // PZ
  vertices.push(-WW/2,HH/2,DD/2, -WW/2,-HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,HH/2,DD/2 ); // 0,3,2,1
  indices.push(0,1,2, 0,2,3);
	uvs.push (e.u/UU,e.v/VV, j.u/UU,j.v/VV, k.u/UU,k.v/VV, f.u/UU,f.v/VV); // e,j,k,f

	// PX
  vertices.push(WW/2,HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,-HH/2,-DD/2, WW/2,HH/2,-DD/2 ); // 1,2,6,5
  indices.push (4,5,6, 4,6,7); // [0,1,2, 0,2,3] + 4
	uvs.push (f.u/UU,f.v/VV, k.u/UU,k.v/VV, l.u/UU,l.v/VV, g.u/UU,g.v/VV); // f,k,l,g
	
	// NX
  vertices.push(-WW/2,HH/2,-DD/2, -WW/2,-HH/2,-DD/2, -WW/2,-HH/2,DD/2, -WW/2,HH/2,DD/2 ); // 4,7,3,0
  indices.push (8,9,10, 8,10,11); // [0,1,2, 0,2,3] + 8
	uvs.push (d.u/UU,d.v/VV, i.u/UU,i.v/VV, j.u/UU,j.v/VV, e.u/UU,e.v/VV); // d,i,j,e

	// NZ
  vertices.push(WW/2,HH/2,-DD/2, WW/2,-HH/2,-DD/2, -WW/2,-HH/2,-DD/2, -WW/2,HH/2,-DD/2 ); // 5,6,7,4
  indices.push (12,13,14, 12,14,15); // [0,1,2, 0,2,3] + 12
	uvs.push (g.u/UU,g.v/VV, l.u/UU,l.v/VV, m.u/UU,m.v/VV, h.u/UU,h.v/VV); // g,l,m,h
	//PY
  vertices.push(-WW/2,HH/2,-DD/2, -WW/2,HH/2,DD/2, WW/2,HH/2,DD/2, WW/2,HH/2,-DD/2 );  // 4 0 1 5
  indices.push (16,17,18, 16,18,19); // [0,1,2, 0,2,3] + 16
	uvs.push (a.u/UU,a.v/VV, e.u/UU,e.v/VV, f.u/UU,f.v/VV, b.u/UU,b.v/VV); // a,e,f,b
	//NY
  vertices.push(-WW/2,-HH/2,-DD/2, -WW/2,-HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,-HH/2,-DD/2 );  // 7 3 2 6
  indices.push (20,21,22, 20,22,23); // [0,1,2, 0,2,3] + 20
	uvs.push (b.u/UU,b.v/VV, f.u/UU,f.v/VV, g.u/UU,g.v/VV, c.u/UU,c.v/VV); // b,f,g,c

	geometry.setIndex(indices);  
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));	
	
  let head = new THREE.Mesh (geometry, new THREE.MeshBasicMaterial({map: texture, transparent: false, side:THREE.DoubleSide}));
	return head;
}

function buildArm1Armor(WW, HH, DD, texture) {

  var geometry = new THREE.BufferGeometry();	
  var vertices = [];
  var indices = [];
  var uvs = [];
  const ww = 1;
  const hh = 3;
  const UU = 16*ww;
  const VV = 3*hh + 7*ww;
  
  var a = {u: ww+10*ww, v: hh+ww+(ww+hh)};
  var b = {u: 2*ww+10*ww, v: hh+ww+(ww+hh)};
  var c = {u: 3*ww+10*ww, v: hh+ww+(ww+hh)};
  var d = {u: 0+10*ww, v: hh+(ww+hh)};
  var e = {u: ww+10*ww, v: hh+(ww+hh)};
  var f = {u: 2*ww+10*ww, v: hh+(ww+hh)};
  var g = {u: 3*ww+10*ww, v: hh+(ww+hh)};
  var h = {u: 4*ww+10*ww, v: hh+(ww+hh)};
  var i = {u: 0+10*ww, v: (ww+hh)};
  var j = {u: ww+10*ww, v: (ww+hh)};
  var k = {u: 2*ww+10*ww, v: (ww+hh)};
  var l = {u: 3*ww+10*ww, v: (ww+hh)};
  var m = {u: 4*ww+10*ww, v: (ww+hh)};

  // PZ
  vertices.push(-WW/2,HH/2,DD/2, -WW/2,-HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,HH/2,DD/2 ); // 0,3,2,1
  indices.push(0,1,2, 0,2,3);
	uvs.push (e.u/UU,e.v/VV, j.u/UU,j.v/VV, k.u/UU,k.v/VV, f.u/UU,f.v/VV); // e,j,k,f

	// PX
  vertices.push(WW/2,HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,-HH/2,-DD/2, WW/2,HH/2,-DD/2 ); // 1,2,6,5
  indices.push (4,5,6, 4,6,7); // [0,1,2, 0,2,3] + 4
	uvs.push (f.u/UU,f.v/VV, k.u/UU,k.v/VV, l.u/UU,l.v/VV, g.u/UU,g.v/VV); // f,k,l,g
	
	// NX
  vertices.push(-WW/2,HH/2,-DD/2, -WW/2,-HH/2,-DD/2, -WW/2,-HH/2,DD/2, -WW/2,HH/2,DD/2 ); // 4,7,3,0
  indices.push (8,9,10, 8,10,11); // [0,1,2, 0,2,3] + 8
	uvs.push (d.u/UU,d.v/VV, i.u/UU,i.v/VV, j.u/UU,j.v/VV, e.u/UU,e.v/VV); // d,i,j,e

	// NZ
  vertices.push(WW/2,HH/2,-DD/2, WW/2,-HH/2,-DD/2, -WW/2,-HH/2,-DD/2, -WW/2,HH/2,-DD/2 ); // 5,6,7,4
  indices.push (12,13,14, 12,14,15); // [0,1,2, 0,2,3] + 12
	uvs.push (g.u/UU,g.v/VV, l.u/UU,l.v/VV, m.u/UU,m.v/VV, h.u/UU,h.v/VV); // g,l,m,h
	//PY
  vertices.push(-WW/2,HH/2,-DD/2, -WW/2,HH/2,DD/2, WW/2,HH/2,DD/2, WW/2,HH/2,-DD/2 );  // 4 0 1 5
  indices.push (16,17,18, 16,18,19); // [0,1,2, 0,2,3] + 16
	uvs.push (a.u/UU,a.v/VV, e.u/UU,e.v/VV, f.u/UU,f.v/VV, b.u/UU,b.v/VV); // a,e,f,b
	//NY
  vertices.push(-WW/2,-HH/2,-DD/2, -WW/2,-HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,-HH/2,-DD/2 );  // 7 3 2 6
  indices.push (20,21,22, 20,22,23); // [0,1,2, 0,2,3] + 20
	uvs.push (b.u/UU,b.v/VV, f.u/UU,f.v/VV, g.u/UU,g.v/VV, c.u/UU,c.v/VV); // b,f,g,c

	geometry.setIndex(indices);  
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));	
	
  let head = new THREE.Mesh (geometry, new THREE.MeshBasicMaterial({map: texture, transparent: true, side:THREE.DoubleSide}));
	return head;
}

function buildArm2(WW, HH, DD, texture) {

  var geometry = new THREE.BufferGeometry();	
  var vertices = [];
  var indices = [];
  var uvs = [];
  const ww = 1;
  const hh = 3;
  const UU = 16*ww;
  const VV = 3*hh + 7*ww;
  
  var a = {u: ww+8*ww, v: hh+ww};
  var b = {u: 2*ww+8*ww, v: hh+ww};
  var c = {u: 3*ww+8*ww, v: hh+ww};
  var d = {u: 0+8*ww, v: hh};
  var e = {u: ww+8*ww, v: hh};
  var f = {u: 2*ww+8*ww, v: hh};
  var g = {u: 3*ww+8*ww, v: hh};
  var h = {u: 4*ww+8*ww, v: hh};
  var i = {u: 0+8*ww, v: 0};
  var j = {u: ww+8*ww, v: 0};
  var k = {u: 2*ww+8*ww, v: 0};
  var l = {u: 3*ww+8*ww, v: 0};
  var m = {u: 4*ww+8*ww, v: 0};

  // PZ
  vertices.push(-WW/2,HH/2,DD/2, -WW/2,-HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,HH/2,DD/2 ); // 0,3,2,1
  indices.push(0,1,2, 0,2,3);
	uvs.push (e.u/UU,e.v/VV, j.u/UU,j.v/VV, k.u/UU,k.v/VV, f.u/UU,f.v/VV); // e,j,k,f

	// PX
  vertices.push(WW/2,HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,-HH/2,-DD/2, WW/2,HH/2,-DD/2 ); // 1,2,6,5
  indices.push (4,5,6, 4,6,7); // [0,1,2, 0,2,3] + 4
	uvs.push (f.u/UU,f.v/VV, k.u/UU,k.v/VV, l.u/UU,l.v/VV, g.u/UU,g.v/VV); // f,k,l,g
	
	// NX
  vertices.push(-WW/2,HH/2,-DD/2, -WW/2,-HH/2,-DD/2, -WW/2,-HH/2,DD/2, -WW/2,HH/2,DD/2 ); // 4,7,3,0
  indices.push (8,9,10, 8,10,11); // [0,1,2, 0,2,3] + 8
	uvs.push (d.u/UU,d.v/VV, i.u/UU,i.v/VV, j.u/UU,j.v/VV, e.u/UU,e.v/VV); // d,i,j,e

	// NZ
  vertices.push(WW/2,HH/2,-DD/2, WW/2,-HH/2,-DD/2, -WW/2,-HH/2,-DD/2, -WW/2,HH/2,-DD/2 ); // 5,6,7,4
  indices.push (12,13,14, 12,14,15); // [0,1,2, 0,2,3] + 12
	uvs.push (g.u/UU,g.v/VV, l.u/UU,l.v/VV, m.u/UU,m.v/VV, h.u/UU,h.v/VV); // g,l,m,h
	//PY
  vertices.push(-WW/2,HH/2,-DD/2, -WW/2,HH/2,DD/2, WW/2,HH/2,DD/2, WW/2,HH/2,-DD/2 );  // 4 0 1 5
  indices.push (16,17,18, 16,18,19); // [0,1,2, 0,2,3] + 16
	uvs.push (a.u/UU,a.v/VV, e.u/UU,e.v/VV, f.u/UU,f.v/VV, b.u/UU,b.v/VV); // a,e,f,b
	//NY
  vertices.push(-WW/2,-HH/2,-DD/2, -WW/2,-HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,-HH/2,-DD/2 );  // 7 3 2 6
  indices.push (20,21,22, 20,22,23); // [0,1,2, 0,2,3] + 20
	uvs.push (b.u/UU,b.v/VV, f.u/UU,f.v/VV, g.u/UU,g.v/VV, c.u/UU,c.v/VV); // b,f,g,c

	geometry.setIndex(indices);  
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));	
	
  let head = new THREE.Mesh (geometry, new THREE.MeshBasicMaterial({map: texture, transparent: true, side:THREE.DoubleSide}));
	return head;
}

function buildArm2Armor(WW, HH, DD, texture) {

  var geometry = new THREE.BufferGeometry();	
  var vertices = [];
  var indices = [];
  var uvs = [];
  const ww = 1;
  const hh = 3;
  const UU = 16*ww;
  const VV = 3*hh + 7*ww;
  
  var a = {u: ww+12*ww, v: hh+ww};
  var b = {u: 2*ww+12*ww, v: hh+ww};
  var c = {u: 3*ww+12*ww, v: hh+ww};
  var d = {u: 0+12*ww, v: hh};
  var e = {u: ww+12*ww, v: hh};
  var f = {u: 2*ww+12*ww, v: hh};
  var g = {u: 3*ww+12*ww, v: hh};
  var h = {u: 4*ww+12*ww, v: hh};
  var i = {u: 0+12*ww, v: 0};
  var j = {u: ww+12*ww, v: 0};
  var k = {u: 2*ww+12*ww, v: 0};
  var l = {u: 3*ww+12*ww, v: 0};
  var m = {u: 4*ww+12*ww, v: 0};

  // PZ
  vertices.push(-WW/2,HH/2,DD/2, -WW/2,-HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,HH/2,DD/2 ); // 0,3,2,1
  indices.push(0,1,2, 0,2,3);
	uvs.push (e.u/UU,e.v/VV, j.u/UU,j.v/VV, k.u/UU,k.v/VV, f.u/UU,f.v/VV); // e,j,k,f

	// PX
  vertices.push(WW/2,HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,-HH/2,-DD/2, WW/2,HH/2,-DD/2 ); // 1,2,6,5
  indices.push (4,5,6, 4,6,7); // [0,1,2, 0,2,3] + 4
	uvs.push (f.u/UU,f.v/VV, k.u/UU,k.v/VV, l.u/UU,l.v/VV, g.u/UU,g.v/VV); // f,k,l,g
	
	// NX
  vertices.push(-WW/2,HH/2,-DD/2, -WW/2,-HH/2,-DD/2, -WW/2,-HH/2,DD/2, -WW/2,HH/2,DD/2 ); // 4,7,3,0
  indices.push (8,9,10, 8,10,11); // [0,1,2, 0,2,3] + 8
	uvs.push (d.u/UU,d.v/VV, i.u/UU,i.v/VV, j.u/UU,j.v/VV, e.u/UU,e.v/VV); // d,i,j,e

	// NZ
  vertices.push(WW/2,HH/2,-DD/2, WW/2,-HH/2,-DD/2, -WW/2,-HH/2,-DD/2, -WW/2,HH/2,-DD/2 ); // 5,6,7,4
  indices.push (12,13,14, 12,14,15); // [0,1,2, 0,2,3] + 12
	uvs.push (g.u/UU,g.v/VV, l.u/UU,l.v/VV, m.u/UU,m.v/VV, h.u/UU,h.v/VV); // g,l,m,h
	//PY
  vertices.push(-WW/2,HH/2,-DD/2, -WW/2,HH/2,DD/2, WW/2,HH/2,DD/2, WW/2,HH/2,-DD/2 );  // 4 0 1 5
  indices.push (16,17,18, 16,18,19); // [0,1,2, 0,2,3] + 16
	uvs.push (a.u/UU,a.v/VV, e.u/UU,e.v/VV, f.u/UU,f.v/VV, b.u/UU,b.v/VV); // a,e,f,b
	//NY
  vertices.push(-WW/2,-HH/2,-DD/2, -WW/2,-HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,-HH/2,-DD/2 );  // 7 3 2 6
  indices.push (20,21,22, 20,22,23); // [0,1,2, 0,2,3] + 20
	uvs.push (b.u/UU,b.v/VV, f.u/UU,f.v/VV, g.u/UU,g.v/VV, c.u/UU,c.v/VV); // b,f,g,c

	geometry.setIndex(indices);  
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));	
	
  let head = new THREE.Mesh (geometry, new THREE.MeshBasicMaterial({map: texture, transparent: true, side:THREE.DoubleSide}));
	return head;
}

function buildLeg1(WW, HH, DD, texture) {

  var geometry = new THREE.BufferGeometry();	
  var vertices = [];
  var indices = [];
  var uvs = [];
  const ww = 1;
  const hh = 3;
  const UU = 16*ww;
  const VV = 3*hh + 7*ww;
  
  var a = {u: ww, v: hh+ww+(2*ww+2*hh)};
  var b = {u: 2*ww, v: hh+ww+(2*ww+2*hh)};
  var c = {u: 3*ww, v: hh+ww+(2*ww+2*hh)};
  var d = {u: 0, v: hh+(2*ww+2*hh)};
  var e = {u: ww, v: hh+(2*ww+2*hh)};
  var f = {u: 2*ww, v: hh+(2*ww+2*hh)};
  var g = {u: 3*ww, v: hh+(2*ww+2*hh)};
  var h = {u: 4*ww, v: hh+(2*ww+2*hh)};
  var i = {u: 0, v: (2*ww+2*hh)};
  var j = {u: ww, v: (2*ww+2*hh)};
  var k = {u: 2*ww, v: (2*ww+2*hh)};
  var l = {u: 3*ww, v: (2*ww+2*hh)};
  var m = {u: 4*ww, v: (2*ww+2*hh)};

  // PZ
  vertices.push(-WW/2,HH/2,DD/2, -WW/2,-HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,HH/2,DD/2 ); // 0,3,2,1
  indices.push(0,1,2, 0,2,3);
	uvs.push (e.u/UU,e.v/VV, j.u/UU,j.v/VV, k.u/UU,k.v/VV, f.u/UU,f.v/VV); // e,j,k,f

	// PX
  vertices.push(WW/2,HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,-HH/2,-DD/2, WW/2,HH/2,-DD/2 ); // 1,2,6,5
  indices.push (4,5,6, 4,6,7); // [0,1,2, 0,2,3] + 4
	uvs.push (f.u/UU,f.v/VV, k.u/UU,k.v/VV, l.u/UU,l.v/VV, g.u/UU,g.v/VV); // f,k,l,g
	
	// NX
  vertices.push(-WW/2,HH/2,-DD/2, -WW/2,-HH/2,-DD/2, -WW/2,-HH/2,DD/2, -WW/2,HH/2,DD/2 ); // 4,7,3,0
  indices.push (8,9,10, 8,10,11); // [0,1,2, 0,2,3] + 8
	uvs.push (d.u/UU,d.v/VV, i.u/UU,i.v/VV, j.u/UU,j.v/VV, e.u/UU,e.v/VV); // d,i,j,e

	// NZ
  vertices.push(WW/2,HH/2,-DD/2, WW/2,-HH/2,-DD/2, -WW/2,-HH/2,-DD/2, -WW/2,HH/2,-DD/2 ); // 5,6,7,4
  indices.push (12,13,14, 12,14,15); // [0,1,2, 0,2,3] + 12
	uvs.push (g.u/UU,g.v/VV, l.u/UU,l.v/VV, m.u/UU,m.v/VV, h.u/UU,h.v/VV); // g,l,m,h
	//PY
  vertices.push(-WW/2,HH/2,-DD/2, -WW/2,HH/2,DD/2, WW/2,HH/2,DD/2, WW/2,HH/2,-DD/2 );  // 4 0 1 5
  indices.push (16,17,18, 16,18,19); // [0,1,2, 0,2,3] + 16
	uvs.push (a.u/UU,a.v/VV, e.u/UU,e.v/VV, f.u/UU,f.v/VV, b.u/UU,b.v/VV); // a,e,f,b
	//NY
  vertices.push(-WW/2,-HH/2,-DD/2, -WW/2,-HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,-HH/2,-DD/2 );  // 7 3 2 6
  indices.push (20,21,22, 20,22,23); // [0,1,2, 0,2,3] + 20
	uvs.push (b.u/UU,b.v/VV, f.u/UU,f.v/VV, g.u/UU,g.v/VV, c.u/UU,c.v/VV); // b,f,g,c

	geometry.setIndex(indices);  
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));	
	
  let head = new THREE.Mesh (geometry, new THREE.MeshBasicMaterial({map: texture, transparent: true, side:THREE.DoubleSide}));
	return head;
}

function buildLeg2(WW, HH, DD, texture) {

  var geometry = new THREE.BufferGeometry();	
  var vertices = [];
  var indices = [];
  var uvs = [];
  const ww = 1;
  const hh = 3;
  const UU = 16*ww;
  const VV = 3*hh + 7*ww;
  
  var a = {u: ww+4*ww, v: hh+ww};
  var b = {u: 2*ww+4*ww, v: hh+ww};
  var c = {u: 3*ww+4*ww, v: hh+ww};
  var d = {u: 0+4*ww, v: hh};
  var e = {u: ww+4*ww, v: hh};
  var f = {u: 2*ww+4*ww, v: hh};
  var g = {u: 3*ww+4*ww, v: hh};
  var h = {u: 4*ww+4*ww, v: hh};
  var i = {u: 0+4*ww, v: 0};
  var j = {u: ww+4*ww, v: 0};
  var k = {u: 2*ww+4*ww, v: 0};
  var l = {u: 3*ww+4*ww, v: 0};
  var m = {u: 4*ww+4*ww, v: 0};

  // PZ
  vertices.push(-WW/2,HH/2,DD/2, -WW/2,-HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,HH/2,DD/2 ); // 0,3,2,1
  indices.push(0,1,2, 0,2,3);
	uvs.push (e.u/UU,e.v/VV, j.u/UU,j.v/VV, k.u/UU,k.v/VV, f.u/UU,f.v/VV); // e,j,k,f

	// PX
  vertices.push(WW/2,HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,-HH/2,-DD/2, WW/2,HH/2,-DD/2 ); // 1,2,6,5
  indices.push (4,5,6, 4,6,7); // [0,1,2, 0,2,3] + 4
	uvs.push (f.u/UU,f.v/VV, k.u/UU,k.v/VV, l.u/UU,l.v/VV, g.u/UU,g.v/VV); // f,k,l,g
	
	// NX
  vertices.push(-WW/2,HH/2,-DD/2, -WW/2,-HH/2,-DD/2, -WW/2,-HH/2,DD/2, -WW/2,HH/2,DD/2 ); // 4,7,3,0
  indices.push (8,9,10, 8,10,11); // [0,1,2, 0,2,3] + 8
	uvs.push (d.u/UU,d.v/VV, i.u/UU,i.v/VV, j.u/UU,j.v/VV, e.u/UU,e.v/VV); // d,i,j,e

	// NZ
  vertices.push(WW/2,HH/2,-DD/2, WW/2,-HH/2,-DD/2, -WW/2,-HH/2,-DD/2, -WW/2,HH/2,-DD/2 ); // 5,6,7,4
  indices.push (12,13,14, 12,14,15); // [0,1,2, 0,2,3] + 12
	uvs.push (g.u/UU,g.v/VV, l.u/UU,l.v/VV, m.u/UU,m.v/VV, h.u/UU,h.v/VV); // g,l,m,h
	//PY
  vertices.push(-WW/2,HH/2,-DD/2, -WW/2,HH/2,DD/2, WW/2,HH/2,DD/2, WW/2,HH/2,-DD/2 );  // 4 0 1 5
  indices.push (16,17,18, 16,18,19); // [0,1,2, 0,2,3] + 16
	uvs.push (a.u/UU,a.v/VV, e.u/UU,e.v/VV, f.u/UU,f.v/VV, b.u/UU,b.v/VV); // a,e,f,b
	//NY
  vertices.push(-WW/2,-HH/2,-DD/2, -WW/2,-HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,-HH/2,-DD/2 );  // 7 3 2 6
  indices.push (20,21,22, 20,22,23); // [0,1,2, 0,2,3] + 20
	uvs.push (b.u/UU,b.v/VV, f.u/UU,f.v/VV, g.u/UU,g.v/VV, c.u/UU,c.v/VV); // b,f,g,c

	geometry.setIndex(indices);  
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));	
	
  let head = new THREE.Mesh (geometry, new THREE.MeshBasicMaterial({map: texture, transparent: true, side:THREE.DoubleSide}));
	return head;
}

function buildLeg1Armor(WW, HH, DD, texture) { //右腿

  var geometry = new THREE.BufferGeometry();	
  var vertices = [];
  var indices = [];
  var uvs = [];
  const ww = 1;
  const hh = 3;
  const UU = 16*ww;
  const VV = 3*hh + 7*ww;
  
  var a = {u: ww, v: hh+ww+(ww+hh)};
  var b = {u: 2*ww, v: hh+ww+(ww+hh)};
  var c = {u: 3*ww, v: hh+ww+(ww+hh)};
  var d = {u: 0, v: hh+(ww+hh)};
  var e = {u: ww, v: hh+(ww+hh)};
  var f = {u: 2*ww, v: hh+(ww+hh)};
  var g = {u: 3*ww, v: hh+(ww+hh)};
  var h = {u: 4*ww, v: hh+(ww+hh)};
  var i = {u: 0, v: (ww+hh)};
  var j = {u: ww, v: (ww+hh)};
  var k = {u: 2*ww, v: (ww+hh)};
  var l = {u: 3*ww, v: (ww+hh)};
  var m = {u: 4*ww, v: (ww+hh)};

  // PZ
  vertices.push(-WW/2,HH/2,DD/2, -WW/2,-HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,HH/2,DD/2 ); // 0,3,2,1
  indices.push(0,1,2, 0,2,3);
	uvs.push (e.u/UU,e.v/VV, j.u/UU,j.v/VV, k.u/UU,k.v/VV, f.u/UU,f.v/VV); // e,j,k,f

	// PX
  vertices.push(WW/2,HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,-HH/2,-DD/2, WW/2,HH/2,-DD/2 ); // 1,2,6,5
  indices.push (4,5,6, 4,6,7); // [0,1,2, 0,2,3] + 4
	uvs.push (f.u/UU,f.v/VV, k.u/UU,k.v/VV, l.u/UU,l.v/VV, g.u/UU,g.v/VV); // f,k,l,g
	
	// NX
  vertices.push(-WW/2,HH/2,-DD/2, -WW/2,-HH/2,-DD/2, -WW/2,-HH/2,DD/2, -WW/2,HH/2,DD/2 ); // 4,7,3,0
  indices.push (8,9,10, 8,10,11); // [0,1,2, 0,2,3] + 8
	uvs.push (d.u/UU,d.v/VV, i.u/UU,i.v/VV, j.u/UU,j.v/VV, e.u/UU,e.v/VV); // d,i,j,e

	// NZ
  vertices.push(WW/2,HH/2,-DD/2, WW/2,-HH/2,-DD/2, -WW/2,-HH/2,-DD/2, -WW/2,HH/2,-DD/2 ); // 5,6,7,4
  indices.push (12,13,14, 12,14,15); // [0,1,2, 0,2,3] + 12
	uvs.push (g.u/UU,g.v/VV, l.u/UU,l.v/VV, m.u/UU,m.v/VV, h.u/UU,h.v/VV); // g,l,m,h
	//PY
  vertices.push(-WW/2,HH/2,-DD/2, -WW/2,HH/2,DD/2, WW/2,HH/2,DD/2, WW/2,HH/2,-DD/2 );  // 4 0 1 5
  indices.push (16,17,18, 16,18,19); // [0,1,2, 0,2,3] + 16
	uvs.push (a.u/UU,a.v/VV, e.u/UU,e.v/VV, f.u/UU,f.v/VV, b.u/UU,b.v/VV); // a,e,f,b
	//NY
  vertices.push(-WW/2,-HH/2,-DD/2, -WW/2,-HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,-HH/2,-DD/2 );  // 7 3 2 6
  indices.push (20,21,22, 20,22,23); // [0,1,2, 0,2,3] + 20
	uvs.push (b.u/UU,b.v/VV, f.u/UU,f.v/VV, g.u/UU,g.v/VV, c.u/UU,c.v/VV); // b,f,g,c

	geometry.setIndex(indices);  
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));	
	
  let head = new THREE.Mesh (geometry, new THREE.MeshBasicMaterial({map: texture, transparent: true, side:THREE.DoubleSide}));
	return head;
}

function buildLeg2Armor(WW, HH, DD, texture) { //左腿

  var geometry = new THREE.BufferGeometry();	
  var vertices = [];
  var indices = [];
  var uvs = [];
  const ww = 1;
  const hh = 3;
  const UU = 16*ww;
  const VV = 3*hh + 7*ww;
  
  var a = {u: ww, v: hh+ww};
  var b = {u: 2*ww, v: hh+ww};
  var c = {u: 3*ww, v: hh+ww};
  var d = {u: 0, v: hh};
  var e = {u: ww, v: hh};
  var f = {u: 2*ww, v: hh};
  var g = {u: 3*ww, v: hh};
  var h = {u: 4*ww, v: hh};
  var i = {u: 0, v: 0};
  var j = {u: ww, v: 0};
  var k = {u: 2*ww, v: 0};
  var l = {u: 3*ww, v: 0};
  var m = {u: 4*ww, v: 0};

  // PZ
  vertices.push(-WW/2,HH/2,DD/2, -WW/2,-HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,HH/2,DD/2 ); // 0,3,2,1
  indices.push(0,1,2, 0,2,3);
	uvs.push (e.u/UU,e.v/VV, j.u/UU,j.v/VV, k.u/UU,k.v/VV, f.u/UU,f.v/VV); // e,j,k,f

	// PX
  vertices.push(WW/2,HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,-HH/2,-DD/2, WW/2,HH/2,-DD/2 ); // 1,2,6,5
  indices.push (4,5,6, 4,6,7); // [0,1,2, 0,2,3] + 4
	uvs.push (f.u/UU,f.v/VV, k.u/UU,k.v/VV, l.u/UU,l.v/VV, g.u/UU,g.v/VV); // f,k,l,g
	
	// NX
  vertices.push(-WW/2,HH/2,-DD/2, -WW/2,-HH/2,-DD/2, -WW/2,-HH/2,DD/2, -WW/2,HH/2,DD/2 ); // 4,7,3,0
  indices.push (8,9,10, 8,10,11); // [0,1,2, 0,2,3] + 8
	uvs.push (d.u/UU,d.v/VV, i.u/UU,i.v/VV, j.u/UU,j.v/VV, e.u/UU,e.v/VV); // d,i,j,e

	// NZ
  vertices.push(WW/2,HH/2,-DD/2, WW/2,-HH/2,-DD/2, -WW/2,-HH/2,-DD/2, -WW/2,HH/2,-DD/2 ); // 5,6,7,4
  indices.push (12,13,14, 12,14,15); // [0,1,2, 0,2,3] + 12
	uvs.push (g.u/UU,g.v/VV, l.u/UU,l.v/VV, m.u/UU,m.v/VV, h.u/UU,h.v/VV); // g,l,m,h
	//PY
  vertices.push(-WW/2,HH/2,-DD/2, -WW/2,HH/2,DD/2, WW/2,HH/2,DD/2, WW/2,HH/2,-DD/2 );  // 4 0 1 5
  indices.push (16,17,18, 16,18,19); // [0,1,2, 0,2,3] + 16
	uvs.push (a.u/UU,a.v/VV, e.u/UU,e.v/VV, f.u/UU,f.v/VV, b.u/UU,b.v/VV); // a,e,f,b
	//NY
  vertices.push(-WW/2,-HH/2,-DD/2, -WW/2,-HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,-HH/2,-DD/2 );  // 7 3 2 6
  indices.push (20,21,22, 20,22,23); // [0,1,2, 0,2,3] + 20
	uvs.push (b.u/UU,b.v/VV, f.u/UU,f.v/VV, g.u/UU,g.v/VV, c.u/UU,c.v/VV); // b,f,g,c

	geometry.setIndex(indices);  
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));	
	
  let head = new THREE.Mesh (geometry, new THREE.MeshBasicMaterial({map: texture, transparent: true, side:THREE.DoubleSide}));
	return head;
}

function buildPart(texture) {
  let colorName = 'white'
  let torso = new THREE.Object3D();
  /*let normalMat = new THREE.MeshPhongMaterial({
    color: colorName,
    transparent: true,
    opacity: 0.64
  });*/
  let torsoMesh = buildBody(4,6,2,texture);
  torso.add(torsoMesh)
  torsoMesh.position.y = 9.5
  let upperArm = new THREE.Object3D()
  let upperArmMesh = buildArm1(2,6,2,texture)
  upperArmMesh.position.x = -6
  upperArmMesh.position.y = -3
  upperArm.add(upperArmMesh)
  let upperArmb = new THREE.Object3D()
  let upperArmbMesh = buildArm2(2,6,2,texture)
  upperArmbMesh.position.x = -6
  upperArmbMesh.position.y = -3
  upperArmb.add(upperArmbMesh)
  let leg = new THREE.Object3D()
  let legMesh = buildLeg1(2,6,2,texture)
  leg.add(legMesh)
  legMesh.position.x = -6
  legMesh.position.y = -3
  let legb = new THREE.Object3D()
  let legMeshb = buildLeg2(2,6,2,texture)
  legb.add(legMeshb)
  legMeshb.position.x = -6
  legMeshb.position.y = -3
  let head = new THREE.Object3D()
  let headMesh = buildHead(4,4,4,texture)
  head.add(headMesh)
  
  let headarmor = new THREE.Object3D()
  let headarmorMesh = buildHeadArmor(4.25,4.25,4.25,texture)
  headarmor.add(headarmorMesh)
  let bodyarmor = new THREE.Object3D()
  let bodyarmorMesh = buildBodyArmor(4.25,6.25,2.25,texture)
  bodyarmor.add(bodyarmorMesh)
  let upperArmarmor = new THREE.Object3D()
  let upperArmarmorMesh = buildArm1Armor(2.25,6.25,2.25,texture)
  upperArmarmorMesh.position.x = -6
  upperArmarmorMesh.position.y = -3
  upperArmarmor.add(upperArmarmorMesh)
  let upperArmbarmor = new THREE.Object3D()
  let upperArmbarmorMesh = buildArm2Armor(2.25,6.25,2.25,texture)
  upperArmbarmorMesh.position.x = -6
  upperArmbarmorMesh.position.y = -3
  upperArmbarmor.add(upperArmbarmorMesh)
  let legarmor = new THREE.Object3D()
  let legarmorMesh = buildLeg1Armor(2.25,6.25,2.25,texture)
  legarmor.add(legarmorMesh)
  legarmorMesh.position.x = -6
  legarmorMesh.position.y = -3
  let legbarmor = new THREE.Object3D()
  let legbarmorMesh = buildLeg2Armor(2.25,6.25,2.25,texture)
  legbarmor.add(legbarmorMesh)
  legbarmorMesh.position.x = -6
  legbarmorMesh.position.y = -3

  return [torso, upperArm, upperArmb, leg, legb, head, headarmor, bodyarmor, upperArmarmor, upperArmbarmor, legarmor, legbarmor];
}

function editPart(Mesh){
    scene.add(Mesh[0]); //身體
	Mesh[0].add(Mesh[1]);//右臂
	Mesh[1].position.set(3, 12.5, 0);
	Mesh[0].add(Mesh[2]);//左臂
	Mesh[2].position.set(9, 12.5, 0);
	Mesh[0].add(Mesh[3]);//右腿
	Mesh[3].position.set(5, 6.5, 0);
	Mesh[0].add(Mesh[4]);//左腿
	Mesh[4].position.set(7, 6.5, 0);
	Mesh[0].add(Mesh[5]);//頭
	Mesh[5].position.set(0, 14.5, 0);
	
	Mesh[0].add(Mesh[6]);//頭外殼
	Mesh[6].position.set(0, 14.5, 0);
	Mesh[0].add(Mesh[7]);//身體外殼
	Mesh[7].position.set(0, 9.5, 0);
	Mesh[0].add(Mesh[8]);//右臂外殼
	Mesh[8].position.set(3, 12.5, 0);
	Mesh[0].add(Mesh[9]);//左臂外殼
	Mesh[9].position.set(9, 12.5, 0);
	Mesh[0].add(Mesh[10]);//右腿外殼
	Mesh[10].position.set(5, 6.5, 0);
	Mesh[0].add(Mesh[11]);//左腿外殼
	Mesh[11].position.set(7, 6.5, 0);
	
}

function buildGrass(WW, HH, DD, texture) { 

  var geometry = new THREE.BufferGeometry();	
  var vertices = [];
  var indices = [];
  var uvs = [];
  const ww = 1;
  const hh = 1;
  const UU = 4*ww;
  const VV = 3*hh;
  
  var a = {u: ww, v: 3*hh};
  var b = {u: 2*ww, v: 3*hh};
  var c = {u: 0, v: 2*hh};
  var d = {u: ww, v: 2*hh};
  var e = {u: 2*ww, v: 2*hh};
  var f = {u: 3*ww, v: 2*hh};
  var g = {u: 4*ww, v: 2*hh};
  var h = {u: 0, v: hh};
  var i = {u: ww, v: hh};
  var j = {u: 2*ww, v: hh};
  var k = {u: 3*ww, v: hh};
  var l = {u: 4*ww, v: hh};
  var m = {u: ww, v: 0};
  var n = {u: 2*ww, v: 0};

  // PZ
  vertices.push(-WW/2,HH/2,DD/2, -WW/2,-HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,HH/2,DD/2 ); // 0,3,2,1
  indices.push(0,1,2, 0,2,3);
	uvs.push (d.u/UU,d.v/VV, i.u/UU,i.v/VV, j.u/UU,j.v/VV, e.u/UU,e.v/VV); // d,i,j,e

	// PX
  vertices.push(WW/2,HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,-HH/2,-DD/2, WW/2,HH/2,-DD/2 ); // 1,2,6,5
  indices.push (4,5,6, 4,6,7); // [0,1,2, 0,2,3] + 4
	uvs.push (e.u/UU,e.v/VV, j.u/UU,j.v/VV, k.u/UU,k.v/VV, f.u/UU,f.v/VV); // e,j,k,f
	
	// NX
  vertices.push(-WW/2,HH/2,-DD/2, -WW/2,-HH/2,-DD/2, -WW/2,-HH/2,DD/2, -WW/2,HH/2,DD/2 ); // 4,7,3,0
  indices.push (8,9,10, 8,10,11); // [0,1,2, 0,2,3] + 8
	uvs.push (f.u/UU,f.v/VV, k.u/UU,k.v/VV, l.u/UU,l.v/VV, g.u/UU,g.v/VV); // f,k,l,g

	// NZ
  vertices.push(WW/2,HH/2,-DD/2, WW/2,-HH/2,-DD/2, -WW/2,-HH/2,-DD/2, -WW/2,HH/2,-DD/2 ); // 5,6,7,4
  indices.push (12,13,14, 12,14,15); // [0,1,2, 0,2,3] + 12
	uvs.push (c.u/UU,c.v/VV, h.u/UU,h.v/VV, i.u/UU,i.v/VV, d.u/UU,d.v/VV); // c,h,i,d
	//PY
  vertices.push(-WW/2,HH/2,-DD/2, -WW/2,HH/2,DD/2, WW/2,HH/2,DD/2, WW/2,HH/2,-DD/2 );  // 4 0 1 5
  indices.push (16,17,18, 16,18,19); // [0,1,2, 0,2,3] + 16
	uvs.push (a.u/UU,a.v/VV, d.u/UU,d.v/VV, e.u/UU,e.v/VV, b.u/UU,b.v/VV); // a,d,e,b
	//NY
  vertices.push(-WW/2,-HH/2,-DD/2, -WW/2,-HH/2,DD/2, WW/2,-HH/2,DD/2, WW/2,-HH/2,-DD/2 );  // 7 3 2 6
  indices.push (20,21,22, 20,22,23); // [0,1,2, 0,2,3] + 20
	uvs.push (i.u/UU,i.v/VV, m.u/UU,m.v/VV, n.u/UU,n.v/VV, j.u/UU,j.v/VV); // i,m,n,j

	geometry.setIndex(indices);  
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));	
	
  let head = new THREE.Mesh (geometry, new THREE.MeshBasicMaterial({map: texture, transparent: true, side:THREE.DoubleSide}));
	return head;
}

function buildBackground(treemap){
  let material = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    transparent: true, // key to cutout texture
    map: treemap
  });
  var tree = new THREE.Mesh(new THREE.PlaneGeometry(80, 80), material);
  tree.position.set(30,40,50)
  scene.add(tree);
  return tree;
}

export {buildPart, editPart, buildGrass, buildBackground};