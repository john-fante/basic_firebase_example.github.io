import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-c063f-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")


const inputFieldEl = document.getElementById('input-field')
const addButtonEl = document.getElementById('add-button')
const shoppingListEl = document.getElementById('shopping-list')



addButtonEl.addEventListener('click', function () {
    let inputValue = inputFieldEl.value

    push(shoppingListInDB, inputValue)

    clearInputFieldEl()


})


onValue(shoppingListInDB, function(snapshot){

    if(snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val())

        console.log(snapshot.val())

        clearInputFieldEl()
        clearShoppingListEl()

        for(let i=0; i<itemsArray.length; i++){
            let currentItem = itemsArray[i]

            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            appendItemToshoppingListEl(currentItem)
        }
    } else {
        shoppingListEl.innerHTML = "No items here... yet"
    }



})


function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}


function clearInputFieldEl(){
    inputFieldEl.value =""
}

function appendItemToshoppingListEl(item){

    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")

    newEl.textContent = itemValue

    let exactLocationOfItemInDB = ref(database,`shoppingList/${itemID}`)

    newEl.addEventListener("click", function(){
        remove(exactLocationOfItemInDB)
    })
    
    shoppingListEl.append(newEl)


}


