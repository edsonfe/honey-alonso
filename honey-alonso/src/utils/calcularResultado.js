export function calcularResultado(afirmativas, respostas) {
  const estilos = ['ativo', 'reflexivo', 'teorico', 'pragmatico']

  // Inicializa contador zerado pra cada estilo
  const pontuacao = Object.fromEntries(estilos.map((e) => [e, 0]))

  afirmativas.forEach((afirmativa, i) => {
    if (respostas[i] === true) {
      pontuacao[afirmativa.estilo] += 1
    }
  })

  // Estilo dominante = maior pontuação
  const estiloDominante = estilos.reduce((a, b) =>
    pontuacao[a] >= pontuacao[b] ? a : b
  )

  return { pontuacao, estiloDominante }
}