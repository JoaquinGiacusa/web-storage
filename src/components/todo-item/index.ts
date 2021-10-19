customElements.define(
  "todo-item",
  class extends HTMLElement {
    shadow: ShadowRoot;
    title: string;
    checked: boolean = false;

    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
      this.title = this.getAttribute("title") || "";
      this.checked = this.hasAttribute("checked");
      this.id = this.getAttribute("id");

      const style = document.createElement("style");
      style.innerHTML = `
      .root{
        font-size: 18px;
        border-radius: 4px;
        padding: 22px 13px;
        background-color: #fff599;
      }
      
      .titulo.checked{
        text-decoration: line-through;
      }
      `;
      this.shadow.appendChild(style);
      this.render();
    }

    addListeners() {
      const chEL = this.shadow.querySelector(".checkbox-input");
      chEL.addEventListener("click", (e) => {
        const target = e.target as any;
        const event = new CustomEvent("change", {
          detail: { id: this.id, value: target.checked },
        });
        this.dispatchEvent(event);
      });
    }

    render() {
      const div = document.createElement("div");
      div.innerHTML = `
      <div class="root">
            <h4 class="titulo ${this.checked ? "checked" : ""}">${
        this.title
      }</h4>
            <div>
                <input class="checkbox-input" type="checkbox" ${
                  this.checked ? "checked" : ""
                }>
            </div>
      </div>
      `;
      this.shadow.appendChild(div);
      this.addListeners();
    }
  }
);
