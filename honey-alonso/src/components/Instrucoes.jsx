function Instrucoes({ onContinuar }) {
  return (
    <div className="h-screen w-screen bg-gradient-to-br from-roxo-escuro via-roxo to-lilas flex items-center justify-center px-4">
      <div className="bg-branco rounded-2xl shadow-xl p-8 max-w-md w-full">
        <h2 className="text-xl font-bold text-roxo-escuro mb-4 text-center">
          Como funciona
        </h2>

        <ul className="text-gray-600 space-y-3 mb-6 text-left">
          <li>
            • Você vai ver <strong>80 afirmativas</strong>, uma de cada vez.
          </li>
          <li>
            • Para cada uma, indique se ela <strong>se aplica</strong> ou{' '}
            <strong>não se aplica</strong> ao seu jeito de ser — não existe
            resposta certa ou errada.
          </li>
          <li>
            • Você pode <strong>voltar</strong> e mudar uma resposta anterior
            a qualquer momento.
          </li>
          <li>
            • Leva em média <strong>10 a 15 minutos</strong> para concluir.
          </li>
          <li>
            • Ao final, você recebe um <strong>relatório instantâneo</strong>{' '}
            com seu perfil de aprendizagem.
          </li>
        </ul>

        <button
          onClick={onContinuar}
          className="w-full bg-roxo-escuro hover:bg-roxo text-branco font-semibold py-2 rounded-lg transition-colors"
        >
          Estou pronto, vamos começar
        </button>
      </div>
    </div>
  )
}

export default Instrucoes