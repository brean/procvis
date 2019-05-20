/**
 * The edge is a line between two Connectors
 */

export default class Edge {
  constructor(graph, start, end) {
    this.start = start; //Connector
    this.start.edges.push(this);

    this.end = end; //Connector
    this.end.edges.push(this);

    this.graph = graph;
    graph.addEdge(this);

    this.createDOM();
  }

  get output(){
    return this.end;
  }

  get input() {
    return this.start;
  }

  createDOM() {
    this.path = document.createElementNS(this.graph.svg.namespaceURI, 'path');
    this.path.setAttributeNS(null, 'class', 'edge');
    this.path.setAttributeNS(null, 'fill', 'none');
    this.path.edge = this; // makes it easier for drag-and-drop
    this.graph.svg.appendChild(this.path);
  }

  createPath() {
    let a = this.start.position;
    let b = this.end.position;

    let diff = {
      x: b.x - a.x,
      y: b.y - a.y
    };

    var path = 'M' + a.x + ',' + a.y + ' ';
    path += 'C';
    path += a.x + diff.x / 3 * 2 + ',' + a.y + ' ';
    path += a.x + diff.x / 3 + ',' + b.y + ' ';
    path += b.x + ',' + b.y;

    return path;
  }

  /**
   * redraw path
   */
  layout() {
    let path = this.createPath();
    this.path.setAttributeNS(null, 'd', path);
  }
}
