/** biome-ignore-all lint/suspicious/noConsole: necessário */

import { ArrowLeft, Mic, MicOff, Radio } from 'lucide-react'
import { useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const isRecordingSupported =
  !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === 'function' &&
  typeof window.MediaRecorder === 'function'

type RoomParams = {
  roomId: string
}

export function RecordRoomAudio() {
  const params = useParams<RoomParams>()
  const [isRecording, setIsRecording] = useState(false)
  const recorder = useRef<MediaRecorder | null>(null)
  const intervalRef = useRef<NodeJS.Timeout>(null)

  function stopRecording() {
    setIsRecording(false)

    if (recorder.current && recorder.current.state !== 'inactive') {
      recorder.current.stop()
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  async function uploadAudio(audio: Blob) {
    const formData = new FormData()

    formData.append('file', audio, 'audio.webm')

    const response = await fetch(
      `http://localhost:3333/rooms/${params.roomId}/audio`,
      {
        method: 'POST',
        body: formData,
      }
    )

    const result = await response.json()

    console.log(result)
  }

  function createRecorder(audio: MediaStream) {
    recorder.current = new MediaRecorder(audio, {
      mimeType: 'audio/webm',
      audioBitsPerSecond: 64_000,
    })

    recorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        uploadAudio(event.data)
      }
    }

    recorder.current.onstart = () => {
      console.log('Gravação iniciada!')
    }

    recorder.current.onstop = () => {
      console.log('Gravação encerrada/pausada')
    }

    recorder.current.start()
  }

  async function startRecording() {
    if (!isRecordingSupported) {
      alert('O seu navegador não suporta gravação')
      return
    }

    setIsRecording(true)

    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44_100,
      },
    })

    createRecorder(audio)

    intervalRef.current = setInterval(() => {
      recorder.current?.stop()

      createRecorder(audio)
    }, 5000)
  }

  if (!params.roomId) {
    return <Navigate replace to="/" />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
      {/* Header */}
      <header className="border-zinc-800 border-b bg-zinc-950/80 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl px-4 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link to={`/room/${params.roomId}`}>
              <Button className="hover:bg-zinc-800" variant="outline">
                <ArrowLeft className="mr-2 size-4" />
                Voltar à Sala
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <span className="text-xs text-zinc-400 sm:text-sm">
                Sala: {params.roomId}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="container mx-auto max-w-4xl px-4 py-6 sm:py-12">
        <div className="flex min-h-[60vh] flex-col items-center justify-center">
          {/* Card principal */}
          <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 text-center backdrop-blur-sm sm:p-8">
            <div className="mb-6 sm:mb-8">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-600/20 sm:h-20 sm:w-20">
                <Radio className="h-8 w-8 text-red-500 sm:h-10 sm:w-10" />
              </div>
              <h1 className="mb-2 font-bold text-white text-xl sm:text-2xl">
                Gravação de Áudio
              </h1>
              <p className="text-sm text-zinc-400 sm:text-base">
                Grave sua pergunta ou comentário para a sala
              </p>
            </div>

            {/* Status de gravação */}
            <div className="mb-8">
              <div
                className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${
                  isRecording ? 'animate-pulse bg-red-600' : 'bg-zinc-700'
                }`}
              >
                {isRecording ? (
                  <Mic className="h-8 w-8 text-white" />
                ) : (
                  <MicOff className="h-8 w-8 text-zinc-400" />
                )}
              </div>

              <div className="text-center">
                <p
                  className={`font-semibold text-lg ${
                    isRecording ? 'text-red-400' : 'text-zinc-400'
                  }`}
                >
                  {isRecording ? 'Gravando...' : 'Pausado'}
                </p>
                {isRecording && (
                  <p className="mt-1 text-sm text-zinc-500">
                    A gravação é enviada automaticamente a cada 5 segundos
                  </p>
                )}
              </div>
            </div>

            {/* Botões de controle */}
            <div className="space-y-4">
              {isRecording ? (
                <Button
                  className="w-full bg-red-600 hover:bg-red-700"
                  onClick={stopRecording}
                  size="lg"
                >
                  <MicOff className="mr-2 h-5 w-5" />
                  Pausar Gravação
                </Button>
              ) : (
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={startRecording}
                  size="lg"
                >
                  <Mic className="mr-2 h-5 w-5" />
                  Iniciar Gravação
                </Button>
              )}

              {!isRecordingSupported && (
                <div className="rounded-lg border border-yellow-600/30 bg-yellow-900/20 p-4">
                  <p className="text-sm text-yellow-400">
                    ⚠️ Seu navegador não suporta gravação de áudio
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Informações adicionais */}
          <div className="mt-6 w-full max-w-md text-center sm:mt-8">
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-4">
              <h3 className="mb-2 font-semibold text-sm text-white sm:text-base">
                Como funciona?
              </h3>
              <ul className="space-y-1 text-xs text-zinc-400 sm:text-sm">
                <li>• Clique em "Iniciar Gravação" para começar</li>
                <li>• O áudio é enviado automaticamente a cada 5 segundos</li>
                <li>• Use "Pausar Gravação" para parar temporariamente</li>
                <li>• Volte à sala para ver as perguntas processadas</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
