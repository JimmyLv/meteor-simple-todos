import React, {
  Component,
  PropTypes
} from 'react'
import { createContainer } from 'meteor/react-meteor-data'

import Tasks from '../api/tasks'

import Task from './Task'

class App extends Component {
  renderTask() {
    return this.props.tasks.map(task => (
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

App.propTypes = {
  tasks: PropTypes.array.isRequired
}
App.defaultProps = {}

export default createContainer(() => ({
  tasks: Tasks.find({}).fetch()
}), App)
