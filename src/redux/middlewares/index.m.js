import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';
import logger from './logger.m';

export default applyMiddleware(thunk, logger);
