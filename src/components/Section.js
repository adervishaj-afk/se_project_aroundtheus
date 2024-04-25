export default class Section {
  constructor(containerSelector) {
    this._cardList = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._cardList.prepend(element);
  }
}
