const nav_elements = document.querySelectorAll('.nav-drop-element');
nav_dropdown_background = document.querySelector('.nav-rest');
nav_elements.forEach(el => {
    el.addEventListener('focus', (e) => {
        nav_dropdown_background.style.display = 'block';
        document.getElementById(`nav-dropcontent-${el.attributes[1].value}`).style.display = 'flex';
    })
})
nav_elements.forEach(el => {
    el.addEventListener('focusout', (e) => {
            nav_dropdown_background.style.display = 'none';
            document.getElementById(`nav-dropcontent-${el.attributes[1].value}`).style.display = 'none';
    })

})
