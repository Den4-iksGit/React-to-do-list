import localAPI from "@/shared/API/tasks/local.js";
import serverAPI from "@/shared/API/tasks/server.js";

const isLocal = import.meta.env.VITE_STATIC_BACKEND === 'true'

const tasksAPI = isLocal ? localAPI : serverAPI
export default tasksAPI