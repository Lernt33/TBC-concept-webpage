function ValidateNumber(len) {
    return len >= 9
}

function Validatemail(email) {
    let re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
}


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
    })
})

const popup_close = document.querySelector('.close-popup')
const popup_open = document.querySelector('.pop_up_opener')
const form = document.querySelector('.pop_up_form')
popup_open.addEventListener('click', () => {
    form.style.removeProperty('display')
    form.classList.remove('hidden-element')
    // ყოველი შემთხვევისთვის
    setTimeout(() => {
        form.style.display = 'block'
    }, 600)
})
popup_close.addEventListener('click', () => {
    form.classList.add('hidden-element')
    setTimeout(() => {
        form.style.display = 'none'
    }, 600)
})

valid = {
    name:false,
    number:false,
    email:false,
    text:false
}

const inputs = document.querySelectorAll('.main-form input,textarea')
inputs.forEach(input => {
    input.addEventListener('focus', (ev) => {
        input.parentElement.querySelector('label').style.top = '4px'
        input.parentElement.querySelector('label').style.fontSize = '12px'
    })

    input.addEventListener("focusout", (ev) => {
        if (input.value.length > 0) {
            input.parentElement.querySelector('label').style.top = '4px'
            input.parentElement.querySelector('label').style.fontSize = '12px'
        } else {
            input.parentElement.querySelector('label').style.top = '16px'
            input.parentElement.querySelector('label').style.fontSize = '14px'
        }
        //
        if (input.classList.contains('required-input')) {
            if (input.value.length == 0) {
                valid[input.id] = false
                input.style.borderColor = 'red'
                input.parentElement.querySelector('.required').style.display = 'block'
            } else if (input.id == 'email' && input.value.length > 0) {
                if (Validatemail(input.value)) {
                    valid[input.id] = true
                    input.style.borderColor = '#eef1f1'
                    input.parentElement.querySelector('.required').style.display = 'none'
                } else {
                    valid[input.id] = false
                    input.parentElement.querySelector('.required').textContent = 'შეყვანილი მეილი არასწორია'
                    input.parentElement.querySelector('.required').style.display = 'block'
                }
            } else if (input.id == 'number' && input.value.length > 0) {
                if (input.value.length >= 9) {
                    valid[input.id] = true
                    input.style.borderColor = '#eef1f1'
                    input.parentElement.querySelector('.required').style.display = 'none'
                } else {
                    valid[input.id] = false
                    input.parentElement.querySelector('.required').textContent = 'მინიმალური ციფრების რაოდენობა - 9'
                    input.parentElement.querySelector('.required').style.display = 'block'
                }
            } else if (input.id == 'text' && input.value.length > 0) {
                if (input.value.length <= 100) {
                    valid[input.id] = true
                    input.style.borderColor = '#eef1f1'
                    input.parentElement.querySelector('.required').style.display = 'none'
                } else {
                    valid[input.id] = false
                    input.parentElement.querySelector('.required').textContent = 'მაქსიმალური რაოდენობის სიმბოლოა'
                    input.parentElement.querySelector('.required').style.display = 'block'
                }
            } else {
                valid[input.id] = true
                input.style.borderColor = '#eef1f1'
                input.parentElement.querySelector('.required').style.display = 'none'
            }
        }
    })
})

const text_area = document.querySelector('textarea')
text_area.addEventListener('keydown', () => {
    text_area.parentElement.querySelector('.counter').textContent = `${text_area.value.length}/100`
    if (text_area.value.length > 100) {
        text_area.parentElement.querySelector('.counter').style.color = 'red'
    } else {
        text_area.parentElement.querySelector('.counter').style.color = '#555F62'
    }
})
const button = document.getElementById('submitbutton')
inputs.forEach(input => {
    input.addEventListener('keyup', (ev) => {
        const temp = []
        for (const [key, value] of Object.entries(valid)) {
            temp.push(value)
        }
        if (temp.every((el)=>el===true) && document.getElementById("checkbox").checked){
            button.disabled=false
        }
        else{
            button.disabled=true

        }
    })
})


document.addEventListener('DOMContentLoaded', () => {
    const allUNFocusableElements = document.querySelectorAll('a, [tabindex]');
    allUNFocusableElements.forEach(element => {
        element.setAttribute('tabindex', '-1');
    });
    const allFocusableElements = document.querySelectorAll('h4','h1','img','h2');
    allFocusableElements.forEach(element => {
        element.setAttribute('tabindex', '1');
    });
});
