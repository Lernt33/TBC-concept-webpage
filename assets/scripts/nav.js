const nav_elements = document.querySelectorAll('.nav-drop-element');
const nav_dropdown_background = document.querySelector('.nav-rest');
const drop_contents = document.querySelector('.dropdown-content')
const config = {
    1: false, 2: false, 3: false,
}
nav_elements.forEach(el => {
    el.addEventListener('focus', (e) => {
        nav_dropdown_background.style.display = 'block';
        nav_dropdown_background.classList.remove('hidden-element');
        document.getElementById(`nav-dropcontent-${el.attributes[1].value}`).style.display = 'flex';
        config[`${el.attributes[1].value}`] = true
    })
})
nav_elements.forEach(el => {
    el.addEventListener('focusout', (e) => {
        setTimeout(() => {
            const temp = []
            for (let [key, value] of Object.entries(config)) {
                if (key !== el.attributes[1].value) {
                    temp.push(value)
                }
            }
            if (temp.every(el => el === false)) {
                nav_dropdown_background.classList.add('hidden-element');
                setTimeout(() => {
                    nav_dropdown_background.style.display = 'none'
                }, 600)
            }
            document.getElementById(`nav-dropcontent-${el.attributes[1].value}`).style.display = 'none';
            config[`${el.attributes[1].value}`] = false
        }, 100)
    })
})

document.querySelector('.burger').addEventListener('click', function () {
    this.classList.toggle('active');
    const navRestMobile = document.querySelector('.nav-rest-mobile');
    if (navRestMobile.style.display === 'none') {
        navRestMobile.style.display = 'block';
    }
    if (navRestMobile.classList.length < 3) {
        setTimeout(() => {
            navRestMobile.style.display = 'none'
        }, 500)

    } else {
        setTimeout(() => {
            navRestMobile.style.display = 'block'
        }, 600)
    }
    navRestMobile.classList.toggle('hidden-element');

})

document.querySelectorAll('.dropdown-arroy-image').forEach(el => {
    el.parentElement.parentElement.addEventListener('click', () => {
        // turnign off all dropdowns
        document.querySelectorAll('.dropdown-box').forEach(el2 => {
            if (el2.querySelector('.reversed') && el.parentElement.parentElement !== el2) {
                el2.querySelector('.reversed').classList.remove('reversed')
                el2.querySelector('.dropdown-active').classList.add('dropdown-hidden')
                el2.querySelector('.dropdown-active').classList.remove('dropdown-active')
                el2.classList.toggle(`increased-height${el2.attributes[0].value}`)
            }
        })
        el.classList.toggle('reversed');
        const content = el.parentElement.parentElement.querySelector('.dropdown-content')
        if (content.style.display === 'none') {
            content.style.display = 'flex'
        }
        content.classList.toggle('dropdown-active')
        content.classList.toggle('dropdown-hidden')
        const contentFather = el.parentElement.parentElement
        setTimeout(() => contentFather.classList.toggle(`increased-height${contentFather.attributes[0].value}`), 100)
    })
})