import { state } from "../../state";

class FormEl extends HTMLElement {
  shadow = this.attachShadow({ mode: "open" });
  nombre: string = "";
  constructor() {
    super();
    state.suscribe(() => {
      this.syncWithState();
    });
    this.syncWithState();
  }
  syncWithState() {
    const lastState = state.getState();
    this.nombre = lastState.nombre || "";
    this.render();
  }
  render() {
    const label = this.getAttribute("label");
    const page = this.getAttribute("page");

    const style = document.createElement("style");
    style.textContent = `
      .form {
        box-sizing: border-box;
        border: 2px solid black;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        height: 200px;
        font-size:24px;
        padding:15px;
      }

      .label{
        display: flex;
        flex-direction: column;
        font-size: 24px;
      }
      
      .input{
        margin-top:10px;
        display: flex;
        height: 45px;
      }

      .button{
        height: 45px;
        color: red;
      }
          `;

    this.shadow.innerHTML = `    
    <form class="form">
        <label class="label">${label}</label>
        <input class="input" type="text" name="nombre"/>
        <button class="button">Enviar</button>
    </form>
      `;

    const form = this.shadow.querySelector(".form");
    form.addEventListener("submit", (e: any) => {
      e.preventDefault();
      state.setState({
        ...state.getState(),
        nombre: e.target.nombre.value,
      });
    });

    this.shadow.appendChild(style);
  }
}

customElements.define("my-form", FormEl);
