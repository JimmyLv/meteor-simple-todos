import React, {
  Component,
  PropTypes
} from 'react'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'

import Tasks from '../api/tasks'
import AccountsUIWrapper from './AccountsUIWrapper'

import Task from './Task'

class App extends Component {
  constructor() {
    super()
    this.state = {
      hideCompleted: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggleHideCompleted = this.toggleHideCompleted.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()

    const text = this.refs.textInput.value.trim()
    Meteor.call('tasks.insert', text)

    this.refs.textInput.value = ''
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted
    })
  }

  renderTask() {
    let filteredTasks = this.props.tasks
    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(
        task => !task.checked
      )
    }

    return filteredTasks.map(task => (
      <Task key={task._id} task={task} />
    ))
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List ({this.props.incompleteCount})</h1>

          <label className="hide-completed">
            <input
              type="checkbox"
              readOnly
              checked={this.state.hideCompleted}
              onClick={this.toggleHideCompleted}
            />
            Hide Completed Tasks
          </label>

          <AccountsUIWrapper />

          {this.props.currentUser ?
            <form onSubmit={this.handleSubmit} className="new-task">
              <input
                type="text"
                ref="textInput"
                placeholder="Type to add new tasks"
              />
            </form> : ''}
        </header>
        <ul>
          {this.renderTask()}
        </ul>
      </div>
    )
  }
}

App.propTypes = {
  tasks: PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired,
  currentUser: PropTypes.object
}
App.defaultProps = {}

export default createContainer(() => ({
  tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
  incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
  currentUser: Meteor.user()
}), App)
