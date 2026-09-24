import { useState } from 'react';
import Boasvindas from './components/Boasvindas';
import Instrucoes from './components/Instrucoes';
import Questionario from './components/Questionario';
import Relatorio from './components/Relatorio';
import { Footer } from './components/Footer';
import { afirmativas } from './data/afirmativas';
import { calcularResultado } from './utils/calcularResultado';
import { enviarResultado } from './utils/enviarResultado';

function App() {
  const [tela, setTela] = useState('boasvindas');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [resultado, setResultado] = useState(null);
  const [whatsapp, setWhatsapp] = useState('');

  function handleIniciar(nomeInformado, emailInformado, whatsappInformado) {
    setNome(nomeInformado);
    setEmail(emailInformado);
    setWhatsapp(whatsappInformado);
    setTela('instrucoes');
  }

  function handleContinuarInstrucoes() {
    setTela('questionario');
  }

  function handleFinalizarQuestionario(respostas) {
    const resultadoCalculado = calcularResultado(afirmativas, respostas);

    setResultado(resultadoCalculado);
    setTela('relatorio');
    enviarResultado(nome, email, whatsapp, resultadoCalculado, false);
  }

  function renderTela() {
    if (tela === 'boasvindas') {
      return <Boasvindas onIniciar={handleIniciar} />;
    }

    if (tela === 'instrucoes') {
      return <Instrucoes onContinuar={handleContinuarInstrucoes} />;
    }

    if (tela === 'questionario') {
      return (
        <Questionario
          afirmativas={afirmativas}
          onFinalizar={handleFinalizarQuestionario}
        />
      );
    }

    if (tela === 'relatorio') {
      return <Relatorio nome={nome} email={email} resultado={resultado} whatsapp={whatsapp} />;
    }

    return null;
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <main className="flex-1 min-h-0">{renderTela()}</main>

      <Footer />
    </div>
  );
}

export default App;
