import React, { useState, useContext } from "react";
import SideBar from "../components/SideBar";
import AddTask from "../components/AddTask";
import { AuthContext } from "../context/AuthContext";
import TaskList from "../components/TaskList";

const Home = () => {
  const { token, userId } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <SideBar />

      <div className="flex-1 p-6 overflow-auto">
        <button
          className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl fixed bottom-6 right-6 z-50"
          onClick={() => setIsModalOpen(true)}
        >
          +
        </button>

        {isModalOpen && (
          <AddTask
            setIsModalOpen={setIsModalOpen}
            token={token}
            userId={userId}
          />
        )}

        <TaskList />
      </div>
    </div>
  );
};

export default Home;
