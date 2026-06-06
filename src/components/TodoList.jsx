import TodoItem from "./TodoItem.jsx";

const TodoList = (props) => {
  const {
    tasks = [],
    onDeleteButtonClick,
    toggleTaskComplete
  } = props


  const hasTasks = true
  if (!hasTasks) {
    return (
      <div className="todo__empty-message"></div>
    )
  }
  return (
    <ul className="todo__list">
      {tasks.map((task) => (
        <TodoItem
          onDeleteButtonClick={onDeleteButtonClick}
          key={task.id}
          className="todo__item"
          id={task.id}
          title={task.title}
          isDone={task.isDone}
          toggleTaskComplete={toggleTaskComplete}
        />
      ))}
    </ul>
  )

}
export default TodoList