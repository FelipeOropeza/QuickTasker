import React from 'react';
import { Link } from 'react-router-dom';

function CadastroForm() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-3 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Cadastro</h1>
        <form className="space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Nome</span>
            </label>
            <input type="text" placeholder="Nome" className="input input-bordered w-full" />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" placeholder="Email" className="input input-bordered w-full" />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input type="password" placeholder="Password" className="input input-bordered w-full" />
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