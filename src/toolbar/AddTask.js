/**
 * tool to add a new task
 */
import * as interact from 'interact';
import Tool from './Tool';
import Task from '../process/Task';
import PreviewTask from '../process/PreviewTask';

export default class AddTask extends Tool {
  constructor(toolbar) {
    super(toolbar);
  }

  createDOM() {
    super.createDOM();
    this.img = document.createElement('img');
    this.img.src = 'img/task.png';
    this.link.appendChild(this.img);
    this.domElement.classList.add('add_node');
    this.addDragAndDrop();
  }

  set selected(value) {
    /*if (value && !this._selected) {
      this.addPreview();
    } else {
      this.removePreview();
    }
    */
    super.selected = value;
  }

  removePreview() {
    if (!this.preview) {
      return;
    }
    this.preview.removeDOM();
    this.toolbar.graph.preview = null;
    this.toolbar.graph.removeNode(this.preview);
    this.preview = null;
  }

  /*
   * start edit mode and create preview task
   */
  addPreview() {
    this.preview = new PreviewTask(this.toolbar.graph, 'New Task');
    this.toolbar.graph.addNode(this.preview);
  }


  addDragAndDrop() {
    let graph = this.toolbar.graph;
    let self = this;
    function dragMove (event) {
      // translate the element
      let preview = self.preview;
      preview.dragMove(
        (parseFloat(preview.domElement.getAttribute('data-x')) || 0) + event.dx,
        (parseFloat(preview.domElement.getAttribute('data-y')) || 0) + event.dy
      );

    }
    function dragStart(event) {
      self.addPreview();
      self.preview.setPosition(event.pageX + 2, event.pageY + 2);
      self.preview._dragStart = self.preview.position;
    }
    // add a new connection at the connector
    function newConnection(elem) {

      if (elem.connector && elem.connector.direction == 'input') {
        let start = elem.connector;
        let newTask = new Task(graph);

        // connect old inputs with input of this node
        start.edges.forEach((edge) => {
          // all edge.ends have to point to the input of the new node
          edge.end = newTask.input;
          newTask.input.edges.push(edge);
        });
        start.edges = [];

        newTask.connect(elem.connector.node);
        graph.recreate();
      }
      if (elem.connector && elem.connector.direction == 'output') {
        let end = elem.connector;
        let newTask = new Task(graph);

        // connect old inputs with input of this node
        end.edges.forEach((edge) => {
          // all edge.ends have to point to the input of the new node
          edge.start = newTask.output;
          newTask.output.edges.push(edge);
        });
        end.edges = [];

        elem.connector.node.connect(newTask);
        graph.recreate();
      }
    }
    function dragEnd(event) {
      // snap back to inital position if nothing changes,
      // dagre does the layout, not the user
      let elem = document.elementFromPoint(event.pageX, event.pageY);
      if (elem) {

        newConnection(elem);

        self.removePreview();
        if (graph.autoLayout) {
          graph.layout();
        }
      }
    }
    let draggable = interact(this.domElement).draggable({});
    draggable.on('dragmove', dragMove);
    draggable.on('dragstart', dragStart);
    draggable.on('dragend', dragEnd);
  }
}
