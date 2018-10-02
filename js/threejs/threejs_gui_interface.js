// functions for getting user input values stored in html
// downward movement speed of main drill
function getActualMainDrillSpeed(){
    let ActualMainDrillSpeed=document.querySelector('#main-drill-speed').value;
    return ActualMainDrillSpeed;
}

// movement and mining speed of mining worker
function getActualMinerSpeed(){
    let ActualMinerSpeed=document.querySelector('#miner-speed').value;
    return ActualMinerSpeed;
}

// transfer mined resources to gui storage in html
function storeMinedResources(resource){//resource=elementID (still to be defined); each resource block only contains 1 unit of material
    if (resource==1){
        document.querySelector('#raw-caloricum-storage-value').value=document.querySelector('#raw-caloricum-storage-value').value+1;
    }

    if (resource==2){
        document.querySelector('#copper-ore-value').value=document.querySelector('#copper-ore-value').value+1;
    }

    if (resource==3){
        document.querySelector('#pottasium-ore-value').value=document.querySelector('#pottasium-ore-value').value+1;
    }
}
