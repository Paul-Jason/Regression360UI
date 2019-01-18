import {
    LINE_DATA_INSIGHTS_DATA
  } from '../../actions/types';
  
  const INITIAL_STATE = {
    lineDataInsightsData : {
            datasets: [{
                data: [
                    {
                        x: '2018-01-13',
                        y: 20,
                        commitId : '425a6bbb179d07f9c5fd4fb75a88b6f14d008a0e',
                        commitMessage: 'Changes for automated instant translation for SAC.',
                        jiraId : 'FPA96-31',
                        jiraSummary : 'Web Pack Configurations for FPA-APP'
                    }, {
                        x: '2018-04-13',
                        y: 10,
                        commitId : '425a6bbb179d07f9c5fd4fb75a88b6f14d008a0e',
                        commitMessage: 'Changes for automated instant translation for SAC.',
                        jiraId : 'FPA96-31',
                        jiraSummary : 'Web Pack Configurations for FPA-APP'
                    },
                    {
                        x: '2018-07-13',
                        y: 20,
                        commitId : '425a6bbb179d07f9c5fd4fb75a88b6f14d008a0e',
                        commitMessage: 'Changes for automated instant translation for SAC.',
                        jiraId : 'FPA96-31',
                        jiraSummary : 'Web Pack Configurations for FPA-APP'
                    }, {
                        x: '2018-11-13',
                        y: 10,
                        commitId : '425a6bbb179d07f9c5fd4fb75a88b6f14d008a0e',
                        commitMessage: 'Changes for automated instant translation for SAC.',
                        jiraId : 'FPA96-31',
                        jiraSummary : 'Web Pack Configurations for FPA-APP'
                    }
                ],
                label: 'NO DATA (To get your data, Please select from bar chart)',
                fill: false,
                pointHoverRadius: 15,
                pointRadius: 10,
                pointHitRadius: 20
        }]
    },
    lineDataInsightsOptions: {
        legend:{
            position:'bottom'
        },
        scales: {
            xAxes: [{
                type: 'time' 
            }],
            yAxes: [{ 
                scaleLabel: {
                  display: true,
                  labelString: "RISK (%)",
                  fontSize: 14
                }
            }]
        },
        tooltips: {
            callbacks: {
              title: function(tooltipItem, data) {
                var tooltipItemIndex = tooltipItem[0]['index'];
                var string = 'Commmit Id : ' + data['datasets'][0]['data'][tooltipItemIndex]['commitId'];
                return string;
              },
              label: function(tooltipItem, data) {
                var tooltipItemIndex = tooltipItem['index'];
                var string = 'RISK : ' + data['datasets'][0]['data'][tooltipItemIndex]['y'] + '%';
                return string;
              },
              afterTitle: function(tooltipItem, data) {
                var tooltipItemIndex = tooltipItem[0]['index'];
                var multiLineString = [];
                var commitMessage = 'Commit message : ' + data['datasets'][0]['data'][tooltipItemIndex]['commitMessage'];
                var jiraId = 'Jira Id : ' + data['datasets'][0]['data'][tooltipItemIndex]['jiraId'];
                var jiraSummary = 'Jira summary : ' + data['datasets'][0]['data'][tooltipItemIndex]['jiraSummary'];
                multiLineString.push(commitMessage, jiraId, jiraSummary);
                return multiLineString;
              }
            },
            intersect: false
        },
        title:{
                display: true,
                text: 'No file selected'
        }
    },
    lineSelectedIndex : -1
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LINE_DATA_INSIGHTS_DATA:
            console.log("LINE DATA INSIGHTS DATA REDUCER");
            console.log(action);
            var newState = state;
            newState.lineDataInsightsData = action.data;
            newState.lineDataInsightsOptions = action.options;
            return {...newState};
        default:
            return state;
    }
  }
