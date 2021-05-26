import {
  ADD_QUESTION,
  ADD_QUIZ,
  REMOVE_QUESTION,
  REMOVE_QUIZ,
} from '../actions/quizes.a';

const quizes = (state = {}, action) => {
  switch (action.type) {
    case ADD_QUIZ:
      break;
    case ADD_QUESTION:
      break;
    case REMOVE_QUIZ:
      break;
    case REMOVE_QUESTION:
      break;
    default:
      return state;
  }
};

export default quizes;
