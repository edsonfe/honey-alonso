// src/App.jsx
import { useState } from 'react';
import Boasvindas from './components/Boasvindas';
import Instrucoes from './components/Instrucoes';
import Questionario from './components/Questionario';
import Relatorio from './components/Relatorio';
import { afirmativas } from './data/afirmativas';
import { calcularResultado } from './utils/calcularResultado';

function App() {
  const [tela, setTela] = useState('boasvindas');
  const [identificacao, setIdentificacao] = useState('');
  const [respostasFinais, setRespostasFinais] = useState(null);

  function handleIniciar(valor) {
    setIdentificacao(valor);
    setTela('instrucoes');
  }

  function handleContinuarInstrucoes() {
    setTela('questionario');
  }

  function handleFinalizarQuestionario(respostas) {
    const resultado = calcularResultado(afirmativas, respostas);
    setRespostasFinais(resultado);
    setTela('relatorio');
  }

  function handleReiniciar() {
    setIdentificacao('');
    setRespostasFinais(null);
    setTela('boasvindas');
  }

  if (tela === 'boasvindas') return <Boasvindas onIniciar={handleIniciar} />;
  if (tela === 'instrucoes')
    return <Instrucoes onContinuar={handleContinuarInstrucoes} />;
  // src/App.jsx (trecho da renderização)
  if (tela === 'questionario')
    return (
      <Questionario
        key={identificacao} // Garante o reset do estado interno ao reiniciar
        afirmativas={afirmativas}
        onFinalizar={handleFinalizarQuestionario}
      />
    );
  if (tela === 'relatorio')
    return (
      <Relatorio
        identificacao={identificacao}
        resultado={respostasFinais}
        onReiniciar={handleReiniciar}
      />
    );

  return null;
}

export default App;
