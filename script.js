const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

function displayItems(){
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach((item) => addIemToDOM(item));
    checkUI();
}

function onAddItemSubmit(e){
    e.preventDefault();

    //Validate Input 
    const newItem =  itemInput.value;
    if( newItem === ""){
        alert('Please add an item');
        return;
    }
    // Create item DOM element
    addIemToDOM(newItem);

    // Add item to local storage
    addItemToStorage(newItem);

    checkUI();

    itemInput.value = "";
}

function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}

function addIemToDOM(item){
     // Create a list item 
     const li = document.createElement('li');
     li.appendChild(document.createTextNode(item));
 
     const button = createButton('remove-item btn-link text-red');
     
     li.appendChild(button);
 
     //Add li to the DOM
     itemList.appendChild(li);

}

function addItemToStorage(item){
    
    const itemsFromStorage = getItemsFromStorage();

    // Add new item to array
    itemsFromStorages.push(item);

    // Convert to JSON string and set to local storage
    localStorage.setItem('items',JSON.stringify(itemFromStorage));
}

function getItemsFromStorage(){
    let itemFromStorage;

    if(localStorage.getItem('items')=== null){
        itemFromStorage = [];
    }else{
        itemFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemFromStorage;
}

function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

function removeItem (e){
    if(e.target.parentElement.classList.contains('remove-item')){
       if(confirm('Are you sure?')){
        e.target.parentElement.parentElement.remove();
        checkUI();
       }
        
    }
}

function clearItems(){
    while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild);
    }
    checkUI();
}

function filterItems(e){
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();

    items.forEach((item) =>{
        const itemName = item.firstChild.textContent.toLowerCase();
        
        if(itemName.indexOf(text) != -1){
            item.style.display = 'flex';
        }else{
            item.style.display = 'none';
        }




    })
}

function checkUI(){
    const items = itemList.querySelectorAll('li');

    if(items.length === 0){
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    }else{
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }
}

// Event Listeners

itemForm.addEventListener('submit',onAddItemSubmit);
itemList.addEventListener('click',removeItem)
clearBtn.addEventListener('click',clearItems);
itemFilter.addEventListener('input',filterItems);
document.addEventListener('DOMContentLoaded',displayItems);
checkUI();

