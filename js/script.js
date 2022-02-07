const collectList = (array, id) => {
    const doc = document.getElementById(id)
    const firstChild = doc.firstChild.nextSibling

    array.forEach((person) => {
        const element = document.createElement("p")
        element.innerText = person.name
        doc.insertBefore(element, firstChild)
    })

}

const collectParticipants = () => {
    document.querySelector('.start-btn').innerText = 'WAITING...'

    fetch('https://gp-js-test.herokuapp.com/pizza')
        .then((response) => response.json())
        .then((data) => {
            const button = document.querySelector(".start_button")
            button.parentNode.removeChild(button)
            const participants = data.party
            collectList(participants, "drop-all")
            collectList(participants.filter(el => el.eatsPizza), "eats-drop")

            createPizza(participants.filter(el => el.eatsPizza))
        })


}

const createPizza = (eatingPizza) => {
    document.getElementById("circle").classList.toggle('hide')
    document.getElementById("circle").classList.add('circle')
    const articleDiv = document.getElementById("circle")
    const firstElem = articleDiv.firstChild.nextSibling
    let notEnoughPizza = []

    for (let i = 0; i < eatingPizza.length; i++) {

        if (i == 12) {
            notEnoughPizza = eatingPizza.slice(i, eatingPizza.length)
            collectList(notEnoughPizza, "not-enought-drop")
            break
        }
        const elementLi = document.createElement('li')
        const elementDiv = document.createElement('div')
        const text = document.createTextNode(eatingPizza[i].name.split(' ')[1])

        elementDiv.appendChild(text)

        elementDiv.style.position = "absolute"
        elementDiv.style.left = "-100%"
        elementDiv.style.width = "200%"
        elementDiv.style.height = "200%"
        elementDiv.style.textAlign = "center"
        elementDiv.style.transform = "skewY(60deg) rotate(15deg)"
        elementDiv.style.paddingTop = "20px"

        elementLi.appendChild(elementDiv)
        elementLi.style.transform = `rotate(${30 * i}deg) skewY(-60deg)`

        articleDiv.insertBefore(elementLi, firstElem)
    }
    if (eatingPizza.length <= 12) {
        collectList([{ name: "Everyone had enough pizza" }], "not-enought-drop")
    }

    const description = document.getElementById("decription")
    description.classList.remove("start")
    description.classList.add("decription")
    description.innerText = `THE PIZZA WAS DIVIDED INTO ${eatingPizza.length <= 12? eatingPizza.length : 12} PARTS`
}

const beginningParty = () => {
    collectParticipants()
    document.getElementById("wrap").classList.toggle("wrap")
}

const showParticipants = (event) => {
    document.getElementById(event.currentTarget.querySelector(".dropdown-content").id).classList.toggle("show");
}

window.onclick = (event) => {
    if (!event.target.matches('.dropbtn')) {

        const dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}