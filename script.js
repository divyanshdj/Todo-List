const todoForm = document.querySelector("form");
const todoInput = document.getElementById("todo-input");
const todoListUL = document.getElementById("todo-list");

let allTodos = getTodos();
updateTodoList();

todoForm.addEventListener("submit", function (e) {
	e.preventDefault();
	addTodo();
});


function addTodo() {
	const todoText = todoInput.value.trim();
	if (todoText.length > 0) {
		const todoObj = {
			text: todoText,
			completed: false
		};
		allTodos.push(todoObj);
		updateTodoList();
		saveTodos();
		todoInput.value = "";
	}
}

function updateTodoList() {
	todoListUL.innerHTML = "";
	allTodos.forEach((todo, todoIndex) => {
		todoItem = createTodoItem(todo, todoIndex);
		todoListUL.append(todoItem);
	});
}

function createTodoItem(todo, todoIndex) {
	const todoId = "todo-" + todoIndex;
	const todoLi = document.createElement("li");
	const todoTEXT = todo.text;
	todoLi.className = "todo";
	todoLi.innerHTML = `
    <input type="checkbox" name="" id="${todoId}">
    <label for="${todoId}" class="custom-checkbox">
        <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
    </label>
    <label for="${todoId}" class="todo-text">
        ${todo.text}
    </label>
    <button class="edit-button">
        <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h405l-60 60H180v600h600v-348l60-60v408q0 24-18 42t-42 18H180Zm300-360ZM360-360v-170l382-382q9-9 20-13t22-4q11 0 22.317 4.5T827-911l83 84q8.609 8.958 13.304 19.782Q928-796.394 928-785.197q0 11.197-4.5 22.697T910-742L530-360H360Zm508-425-84-84 84 84ZM420-420h85l253-253-43-42-43-42-252 251v86Zm295-295-43-42 43 42 43 42-43-42Z"/></svg>
    </button>
    <button class="delete-button">
        <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
    </button>
    `;
	const editButton = todoLi.querySelector(".edit-button");
	editButton.addEventListener("click", () => {
		editTodoItem(todoIndex);
	});
	const deleteButton = todoLi.querySelector(".delete-button");
	deleteButton.addEventListener("click", () => {
		deleteTodoItem(todoIndex);
	});
	const checkbox = todoLi.querySelector("input");
	checkbox.addEventListener("change", () => {
		allTodos[todoIndex].completed = checkbox.checked;
		saveTodos();
	});
	checkbox.checked = todo.completed;
	return todoLi;
}

function editTodoItem(todoIndex) {
    const todoTextLabel = document.querySelector(`.todo:nth-child(${todoIndex + 1}) .todo-text`);
    const todoText = todoTextLabel.textContent.trim();

    // Check if the todo text is empty
    if (todoText === "") {
        // If empty, return without doing anything
        return;
    }

    const todoInputField = document.createElement("input");
    todoInputField.type = "text";
    todoInputField.value = todoText;

    todoInputField.style.padding = "13px 0px";
    todoInputField.style.marginLeft = "10px";
    todoInputField.style.width = "100%";
    todoInputField.style.background = "none";
    todoInputField.style.font = "inherit";
    todoInputField.style.color = "var(--text-color)";
    todoInputField.style.caretColor = "var(--accent-color)";
    todoInputField.style.outline = "none"; 
    todoInputField.style.borderColor = "transparent";

    todoInputField.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            const trimmedValue = todoInputField.value.trim();
            if (trimmedValue !== "") {
                allTodos[todoIndex].text = trimmedValue;
                saveTodos();
                updateTodoList();
            }
        }
    });
    todoTextLabel.replaceWith(todoInputField);
    todoInputField.focus();
}

function deleteTodoItem(todoIndex) {
	allTodos = allTodos.filter((_, i) => i !== todoIndex);
	saveTodos();
	updateTodoList();
}

function saveTodos() {
	const todoJson = JSON.stringify(allTodos);
	localStorage.setItem("todos", todoJson);
}

function getTodos() {
	const todos = localStorage.getItem("todos") || "[]";
	return JSON.parse(todos);
}

// function changeColors() {
//     const colorInput = document.getElementById("colorInput");
//     const todoWrapper = document.getElementById("todoWrapper");
//     const mainHeading = document.getElementById("mainHeading");

//     const newColor = colorInput.value;
//     todoWrapper.style.setProperty("--accent-color", newColor);
//     mainHeading.style.color = newColor;
// }
