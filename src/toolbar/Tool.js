export default class Tool {
  constructor(toolbar) {
    this.toggleTool = false;
    this.toolbar = toolbar;
    this.createDOM();
    toolbar.addTool(this);
  }

  createDOM() {
    this.domElement = document.createElement('div');
    this.domElement.classList.add('tool');
    this.link = document.createElement('a');
    this.link.onclick = () => {
      if (this.toggleTool) {
        this.selected = !this.selected;
      } else {
        this.toolbar.select(this);
      }
    };
    this.domElement.appendChild(this.link);
  }

  /**
   * when a tool is selected its action will be applied when the
   * user touches the graph area.
   */
  set selected(value) {
    if (value) {
      this.domElement.classList.add('selected');
    } else {
      this.domElement.classList.remove('selected');
    }
    this._selected = value;
  }

  get selected() {
    return this._selected;
  }
}
