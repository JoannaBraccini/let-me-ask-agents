import {
  Bot,
  Loader2,
  MessageSquare,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { dayjs } from "@/lib/dayjs";

interface Question {
  id: string;
  question: string;
  answer?: string | null;
  createdAt: string;
  isGeneratingAnswer?: boolean;
  isExistingAnswer?: boolean;
  similarity?: number;
  suggestedRooms?: Array<{ roomId: string; roomName: string }>;
}

interface QuestionItemProps {
  question: Question;
}

export function QuestionItem({ question }: QuestionItemProps) {
  return (
    <Card>
      <CardContent>
        <div className="space-y-4">
          {/* Question */}
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
                <MessageSquare className="size-4 text-primary" />
              </div>
            </div>
            <div className="flex-1">
              <p className="mb-1 font-medium text-foreground">Pergunta</p>
              <p className="whitespace-pre-line text-muted-foreground text-sm leading-relaxed">
                {question.question}
              </p>
            </div>
          </div>

          {(!!question.answer || question.isGeneratingAnswer) && (
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
                  <Bot className="size-4 text-secondary-foreground" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-foreground">Resposta da IA</p>
                  {question.isExistingAnswer && (
                    <Badge variant="secondary" className="text-xs">
                      <RefreshCw className="size-3 mr-1" />
                      Resposta reutilizada
                    </Badge>
                  )}
                </div>
                <div className="text-muted-foreground">
                  {question.isGeneratingAnswer ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="size-4 animate-spin text-primary" />
                      <span className="text-primary text-sm italic">
                        Gerando resposta...
                      </span>
                    </div>
                  ) : (
                    <p className="whitespace-pre-line text-sm leading-relaxed">
                      {question.answer}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Sugestões de salas quando não há resposta */}
          {!question.answer &&
            !question.isGeneratingAnswer &&
            question.suggestedRooms &&
            question.suggestedRooms.length > 0 && (
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <ExternalLink className="size-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-2">
                      Resposta disponível em outras salas
                    </h4>
                    <p className="text-amber-700 dark:text-amber-300 text-sm mb-3">
                      Não encontramos conteúdo sobre essa pergunta nesta sala,
                      mas há informações relevantes em:
                    </p>
                    <div className="space-y-2">
                      {question.suggestedRooms.map((room) => (
                        <Button
                          key={room.roomId}
                          variant="outline"
                          size="sm"
                          className="text-amber-700 border-amber-300 hover:bg-amber-100 dark:text-amber-300 dark:border-amber-700 dark:hover:bg-amber-900/40"
                          onClick={() =>
                            window.location.assign(`/room/${room.roomId}`)
                          }
                        >
                          <ExternalLink className="size-3 mr-2" />
                          {room.roomName}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

          <div className="flex justify-end">
            <span className="text-muted-foreground text-xs">
              {dayjs(question.createdAt).fromNow()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
