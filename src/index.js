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
    const { destination, source, draggableId } = result;

    if(!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const column = this.state.columns[source.droppableId];
    // copy column.taskIds
    const newTaskIds = Array.from(column.taskIds);
    // Starting at this index, remove 1 item
    newTaskIds.splice(source.index, 1);
    // Add to this index
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      taskIds: newTaskIds
    }

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newColumn.id]: newColumn,
      }
    }

    this.setState(newState);
  };


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
