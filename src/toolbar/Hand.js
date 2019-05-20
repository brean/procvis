import Tool from './Tool';

export default class Hand extends Tool {
  constructor(toolbar) {
    super(toolbar);
  }

  createDOM() {
    super.createDOM();
    this.img = document.createElement('img');
    this.img.src = 'img/hand.png';
    this.link.appendChild(this.img);
  }
}
