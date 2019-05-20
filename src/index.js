import * as toolbar from './toolbar';
import * as graph from './graph';
import * as process from './process';

global.procvis = {
  Task: process.Task,
  Graph: graph.Graph,
  Event: process.Event,
  Toolbar: toolbar.Toolbar
};
