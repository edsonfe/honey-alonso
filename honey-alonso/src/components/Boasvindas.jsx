import { useState } from 'react';
import logo from '../assets/Logo_audaz.png';

function Boasvindas({ onIniciar }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [erro, setErro] = useState('');

  function validarEmail(valor) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
  }

  function handleIniciar() {
    if (nome.trim() === '') {
      setErro('Preencha seu nome para continuar.');
      return;
    }
    if (!validarEmail(email.trim())) {
      setErro('Preencha um e-mail válido para continuar.');
      return;
    }
    setErro('');
    onIniciar(nome.trim(), email.trim());
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-roxo-escuro via-roxo to-lilas flex items-center justify-center px-4 py-6">
      {' '}
      <div className="bg-branco rounded-2xl shadow-xl p-5 sm:p-8 max-w-md w-full text-center">
        {' '}
        {/* LOGO */}
        <img
          src={logo}
          alt="Logo do Questionário Honey-Alonso"
          className="w-50 h-auto mx-auto mb-5"
        />
        <h1 className="text-xl sm:text-2xl font-bold text-roxo-escuro mb-2">
          Questionário Honey-Alonso
        </h1>
        <p className="text-gray-600 text-sm sm:text-base mb-6">
          Descubra seu estilo de aprendizagem predominante
          <br />
          ·Ativo, Reflexivo, Teórico, Pragmático. <br />
          Responda a uma série de afirmativas simples. Receba instantâneamente seu resultado.
        </p>
        <label className="block text-left text-sm font-medium text-gray-700 mb-1">
          Nome
        </label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Digite seu nome"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-roxo"
        />
        <label className="block text-left text-sm font-medium text-gray-700 mb-1">
          E-mail
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu e-mail"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-1 focus:outline-none focus:ring-2 focus:ring-roxo"
        />
        {erro && <p className="text-red-500 text-sm mb-3">{erro}</p>}
        <button
          onClick={handleIniciar}
          className="mt-4 w-full bg-roxo-escuro hover:bg-roxo text-branco font-semibold py-2 rounded-lg transition-colors"
        >
          Começar
        </button>
      </div>
    </div>
  );
}

export default Boasvindas;
