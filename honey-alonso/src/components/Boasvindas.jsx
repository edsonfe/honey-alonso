import { useState } from 'react'

function Boasvindas({ onIniciar }) {
  const [identificacao, setIdentificacao] = useState('')
  const [erro, setErro] = useState('')

  function handleIniciar() {
    if (identificacao.trim() === '') {
      setErro('Preencha seu nome ou e-mail para continuar.')
      return
    }
    setErro('')
    onIniciar(identificacao.trim())
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-roxo-escuro via-roxo to-lilas flex items-center justify-center px-4">
      <div className="bg-branco rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-roxo-escuro mb-2">
          Questionário Honey-Alonso
        </h1>
        <p className="text-gray-600 mb-6">
          Descubra seu estilo de aprendizagem predominante — Ativo, Reflexivo,
          Teórico ou Pragmático — respondendo a uma série de afirmativas simples.
          Ao final, você recebe um relatório instantâneo e detalhado.
        </p>

        <label className="block text-left text-sm font-medium text-gray-700 mb-1">
          Nome ou e-mail
        </label>
        <input
          type="text"
          value={identificacao}
          onChange={(e) => setIdentificacao(e.target.value)}
          placeholder="Digite aqui"
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
  )
}

export default Boasvindas