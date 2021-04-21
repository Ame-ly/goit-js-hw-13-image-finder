const preloaderFactory = selector => {
  return {
    element: document.querySelector(selector),
    hide() {
      this.element.classList.remove('enable');
      this.element.classList.add('disable');
    },
    show() {
      this.element.classList.remove('disable');
      this.element.classList.add('enable');
    },
  };
};

export default preloaderFactory;
