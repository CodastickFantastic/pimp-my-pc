let isVertical = true //Used by rotateGpu() function
let displayComponents = document.getElementById("pc-components")
let displayComponentButton = document.querySelectorAll("button")

const componentsList = {
    motherboards : [
        {
            name: "MB1",
            img: "img/PC_Components/Motherboards/MB1.png",
            price: "1000.00 zł"
        },
        {
            name: "MB2",
            img: "img/PC_Components/Motherboards/MB-MSI.png",
            price: "800.00 zł"
        },
        {
            name: "MB3",
            img: "img/PC_Components/Motherboards/MB1.png",
            price: "1200.00 zł"
        },
        {
            name: "MB4",
            img: "img/PC_Components/Motherboards/MB1.png",
            price: "700.00 zł"
        }
    ],
    gpus : [
        {
            name: "GPU1",
            img: "img/PC_Components/GPUs/GPU-Aorus.png",
            img2: "img/PC_Components/GPUs/GPU-Aorus-Normal.png",
            price: "4000.00 zł"
        },
        {
            name: "GPU2",
            img: "img/PC_Components/GPUs/GPU-Aorus.png",
            price: "5500.00 zł"
        },
        {
            name: "GPU3",
            img: "img/PC_Components/GPUs/GPU-Aorus.png",
            price: "6000.00 zł"
        },
        {
            name: "GPU4",
            img: "img/PC_Components/GPUs/GPU-Aorus.png",
            price: "1000.00 zł"
        }
    ],
    powersupplys: [
        {
            name: "Powersupply 1",
            img: "img/PC_Components/Powersupply/TT-Powersupply.png",
            price: "4000.00 zł"
        },
        {
            name: "Powersupply 2",
            img: "img/PC_Components/Powersupply/TT-Powersupply.png",
            price: "5500.00 zł"
        },
        {
            name: "Powersupply 3",
            img: "img/PC_Components/Powersupply/TT-Powersupply.png",
            price: "6000.00 zł"
        },
        {
            name: "Powersupply 4",
            img: "img/PC_Components/Powersupply/TT-Powersupply.png",
            price: "1000.00 zł"
        }
    ],
    ssds: [
        {
            name: "SSD 1",
            img: "img/PC_Components/SSD/SSD.png",
            price: "4000.00 zł"
        },
        {
            name: "SSD 2",
            img: "img/PC_Components/SSD/SSD.png",
            price: "5500.00 zł"
        },
        {
            name: "SSD 3",
            img: "img/PC_Components/SSD/SSD.png",
            price: "6000.00 zł"
        },
        {
            name: "SSD 4",
            img: "img/PC_Components/SSD/SSD.png",
            price: "1000.00 zł"
        }
    ],
    pumps: [
        {
            name: "SSD 1",
            img: "img/PC_Components/Pump/Pump1.png",
            price: "4000.00 zł"
        },
        {
            name: "SSD 2",
            img: "img/PC_Components/Pump/Pump1.png",
            price: "5500.00 zł"
        },
        {
            name: "SSD 3",
            img: "img/PC_Components/Pump/Pump1.png",
            price: "6000.00 zł"
        },
        {
            name: "SSD 4",
            img: "img/PC_Components/Pump/Pump1.png",
            price: "1000.00 zł"
        }
    ]
}

let myBuild = [
    {myMotherBoard:""},
]

function displaySpecificComponentsList(returnFromAddComponent) {
    // Get component name to display from HTML sheet
    let componentType = (typeof returnFromAddComponent === "string") ? returnFromAddComponent : this.getAttribute("componentType")
    
    //Clear component menu before append new elements
    displayComponents.innerHTML = "";
    
    //Iterate through PC component list
    for(let i = 0; i < componentsList[componentType].length; i++){
        let componentFrame = document.createElement("div")
            componentFrame.setAttribute("class", "component-frame")
        let componentName = document.createElement("h4")
            componentName.innerHTML = componentsList[componentType][i].name
        let componentPrice = document.createElement("p")
            componentPrice.innerHTML = componentsList[componentType][i].price    
        let componentImg = document.createElement("img")
            componentImg.setAttribute('src',componentsList[componentType][i].img)
        
        // Append new DIV to display all list element dynamically
        componentFrame.appendChild(componentImg)
        componentFrame.appendChild(componentName)
        componentFrame.appendChild(componentPrice)
        componentFrame.addEventListener('click',() => addComponent(i, componentType))
       
        displayComponents.appendChild(componentFrame)
    }
}

function addComponent(i, componentType){    
    // Add specific component to PC
    let componentPicture = componentsList[componentType][i].img
    let componentImg = document.createElement("img")
    let componentDiv = document.getElementById(componentType)
    let pcWorkbench = document.getElementById("pc-img")
    
    componentImg.setAttribute("src", componentPicture)
    componentImg.addEventListener("click", () => displaySpecificComponentsList(componentType))
    
    //Add posobility to rotate GPU
    if(componentType === "gpus"){
        componentImg.setAttribute("id", i+componentType)
        let rotateButton = document.createElement("button")
        let rotatePicture = document.createElement("img")
        let rotateButtonDescription = document.createElement("p")
        let checkButtonExistance = document.getElementById("rotate-gpu");
        rotateButtonDescription.innerHTML = "Change GPU Position"
        
        
        if( checkButtonExistance == undefined){ 
            console.log("nie widać ") 
            rotateButton.setAttribute("id", "rotate-gpu")
            rotateButton.addEventListener("click", () => rotateGPU(i, componentType))

            rotatePicture.setAttribute("src", "img/Icons/rotate.png" )
            
            rotateButton.append(rotatePicture)
            rotateButton.append(rotateButtonDescription)
            pcWorkbench.append(rotateButton)
        }
    }
    componentDiv.append(componentImg)
}


function rotateGPU(i, componentType){
    let gpuImgDestroy = document.getElementById(i+componentType)
    let normalGpuDiv = document.getElementById("normal-gpu-standing")
    let normalGpuPositionImg = document.createElement("img")
    
    if (isVertical == true){
        gpuImgDestroy.remove()
        normalGpuPositionImg.setAttribute("src", componentsList[componentType][i].img2)
        normalGpuPositionImg.addEventListener("click", () => displaySpecificComponentsList(componentType))
        normalGpuDiv.append(normalGpuPositionImg)
        isVertical = false
    } else {
        normalGpuDiv.removeChild(normalGpuDiv.lastChild);
        addComponent(i, componentType)
        isVertical = true
    }
}


displayComponentButton.forEach(button => {
    button.addEventListener('click',displaySpecificComponentsList)
})
