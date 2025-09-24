import Router from "./router/Router.js";
import List from "./components/List.js";

const enableMocking = () =>
  import("./mocks/browser.js").then(({ worker }) =>
    worker.start({
      onUnhandledRequest: "bypass",
    }),
  );

function main() {
  const router = new Router();
  router.addRoute("/", List);
  router.subscribe((path, routeInfo) => {
    document.getElementById("root").innerHTML = routeInfo.component();
  });

  router.start();
}

// 애플리케이션 시작
if (import.meta.env.MODE !== "test") {
  enableMocking().then(main);
} else {
  main();
}
