import Tool from './Tool';

export default class AutoLayout extends Tool {
  constructor(toolbar) {
    super(toolbar);
    this.toggleTool = true;
    super.selected = true;
  }

  createDOM() {
    super.createDOM();
    this.img = document.createElement('img');
    this.img.src = "img/auto_layout.png";
    this.link.appendChild(this.img);
  }

  set selected (value) {
    // we ignore the value - just call layout and be done with it
    this._selected = !this._selected
    this.toolbar.graph.autoLayout = this._selected;
    super.selected = this._selected;
  }
}
