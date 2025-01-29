import React, { useState, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { BsThreeDotsVertical } from "react-icons/bs";
import UpdateModal from "./UpdateModal";

const apiUrl = import.meta.env.VITE_API_URL;

const fetchTasks = async ({ queryKey }) => {
  const [, userId, token] = queryKey;
  const response = await axios.get(`${apiUrl}/tasks/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const TaskList = () => {
  const { token, userId } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const {
    data: tasks,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["tasks", userId, token],
    queryFn: fetchTasks,
    enabled: !!userId && !!token,
  });

  const [menuOpen, setMenuOpen] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleMenuToggle = (taskId) => {
    setMenuOpen((prev) => (prev === taskId ? null : taskId));
  };

  const handleUpdate = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`${apiUrl}/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      queryClient.invalidateQueries(["tasks", userId, token]);
    } catch (error) {
      console.error("Erro ao excluir a tarefa:", error);
    }
  };

  if (isLoading) return <div>Carregando...</div>;
  if (isError)
    return <div>{error.message || "Erro ao carregar as tarefas"}</div>;

  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white p-4 rounded-lg shadow-md relative"
            >
              <div className="absolute top-2 right-2">
                <button onClick={() => handleMenuToggle(task.id)}>
                  <BsThreeDotsVertical size={20} />
                </button>
                {menuOpen === task.id && (
                  <div
                    className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-lg"
                    onMouseLeave={() => setMenuOpen(null)}
                  >
                    <ul>
                      <li
                        onClick={() => handleUpdate(task)}
                        className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
                      >
                        Atualizar
                      </li>
                      <li
                        onClick={() => handleDelete(task.id)}
                        className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
                      >
                        Excluir
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <h3 className="font-bold text-lg">{task.title}</h3>
              <p className="text-sm text-gray-600">{task.description}</p>
              <p className="mt-2 text-sm">Status: {task.status}</p>
              <p className="text-sm">Prioridade: {task.priority}</p>
              <p className="text-sm">Data de Vencimento: {task.due_date}</p>
            </div>
          ))
        ) : (
          <p>Não há tarefas para exibir.</p>
        )}
      </div>

      <UpdateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={selectedTask}
        onUpdate={() => queryClient.invalidateQueries(["tasks", userId, token])}
      />
    </div>
  );
};

export default TaskList;
