const render = (todosList) => {
  fetch("https://jsonplaceholder.typicode.com/todos?_start=0&_limit=10")
    .then((response) => response.json())
    .then((json) => {
   
      const sortedTodos = todosList.list.sort((a, b) => a.index - b.index);
      const todosContainer = document.querySelector(".todos");
      let todosHtml = "";

	  if(sortedTodos.length == 0){
		json.forEach(({ completed, description, id,title }) => {
			const checkedTodo = completed ? "checked" : "";
			const checkClass = completed ? "checked" : "";
			todosHtml += `  <ul class="todo-item">
						  <li>
							  <button id="${id}" class="remove-btn"> <i class="fas fa-trash-alt"></i></button>
							  <input id="${id}" class="todo-edit ${checkClass}" type="text" value="${title}" />
							  <input id="${id}" class="todo-check" type="checkbox" ${checkedTodo} />
						  </li>
						</ul>
		`;
		  });
	
	  }else{
      sortedTodos.forEach(({ completed, description, id }) => {
        const checkedTodo = completed ? "checked" : "";
        const checkClass = completed ? "checked" : "";
        todosHtml += `  <ul class="todo-item">
                      <li>
                          <button id="${id}" class="remove-btn"> <i class="fas fa-trash-alt"></i></button>
                          <input id="${id}" class="todo-edit ${checkClass}" type="text" value="${description}" />
                          <input id="${id}" class="todo-check" type="checkbox" ${checkedTodo} />
                      </li>
                    </ul>
    `;
      });

	  }

      todosContainer.innerHTML = todosHtml;

      // remove todo
      const removeBtns = document.querySelectorAll(".remove-btn");
      removeBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const element = btn.parentNode.parentNode;
          console.log(element);
          element.remove();
          todosList.removeTodo(e.target.parentNode.id);
        });
      });

      // edit todo
      const todosContent = document.querySelectorAll(".todo-edit");
      todosContent.forEach((todo) => {
        todo.addEventListener("input", (e) => {
          todosList.editTodo(e.target.id, e.target.value);
        });
      });

      // Complete Todo
      const todosCheck = document.querySelectorAll(".todo-check");
      todosCheck.forEach((todo) => {
        todo.addEventListener("change", (e) => {
          const { id } = e.target;
          todosList.completeTodo(id, e.target.checked);
          e.target.parentNode.lastElementChild.classList.toggle("checked");
        });
      });
    });
};

export default render;
