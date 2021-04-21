import { createStore, combineReducers } from 'redux';
import { routesTree } from './reducers/routesTree';

const rootReducer = combineReducers({
  routesTree
});

const store = createStore(rootReducer);

export type RootState  = ReturnType<typeof rootReducer>;

export { store };