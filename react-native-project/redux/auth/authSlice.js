import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    userId: null,
    userName: null,
    email: null,
    avatar: null,
  },
  stateChange: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserProfile: (state, { payload }) => {
      state.user = { ...payload };
    },
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authSignOut: () => initialState,
    updateAvatarUser: (state, { payload }) => {
      state.user.avatar = payload;
    },
  },
});

export const {
  updateUserProfile,
  authStateChange,
  authSignOut,
  updateAvatarUser,
} = authSlice.actions;
export const authReducer = authSlice.reducer;
