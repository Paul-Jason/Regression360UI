import {
    BAR_CHART_FILE_DATA,
    BAR_CHART_FILE_SELECTED
} from '../types';

export const setBarChartFileData = (barChartData , barChartOptions) => dispatch => {
  dispatch({ type: BAR_CHART_FILE_DATA, data:barChartData , options:barChartOptions });
};

export const setBarChartSelectedFileIndex = (barChartSelectedFileIndex) => dispatch => {
  dispatch({ type: BAR_CHART_FILE_SELECTED, fileIndex:barChartSelectedFileIndex });
};