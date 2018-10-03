
function deleteCubeUnderground(x, y){
	let cube = scene.getObjectByName( "(" + x + "|" + y + ")");
	
	if (cube != null){
		let material = cube.userData.material;
		storeMinedResources(material); //./threejs_gui_interface.js
	}
	
	group.remove(cube);
}

function deleteCubeEdge(x){
	let cube = scene.getObjectByName( "(" + x + ")");
	groupSurface.remove(cube);
}




function drill(stage) {
	/*for(let x=-1; x<2; x++){
			deleteCubeEdge(x);
	}

	for(let x=-1; x<2; x++){
		for (let y=0; y<6; y++){
			deleteCubeUnderground(x, y);
		}
	}
	*/


	let cubeEdge = scene.getObjectByName( "(" + 0 + ")");
	if (cubeEdge != null){
		deleteCubeEdge(-1);
		deleteCubeEdge(0);
		deleteCubeEdge(1);
	}else{
		deleteCubeUnderground(-1, stage-1);
		deleteCubeUnderground(0, stage-1);
		deleteCubeUnderground(1, stage-1);
	}


	
}






