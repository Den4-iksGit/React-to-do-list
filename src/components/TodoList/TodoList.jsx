import TodoItem from "../TodoItem/TodoItem.jsx";
import {useContext, memo} from "react";
import {TasksContext} from "../../context/TasksContext.jsx";

const TodoList = (props) => {
  const {styles} = props

  const {
    tasks,
    filteredTasks
  } = useContext(TasksContext)


  const hasTasks = tasks.length > 0
  const isEmptyFilteredTasks = filteredTasks?.length === 0
  if (!hasTasks) {
    return (
      <div className={styles.emptyMessage}>There are no tasks yet</div>
    )
  }
  if (hasTasks && isEmptyFilteredTasks) {
    return (
      <div className={styles.emptyMessage}>Tasks not found</div>
    )
  }
  return (
    <ul className={styles.list}>
      {(filteredTasks ?? tasks).map((task) => (
        <TodoItem
          key={task.id}
          className={styles.item}
          id={task.id}
          title={task.title}
          isDone={task.isDone}
        />
      ))}
    </ul>
  )

}
export default memo(TodoList)