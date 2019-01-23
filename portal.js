/*
Copyright 2018 Maya Mubayi, Wellesley College Computer Science Department
This code is intended for project submission and is open for use to students in 
the Wellesley CS 307 Graphics class. 

portal.js is a javascript file that creates an arched doorway with a "portal"
inside. 

There is one function that may be called: 
arch()
which returns a golden archway with a texture mapped portal inside. 

The size of the portal is fixed. The origin is at the bottom of the arch in the centre. 

Other information:
The archway is created using a bezier curve with a tube geometry and the actual 
portal inside is created using a bezier surface that is just slightly narrower 
and shorter than the archway. 

*/

function arch() {
    
    var portalObj = new THREE.Object3D(); 
    
    //creates the bezier curve for the arch
    var bezierCurve = new THREE.CubicBezierCurve3(
        new THREE.Vector3(-10,0,0), 
        new THREE.Vector3(-10,30,0),
        new THREE.Vector3(10,30,0),
        new THREE.Vector3(10,0,0));

    var tubeGeom = new THREE.TubeGeometry(bezierCurve,60,2,10,false); 
    var tubeMat = new THREE.MeshToonMaterial({color: 0xe2b306}); 
    var tube = new THREE.Mesh(tubeGeom,tubeMat); 
        
    portalObj.add(tube); 
        
        //adds the inside of the archway, the actual portal 
        TW.loadTextures(["purple-noise.jpg"], 
            function(textures) {
                var topToBottom = [
                [ [-9,15,0], [-5,25,0], [5,25,0], [9,15,0] ],
                [ [-9,10,0], [-5,10,0], [5,10,0], [9,10,0] ],
                [ [-9,5,0],  [-5,5,0],  [5,5,0],  [9,5,0] ],
                [ [-9,0,0],  [-5,0,0],  [5,0,0],  [9,0,0] ],
                ];
                
            var portalInside = new THREE.BezierSurfaceGeometry(topToBottom.reverse(), 10, 10 );
            var portalMat  = new THREE.MeshToonMaterial({color: 0xFFFFFF, map: textures[0]}); 
            var portal = new THREE.Mesh(portalInside, portalMat);
            portal.material.side = THREE.DoubleSide; 
            portalObj.add(portal); 
            
            }); 
    
    return portalObj; 
        
}

