import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';

const dadosTeste = [
  { estilo: 'Ativo', valor: 12 },
  { estilo: 'Reflexivo', valor: 8 },
  { estilo: 'Teórico', valor: 15 },
  { estilo: 'Pragmático', valor: 10 },
];

function App() {
  return (
    <div className="h-screen w-screen bg-gradient-to-br from-roxo-escuro via-roxo to-lilas flex items-center justify-center">
      <div className="bg-branco rounded-2xl p-6 w-96 h-96">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={dadosTeste}>
            <PolarGrid />
            <PolarAngleAxis dataKey="estilo" />
            <Radar
              dataKey="valor"
              stroke="#6B21A8"
              fill="#9333EA"
              fillOpacity={0.5}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default App;
