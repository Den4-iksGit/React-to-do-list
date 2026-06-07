import Field from "./Field.jsx";

const SearchTaskForm = (props) => {
  const {
    setSearchTaskQuery,
    searchTaskQuery
  } = props
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