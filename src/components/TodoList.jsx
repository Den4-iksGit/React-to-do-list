import TodoItem from "./TodoItem.jsx";

const TodoList = (props) => {
  const {
    tasks = [],
    onDeleteButtonClick,
    onTasksCompleteChange,
    filteredTasks
  } = props


  const hasTasks = tasks.length > 0
  const isEmptyFilteredTasks = filteredTasks?.length === 0
  if (!hasTasks) {
    return (
      <div className="todo__empty-message">There are no tasks yet</div>
    )
  }
  if (hasTasks && isEmptyFilteredTasks) {
    return (
      <div className="todo__empty-message">Tasks not found</div>
    )
  }
  return (
    <ul className="todo__list">
      {(filteredTasks ?? tasks).map((task) => (
        <TodoItem
          onDeleteButtonClick={onDeleteButtonClick}
          key={task.id}
          className="todo__item"
          id={task.id}
          title={task.title}
          isDone={task.isDone}
          onTasksCompleteChange={onTasksCompleteChange}
        />
      ))}
    </ul>
  )

}
export default TodoList