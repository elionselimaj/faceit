/* eslint-disable  @typescript-eslint/no-empty-function */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Users } from '@typings/user';

export type UserState = {
  users: Users;
};

const initialState: UserState = {
  users: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUsers: () => {},
    setUsers: (state, action: PayloadAction<Users>) => {
      state.users = action.payload;
    },
    clearState: () => initialState,
  },
});

export default userSlice.reducer;

export const userActions = userSlice.actions;

export const userConfig = {
  key: 'user',
};
