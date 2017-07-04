function getMeshPointsSeparate(shpereInfos) {
    var basicGeometrySphere = new THREE.SphereBufferGeometry( 1, 9, 9 );
    var geometry = new THREE.InstancedBufferGeometry();
    // per mesh data
    // 1. position
    var vertices = basicGeometrySphere.getAttribute("position");
    geometry.addAttribute( 'position', vertices );
    // 2. UV
    var uvs = basicGeometrySphere.getAttribute("uv");
    geometry.addAttribute( 'uv', uvs );
    // 3. index
    var indices = basicGeometrySphere.getIndex();
    geometry.setIndex( indices );

    // 4. normal
    var normals = basicGeometrySphere.getAttribute("normal");
    geometry.addAttribute("normal", normals );
    // 5. offset
    var offsets = new THREE.InstancedBufferAttribute( new Float32Array( shpereInfos.length * 3 ), 3, 1 );
    // 6. color
    var colors = new THREE.InstancedBufferAttribute( new Float32Array( shpereInfos.length * 4 ), 4, 1 ).setDynamic( true );
    // 7. radius
    var scaleValues =  new THREE.InstancedBufferAttribute( new Float32Array( shpereInfos.length*3 ), 3, 1 );

    var points = shpereInfos;

    for ( var i = 0; i< points.length; i++) {
        var x = points[i].x;
        var y = points[i].y;
        var z = points[i].z;
        var r = points[i].r;
        offsets.setXYZ( i, x, y, z);
        scaleValues.setXYZ( i, r,  r, r);
        colors.setXYZW( i, Math.random(), Math.random(), Math.random(), 1);
    }
    
    geometry.addAttribute( 'offset', offsets ); // per mesh translation
    geometry.addAttribute( 'scale', scaleValues );
    geometry.addAttribute( 'color', colors );

    var material = new THREE.RawShaderMaterial( {
        uniforms: {
            u_lightWorldPosition: { value: new THREE.Vector3(3,0,0) },
        },
        vertexShader: SphereShader.vertexShader,
        fragmentShader: SphereShader.fragmentShader,
        alphaTest: 0.5,
        transparent: true,
    } );

    var mesh = new THREE.Mesh( geometry, material );
    return mesh;
}
