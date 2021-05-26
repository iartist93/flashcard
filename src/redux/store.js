import { createStore } from 'redux';

import reducers from './reducers/index.r';

const initalState = {
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

const store = createStore(reducers, initalState);

export default store;
