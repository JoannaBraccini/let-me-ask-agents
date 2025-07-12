import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useRooms } from '@/http/use-rooms'
import { dayjs } from '@/lib/dayjs'
import { Badge } from './ui/badge'
import { Card, CardContent, CardDescription, CardTitle } from './ui/card'

export function RoomList() {
  const { data, isLoading } = useRooms()
  return (
    <Card className="border-none bg-transparent shadow-none">
      <CardTitle className="mb-2 text-center text-white text-xl">
        Salas recentes
      </CardTitle>
      <CardDescription className="mb-4 text-center text-sm text-zinc-400">
        Acesso rápido às salas criadas recentemente.
      </CardDescription>
      <CardContent className="flex flex-col gap-3 p-0">
        {isLoading && (
          <p className="text-muted-foreground text-sm">Carregando salas...</p>
        )}

        {data?.map((room) => (
          <Link
            className="group flex flex-col gap-3 rounded-lg border border-zinc-700 p-4 transition-colors hover:border-zinc-600 hover:bg-zinc-800/50 sm:flex-row sm:items-center sm:justify-between"
            key={room.id}
            to={`/room/${room.id}`}
          >
            {/* Nome da sala */}
            <div className="flex-1">
              <h3 className="mb-1 font-medium text-base text-white">
                {room.name}
              </h3>
            </div>

            {/* Badges - empilhados no mobile */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="flex flex-wrap gap-2">
                <Badge
                  className="border-zinc-600 bg-zinc-800 text-xs text-zinc-300"
                  variant={'secondary'}
                >
                  {dayjs(room.createdAt).fromNow()}
                </Badge>
                <Badge
                  className="border-zinc-600 bg-zinc-800 text-xs text-zinc-300"
                  variant={'secondary'}
                >
                  {room.questionsCount === 0
                    ? 'Nenhuma pergunta'
                    : `${room.questionsCount} pergunta${room.questionsCount !== 1 ? 's' : ''}`}
                </Badge>
              </div>

              {/* Botão entrar */}
              <div className="flex items-center justify-end sm:justify-center">
                <span className="flex items-center gap-1 text-sm text-zinc-400 transition-colors group-hover:text-white">
                  Entrar
                  <ArrowRight className="size-3" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
