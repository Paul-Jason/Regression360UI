import {
    LINE_DATA_INSIGHTS_DATA
} from '../types';

export const setLineDataInsightsData = (lineDataInsightsData, lineDataInsightsOptions) => dispatch => {
  dispatch({ type: LINE_DATA_INSIGHTS_DATA, data: lineDataInsightsData, options: lineDataInsightsOptions});
};