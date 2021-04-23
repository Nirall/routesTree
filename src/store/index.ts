import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { routesTree } from './reducers/routesTree';
import { currentNode } from './reducers/currentNode';

const rootReducer = combineReducers({
  routesTree,
  currentNode
});

export type RootState = ReturnType<typeof rootReducer>

const persistConfig = {
  storage,
  key: 'routesTree',
  whitelist: ['routesTree']
}

const pReducer = persistReducer<any, any>(persistConfig, rootReducer);
const store = createStore(pReducer);
const persistor = persistStore(store);
persistor.purge();

export { persistor, store };
