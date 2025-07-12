import dayjs from 'dayjs'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useRooms } from '@/http/use-rooms'
import { Badge } from './ui/badge'
import { Card, CardContent, CardDescription, CardTitle } from './ui/card'

export function RoomList() {
  const { data, isLoading } = useRooms()
  return (
    <Card>
      <CardTitle className="text-center">Salas recentes</CardTitle>
      <CardDescription className="text-center text-muted-foreground text-sm">
        Acesso rápido às salas criadas recentemente.
      </CardDescription>
      <CardContent className="flex flex-col gap-3">
        {isLoading && (
          <p className="text-muted-foreground text-sm">Carregando salas...</p>
        )}

        {data?.map((room) => (
          <Link
            className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent/50"
            key={room.id}
            to={`/room/${room.id}`}
          >
            <div className="flex flex-1 flex-col gap-1">
              <h3 className="font-medium">{room.name}</h3>
            </div>

            <div className="flex items-center gap-2">
              <Badge className="text-xs" variant={'secondary'}>
                {dayjs(room.createdAt).toNow()}
              </Badge>
              <Badge className="text-xs" variant={'secondary'}>
                {room.questionsCount === 0
                  ? 'Nenhuma pergunta'
                  : `${room.questionsCount} pergunta${room.questionsCount !== 1 ? 's' : ''}`}
              </Badge>
            </div>

            <span className="flex items-center gap-1 text-sm">
              Entrar
              <ArrowRight className="size-3" />
            </span>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
