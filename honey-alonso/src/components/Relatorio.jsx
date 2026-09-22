import { useRef, useState } from 'react'
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts'
import {
  Zap,
  Search,
  BookOpen,
  Wrench,
  Mail,
  CheckCircle2,
  X,
  Sparkles,
} from 'lucide-react'

const descricoes = {
  ativo:
    'Aprende melhor quando está diretamente envolvido em experiências novas — gosta de agir, testar e participar ativamente.',
  reflexivo:
    'Prefere observar, coletar informações e analisar com calma antes de tirar conclusões.',
  teorico:
    'Busca lógica, coerência e estrutura — gosta de entender os princípios e modelos por trás das coisas.',
  pragmatico:
    'Foca na aplicação prática — gosta de testar métodos e ver utilidade real no que aprende.',
}

const nomesEstilos = {
  ativo: 'Ativo',
  reflexivo: 'Reflexivo',
  teorico: 'Teórico',
  pragmatico: 'Pragmático',
}

const iconesEstilos = {
  ativo: Zap,
  reflexivo: Search,
  teorico: BookOpen,
  pragmatico: Wrench,
}

function Relatorio({ nome, email, resultado }) {
  const relatorioRef = useRef(null)

  // Estados de controle do Modal e Envio de E-mail
  const [modalAberto, setModalAberto] = useState(false)
  const [emailInput, setEmailInput] = useState(email || '')
  const [enviando, setEnviando] = useState(false)
  const [enviadoComSucesso, setEnviadoComSucesso] = useState(false)

  const dadosGrafico = Object.entries(resultado.pontuacao).map(
    ([estilo, valor]) => ({
      estilo: nomesEstilos[estilo],
      valor,
    })
  )

  const IconeDominante = iconesEstilos[resultado.estiloDominante]

  async function handleEnviarEmail(e) {
    e.preventDefault()
    setEnviando(true)

    try {
      // SUBSTiTUIR AQUI PELA SUA REQUISIÇÃO DE BACKEND / APPS SCRIPT SE NECESSÁRIO
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulação de envio

      setEnviadoComSucesso(true)
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error)
    } finally {
      setEnviando(false)
    }
  }

  function fecharModal() {
    setModalAberto(false)
    setEnviadoComSucesso(false)
  }

  return (
    <div
      ref={relatorioRef}
      className="bg-white rounded-2xl shadow-xl p-6 sm:p-8"
    >
      {/* CARD DO RELATÓRIO */}

      <h1 className="text-2xl sm:text-3xl font-bold text-roxo-escuro text-center">
        Relatório de Estilo de Aprendizagem
      </h1>

      <div className="mt-2 text-center">
        <p className="font-semibold text-gray-800">{nome}</p>
        <p className="text-sm text-gray-500">{email}</p>
      </div>

      {/* GRÁFICO RECHARTS */}

      <div className="w-full h-72 sm:h-80 mt-6">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={dadosGrafico}>
            <PolarGrid />
            <PolarAngleAxis dataKey="estilo" />
            <PolarRadiusAxis />
            <Radar
              dataKey="valor"
              name="Pontuação"
              fill="currentColor"
              fillOpacity={0.5}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* ESTILO PREDOMINANTE */}

      <div className="mt-6 text-center">
        <p className="text-sm font-medium text-gray-500">
          Seu estilo predominante
        </p>

        <div className="flex items-center justify-center gap-2 mt-2">
          <IconeDominante className="w-6 h-6 text-roxo" />

          <h2 className="text-2xl font-bold text-roxo-escuro">
            {nomesEstilos[resultado.estiloDominante]}
          </h2>
        </div>

        <p className="mt-3 text-gray-600 text-sm sm:text-base">
          {descricoes[resultado.estiloDominante]}
        </p>
      </div>

      {/* GRADE DE PONTUAÇÃO */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        {Object.entries(resultado.pontuacao).map(([estilo, valor]) => {
          const Icone = iconesEstilos[estilo]

          return (
            <div
              key={estilo}
              className="flex items-center justify-between bg-gray-50 rounded-lg p-4"
            >
              <div className="flex items-center gap-3">
                <Icone className="w-5 h-5 text-roxo" />

                <span className="font-medium text-gray-800">
                  {nomesEstilos[estilo]}
                </span>
              </div>

              <span className="font-semibold text-roxo-escuro">
                {valor} / 20
              </span>
            </div>
          )
        })}
      </div>

      {/* BOTÃO PRINCIPAL */}

      <button
        onClick={() => setModalAberto(true)}
        className="mt-6 w-full bg-branco hover:bg-lilas/30 text-roxo-escuro font-semibold py-3 px-4 rounded-lg transition-colors text-sm sm:text-base flex items-center justify-center gap-2 shadow-md"
      >
        <Mail className="w-5 h-5" />

        Receber relatório completo e dicas de estudo por e-mail
      </button>

      {/* MODAL SOBREPOSTO (BACKDROP + DIALOG) */}

      {modalAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6">
            {!enviadoComSucesso ? (
              <>
                <h3 className="text-xl font-bold text-roxo-escuro">
                  Quer potencializar seus estudos?
                </h3>

                <p className="mt-3 text-sm text-gray-600">
                  Enviaremos o seu relatório em PDF acompanhado de um guia de
                  técnicas de estudo exclusivas personalizadas para o perfil{' '}
                  {nomesEstilos[resultado.estiloDominante]}.
                </p>

                <div className="mt-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirme seu e-mail:
                  </label>

                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="seu@email.com"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-roxo focus:border-transparent outline-none text-sm text-gray-800"
                  />
                </div>

                <button
                  onClick={handleEnviarEmail}
                  disabled={enviando}
                  className="mt-5 w-full bg-roxo text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  {enviando
                    ? 'Enviando...'
                    : 'Sim! Quero receber o material'}
                </button>
              </>
            ) : (
              <>
                <h3 className="text-xl font-bold text-roxo-escuro">
                  Tudo pronto!
                </h3>

                <p className="mt-3 text-sm text-gray-600">
                  Enviaremos o relatório e as dicas personalizadas para{' '}
                  {emailInput}. Verifique sua caixa de entrada em breve!
                </p>

                <button
                  onClick={fecharModal}
                  className="mt-5 w-full bg-roxo text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  Fechar
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Relatorio