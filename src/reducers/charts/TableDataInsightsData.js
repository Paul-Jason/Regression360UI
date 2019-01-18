import {
    TABLE_DATA_INSIGHTS_DATA
  } from '../../actions/types';
  
  const INITIAL_STATE = {
    tableDataInsightsData : [
        {commitId : '425a6bbb179d07f9c5fd4fb75a88b6f14d008a0e', riskPercent : 89, commitMessage: 'Please select a file from bar to go your real data.', jiraId: 'fpa', jiraSummary: 'Please select a file from bar to go your real data.', jiraUrl: 'View jira issue', gitUrl : 'view git code', commitDate: '2018-09-01'},
        {commitId : '425a6bbb179d07f9c5fd4fb75a88b6f14d008a0e', riskPercent : 21, commitMessage: 'Please select a file from bar to go your real data.', jiraId: 'fpa', jiraSummary: 'Please select a file from bar to go your real data.', jiraUrl: 'View jira issue', gitUrl : 'view git code', commitDate: '2017-09-01'},
        {commitId : '425a6bbb179d07f9c5fd4fb75a88b6f14d008a0e', riskPercent : 32, commitMessage: 'Please select a file from bar to go your real data.', jiraId: 'fpa', jiraSummary: 'Please select a file from bar to go your real data.', jiraUrl: 'View jira issue', gitUrl : 'view git code', commitDate: '2018-12-01'},
        {commitId : '425a6bbb179d07f9c5fd4fb75a88b6f14d008a0e', riskPercent : 52, commitMessage: 'Please select a file from bar to go your real data.', jiraId: 'fpa', jiraSummary: 'Please select a file from bar to go your real data.', jiraUrl: 'View jira issue', gitUrl : 'view git code', commitDate: '2018-01-01'},
        {commitId : '425a6bbb179d07f9c5fd4fb75a88b6f14d008a0e', riskPercent : 10, commitMessage: 'Please select a file from bar to go your real data.', jiraId: 'fpa', jiraSummary: 'Please select a file from bar to go your real data.', jiraUrl: 'View jira issue', gitUrl : 'view git code' , commitDate: '2019-01-01'}
    ]
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TABLE_DATA_INSIGHTS_DATA:
            console.log("TABLE_DATA_INSIGHTS_DATA DATA REDUCER");
            console.log(action);
            var newState = state;
            newState.tableDataInsightsData = action.data;
            return {...newState};
        default:
            return state;
    }
  }