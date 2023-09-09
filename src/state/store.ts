import createSagaMiddleware from 'redux-saga';
import { compact } from 'lodash';
import { persistReducer, persistStore } from 'redux-persist';
import {
  applyMiddleware,
  compose,
  createStore,
  StoreEnhancerStoreCreator,
} from 'redux';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import applyAppStateListener from 'redux-enhancer-react-native-appstate';

//eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { storage } from '../utils/storage';
import { rootSaga } from './sagas';
import { combinedReducer, RootState } from './reducers';

const persistorConfig = {
  key: '@RunningDiet:state',
  storage,
  whitelist: [] as string[],
};

interface PersistedAppState extends RootState {
  _persist: { version: number; rehydrated: boolean };
}

export const configStore = (initialState?: PersistedAppState) => {
  const sagaMiddleware = createSagaMiddleware();

  const enhancers = compose<StoreEnhancerStoreCreator>(
    ...compact([applyAppStateListener(), applyMiddleware(sagaMiddleware)]),
  );
  const persistedReducer = persistReducer<RootState>(
    persistorConfig,
    combinedReducer,
  );

  const store = createStore(
    persistedReducer,
    initialState || ({} as PersistedAppState),
    enhancers,
  );
  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);

  return { store, persistor };
};
