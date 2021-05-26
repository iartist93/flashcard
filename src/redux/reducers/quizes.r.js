import {
  ADD_QUESTION,
  ADD_QUIZ,
  RECIEVE_QUIZES,
  REMOVE_QUESTION,
  REMOVE_QUIZ,
} from '../actions/quizes.a';

const quizes = (state = {}, action) => {
  switch (action.type) {
    case RECIEVE_QUIZES:
      return { ...state, ...action.quizes };
    case ADD_QUIZ:
      return { ...state, ...action.quiz };
    case ADD_QUESTION: {
      return {
        ...state,
        [action.title]: {
          ...state[action.title],
          questions: [...state[action.title].questions, action.question],
        },
      };
    }

    case REMOVE_QUIZ: {
      const newState = { ...state };
      delete newState[action.title];
      return newState;
    }
    //TODO: Refactor
    case REMOVE_QUESTION: {
      const newState = { ...state };
      const newQuestions = newState[action.title].questions.filter(
        ({ id }) => id !== action.id
      );
      newState[action.title].questions = newQuestions;
      return newState;
    }
    default:
      return state;
  }
};

export default quizes;
