import React from 'react';
import ReactDOM from 'react-dom';
import initialData from './initial_data';
import Column from './column';
import { DragDropContext } from 'react-beautiful-dnd'

import 'normalize.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialData;
  }

  onDragEnd = result => {
    //This function is responsibile for updating the result
  }


  render() {
    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}>
        {this.state.columnOrder.map((columnId) => {
        const column = this.state.columns[columnId]
        const tasks = column.taskIds.map(e => {
          return this.state.tasks[e]
        })
        return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </DragDropContext>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
