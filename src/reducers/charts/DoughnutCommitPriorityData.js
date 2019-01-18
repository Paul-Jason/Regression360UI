import {
    DOUGHNUT_COMMIT_PRIORITY_DATA,
    DOUGHNUT_COMMIT_PRIORITY_SELECTED
  } from '../../actions/types';
  
  const INITIAL_STATE = {
    doughnutCommitPriorityData: {
        datasets: [{
            data: [1],
            borderWidth : 2.5
        }],
        labels: [
            'NO DATA (Please select any thing from bar chart)',
        ],        
    },
    doughnutCommitPriorityOptions: {
        legend:{
            position:'bottom'
        }
    },
    doughnutCommitPrioritySelectedIndex: -1,
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DOUGHNUT_COMMIT_PRIORITY_DATA:
            console.log("DOUGHNUT TICKET TYPE DATA REDUCER");
            console.log(action);
            var newState = state;
            newState.doughnutCommitPriorityData = action.data;
            newState.doughnutCommitPriorityOptions = action.options;
            console.log(newState);
            return {...newState};
        case DOUGHNUT_COMMIT_PRIORITY_SELECTED:
            console.log("DOUGHNUT_COMMIT_PRIORITY_SELECTED DATA REDUCER");
            console.log(action);
            var newState = state;
            newState.doughnutCommitPrioritySelectedIndex = action.priorityIndex;
            console.log(newState);
            return {...newState};
        default:
            console.log(state);
            return {...state};
    }
  }
