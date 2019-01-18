import React, { Component } from 'react';
import { connect } from 'react-redux';


class PredictRisks extends Component{
    render(){
        var commitHistoryData = this.props.commitHistory.state.data;
        var topTicketsMap = new Map();
        for(var fileName in commitHistoryData){
            var fileCommits = commitHistoryData[fileName];
            for(var i=0; i<fileCommits.length; i++){
                var commit = fileCommits[i];
                var commitId = commit["commitId"]
                var jiraId = commit["jiraId"];
                var riskPercent = commit["severity"];
                if(topTicketsMap.size == 6){
                    //Get least in the map then compare
                    var leastRiskMapKey = null;
                    for(var [key,value] of topTicketsMap){
                        var riskPercentTemp1 = value["riskPercent"];
                        if(leastRiskMapKey!=null){
                            var riskPercentTemp2 =  topTicketsMap.get(leastRiskMapKey)["riskPercent"];
                            if(riskPercentTemp1 < riskPercentTemp2){
                                leastRiskMapKey = key;
                            }
                        }else{
                            leastRiskMapKey = key;
                        }
                    }
                    var riskPercentTemp = topTicketsMap.get(leastRiskMapKey)["riskPercent"];
                    if(riskPercentTemp < riskPercent ){
                            topTicketsMap.delete(leastRiskMapKey);
                            var ticketInfo = {};
                            ticketInfo["fileName"] = fileName;
                            ticketInfo["jiraSummary"] = commit["jiraSummary"];
                            ticketInfo["codeMatch"] =  commit["codeMatch"];
                            ticketInfo["jiraId"] = jiraId;
                            ticketInfo["commitId"] = commit["commitId"];
                            ticketInfo["jiraURL"] =  commit["jiraURL"];
                            ticketInfo["gitURL"] =  commit["gitURL"];
                            ticketInfo["riskPercent"] = commit["severity"];
                            topTicketsMap.set(commitId, ticketInfo);
                    }
                }
                else{
                    var ticketInfo = {};
                    ticketInfo["fileName"] = fileName;
                    ticketInfo["jiraSummary"] = commit["jiraSummary"];
                    ticketInfo["codeMatch"] =  commit["codeMatch"];
                    ticketInfo["commitId"] = commit["commitId"];
                    ticketInfo["jiraId"] = jiraId;
                    ticketInfo["jiraURL"] =  commit["jiraURL"];
                    ticketInfo["gitURL"] =  commit["gitURL"];
                    ticketInfo["riskPercent"] = commit["severity"];
                    topTicketsMap.set(commitId, ticketInfo);
                    var ticketInfo = {};
                }
            }
        }
        console.log("predict risks");
        console.log(topTicketsMap);
        var topTicketsKeys = Array.from(topTicketsMap.keys());
        //console.log(topTicketsMap[topTicketsKeys[0]]["fileName"]);
        if(topTicketsKeys.length < 6){
            return(
                <div class="container">
                    <div class="row" >
                        <div class="col">
                            <div class="card text-center mb-3">
                                <h5 class="card-header">There are no enough HIGH risk tickets to predict!</h5>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return(
            <div class="container">
                <div class="row" >
                    <div class="col">
                            <div class="card text-center mb-3">
                                <h5 class="card-header">There is a HIGH risk of you reopening following Tickets, Please take a look!</h5>
                            </div>
                        </div>
                    </div>
                <div class="row" >
                    <div class="col-4">
                        <div class="card mb-3">
                            <h5 class="card-header">{topTicketsMap.get(topTicketsKeys[0])["jiraId"]}</h5>
                            <div class="card-body">
                                <p class="card-text"><b>Jira Summary :</b> {topTicketsMap.get(topTicketsKeys[0])["jiraSummary"]}</p>
                                <p class="card-text"><b>Code Match :</b> {topTicketsMap.get(topTicketsKeys[0])["codeMatch"]}%</p>
                                <p class="card-text"><b>File Name :</b> {topTicketsMap.get(topTicketsKeys[0])["fileName"]}</p>
                                <a href={topTicketsMap.get(topTicketsKeys[0])["jiraURL"]} class="card-link">Jira Link</a>
                                <a href={topTicketsMap.get(topTicketsKeys[0])["gitURL"]} class="card-link">Code Change</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="card mb-3">
                            <h5 class="card-header">{topTicketsMap.get(topTicketsKeys[1])["jiraId"]}</h5>
                            <div class="card-body">
                                <p class="card-text"><b>Jira Summary :</b> {topTicketsMap.get(topTicketsKeys[1])["jiraSummary"]}</p>
                                <p class="card-text"><b>Code Match :</b> {topTicketsMap.get(topTicketsKeys[1])["codeMatch"]}%</p>
                                <p class="card-text"><b>File Name :</b> {topTicketsMap.get(topTicketsKeys[1])["fileName"]}</p>
                                <a href={topTicketsMap.get(topTicketsKeys[1])["jiraURL"]} class="card-link">Jira Link</a>
                                <a href={topTicketsMap.get(topTicketsKeys[1])["gitURL"]} class="card-link">Code Change</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="card mb-3">
                            <h5 class="card-header">{topTicketsMap.get(topTicketsKeys[2])["jiraId"]}</h5>
                            <div class="card-body">
                                <p class="card-text"><b>Jira Summary :</b> {topTicketsMap.get(topTicketsKeys[2])["jiraSummary"]}</p>
                                <p class="card-text"><b>Code Match :</b> {topTicketsMap.get(topTicketsKeys[2])["codeMatch"]}%</p>
                                <p class="card-text"><b>File Name :</b> {topTicketsMap.get(topTicketsKeys[2])["fileName"]}</p>
                                <a href={topTicketsMap.get(topTicketsKeys[2])["jiraURL"]} class="card-link">Jira Link</a>
                                <a href={topTicketsMap.get(topTicketsKeys[2])["gitURL"]} class="card-link">Code Change</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row" >
                    <div class="col-4">
                        <div class="card mb-3">
                            <h5 class="card-header">{topTicketsMap.get(topTicketsKeys[3])["jiraId"]}</h5>
                            <div class="card-body">
                                <p class="card-text"><b>Jira Summary :</b> {topTicketsMap.get(topTicketsKeys[3])["jiraSummary"]}</p>
                                <p class="card-text"><b>Code Match :</b> {topTicketsMap.get(topTicketsKeys[3])["codeMatch"]}%</p>
                                <p class="card-text"><b>File Name :</b> {topTicketsMap.get(topTicketsKeys[3])["fileName"]}</p>
                                <a href={topTicketsMap.get(topTicketsKeys[3])["jiraURL"]} class="card-link">Jira Link</a>
                                <a href={topTicketsMap.get(topTicketsKeys[3])["gitURL"]} class="card-link">Code Change</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="card mb-3">
                            <h5 class="card-header">{topTicketsMap.get(topTicketsKeys[4])["jiraId"]}</h5>
                            <div class="card-body">
                                <p class="card-text"><b>Jira Summary :</b> {topTicketsMap.get(topTicketsKeys[4])["jiraSummary"]}</p>
                                <p class="card-text"><b>Code Match :</b> {topTicketsMap.get(topTicketsKeys[4])["codeMatch"]}%</p>
                                <p class="card-text"><b>File Name :</b> {topTicketsMap.get(topTicketsKeys[4])["fileName"]}</p>
                                <a href={topTicketsMap.get(topTicketsKeys[4])["jiraURL"]} class="card-link">Jira Link</a>
                                <a href={topTicketsMap.get(topTicketsKeys[4])["gitURL"]} class="card-link">Code Change</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="card mb-3">
                            <h5 class="card-header">{topTicketsMap.get(topTicketsKeys[5])["jiraId"]}</h5>
                            <div class="card-body">
                                <p class="card-text"><b>Jira Summary :</b> {topTicketsMap.get(topTicketsKeys[5])["jiraSummary"]}</p>
                                <p class="card-text"><b>Code Match :</b> {topTicketsMap.get(topTicketsKeys[5])["codeMatch"]}%</p>
                                <p class="card-text"><b>File Name :</b> {topTicketsMap.get(topTicketsKeys[5])["fileName"]}</p>
                                <a href={topTicketsMap.get(topTicketsKeys[5])["jiraURL"]} class="card-link">Jira Link</a>
                                <a href={topTicketsMap.get(topTicketsKeys[5])["gitURL"]} class="card-link">Code Change</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        commitHistory: state.commitHistory,
    };
}

export default connect(mapStateToProps)(PredictRisks);