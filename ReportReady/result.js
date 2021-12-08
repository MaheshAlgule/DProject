if (localStorage.length === 2) {


    const inputVal = JSON.parse(localStorage.getItem('StoreInputs'));
    for (let [key, value] of Object.entries(inputVal)) {

        let inputsDiv = document.querySelector('#inputs')

        let newInput = document.createElement('tr')
        let parameter = document.createElement('th')
        let valueOfParameter = document.createElement('th')

        parameter.innerHTML = `${key}`;
        valueOfParameter.innerHTML = `${value}`;

        newInput.appendChild(parameter)
        newInput.appendChild(valueOfParameter)
        inputsDiv.appendChild(newInput)
    }


    const output1 = JSON.parse(localStorage.getItem('resultObj'));
    for (let [key, value] of Object.entries(output1)) {

        let inputsDiv = document.querySelector('#outputs')

        let newInput = document.createElement('tr')
        let parameter = document.createElement('th')
        let valueOfParameter = document.createElement('th')

        parameter.innerHTML = `${key}`;
        valueOfParameter.innerHTML = `${value}`;

        newInput.appendChild(parameter)
        newInput.appendChild(valueOfParameter)
        inputsDiv.appendChild(newInput)

    }
    localStorage.clear()

}else if(localStorage.length === 3){
  


        const inputVal = JSON.parse(localStorage.getItem('StoreInputs'));
        for (let [key, value] of Object.entries(inputVal)) {
    
            let inputsDiv = document.querySelector('#inputs')
    
            let newInput = document.createElement('tr')
            let parameter = document.createElement('th')
            let valueOfParameter = document.createElement('th')
    
            parameter.innerHTML = `${key}`;
            valueOfParameter.innerHTML = `${value}`;
    
            newInput.appendChild(parameter)
            newInput.appendChild(valueOfParameter)
            inputsDiv.appendChild(newInput)
        }
    
    
        const output1 = JSON.parse(localStorage.getItem('resultObj'));
        for (let [key, value] of Object.entries(output1)) {
    
            let inputsDiv = document.querySelector('#outputs')
    
            let newInput = document.createElement('tr')
            let parameter = document.createElement('th')
            let valueOfParameter = document.createElement('th')
    
            parameter.innerHTML = `${key}`;
            valueOfParameter.innerHTML = `${value}`;
    
            newInput.appendChild(parameter)
            newInput.appendChild(valueOfParameter)
            inputsDiv.appendChild(newInput)
    
        }
        
        const output2 = JSON.parse(localStorage.getItem('result2Obj'));
        for (let [key, value] of Object.entries(output2)) {
    
            let inputsDiv = document.querySelector('#outputs')
    
            let newInput = document.createElement('tr')
            let parameter = document.createElement('th')
            let valueOfParameter = document.createElement('th')
    
            parameter.innerHTML = `${key}`;
            valueOfParameter.innerHTML = `${value}`;
    
            newInput.appendChild(parameter)
            newInput.appendChild(valueOfParameter)
            inputsDiv.appendChild(newInput)
    
        }
    

        localStorage.clear()



    }





//}

