const initialData = {
  tasks: {
    'task-1': {id: 'task-1', content: 'Take out the garbage'},
    'task-2': {id: 'task-2', content: 'Make your bed'},
    'task-3': {id: 'task-3', content: 'Charge Phone'},
    'task-4': {id: 'task-4', content: 'Cook dinger'},
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'to-do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
    },
    'column-2' : {
      id: 'column-2',
      title: 'in-progress',
      taskIds: []
    },
    'column-3' : {
      id: 'column-3',
      title: 'done',
      taskIds: []
    }
  },
  // Facilitate reordering of data
  columnOrder: ['column-1', 'column-2', 'column-3']
}

export default initialData;
