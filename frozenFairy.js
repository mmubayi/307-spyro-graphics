/*
Copyright 2018 Maya Mubayi, Wellesley College Computer Science Department
This code is intended for project submission and is open for use to students in 
the Wellesley CS 307 Graphics class. 

frozenFairy.js is a javascript file that creates an icy-looking crystal that
hides a fairy within

There is one function that may be called: 
frozenFairy(radius,height)
which returns a frozen gem with a fairy frozen inside

The parameters are:
radius - radius for the three geometries that make up the gem
height - height of the gem

The other three turrets in the facade are created relative to the left-most one

Other information:
Due to algorithms used for drawing the scene and the fact that the geometries for
the fairy and the gem overlap,

*/

function frozenFairy(radius,height) {
    
    var fairy = new THREE.Object3D(); 
    
    //anonymous function to load and use the fairy texture on a cylinder, then 
    //add the fairy cylinder to the fairy object
    TW.loadTextures(["fairy.jpg"],
            function (textures) {
                textures[0].wrapT = THREE.RepeatMirrorWrapping;
                
                var lightIce = new THREE.MeshToonMaterial({color: 0x10B8F7,
                            map: textures[0], transparent: true, opacity: 0.7,
                            specular: 0xb8b9ba, shininess: 40, side: THREE.DoubleSide});
                            
                var insideGeom = new THREE.CylinderGeometry(radius/2,radius/2,height*0.9,6,6,true); 
                var inside = new THREE.Mesh(insideGeom, lightIce); 
                inside.rotation.y = Math.PI; 
                fairy.add(inside); 
            } );

    /* This function creates and returns the ice gem with a fairy cylinder inside 
     * Parameters:
     * radius - radius of the three parts of the gem
     * height - height of the cylinder geometry that makes middle part of gem
     */
    function frozenDiamond(radius, height) {
        var diamond = new THREE.Object3D(); 
        
        //adding all components of the frozen fairy to the diamond object
        
        //use low number of radial segments to make less-smooth appearance
        var topGeom = new THREE.ConeGeometry(radius, height/2, 6, 6); 
        var blueIce = new THREE.MeshToonMaterial({color: 0x10B8F7 , transparent: true, 
                            opacity: 1, specular: 0xb8b9ba, shininess: 40, side: THREE.DoubleSide});
         
        
        var top = new THREE.Mesh(topGeom, blueIce);
 
        var bottomGeom = new THREE.ConeGeometry(radius, height/2, 6, 6);
        var bottom = new THREE.Mesh(bottomGeom, blueIce); 
        
        
        var middleGeom = new THREE.CylinderGeometry(radius,radius,height,6,6,false,1,Math.PI); 
        var middle = new THREE.Mesh(middleGeom, blueIce); 
        
        var middleGeom2 = new THREE.CylinderGeometry(radius,radius,height,6,6,false,3,Math.PI);
        var middle2 = new THREE.Mesh(middleGeom2, blueIce); 
        
        middle.position.y = height; 
        middle2.position.y = height;
        fairy.position.y = height; 
        top.position.y = height + height-height/4; 
        bottom.position.y = height + (-height+height/4); 
        bottom.rotation.x = Math.PI; 
        
        diamond.add(top); 
        diamond.add(middle); 
        diamond.add(middle2); 
        diamond.add(fairy); 
        diamond.add(bottom); 
        
        return diamond; 
        
        }
    
    var frozen = frozenDiamond(radius, height); 
    return frozen; 
}