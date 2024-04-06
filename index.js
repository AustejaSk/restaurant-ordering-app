import { menuArray } from './data.js'

const orderDetailsContainer = document.getElementById("order-details-container")
const checkoutModal = document.getElementById("checkout-modal")
const paymentForm = document.getElementById("payment-form")

let totalPrice = 0


document.addEventListener("click", function(e){
    if(e.target.dataset.add){
        handleAddClick(e.target.dataset.add)
    }
    if(e.target.dataset.remove){
        handleRemoveClick(e.target.dataset.remove)
    }
    if(e.target.id === "complete-order-btn"){
        handleCompleteOrderBtn()
    }
    
    if (!checkoutModal.contains(e.target) && !checkoutModal.classList.contains("hidden") && e.target.id !== "complete-order-btn") {
        checkoutModal.classList.add("hidden");
    }
})

paymentForm.addEventListener('submit', function(e){
    e.preventDefault()

    checkoutModal.classList.add("hidden")
    orderDetailsContainer.classList.add("hidden")

    const paymentFromData = new FormData(paymentForm)
    const name = paymentFromData.get('name')

    document.getElementById("order-complete-message-container").innerHTML = `
        <div class="message-container">
            <h1 class="message">Thanks, ${name}! Your order is on its way!</h1>
        </div>
        `
})


function handleAddClick(itemId){
    orderDetailsContainer.classList.contains("hidden") ? orderDetailsContainer.classList.toggle("hidden") : ''
    
    const selectedItem = menuArray.filter(item => item.id.toString() === itemId)[0]

    totalPrice += selectedItem.price

    document.getElementById("added-item-container").innerHTML += `
    <div class="added-item-inner" data-id="${itemId}">
        <div class="added-item">
            <h3 class="added-item-title">${selectedItem.name}</h3>
            <button class="remove-btn" data-remove="${itemId}">remove</button>
        </div>
        <h5>$${selectedItem.price}</h5>
    </div>`

    renderTotalPrice()
}


function handleRemoveClick(itemId){
    const itemContainers = document.querySelectorAll(".added-item-inner")
    itemContainers.forEach(container => {
        if(container.getAttribute("data-id") === itemId){
            const selectedItem = menuArray.find(item => item.id.toString() === itemId)
            totalPrice -= selectedItem.price
            container.remove()
        }
    })
    renderTotalPrice()

    if(document.querySelectorAll(".added-item-inner").length === 0){
        orderDetailsContainer.classList.toggle("hidden")
    }
}


function renderTotalPrice(){
    document.getElementById("total-price-container").innerHTML = `
        <h3>Total price:</h3>
        <h5>$${totalPrice}</h5>`
}

function handleCompleteOrderBtn(){
    checkoutModal.classList.contains("hidden") ? checkoutModal.classList.toggle("hidden") : ''
}


function getMenuItemsHtml(arr){
    let menuHtml = arr.map(item => `
        <div class="item-inner">
            <img class="item-img" src="${item.image}">
            <div class="item-info-container">
                <h3>${item.name}</h3>
                <h4>${item.ingredients}</h4>
                <h5>$${item.price}</h5>
            </div>
            <button class="add-btn">
                <img class="add-btn-img" src="/images/add-btn.png" data-add="${item.id}">
            </button>
        </div>`
    ).join('')

    return menuHtml
}

function renderMenuItems(arr){
    document.getElementById("items-container").innerHTML = getMenuItemsHtml(arr)
}


renderMenuItems(menuArray)