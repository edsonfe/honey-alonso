import { useRef, useState } from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Zap, Search, BookOpen, Wrench } from 'lucide-react';

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

function Relatorio({ identificacao, resultado }) {
  const relatorioRef = useRef(null);
  const [gerando, setGerando] = useState(false);

  const dadosGrafico = Object.entries(resultado.pontuacao).map(
    ([estilo, valor]) => ({
      estilo: nomesEstilos[estilo],
      valor,
    }),
  );

  const IconeDominante = iconesEstilos[resultado.estiloDominante];

  async function baixarPDF() {
    setGerando(true);
    const canvas = await html2canvas(relatorioRef.current, {
      scale: 2,
      backgroundColor: '#ffffff',
    });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const largura = pdf.internal.pageSize.getWidth();
    const altura = (canvas.height * largura) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, largura, altura);
    pdf.save(`relatorio-honey-alonso-${identificacao}.pdf`);
    setGerando(false);
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-roxo-escuro via-roxo to-lilas flex items-center justify-center px-4 py-6 sm:py-8">
      <div className="w-full max-w-2xl">
        <div
          ref={relatorioRef}
          className="bg-branco rounded-2xl shadow-xl p-5 sm:p-8"
        >
          <h1 className="text-xl sm:text-2xl font-bold text-roxo-escuro text-center mb-1">
            Relatório de Estilo de Aprendizagem
          </h1>
          <p className="text-gray-500 text-sm sm:text-base text-center mb-6 break-words">
            {identificacao}
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
              {nomesEstilos[resultado.estiloDominante]}
            </p>
            <p className="text-gray-600 text-sm sm:text-base mt-2">
              {descricoes[resultado.estiloDominante]}
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
          onClick={baixarPDF}
          disabled={gerando}
          className="mt-6 w-full bg-branco hover:bg-lilas/30 text-roxo-escuro font-semibold py-3 rounded-lg transition-colors disabled:opacity-60 text-sm sm:text-base"
        >
          {gerando ? 'Gerando PDF...' : 'Baixar relatório em PDF'}
        </button>
      </div>
    </div>
  );
}

export default Relatorio;
