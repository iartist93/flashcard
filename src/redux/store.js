import { createStore } from 'redux';

import reducers from './reducers/index.r';
import middlewares from './middlewares/index.m';

const store = createStore(reducers, middlewares);

export default store;
