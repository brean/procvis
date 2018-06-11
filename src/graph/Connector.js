import Edge from './Edge';

/**
 * a Connector is the output(start) or input(end) point of an edge.
 * it is located somewhere on the Node, normally on its border.
 * visualized as a circle or rectangle
 */

export default class Connector {
  constructor(node, options) {
    this.node = node; // Node
    this.edges = [];

    // input, output or both
    this.direction = options.direction || 'output';
    this.createDOM();
  }

  createDOM() {
    this.domElement = document.createElement('div');
    this.domElement.connector = this; // makes it easier for drag-and-drop
    this.domElement.classList.add('connector');
    this.domElement.classList.add(this.direction);
    this.node.domElement.appendChild(this.domElement);
  }

  get position() {
    let rect = this.domElement.getBoundingClientRect()
    return {
      x: rect.left + this.domElement.offsetWidth / 2,
      y: rect.top + this.domElement.offsetHeight / 2
    }
  }

  /**
   * connect one connector with another one
   */
  connect(other) {
    if (this.direction === 'input') {
      throw new Error("this connector is set as input, start connecting from an output");
    }
    let edge = new Edge(this.node.graph, this, other);
    return edge;
  }
}
