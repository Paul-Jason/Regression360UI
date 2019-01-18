import React,{Component} from 'react'
import {HorizontalBar, Bar} from 'react-chartjs-2';
import {bindActionCreators}  from 'redux';
import { connect } from 'react-redux';
import {setBarChartFileData, setBarChartSelectedFileIndex} from '../../actions/charts/BarChartFile';
import {setDoughnutCommitPriorityData, setDoughnutCommitPrioritySelectedIndex} from '../../actions/charts/DoughnutCommitPriority';
import {setDoughnutTicketTypeData, setDoughnutTicketTypeSelectedIndex} from "../../actions/charts/DoughnutTicketType";
import {setLineDataInsightsData} from "../../actions/charts/LineDataInsights";
import {setTableDataInsightsData} from '../../actions/charts/TableDataInsights';
import { func } from 'prop-types';
 
class BarChartFile extends Component{

    constructor(props) {
        super(props);
        this.state = {
          defaultBarColor: '#069BFF'
        };
    }  

    componentWillMount(){
        //Setting bar chart data.
        var commitHistoryData = this.props.commitHistory.state.data;
        var labelsArray = [];
        var lowSeriesData = [];
        var mediumSeriesData = [];
        var highSeriesData = [];
        var veryHighSeriesData = [];
        var commitsCountArray = [];
        var backgroundColorArray = [];
        var i = 0;
        for(var fileName in commitHistoryData){
            var fileCommits = commitHistoryData[fileName];
            //if file donot have any bugs we remove it.
            if(fileCommits.length != 0){
                labelsArray.push(fileName);
                var commitsCount = fileCommits.length;
                var lowCount = 0, mediumCount = 0, highCount = 0, veryHighCount = 0;
                for(var j=0; j<fileCommits.length; j++){
                    var commit = fileCommits[j];
                    var issuePriority = commit["jiraTicketPriority"];
                    switch(issuePriority){
                        case "Low":
                            lowCount++;
                            break;
                        case "Medium":
                            mediumCount++;
                            break;
                        case "High":
                            highCount++;
                            break;
                        case "Very High":
                            veryHighCount++;
                            break;
                        default:
                            lowCount++;
                    }
                }
                lowSeriesData.push(lowCount);
                mediumSeriesData.push(mediumCount);
                highSeriesData.push(highCount);
                veryHighSeriesData.push(veryHighCount);
                commitsCountArray.push(commitsCount);
                backgroundColorArray.push(this.state.defaultBarColor);
                i++;
            }
        }
        var barChartData = {
            labels: labelsArray,
            datasets: [
              {
                label: 'Low',
                data: lowSeriesData,
                backgroundColor: '#069BFF',
                position:'bottom',
                borderWidth : 2
              },
              {
                label: 'Medium',
                data: mediumSeriesData,
                backgroundColor: '#FFCC57',
                position:'bottom',
                borderWidth : 2
              },
              {
                label: 'High',
                data: highSeriesData,
                backgroundColor: '#FE6383',
                position:'bottom',
                borderWidth : 2
              },
              {
                label: 'Very High',
                data: veryHighSeriesData,
                backgroundColor: '#ff0000',
                position:'bottom',
                borderWidth : 2
              }
            ]
        };

        var barChartOptions = {
            scales: {
              xAxes: [{ stacked: true }],
              yAxes: [{ stacked: true }]
            },
            legend:{
                position:'bottom'
            }      
        };
        this.props.setBarChartFileData(barChartData, barChartOptions);
    }

    render(){
        const thisTemp = this;
        if(this.props.barChartFileData.isFetching){
            return(
                <p>Loading...</p>
            )    
        }

        var setBarChartStatusFunction = function(elems){
            var barFileIndexSelected = elems[0]["_index"];
            this.props.setBarChartSelectedFileIndex(barFileIndexSelected);
            var barChartData = this.props.barChartFileData.barChartFileData;
            var barChartOptions = this.props.barChartFileData.barChartOptions;
            var backgroundColorArray = barChartData["datasets"][0]["backgroundColor"];
            var borderColorArray = [];
            for(var i=0; i<backgroundColorArray.length; i++){
                borderColorArray[i] = '#fff';
            }
            borderColorArray[barFileIndexSelected] = '#000'
            barChartData["datasets"][0]["borderColor"] = borderColorArray;
            barChartData["datasets"][1]["borderColor"] = borderColorArray;
            barChartData["datasets"][2]["borderColor"] = borderColorArray;
            barChartData["datasets"][3]["borderColor"] = borderColorArray;
            this.props.setBarChartFileData(barChartData, barChartOptions);
            this.props.setDoughnutCommitPrioritySelectedIndex(-1);
            this.props.setDoughnutTicketTypeSelectedIndex(-1);
        }.bind(this);

        var doughnutCommitPriorityFunction = function(){
            var fileIndexSelected = this.props.barChartFileData.barChartFileSelectedIndex;
            if(fileIndexSelected != -1){
                var barChartData = this.props.barChartFileData.barChartFileData;
                var barFilesArray = barChartData.labels;
                var fileName = barFilesArray[fileIndexSelected];
                var commitHistoryData = this.props.commitHistory.state.data;
                var fileCommits = commitHistoryData[fileName];
                var lowCount = 0, mediumCount = 0, highCount = 0, veryHighCount = 0;
                for(var j=0; j<fileCommits.length; j++){
                    var commit = fileCommits[j];
                    var issuePriority = commit["jiraTicketPriority"];
                    switch(issuePriority){
                        case "Low":
                            lowCount++;
                            break;
                        case "Medium":
                            mediumCount++;
                            break;
                        case "High":
                            highCount++;
                            break;
                        case "Very High":
                            veryHighCount++;
                            break;
                        default:
                            lowCount++;
                    }
                }
                var tempDoughnutData = [];
                tempDoughnutData.push(lowCount);
                tempDoughnutData.push(mediumCount);
                tempDoughnutData.push(highCount);
                tempDoughnutData.push(veryHighCount);
                var doughnutChartData = {
                    datasets: [{
                                    data: tempDoughnutData,
                                    backgroundColor : ['#069BFF','#FFCC57','#FE6383','#ff0000'],
                                    borderColor : ['#fff','#fff','#fff','#fff']
                                }],
                                labels: [
                                    'Low',
                                    'Medium',
                                    'High',
                                    'Very High'
                                ]
                };
                var doughnutChartOptions = {
                    legend:{
                        position:'bottom'
                    }
                };
                this.props.setDoughnutCommitPriorityData(doughnutChartData,doughnutChartOptions);
            }
        }.bind(this);

        var doughnutTicketTypefunction = function(){
            var fileIndexSelected = this.props.barChartFileData.barChartFileSelectedIndex;
            if(fileIndexSelected != -1){
                var barChartData = this.props.barChartFileData.barChartFileData;
                var barFilesArray = barChartData.labels;
                var fileName = barFilesArray[fileIndexSelected];
                var commitHistoryData = this.props.commitHistory.state.data;
                var fileCommits = commitHistoryData[fileName];
                var customerTicketsCount = 0, internalTicketsCount = 0, otherTicketsCount = 0;
                for(var k in fileCommits){
                    var jiraTicketType = fileCommits[k]["jiraTicketCategory"];
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
                var tempDoughnutData = [];
                tempDoughnutData.push(customerTicketsCount);
                tempDoughnutData.push(internalTicketsCount);
                tempDoughnutData.push(otherTicketsCount);
                var doughnutChartData = {
                    datasets: [{
                                    data: tempDoughnutData,
                                    backgroundColor : ['#069BFF','#FFCC57','#6a756c'],
                                    borderColor : ['#fff','#fff','#fff']
                                }],
                                labels: [
                                    'Customer',
                                    'Internal',
                                    'Others'
                                ]
                };
                var doughnutChartOptions = {
                    legend:{
                        position:'bottom'
                    }
                };
                this.props.setDoughnutTicketTypeData(doughnutChartData,doughnutChartOptions);
            }
        }.bind(this);

        var lineDataInsightsFunction = function(){
             var fileIndexSelected = this.props.barChartFileData.barChartFileSelectedIndex;
            if(fileIndexSelected != -1){
                var barChartData = this.props.barChartFileData.barChartFileData;
                var barFilesArray = barChartData.labels;
                var fileName = barFilesArray[fileIndexSelected];
                var commitHistoryData = this.props.commitHistory.state.data;
                var fileCommits = commitHistoryData[fileName];
                var commitIdCommitInfoMap = new Map();
                for(var k in fileCommits){
                    var commitInfo = []; //Array of commit date, risk %, commitMessage, jiraId, jiraSummary, jira Url, git Url
                    var jiraPriority = fileCommits[k]["jiraTicketPriority"];
                    var fullCommitDate = fileCommits[k]["commitTime"];
                    var commitDate = fullCommitDate.substring(0, fullCommitDate.indexOf(' '));
                    var commitId = fileCommits[k]["commitId"];
                    var commitMessage = fileCommits[k]["shortMessage"];
                    var jiraId = fileCommits[k]["jiraId"];
                    var jiraSummary = fileCommits[k]["jiraSummary"];
                    var jiraSeverity = fileCommits[k]["severity"];
                    var jiraUrl = fileCommits[k]["jiraURL"];
                    var gitUrl = fileCommits[k]["gitURL"];
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
                console.log("line data")
                console.log(commitIdCommitInfoMap);
                lineDataInsightsData = {
                    datasets: [{
                        data: xyArray,
                        label: fileName,
                        fill: false,
                        borderColor: "rgba(75,192,192,1)",
                        pointHoverRadius: 15,
                        pointRadius: 10,
                        pointHitRadius: 20
                    }],
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
                            // console.log("line data");
                            // console.log(data);
                            var tooltipItemIndex = tooltipItem[0]['index'];
                            var string = 'Commmit Id : ' + data['datasets'][0]['data'][tooltipItemIndex]['commitId'];
                            // console.log(string);
                            return string;
                          },
                          label: function(tooltipItem, data) {
                            // console.log("line data");
                            var tooltipItemIndex = tooltipItem['index'];
                            var string = 'RISK : ' + data['datasets'][0]['data'][tooltipItemIndex]['y'] + '%';
                            //console.log(string);
                            return string;
                          },
                          afterTitle: function(tooltipItem, data) {
                            // console.log("line data");
                            var tooltipItemIndex = tooltipItem[0]['index'];
                            var multiLineString = [];
                            var commitMessage = 'Commit message : ' + data['datasets'][0]['data'][tooltipItemIndex]['commitMessage'];
                            var jiraId = 'Jira Id : ' + data['datasets'][0]['data'][tooltipItemIndex]['jiraId'];
                            var jiraSummary = 'Jira summary : ' + data['datasets'][0]['data'][tooltipItemIndex]['jiraSummary'];
                            multiLineString.push(commitMessage, jiraId, jiraSummary);
                            // console.log(multiLineString);
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
        }.bind(this);

        var tableDataInsightFunction = function(){
            console.log('tableDataInsightsData funtion');
            var fileIndexSelected = this.props.barChartFileData.barChartFileSelectedIndex;
            if(fileIndexSelected != -1){
                var barChartData = this.props.barChartFileData.barChartFileData;
                var barFilesArray = barChartData.labels;
                var fileName = barFilesArray[fileIndexSelected];
                var commitHistoryData = this.props.commitHistory.state.data;
                var fileCommits = commitHistoryData[fileName];
                var tableDataInsightsData = [];
                for(var j=0; j<fileCommits.length; j++){
                    var tableDataInsightsRow = {};
                    var commit = fileCommits[j];
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
        }.bind(this);

        var performFunctions = function(elems){
            setBarChartStatusFunction(elems); 
            doughnutCommitPriorityFunction();
            doughnutTicketTypefunction(); 
            lineDataInsightsFunction();
            tableDataInsightFunction();
        }
        
        return (
            <div class="chartWrapper">
                <HorizontalBar id="barChart"data={this.props.barChartFileData.barChartFileData} options= {this.props.barChartFileData.barChartOptions} 
                                getElementAtEvent={(elems) => {performFunctions(elems)}}
                />
            </div>

        );
    }
}


function mapStateToProps(state){
    return{
        commitHistory: state.commitHistory,
        barChartFileData: state.barChartFileData
    };
}
  
function mapDispatchToProps(dispatch){
 return bindActionCreators({setBarChartFileData, setBarChartSelectedFileIndex, setDoughnutCommitPriorityData, setDoughnutCommitPrioritySelectedIndex, setDoughnutTicketTypeData, setDoughnutTicketTypeSelectedIndex, setLineDataInsightsData, setTableDataInsightsData}, dispatch);
}
  
export default connect(mapStateToProps,mapDispatchToProps)(BarChartFile)