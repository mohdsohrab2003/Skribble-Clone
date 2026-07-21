export interface ChatMessage {
  id: string;

  playerId: string;

  playerName: string;

  message: string;

  createdAt: number;

  isSystem: boolean;

  isCorrect: boolean;
}
