import { useState } from 'react';
import Boasvindas from './components/Boasvindas';
import Instrucoes from './components/Instrucoes';
import Questionario from './components/Questionario';
import Relatorio from './components/Relatorio';
import { afirmativas } from './data/afirmativas';
import { calcularResultado } from './utils/calcularResultado';
import { enviarResultado } from './utils/enviarResultado';

function App() {
  const [tela, setTela] = useState('boasvindas');
  const [identificacao, setIdentificacao] = useState('');
  const [resultado, setResultado] = useState(null);

  function handleIniciar(valor) {
    setIdentificacao(valor);
    setTela('instrucoes');
  }

  function handleContinuarInstrucoes() {
    setTela('questionario');
  }

  function handleFinalizarQuestionario(respostas) {
    setResultado(calcularResultado(afirmativas, respostas));
    setTela('relatorio');
  }

  function handleFinalizarQuestionario(respostas) {
    const resultadoCalculado = calcularResultado(afirmativas, respostas);
    setResultado(resultadoCalculado);
    setTela('relatorio'); // mostra o relatório na hora, sem esperar a gravação
    enviarResultado(identificacao, resultadoCalculado); // grava em segundo plano
  }

  if (tela === 'boasvindas') return <Boasvindas onIniciar={handleIniciar} />;
  if (tela === 'instrucoes')
    return <Instrucoes onContinuar={handleContinuarInstrucoes} />;
  if (tela === 'questionario')
    return (
      <Questionario
        afirmativas={afirmativas}
        onFinalizar={handleFinalizarQuestionario}
      />
    );
  if (tela === 'relatorio')
    return <Relatorio identificacao={identificacao} resultado={resultado} />;

  return null;
}

export default App;
