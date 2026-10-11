import * as THREE from
"https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js";


import {OrbitControls}

from

"https://cdn.jsdelivr.net/npm/three@0.160/examples/jsm/controls/OrbitControls.js";



// 场景

const scene =
new THREE.Scene();



// 摄像机

const camera =
new THREE.PerspectiveCamera(

45,

window.innerWidth/window.innerHeight,

0.1,

2000

);


camera.position.z=8;



// 渲染器

const renderer =
new THREE.WebGLRenderer({

canvas:
document.querySelector("#space"),

antialias:true

});


renderer.setSize(

window.innerWidth,

window.innerHeight

);



// 控制器

const controls =
new OrbitControls(

camera,

renderer.domElement

);


controls.enableDamping=true;



// 星空


const starsGeometry =
new THREE.BufferGeometry();


let starPositions=[];


for(let i=0;i<5000;i++){

starPositions.push(

(Math.random()-0.5)*500,

(Math.random()-0.5)*500,

(Math.random()-0.5)*500

);

}


starsGeometry.setAttribute(

"position",

new THREE.Float32BufferAttribute(

starPositions,

3

)

);



const stars =
new THREE.Points(

starsGeometry,

new THREE.PointsMaterial({

color:0xffffff,

size:0.7

})

);


scene.add(stars);




// 行星


const planetTexture =
new THREE.TextureLoader()
.load(

"https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg"

);



const planet =
new THREE.Mesh(

new THREE.SphereGeometry(

2,

64,

64

),

new THREE.MeshStandardMaterial({

map:planetTexture,

roughness:.8

})

);



scene.add(planet);




// 光源


const light =
new THREE.PointLight(

0xffffff,

3,

100

);


light.position.set(

5,

5,

5

);


scene.add(light);



scene.add(

new THREE.AmbientLight(

0x553399,

1

)

);




// 卫星


const satellites=[];


for(let i=0;i<3;i++){


let sat=

new THREE.Mesh(

new THREE.BoxGeometry(

0.2,

0.2,

0.8

),

new THREE.MeshStandardMaterial({

color:0xaaaaaa

})

);


scene.add(sat);


satellites.push({

obj:sat,

angle:i*2

});


}




// 陨石


const meteors=[];


for(let i=0;i<30;i++){


let meteor=

new THREE.Mesh(

new THREE.DodecahedronGeometry(

0.1

),

new THREE.MeshStandardMaterial({

color:0x996633

})

);


meteor.position.set(

Math.random()*20-10,

Math.random()*10-5,

Math.random()*-20

);



scene.add(meteor);


meteors.push(meteor);


}




// 空间站


const station=

new THREE.Mesh(

new THREE.TorusGeometry(

1,

0.08,

16,

100

),

new THREE.MeshStandardMaterial({

color:0xffddaa

})

);


station.position.set(

4,

2,

-3

);


scene.add(station);





// 动画


function animate(){


requestAnimationFrame(animate);



planet.rotation.y+=0.002;



satellites.forEach((s)=>{


s.angle+=0.01;


s.obj.position.x=

Math.cos(s.angle)*3;


s.obj.position.z=

Math.sin(s.angle)*3;


});



meteors.forEach(m=>{


m.position.z+=0.08;


if(m.position.z>5){

m.position.z=-20;

}


});



station.rotation.x+=0.01;

station.rotation.y+=0.02;



controls.update();



renderer.render(

scene,

camera

);


}



animate();





window.onresize=()=>{


camera.aspect=

window.innerWidth/window.innerHeight;


camera.updateProjectionMatrix();


renderer.setSize(

window.innerWidth,

window.innerHeight

);


};
