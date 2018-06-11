import Task from './Task';

export default class PreviewTask extends Task {
  constructor(graph, label, options) {
    super(graph, label, options);
  }

  createDOM() {
    super.createDOM();
    this.domElement.classList.add('preview');
  }
}
