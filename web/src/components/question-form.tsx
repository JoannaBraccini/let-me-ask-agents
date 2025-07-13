import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useCreateQuestion } from "@/http/use-create-question";

// Esquema de validação no mesmo arquivo conforme solicitado
const createQuestionSchema = z.object({
  question: z
    .string()
    .min(1, "Pergunta é obrigatória")
    .min(10, "Pergunta deve ter pelo menos 10 caracteres")
    .max(500, "Pergunta deve ter menos de 500 caracteres"),
});

type CreateQuestionFormData = z.infer<typeof createQuestionSchema>;

interface QuestionFormProps {
  roomId: string;
}

export function QuestionForm({ roomId }: QuestionFormProps) {
  const { mutateAsync: createQuestion } = useCreateQuestion(roomId);
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm<CreateQuestionFormData>({
    resolver: zodResolver(createQuestionSchema),
    defaultValues: {
      question: "",
    },
  });

  async function handleCreateQuestion(data: CreateQuestionFormData) {
    try {
      await createQuestion(data);
      // Limpa o formulário após envio bem-sucedido
      form.reset();
      // Mostra feedback de sucesso
      setShowSuccess(true);
    } catch (error) {
      // Se houver erro, mantém o formulário preenchido para o usuário tentar novamente
      console.error("Erro ao criar pergunta:", error);
    }
  }

  // Remove o feedback de sucesso após 3 segundos
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const { isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(handleCreateQuestion)}
      >
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sua Pergunta</FormLabel>
              <FormControl>
                <Textarea
                  className="min-h-[100px]"
                  disabled={isSubmitting}
                  placeholder="O que você gostaria de saber?"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={isSubmitting}
          type="submit"
          className={showSuccess ? "bg-green-600 hover:bg-green-700" : ""}
        >
          {showSuccess ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Pergunta enviada!
            </>
          ) : isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enviando...
            </>
          ) : (
            "Enviar pergunta"
          )}
        </Button>
      </form>
    </Form>
  );
}
