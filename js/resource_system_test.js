		
class ResourcesSystem{

	constructor (Energy, Weight){
		this.oxygen = 21;
		this.carbondioxid = 0.04;
		this.energy = 150;
		this.time = 0;
		this.N = 0;
		this.nIdle=0;
		this.nWork=1;
		this.v = 1;
		this.w = 100;
		this.productivity = 0;
		this.energyConsumption = 0;
		this.energy = Energy;
		this.weight = Weight;
		
		this.workingConsumptionO = 0.1;
		this.idleConsumptionO = 0.05;
		this.workingProductionCO = 0.1;
		this.idleProductionCO = 0.05;
		//console.log(this.getSliderValue());
		//this.refreshSliderDisplay();
		//this.resourceLost = false;
	}
	
	
	getSliderValue(){
		let machineSpeed=document.querySelector('#machine-speed-slider').value;
		let workerIdle=document.querySelector('#worker-idle-slider').value;
		let workerMining=document.querySelector('#worker-mining-slider').value;
		let workerRefinery=document.querySelector('#worker-refinery-slider').value;
		
		let energyStartvalue=document.querySelector('#energy-startvalue-slider').value;
		let oxygenConsumptionIdle=document.querySelector('#oxygen-consumption-idle-slider').value;
		let oxygenConsumptionWork=document.querySelector('#oxygen-consumption-work-slider').value;
		let carbondioxideProductionIdle=document.querySelector('#carbondioxide-production-idle-slider').value;
		let carbondioxideProductionWork=document.querySelector('#carbondioxide-production-work-slider').value;
		return {
			machineSpeed,
			workerIdle,
			workerMining,
			workerRefinery,
			energyStartvalue,
			oxygenConsumptionIdle,
			oxygenConsumptionWork,
			carbondioxideProductionIdle,
			carbondioxideProductionWork	
		}
	}
	
	refreshSliderDisplay(){
		
		let SliderValues=this.getSliderValue();
		
		document.querySelector('#machine-speed-slidervalue').innerHTML=SliderValues.machineSpeed;
		document.querySelector('#worker-idle-slidervalue').innerHTML=SliderValues.workerIdle;
		document.querySelector('#worker-mining-slidervalue').innerHTML=SliderValues.workerMining;
		document.querySelector('#worker-refinery-slidervalue').innerHTML=SliderValues.workerRefinery;
		
		document.querySelector('#energy-startvalue-slidervalue').innerHTML=SliderValues.energyStartvalue;
		document.querySelector('#oxygen-consumption-idle-slidervalue').innerHTML=SliderValues.oxygenConsumptionIdle;
		document.querySelector('#oxygen-consumption-work-slidervalue').innerHTML=SliderValues.oxygenConsumptionWork;
		document.querySelector('#carbondioxide-production-idle-slidervalue').innerHTML=SliderValues.carbondioxideProductionIdle;
		document.querySelector('#carbondioxide-production-work-slidervalue').innerHTML=SliderValues.carbondioxideProductionWork;
		
		this.testSliderValues(SliderValues);
		//console.log(SliderValues);
	}
	
	testSliderValues(SliderValues){
		//this.energy = SliderValues.energyStartvalue;
		
		this.N = SliderValues.workerIdle+SliderValues.workerMining;
		this.nIdle=SliderValues.workerIdle;
		this.nWork=SliderValues.workerMining;
		this.v = SliderValues.machineSpeed;
		this.workingConsumptionO = SliderValues.oxygenConsumptionWork;
		this.idleConsumptionO = SliderValues.oxygenConsumptionIdle;
		this.idleProductionCO = SliderValues.carbondioxideProductionIdle;
		this.workingProductionCO = SliderValues.carbondioxideProductionWork;
	}
	
	
	refreshOxygenValue(){
		console.log(this.workingConsumptionO);
		return this.oxygen -(this.nWork*this.workingConsumptionO+this.nIdle*this.idleConsumptionO);		
	}
	
	refreshCarbondioxidValue(){
		//console.log(this.carbondioxid+(this.nWork*workingProduction+this.nIdle*idleProduction));
		return this.carbondioxid+(this.nWork*this.workingProductionCO+this.nIdle*this.idleProductionCO);
	}
	
	carbondioxidFactorCalculation(){
		let carbondioxid=this.carbondioxid;
		  if(0.04<=carbondioxid<=0.08){
		    return (1-2.5*(carbondioxid-0.04));
		  }
		  if(carbondioxid<=1.5){
		      return (0.9-(20/141)*(carbondioxid-0.09));
		  }
		  if(carbondioxid<=5){
		    return (0.7-(40/349)*(carbondioxid-1.51));
		  } else {
		      return (0.3-(3/29)*(carbondioxid-5.01));
		  }
	}
	
	oxygenFactorCalculation(){
		return this.oxygen*(4.76/100);
	}
		
		
	myTime() {
		// Faktoraktualisierung
		let carbondioxidFactor = this.carbondioxidFactorCalculation();
		let oxygenFactor= this.oxygenFactorCalculation();
		let v= this.v;
		
		//Wertänderungen
		let productivity = this.calculateProductivity(v,oxygenFactor, carbondioxidFactor);
		this.oxygen = this.refreshOxygenValue();
		
		this.carbondioxid = this.refreshCarbondioxidValue();
		this.energy -= 1;
		this.time += 1;
		
		//console.log(carbondioxidFactor);
		
		//Rückgabewerte
		return {
			time: this.time,
			energy: this.energy,
			carbondioxid: this.carbondioxid,
			oxygen: this.oxygen
		};
		
	}
	
	
	calculateProductivity(v,oxygenFactor, carbondioxidFactor){
		//console.log(v+"   "+oxygenFactor+"      "+carbondioxidFactor);
		return v*carbondioxidFactor*oxygenFactor;
	}
	
	

	setTime() {
		let data = system.myTime();
		let	energy = data.energy;
		let	time = data.time;
		let	carbondioxid = data.carbondioxid;
		let	oxygen = data.oxygen;
			
		document.querySelector('.energy-value').innerHTML=energy+'/150 HU';
		document.querySelector('.time-value').innerHTML= time + 's';
		document.querySelector('.carbondioxide-value').innerHTML= carbondioxid.toFixed(2) + '/8.00 %';
		document.querySelector('.oxygen-value').innerHTML= oxygen.toFixed(2) + '/21.00 %';
		if(!(carbondioxid<=8) || !(oxygen>=10.5) || (energy<=50)){
		window.clearInterval(timeUnit);
		console.log("Game Over");
		}
		
	}
}

let system = new ResourcesSystem(150);
let timeUnit = setInterval(system.setTime, 1000);

	
function setTime() {
	let data = system.myTime(),
		energy = data.energy,
		time = data.time;
		carbondioxid = data.carbondioxid;
		oxygen = data.oxygen;
		
	document.querySelector('.energy-value').innerHTML=energy+'/150 HU';
	document.querySelector('.time-value').innerHTML= time + 's';
	document.querySelector('.carbondioxide-value').innerHTML= carbondioxid.toFixed(2) + '/8.00 %';
	document.querySelector('.oxygen-value').innerHTML= oxygen.toFixed(2) + '/21.00 %';
	if(!(carbondioxid<=8) || !(oxygen>=10.5) || (energy<=50)){
	window.clearInterval(timeUnit);
	console.log("Game Over");
	}
}

