import axios from 'axios';
import commitHistoryJson from '../data/commitHistory.json'
import commitHistory from '../reducers/commitHistory';

import {
  FETCH_COMMIT_HISTORY
} from './types';

// export const fetchCommitHistory = (commitId) => dispatch => {
//   dispatch({ type: FETCH_COMMIT_HISTORY, payload: commitHistoryJson });
// };

//Access the real data.
export const fetchCommitHistory = (commitId) => dispatch => {
  axios.get('http://mo-34a122d74.mo.sap.corp:8085/Regression360/commit/'+ commitId)
      .then(res => dispatch({ type: FETCH_COMMIT_HISTORY, payload: res.data }));
};