import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const apiUrl = import.meta.env.VITE_API_URL;

const fetchTasks = async ({ queryKey }) => {
  const [, userId, token] = queryKey;

  const response = await axios.get(`${apiUrl}/tasks/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const TaskList = () => {
  const { token, userId } = useContext(AuthContext);

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

  if (isLoading) {
    return <div></div>;
  }

  if (isError) {
    return <div>{error.message || "Erro ao carregar as tarefas"}</div>;
  }

  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task.id} className="bg-white p-4 rounded-lg shadow-md">
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
    </div>
  );
};

export default TaskList;
