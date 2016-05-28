import React, {
  PropTypes
} from 'react'

const Task = (props) => (
  <li>{props.task.text}</li>
)

Task.propTypes = {
  task: PropTypes.object.isRequired
}
Task.defaultProps = {}

export default Task
