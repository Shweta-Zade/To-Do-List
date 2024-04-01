// Get Elements by Id
let cardlistEl = document.getElementById("cardlist");
let inputEl = document.getElementById("inputvalue");

// Local Storage Arraylist
let todoList = getParsedTodoList();
let newValue = getNewIndex();

// Local Host for Data store of indexvalue
function getNewIndex(){
    let myIndex = localStorage.getItem("indexToDo");
    let myIndexvalue = JSON.parse(myIndex);
    if(myIndexvalue === null){
        return todoList.length;
    } else {
        return myIndexvalue;
    }
}

// Local Host for Data store of todoList
function getParsedTodoList(){
    let myStoredTodo = localStorage.getItem("myTodo");
    let parsedTodoList = JSON.parse(myStoredTodo);
    if(parsedTodoList === null){
        return [];
    }
    else{
        return parsedTodoList;
    }
}

  
// Save Task in Local Storage
function onSaveTodo(){
    let locallyStoredList = JSON.stringify(todoList);   
    localStorage.setItem("myTodo",locallyStoredList);

    let newindexvalue = JSON.stringify(newValue);
    localStorage.setItem("indexToDo",newindexvalue);
  }

// Function for Line-through on task
function checkboxfun(bulletid, taskid, items){
    let bulletidEl = document.getElementById(bulletid);
    let taskidEl = document.getElementById(taskid);

    if(bulletidEl.checked === true){
        taskidEl.classList.add("text-line");
        items.isChecked = true;
        
    } else {
        taskidEl.classList.remove("text-line");
        items.isChecked = false;
    }
}

// Function for deleting TASK Card
function deletetaskfun(cardid, itemsid){
    let cardidEl = document.getElementById(cardid);
    cardidEl.style.display = "none";
    todoList.splice(itemsid,1);
}


// Calling function for each task
for (let items of todoList) {
    todocreate(items);          // Calling todocreate() function
}

// Function for create single task card
function todocreate(items){
    let bulletid = "bulletid" + items.uniqueId;
    let labelid = "labelid" + items.uniqueId;
    let taskid = "taskid" + items.uniqueId;
    let cardid = "cardid" + items.uniqueId;

    let carddiv = document.createElement("div");
    carddiv.classList.add("card-style");
    carddiv.id = cardid;
    cardlistEl.appendChild(carddiv);

    let bulletEl = document.createElement("input");
    bulletEl.type = "checkbox";
    bulletEl.id = bulletid;
    bulletEl.classList.add("bullet")
    carddiv.appendChild(bulletEl);
    bulletEl.onclick = function(){
        checkboxfun(bulletid, taskid, items);
    }

    let labelEl = document.createElement("label");
    labelEl.htmlFor = bulletid;
    labelEl.id = labelid;
    labelEl.classList.add("label-style");
    carddiv.appendChild(labelEl);

    let taskEl = document.createElement("p");
    taskEl.textContent = items.title;
    taskEl.id = taskid;
    if(items.isChecked == true){
        taskEl.classList.add("text-line"); 
        bulletEl.checked = true;
    } else {
        taskEl.classList.remove("text-line"); 
        bulletEl.checked = false;
    }
    labelEl.appendChild(taskEl);

    let deleteEl = document.createElement("img");
    deleteEl.classList = "delete";
    deleteEl.src = "./delete.png";
    deleteEl.onclick = function(){
        deletetaskfun(cardid,taskid);
    }
    labelEl.appendChild(deleteEl);
}


// Function for Submit Button
function submitfun(){
    let lengtharr = newValue + 1;
    let valueEl = inputEl.value;

    if(valueEl===""){
        alert("please enter a valit input");
    } else {
        let newTodo = {
            title:valueEl,
            uniqueId:lengtharr,
            isChecked:false
        }    
        todoList.push(newTodo);
        inputEl.value = "";
        todocreate(newTodo);
    }
    newValue = newValue + 1;
}

