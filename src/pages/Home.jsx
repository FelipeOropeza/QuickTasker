import React from 'react';
import SideBar from '../components/SideBar';

function Home() {
  return (
    <div className="flex h-screen">
      <SideBar />

      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-3xl font-bold">Home Page</h1>
        <p>Conteúdo principal da página...</p>

      </div>
    </div>
  );
}

export default Home;
