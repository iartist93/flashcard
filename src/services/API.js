import { nanoid } from 'nanoid/non-secure';
import AsyncStorage from '@react-native-async-storage/async-storage';

const QUIZES_STORAGE_KEY = 'QUIZES_STORAGE_KEY';

const initalData = {
  quizes: {
    React: {
      title: 'React',
      questions: [
        {
          id: '0',
          question: 'What is React?',
          answer: 'A library for managing user interfaces',
        },
        {
          id: '1',
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event',
        },
      ],
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          id: '10',
          question: 'What is a closure?',
          answer:
            'The combination of a function and the lexical environment within which that function was declared.',
        },
      ],
    },
  },
};

/**
 * Add new quize to the database.
 * @param {*} title Title/key of the new quiz.
 * @returns `quiz` object with the title as key and empty quiz as value
 */
export const addQuiz = async (title) => {
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
export const removeQuiz = async (title) => {
  try {
    const allQuizes = await getQuizes();
    delete allQuizes[title];
    await AsyncStorage.setItem(QUIZES_STORAGE_KEY, JSON.stringify(allQuizes));
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
export const addQuestion = async (title, question) => {
  try {
    question.id = nanoid();
    const allQuizes = await getQuizes();
    allQuizes[title].questions.push(question);
    await AsyncStorage.setItem(QUIZES_STORAGE_KEY, JSON.stringify(allQuizes));
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
export const removeQuestion = async (title, qid) => {
  try {
    const allQuizes = await getQuizes();
    const newQuestions = allQuizes[title].questions.filter(
      ({ id }) => id !== qid
    );
    allQuizes[title].question = newQuestions;
    await AsyncStorage.setItem(QUIZES_STORAGE_KEY, JSON.stringify(allQuizes));
  } catch (e) {
    console.error("Can't add new question, ", e);
  }
};

/**
 * Get and parse all the quizes from the database.
 * @returns All quizes object parsed
 */
export const getQuizes = async () => {
  try {
    const allQuizes = await AsyncStorage.getItem(QUIZES_STORAGE_KEY);
    return allQuizes != null ? JSON.parse(allQuizes) : null;
  } catch (e) {
    console.error("Can't get quizes, ", e);
  }
};

/**
 * Save quizes to database
 */
export const saveQuizes = async (quizes) => {
  try {
    const allQuizes = await AsyncStorage.getItem(QUIZES_STORAGE_KEY);
    if (allQuizes === null) {
      await AsyncStorage.saveQuizes(QUIZES_STORAGE_KEY, JSON.parse(initalData));
    } else {
      await AsyncStorage.saveQuizes(
        QUIZES_STORAGE_KEY,
        JSON.parse({
          ...allQuizes,
          ...initalData,
        })
      );
    }
  } catch (e) {
    console.error("Can't save quizes, ", e);
  }
};
