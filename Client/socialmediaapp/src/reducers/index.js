import { combineReducers } from 'redux';

import posts from './Posts.js';
import auth from './auth.js';

export default combineReducers({ posts, auth });
