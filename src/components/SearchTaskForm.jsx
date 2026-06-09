import Field from "./Field.jsx";
import {useContext} from "react";
import {TasksContext} from "../context/TasksContext.jsx";

const SearchTaskForm = () => {
  const {
    setSearchTaskQuery,
    searchTaskQuery
  } = useContext(TasksContext)
  return (
    <form
      className="todo__form"
      onSubmit={(e) => e.preventDefault()}
    >
      <Field
        className="todo__field"
        label="Search task"
        id="search-task"
        type="search"
        value={searchTaskQuery}
        onInput={(e) => setSearchTaskQuery(e.target.value)}
      />
    </form>
  )
}
export default SearchTaskForm