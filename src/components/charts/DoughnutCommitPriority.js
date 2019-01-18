import React,{Component} from 'react';
import {Doughnut, Pie} from 'react-chartjs-2';
import {setDoughnutCommitPriorityData, setDoughnutCommitPrioritySelectedIndex} from '../../actions/charts/DoughnutCommitPriority';
import {setDoughnutTicketTypeData} from '../../actions/charts/DoughnutTicketType';
import {setLineDataInsightsData} from '../../actions/charts/LineDataInsights';
import {setTableDataInsightsData} from '../../actions/charts/TableDataInsights';
import {bindActionCreators}  from 'redux';
import { connect } from 'react-redux';

class DoughnutCommitPriority extends Component{
    render(){  

        var setDoughnutStatus = function(elems){
            var selectedPriorityIndex = elems[0]["_index"];
            this.props.setDoughnutCommitPrioritySelectedIndex(selectedPriorityIndex);
            var chartData = this.props.doughnutCommitPriorityData.doughnutCommitPriorityData;
            var chartOptions = this.props.doughnutCommitPriorityData.doughnutCommitPriorityOptions;
            var backgroundColorsArray = chartData['datasets'][0]['backgroundColor'];
            var borderColorsArray = [];
            for(var i=0; i<backgroundColorsArray.length; i++){
                borderColorsArray.push('#fff');
            }
            borderColorsArray[selectedPriorityIndex] = '#000';
            chartData['datasets'][0]['borderColor'] = borderColorsArray;
            this.props.setDoughnutCommitPriorityData(chartData, chartOptions);
        }.bind(this);

        var updateDoughnutTicketTypeChart = function(){
            var fileIndexSelected = this.props.barChartFileData.barChartFileSelectedIndex;
            if(fileIndexSelected != -1){
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
                    var customerTicketsCount = 0, internalTicketsCount = 0, otherTicketsCount = 0;
                    for(var k in priorityFilteredFileCommits){
                        var jiraTicketType = priorityFilteredFileCommits[k]["jiraTicketCategory"];
                        switch(jiraTicketType){
                            case("Customer"):
                                customerTicketsCount++;
                                break;
                            case("Internal"):
                                internalTicketsCount++;
                                break;
                            default:
                                otherTicketsCount++;
                        }
                    }
                    var doughnutTicketTypeDataArray = [];
                    doughnutTicketTypeDataArray.push(customerTicketsCount);
                    doughnutTicketTypeDataArray.push(internalTicketsCount);
                    doughnutTicketTypeDataArray.push(otherTicketsCount);
                    var doughnutTicketData = this.props.doughnutTicketTypeData.doughnutTicketTypeData;
                    doughnutTicketData['datasets'][0]['data'] = doughnutTicketTypeDataArray;
                    var doughnutTicketOptions = this.props.doughnutTicketTypeData.doughnutTicketTypeOptions;
                    this.props.setDoughnutTicketTypeData(doughnutTicketData, doughnutTicketOptions);
                }
            }
        }.bind(this);

        var updateLineDataInsightsChart = function(){
            var fileIndexSelected = this.props.barChartFileData.barChartFileSelectedIndex;
            if(fileIndexSelected != -1){
                var priorityIndexSelected = this.props.doughnutCommitPriorityData.doughnutCommitPrioritySelectedIndex;
                if(priorityIndexSelected != -1){
                    var ticketTypeIndexSelected = this.props.doughnutTicketTypeData.doughnutTicketTypeSelectedIndex;
                    if(ticketTypeIndexSelected != -1){
                        
                    }   
                    else{
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
                        var commitIdCommitInfoMap = new Map();
                        for(var k in priorityFilteredFileCommits){
                            var commitInfo = []; //Array of commit date, risk %, commitMessage, jiraId, jiraSummary
                            //var jiraPriority = priorityFilteredFileCommits[k]["jiraPriority"];
                            var fullCommitDate = priorityFilteredFileCommits[k]["commitTime"];
                            var commitDate = fullCommitDate.substring(0, fullCommitDate.indexOf(' '));
                            var commitId = priorityFilteredFileCommits[k]["commitId"];
                            var commitMessage = fileCommits[k]["shortMessage"];
                            var jiraId = priorityFilteredFileCommits[k]["jiraId"];
                            var jiraSummary = priorityFilteredFileCommits[k]["jiraSummary"];
                            var jiraSeverity = priorityFilteredFileCommits[k]["severity"];
                            var jiraUrl = priorityFilteredFileCommits[k]["jiraURL"];
                            var gitUrl = priorityFilteredFileCommits[k]["gitURL"];        
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
                    var tableDataInsightsData = [];
                    for(var j=0; j<priorityFilteredFileCommits.length; j++){
                        var tableDataInsightsRow = {};
                        var commit = priorityFilteredFileCommits[j];
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
                    console.log(tableDataInsightsData);
                    this.props.setTableDataInsightsData(tableDataInsightsData);
                }
            }
        }.bind(this);

        var performFunctions = function(elems){
            setDoughnutStatus(elems);
            updateDoughnutTicketTypeChart();
            updateLineDataInsightsChart();
            tableDataInsightFunction();
        };

        var chartData = this.props.doughnutCommitPriorityData.doughnutCommitPriorityData;
        var chartOptions = this.props.doughnutCommitPriorityData.doughnutCommitPriorityOptions;
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
    return bindActionCreators({setDoughnutCommitPriorityData, setDoughnutCommitPrioritySelectedIndex, setDoughnutTicketTypeData, setLineDataInsightsData, setTableDataInsightsData}, dispatch);
   }

export default connect(mapStateToProps, mapDispatchToProps)(DoughnutCommitPriority)