export default class Toolbar {
  constructor(graph) {
    this.graph = graph;
    this.tools = [];
    this.createDOM();
  }

  createDOM() {
    // this dom element will host all tool-icons
    this.domElement = document.createElement('div');
    this.domElement.classList.add('toolbar');
    this.domElement.classList.add('one-column');
    this.graph.domElement.appendChild(this.domElement);
  }

  select(tool) {
    this.tools.forEach((item) => {
      if (!item.toggleTool) {
        item.selected = item == tool;
      }
    });
  }

  addTool(tool) {
    this.domElement.appendChild(tool.domElement);
    // automatically select first tool
    if (!tool.toggleTool) {
      tool.selected = this.tools.length == 0;
    }
    this.tools.push(tool);


  }
}
