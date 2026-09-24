import { useState } from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';
import { Zap, Search, BookOpen, Wrench, Mail, X } from 'lucide-react';
import { enviarResultado } from '../utils/enviarResultado';

const descricoes = {
  ativo:
    'Aprende melhor quando está diretamente envolvido em experiências novas — gosta de agir, testar e participar ativamente.',
  reflexivo:
    'Prefere observar, coletar informações e analisar com calma antes de tirar conclusões.',
  teorico:
    'Busca lógica, coerência e estrutura — gosta de entender os princípios e modelos por trás das coisas.',
  pragmatico:
    'Foca na aplicação prática — gosta de testar métodos e ver utilidade real no que aprende.',
};

const nomesEstilos = {
  ativo: 'Ativo',
  reflexivo: 'Reflexivo',
  teorico: 'Teórico',
  pragmatico: 'Pragmático',
};
const iconesEstilos = {
  ativo: Zap,
  reflexivo: Search,
  teorico: BookOpen,
  pragmatico: Wrench,
};

const detalhesEstilos = {
  ativo: {
    pergunta: '"Vamos experimentar?"',
    caracteristicas: [
      'Gosta de se envolver diretamente na atividade',
      'Aceita desafios com facilidade',
      'Prefere aprender fazendo, na prática',
      'Costuma se dar bem em atividades em grupo',
      'Gosta de situações novas e imprevisíveis',
    ],
    dica: 'Experimente aprender por meio de simulações, dinâmicas em grupo e atividades práticas, em vez de apenas leitura teórica.',
    final:
      'Além dessas, receba as melhores dicas personalizadas para seu perfil, por uma equipe qualificada.',
  },
  reflexivo: {
    pergunta: '"O que exatamente aconteceu, e como posso analisar isso?"',
    caracteristicas: [
      'Observa com cuidado antes de agir',
      'Coleta informações de diferentes fontes',
      'Prefere ter tempo para pensar antes de se posicionar',
      'Analisa experiências com calma',
      'Evita tirar conclusões precipitadas',
    ],
    dica: 'Aproveite atividades como análise de casos, comparação de fontes e debates em que você tenha tempo pra organizar os argumentos antes de falar.',
    final:
      'Além dessas, receba as melhores dicas personalizadas para seu perfil, por uma equipe qualificada.',
  },
  teorico: {
    pergunta: '"Qual é a explicação lógica para isso?"',
    caracteristicas: [
      'Busca coerência e fundamentação lógica',
      'Gosta de teorias, modelos e estruturas explicativas',
      'Organiza informações de forma sistemática',
      'Valoriza argumentos bem fundamentados',
      'Tende a identificar contradições e inconsistências',
    ],
    dica: 'Busque entender o "porquê" por trás dos conteúdos — mapas conceituais e esquemas lógicos tendem a funcionar bem pra você.',
    final:
      'Além dessas, receba as melhores dicas personalizadas para seu perfil, por uma equipe qualificada.',
  },
  pragmatico: {
    pergunta: '"Como posso utilizar isso na prática?"',
    caracteristicas: [
      'Busca aplicação prática e utilidade real',
      'Gosta de testar métodos e ver resultados concretos',
      'Prefere situações objetivas a discussões abstratas',
      'Valoriza soluções que funcionem de verdade',
      'Pode perder interesse quando não enxerga aplicação prática',
    ],
    dica: 'Procure exercícios e estudos de caso que apliquem o conteúdo em situações reais, em vez de só teoria pura.',
    final:
      'Além dessas, receba as melhores dicas personalizadas para seu perfil, por uma equipe qualificada.',
  },
};

function Relatorio({ nome, email, whatsapp, resultado }) {
  const [modalAutorizacaoAberto, setModalAutorizacaoAberto] = useState(true);
  const [modalDetalhesAberto, setModalDetalhesAberto] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const dadosGrafico = Object.entries(resultado.pontuacao).map(
    ([estilo, valor]) => ({
      estilo: nomesEstilos[estilo],
      valor,
    }),
  );

  const estiloDominante = resultado.estiloDominante;
  const IconeDominante = iconesEstilos[estiloDominante];
  const detalhes = detalhesEstilos[estiloDominante];

  async function responderAutorizacao(autorizou) {
    setEnviando(true);
    await enviarResultado(nome, email, whatsapp, resultado, autorizou);
    setEnviando(false);
    setModalAutorizacaoAberto(false);
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-roxo-escuro via-roxo to-lilas flex items-center justify-center px-4 py-6 sm:py-8">
      <div className="w-full max-w-2xl">
        <div className="bg-branco rounded-2xl shadow-xl p-5 sm:p-8">
          <h1 className="text-xl sm:text-2xl font-bold text-roxo-escuro text-center mb-1">
            Relatório de Estilo de Aprendizagem
          </h1>
          <p className="text-gray-500 text-sm sm:text-base text-center mb-1 break-words">
            {nome}
          </p>
          <p className="text-gray-400 text-xs sm:text-sm text-center mb-6 break-words">
            {email}
          </p>

          <div className="h-56 sm:h-72 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={dadosGrafico}>
                <PolarGrid />
                <PolarAngleAxis dataKey="estilo" tick={{ fontSize: 12 }} />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 20]}
                  tick={false}
                  axisLine={false}
                />
                <Radar
                  dataKey="valor"
                  stroke="#6B21A8"
                  fill="#9333EA"
                  fillOpacity={0.5}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-lilas/20 border border-lilas rounded-xl p-4 mb-6 flex flex-col items-center text-center">
            <IconeDominante
              className="w-8 h-8 text-roxo-escuro mb-2"
              strokeWidth={2}
            />
            <p className="text-sm text-gray-500 mb-1">
              Seu estilo predominante
            </p>
            <p className="text-lg sm:text-xl font-bold text-roxo-escuro">
              {nomesEstilos[estiloDominante]}
            </p>
            <p className="text-gray-600 text-sm sm:text-base mt-2">
              {descricoes[estiloDominante]}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {Object.entries(resultado.pontuacao).map(([estilo, valor]) => {
              const Icone = iconesEstilos[estilo];
              return (
                <div
                  key={estilo}
                  className="border border-gray-200 rounded-lg p-3 flex items-center gap-2"
                >
                  <Icone
                    className="w-5 h-5 text-roxo shrink-0"
                    strokeWidth={2}
                  />
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-roxo-escuro">
                      {nomesEstilos[estilo]}
                    </p>
                    <p className="text-gray-500 text-xs sm:text-sm">
                      {valor} / 20
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={() => setModalDetalhesAberto(true)}
          className="mt-6 w-full bg-branco hover:bg-lilas/30 text-roxo-escuro font-semibold py-3 rounded-lg transition-colors text-sm sm:text-base"
        >
          Saber mais sobre o tipo {nomesEstilos[estiloDominante]} de
          aprendizagem
        </button>
      </div>

      {/* Modal de detalhes do estilo */}
      {modalDetalhesAberto && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50">
          <div className="bg-branco rounded-2xl p-6 max-w-md w-full relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setModalDetalhesAberto(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-roxo-escuro"
            >
              <X className="w-5 h-5" />
            </button>

            <IconeDominante
              className="w-10 h-10 text-roxo-escuro mb-3"
              strokeWidth={2}
            />
            <h2 className="text-lg font-bold text-roxo-escuro mb-1">
              Estilo {nomesEstilos[estiloDominante]}
            </h2>
            <p className="text-gray-500 text-sm italic mb-4">
              {detalhes.pergunta}
            </p>

            <p className="text-gray-600 text-sm mb-4">
              {descricoes[estiloDominante]}
            </p>

            <p className="text-sm font-semibold text-roxo-escuro mb-2">
              Características
            </p>
            <ul className="text-gray-600 text-sm space-y-1 mb-4 list-disc list-inside">
              {detalhes.caracteristicas.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <p className="text-sm font-semibold text-roxo-escuro mb-1">
              Dica padrão
            </p>
            <p className="text-gray-600 text-sm">{detalhes.dica}</p>
            <br />
            <p className="text-sm font-semibold text-roxo-escuro mb-1">
              Dicas personalizadas
            </p>
            <p className="text-gray-600 text-sm">{detalhes.final}</p>
          </div>
        </div>
      )}

      {/* Modal de autorização — aparece automaticamente ao entrar nessa tela */}
      {modalAutorizacaoAberto && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50">
          <div className="bg-branco rounded-2xl p-6 max-w-sm w-full text-center">
            <Mail
              className="w-8 h-8 text-roxo-escuro mx-auto mb-3"
              strokeWidth={2}
            />
            <h2 className="text-lg font-bold text-roxo-escuro mb-2">
              Receber por e-mail?
            </h2>
            <p className="text-gray-600 text-sm mb-5">
              Você autoriza nossa equipe a enviar este relatório para{' '}
              <span className="font-medium">{email}</span>?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => responderAutorizacao(false)}
                disabled={enviando}
                className="flex-1 py-2 rounded-lg border-2 border-roxo-escuro text-roxo-escuro font-semibold hover:bg-lilas/30 transition-colors disabled:opacity-60"
              >
                Não
              </button>
              <button
                onClick={() => responderAutorizacao(true)}
                disabled={enviando}
                className="flex-1 py-2 rounded-lg bg-roxo-escuro text-branco font-semibold hover:bg-roxo transition-colors disabled:opacity-60"
              >
                {enviando ? 'Enviando...' : 'Sim, autorizo'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Relatorio;
