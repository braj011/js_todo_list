
const addBtn = document.querySelector('#add-item')
let localListItems
const listItemsContainer = document.querySelector('#list-items-container')
const completedItemsContainer = document.querySelector('#completed-items-container')
const todoForm = document.querySelector('.container') 
let addTodo = false
let displayCompleted = false
const titleInput = document.querySelector('.input-title')
const dueDateInput = document.querySelector('.input-due-date')
const showCompletedBtn = document.querySelector('#show-completed')

let itemCount = 0
const itemCounter = document.querySelector('#item-counter')
// let node = document.createElement("p");  


// features
// 1a) DONE Add items - render on page + add to json server - using API call
// 1b) DONE don't optimistically render - add to server first 
// 2) Be able to delete (cross off) an item with a checkbox type delete function 
// 3) add a counter for number of items completed and number of items remaining
// 4a) rank items in order of due date (means that due date entry needs to be consistent )
// 4b) if item has no due date - it comes last 

// get the list items from the server

API.getListItems()
  .then(listItemsFromServer => {
    localListItems = listItemsFromServer
    appendListItems(listItemsFromServer)
    })

function appendListItems (items) {
  items.forEach(item => {
    const listItem = renderItem(item)
    if (!item.completedStatus) {  
      listItemsContainer.appendChild(listItem)
      ++itemCount
      itemCounter.innerHTML = `Items remaining: ${itemCount}`
    }
    else {
      completedItemsContainer.appendChild(listItem)
    }
  })
}

function renderItem(item) {
  const listItem = document.createElement('li') // make this a card so that I can format each to-do item better
  listItem.classList.add('list-item')
  listItem.innerHTML = `
    ${item.title} || ${item.dueDate}
    <input type="checkbox" class="cross-item" id="cross_${item.id} name="cross" value="Remove"><br>
  `
  const crossBtn = listItem.querySelector('.cross-item') 
  crossBtn.addEventListener('click', () => {
    API.crossListItem(item.id, item.completedStatus)
    
      .then(returnItem => { debugger
        if (!returnItem.completedStatus) {
          ++itemCount
          listItem.style.textDecoration = "solid"
          itemCounter.innerHTML = `Items remaining: ${itemCount}`
        } else {
          --itemCount
          listItem.style.textDecoration = "line-through"
          itemCounter.innerHTML = `Items remaining: ${itemCount}`
        }
      }) 
  })
  // if (!item.completedStatus) {
  //   ++itemCount
  //   itemCounter.innerHTML = `Items remaining: ${itemCount}`
  // }
  return listItem
}

addBtn.addEventListener('click', () => {
  addTodo = !addTodo
  if (addTodo) {
    todoForm.style.display = 'block' 
    addBtn.innerText = "-"
  } else {
    todoForm.style.display = 'none'
    addBtn.innerText = "+"
  }
  // !!addTodo ? todoForm.style.display = 'block' : todoForm.style.display = 'none' && addBtn.innerText = "-"
})

todoForm.addEventListener('submit', event => {
  event.preventDefault()
  const title = titleInput.value
  const dueDate = dueDateInput.value
  const newItem = {
    title: title,
    dueDate: dueDate,
    completedStatus: false
  }
  API.addListItem(newItem)
    .then(newItem => { 
      const newListItem = renderItem(newItem)
      listItemsContainer.appendChild(newListItem)
    }) 
  debugger
  API.getListItems()
  // itemCounter.innerHTML = `Items remaining: ${itemCount - 1}`
  event.target.reset()
  todoForm.style.display = 'none'
})

showCompletedBtn.addEventListener('click', () => {
  displayCompleted = !displayCompleted
  if (!displayCompleted) {
    completedItemsContainer.style.display = "none" 
    showCompletedBtn.innerHTML = "⬇"
  } else {
    completedItemsContainer.style.display = "block"
    showCompletedBtn.innerHTML = "⬆"
  }
})



