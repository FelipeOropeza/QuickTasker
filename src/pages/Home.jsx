import React, { useState } from 'react';
import SideBar from '../components/SideBar';
import AddTask from '../components/AddTask';
import TaskList from '../components/TaskList';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTask = (task) => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex h-screen">
      <SideBar />

      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-3xl font-bold">Home Page</h1>

        <button
          className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl fixed bottom-6 right-6"
          onClick={() => setIsModalOpen(true)}
        >
          +
        </button>

        {isModalOpen && <AddTask onAddTask={handleAddTask} setIsModalOpen={setIsModalOpen} />}

        <TaskList />
      </div>
    </div>
  );
};

export default Home;
