import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const fetchTasks = async () => {
    const res = await API.get("/tasks", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (!title) return;

    await API.post(
      "/tasks",
      { title },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );

    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    fetchTasks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
 <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white">


      
      {/* Navbar */}
    <div className="bg-white/5 backdrop-blur-xl border-b border-white/10 p-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold text-indigo-600">Task Manager</h1>
       <button
  onClick={logout}
  className="bg-red-500/80 hover:bg-red-600 px-4 py-2 rounded-lg transition"
>
  Logout
</button>
      </div>

      <div className="max-w-5xl mx-auto p-6">
        
        {/* Add Task Card */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8 shadow-xl">

          <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
          <form onSubmit={addTask} className="flex gap-4">
            <input
              type="text"
              placeholder="Enter task title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
             className="flex-1 p-3 rounded-lg bg-white/10 border border-white/10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"

            />
            <button
              type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg transition"

            >
              Add
            </button>
          </form>
        </div>

        {/* Task Grid */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-5 rounded-2xl shadow-lg hover:shadow-indigo-500/20 hover:scale-[1.02] transition"
>
          {tasks.length === 0 ? (
            <p className="text-gray-500">No tasks yet...</p>
          ) : (
            tasks.map((task) => (
              <div
                key={task._id}
               className="bg-white/5 backdrop-blur-lg border border-white/10 p-5 rounded-2xl shadow-lg hover:shadow-indigo-500/20 hover:scale-[1.02] transition"

              >
                <h3 className="text-lg font-semibold text-gray-200 mb-3"
>
                  {task.title}
                </h3>

                <button
                  onClick={() => deleteTask(task._id)}
                  className="text-sm bg-red-500/80 hover:bg-red-600 px-3 py-1 rounded transition"

                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
