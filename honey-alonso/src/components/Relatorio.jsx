// src/components/Relatorio.jsx
import { useEffect, useState } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import { estilosInfo } from '../data/estilosInfo';

function Relatorio({ identificacao, resultado, onReiniciar }) {
  const [statusEnvio, setStatusEnvio] = useState('enviando');
  const { pontuacao, estiloDominante } = resultado;
  const infoDominante = estilosInfo[estiloDominante];

  const chartData = [
    { estilo: 'Ativo', valor: pontuacao.ativo },
    { estilo: 'Reflexivo', valor: pontuacao.reflexivo },
    { estilo: 'Teórico', valor: pontuacao.teorico },
    { estilo: 'Pragmático', valor: pontuacao.pragmatico },
  ];

  useEffect(() => {
    const URL_WEB_APP = 'COLOQUE_SUA_URL_DO_GOOGLE_APPS_SCRIPT_AQUI';

    if (!URL_WEB_APP || URL_WEB_APP.includes('COLOQUE_SUA_URL')) {
      setStatusEnvio('sucesso');
      return;
    }

    const payload = {
      identificacao,
      estiloDominante: infoDominante.nome,
      ativo: pontuacao.ativo,
      reflexivo: pontuacao.reflexivo,
      teorico: pontuacao.teorico,
      pragmatico: pontuacao.pragmatico,
      data: new Date().toLocaleString('pt-BR'),
    };

    fetch(URL_WEB_APP, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(() => setStatusEnvio('sucesso'))
      .catch(() => setStatusEnvio('erro'));
  }, [identificacao, pontuacao, estiloDominante, infoDominante.nome]);

  // Dispara a janela de impressão/salvar em PDF nativa
  function handleBaixarPDF() {
    window.print();
  }

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-roxo-escuro via-roxo to-lilas py-8 px-4 flex flex-col items-center justify-center print:bg-white print:py-0 print:px-0">
      <div
        id="conteudo-relatorio"
        className="bg-branco rounded-2xl shadow-xl p-8 max-w-2xl w-full text-gray-800 print:shadow-none print:max-w-full print:p-0"
      >
        <header className="border-b pb-4 mb-6 text-center">
          <h1 className="text-2xl font-bold text-roxo-escuro">
            Relatório de Estilo de Aprendizagem
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Participante:{' '}
            <strong className="text-gray-800">{identificacao}</strong>
          </p>
        </header>

        {/* Gráfico Radar */}
        <div className="w-full h-64 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="estilo" stroke="#4B5563" />
              <PolarRadiusAxis angle={30} domain={[0, 20]} />
              <Radar
                name="Pontuação"
                dataKey="valor"
                stroke="#6B21A8"
                fill="#8B5CF6"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Estilo Dominante */}
        <div className="bg-lilas/20 border border-roxo/30 rounded-xl p-5 mb-6 print:border-gray-300">
          <span className="text-xs font-bold uppercase tracking-wider text-roxo-escuro block mb-1">
            Estilo Dominante
          </span>
          <h2 className="text-xl font-bold text-roxo mb-2">
            {infoDominante.nome}
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            {infoDominante.descricao}
          </p>
          <ul className="text-xs text-gray-600 space-y-1">
            {infoDominante.caracteristicas.map((item, idx) => (
              <li key={idx}>• {item}</li>
            ))}
          </ul>
        </div>

        {/* Resumo Numérico */}
        <div className="grid grid-cols-4 gap-2 text-center mb-6">
          <div className="bg-gray-50 p-3 rounded-lg border">
            <span className="block text-xs text-gray-500">Ativo</span>
            <span className="text-lg font-bold text-roxo-escuro">
              {pontuacao.ativo}
            </span>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg border">
            <span className="block text-xs text-gray-500">Reflexivo</span>
            <span className="text-lg font-bold text-roxo-escuro">
              {pontuacao.reflexivo}
            </span>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg border">
            <span className="block text-xs text-gray-500">Teórico</span>
            <span className="text-lg font-bold text-roxo-escuro">
              {pontuacao.teorico}
            </span>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg border">
            <span className="block text-xs text-gray-500">Pragmático</span>
            <span className="text-lg font-bold text-roxo-escuro">
              {pontuacao.pragmatico}
            </span>
          </div>
        </div>

        {/* Status do envio (oculto na impressão) */}
        {statusEnvio === 'sucesso' && (
          <p className="text-xs text-emerald-600 text-center mb-4 print:hidden">
            ✓ Resultado salvo com sucesso na planilha.
          </p>
        )}
      </div>

      {/* Botões de Ação (escondidos no PDF/Impressão) */}
      <div className="max-w-2xl w-full mt-4 flex gap-4 print:hidden">
        <button
          type="button"
          onClick={handleBaixarPDF}
          className="flex-1 bg-branco hover:bg-gray-100 text-roxo-escuro font-semibold py-3 rounded-xl shadow-md transition-colors text-center cursor-pointer"
        >
          Baixar Relatório (PDF)
        </button>
        <button
          type="button"
          onClick={onReiniciar}
          className="bg-roxo-escuro hover:bg-roxo text-branco font-semibold px-6 py-3 rounded-xl shadow-md transition-colors text-center cursor-pointer"
        >
          Refazer Teste
        </button>
      </div>
    </div>
  );
}

export default Relatorio;
