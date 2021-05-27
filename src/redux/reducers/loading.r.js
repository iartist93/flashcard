import { SET_LOADING, TOGGLE_LOADING } from '../actions/loading.a';

const loading = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_LOADING:
      return !state;
    case SET_LOADING:
      return action.loading;
    default:
      return state;
  }
};

export default loading;
