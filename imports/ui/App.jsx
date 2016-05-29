import React, {
  Component,
  PropTypes
} from 'react'
import { createContainer } from 'meteor/react-meteor-data'

import { Tasks } from '../api/tasks'

import Task from './Task'

class App extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()

    const text = this.refs.textInput.value.trim()

    Tasks.insert({
      text,
      createAt: new Date()
    })

    this.refs.textInput.value = ''
  }

  renderTask() {
    return this.props.tasks.map(task => (
      <Task key={task._id} task={task} />
    ))
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>TodoList</h1>
          <form onSubmit={this.handleSubmit} className="new-task">
            <input
              type="text"
              ref="textInput"
              placeholder="Type to add new tasks"
            />
          </form>
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
