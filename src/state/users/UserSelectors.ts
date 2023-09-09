import { RootState } from '@state/reducers';

export const getUsers = (state: RootState) => state?.users?.users;
