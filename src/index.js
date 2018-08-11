import React from 'react';
import ReactDOM from 'react-dom';
import initialData from './initial_data';
import styled from 'styled-components';
import Column from './column';
import { DragDropContext } from 'react-beautiful-dnd'

import 'normalize.css';

const Container = styled.div`
  display:flex;
`

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

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    if (start === finish) {
      // copy column.taskIds
      const newTaskIds = Array.from(start.taskIds);
      // Starting at this index, remove 1 item
      newTaskIds.splice(source.index, 1);
      // Add to this index
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
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


    // moving from one column to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    }

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    }

    this.setState(newState);
  }


  render() {
    return (
      <Container>
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
      </Container>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
