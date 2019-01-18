import { combineReducers } from 'redux';
import commitHistory from './commitHistory';
import barChartFileData from './charts/BarChartFile';
import doughnutCommitPriorityData from './charts/DoughnutCommitPriorityData';
import doughnutTicketTypeData from './charts/DoughnutTicketTypeData';
import lineDataInsightsData from './charts/LineDataInsightsData';
import tableDataInsightsData from './charts/TableDataInsightsData'

export default combineReducers({
  commitHistory: commitHistory,
  barChartFileData : barChartFileData,
  doughnutCommitPriorityData: doughnutCommitPriorityData,
  doughnutTicketTypeData: doughnutTicketTypeData,
  lineDataInsightsData: lineDataInsightsData,
  tableDataInsightsData: tableDataInsightsData
});