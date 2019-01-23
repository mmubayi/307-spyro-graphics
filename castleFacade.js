/*
Copyright 2018 Maya Mubayi, Wellesley College Computer Science Department
This code is intended for project submission and is open for use to students in 
the Wellesley CS 307 Graphics class. 

castleFacade.js is a javascript file that creates the facade of a castle 

There is one function that may be called: 
castleFacade(textures, height, radius, depth) 
which returns the outer structure of four castle turrets joined together, with
the origin in the centre of the facade. The turrets are spaced out evenly 
along the x axis with y pointing up and the final turret out on the z axis. 

The parameters are:
textures - array of texture materials
height - height of the left-most turret
radius - radius of the left-most turret
depth - used to set depth of link piece, as well as place them

The other three turrets in the facade are created relative to the left-most one

Other information:
All meshes that are part of the facade cast shadows 

*/

function castleFacade(textures, height, radius, depth) {

/* This function creates and returns a turret object containing the turret and 
spotted red roof 
     * Parameters:
     * height - height of the turret 
     * radius - radius of the turret
     */
function turret(height, radius) {
    
    //repeat settings for grey stone texture used for the turret 
    textures[0].wrapS = THREE.RepeatWrapping; 
    textures[0].wrapT = THREE.RepeatWrapping; 
    textures[0].repeat.set(2, 3);
    textures[0].needsUpdate = true;
    
    var turretObj = new THREE.Object3D(); 
    
    //creating turret and its roof
    var turretGeom = new THREE.CylinderGeometry(radius,radius,height,30,30); 
    var turretMat = new THREE.MeshPhongMaterial({map: textures[0]}); 
    var turret = new THREE.Mesh(turretGeom, turretMat); 
    turret.castShadow = true; 
    
    var topGeom = new THREE.ConeGeometry(radius*1.6,height/3,30,30); 
    var topMat = new THREE.MeshPhongMaterial({map: textures[1]});
    var top = new THREE.Mesh(topGeom, topMat);
    top.castShadow = true; 
    
    //position them so turret is sitting on the ground
    turret.position.y = height/2; 
    top.position.y = height+(height/6); 
    
    turretObj.add(turret); 
    turretObj.add(top); 
    
    return turretObj; 
}


/* This function creates and returns a link that runs between each turret
     * Parameters:
     * length - distance between two turrets
     * height - height of the link 
     * depth - depth of the link 
     */
function link(length, height, depth) {

    var linkGeom = new THREE.BoxGeometry(length, height, depth); 
    var linkMat = new THREE.MeshToonMaterial({color: 0xd3443f, specular: 0xFFFFFF, shininess: 50, reflectivity: 0.7});
    var link = new THREE.Mesh(linkGeom, linkMat);
    link.castShadow = true;
    
    return link; 
    
}

/* This function creates and returns the facade object containing four turrets
and three links between them
spotted red roof 
     * Parameters:
     * height - height of the leftmost turret 
     * radius - radius of all the turrets
     * depth - depth of the link 
     */
function createFacade(height,radius,depth) {
    
    var facade = new THREE.Object3D(); 
    
    //creating and positioning the turrets relative to the leftmost one 
    var turret1 = turret(height, radius); 
    var turret2 = turret(height*1.4, radius); 
    var turret3 = turret(height*1.2, radius);
    var turret4 = turret(height*1.1, radius);
    
    turret1.position.x = -30; 
    turret2.position.x = -7;
    turret3.position.x = 16;
    turret4.position.set(16,0,23);  
    
    //distance between turrets
    var length = 23; 
    
    //creating and positioning links to sit between turrets
    var link1 = link(length, 2, depth);
    var link2 = link(length, 2, depth); 
    var link3 = link(length, 2, depth); 
    
    link1.position.set(-30+(radius*2),height/2,depth-radius); 
    link2.position.set(-7+(radius*2),height/2,depth-radius); 
    link3.position.set(16,height/2,depth+radius);
    link3.rotation.y = Math.PI/2;
    
    facade.add(turret1); 
    facade.add(turret2); 
    facade.add(turret3); 
    facade.add(turret4); 
    facade.add(link1); 
    facade.add(link2);
    facade.add(link3); 
    
    return facade; 
}

var castleFacade = createFacade(height, radius, depth);
return castleFacade; 

}