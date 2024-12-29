import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function CadastroForm({ onCadastro }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { name, email, password };
    onCadastro(userData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-3 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Cadastrar</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Nome</span>
            </label>
            <input
              type="text"
              placeholder="Nome"
              className="input input-bordered w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">Cadastrar</button>
        </form>
        <p className="text-center">
          Já tem uma conta? <Link to="/" className="text-blue-500">Faça login</Link>
        </p>
      </div>
    </div>
  );
}

export default CadastroForm;