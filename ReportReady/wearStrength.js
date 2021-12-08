
let power,serviceFactor,fos,teethOnPinin,teethOnGear,speedOfPinion,speedOfGear,BMConstant,
strengthConstant,pitchVelecity,isPinionOrGearWeak,typeMfgProcess,velocityFactor,moduel,gradeOfMachining


power=7.5;   //in kw
serviceFactor=1.5;
fos=1.5;
teethOnPinion=19;
teethOnGear=40;
speedOfGear=711;
speedOfPinion=1500;
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


const defaultSelectVal=function(){
    let selectValues=document.querySelector('#grade')
    Array.from(selectValues).forEach(e=>{
        if(gradeOfMachining===e.value){
            e.selected=true;
    }
    })
    } 
    defaultSelectVal();
let getStoredVal=localStorage.getItem('resultObj');
let beamStrengthObj=JSON.parse(getStoredVal)



let wearStengthObj;

const checkWearStergth=function(){
    const beamStrength=beamStrengthObj.beamStrength;
    const effectiveBeamLoad=beamStrengthObj.effectiveBeamLoad;
    const gearDiameter=beamStrengthObj.gearDiameter;
    const pinionDiameter=beamStrengthObj.pinionDiameter;;
    const faceWidth=beamStrengthObj.faceWidth;
    const module=beamStrengthObj.selectedModule;
    const tangentialForce=beamStrengthObj.tangentialForce;
    const pitchVelocity=beamStrengthObj.pitchVelocity;
    gradeOfMachining=document.querySelector('#grade').value
    let selectedGrade=gradeOfMachining;

 
   
    
let factorOfSaftey,wearLoad,BHN,ratioFactor,totalError,dynamicEffectiveLoad,LoadStrssFactorConstant,dynamicLoad,isResultSatisfy,comment




const factorOfSafteyFunction = function(){
    //factor of saftey 

    factorOfSaftey = Math.round(beamStrength/effectiveBeamLoad);
    return factorOfSaftey;
}
factorOfSafteyFunction()
 //CALCUlATION OF SURFACE FACTOR(BHN)
 const wearLoadFunction = function(){ 
    //wear Load
    wearLoad = effectiveBeamLoad*factorOfSaftey;
    return wearLoad;
}
wearLoadFunction()
const ratioFactorFunction = function(){ 
    // ratio factor
   
    
    ratioFactor = (2*teethOnGear)/(teethOnGear+teethOnPinion); 

    return ratioFactor;
} 
ratioFactorFunction()
    //Load stress Factor(K)=0.16(BHN/100)^2
    //Sw=bQdpK
const calculatingLoadStrssFactorConstant=function(){
let pressureAngleInRadian=pressureAngel*(Math.PI/180)
let sineVal=(Math.sin(pressureAngleInRadian))//*(180/Math.PI)
console.log("sineVal",sineVal);

let cosineVal=(Math.cos(pressureAngleInRadian))//*(180/Math.PI)
console.log("cosineVal",cosineVal);

let youngModConst=(1/youngModOfPinion)+(1/youngModOfGear)
console.log('youngModConst',youngModConst);

let numeratorVal=(7.01561*sineVal*cosineVal*youngModConst)
console.log(numeratorVal);

let resultVal=((numeratorVal/1.4)*100e2).toPrecision(2)
console.log(resultVal);

LoadStrssFactorConstant=parseFloat(resultVal)
}
calculatingLoadStrssFactorConstant()

const BHNFunction = function(){
let bhnConstant = faceWidth*ratioFactor*pinionDiameter*LoadStrssFactorConstant;
BHN = Math.sqrt(wearLoad/bhnConstant)*100;
return BHN;
};   
BHNFunction()


const toothErrorFunction= function(){
    //basic equation calculation (fi) for pininon and gear  
    console.log(pinionDiameter,gearDiameter);
    
const basicPinion=function(){
    let result = parseFloat(module)+(0.25*Math.sqrt(pinionDiameter));
    return result;
    };
    const basicGear=function(){
        let result = parseFloat(module)+(0.25*Math.sqrt(gearDiameter));
        return result;
    };
    
    let pinionEqn= parseFloat(basicPinion());
    let gearEqn =parseFloat(basicGear());

        if(selectedGrade.length===14){   
        let one =parseFloat(`${selectedGrade[0]}${selectedGrade[1]}${selectedGrade[2]}${selectedGrade[3]}`);
        let two=parseFloat(`${selectedGrade[6]}${selectedGrade[7]}${selectedGrade[8]}${selectedGrade[9]}`);
        let errorPinion = one+(two*pinionEqn);
        let errorGear =  one+(two*gearEqn);
        totalError = (errorPinion+errorGear)*0.001;  // 0.001 ot convert error into mm from micrometer;
        console.log("The total error is "+totalError);
        
        }
        else{
            let one =parseFloat(`${selectedGrade[0]}${selectedGrade[1]}${selectedGrade[2]}${selectedGrade[3]}${selectedGrade[4]}`);
            let two = parseFloat(`${selectedGrade[7]}${selectedGrade[8]}${selectedGrade[9]}${selectedGrade[10]}`);
            let errorPinion = one+(two*pinionEqn);
            let errorGear =  one+(two*gearEqn);
            totalError = (errorPinion+errorGear)*0.001; // 0.001 ot convert error into mm from micrometer
            console.log("The total error is "+totalError);
        
    
    }
    return totalError;
    }
    toothErrorFunction()

const dynamicLoadFunction=function(){
    let totalErrorVal=parseFloat(totalError)
    let numerator =(deformationFactor*totalErrorVal*faceWidth)+parseFloat(tangentialForce);
    let formulaConst =21*pitchVelocity;
    let fullNumerator = formulaConst*numerator; 

    let denomenatorPart = Math.sqrt(numerator);
    dynamicLoad = fullNumerator / (formulaConst + denomenatorPart);
    console.log(fullNumerator,formulaConst,denomenatorPart);
    
    console.log(dynamicLoad);

        
return dynamicLoad;
}
dynamicLoadFunction()

const dynamicEffectiveLoadFunction=function(){
        dynamicEffectiveLoad = ((serviceFactor*tangentialForce)+dynamicLoad);  
    console.log(dynamicEffectiveLoad);
    
        return dynamicEffectiveLoad;
        

}
dynamicEffectiveLoadFunction()
//functon show imp values to screen
const showImpValues=function(){  
    let beamStrengthVal=  document.querySelector('#BeamStrength');
    let dynamicEffectiveLoadVal =document.querySelector('#dynamicEffectiveLoad');
    let WearStrengthVal= document.querySelector('#WearStrength');
    beamStrengthVal.value=`${beamStrength.toPrecision(8)} N`;
    dynamicEffectiveLoadVal.value=` ${dynamicEffectiveLoad.toPrecision(8)} N`
    WearStrengthVal.value=`${wearLoad.toPrecision(8)} N`
    

} 
showImpValues()

//setting  the result to screen
const displayResult= function(){
    let result;
    let resultShowItem=document.querySelector('#result')
    if(beamStrength > dynamicEffectiveLoad && wearLoad > dynamicEffectiveLoad){
        result= 'The design is safe according to beam strength and dynamic load';
        resultShowItem.innerHTML=result;
        resultShowItem.style.color='green';
        isResultSatisfy=true;

     }else if(wearLoad > dynamicEffectiveLoad){
        result='The design is safe according to wear strength';
        resultShowItem.innerHTML=result;
        resultShowItem.style.color='red'
        isResultSatisfy=false;



     }else if(wearLoad < dynamicEffectiveLoad && wearLoad < dynamicEffectiveLoad ){
        result='The design is not safe ';
        resultShowItem.innerHTML=result;
        resultShowItem.style.color='red'
        isResultSatisfy=false;

     }else if(beamStrength > dynamicEffectiveLoad){
        result='The design is  safe according to beam strength';
        resultShowItem.innerHTML=result;
        resultShowItem.style.color='red'
        isResultSatisfy=false;


     }else if(beamStrength < dynamicEffectiveLoad){
        result='The design is not safe according to beam strength';
        resultShowItem.innerHTML=result;
        resultShowItem.style.color='red'
        isResultSatisfy=false;


     }else{
        result='The design is not safe according to wear strength';
        resultShowItem.innerHTML=result;
        resultShowItem.style.color='red'
        isResultSatisfy=false;
     }
    }
    displayResult()


//function setting comment 
const setComment=function(){
    comment=document.querySelector('#comment');
    console.log(isResultSatisfy===true);

    
    if( isResultSatisfy===true){
        comment.style.visibility="hidden";
        let resultsBtn=document.querySelector('#resultPage')
        resultsBtn.disabled=false
    }else{
        comment.style.visibility="visible"
        let resultsBtn=document.querySelector('#resultPage')
        resultsBtn.disabled=true
    }
}
setComment();

return wearStengthObj={
    factorOfSaftey,wearLoad,BHN,ratioFactor,totalError,dynamicEffectiveLoad,selectedGrade,LoadStrssFactorConstant
}


}

const result2Obj=checkWearStergth();
const resultPage=function(){
    let resultObjStorage=JSON.stringify(result2Obj);
    localStorage.setItem("result2Obj",resultObjStorage)       
    window.location.replace("result.html");
    }
    
    document.querySelector('#resultPage').addEventListener('click',resultPage);


     const beamStrengthPage=function(){
     
        window.location.replace("beamStrength.html");
        }
        
        document.querySelector('#beamStrength').addEventListener('click',beamStrengthPage);
    
    
    const inputPage=function(){
     
        window.location.replace("inputs.html");
        }
        
        document.querySelector('#inputPage').addEventListener('click',inputPage);
    
        
    
    