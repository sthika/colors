document.addEventListener("keydown", event =>{
    event.preventDefault()
     if (event.code === "Space") {
        setRandomColors()
     }
})

document.addEventListener("click", event =>{
    const type = event.target.dataset.type

    if (type === "lock") {
        const node = 
            event.target.tagName.toLowerCase() === "i" ? event.target : event.target.children[0]
        node.classList.toggle("fa-lock-open")
        node.classList.toggle("fa-lock")
        } else if (type === "copy") {
            copyToClick(event.target.textContent)
        }
})

const columns = document.querySelectorAll(".column") 

let generateColor = () => {
    const hex = "0123456789ABCDEF"

    let color = ""
    for (i=0; i < 6; i++) {
        color = color + hex[Math.floor(Math.random() * hex.length)]
    }
    return "#"+ color 
}

let  copyToClick = (text) => {
    return navigator.clipboard.writeText(text)
}

let setRandomColors = () => {
    const colors =  []

    columns.forEach((el) => {
        const isLocked = el.querySelector("i ").classList.contains("fa-lock")
        const text = el.querySelector("h2")
        const button = el.querySelector("button")
        // const color = generateColor()
        const color = chroma.random()

        if (isLocked) {
            colors.push(text.textContent)
            return
        }
        colors.push(color)

        text.textContent = color
        el.style.background = color

        setTextColor(text, color)
        setTextColor(button, color)
    })
    updateColorsHash(colors )
}

let setTextColor = (text,color) => {
    const luminance = chroma(color).luminance()
    return text.style.color = luminance > 0.5 ? "black" : "white"
}

let updateColorsHash = (colors = []) => {
    document.location.hash = colors.map((el) => {
         return el.toString().substring(1)
    }).join("-") 
}

let getColorFromHash = () => {
    if(document.location.hash.length > 1) {
        return document.location.hash.substring(1).split("-").map(color => "#" + color)
    } else {
        return [ ]
    }
}
setRandomColors()
