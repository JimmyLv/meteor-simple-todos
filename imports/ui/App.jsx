import React, {
  Component
} from 'react'

import Task from './Task'

class App extends Component {
  getTask() {
    return [
      { id: 1, text: 'This is task 1' },
      { id: 2, text: 'This is task 2' },
      { id: 3, text: 'This is task 3' }
    ]
  }

  renderTask() {
    return this.getTask().map(task => (
      <Task key={task.id} task={task} />
    ))
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>TodoList</h1>
        </header>
        <ul>
          {this.renderTask()}
        </ul>
      </div>
    )
  }
}

App.propTypes = {}
App.defaultProps = {}

export default App
