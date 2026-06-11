import Router from "./Router.jsx";
import TaskPage from "./pages/TaskPage.jsx";
import TasksPage from "./pages/TasksPage.jsx";

const App = () => {
  const routes = {
    "/": TasksPage,
    "/tasks/:id": TaskPage,
    "*": () => <div>404 Page not found</div>
  }
  return (
    <Router routes={routes} />
  )
}

export default App
