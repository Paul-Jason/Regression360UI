import React,{Component} from 'react'
import {Doughnut, Pie} from 'react-chartjs-2';
import {bindActionCreators}  from 'redux';
import {setDoughnutTicketTypeData, setDoughnutTicketTypeSelectedIndex} from '../../actions/charts/DoughnutTicketType';
import {setLineDataInsightsData} from '../../actions/charts/LineDataInsights';
import {setTableDataInsightsData} from '../../actions/charts/TableDataInsights';
import { connect } from 'react-redux';

class DoughnutTicketType extends Component{
    render(){  

        var setDoughnutStatus = function(elems){
            var selectedTicketTypeIndex = elems[0]["_index"];
            this.props.setDoughnutTicketTypeSelectedIndex(selectedTicketTypeIndex);
            var chartData = this.props.doughnutTicketTypeData.doughnutTicketTypeData;
            var chartOptions = this.props.doughnutTicketTypeData.doughnutTicketTypeOptions;
            var backgroundColorsArray = chartData['datasets'][0]['backgroundColor'];
            var borderColorsArray = [];
            for(var i=0; i<backgroundColorsArray.length; i++){
                borderColorsArray.push('#fff');
            }
            borderColorsArray[selectedTicketTypeIndex] = '#000';
            chartData['datasets'][0]['borderColor'] = borderColorsArray;
            this.props.setDoughnutTicketTypeSelectedIndex(chartData, chartOptions);
        }.bind(this);

        var updateDoughnutCommitPriority = function(){

        }.bind(this);

        var updateLineDataInsightsChart = function(){
            var fileIndexSelected = this.props.barChartFileData.barChartFileSelectedIndex;
            if(fileIndexSelected != -1){
                var ticketTypeIndexSelected = this.props.doughnutTicketTypeData.doughnutTicketTypeSelectedIndex;
                if(ticketTypeIndexSelected != -1){
                    var priorityIndexSelected = this.props.doughnutCommitPriorityData.doughnutCommitPrioritySelectedIndex;
                    if(priorityIndexSelected != -1){
                        var barChartData = this.props.barChartFileData.barChartFileData;
                        var barFilesArray = barChartData.labels;
                        var fileName = barFilesArray[fileIndexSelected];
                        var commitHistoryData = this.props.commitHistory.state.data;
                        var fileCommits = commitHistoryData[fileName];
                        var doughnutPriorityData = this.props.doughnutCommitPriorityData.doughnutCommitPriorityData;
                        var prioritySelected = doughnutPriorityData['labels'][priorityIndexSelected];
                        var priorityFilteredFileCommits = [];
                        for(var k in fileCommits){
                            var issuePriority = fileCommits[k]["jiraTicketPriority"];
                            if(issuePriority == prioritySelected){
                                priorityFilteredFileCommits.push(fileCommits[k]);
                            }
                        }
                        var doughnutTicketTypeData = this.props.doughnutTicketTypeData.doughnutTicketTypeData;
                        var ticketTypeSelected = doughnutTicketTypeData['labels'][ticketTypeIndexSelected];
                        var priorityPlusTicketTypeFilteredFileCommits = [];
                        for(var k in priorityFilteredFileCommits){
                            var ticketType = priorityFilteredFileCommits[k]["jiraTicketCategory"];
                            if(ticketType == ticketTypeSelected){
                                priorityPlusTicketTypeFilteredFileCommits.push(priorityFilteredFileCommits[k]);
                            }
                        }
                        var commitIdCommitInfoMap = new Map();
                        for(var k in priorityPlusTicketTypeFilteredFileCommits){
                            var commitInfo = []; //Array of commit date, risk %, commitMessage, jiraId, jiraSummary
                            //var jiraPriority = priorityFilteredFileCommits[k]["jiraPriority"];
                            var fullCommitDate = priorityPlusTicketTypeFilteredFileCommits[k]["commitTime"];
                            var commitDate = fullCommitDate.substring(0, fullCommitDate.indexOf(' '));
                            var commitId = priorityPlusTicketTypeFilteredFileCommits[k]["commitId"];
                            var commitMessage = priorityPlusTicketTypeFilteredFileCommits[k]["shortMessage"];
                            var jiraId = priorityPlusTicketTypeFilteredFileCommits[k]["jiraId"];
                            var jiraSummary = priorityPlusTicketTypeFilteredFileCommits[k]["jiraSummary"];
                            var jiraSeverity = priorityPlusTicketTypeFilteredFileCommits[k]["severity"];
                            var jiraUrl = priorityPlusTicketTypeFilteredFileCommits[k]["jiraURL"];
                            var gitUrl = priorityPlusTicketTypeFilteredFileCommits[k]["gitURL"];        
                            commitInfo.push(commitDate);
                            commitInfo.push(jiraSeverity);
                            commitInfo.push(commitMessage);
                            commitInfo.push(jiraId);
                            commitInfo.push(jiraSummary);
                            commitInfo.push(jiraUrl);
                            commitInfo.push(gitUrl);        
                            commitIdCommitInfoMap.set(commitId,commitInfo);
                        }
                        var lineDataInsightsData = {};
                        var xyArray = [];
                        for(var [key, value] of commitIdCommitInfoMap){
                            var x = value[0];
                            var y = value[1];
                            var commitId = key;
                            var commitMessage = value[2];
                            var jiraId = value[3];
                            var jiraSummary = value[4];
                            var jiraUrl = value[5];
                            var gitUrl = value[6];
                            var xyPoint = {x, y, commitId, commitMessage, jiraId, jiraSummary, jiraUrl, gitUrl};
                            xyArray.push(xyPoint);
                        }
                        lineDataInsightsData = {
                            datasets: [{
                                data: xyArray,
                                label: fileName,
                                fill: false,
                                borderColor: "rgba(75,192,192,1)",
                                pointHoverRadius: 15,
                                pointRadius: 10,
                                pointHitRadius: 20        
                            }]
                        }
                        var lineDataInsightsOptions = {
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
                                    display: false
                            }
                        };    
                        this.props.setLineDataInsightsData(lineDataInsightsData, lineDataInsightsOptions);
                    }
                    else{
                        var barChartData = this.props.barChartFileData.barChartFileData;
                        var barFilesArray = barChartData.labels;
                        var fileName = barFilesArray[fileIndexSelected];
                        var commitHistoryData = this.props.commitHistory.state.data;
                        var fileCommits = commitHistoryData[fileName];
                        var doughnutTicketTypeData = this.props.doughnutTicketTypeData.doughnutTicketTypeData;
                        var ticketTypeSelected = doughnutTicketTypeData['labels'][ticketTypeIndexSelected];
                        var ticketTypeFilteredFileCommits = [];
                        for(var k in fileCommits){
                            var ticketType = fileCommits[k]["jiraTicketCategory"];
                            if(ticketType == ticketTypeSelected){
                                ticketTypeFilteredFileCommits.push(fileCommits[k]);
                            }                        
                        }
                        var commitIdCommitInfoMap = new Map();
                        for(var k in ticketTypeFilteredFileCommits){
                            var commitInfo = []; //Array of commit date, risk %, commitMessage, jiraId, jiraSummary
                            //var jiraPriority = priorityFilteredFileCommits[k]["jiraPriority"];
                            var fullCommitDate = ticketTypeFilteredFileCommits[k]["commitTime"];
                            var commitDate = fullCommitDate.substring(0, fullCommitDate.indexOf(' '));
                            var commitId = ticketTypeFilteredFileCommits[k]["commitId"];
                            var commitMessage = ticketTypeFilteredFileCommits[k]["shortMessage"];
                            var jiraId = ticketTypeFilteredFileCommits[k]["jiraId"];
                            var jiraSummary = ticketTypeFilteredFileCommits[k]["jiraSummary"];
                            var jiraSeverity = ticketTypeFilteredFileCommits[k]["severity"];
                            var jiraUrl = ticketTypeFilteredFileCommits[k]["jiraURL"];
                            var gitUrl = ticketTypeFilteredFileCommits[k]["gitURL"];        
                            commitInfo.push(commitDate);
                            commitInfo.push(jiraSeverity);
                            commitInfo.push(commitMessage);
                            commitInfo.push(jiraId);
                            commitInfo.push(jiraSummary);
                            commitInfo.push(jiraUrl);
                            commitInfo.push(gitUrl);
                            commitIdCommitInfoMap.set(commitId,commitInfo);
                        }
                        var lineDataInsightsData = {};
                        var xyArray = [];
                        for(var [key, value] of commitIdCommitInfoMap){
                            var x = value[0];
                            var y = value[1];
                            var commitId = key;
                            var commitMessage = value[2];
                            var jiraId = value[3];
                            var jiraSummary = value[4];
                            var jiraUrl = value[5];
                            var gitUrl = value[6];
                            var xyPoint = {x, y, commitId, commitMessage, jiraId, jiraSummary, jiraUrl, gitUrl};
                            xyArray.push(xyPoint);
                        }
                        lineDataInsightsData = {
                            datasets: [{
                                data: xyArray,
                                label: fileName,
                                fill: false,
                                borderColor: "rgba(75,192,192,1)",
                                pointHoverRadius: 15,
                                pointRadius: 10,
                                pointHitRadius: 20        
                            }]
                        }
                        var lineDataInsightsOptions = {
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
                                    display: false
                            }
                        };    
                        this.props.setLineDataInsightsData(lineDataInsightsData, lineDataInsightsOptions);
                    }
                }
            }
        }.bind(this);

        var tableDataInsightFunction = function(){
            console.log('tableDataInsightsData funtion');
            var fileIndexSelected = this.props.barChartFileData.barChartFileSelectedIndex;
            if(fileIndexSelected != -1){
                var ticketTypeIndexSelected = this.props.doughnutTicketTypeData.doughnutTicketTypeSelectedIndex;
                if(ticketTypeIndexSelected != -1){
                    var priorityIndexSelected = this.props.doughnutCommitPriorityData.doughnutCommitPrioritySelectedIndex;
                    if(priorityIndexSelected != -1){
                        var barChartData = this.props.barChartFileData.barChartFileData;
                        var barFilesArray = barChartData.labels;
                        var fileName = barFilesArray[fileIndexSelected];
                        var commitHistoryData = this.props.commitHistory.state.data;
                        var fileCommits = commitHistoryData[fileName];
                        var doughnutPriorityData = this.props.doughnutCommitPriorityData.doughnutCommitPriorityData;
                        var prioritySelected = doughnutPriorityData['labels'][priorityIndexSelected];
                        var priorityFilteredFileCommits = [];
                        for(var k in fileCommits){
                            var issuePriority = fileCommits[k]["jiraTicketPriority"];
                            if(issuePriority == prioritySelected){
                                priorityFilteredFileCommits.push(fileCommits[k]);
                            }
                        }
                        var doughnutTicketTypeData = this.props.doughnutTicketTypeData.doughnutTicketTypeData;
                        var ticketTypeSelected = doughnutTicketTypeData['labels'][ticketTypeIndexSelected];
                        var priorityPlusTicketTypeFilteredFileCommits = [];
                        for(var k in priorityFilteredFileCommits){
                            var ticketType = priorityFilteredFileCommits[k]["jiraTicketCategory"];
                            if(ticketType == ticketTypeSelected){
                                priorityPlusTicketTypeFilteredFileCommits.push(priorityFilteredFileCommits[k]);
                            }
                        }
                        var tableDataInsightsData = [];
                        for(var j=0; j<priorityPlusTicketTypeFilteredFileCommits.length; j++){
                            var tableDataInsightsRow = {};
                            var commit = priorityPlusTicketTypeFilteredFileCommits[j];
                            var commitId = commit["commitId"];
                            var riskPercent = commit["severity"];
                            var commitMessage = commit["shortMessage"];
                            var jiraId = commit["jiraId"];
                            var jiraSummary = commit["jiraSummary"];
                            var jiraUrl = commit["jiraURL"];
                            var gitUrl = commit["gitURL"];
                            var fullCommitDate = commit["commitTime"];
                            var commitDate = fullCommitDate.substring(0, fullCommitDate.indexOf(' '));        
                            tableDataInsightsRow["jiraUrl"] = jiraUrl;
                            tableDataInsightsRow["gitUrl"] = gitUrl;
                            tableDataInsightsRow["commitId"] = commitId;
                            tableDataInsightsRow["riskPercent"] = riskPercent;
                            tableDataInsightsRow["commitMessage"] = commitMessage;
                            tableDataInsightsRow["jiraId"] = jiraId;
                            tableDataInsightsRow["jiraSummary"] = jiraSummary;
                            tableDataInsightsRow["commitDate"] = commitDate;
                            tableDataInsightsData.push(tableDataInsightsRow);
                        }
                        this.props.setTableDataInsightsData(tableDataInsightsData);
                    }
                    else{
                        var barChartData = this.props.barChartFileData.barChartFileData;
                        var barFilesArray = barChartData.labels;
                        var fileName = barFilesArray[fileIndexSelected];
                        var commitHistoryData = this.props.commitHistory.state.data;
                        var fileCommits = commitHistoryData[fileName];
                        var doughnutTicketTypeData = this.props.doughnutTicketTypeData.doughnutTicketTypeData;
                        var ticketTypeSelected = doughnutTicketTypeData['labels'][ticketTypeIndexSelected];
                        var ticketTypeFilteredFileCommits = [];
                        for(var k in fileCommits){
                            var ticketType = fileCommits[k]["jiraTicketCategory"];
                            if(ticketType == ticketTypeSelected){
                                ticketTypeFilteredFileCommits.push(fileCommits[k]);
                            }                        
                        }
                        var tableDataInsightsData = [];
                        for(var j=0; j<ticketTypeFilteredFileCommits.length; j++){
                            var tableDataInsightsRow = {};
                            var commit = ticketTypeFilteredFileCommits[j];
                            var commitId = commit["commitId"];
                            var riskPercent = commit["severity"];
                            var commitMessage = commit["shortMessage"];
                            var jiraId = commit["jiraId"];
                            var jiraSummary = commit["jiraSummary"];
                            var jiraUrl = commit["jiraURL"];
                            var gitUrl = commit["gitURL"];
                            var fullCommitDate = commit["commitTime"];
                            var commitDate = fullCommitDate.substring(0, fullCommitDate.indexOf(' ')); 
                            tableDataInsightsRow["jiraUrl"] = jiraUrl;
                            tableDataInsightsRow["gitUrl"] = gitUrl;        
                            tableDataInsightsRow["commitId"] = commitId;
                            tableDataInsightsRow["riskPercent"] = riskPercent;
                            tableDataInsightsRow["commitMessage"] = commitMessage;
                            tableDataInsightsRow["jiraId"] = jiraId;
                            tableDataInsightsRow["jiraSummary"] = jiraSummary;
                            tableDataInsightsRow["commitDate"] = commitDate;
                            tableDataInsightsData.push(tableDataInsightsRow);
                        }
                        this.props.setTableDataInsightsData(tableDataInsightsData);
                    }
                }
            }
        }.bind(this);

        var chartData = this.props.doughnutTicketTypeData.doughnutTicketTypeData;
        var chartOptions = this.props.doughnutTicketTypeData.doughnutTicketTypeOptions;
        var performFunctions = function(elems){
            setDoughnutStatus(elems);
            updateDoughnutCommitPriority();
            updateLineDataInsightsChart();
            tableDataInsightFunction();
        };
        return(
           <Doughnut data={chartData} options={chartOptions} getElementAtEvent={(elems) => {performFunctions(elems)}}>
           </Doughnut>
        );
    }
}

function mapStateToProps(state){
    return{ 
        commitHistory: state.commitHistory,
        barChartFileData: state.barChartFileData,
        doughnutCommitPriorityData : state.doughnutCommitPriorityData,
        doughnutTicketTypeData : state.doughnutTicketTypeData
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({setDoughnutTicketTypeData, setDoughnutTicketTypeSelectedIndex, setLineDataInsightsData, setTableDataInsightsData}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DoughnutTicketType)