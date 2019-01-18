import {
    BAR_CHART_FILE_DATA,
    BAR_CHART_FILE_SELECTED
  } from '../../actions/types';
  
  const INITIAL_STATE = {
    barChartFileData: {},
    barChartOptions: {},
    barChartFileSelectedIndex: -1,
    isFetching: true
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case BAR_CHART_FILE_DATA:
            console.log("BAR CHART FILE DATA REDUCER");
            console.log(action);
            var newState = state;
            newState.barChartFileData = action.data;
            newState.barChartOptions = action.options;
            console.log(newState);
            if(newState.barChartFileData != null){
                return { ...newState, isFetching: false };
            }
            break;
        case BAR_CHART_FILE_SELECTED:
            console.log("BAR CHART FILE DATA active index REDUCER");
            console.log(action);
            var newState = state;
            newState.barChartFileSelectedIndex = action.fileIndex;
            console.log(newState);
            if(state.barChartFileSelectedIndex != -1){
                return { ...newState, isFetching: false };
            }
            break;
        default:
            return state;
    }
  }
