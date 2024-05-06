export default class Section {
  constructor(containerSelector) {
    this._cardList = document.querySelector(containerSelector);
  }

  /*
  renderItems() {
    // Renders all elements on the page
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }
  */

  addItem(element) {
    this._cardList.prepend(element);
  }
}
