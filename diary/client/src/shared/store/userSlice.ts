import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id?: number;
  name: string;
  email?: string;
}

interface UserState {
  user: User | null;
  isAuth: Boolean;
}
//изначальное значение
const initialState: UserState = {
  user: null,
  isAuth: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;