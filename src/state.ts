const state = {
  data: {
    tasks: [
      { id: 1, title: "primer item", completed: false },
      { id: 2, title: "segundo item", completed: true },
      { id: 3, title: "tercer item", deleted: true },
    ],
  },
  listeners: [],
  init() {
    const localData = localStorage.getItem("saved-state");
    this.setState(JSON.parse(localData));
  },
  getState() {
    return this.data;
  },
  getEnabledTasks() {
    const currentState = this.getState();
    return currentState.tasks.filter((t) => !t.deleted);
  },
  addTask(id, title) {
    const currentState = this.getState();
    currentState.tasks.push({ id, title, completed: false });
    this.setState(currentState);
  },
  changeItemState(id, value) {
    const currentState = this.getState();
    const found = currentState.tasks.find((t) => t.id == id);
    found.completed = value;
    this.setState(currentState);
  },
  setState(newState) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }
    localStorage.setItem("saved-state", JSON.stringify(newState));
    console.log("Soy el state, he cambiado", this.data);
  },
  suscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
};

export { state };
