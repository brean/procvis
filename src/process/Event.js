import Connector from '../graph/Connector';
import Node from '../graph/Node';

/**
 * start intermediate or end
 * all events are start events for now...
 */
 export default class Event extends Node {
   constructor(graph, label, options) {
     super(graph, label, options);
     this.createConnector();
  }

  createDOM() {
    super.createDOM();
    this.domElement.classList.add('event');
  }

  createConnector() {
    this.output = new Connector(this, {direction: 'output'});
    this.connectors = [this.output];
  }

  connect(other) {
    let edge = this.output.connect(other.input);
    return edge;
  }
}
