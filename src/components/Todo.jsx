import {useEffect, useState} from "react";
import AddTaskForm from "./AddTaskForm.jsx";
import SearchTaskForm from "./SearchTaskForm.jsx";
import TodoInfo from "./TodoInfo.jsx";
import TodoList from "./TodoList.jsx";

const Todo = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks")
    if (savedTasks) {
      return JSON.parse(savedTasks)
    }
    return [
      {id: 1, title: "Buy a game", isDone: false},
      {id: 2, title: "Read a book", isDone: true}
    ]
  })
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [searchTaskQuery, setSearchTaskQuery] = useState('')
  const deleteAllTasks = () => {

    const isConfirmed = confirm('Are you sure you want to delete all?')
    if (isConfirmed) {
      setTasks([])
    }
  }
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }
  const toggleTaskComplete = (taskId, isDone) => {
    setTasks(tasks.map((task) => {
      if (task.id === taskId) {
        return {...task, isDone}
      }
      return task
    }))
  }
  const addTask = () => {
    if (newTaskTitle.trim().length > 0) {
      const newTask = {
        id: crypto?.randomUUID() ?? Date.now().toString(),
        title: newTaskTitle,
        isDone: false
      }
      setTasks([...tasks, newTask])
      setNewTaskTitle('')
      setSearchTaskQuery('')
    }
  }

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks]);
  const clearSearchQuery = searchTaskQuery.trim().toLowerCase();
  const filteredTasks = clearSearchQuery.length > 0 ? tasks.filter(({title}) => title.toLowerCase().includes(clearSearchQuery)) : null
  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm
        addTask={addTask}
        newTaskTitle={newTaskTitle}
        setNewTaskTitle={setNewTaskTitle}
      />
      <SearchTaskForm
        searchTaskQuery={searchTaskQuery}
        setSearchTaskQuery={setSearchTaskQuery}
      />
      <TodoInfo
        total={tasks.length}
        done={tasks.filter(({isDone}) => isDone).length}
        onDeleteAllButtonClick={deleteAllTasks}
      />
      <TodoList
        filteredTasks={filteredTasks}
        onDeleteButtonClick={deleteTask}
        tasks={tasks}
        onTasksCompleteChange={toggleTaskComplete}
      />
    </div>
  )
}
export default Todo