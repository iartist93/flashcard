import * as API from '../../services/API';

//--------------------------------------------

export const ADD_QUIZ = 'ADD_QUIZ';
export const REMOVE_QUIZ = 'REMOVE_QUIZ';
export const ADD_QUESTION = 'ADD_QUSTION';
export const REMOVE_QUESTION = 'REMOVE_QUESTION';

//--------------------------------------------

export const addQuiz = (quiz) => ({
  type: ADD_QUIZ,
  quiz,
});

export const removeQuiz = (title) => ({
  type: REMOVE_QUIZ,
  title,
});

export const addQuestion = (title, question) => ({
  type: ADD_QUESTION,
  title,
  question,
});

export const removeQuestion = (title, id) => ({
  type: REMOVE_QUESTION,
  title,
  id,
});

//--------------------------------------------

export const handleAddQuiz = (title) => {
  return async (dispatch) => {
    const quiz = await API.addQuiz(title);
    dispatch(addQuiz(quiz));
  };
};

export const handleRemoveQuiz = (title) => {
  return async (dispatch) => {
    await API.removeQuiz(title);
    dispatch(removeQuiz(title));
  };
};

export const handleAddQuestion = (title, question) => {
  return async (dispatch) => {
    const questionWithId = await API.addQuestion(title, question);
    dispatch(addQuestion(title, questionWithId));
  };
};

export const handleRemoveQuestion = (title, id) => {
  return async (dispatch) => {
    await API.removeQuestion(title, id);
    dispatch(removeQuestion(title, id));
  };
};

//--------------------------------------------
