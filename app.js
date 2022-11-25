let isVertical = true //Used by rotateGpu() function
let bruttoPrice = 0
let displayComponents = document.getElementById("pc-components")
let displayComponentButton = document.querySelectorAll("button")



const componentsList = {
    motherboards : [
        {
            name: "Gigabyte<br>B450 AORUS PRO",
            img: "img/PC_Components/Motherboards/MB-Aorus.png",
            price: 665.00
        },
        {
            name: "MSI<br>MPG Z590 GAMING PLUS",
            img: "img/PC_Components/Motherboards/MB-MSI.png",
            price: 769.00
        },
        {
            name: "ASUS ROG<br>MAXIMUS Z690 EXTREME GLACIAL",
            img: "img/PC_Components/Motherboards/MB-Rog.png",
            price: 9024.31
        },
        {
            name: "ASRock<br>Z690 Taichi",
            img: "img/PC_Components/Motherboards/MB-Asrock.png",
            price: 2719.00
        }
    ],
    gpus : [
        {
            name: "Gigabyte<br>GeForce RTX 3070 Ti AORUS MASTER",
            img: "img/PC_Components/GPUs/GPU-Aorus.png",
            img2: "img/PC_Components/GPUs/GPU-Aorus-Normal.png",
            price: 4349.00
        },
        {
            name: "MSI<br>GeForce RTX 3070 Ti GAMING X TRIO",
            img: "img/PC_Components/GPUs/GPU-MSI.png",
            img2: "img/PC_Components/GPUs/GPU-MSI-Normal.png",
            price: 4449.00
        },
        {
            name: "ASUS<br>GeForce RTX 3070 Ti ROG STRIX",
            img: "img/PC_Components/GPUs/GPU-Asus.png",
            img2: "img/PC_Components/GPUs/GPU-Asus-Normal.png",
            price: 3889.00
        },
        {
            name: "Gigabyte<br>GeForce RTX 3080 Ti AORUS MASTER",
            img: "img/PC_Components/GPUs/GPU-Aorus.png",
            img2: "img/PC_Components/GPUs/GPU-Aorus-Normal.png",
            price: 5849.00
        },
        {
            name: "MSI<br>GeForce RTX 3080 Ti GAMING X TRIO",
            img: "img/PC_Components/GPUs/GPU-MSI.png",
            img2: "img/PC_Components/GPUs/GPU-MSI-Normal.png",
            price: 5678.00
        },
        {
            name: "ASUS<br>GeForce RTX 3080 Ti ROG STRIX",
            img: "img/PC_Components/GPUs/GPU-Asus.png",
            img2: "img/PC_Components/GPUs/GPU-Asus-Normal.png",
            price: 5239.00
        }
    ],
    powersupplys: [
        {
            name: "ThermalTake<br>Toughpower GF1 850W 80 Plus Gold RGB",
            img: "img/PC_Components/Powersupply/TT-Powersupply.png",
            price: 950.00
        },
        {
            name: "ThermalTake</br>Toughpower Riing 1200W 80 Plus Platinum",
            img: "img/PC_Components/Powersupply/TT2-Powersupply.png",
            price: 1429.00
        },
        {
            name: "CoolerMaster<br>XG Plus 850W 80 Plus Platinum",
            img: "img/PC_Components/Powersupply/CoolerMaster-Powersupply.png",
            price: 1249.00
        },
        {
            name: "Corsair<br>RM1000e 1000W 80 Plus Gold",
            img: "img/PC_Components/Powersupply/Corsair-Powersupply.png",
            price: 899.00
        }
    ],
    ssds: [
        {
            name: "Adata<br>SSD SE900G 1 TB",
            img: "img/PC_Components/SSD/SSD.png",
            price: 747.00
        },
        {
            name: "TEAM GROUP<br>Delta Max 1TB SSD",
            img: "img/PC_Components/SSD/SSD2.png",
            price: 479.00
        },
        {
            name: "Adata<br>SSD SE770 512GB",
            img: "img/PC_Components/SSD/SSD3.png",
            price: 420.00
        }
    ],
    pumps: [
        {
            name: "Corsair<br>XD5 RGB",
            img: "img/PC_Components/Pump/Pump1.png",
            price: 900.00
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

        let componentDescription = document.createElement("div")
            componentDescription.setAttribute("class", "component-description")    

        let componentName = document.createElement("h4")
            componentName.innerHTML = componentsList[componentType][i].name

        let componentPrice = document.createElement("p")
            componentPrice.innerHTML = componentsList[componentType][i].price    

        let componentImg = document.createElement("img")
            componentImg.setAttribute('src',componentsList[componentType][i].img)
        
        // Append new DIV to display all list element dynamically

        componentDescription.appendChild(componentName)
        componentDescription.appendChild(componentPrice)
        componentFrame.appendChild(componentImg)
        componentFrame.appendChild(componentDescription)
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

    //Clear DIV before inserting IMG
    componentDiv.innerHTML = ""
    
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
        
        
        if( checkButtonExistance){ 
            checkButtonExistance.remove()
        }
        rotateButton.setAttribute("id", "rotate-gpu")
        rotateButton.addEventListener("click", () => rotateGPU(i, componentType))

        rotatePicture.setAttribute("src", "img/Icons/rotate.png" )
            
        rotateButton.append(rotatePicture)
        rotateButton.append(rotateButtonDescription)
        pcWorkbench.append(rotateButton)

    }
    componentDiv.append(componentImg)
    addPriceToCart(i, componentType)
    cartPrice()
}

function addPriceToCart(i, componentType){
    let place
    let price
    let costDiv

    switch (componentType){
        case "motherboards":
            place = "motherboard-price"
            price = componentsList[componentType][i].price
            break
        case "gpus":
            place = "gpu-price"
            price = componentsList[componentType][i].price
            break
        case "powersupplys":
            place = "powerSupply-price"
            price = componentsList[componentType][i].price
            break
        case "ssds":
            place = "ssd-price"
            price = componentsList[componentType][i].price
            break
        case "pumps":
            place = "pump-price"
            price = componentsList[componentType][i].price
            break
    }
    
    costDiv = document.getElementById(place)
    costDiv.innerHTML = price + " zł"
}

function cartPrice(){
    let prices = Array.from(document.getElementsByClassName("finalPriceHandler"))
    let bruttoSpan = document.getElementById("total-brutto-cost")
    

    prices.forEach(price =>{
        if(price.textContent === "Item not selected" ){
            console.log("String Value")
        } else {
            bruttoPrice += parseInt(price.textContent)
        }
    })

    bruttoSpan.innerHTML = ""
    bruttoSpan.innerHTML = bruttoPrice + " zł"
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