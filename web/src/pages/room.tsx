import { ArrowLeft, Radio } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { QuestionForm } from '@/components/question-form'
import { QuestionList } from '@/components/question-list'
import { Button } from '@/components/ui/button'

type RoomParams = {
  roomId: string
}

export function Room() {
  const params = useParams<RoomParams>()

  if (!params.roomId) {
    return <Navigate replace to="/" />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
      {/* Header fixo */}
      <header className="sticky top-0 z-10 border-zinc-800 border-b bg-zinc-950/80 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl px-4 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link to="/">
              <Button variant="outline" className="hover:bg-zinc-800">
                <ArrowLeft className="mr-2 size-4" />
                Voltar ao Início
              </Button>
            </Link>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
              <span className="text-xs text-zinc-400 sm:text-sm">
                ID: {params.roomId}
              </span>
              <Link to={`/room/${params.roomId}/audio`}>
                <Button
                  className="flex w-full items-center justify-center gap-2 bg-red-600 hover:bg-red-700 sm:w-auto"
                  variant="secondary"
                  size="sm"
                >
                  <Radio className="size-4" />
                  Gravar Áudio
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="container mx-auto max-w-6xl px-4 py-8">
        {/* Seção de título */}
        <div className="mb-6 text-center lg:mb-10">
          <h1 className="mb-2 font-bold text-2xl text-white leading-tight sm:text-3xl lg:mb-4 lg:text-4xl">
            Sala de Perguntas
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-zinc-300 sm:text-base lg:text-lg">
            Faça perguntas e receba respostas inteligentes com IA. Suas
            perguntas ajudam a criar um ambiente colaborativo de aprendizado.
          </p>
        </div>

        {/* Layout em grid para melhor organização */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
          {/* Seção do formulário - ocupa 1 coluna no desktop */}
          <div className="order-2 lg:order-1 lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 backdrop-blur-sm lg:p-6">
                <h2 className="mb-4 font-semibold text-lg text-white lg:text-xl">
                  Nova Pergunta
                </h2>
                <QuestionForm roomId={params.roomId} />
              </div>
            </div>
          </div>

          {/* Seção das perguntas - ocupa 2 colunas no desktop */}
          <div className="order-1 lg:order-2 lg:col-span-2">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-4 backdrop-blur-sm lg:p-6">
              <h2 className="mb-4 font-semibold text-lg text-white lg:mb-6 lg:text-xl">
                Perguntas da Sala
              </h2>
              <QuestionList roomId={params.roomId} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
