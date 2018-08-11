import React from 'react';
import ReactDOM from 'react-dom';
import initialData from './initial_data';
import Column from './column';

import 'normalize.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialData;
  }


  render() {
    return this.state.columnOrder.map((columnId) => {
      const column = this.state.columns[columnId]
      const tasks = column.taskIds.map(e => {
        return this.state.tasks[e]
      })
      return <Column key={column.id} column={column} tasks={tasks} />;
    });
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
