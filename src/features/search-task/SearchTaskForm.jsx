import Field from "@/shared/ui/Field";
import {useContext} from "react";
import {TasksContext} from "@/entities/todo";

const SearchTaskForm = (props) => {
  const {styles} = props

  const {
    setSearchTaskQuery,
    searchTaskQuery,

  } = useContext(TasksContext)
  return (
    <form
      className={styles.form}
      onSubmit={(e) => e.preventDefault()}
    >
      <Field
        className={styles.field}
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