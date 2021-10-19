import "./components/text";
import "./components/todo-item";
import { initHomePage } from "./pages/home";
import { state } from "./state";

(function () {
  state.init();
  initHomePage(document.querySelector(".root"));
})();
