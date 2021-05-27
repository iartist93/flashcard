import * as API from '../../services/API';
import { toggleLoading } from './loading.a';

//--------------------------------------------

export const ADD_QUIZ = 'ADD_QUIZ';
export const REMOVE_QUIZ = 'REMOVE_QUIZ';
export const ADD_QUESTION = 'ADD_QUSTION';
export const REMOVE_QUESTION = 'REMOVE_QUESTION';
export const RECIEVE_QUIZES = 'RECIEVE_QUIZES';

//--------------------------------------------

export const recieveQuizes = (quizes) => ({
  type: RECIEVE_QUIZES,
  quizes,
});

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

export const handleRecieveQuizes = () => {
  return async (dispatch) => {
    const quizes = await API.getQuizes();
    dispatch(recieveQuizes(quizes));
  };
};

// TODO : Show <AppLoading> after saving quiz or question
export const handleAddQuiz = (title) => {
  return async (dispatch) => {
    dispatch(toggleLoading());
    const quiz = await API.addQuiz(title);
    dispatch(addQuiz(quiz));
    dispatch(toggleLoading());
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
    dispatch(toggleLoading());
    const questionWithId = await API.addQuestion(title, question);
    dispatch(addQuestion(title, questionWithId));
    dispatch(toggleLoading());
  };
};

export const handleRemoveQuestion = (title, id) => {
  return async (dispatch) => {
    await API.removeQuestion(title, id);
    dispatch(removeQuestion(title, id));
  };
};

//--------------------------------------------
