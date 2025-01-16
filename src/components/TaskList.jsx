import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const apiUrl = import.meta.env.VITE_API_URL;

const TaskList = () => {
  const { token, userId } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${apiUrl}/tasks/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(response.data);
      } catch (err) {
        setError('Erro ao carregar as tarefas');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [token, userId]);

  if (loading) {
    return <div>Carregando tarefas...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold">Tarefas:</h2>
      <ul>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task.id} className="mb-2">
              <p className="font-bold">{task.title}</p>
              <p>{task.description}</p>
              <p>Status: {task.status}</p>
              <p>Prioridade: {task.priority}</p>
              <p>Data de Vencimento: {task.due_date}</p>
            </li>
          ))
        ) : (
          <p>Não há tarefas para exibir.</p>
        )}
      </ul>
    </div>
  );
};

export default TaskList;
