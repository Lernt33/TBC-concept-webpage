const nav_elements = document.querySelectorAll('.nav-drop-element');
const nav_dropdown_background = document.querySelector('.nav-rest');
const drop_contents = document.querySelector('.dropdown-content')
// const
nav_elements.forEach(el => {
    el.addEventListener('focus', (e) => {
        nav_dropdown_background.style.display = 'block';
        nav_dropdown_background.classList.remove('hidden-element');
        document.getElementById(`nav-dropcontent-${el.attributes[1].value}`).style.display = 'flex';
    })
})
nav_elements.forEach(el => {
    el.addEventListener('focusout', (e) => {
        nav_dropdown_background.classList.add('hidden-element');
        document.getElementById(`nav-dropcontent-${el.attributes[1].value}`).style.display = 'none';
    })

})

document.querySelector('.burger').addEventListener('click', function () {
    this.classList.toggle('active');
    const navRestMobile = document.querySelector('.nav-rest-mobile');
    if (navRestMobile.style.display === 'none') {
        navRestMobile.style.display = 'block';
    }
    navRestMobile.classList.toggle('hidden-element')
    ;

})

document.querySelectorAll('.dropdown-arroy-image').forEach(el => {
    el.parentElement.addEventListener('click', () => {
        // turnign off all dropdowns
        document.querySelectorAll('.dropdown-box').forEach(el2 => {
            if (el2.querySelector('.reversed') && el.parentElement !== el2) {
                el2.querySelector('.reversed').classList.remove('reversed')
                el2.querySelector('.dropdown-active').classList.add('dropdown-hidden')
                el2.querySelector('.dropdown-active').classList.remove('dropdown-active')
                el2.classList.remove('increased-height')
                el2.parentElement.style.backgroundColor = 'white'
            }
        })
        el.classList.toggle('reversed');
        const content = el.parentElement.querySelector('.dropdown-content')
        if (content.style.display === 'none') {
            content.style.display = 'flex'
        }
        content.classList.toggle('dropdown-active')
        content.classList.toggle('dropdown-hidden')
        const contentFather = el.parentElement
        contentFather.classList.toggle('increased-height')
        // if (contentFather.parentElement.style.backgroundColor === 'white' || !contentFather.parentElement.style.backgroundColor) {
        //     contentFather.parentElement.style.background = 'linear-gradient(to top, white 32px, transparent 32px 100%), linear-gradient(to bottom, white 32px, transparent 32px 100%)'
        // }
        // else{
        //     contentFather.parentElement.style.backgroundColor = 'white'
        // }
    })
})