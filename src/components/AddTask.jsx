import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const AddTask = ({ setIsModalOpen, token, userId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('media');
  const [dueDate, setDueDate] = useState('');

  const queryClient = useQueryClient();

  const addTaskMutation = useMutation({
    mutationFn: async (newTask) => {
      const response = await axios.post(`${apiUrl}/tasks`, newTask, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks', userId, token]);
    },
  });

  const handleSubmit = () => {
    if (title.trim()) {
      const newTask = {
        title,
        description,
        status: 'pendente',
        priority,
        ...(dueDate && { due_date: dueDate }),
        user_id: userId,
      };

      addTaskMutation.mutate(newTask);
      setIsModalOpen(false);

      setTitle('');
      setDescription('');
      setPriority('media');
      setDueDate('');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Adicionar Tarefa</h2>

        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          placeholder="Título da tarefa"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Prioridade</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="baixa">Baixa</option>
            <option value="media">Média</option>
            <option value="alta">Alta</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Data de Vencimento</label>
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div className="flex justify-between">
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded-md"
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            Cancelar
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
            onClick={handleSubmit}
            disabled={addTaskMutation.isLoading || !title.trim()}
          >
            {addTaskMutation.isLoading ? 'Adicionando...' : 'Adicionar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
