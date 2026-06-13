import {useState, useRef, useMemo, useEffect, useCallback} from "react";
import taskApi from "@/shared/API/tasks/index.js";
import tasksAPI from "@/shared/API/tasks/index.js";

const useTasks = () => {


  const [tasks, setTasks] = useState([])

  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [searchTaskQuery, setSearchTaskQuery] = useState('')
  const [disappearingTaskId, setDisappearingTaskId] = useState(null)
  const [appearingTaskId, setAppearingTaskId] = useState(null)
  const newTaskInputRef = useRef(null)


  const deleteAllTasks = useCallback(() => {
    const isConfirmed = confirm('Are you sure you want to delete all?')
    if (isConfirmed) {
      tasksAPI.deleteAll(tasks).then(() => setTasks([]))
    }
  }, [tasks])

  const deleteTask = useCallback((taskId) => {
    tasksAPI.delete(taskId)
      .then(() => {
        setDisappearingTaskId(taskId)
        setTimeout(() => {
          setTasks(tasks.filter((task) => task.id !== taskId))
          setDisappearingTaskId(null)
        }, 400)
      })
  }, [tasks])

  const toggleTaskComplete = useCallback((taskId, isDone) => {

    tasksAPI.toggleComplete(taskId, isDone)
      .then(() => {
        setTasks(tasks.map((task) => {
          if (task.id === taskId) {
            return {...task, isDone}
          }
          return task
        }))
      })
  }, [tasks])
  const addTask = useCallback((title) => {
    const newTask = {
      title,
      isDone: false
    }
    taskApi.add(newTask)
      .then((addedTask) => {
        setTasks((prevTasks) => [...prevTasks, addedTask
        ])
        setNewTaskTitle('')
        setSearchTaskQuery('')
        newTaskInputRef.current.focus()
        setAppearingTaskId(addedTask.id)
        setTimeout(() => {
          setAppearingTaskId(null)
        }, 400)
      })


  }, [])


  useEffect(() => {
    newTaskInputRef.current.focus()
    taskApi.getAll()
      .then(setTasks)
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
    addTask,
    disappearingTaskId,
    appearingTaskId
  }
}
export default useTasks