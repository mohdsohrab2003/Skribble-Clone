export interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  createdAt: number;
  time: string;
  isSystem?: boolean;
  isCorrect?: boolean;
}
