const txtBoxAddTodo = document.querySelector("#add-todo");
const btnAddTodo = document.querySelector("#todo-ekle");
const txtSearchTodo = document.querySelector("#search-todo");
const btnRemoveAllTodo = document.querySelector(".todo-sil");
const todoListesi = document.querySelector(".list-group");
const firstContainer = document.querySelector(".container-first");
const secondContainer = document.querySelector(".container-second");

todos = [];

runevents();

function runevents() {
    document.addEventListener("DOMContentLoaded", pageLoaded)
    secondContainer.addEventListener("click", removeTodo);
    txtSearchTodo.addEventListener("keyup",filter);
}

function pageLoaded() {
    checkToStorage();
    todos.forEach(function (todo) {
        addToUI(todo);
    });
}

function filter(e){
    const todoList = document.querySelectorAll(".list-group-item");
    if(todoList.length>0){
        const value=e.target.value.toLowerCase().trim();
        todoList.forEach(function(todo){
            if(todo.textContent.toLowerCase().trim().includes(value)){
                todo.setAttribute("style","display: block");
            }
            else{
                todo.setAttribute("style", "display: none !important");
            }
        });

    }
    else{
        showAlert("danger","Filtreleme yapılabilmesi için en az bir adet todo olamlıdır!");
    }
}

function addToUI(inputText) { //arayüze todo eklemek

    /*<li class="list-group-item d-flex justify-content-between">Todo 1
                    <a href="#" class="delete-item">
                        <i class="fa fa-remove"></i>
                    </a>
                </li>*/
    const newLi = document.createElement("li");
    const newLink = document.createElement("a");
    const newi = document.createElement("i");

    newi.className = "fa fa-remove";
    newLink.className = "delete-item";
    newLink.href = "#";
    newLi.className = "list-group-item d-flex justify-content-between";
    newLi.textContent = inputText;

    newLink.appendChild(newi);
    newLi.appendChild(newLink);
    todoListesi.appendChild(newLi);

    txtBoxAddTodo.value = "";


}

function checkToStorage() {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}

function addTodoToStorage(inputText) {
    checkToStorage();
    todos.push(inputText);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo() {
    //arayüze eklemek 
    const inputText = txtBoxAddTodo.value.trim();
    if (inputText == "" || inputText == null) {
        showAlert("warning", "Lütfen geçerli bir değer giriniz!");
    }
    else {
        addToUI(inputText);
        //hafızaya eklemek
        addTodoToStorage(inputText);
        showAlert("success", "Todo başarıyla eklendi.");
    }

}

function showAlert(type, message) {
    /*<div class="alert alert-success" role="alert">
                        This is a success alert—check it out!
                      </div>*/
    const div = document.createElement("div");
    div.className = "alert alert-" + type;
    div.textContent = message;
    firstContainer.appendChild(div);

    setTimeout(function () {
        div.remove();
    }, 2300);
}

function removeFromUI(e) {
    if (e.target.className === "fa fa-remove") {
        const todo = e.target.parentElement.parentElement;
        todo.remove();
        //storageden silme
        removeFromStorage(todo.textContent);
        showAlert("success", "Todo başarı ile silindi.");
    }
}

function removeFromStorage(removeTodo) {
    checkToStorage();
    todos.forEach(function (todo, index) {
        if (removeTodo == todo) {
            todos.splice(index, 1);
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

function removeTodo(e) {
    //ön yüzden silme
    removeFromUI(e);


}
function removeAllTodos() {
    const todoListe = document.querySelectorAll(".list-group-item");
    
    if (todoListe.length <= 0)
        showAlert("danger","En az bir tane todo bulunmalıdır!");
    else {
        let i = 0;
        while (todoListesi.children[i] != null) {
            todoListesi.children[i].remove();
        }
        localStorage.clear();
        showAlert("success","Tüm todolar başarı ile silindi.");
    }

}

