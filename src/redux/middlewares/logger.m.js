const logger = (store) => (next) => (action) => {
  console.group(action.type);
  const result = next(action);
  console.log('logger : ', store.getState());
  console.groupEnd();
  return result;
};

export default logger;
