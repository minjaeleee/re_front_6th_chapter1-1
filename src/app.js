import Router from "./router/Router.js";
import List from "./components/List.js";

export class App {
  constructor() {
    this.router = new Router();
    this.router.addRoute("/", List);
    this.router.subscribe((path, routeInfo) => {
      document.getElementById("root").innerHTML = routeInfo.component();
    });
  }

  start() {
    this.router.start();
  }
}
