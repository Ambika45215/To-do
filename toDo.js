// get itms from local storage

let toDo = JSON.parse(localStorage.getItem('ToDo')) || []

// get inputs from input field and add them to the right page 

let page = document.getElementById('rightPageForm');

let dateSection = document.getElementById('dateSection');


function save() {
    // last object from array of toDo
    let lastDetails = toDo[toDo.length - 1];

    // date today
    let date = new Date();
    let dateToday = date.toDateString();

    // items from input
    let items = document.getElementById('list').value.trim();

    // if empty item
    if (items == "") return;

    // checking lastDetails to create new object or use same last object according to date
    if (lastDetails && lastDetails.Date === dateToday) {
        lastDetails.list.push(items);
    }

    else {
        // to create new object details in array toDo 
        let details = { Date: dateToday, list: [items] };
        toDo.push(details)
    }

    // saving toDo to local storage
    localStorage.setItem('ToDo', JSON.stringify(toDo));

    //adding task to page 
    dateSection.innerText = dateToday;
    page.innerHTML += `<label for="task-${Date.now()}" class="FormDetails"><input type="checkbox" id="task-${Date.now()}">${items}</label>`

    // clearing input field 
    document.getElementById('list').value = ''
}

// window on reload
window.onload = function () {
    displayTask();
}

function displayTask() {
    // to clear previous content
    page.innerHTML = ""

    // empty ntg to show
    if (toDo.length == 0) { return; }
    else {
        // last object from array of toDo
        let lastDetails = toDo[toDo.length - 1];

        //adding task to page 
        dateSection.innerText = lastDetails.Date;

        lastDetails.list.forEach((element, index) => {
            page.innerHTML += `<label for="task-${index}" class="FormDetails"><input type="checkbox" id="task-${index}">${element}</label>`
        });
    }
}

// localStorage.clear()