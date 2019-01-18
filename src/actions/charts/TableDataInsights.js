import {
    TABLE_DATA_INSIGHTS_DATA
} from '../types';

export const setTableDataInsightsData = (tableDataInsightsData) => dispatch => {
  dispatch({ type: TABLE_DATA_INSIGHTS_DATA, data:tableDataInsightsData});
};