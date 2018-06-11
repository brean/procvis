export default class Graph {
  constructor(elementId, options) {
    if (!options) {
      this.options = {rankdir: 'LR', multigraph: true};
    } else {
      this.options = options;
    }
    this.domElement = document.getElementById(elementId);
    this.createDOM();
    this.nodes = {};
    this.events = {};
    this.preview = null;

    this.recreate();

    this._autoLayout = this.options.autoLayout || true;
  }

  get autoLayout() {
    return this._autoLayout;
  }

  set autoLayout(value) {
    this._autoLayout = value;
    if (value) {
      this.layout();
    }
  }

 /**
  * recreate dagre nodes
  */
  recreate() {
    this.dagre = new dagre.graphlib.Graph();
    this.dagre.setGraph(this.options);
    this.layoutApplied = false;
    let self = this;
    for (var name in this.nodes) {
      let node = this.nodes[name];
      this.dagre.setNode(node.id, {
        label: node.label,
        width: node.width,
        height: node.height
      });
      node.connectors.forEach((connector) => {
        if (connector.direction == 'output') {
          connector.edges.forEach((edge) => {
            self.addEdge(edge);
          });
        }
      });
    }
  }

  addEdge(edge) {
    this.dagre.setEdge(
      edge.start.node.id,
      edge.end.node.id,
      {}
    );
  }

  /**
   * create required DOM elements (like SVG)
   */
  createDOM() {
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.domElement.appendChild(this.svg);
  }

  /**
   * create node from dagre
   */
  addNode(node) {
    this.nodes[node.id] = node;
    this.dagre.setNode(node.id, {
      label: node.label,
      width: node.width,
      height: node.height
    });
  }

  removeNode(node) {
    this.dagre.removeNode(node.id);
    delete this.nodes[node.id];
  }

  layout() {
    dagre.layout(this.dagre);
    let nodeIds = this.dagre.nodes();
    let self = this;
    let edges = [];

    // position nodes
    nodeIds.forEach((nodeId) => {
      let dagreNode = self.dagre.node(nodeId);
      let node = self.nodes[nodeId];
      // TODO: animation
      node.setPosition(dagreNode.x, dagreNode.y);
    });

    this.layoutApplied = true;
  }
}
