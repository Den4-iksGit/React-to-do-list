import {
  useState,
  useRef,
  useMemo,
  useEffect,
  useCallback,
  useReducer
} from "react";
import taskApi from "@/shared/API/tasks/index.js";
import tasksAPI from "@/shared/API/tasks/index.js";

const tasksReducer = (state, action) => {
  switch (action.type) {
    case "SET_ALL": {
      return Array.isArray(action.tasks) ? action.tasks : state
    }
    case "ADD": {
      return [...state, action.task]
    }
    case "TOGGLE_COMPLETE": {
      const {id, isDone} = action
      return state.map((task) => {
        return task.id === id ? {...task, isDone} : task
      })
    }
    case "DELETE": {
      return state.filter((task) => task.id !== action.id)
    }
    case "DELETE_ALL": {
      return []
    }
    default: {
      return state
    }
  }
}
const useTasks = () => {
  const [tasks, dispatch] = useReducer(tasksReducer, [])


  const [searchTaskQuery, setSearchTaskQuery] = useState('')

  const [disappearingTaskId, setDisappearingTaskId] = useState(null)

  const [appearingTaskId, setAppearingTaskId] = useState(null)

  const newTaskInputRef = useRef(null)


  const deleteAllTasks = useCallback(() => {
    const isConfirmed = confirm('Are you sure you want to delete all?')
    if (isConfirmed) {
      tasksAPI.deleteAll(tasks).then(() => dispatch({type: "DELETE_ALL"}))
    }
  }, [tasks])

  const deleteTask = useCallback((taskId) => {
    tasksAPI.delete(taskId)
      .then(() => {
        setDisappearingTaskId(taskId)
        setTimeout(() => {
          dispatch({type: "DELETE", id: taskId})
          setDisappearingTaskId(null)
        }, 400)
      })
  }, [])

  const toggleTaskComplete = useCallback((taskId, isDone) => {

    tasksAPI.toggleComplete(taskId, isDone)
      .then(() => {
        dispatch({type: "TOGGLE_COMPLETE", id: taskId, isDone})
      })
  }, [])
  const addTask = useCallback((title, callBackAfterAdding) => {
    const newTask = {
      title,
      isDone: false
    }
    taskApi.add(newTask)
      .then((addedTask) => {
        dispatch({type: "ADD", task: addedTask})
        callBackAfterAdding()
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
      .then((serverTasks) => dispatch({type: "SET_ALL", tasks: serverTasks}))
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
    searchTaskQuery,
    setSearchTaskQuery,
    newTaskInputRef,
    addTask,
    disappearingTaskId,
    appearingTaskId
  }
}
export default useTasks