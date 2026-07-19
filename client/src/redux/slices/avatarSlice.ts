import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Avatar, avatars } from "@/utils/avatar";

interface AvatarState {
  selectedAvatar: Avatar;
}

const initialState: AvatarState = {
  selectedAvatar: avatars[0],
};

const avatarSlice = createSlice({
  name: "avatar",
  initialState,
  reducers: {
    setSelectedAvatar: (state, action: PayloadAction<Avatar>) => {
      state.selectedAvatar = action.payload;
    },

    nextAvatar: (state) => {
      const currentIndex = avatars.findIndex(
        (avatar) => avatar.id === state.selectedAvatar.id,
      );

      state.selectedAvatar = avatars[(currentIndex + 1) % avatars.length];
    },

    previousAvatar: (state) => {
      const currentIndex = avatars.findIndex(
        (avatar) => avatar.id === state.selectedAvatar.id,
      );

      state.selectedAvatar =
        avatars[(currentIndex - 1 + avatars.length) % avatars.length];
    },

    randomAvatar: (state) => {
      const randomIndex = Math.floor(Math.random() * avatars.length);

      state.selectedAvatar = avatars[randomIndex];
    },
  },
});

export const { setSelectedAvatar, nextAvatar, previousAvatar, randomAvatar } =
  avatarSlice.actions;

export default avatarSlice.reducer;
