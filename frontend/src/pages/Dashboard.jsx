import { useEffect, useState } from "react";
import API from "../services/api";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!title.trim()) return;

    await API.post("/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const toggleStatus = async (task) => {
    await API.put(`/tasks/${task._id}`, {
      status: task.status === "pending" ? "completed" : "pending"
    });
    fetchTasks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const filteredTasks = tasks
    .filter(task =>
      task.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter(task =>
      filter === "all" ? true : task.status === filter
    );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md p-6 rounded">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Task Dashboard</h1>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-1 rounded"
          >
            Logout
          </button>
        </div>

        {/* Add Task */}
        <div className="flex gap-2 mb-4">
          <input
            className="border p-2 flex-1 rounded"
            placeholder="Add new task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-4 rounded"
          >
            Add
          </button>
        </div>

        {/* Search + Filter */}
        <div className="flex gap-2 mb-4">
          <input
            className="border p-2 flex-1 rounded"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border p-2 rounded"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Task List */}
        <ul>
          {filteredTasks.map(task => (
            <li
              key={task._id}
              className="border p-3 mb-2 rounded flex justify-between items-center"
            >
              <span
                className={`cursor-pointer ${
                  task.status === "completed"
                    ? "line-through text-gray-500"
                    : ""
                }`}
                onClick={() => toggleStatus(task)}
              >
                {task.title}
              </span>

              <button
                onClick={() => deleteTask(task._id)}
                className="text-red-500"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
};

export default Dashboard;
