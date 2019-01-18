import {
    DOUGHNUT_COMMIT_PRIORITY_DATA,
    DOUGHNUT_COMMIT_PRIORITY_SELECTED
} from '../types';

export const setDoughnutCommitPriorityData = (doughnutCommitPriorityData, doughnutCommitPriorityOptions ) => dispatch => {
  dispatch({ type: DOUGHNUT_COMMIT_PRIORITY_DATA, data: doughnutCommitPriorityData, options: doughnutCommitPriorityOptions});
};

export const setDoughnutCommitPrioritySelectedIndex = (doughnutCommitPrioritySelectedIndex) => dispatch => {
  console.log(doughnutCommitPrioritySelectedIndex);
  dispatch({ type: DOUGHNUT_COMMIT_PRIORITY_SELECTED, priorityIndex: doughnutCommitPrioritySelectedIndex });
};