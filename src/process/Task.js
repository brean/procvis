import Connector from '../graph/Connector';
import Node from '../graph/Node';

/**
 * the default task has two connectors on the left and right to show
 * the previous and next task as well as a connector for notes
 */
export default class Task extends Node {
  constructor(graph, label, options) {
    super(graph, label, options);
    this.createConnector();
  }

  createDOM() {
    super.createDOM();
    let domElement = this.domElement;
    domElement.classList.add('task');
    if (this.options && this.options.state) {
      domElement.classList.add(this.options.state);
    }
    this.content.innerHTML = this.label;
    domElement.addEventListener('click', () => {
      alertify.error('<span class="emoji">⚠</span> Error notification message.');
      domElement.classList.add('error');
    });
  }

  /**
   * create 2 default connectors, one to the left and one to the right
   */
  createConnector() {
    this.input = new Connector(this, {direction: 'input'});
    this.output = new Connector(this, {direction: 'output'});
    this.connectors = [this.input, this.output];
  }

  /**
   * connect with another Task, so this node creates an edge with
   * this node as output and an input for the other node
   * the order is important: this node --> other node
   */
  connect(other) {
    let con = other.connectors[0]
    let edge = this.output.connect(con);
    return edge;
  }
}
