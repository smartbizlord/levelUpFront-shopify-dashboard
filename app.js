const app = () => {
    const alertButton = getElById("alert-button")
    const menuButton = getElById("profile-button")
    const alertDialog = getElById("alert-dialog")
    const menuDialog = getElById("profile-menu-content")
    const calloutButtons = groupQuerySelector(".callout")
    const accordionToggleButton = getElById("accordion-button")
    const allAccordionSteps = groupQuerySelector(".section")
    const allCheckBoxes = groupQuerySelector(".spinner-check")
    const progressTextElement = getElById("progressText")
    const progressElement = getElById("progress")
    const allMenuButtons = menuDialog.querySelectorAll("ul li button")
    const pricingButton = getElById("selectAPlan")
    alertButton.addEventListener("click", function() {
        menuDialog.classList.add("hidden")
        if (alertDialog.classList.contains("hidden")) {
            // 
            alertButton.setAttribute("aria-expanded", true)
            menuButton.setAttribute("aria-expanded", false)
        } else {
            // 
            alertButton.setAttribute("aria-expanded", false)
        }
        alertDialog.classList.toggle("hidden")
    })
    menuButton.addEventListener("click", function() {
        alertDialog.classList.add("hidden")
        if (menuDialog.classList.contains("hidden")) {
            // 
            menuButton.setAttribute("aria-expanded", true)
            alertButton.setAttribute("aria-expanded", false)
        } else {
            // 
            menuButton.setAttribute("aria-expanded", false)
        }
        menuDialog.classList.toggle("hidden")
        menuDialog.querySelector("ul:first-child li:first-child > button").focus()
    })
    
    calloutButtons.forEach((calloutButton, index) => {
        calloutButton.addEventListener("click", function() {
            const mainEle = querySelector("main")
            const calloutDialog =  mainEle.querySelector("div:first-child")
            calloutDialog.classList.toggle("hidden")
        })
    })
    
    accordionToggleButton.addEventListener("click", function() {
        const constantDisplay = querySelector(".constant-show")
        if (constantDisplay.classList.contains("not-shown")) {
            // 
            accordionToggleButton.setAttribute("aria-expanded", true)
        } else {
            // 
            accordionToggleButton.setAttribute("aria-expanded", false)
        }
        constantDisplay.classList.toggle("not-shown")
        console.log(constantDisplay, "constantDisplay")
    })


    allAccordionSteps.forEach((item, index) => {
        item.addEventListener("click", function() {
            closeAllSteps(allAccordionSteps)
            item.classList.toggle("active")
        })
    })


    allCheckBoxes.forEach((item, index) => {
        const currentCountArr = [];
        item.querySelector(".loading").classList.add("hidden")
        item.querySelector(".completed").classList.add("hidden")
        item.addEventListener("click", function() {
            const currentSVG = item.querySelector("svg")
            const allSVGs = item.querySelectorAll("svg")
            const loadingSVG = item.querySelector(".loading")
            const completedSVG = item.querySelector(".completed")
            const notCompletedSVG = item.querySelector(".not-completed")
            console.log(currentSVG)
            if (currentSVG.classList.contains("hidden")) {
                completedSVG.classList.add("hidden")
                loadingSVG.classList.remove("hidden")
                setTimeout(() => {
                    loadingSVG.classList.add("hidden")
                    notCompletedSVG.classList.remove("hidden")
                    item.classList.remove("checked")
                    console.log(allCheckBoxes, "all the buttons")

                    currentCountArr.length = 0
                    
                    allCheckBoxes.forEach((item, index) => {
                        console.log(item, "item")
                        if (item.classList.contains("checked")) {
                            console.log(item, "item checked")
                            currentCountArr.push(`item - ${index}`) + 1
                        }
                    })

                    console.log(currentCountArr, "the current count")
                    
                    progressElement.value = currentCountArr.length
                    progressTextElement.textContent = `${currentCountArr.length}/5 completed`
                    // console.log((completedCountData.filter((data) => data != null && data != undefined))?.length, "current length")
                    // progressElement.value = (completedCountData.filter((data) => data != null && data != undefined))?.length
                }, 2000);
            } else {
                notCompletedSVG.classList.add("hidden")
                loadingSVG.classList.remove("hidden")
                setTimeout(() => {
                    loadingSVG.classList.add("hidden")
                    completedSVG.classList.remove("hidden")
                    item.classList.add("checked")

                    currentCountArr.length = 0

                    allCheckBoxes.forEach((item, index) => {
                        console.log(item, "item")
                        if (item.classList.contains("checked")) {
                            console.log(item, "item checked")
                            currentCountArr.push(`item - ${index}`) + 1
                        }
                    })
                    
                    progressElement.value = currentCountArr.length
                    progressTextElement.textContent = `${currentCountArr.length}/5 completed`
                    closeAllSteps(allAccordionSteps)
                    allAccordionSteps[index + 1].classList.add("active")
                    allCheckBoxes[index + 1].focus()
                }, 2000);
            }
            console.log(item.querySelectorAll("svg"), "mumu")
            console.log(currentSVG, "currentSVG -", index)
        })
    })

    allMenuButtons.forEach((item, index) => {
        // 
        // console.log(item, "button", index)
        item.addEventListener("click", function() {
            // console.log("button clicked")
            window.open("https://admin.shopify.com")
        })
        item.addEventListener("keyup", (e) => {
            if (e.code == "ArrowUp" || e.code == "ArrowLeft") {
                handleBackMovement(index, allMenuButtons)
            } else if (e.code == "ArrowDown" || e.code == "ArrowRight") {
                handleFrontMovement(index, allMenuButtons)
            } else if (e.code == "Escape") {
                menuButton.setAttribute("aria-expanded", false)
                menuDialog.classList.toggle("hidden")
                menuButton.focus()
            }
        })
    })

    pricingButton.addEventListener("click", function() {
        window.open("https://shopify.com/pricing")
    })

    console.log(allCheckBoxes, "allCheckBoxes")
    console.log(progressElement, "progressElement")
}
// not-shown

const getElById = (id) => {
    return document.getElementById(id)
}

const querySelector = (id) => {
    return document.querySelector(id)
}

const groupQuerySelector = (id) => {
    return document.querySelectorAll(id)
}

const toggleADialog = (button, dialog) => {
    button.querySelector("[")
}

const closeAllSteps = (arr) => {
    arr.forEach((item) => {
        item.classList.remove("active")
    })
}

const handleBackMovement = (index, elArray = []) => {
    if (elArray.length < 1) return;
    const elArraylength = elArray.length;
    if (index == 0) {
        (elArray[elArraylength - 1]).focus()
    } else {
        (elArray[index - 1]).focus()
    }
}

const handleFrontMovement = (index, elArray = []) => {
    if (elArray.length < 1) return;
    const elArraylength = elArray.length;
    if (index == elArraylength - 1) {
        (elArray[0]).focus()
    } else {
        (elArray[index + 1]).focus()
    }
}





app()