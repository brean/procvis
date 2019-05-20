import * as d3 from 'd3';

export default class Node {
  constructor(graph, label, options) {
    this.graph = graph;
    // we just count our nodes, a new node gets a new id,
    // alternatively you can set the id from a database-id generated
    // by the server.
    Node.id = ++Node.id || 0;
    // using options we can overwrite the id
    this.id = options && options.id ? options.id : 'node_' + Node.id;

    this.label = label || 'Node ' + Node.id;

    this.connectors = [];

    this.createDOM();

    graph.addNode(this);
  }

  dragStart() {
    this._dragStart = this.position;
    this.outputNodes.forEach((node) => {
      node.dragStart();
    });
  }

  dragEnd() {
    this._dragStart = null;
    this.outputNodes.forEach((node) => {
      node.dragEnd();
    });
  }

  dragMove(x, y) {
    let dist = [x - this._dragStart[0], y - this._dragStart[1]];
    this.setPosition(x, y);
    this.dragChild(dist);
  }

  dragChild(dist) {
    this.outputNodes.forEach((node) => {
      node.setPosition(
        node._dragStart[0] + dist[0],
        node._dragStart[1] + dist[1],
        false);
      node.dragChild(dist);
    });
  }

  getConnectedNodes(direction) {
    let nodes = [];
    let thisNode = this;
    this.connectors.forEach((connector) => {
      if (connector.direction == direction) {
        connector.edges.forEach((edge) => {
          let node = edge[direction].node;
          if (node != thisNode)
            nodes.push(node);
        });
      }
    });
    return nodes;
  }

  get outputNodes() {
    return this.getConnectedNodes('output');
  }

  get inputNodes() {
    return this.getConnectedNodes('input');
  }

  setPosition(x, y) {
    // save position to calculate distance of movement
    this.position = [x, y];

    this.domElement.style.webkitTransform =
    this.domElement.style.transform = `translate(${x}px, ${y}px)`;
    // update the posiion attributes
    this.domElement.setAttribute('data-x', x);
    this.domElement.setAttribute('data-y', y);

    // TODO: for performance optimization just move all edges,
    // do NOT redraw them when redrawEdges is false!
    //if (redrawEdges === undefined || redrawEdges === true) {
    this.getEdges().forEach((edge) => {
      edge.layout();
    });
    //}
  }

  getEdges() {
    let edges = [];
    this.connectors.forEach((connector) => {
      connector.edges.forEach((edge) => {
        edges.push(edge);
      });
    });
    return edges;
  }

  get width() {
    return this.domElement.getBoundingClientRect().width + 20;
  }

  get height() {
    return this.domElement.getBoundingClientRect().height;
  }

  removeDOM() {
    this.graph.domElement.removeChild(this.domElement);
    this.domElement = null;
  }

  /**
   * create div that will be the visual representation for our node
   * and add it to the document body
   */
  createDOM() {
    // in the background we have a node that is attached to the SVG.
    this.rect = d3.select('.nodes')
      .append('rect')
      .attr('stroke', '#ff0000');

    // create a container element for the HTML-content, so we can add input etc.

    // TODO: use foreignObject instead!
    this.domElement = document.createElement('div');
    this.domElement.node = this;
    this.domElement.classList.add('node');
    this.graph.domElement.appendChild(this.domElement);

    // content element has the title for the node and maybe some more UI
    // it is centered in the node in css.
    this.content = document.createElement('div');
    this.content.classList.add('node_content');
    this.domElement.appendChild(this.content);
    this.addDragAndDrop();
  }

  addDragAndDrop() {
    let graph = this.graph;
    function dragMove (event) {
      // translate the element
      event.target.node.dragMove(
        (parseFloat(event.target.getAttribute('data-x')) || 0) + event.dx,
        (parseFloat(event.target.getAttribute('data-y')) || 0) + event.dy
      );
    }
    function dragStart(event) {
      event.target.node.dragStart();
    }
    function dragEnd(event) {
      // snap back to inital position if nothing changes,
      // dagre does the layout, not the user
      if (graph.autoLayout) {
        graph.layout();
      }
      event.target.node.dragEnd();
    }
    let drag = d3.drag()
      .on('start', dragStart.bind(this))
      .on('drag', dragMove.bind(this))
      .on('end', dragEnd.bind(this));
    this.rect.call(drag);
  }
}
