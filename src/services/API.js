import AsyncStorage from '@react-native-async-storage/async-storage';
import { nanoid } from 'nanoid';

const QUIZES_STORAGE_KEY = 'QUIZES_STORAGE_KEY';

/**
 * Add new quize to the database.
 * @param {*} title Title/key of the new quiz.
 * @returns `quiz` object with the title as key and empty quiz as value
 */
const addQuiz = async (title) => {
  try {
    const quiz = {
      [title]: {
        title,
        questions: [],
      },
    };
    const allQuizes = await getQuizes();
    const newQuizes = JSON.stringify({ ...allQuizes, ...quiz });
    await AsyncStorage.setItem(QUIZES_STORAGE_KEY, newQuizes);
    return quiz;
  } catch (e) {
    console.error("Can't add new quiz, ", e);
  }
};

/**
 * Remove a quize from database.
 * @param {*} title Key of the quiz to remove
 */
const removeQuiz = async (title) => {
  try {
    const allQuizes = await getQuizes();
    delete allQuizes[title];
    const newQuizes = JSON.stringify(allQuizes);
    await AsyncStorage.setItem(QUIZES_STORAGE_KEY, allQuizes);
  } catch (e) {
    console.error("Can't remove quiz, ", e);
  }
};

/**
 * Add a new question to the current questions list for a quiz.
 * @param {*} title Quiz tile/key
 * @param {*} question New question object {question, answer}.
 * @returns new `question` after adding `id` field
 */
const addQuestion = async (title, question) => {
  try {
    question.id = nanoid();
    const allQuizes = await getQuizes();
    allQuizes[title].questions.push(question);
    await AsyncStorage.setItem(QUIZES_STORAGE_KEY, allQuizes);
    return question;
  } catch (e) {
    console.error("Can't add new question, ", e);
  }
};

/**
 * Remove a question from the question list of a quiz
 * @param {*} title Quiz tile/key
 * @param {*} qid Of the question to remove.
 */
const removeQuestion = async (title, qid) => {
  try {
    const allQuizes = await getQuizes();
    const newQuestions = allQuizes[title].questions.filter(
      ({ id }) => id !== qid
    );
    allQuizes[title].question = newQuestions;
    await AsyncStorage.setItem(QUIZES_STORAGE_KEY, allQuizes);
  } catch (e) {
    console.error("Can't add new question, ", e);
  }
};

/**
 * Get and parse all the quizes from the database.
 * @returns All quizes object parsed
 */
const getQuizes = async () => {
  try {
    const allQuizes = await AsyncStorage.getItem(QUIZES_STORAGE_KEY);
    return allQuizes != null ? JSON.parse(allQuizes) : null;
  } catch (e) {
    console.error("Can't get quizes, ", e);
  }
};
