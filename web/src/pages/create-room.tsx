import { CreateRoomForm } from '@/components/create-room-form'
import { RoomList } from '@/components/room-list'

export function CreateRoom() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
      {/* Header */}
      <header className="border-zinc-800 border-b bg-zinc-950/80 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl px-4 py-4 sm:py-6">
          <div className="text-center">
            <h1 className="mb-2 font-bold text-2xl text-white sm:text-3xl lg:text-4xl">
              Let Me Ask Agents
            </h1>
            <p className="text-sm text-zinc-300 sm:text-base lg:text-lg">
              Crie salas de perguntas e interaja com IA de forma inteligente
            </p>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="container mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Seção de criação de sala */}
          <div className="order-1 lg:order-1">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-sm">
              <div className="mb-6">
                <h2 className="mb-2 font-semibold text-white text-xl lg:text-2xl">
                  Criar Nova Sala
                </h2>
                <p className="text-sm text-zinc-400 lg:text-base">
                  Configure uma nova sala para receber perguntas e interagir com
                  IA
                </p>
              </div>
              <CreateRoomForm />
            </div>
          </div>

          {/* Seção de salas existentes */}
          <div className="order-2 lg:order-2">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 backdrop-blur-sm">
              <div className="mb-6">
                <h2 className="mb-2 font-semibold text-white text-xl lg:text-2xl">
                  Salas Disponíveis
                </h2>
                <p className="text-sm text-zinc-400 lg:text-base">
                  Acesse salas já criadas ou veja as mais recentes
                </p>
              </div>
              <RoomList />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
