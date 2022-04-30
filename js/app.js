//Императивный или процедуальный стиль написания кода - были глобальные переменные и несколько функций для изменения этих переменных;

const main = (function () {
  // IIFE (Immediately Invoked Function Expression) это JavaScript функция, которая выполняется сразу же после того, как она была определена.

  function createElement(tag, props, ...children) {
    const element = document.createElement(tag);

    // for (let prop in props) {
    //   if()
    //   element[prop] = props[prop]; // element.className = props.className;
    // }

    Object.keys(props).forEach((key) => (element[key] = props[key]));

    if (children.length > 0) {
      children.forEach((child) => {
        element.append(child);
      });
    }

    return element;
  }

  function createTodoItem(title) {
    const checkbox = createElement("input", {
      type: "checkbox",
      className: "checkbox",
    });
    const label = createElement("label", { className: "title" }, title);

    const editInput = createElement("input", {
      type: "text",
      className: "textfield",
    });

    const editButton = createElement(
      "button",
      { className: "edit" },
      "Изменить"
    );

    const deleteButton = createElement(
      "button",
      { className: "delete" },
      "удалить"
    );

    const listItem = createElement(
      "li",
      { className: "todo-item" },
      checkbox,
      label,
      editInput,
      editButton,
      deleteButton
    );

    bindEvents(listItem);

    return listItem;
  }

  function bindEvents(todoItem) {
    const checkbox = todoItem.querySelector(".checkbox");
    const editButton = todoItem.querySelector("button.edit");
    const deleteButton = todoItem.querySelector("button.delete");

    checkbox.addEventListener("change", toggleTotItem);
    editButton.addEventListener("click", editTodoItem);
    deleteButton.addEventListener("click", deleteTodoItem);
  }

  function addTodoItem(event) {
    event.preventDefault();

    if (addInput.value === "") {
      return alert("Необходимо ввести название задачи");
    }

    const todoItem = createTodoItem(addInput.value);

    todoList.appendChild(todoItem);
    addInput.value = "";
  }

  function toggleTotItem() {
    const listItem = this.parentNode;
    listItem.classList.toggle("completed");
  }

  function editTodoItem() {
    const listItem = this.parentNode;
    const title = listItem.querySelector(".title");
    const editInput = listItem.querySelector(".textfield");
    const isEditing = listItem.classList.contains("editing");

    if (isEditing) {
      title.innerText = editInput.value;
      this.innerText = "изменить";
    } else {
      editInput.value = title.innerText;
      this.innerText = "Сохранить";
    }

    listItem.classList.toggle("editing");
  }
  function deleteTodoItem() {
    const listItem = this.parentNode;
    todoList.removeChild(listItem);
  }

  const todoForm = document.getElementById("todo-form");
  const addInput = document.getElementById("add-input");
  const todoList = document.getElementById("todo-list");
  const todoItems = document.querySelectorAll(".todo-item");

  function main() {
    todoForm.addEventListener("submit", addTodoItem);
    todoItems.forEach((item) => bindEvents(item));
  }

  return main;
})();

main();
