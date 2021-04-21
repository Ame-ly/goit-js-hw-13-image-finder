export default function getAllRefs() {
  return {
    containerRef: document.querySelector('.search-container'),
    formRef: document.querySelector('#search-form'),
    listRef: document.querySelector('.gallery'),
    inputRef: document.querySelector('.input'),
    // cardRef: document.querySelector('.js-country-card'),
  };
}
