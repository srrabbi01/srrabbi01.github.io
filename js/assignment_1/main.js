let addItemBtn = document.querySelectorAll('.add-item')
let cartTable = document.querySelector('.cart-table')
let tableRows = cartTable.rows

function itemExistChk(itemId) {
    for (row of tableRows) {
        if (row.dataset.id == itemId) {
            return row
        }
    }
}

addItemBtn.forEach(function (btn) {
    btn.addEventListener('click', function () {
        let itemId = btn.id
        let prodName = this.parentElement.previousElementSibling.children[0].textContent
        let prodPrice = parseFloat(this.parentElement.previousElementSibling.children[1]
            .textContent.replace(/\$|,/g, ''))
        let existRow = itemExistChk(itemId)
        if (existRow) {
            let prevQuantity = parseInt(existRow.children[1].textContent)
            existRow.children[1].textContent = prevQuantity + 1
            existRow.children[2].textContent = `$${(prodPrice * (prevQuantity + 1)).toFixed(2)}`

        } else {
            let tr = document.createElement('tr')
            let cell1 = tr.insertCell(0)
            let cell2 = tr.insertCell(1)
            let cell3 = tr.insertCell(2)
            let cell4 = tr.insertCell(3)

            tr.setAttribute('data-id', itemId)
            cell1.innerHTML = `${prodName}`
            cell2.innerHTML = `1`
            cell3.innerHTML = `$${prodPrice}`
            cell4.innerHTML =
                `<button class="btn-danger btn-xsmall m-0 remove-item">remove</button> `
            cartTable.getElementsByTagName('tbody')[0].appendChild(tr)
        }
        removeItemFunc()

    })
})
removeItemFunc()

function removeItemFunc() {
    document.querySelectorAll('.remove-item').forEach(function (removeBtn) {
        removeBtn.addEventListener('click', function () {
            let selectedRow = this.parentElement.parentElement
            // selectedRow.remove()
            if (selectedRow.parentElement)
                selectedRow.parentElement.removeChild(selectedRow)
        })
    })
}