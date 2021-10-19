import { state } from "../../state";

export function initHomePage(containerEl) {
  const div = document.createElement("div");
  const tasks = state.getEnabledTasks();
  div.innerHTML = `
  <h1>Mis pendientes</h1>
    <button class="add-button">Agregar task</button>  
    <ul class="lista" style="display: grid;gap: 10px;"></ul>    
  `;

  const listaEl = div.querySelector(".lista");

  function createTasks(items) {
    listaEl.innerHTML = "";
    for (const item of items) {
      const todoItemEl = document.createElement("todo-item");
      todoItemEl.setAttribute("title", item.title);
      todoItemEl.setAttribute("id", item.id);
      if (item.completed) {
        todoItemEl.setAttribute("checked", "true");
      }
      todoItemEl.addEventListener("change", (e: any) => {
        console.log(e);
        state.changeItemState(e.detail.id, e.detail.value);
      });
      listaEl.appendChild(todoItemEl);
    }
    //listaEl.innerHTML = listaDeItemsHTML.join("");
  }

  state.suscribe(() => {
    createTasks(state.getEnabledTasks());
  });

  createTasks(tasks);

  div.querySelector(".add-button").addEventListener("click", () => {
    state.addTask(Math.random(), "Desde el boton");
  });

  /*   const button = document.createElement("button");
  button.textContent = `Agregar item`;
  button.addEventListener("click", () => {}); */

  containerEl.appendChild(div);
}
