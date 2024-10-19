import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push , onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: 'https://kart-ed7b6-default-rtdb.europe-west1.firebasedatabase.app/'
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value

    push(shoppingListInDB, inputValue)

    clearInputField()

    appendItemToShoppingList(inputValue)
})

onValue(shoppingListInDB, function(snapshot){
    let itemsArray = Object.values(snapshot.val())
    for(let i = 0; i < itemsArray.length; i++){
        console.log(itemsArray[i])
    }
})

function clearInputField() {
    inputFieldEl.value = ""
}

function appendItemToShoppingList(itemValue){
    shoppingListEl.innerHTML += `<li>${itemValue}</li>`
}