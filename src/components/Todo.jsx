import AddTaskForm from "./AddTaskForm.jsx";
import SearchTaskForm from "./SearchTaskForm.jsx";
import TodoInfo from "./TodoInfo.jsx";
import TodoList from "./TodoList.jsx";

const Todo = () => {
  const tasks = [
    {id: 1, title: "Buy a game", isDone: false},
    {id: 2, title: "Read a book", isDone: true}
  ]
  const deleteAllTasks = () => {
    console.log('DeleteAllTasks')
  }
  const deleteTask = (taskId) => {
    console.log(`Delete task with ${taskId}`)
  }
  const toggleTaskComplete = (taskId, isDone) => {
    console.log(`Task ${taskId} ${isDone ? 'complete' : 'not complete'}`)
  }
  const filterTask = (query) => {
    console.log(`Search: ${query}`)
  }
  const addTask = () => {
    console.log('Task has added ')
  }
  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm addTask={addTask} />
      <SearchTaskForm
        onSearchInput={filterTask}
      />
      <TodoInfo
        total={tasks.length}
        done={tasks.filter(({isDone}) => isDone).length}
        onDeleteAllButtonClick={deleteAllTasks}
      />
      <TodoList
        onDeleteButtonClick={deleteTask}
        tasks={tasks}
        onTasksCompleteChange={toggleTaskComplete}
      />
    </div>
  )
}
export default Todo