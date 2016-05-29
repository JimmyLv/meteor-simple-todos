import React, {
  Component,
  PropTypes,
} from 'react'

import Tasks from '../api/tasks'

class Task extends Component {
  constructor() {
    super()
    this.toggleChecked = this.toggleChecked.bind(this)
    this.deleteThisTask = this.deleteThisTask.bind(this)
  }

  toggleChecked() {
    Tasks.update(this.props.task._id, {
      $set: {
        checked: !this.props.task.checked
      }
    })
  }

  deleteThisTask() {
    Tasks.remove(this.props.task._id)
  }

  render() {
    const taskClassName = this.props.task.checked ? 'checked' : ''

    return (
      <li className={taskClassName}>
        <button className="delete" onClick={this.deleteThisTask}>
          &times;
        </button>
        <input
          type="checkbox"
          readOnly
          checked={this.props.task.checked}
          onClick={this.toggleChecked}
        />

        <span className="text">{this.props.task.text}</span>
      </li>
    )
  }
}

Task.propTypes = {
  task: PropTypes.object.isRequired
}
Task.defaultProps = {}

export default Task
