let options = document.querySelectorAll('input[name="options"]')
let checkBtn = document.querySelector('.check-btn')
let uInput = document.querySelector('.uinput')

checkBtn.addEventListener('click', function () {
    let checked
    for (option of options) {
        if (option.checked) {
            checked = parseInt(option.value)
            regExChk(checked)
            break
        }
    }
    if (!checked)
        alert("No option selected !!!")
})

function regExChk(checked) {
    let regExFormate
    if (checked == 1)
        regExFormate = /^([a-zA-Z0-9].?)+[^.]@([a-zA-Z0-9].?)+[^.]$/;
    else if (checked == 2)
        regExFormate = /^(\+)?(88)?01([0-9]){9}$/;
    else if (checked == 3)
        regExFormate = /^\d{4}$/;

    uInpVal = uInput.value
    if (uInpVal == "") {
        alert("Input Field it's empty!");
    } else if (regExFormate.test(uInpVal)) {
        alert("input type valid!");
    } else {
        alert("input type invalid!");
    }
}