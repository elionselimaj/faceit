import { AnyAction, EmptyObject, Store } from 'redux';
import { PersistPartial } from 'redux-persist/es/persistReducer';
import { RootState } from 'src/state/reducers';

let registeredStore: Store<RootState> | undefined;

export default {
  register: (
    store: Store<EmptyObject & RootState & PersistPartial, AnyAction>,
  ) => (registeredStore = store),
  getStore: () => registeredStore,
};

export const dispatch = (action: AnyAction) =>
  registeredStore?.dispatch(action);
