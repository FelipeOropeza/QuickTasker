import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const UpdateModal = ({ isOpen, onClose, task, onUpdate }) => {
  const { token, userId } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setStatus(task.status || "");
      setPriority(task.priority || "");
      setDueDate(task.due_date || "");
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task) return;

    try {
      await axios.put(
        `${apiUrl}/tasks/${task.id}`,
        {
          title,
          description,
          status,
          priority,
          due_date: dueDate,
          user_id: userId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar a tarefa:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        {/* Botão de Fechar */}
        <button
          className="absolute top-2 right-2 text-gray-600 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Título do Modal */}
        <h2 className="text-lg font-bold mb-4">Atualizar Tarefa</h2>

        {/* Formulário */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Título
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Descrição
            </label>
            <textarea
              className="w-full p-2 border rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              className="w-full p-2 border rounded"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="pendente">Pendente</option>
              <option value="em_progresso">Em Progresso</option>
              <option value="concluida">Concluída</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Prioridade
            </label>
            <select
              className="w-full p-2 border rounded"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              required
            >
              <option value="baixa">Baixa</option>
              <option value="media">Média</option>
              <option value="alta">Alta</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Data de Vencimento
            </label>
            <input
              type="date"
              className="w-full p-2 border rounded"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded w-full"
          >
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
