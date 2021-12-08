// all input values
const form = document.getElementById('form');
const pinionMaterial = document.getElementById('pinionMaterial');
//const module = document.getElementById('module');
//const faceWidth = document.getElementById('faceWidth'); //Deal when check design page is opened
const gearMaterial = document.getElementById('gearMaterial');
const teethOnPinion = document.getElementById('teethOnPinion');
const teethOnGear = document.getElementById('teethOnGear');
const power = document.getElementById('power');
const speedOfPinion = document.getElementById('speedOfPinion');
const serviceFactor = document.getElementById('serviceFactor');
const safteyFactor = document.getElementById('safteyFactor');
const elePressure = document.getElementsByName('pressureAngle');
const eleProcess = document.getElementsByName('process');
const selectedGrade = document.getElementById('grade');

const speedOfGear = document.getElementById('speedOfGear');
//const centerDistance = document.getElementById('centerDistance');
const gearRatio = document.getElementById('gearRatio');
const grade = document.getElementById('grade');
const pressureAngle = document.getElementById("pressureAngle")
const manufacturing = document.getElementById("manufacturing")


const regex = /^[-0]+/;  //allow floats not zero and value starting with zero()

// const regexSec = /^[-0]+[.]+/;  //allow floats not zero and value starting with zero and float value()














let correctPower,
 //correctCenterDistance,
 correctSpeedOfPinion,
 correctSpeedOfGear,
 correcGearRatio,
 correctTeethOnPinion,
 correctTeethOnGear,
 correctServiceFactor,
 correctFactorOfSafety,
 correctProcessValue,
 correctPressureAngle,
 correctPinionMaterial,
 correctGearMaterial,
 correctGrade

 ///parameter that check all  required inputs are given
 let isAllInputsAreGiven=false;

const checkPower=function() {
    let powerVal = power.value.trim();
    if (powerVal===""){
        setErrorFor(power, 'Enter valid power value');

    }
    else if(regex.test(powerVal)){
        setErrorFor(power, 'Value can\'t start with zero or minus');

    }
    else {
        setSuccessFor(power);
        
        console.log(correctPower);
        isAllInputsAreGiven=true;
        correctPower=powerVal;
        
    }
}




// function checkCenterDis() {
// 	const centerDistanceValue = centerDistance.value.trim();

//      if(regex.test(centerDistanceValue)){
//         setErrorFor(centerDistance, 'Value can\'t start with zero or minus');

//     } 
//     //  else if (centerDistanceValue === "") {
//     //     setErrorFor(centerDistance,'Enter valid input');
//     // }
//      else {
//         setSuccessFor(centerDistance);
//         correctCenterDistance=centerDistance.value;
        
//     }
// }
function checkSpeedOfPinion() {
    const speedOfPinionValue = speedOfPinion.value.trim();

 
    // if(speedOfPinionValue === ""){
    //     setErrorFor(speedOfPinion,'Enter value of S.O.P or S.O.G ');
    // }
    if (regex.test(speedOfPinionValue)) {
        setErrorFor(speedOfPinion,  'Value can\'t start with zero ');
    } 
    else {
    checkInputs();
       correctSpeedOfPinion=speedOfPinionValue
    }
    
}


function checkSpeedOfGear() {
    const speedOfGearValue = speedOfGear.value.trim();

debugger
  if(regex.test(speedOfGearValue)){
        setErrorFor(speedOfGear, 'Value can\'t start with zero or minus');

    }
else  {
        setSuccessFor(speedOfGear);
        isAllInputsAreGiven=true;
 checkInputs();
 correctSpeedOfGear=speedOfGearValue;

    
    }
    

}

function checkGearRatio() {


    const gearRatioValue = gearRatio.value.trim();
  if(regex.test(gearRatioValue)) {
    
       setErrorFor(power, 'Value can\'t start with zero or minus');

    } 
     else  {
        setSuccessFor(gearRatio);
        correcGearRatio=gearRatioValue;
 checkInputs();

    }
    
}

function checkTeethOnPinion() {
    const teethOnPinionValue = teethOnPinion.value.trim();


    if (teethOnPinionValue === '') {
        setErrorFor(teethOnPinion, 'Enter value of T.O.P or T.O.G ');
    }
   else if(regex.test(teethOnPinionValue)){
        setErrorFor(power, 'Value can\'t start with zero or minus');

    } 
  else {
        setSuccessFor(teethOnPinion);
        checkInputsSecond();
        correctTeethOnPinion=teethOnPinionValue;

    }
    

}

function checkTeethOnGear() {
    const teethOnGearValue = teethOnGear.value.trim();

    if (teethOnGearValue === '') {
        setErrorFor(teethOnGear, 'Enter value of T.O.P or T.O.G ');

    }
   else if(regex.test(teethOnGearValue)){
        setErrorFor(teethOnGear, 'Value can\'t start with zero or minus');
    
    } 
  else {
    setSuccessFor(teethOnGear);
    correctTeethOnGear=teethOnGearValue;
    checkInputsSecond();
}

}
// function checkCenterDis() {
//     const moduleValue = module.value.trim();

//     if (moduleValue === '') {
//         setErrorFor(module, 'Power cannot be blank');
//     } else {
//         setSuccessFor(module);
//     }
    
// }                                                                        // //Deal when check design page is opened

// function checkCenterDis() {
// const faceWidthValue = faceWidth.value.trim();


// if (faceWidthValue === '') {
//     setErrorFor(faceWidth, 'Power cannot be blank');
// } else {
//     setSuccessFor(faceWidth);
// }

// }

function checkServiceFactorValue() {
    const serviceFactorValue = serviceFactor.value.trim();

    if (serviceFactorValue ==='') {
        setErrorFor(serviceFactor, 'Enter valid input');
    }
     else if(regex.test(serviceFactorValue)){
        setErrorFor(serviceFactor, 'Value can\'t start with zero or minus');

    }
    
    else {
        setSuccessFor(serviceFactor);
        correctServiceFactor=serviceFactorValue;
        isAllInputsAreGiven=true;

        
    }
    
}

function checkSafteyFactorValue() {
    const safteyFactorValue = safteyFactor.value.trim();
     if (safteyFactorValue === '') {
        setErrorFor(safteyFactor, 'Enter valid input');
    }
    else if(regex.test(safteyFactorValue)){
        setErrorFor(safteyFactor, 'Value can\'t start with zero or minus');
    }
   
    else {
        setSuccessFor(safteyFactor);
        correctFactorOfSafety=safteyFactorValue;   
        isAllInputsAreGiven=true;

    }
    
    
}




// checking the elePressureValue eleProcessValue
function checkPrssureInputs() {
    let pressureAngleVal,pressureAngleStatus ;
for (let i = 0; i < elePressure.length; i++) {
    pressureAngleStatus = elePressure[i].checked
    if (pressureAngleStatus === true) {
        pressureAngleStatus = true;
        pressureAngleVal=elePressure[i].value
        break;
    }
}

if (pressureAngleStatus === false) {
    setErrorForRaido(pressureAngle, 'Check Valid input');
} else if (pressureAngleStatus === true) {
    setSuccessForRadio(pressureAngle);
    correctPressureAngle=pressureAngleVal;
    isAllInputsAreGiven=true;
    
}

}

function checkProcssInputs() {
    let processVal,processStatus;
    
for (let i = 0; i < eleProcess.length; i++) {  
    processStatus = eleProcess[i].checked    
    if(processStatus===true){
        processStatus=true;
        processVal=eleProcess[i].value;
        
        break;
    }
} 

    if (processStatus === false) {
        setErrorForRaido(manufacturing, 'Check Valid input');   
    } else if(processStatus === true)  {
        setSuccessForRadio(manufacturing);
        correctProcessValue=processVal;
        isAllInputsAreGiven=true;
        
    }


}


const checkPinionMaterial=function() {
    let pinionMaterialVal = pinionMaterial.value;
    if (pinionMaterialVal===''){
        setErrorFor(pinionMaterial, 'Select correct material');
    }
    else {
        setSuccessFor(pinionMaterial);
        correctPinionMaterial=pinionMaterialVal;
        isAllInputsAreGiven=true;

    }
}

const checkGearMaterial=function() {
    let gearMaterialVal = gearMaterial.value;
    if (gearMaterialVal===''){
        setErrorFor(gearMaterial, 'Select correct material');
    }
    else {
        setSuccessFor(gearMaterial);
        correctGearMaterial=gearMaterialVal;
        isAllInputsAreGiven=true;

    }
}

const checkGrade=function() {
    let selectedGradeVal = selectedGrade.value;
    if (selectedGradeVal===''){
        setErrorFor(selectedGrade, 'Select Correct Grade');
    }
    else {
        setSuccessFor(selectedGrade);
        correctGrade=selectedGradeVal;
        isAllInputsAreGiven=true;


    }
}




function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = message;
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}


// for radio buttons

function setErrorForRaido(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
   small.style.visibility='visible'
    small.innerText = message;
}

function setSuccessForRadio(input) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
   small.style.visibility='hidden';
}









// console.log(findLewisFactor(41));



const checkInputs = function () {
    if (speedOfGear.value === '' && gearRatio.value === '' && speedOfPinion.value === '') {
        // alert('Give proper Input')
        setErrorFor(speedOfPinion, 'Give prorper input')
        setErrorFor(speedOfGear, 'Give prorper input')
        setErrorFor(gearRatio, 'Give prorper input')
       
  
    }
    if (speedOfGear.value === '' && gearRatio.value === '' && speedOfPinion.value >= 1) {
        setSuccessFor(speedOfPinion)
        setErrorFor(speedOfGear, 'Enter value of S.O.G or Gear Ratio')
        setErrorFor(gearRatio, 'Enter value of Gear Ratio or S.O.G')



    } else if (speedOfGear.value !== '' && gearRatio.value === '' && speedOfPinion.value == '') {
        setErrorFor(speedOfPinion, 'Enter value of S.O.P or Gear Ratio')
        setSuccessFor(speedOfGear)
        setErrorFor(gearRatio, 'Enter value of  Gear Ratio or S.O.G')


    } else if (speedOfGear.value === '' && gearRatio.value !== '' && speedOfPinion.value === '') {
        setErrorFor(speedOfPinion, 'Enter value of  S.O.P or S.O.G')
        setErrorFor(speedOfGear, 'Enter value of  S.O.G or S.O.G')
        setSuccessFor(gearRatio)


    } else if (gearRatio.disabled === true && teethOnGear.value === '' && teethOnPinion.value === '') {

        document.getElementById('gearRatio').disabled = false;
        document.getElementById('gearRatio').value = ""


    } else if (speedOfGear.disabled === true &&speedOfPinion.value > 1 &&  gearRatio.value > 1 ) {
        document.getElementById('speedOfGear').disabled = false;
        document.getElementById('speedOfGear').value = ""


    } else if (speedOfPinion.disabled === true) {
        document.getElementById('speedOfPinion').disabled = false;
        document.getElementById('speedOfPinion').value = ""


    } else if (speedOfPinion.value > 1 && speedOfGear.value === '' && gearRatio.value > 1) {

        document.querySelector('#speedOfGear').value = speedOfPinion.value / gearRatio.value;
        correctSpeedOfGear = speedOfPinion.value / gearRatio.value;        
        document.getElementById('speedOfGear').disabled = true;
        setSuccessFor(gearRatio)
        setSuccessFor(speedOfGear)
        setSuccessFor(speedOfPinion)

    } else if (speedOfPinion.value > 1 && speedOfGear.value > 1 && gearRatio.value === '') {
        let gearRatioValues = speedOfPinion.value / speedOfGear.value;
        correcGearRatio= speedOfPinion.value / speedOfGear.value;
        setSuccessFor(gearRatio)
        setSuccessFor(speedOfGear)
        document.querySelector('#gearRatio').value = gearRatioValues;
        document.getElementById('gearRatio').disabled = true;

    } else if (speedOfPinion.value === '' && speedOfGear.value > 1 && gearRatio.value > 1) {
        setSuccessFor(speedOfGear)
        setSuccessFor(speedOfPinion)
        document.querySelector('#speedOfPinion').value = speedOfGear.value * gearRatio.value;
        correctSpeedOfPinion=speedOfGear.value * gearRatio.value;
        
        document.getElementById('speedOfPinion').disabled = true;
        setSuccessFor(gearRatio)

    }

}

// const checkPinion = function () {
//  checkInputs();
// }



//  const checkGear=function(){
//   //speedOfGearVal.onchange(checkInputs());
//   checkInputs();
//  }




//  var checkGearRatio = function () {
//   checkInputs();
//  }





////////////////////////////////////////////////////////////new function
const checkInputsSecond = function () {
debugger
  if (teethOnGear.value >1 && teethOnPinion.value >1 && gearRatio.value==='') {
    if(speedOfPinion.value ==='' && speedOfGear.value === ''){
      let gearRatioVal = teethOnGear.value / teethOnPinion.value;
      correcGearRatio=gearRatioVal;
      document.querySelector('#gearRatio').value = gearRatioVal;
      document.getElementById('gearRatio').disabled = true;
    }
}
    else if (teethOnGear.value === '' && gearRatio.value === '' && teethOnPinion.value >= 1) {
        setSuccessFor(teethOnPinion)
        setErrorFor(teethOnGear, 'Enter value of T.O.G or Gear Ratio')
        setErrorFor(gearRatio, 'Enter value of Gear Ratio or T.O.G')



    } else if (teethOnGear.value !== '' && gearRatio.value === '' && teethOnPinion.value == '') {
        setErrorFor(teethOnPinion, 'Enter value of S.O.P or Gear Ratio')
        setSuccessFor(teethOnGear)
        setErrorFor(gearRatio, 'Enter value of  Gear Ratio or S.O.G')


    } else if (teethOnGear.value === '' && gearRatio.value !== '' && teethOnPinion.value === '') {
        setErrorFor(teethOnPinion, 'Enter value of  S.O.P or S.O.G')
        setErrorFor(teethOnGear, 'Enter value of  S.O.G or S.O.G')
        setSuccessFor(gearRatio)



  }

   else if (gearRatio.disabled === true && speedOfPinion.value === '' || speedOfGear.value === '') {

    document.getElementById('gearRatio').disabled = false;
    document.getElementById('gearRatio').value = ""
   }
   else if (teethOnGear.disabled === true) {

    document.getElementById('teethOnGear').disabled = false;
    document.getElementById('teethOnGear').value = ""
   }
   else if (teethOnPinion.disabled === true) {

    document.getElementById('teethOnPinion').disabled = false;
    document.getElementById('teethOnPinion').value = ""
   }
  else if (teethOnGear.value === '' && teethOnPinion.value >1 && gearRatio.value>1 ) {
    let teethOnGearVal = teethOnPinion.value * gearRatio.value;

    document.querySelector('#teethOnGear').value = teethOnGearVal;
    correctTeethOnGear=teethOnGearVal;
    document.getElementById('teethOnGear').disabled = true;

  } else if (teethOnGear.value >1 && teethOnPinion.value ==='' && gearRatio.value>1 ) {
    let teethOnPinionVal = teethOnGear.value / gearRatio.value;

    document.querySelector('#teethOnPinion').value = teethOnPinionVal;
    correctTeethOnGear=teethOnPinionVal
    document.getElementById('teethOnPinion').disabled = true;


  } 
}






























function submitFunction(){
    checkPower();
    //checkGearRatio();
    //checkSpeedOfGear();
    //checkSpeedOfPinion();
    checkPrssureInputs();
    checkProcssInputs();
    checkPinionMaterial();
    checkGearMaterial();
    checkGrade();
    checkSafteyFactorValue();
    checkServiceFactorValue();
console.log(isAllInputsAreGiven);



const correctObj={
    correctPower,
//correctCenterDistance,
 correctSpeedOfPinion,
 correctSpeedOfGear,
 correcGearRatio,
 correctTeethOnPinion,
 correctTeethOnGear,
 correctServiceFactor,
 correctFactorOfSafety,
 correctProcessValue,
 correctPressureAngle,
 correctPinionMaterial,
 correctGearMaterial,
 correctGrade

}
console.log(correctObj);


}






document.querySelector('#submit').addEventListener('click', submitFunction);


