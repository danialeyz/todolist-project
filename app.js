//!main selectors
const todoText = document.querySelector("#text-input");
const addButton = document.querySelector(".add-button");
const listContainer = document.querySelector(".tasks-list");
const filterOption = document.querySelector(".select");

//!event listeners
listContainer.addEventListener("click", removeComplete);
addButton.addEventListener("click", add);
filterOption.addEventListener("click", filter);
document.addEventListener("DOMContentLoaded", getItemsLocal);

//add todo list items function
function add(item) {
    item.preventDefault();
    const userTask = todoText.value;
    //adding new elements to DOM
    const newLi = document.createElement("li"); // creating main container
    newLi.classList.add("list-item");

    // A validation that input field should not be empty. |if empty then show an alert|
    if (userTask.trim() === "") {
        alert('Task cannot be empty')
    } 
    else {
        const newItems = ` 
    <h4 class = "item-text">${userTask}</h4>
      <button class="remove trash">
      <h1>blank</h1>
        <svg
        class = "removeSvg"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path 
            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </button>
      `;
        newLi.innerHTML = newItems; // for adding li items to ul
        // append element to main container
        listContainer.appendChild(newLi);
        saveItemsLocal(todoText.value);
        todoText.value = "";
    }
}

// Remove item and completed items function
function removeComplete(e) {
    const className = [...e.target.classList];
    const item = e.target;

    //remove
    if (className[0] === "remove") {
        const parent = item.parentElement;

        removeItemsLocal(parent);
        parent.remove();
    } else if (className[0] === "list-item") {
        item.classList.toggle("completed");
    } // complete
}

//filter option function
function filter(e) {
    // console.log(listContainer.childNodes);
    const todoChilds = [...listContainer.childNodes];

    todoChilds.forEach((item) => {
        switch (e.target.value) {
            //all item
            case "all":
                item.style.display = "flex";
                break;

            //completed item
            case "completed":
                if (item.classList.contains("completed")) {
                    item.style.display = "flex";
                } else {
                    item.style.display = "none";
                }
                break;

            //uncompleted item
            case "uncompleted":
                if (item.classList.contains("completed")) {
                    item.style.display = "none";
                } else {
                    item.style.display = "flex";
                }
                break;
        }
    });
}

//local storage settings functions

//save items to local storage
function saveItemsLocal(todo) {
    let savedTodos = localStorage.getItem("todos")
        ? JSON.parse(localStorage.getItem("todos"))
        : [];

    savedTodos.push(todo);
    localStorage.setItem("todos", JSON.stringify(savedTodos));
}

function getItemsLocal(todo) {
    let savedTodos = localStorage.getItem("todos")
        ? JSON.parse(localStorage.getItem("todos"))
        : [];
    console.log(savedTodos);
    savedTodos.forEach((todo) => {
        const newLi = document.createElement("li"); // creating main container
        newLi.classList.add("list-item");
        const newItems = ` 
  <h4 class = "item-text">${todo}</h4>
    <button class="remove trash">
    <h1>blank</h1>
      <svg
      class = "removeSvg"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path 
          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
        />
      </svg>
    </button>
    `;
        newLi.innerHTML = newItems; // for adding li items to ul
        // append element to main container
        listContainer.appendChild(newLi);
    });
}

//for removing removed items from local storage
function removeItemsLocal(parent) {
    let savedTodos = localStorage.getItem("todos")
        ? JSON.parse(localStorage.getItem("todos"))
        : [];
    const filteredTodos = savedTodos.filter(
        (e) => e !== parent.children[0].innerText
    );
    localStorage.setItem("todos", JSON.stringify(filteredTodos));
}