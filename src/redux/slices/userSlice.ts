import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  name: string;
  email: string;
  password: string;
}

interface UserState {
  users: User[];
  loggedInUser: User | null;
  status: "loggedOut" | "loggedIn" | "loginFailed" | "registered";
}

const initialState: UserState = {
  users: [],
  loggedInUser: null,
  status: "loggedOut",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    register: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
      state.status = "registered"; // Change to indicate successful registration
    },
    login: (state, action: PayloadAction<{ email: string; password: string }>) => {
      const user = state.users.find(
        (user) =>
          user.email === action.payload.email &&
          user.password === action.payload.password
      );
      if (user) {
        state.loggedInUser = user;
        state.status = "loggedIn";
      } else {
        state.status = "loginFailed"; // Corrected spelling here
      }
    },
    logout: (state) => {
      state.loggedInUser = null;
      state.status = "loggedOut";
    },
  },
});

export const { login, logout, register } = userSlice.actions;

export const selectUser = (state: { user: UserState }) => state.user.loggedInUser;
export const selectUserStatus = (state: { user: UserState }) => state.user.status;

export default userSlice.reducer;
