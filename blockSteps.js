/*
Copyright 2018 Maya Mubayi, Wellesley College Computer Science Department
This code is intended for project submission and is open for use to students in 
the Wellesley CS 307 Graphics class. 

blockSteps.js is a javascript file that creates block clusters. 

There is one function that may be called: 
blockSteps(textures, width, height, depth, x, y, z) 
which returns a set of blocks of different sizes positioned like stairs, with 
the origin in the centre of cluster of blocks. The frame has y going up and the
blocks are each aligned with x axis except for the fourth block which is rotated 
to be aligned with the y axis. 

The parameters are:
textures - array of texture materials
width - width of the middle box in the cluster
height - height of the middle box in the cluster
depth - depth of the middle box in the cluster
x - x coordinate for centre of middle box
y - y coordinate for centre of middle box
z - z coordinate for centre of middle box

The other boxes in the cluster are created relative to the middle one.


Other information:
Contains an array of colours you want to colour the faces differently instead of
mapping different textures onto them. 

*/

function blockSteps(textures, width, height, depth, x, y, z) {
    
    //var colours = [0xc1a2aa, 0xc1a2aa, 0xc1a2aa, 0xc1a2aa, 0xc1a2aa, 0xc1a2aa];

    /* This function creates and returns a single block with a texture mapped
     * Parameters:
     * width - width of block
     * height - height of block
     * depth - depth of block
     */
    function block(width, height, depth) {
    
        //repeat settings for texture used for sides of blocks
        textures[5].wrapS = THREE.MirroredRepeatWrapping; 
        textures[5].wrapT = THREE.MirroredRepeatWrapping; 
        textures[5].repeat.set(2, 2);
        textures[5].needsUpdate = true;
        
        //setting up the array of textures used for creating a block
        var textureMaterial = [];
                                        
        textureMaterial[0] = new THREE.MeshToonMaterial({
                                        color: 0xce9777, side: THREE.DoubleSide, map: textures[4]});
    
        textureMaterial[1] = new THREE.MeshToonMaterial({
                                        color: 0xE2AB8C, side: THREE.DoubleSide, map: textures[5]});
    
        var stepGeom = new THREE.BoxGeometry(width,height,depth); 
                                        
        //set side faces to be dirt/soil material 
        TW.setMaterialForFaces(stepGeom, 0, 0,1,2,3, 8, 9, 10, 11); 
        //set top and bottom faces to be terrain
        TW.setMaterialForFaces(stepGeom, 1, 4,5,6,7); 
        
        var step = new THREE.Mesh(stepGeom, textureMaterial); 
        
        return step;
    }
    
    
    /* This function creates and returns an object containing 7 blocks 
     * Parameters:
     * width - width of block
     * height - height of block
     * depth - depth of block
     * x - x coordinate of the cluster
     * y - y coordinate of the cluster
     * z - z coordinate of the cluster
     */
    function cluster(width, height, depth, x, y, z) {
    
        var cluster = new THREE.Object3D();
        
        //adjust the heights so boxes are not all the same
        var height2 = height*0.8; 
        var height3 = height2*0.8; 
        var height4 = height*1.2; 
        var height5 = height*0.5;
        var height6 = height5*0.8; 
        var height7 = height4; 
        
        var widthFromMain = (width/2)+(width/2)/2;
        var depth6 = depth*0.8;
        var smallWidthFromMain = (width/2)+(depth6/2); 
        var smallDepthFromMain = depth6+depth*0.1;
        
        //creating all blocks, relative to the first block (middle of cluster)
        var block1 = block(width,height,depth); 
        var block2 = block(width,height2,depth); 
        var block3 = block(width,height3,depth); 
        var block4 = block(width*1.5,height4,depth);
        var block5 = block(depth,height5,depth);
        var block6 = block(depth6,height6,depth6);
        var block7 = block(width+(depth*2),height7,depth*1.6);
        
        block1.position.set(x,y,z); 
        block2.position.set(x, height2/2, z+(depth)); 
        block3.position.set(x, height3/2, z+(depth*2)); 
        block4.position.set(x+widthFromMain, height4/2, z); 
        block5.position.set(x-widthFromMain, height5/2, z); 
        block6.position.set(x-smallWidthFromMain, height6/2, z+smallDepthFromMain); 
        block7.position.set(x,height7/2,z-(depth*1.3));
        
        block4.rotation.y = Math.PI/2; 
        
        cluster.add(block1); 
        cluster.add(block2); 
        cluster.add(block3); 
        cluster.add(block4); 
        cluster.add(block5); 
        cluster.add(block6);
        cluster.add(block7); 
        
        return cluster; 
    }

   var blockCluster = cluster(width,height,depth,x,y,z); 
   return blockCluster; 

}