import {
  createContext,
} from "react";
import useTasks from "./useTasks.js";
import useIncompleteTaskScroll from "./useIncompleteTaskScroll.js";

export const TasksContext = createContext({})

export const TasksProvider = (props) => {
  const {children} = props

  const {
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
  } = useTasks()
  const {
    firstIncompleteTaskRef,
    firstIncompleteTaskId,
  } = useIncompleteTaskScroll(tasks)
  return (
    <TasksContext.Provider
      value={{
        tasks,
        filteredTasks,
        firstIncompleteTaskRef,
        firstIncompleteTaskId,
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
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}