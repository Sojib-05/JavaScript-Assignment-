// all element selected

const data = new Date();
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEdit = document.querySelector("#cancel-edit-btn");

let oldInputValue;

// date ane time selected
const timeElapsed = Date.now();
const today = new Date(timeElapsed);
document.getElementById("date").innerHTML = today.toDateString();

function time(){
    const data = new Date();
    let h = data.getHours();
    let m = data.getMinutes();
    let s = data.getSeconds();

    if( h < 10)
        h = "0" +h ;
    if( m < 10)
        m = "0" + m ;
    if( s < 10)
        s = "0" + s ;

    document.getElementById("hour").innerHTML = h +":"+ m + ":" + s;
    setTimeout('time()', 500)
}


todoForm.addEventListener("submit", (e)=> {
    e.preventDefault();

    const inputValue = todoInput.value;
    if(inputValue)
        saveTodo(inputValue); //save
})

const saveTodo = (text) =>{
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = " <i class='bx bx-check'></i>";
    todo.appendChild(doneBtn);


    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = "  <i class='bx bxs-pencil'></i>";
    todo.appendChild(editBtn);


    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-todo");
    removeBtn.innerHTML = "<i class='bx bx-x'></i>";
    todo.appendChild(removeBtn);

    todoList.appendChild(todo);
    todoInput.value = "";
    todoInput.focus();

}


document.addEventListener("click", (e)=> {
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    let todoTitle;

    if(parentEl && parentEl.querySelector("h3"))
        todoTitle = parentEl.querySelector("h3").innerText;

    if(parentEl.classList.contains("finish-todo"))
        parentEl.classList.toggle("done");

    if(parentEl.classList.contains("remove-todo"))
        parentEl.remove();

    if(parentEl.classList.contains("edit-todo")){
        toggleForms();
        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }
})

const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
}


cancelEdit.addEventListener("click", (e)=> {
    e.preventDefault();
    toggleForms();
})

editForm.addEventListener("submit", (e)=> {
    e.preventDefault();

    const editInputValue = editInput.value;
    if(editInputValue)
        updateTodo(editInputValue) //Update value function
    toggleForms();
})


const updateTodo = (text) => {
    const todo = document.querySelectorAll(".todo");
    todo.forEach((todo)=> {
        let todoTitle = todo.querySelector("h3");

        if(todoTitle.innerText === oldInputValue)
            todoTitle.innerText = text;
    })
}