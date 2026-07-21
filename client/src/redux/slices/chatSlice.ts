import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatMessage } from "@/types/chat";

interface ChatState {
  messages: ChatMessage[];
  unreadCount: number;
}

const initialState: ChatState = {
  messages: [],
  unreadCount: 0,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<ChatMessage[]>) => {
      state.messages = action.payload;
      state.unreadCount = 0;
    },

    addMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.messages.push(action.payload);
      state.unreadCount++;
    },

    addMessages: (state, action: PayloadAction<ChatMessage[]>) => {
      state.messages.push(...action.payload);
      state.unreadCount += action.payload.length;
    },

    clearMessages: (state) => {
      state.messages = [];
      state.unreadCount = 0;
    },

    markAsRead: (state) => {
      state.unreadCount = 0;
    },
  },
});

export const {
  setMessages,
  addMessage,
  addMessages,
  clearMessages,
  markAsRead,
} = chatSlice.actions;

export default chatSlice.reducer;
