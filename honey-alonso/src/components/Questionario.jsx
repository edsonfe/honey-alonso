import { useState } from 'react'

function Questionario({ afirmativas, onFinalizar }) {
  const [indice, setIndice] = useState(0)
  const [respostas, setRespostas] = useState(Array(afirmativas.length).fill(null))

  const afirmativaAtual = afirmativas[indice]
  const progresso = Math.round(((indice + 1) / afirmativas.length) * 100)

  function responder(valor) {
    const novasRespostas = [...respostas]
    novasRespostas[indice] = valor
    setRespostas(novasRespostas)

    if (indice < afirmativas.length - 1) {
      setIndice(indice + 1)
    } else {
      onFinalizar(novasRespostas)
    }
  }

  function voltar() {
    if (indice > 0) setIndice(indice - 1)
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-roxo-escuro via-roxo to-lilas flex items-center justify-center px-4">
      <div className="bg-branco rounded-2xl shadow-xl p-8 max-w-md w-full">
        {/* Barra de progresso */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div
            className="bg-roxo h-2 rounded-full transition-all"
            style={{ width: `${progresso}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 mb-6">
          {indice + 1} / {afirmativas.length}
        </p>

        <p className="text-lg text-gray-800 mb-8 text-center">
          {afirmativaAtual.texto}
        </p>

        <div className="flex gap-3 mb-4">
          <button
            onClick={() => responder(false)}
            className={`flex-1 py-2 rounded-lg font-semibold border-2 transition-colors ${
              respostas[indice] === false
                ? 'bg-roxo-escuro text-branco border-roxo-escuro'
                : 'text-roxo-escuro border-roxo-escuro hover:bg-lilas/30'
            }`}
          >
            Não se aplica
          </button>
          <button
            onClick={() => responder(true)}
            className={`flex-1 py-2 rounded-lg font-semibold border-2 transition-colors ${
              respostas[indice] === true
                ? 'bg-roxo-escuro text-branco border-roxo-escuro'
                : 'text-roxo-escuro border-roxo-escuro hover:bg-lilas/30'
            }`}
          >
            Se aplica
          </button>
        </div>

        {indice > 0 && (
          <button
            onClick={voltar}
            className="w-full text-gray-500 text-sm hover:text-roxo-escuro transition-colors"
          >
            ← Voltar para a anterior
          </button>
        )}
      </div>
    </div>
  )
}

export default Questionario