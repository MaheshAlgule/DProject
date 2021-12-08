

//this object must be created so that values can be shown on input page
function inputValStorage(){
  let  power,serviceFactor,fos,teethOnPinion,teethOnGear,speedOfPinion,speedOfGear,gearRatio,MfgProcess,gradeOfMachining,gearMaterial,pinionMaterial,pressureAngel
  power='22.5 Kw';
  serviceFactor='1.5';
  factorOfSaftey='1.5';
  teethOnPinion='18';
  teethOnGear='72';
  speedOfPinion='360 rpm';
  speedOfGear='1440 rpm';
  gearRatio='4';
  MfgProcess='Accurate Hobbed Gear';
  gradeOfMachining='Grade8';
  gearMaterial='steel';
  pinionMaterial='steel';
  pressureAngel='20fullDepth'


    const inputsObj={
        power,serviceFactor,factorOfSaftey,teethOnPinion,teethOnGear,speedOfPinion,speedOfGear,gearRatio,MfgProcess,gradeOfMachining,gearMaterial,pinionMaterial,pressureAngel
    }
    const StoreInputs=inputsObj;
    const StoreInputsString=JSON.stringify(StoreInputs)
    localStorage.setItem("StoreInputs",StoreInputsString) 
    
}

inputValStorage()







/*
check is pinion or gear is to design and select the proper speed
strengthConstant((Sut/3)*Y)
*/


let power,serviceFactor,fos,teethOnPinion,teethOnGear,speedOfPinion,speedOfGear,BMConstant,
strengthConstant,pitchVelecity,isPinionOrGearWeak,typeMfgProcess,velocityFactor,moduel,gradeOfMachining


power=22.5;   //in kw
serviceFactor=1.5;
fos=1.5;
teethOnPinion=18;
teethOnGear=72;
speedOfGear=360;
speedOfPinion=1440;
BMConstant=10;
strengthConstant=62.8;
pitchVelocity=5;
isPinionOrGearWeak='pinionweak';
module=0
typeMfgProcess="3/(3+v)"
gradeOfMachining='16.00+(1.25*fi)'
pressureAngel=20;
youngModOfPinion=206000
youngModOfGear=206000
deformationFactor=11400


 function calculateVelocityFactor () {
    if (typeMfgProcess === '3/(3+v)') {
        velocityFactor = 3 / (3 + pitchVelocity);
    } else if (typeMfgProcess === '6/(6+v)') {
        velocityFactor = 6 / (6 + pitchVelocity);
    } else if (typeMfgProcess === '5.6/(5.6+Math.sqrt(v))') {
        velocityFactor = 5.6 / (5.6 + Math.sqrt(pitchVelocity));
    }

}
calculateVelocityFactor()


//calculate module
function calculateModule() {

    let multipler, numerator, denomenator
    if (isPinionOrGearWeak === 'pinionweak') {
        multipler = parseFloat(((60 * Math.pow(10, 6)) / Math.PI))
        numerator = power * serviceFactor * fos
        denomenator = teethOnPinion * speedOfPinion * velocityFactor * BMConstant * strengthConstant
        module = Math.pow((multipler * (numerator / denomenator)), 1 / 3).toPrecision(4)
        return module;
    } else {
        multipler = parseFloat(((60 * Math.pow(10, 6)) / Math.PI))
        numerator = power * serviceFactor * fos
        denomenator = teethOnGear * speedOfGear * velocityFactor * BMConstant * strengthConstant
        module = Math.pow((multipler * (numerator / denomenator)), 1 / 3).toPrecision(4)
        return module;
    }

}


var selectModule = function (i) {
    var choise1 = [1.0, 1.25,1.125, 1.375,1.5,1.75, 2.0, 2.25, 2.5,2.75, 3.0,3.5, 4.0,4.5, 5.0,5.5,6.0,7.0, 8.0,9,10,11,12,14,16,18,20]
    var result1 = [];
    for (var j = 0; j < choise1.length; j++) {
        if (i < choise1[j]) {
            result1.push(choise1[j])
        };
    }
    return result1
}

//function to create sdrop down of module
const generate=function(module) {
const value1=selectModule(module);
const select1 = document.querySelector("#choise1");
  for (const val of value1) {
    var option = document.createElement("option");
    option.value = val;
    option.text = val
    select1.appendChild(option);
  }
}

let claculatedModuleVal = calculateModule();
document.querySelector('#calculatedModule').value = claculatedModuleVal
generate(claculatedModuleVal)


//declaring Object of result 
let resultObj;


const checkTheDesign = function () {
    //selected module
    //calculating diameter and face width
    //calculate the torque
    //tangential Velocity
    //pitchvelocity(select Factor according)
    //effectiveLoad 
    //Beam Strength
    let selectedModule,torque, tangentialForce, pitchVelocity, beamStrength, velocityFactor, effectiveBeamLoad,pinionDiameter,faceWidth,gearDiameter
    if (isPinionOrGearWeak === 'pinionweak'){   
        function selectedModuleVal(){
            selectedModule=document.querySelector('.container #choise1').value
            return selectedModule;
        }
        selectedModuleVal()
        function calculategearDiameter(){
            gearDiameter=selectedModule*teethOnGear;     
            return
        }
        calculategearDiameter()
        function calculatePinionDiameter(){
            pinionDiameter=selectedModule*teethOnPinion;     
            return
        }
        calculatePinionDiameter()
        function calculateFaceWidth(){
            faceWidth=10*selectedModule;
            return faceWidth;
        }
        calculateFaceWidth()
    
    const torqueFunction = function () {
        //toruqe calculation
        
        let torqueCal = (60 * power * 1000000) / (2 * Math.PI * speedOfPinion);
        torque = parseFloat(torqueCal.toPrecision(8));
        return torque;
    };
    torqueFunction()
    const tangentialForceFunction = function () {
        //Tangential focrce calculation
        var tangentialForceCal = (2 * torque) / pinionDiameter;
        tangentialForce = tangentialForceCal.toPrecision(8);
        return tangentialForce;
    }
    tangentialForceFunction()

    //The effective Load
    const pitchVelocityFunction = function () {
        //Pitch line veleocity 
        var pitchVelocityCal = (Math.PI * pinionDiameter * speedOfPinion) / (60 * 1000);
        pitchVelocity = parseFloat(pitchVelocityCal.toPrecision(5));
        return pitchVelocity;
    }
    pitchVelocityFunction();
    const velocityFactorFunction = function () {
        //velecity factor(Cv)
        if (pitchVelocity < 10) {
            velocityFactor = 3 / (3 + pitchVelocity);
            return velocityFactor;
        } else if (pitchVelocity < 20) {
            velocityFactor = 6 / (6 + pitchVelocity);
            return velocityFactor;
        } else if (pitchVelocity > 20) {
            velocityFactor = 5.6 / (5.6 + Math.sqrt(pitchVelocity));
            return velocityFactor;
        }
    }
    velocityFactorFunction();

    const effectiveBeamLoadFunction = function () {

        //Effective load (Beam strength)

        effectiveBeamLoad = (serviceFactor * tangentialForce) / velocityFactor;

        return effectiveBeamLoad;
    }
    effectiveBeamLoadFunction();
    const calculateBeamStrength = function () {
        //selectedModule
        beamStrength = selectedModule * faceWidth * strengthConstant
        return beamStrength;
    }
    calculateBeamStrength();
}else{

    function selectedModuleVal(){
        selectedModule=document.querySelector('.container-div #choise1').value
        return selectedModule;
    }
    selectedModuleVal()
    
    function calculategearDiameter(){
        gearDiameter=selectedModule*teethOnGear;     
        return
    }
    calculategearDiameter()
    function calculatePinionDiameter(){
        pinionDiameter=selectedModule*teethOnPinin;     
        return
    }
    calculatePinionDiameter()
    function calculateFaceWidth(){
        faceWidth=10*selectedModule;
        return faceWidth;
    }
    calculateFaceWidth()

    const torqueFunction = function () {
        //toruqe calculation
        let torqueCal = (60 * power * 1000000) / (2 * Math.PI * speedOfGear);
        torque = parseFloat(torqueCal.toPrecision(8));
        return torque;
    };
    torqueFunction()

    const tangentialForceFunction = function () {
        //Tangential focrce calculation
        let tangentialForceCal = (2 * torque) / gearDiameter;
        tangentialForce = tangentialForceCal.toPrecision(8);
        return tangentialForce;
    }
    tangentialForceFunction()

    //The effective Load
    const pitchVelocityFunction = function () {
        //Pitch line veleocity 
        let pitchVelocityCal = (Math.PI * gearDiameter * speedOfGear) / (60 * 1000);
        pitchVelocity = parseFloat(pitchVelocityCal.toPrecision(5));
        return pitchVelocity;
    }
    pitchVelocityFunction();
    const velocityFactorFunction = function () {
        //velecity factor(Cv)
        if (pitchVelocity < 10) {
            velocityFactor = 3 / (3 + pitchVelocity);
            return velocityFactor;
        } else if (pitchVelocity < 20) {
            velocityFactor = 6 / (6 + pitchVelocity);

            return velocityFactor;
        } else if (pitchVelocity > 20) {
            velocityFactor = 5.6 / (5.6 + Math.sqrt(pitchVelocity));
            return velocityFactor;
        }
    }
    velocityFactorFunction();
    const effectiveBeamLoadFunction = function () {

        //Effective load (Beam strength)
        effectiveBeamLoad = (serviceFactor * tangentialForce) / velocityFactor;

        return effectiveBeamLoad;
    }
    effectiveBeamLoadFunction();
    const calculateBeamStrength = function () {
        //selectedModule
        beamStrength = selectedModule * faceWidth * strengthConstant
        return beamStrength;
    }
    calculateBeamStrength(); 
}
function checkSaftey(){
    let setSafteyStatement=document.querySelector('#saftey')
    if(beamStrength>effectiveBeamLoad){
        setSafteyStatement.innerHTML=`The design is satisfactory and the module should be ${selectedModule} according to beam strength`
        setSafteyStatement.style.color='green'

    }
    else{
        setSafteyStatement.innerHTML=`The design is not satisfactory. Select higher module than ${selectedModule}  `
        setSafteyStatement.style.color='red'
    }
}
checkSaftey()
resultObj={
    selectedModule,torque, tangentialForce, pitchVelocity, beamStrength, velocityFactor, effectiveBeamLoad,pinionDiameter,faceWidth,gearDiameter
}
return resultObj;

}
console.log(checkTheDesign());







const storeObj=function(){
let resultObjStorage=JSON.stringify(resultObj);
localStorage.setItem("resultObj",resultObjStorage)
window.location.replace("wearStrength.html");
}

document.querySelector('#wearStrength').addEventListener('click',storeObj);

const inputPage=function(){
 
    window.location.replace("inputs.html");
    }
    
    document.querySelector('#inputPage').addEventListener('click',inputPage);

    const resultPage=function(){
        let resultObjStorage=JSON.stringify(resultObj);
        localStorage.setItem("resultObj",resultObjStorage)
        window.location.replace("result.html");
        }
        
        document.querySelector('#resultPage').addEventListener('click',resultPage);



