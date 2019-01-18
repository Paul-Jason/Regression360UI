import React , {Component} from 'react';
import { connect } from 'react-redux';
import { MDBDataTable } from 'mdbreact';

class DataTable extends Component{
    render(){
        var tableData = this.props.tableDataInsightsData.tableDataInsightsData;
        console.log("table data");
        console.log(tableData);
        var data = {
            columns: [
              {
                label: 'Jira Id',
                field: 'jiraId',
                width: 100,
                data: 'weblink'
              },
              {
                label: 'Jira Summary',
                field: 'jiraSummary',
                width: 400
              },
              {
                label: 'Risk (%)',
                field: 'riskPercent',
                sort: 'desc',
                width: 100
              },
            //   {
            //     label: 'Jira Link',
            //     field: 'jiraLink',
            //     width: 50
            //   },
              {
                label: 'Commit Id',
                field: 'commitId',
                width: 50
              },
              {
                label: 'Commit Date',
                field: 'commitDate',
                width: 100
              }
            ]
        }

        var rows = [];
        for (var i=0; i<tableData.length; i++){
            var commit = tableData[i]
            var row = {};
            row["jiraId"] = <a href={commit.jiraUrl} className="dataTableLink">{commit.jiraId}</a>;
            row["jiraSummary"] = commit.jiraSummary;
            row["riskPercent"] = commit.riskPercent;
            row["commitId"] = <a href={commit.gitUrl} className="dataTableLink">{commit.commitId}</a>;
            row["commitDate"] = commit.commitDate;
            // row["jiraUrl"] = commit.jiraUrl;
            // row["gitUrl"] = commit.gitUrl;
            rows.push(row);
        }
        console.log("rows");
        console.log(rows);
        data["rows"] = rows;
        return( 
            <MDBDataTable
                striped
                bordered
                hover
                responsive
                data={data}/>
        );
    }
}

function mapStateToProps(state){
    return{
        tableDataInsightsData : state.tableDataInsightsData
    };
}

export default connect(mapStateToProps)(DataTable);


