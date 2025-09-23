class Router {
  constructor() {
    // Observer 패턴을 위한 구독자 목록
    this.observers = [];
    // 라우트 매핑 테이블
    this.routes = new Map();
    // 현재 경로
    this.currentPath = window.location.pathname;

    // 브라우저의 뒤로가기/앞으로가기 이벤트 감지
    this.initPopStateListener();
  }

  // Observer 패턴: 구독자 등록
  subscribe(observer) {
    this.observers.push(observer);
  }

  // Observer 패턴: 구독자 해제
  unsubscribe(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  // Observer 패턴: 모든 구독자에게 알림
  notify(path, routeInfo) {
    this.observers.forEach((observer) => {
      observer(path, routeInfo);
    });
  }

  // 라우트 등록
  addRoute(path, handler) {
    this.routes.set(path, handler);
  }

  // 경로 이동 (프로그래매틱 네비게이션)
  navigate(path) {
    if (this.currentPath === path) return;

    // 브라우저 히스토리에 추가
    window.history.pushState(null, "", path);
    this.currentPath = path;

    // 라우트 처리
    this.handleRoute(path);
  }

  // 현재 경로의 라우트 처리
  handleRoute(path) {
    const route = this.routes.get(path);

    if (route) {
      // 라우트가 존재하는 경우
      const routeInfo = {
        path,
        component: route,
        params: this.extractParams(path),
      };

      // Observer들에게 알림
      this.notify(path, routeInfo);
    } else {
      // 404 처리
      const notFoundInfo = {
        path,
        component: null,
        isNotFound: true,
      };

      this.notify(path, notFoundInfo);
    }
  }

  // 브라우저 뒤로가기/앞으로가기 이벤트 리스너 초기화
  initPopStateListener() {
    window.addEventListener("popstate", (event) => {
      this.currentPath = window.location.pathname;
      this.handleRoute(this.currentPath);
    });
  }

  // 경로에서 파라미터 추출 (향후 확장용)
  extractParams(path) {
    // 현재는 단순 구현, 향후 동적 라우팅 지원 시 확장
    return {};
  }

  // 현재 경로 반환
  getCurrentPath() {
    return this.currentPath;
  }

  // 라우터 시작 (초기 라우트 처리)
  start() {
    this.handleRoute(this.currentPath);
  }
}

export default Router;
