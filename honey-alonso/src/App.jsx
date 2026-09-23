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
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [resultado, setResultado] = useState(null);

  function handleIniciar(nomeInformado, emailInformado) {
    setNome(nomeInformado);
    setEmail(emailInformado);
    setTela('instrucoes');
  }

  function handleContinuarInstrucoes() {
    setTela('questionario');
  }

  function handleFinalizarQuestionario(respostas) {
    const resultadoCalculado = calcularResultado(afirmativas, respostas);
    setResultado(resultadoCalculado);
    setTela('relatorio') - enviarResultado(nome, email, resultadoCalculado);
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
    return <Relatorio nome={nome} email={email} resultado={resultado} />;

  return null;
}

export default App;
