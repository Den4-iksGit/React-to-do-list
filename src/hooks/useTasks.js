import {useState, useRef, useMemo, useEffect, useCallback} from "react";
import useTasksLocalStorage from "./useTasksLocalStorage.js";

const useTasks = () => {
  const {
    savedTasks,
    saveTasks
  } = useTasksLocalStorage()

  const [tasks, setTasks] = useState(savedTasks ?? [
    {id: 1, title: "Buy a game", isDone: false},
    {id: 2, title: "Read a book", isDone: true}
  ])

  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [searchTaskQuery, setSearchTaskQuery] = useState('')

  const newTaskInputRef = useRef(null)


  const deleteAllTasks = useCallback(() => {
    const isConfirmed = confirm('Are you sure you want to delete all?')
    if (isConfirmed) {
      setTasks([])
    }
  }, [])

  const deleteTask = useCallback((taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }, [tasks])

  const toggleTaskComplete = useCallback((taskId, isDone) => {
    setTasks(tasks.map((task) => {
      if (task.id === taskId) {
        return {...task, isDone}
      }
      return task
    }))
  }, [tasks])
  const addTask = useCallback((title) => {


    const newTask = {
      id: crypto?.randomUUID() ?? Date.now().toString(),
      title,
      isDone: false
    }
    setTasks((prevTasks) => [...prevTasks, newTask
    ])
    setNewTaskTitle('')
    setSearchTaskQuery('')
    newTaskInputRef.current.focus()


  }, [])

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks]);
  useEffect(() => {
    newTaskInputRef.current.focus()
  }, []);

  const filteredTasks = useMemo(() => {
    const clearSearchQuery = searchTaskQuery.trim().toLowerCase();

    return clearSearchQuery.length > 0
      ? tasks.filter(({title}) => title.toLowerCase().includes(clearSearchQuery))
      : null
  }, [searchTaskQuery, tasks])
  return {
    tasks,
    filteredTasks,
    deleteTask,
    deleteAllTasks,
    toggleTaskComplete,
    newTaskTitle,
    setNewTaskTitle,
    searchTaskQuery,
    setSearchTaskQuery,
    newTaskInputRef,
    addTask
  }
}
export default useTasks