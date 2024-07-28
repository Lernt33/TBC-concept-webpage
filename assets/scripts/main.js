const add_info_btn = document.querySelector('.additional-information')
add_info_btn.addEventListener('click', () => {
    const open_svg = add_info_btn.querySelector('.opened')
    const closed_svg = add_info_btn.querySelector('.closed')
    closed_svg.classList.toggle('hidden-element')
    open_svg.classList.toggle('hidden-element')
    open_svg.style.display = 'block'
    add_info_btn.parentElement.querySelectorAll('.component').forEach((el) => {
            if (el.style.display == 'none' || !el.style.display) {
                el.style.display = 'flex'
            }
            el.classList.toggle('hidden-element')
        }
    )
})

const popup_close=document.querySelector('.close-popup')
const popup_open = document.querySelector('.pop_up_opener')
const form = document.querySelector('.pop_up_form')
popup_open.addEventListener('click',()=>{
    form.style.removeProperty('display')
    form.classList.remove('hidden-element')
    // ყოველი შემთხვევისთვის
    setTimeout(()=>{
        form.style.display = 'block'
    },600)
})
popup_close.addEventListener('click',()=>{
    form.classList.add('hidden-element')
    setTimeout(()=>{
        form.style.display = 'none'
    },600)
})