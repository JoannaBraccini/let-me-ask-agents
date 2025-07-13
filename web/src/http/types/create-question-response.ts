export type CreateQuestionResponse = {
  questionId: string;
  answer: string | null;
  isExistingAnswer?: boolean;
  similarity?: number;
  suggestedRooms?: Array<{ roomId: string; roomName: string }>;
};
